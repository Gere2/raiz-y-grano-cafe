"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Package, AlertTriangle, Filter, RefreshCw, FileDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  getInventoryItems,
  getInventoryCategories,
  getLowStockItems,
  getInventoryMovements,
  type InventoryItem,
  type InventoryCategory,
  type InventoryMovement,
} from "@/lib/inventory-service"
import { AuthenticatedLayout } from "@/components/authenticated-layout"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { PageContainer } from "@/components/ui-elements/page-container"
import { SectionHeader } from "@/components/ui-elements/section-header"
import { ActionButton } from "@/components/ui-elements/action-button"
import { StatusBadge } from "@/components/ui-elements/status-badge"
import { FeedbackMessage } from "@/components/ui-elements/feedback-message"
import { HelpDrawer } from "@/components/ui-elements/help-drawer"
import { NewItemButton } from "@/components/inventory/new-item-button"
// Importar el nuevo componente
import { AddCategoryButton } from "@/components/inventory/add-category-button"

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([])
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([])
  const [categories, setCategories] = useState<InventoryCategory[]>([])
  const [movements, setMovements] = useState<InventoryMovement[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  // Modificar la función loadData para incluir más información de depuración
  const loadData = async () => {
    try {
      setLoading(true)
      console.log("Cargando datos de inventario...")

      // Cargar categorías primero para depurar
      const cats = await getInventoryCategories()
      console.log("Categorías cargadas:", cats)
      setCategories(cats)

      // Luego cargar el resto de los datos
      const [items, lowItems, movs] = await Promise.all([
        getInventoryItems(),
        getLowStockItems(),
        getInventoryMovements(20), // Obtener los últimos 20 movimientos
      ])

      console.log("Items cargados:", items.length)
      console.log("Items con stock bajo:", lowItems.length)
      console.log("Movimientos cargados:", movs.length)

      setInventoryItems(items)
      setLowStockItems(lowItems)
      setMovements(movs)
    } catch (error) {
      console.error("Error al cargar datos:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los datos de inventario",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    try {
      setRefreshing(true)
      await loadData()
      toast({
        title: "Actualizado",
        description: "Los datos de inventario se han actualizado correctamente",
      })
    } catch (error) {
      console.error("Error al actualizar datos:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron actualizar los datos",
      })
    } finally {
      setRefreshing(false)
    }
  }

  // Filtrar items según la búsqueda y categoría
  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.supplier && item.supplier.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Función para formatear fecha
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A"
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Función para obtener el nombre de la categoría
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category ? category.name : "Sin categoría"
  }

  // Función para determinar el color del stock
  const getStockStatus = (item: InventoryItem) => {
    if (item.stock <= 0) return "error"
    if (item.stock <= item.minStock) return "warning"
    return "success"
  }

  return (
    <AuthenticatedLayout>
      <PageContainer>
        <SectionHeader
          title="Inventario"
          icon={<Package className="h-5 w-5" />}
          description="Gestiona tu inventario y movimientos de stock"
          action={
            <div className="flex gap-2">
              <ActionButton
                variant="outline"
                size="sm"
                icon={<RefreshCw className="h-4 w-4" />}
                onClick={handleRefresh}
                loading={refreshing}
              >
                Actualizar
              </ActionButton>
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          }
        />

        {lowStockItems.length > 0 && (
          <FeedbackMessage type="warning" title="Productos con stock bajo" className="mb-4">
            Tienes {lowStockItems.length} {lowStockItems.length === 1 ? "producto" : "productos"} con stock bajo o
            agotado.
          </FeedbackMessage>
        )}

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar en inventario..."
              className="pl-9 border-secondary/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[130px] border-secondary/30">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="border-secondary/30">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="low">Stock Bajo</TabsTrigger>
            <TabsTrigger value="movements">Movimientos</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1">
            <Card className="border-secondary/30">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg font-serif flex justify-between items-center">
                  <span>Inventario ({filteredItems.length})</span>
                  <div className="flex gap-2">
                    <AddCategoryButton onCategoryAdded={loadData} />
                    <NewItemButton categories={categories} onItemAdded={loadData} />
                  </div>
                </CardTitle>
              </CardHeader>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="p-4 space-y-3">
                  {loading ? (
                    <div className="text-center p-4 text-muted-foreground">Cargando inventario...</div>
                  ) : filteredItems.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">
                      {searchTerm || categoryFilter !== "all"
                        ? "No se encontraron items que coincidan con la búsqueda"
                        : "No hay items en el inventario"}
                    </div>
                  ) : (
                    filteredItems.map((item) => (
                      <Card key={item.id} className="border-secondary/20 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-start justify-between p-3">
                            <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">{getCategoryName(item.category)}</div>
                              {item.supplier && (
                                <div className="text-xs text-secondary italic">Proveedor: {item.supplier}</div>
                              )}
                            </div>
                            <div className="flex flex-col items-end">
                              <StatusBadge status={getStockStatus(item)} className="mb-1">
                                {item.stock} {item.unit}
                              </StatusBadge>
                              <div className="text-xs text-muted-foreground">
                                Mín: {item.minStock} {item.unit}
                              </div>
                            </div>
                          </div>
                          {item.notes && <div className="px-3 pb-2 text-xs text-muted-foreground">{item.notes}</div>}
                          <div className="bg-muted/30 px-3 py-1 text-xs flex justify-between">
                            <span>{item.batchNumber && `Lote: ${item.batchNumber}`}</span>
                            <span>{item.lastUpdated && `Act: ${formatDate(item.lastUpdated)}`}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>

          <TabsContent value="low" className="flex-1">
            <Card className="border-secondary/30">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg font-serif flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                  <span>Stock Bajo ({lowStockItems.length})</span>
                </CardTitle>
              </CardHeader>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="p-4 space-y-3">
                  {loading ? (
                    <div className="text-center p-4 text-muted-foreground">Cargando inventario...</div>
                  ) : lowStockItems.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">No hay items con stock bajo</div>
                  ) : (
                    lowStockItems.map((item) => (
                      <Card key={item.id} className="border-secondary/20 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-start justify-between p-3">
                            <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">{getCategoryName(item.category)}</div>
                              {item.supplier && (
                                <div className="text-xs text-secondary italic">Proveedor: {item.supplier}</div>
                              )}
                            </div>
                            <div className="flex flex-col items-end">
                              <StatusBadge status={getStockStatus(item)} className="mb-1">
                                {item.stock} {item.unit}
                              </StatusBadge>
                              <div className="text-xs text-muted-foreground">
                                Mín: {item.minStock} {item.unit}
                              </div>
                            </div>
                          </div>
                          <div className="bg-muted/30 px-3 py-1 text-xs flex justify-between">
                            <span>{item.batchNumber && `Lote: ${item.batchNumber}`}</span>
                            <span>{item.lastUpdated && `Act: ${formatDate(item.lastUpdated)}`}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>

          <TabsContent value="movements" className="flex-1">
            <Card className="border-secondary/30">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-lg font-serif flex justify-between items-center">
                  <span>Movimientos Recientes</span>
                  <Button variant="outline" size="sm" className="h-8">
                    <FileDown className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </CardTitle>
              </CardHeader>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="p-4 space-y-3">
                  {loading ? (
                    <div className="text-center p-4 text-muted-foreground">Cargando movimientos...</div>
                  ) : movements.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">No hay movimientos registrados</div>
                  ) : (
                    movements.map((movement) => (
                      <Card key={movement.id} className="border-secondary/20 overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-start justify-between p-3">
                            <div className="flex-1">
                              <div className="font-medium">{movement.itemName}</div>
                              <div className="text-sm">
                                <StatusBadge
                                  status={
                                    movement.type === "entrada"
                                      ? "success"
                                      : movement.type === "salida"
                                        ? "warning"
                                        : "info"
                                  }
                                  className="text-xs"
                                >
                                  {movement.type === "entrada"
                                    ? "Entrada"
                                    : movement.type === "salida"
                                      ? "Salida"
                                      : "Ajuste"}
                                </StatusBadge>
                                <span className="text-muted-foreground ml-2">{movement.quantity} unidades</span>
                              </div>
                              {movement.notes && (
                                <div className="text-xs text-muted-foreground mt-1">{movement.notes}</div>
                              )}
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="text-xs text-muted-foreground">{formatDate(movement.date)}</div>
                              <div className="text-xs mt-1">
                                <span className="text-muted-foreground">Stock: </span>
                                <span className="text-destructive">{movement.previousStock}</span>
                                <span className="mx-1">→</span>
                                <span className="text-success">{movement.newStock}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>
        </Tabs>

        <HelpDrawer />
        <Toaster />
      </PageContainer>
    </AuthenticatedLayout>
  )
}
