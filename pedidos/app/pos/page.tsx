"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Minus, Trash2, Receipt, Search, Star, Clock, X, Coffee } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { getCategories, getProductsByCategory, getProducts, type Product } from "@/lib/product-service"
import { type OrderItem, addTicket } from "@/lib/ticket-service"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Loader2 } from "lucide-react"
import { FirebaseIndexAlert } from "@/components/firebase-index-alert"
import { AuthenticatedLayout } from "@/components/authenticated-layout"
import { PageContainer } from "@/components/ui-elements/page-container"
import { SectionHeader } from "@/components/ui-elements/section-header"
import { ActionButton } from "@/components/ui-elements/action-button"
import { StatusBadge } from "@/components/ui-elements/status-badge"
import { HelpDrawer } from "@/components/ui-elements/help-drawer"
// Importar el componente de notificaciones
import { OrderNotifications } from "@/components/pos/order-notifications"

// Clave para almacenar favoritos en localStorage
const FAVORITES_STORAGE_KEY = "raizygrano_favorites"
const RECENT_PRODUCTS_KEY = "raizygrano_recent_products"

export default function POSPage() {
  const { user } = useAuth()
  const [order, setOrder] = useState<OrderItem[]>([])
  const [activeTab, setActiveTab] = useState("")
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [products, setProducts] = useState<{ [key: string]: Product[] }>({})
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [processingOrder, setProcessingOrder] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([]) // IDs de productos favoritos
  const [recentProducts, setRecentProducts] = useState<Product[]>([]) // Productos recientes
  const [indexUrl, setIndexUrl] = useState<string | null>(null)

  // Cargar datos
  useEffect(() => {
    loadData()
    loadFavorites()
    loadRecentProducts()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      // Cargar categorías y todos los productos en paralelo
      const [cats, prods] = await Promise.all([getCategories(), getProducts()])

      setCategories(cats)
      setAllProducts(prods)

      if (cats.length > 0) {
        // Añadir pestañas especiales
        setActiveTab("favorites")

        // Organizar productos por categoría
        const productsByCategory: { [key: string]: Product[] } = {
          favorites: [], // Se llenará después
          recent: [], // Se llenará después
        }

        // Cargar productos por categoría
        for (const cat of cats) {
          const categoryProducts = await getProductsByCategory(cat.id)
          productsByCategory[cat.id] = categoryProducts
        }

        setProducts(productsByCategory)
      }
    } catch (error: any) {
      console.error("Error al cargar datos:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los datos",
      })
    } finally {
      setLoading(false)
    }
  }

  // Cargar favoritos desde localStorage
  const loadFavorites = () => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    } catch (error) {
      console.error("Error al cargar favoritos:", error)
    }
  }

  // Guardar favoritos en localStorage
  const saveFavorites = (newFavorites: string[]) => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites))
      setFavorites(newFavorites)
    } catch (error) {
      console.error("Error al guardar favoritos:", error)
    }
  }

  // Cargar productos recientes
  const loadRecentProducts = () => {
    try {
      const storedRecent = localStorage.getItem(RECENT_PRODUCTS_KEY)
      if (storedRecent) {
        setRecentProducts(JSON.parse(storedRecent))
      }
    } catch (error) {
      console.error("Error al cargar productos recientes:", error)
    }
  }

  // Guardar producto reciente
  const saveRecentProduct = (product: Product) => {
    try {
      // Añadir al principio y eliminar duplicados
      const updatedRecent = [product, ...recentProducts.filter((p) => p.id !== product.id)].slice(0, 10)
      localStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(updatedRecent))
      setRecentProducts(updatedRecent)

      // Actualizar la lista de recientes en products
      setProducts((prev) => ({
        ...prev,
        recent: updatedRecent,
      }))
    } catch (error) {
      console.error("Error al guardar producto reciente:", error)
    }
  }

  // Alternar favorito
  const toggleFavorite = (productId: string) => {
    const isFavorite = favorites.includes(productId)
    let newFavorites: string[]

    if (isFavorite) {
      newFavorites = favorites.filter((id) => id !== productId)
    } else {
      newFavorites = [...favorites, productId]
    }

    saveFavorites(newFavorites)

    // Actualizar la lista de favoritos en products
    const favoriteProducts = allProducts.filter((product) => newFavorites.includes(product.id))
    setProducts((prev) => ({
      ...prev,
      favorites: favoriteProducts,
    }))
  }

  // Verificar si un producto es favorito
  const isFavorite = (productId: string) => favorites.includes(productId)

  // Efecto para actualizar productos favoritos cuando cambian los favoritos o allProducts
  useEffect(() => {
    if (allProducts.length > 0 && favorites.length > 0) {
      const favoriteProducts = allProducts.filter((product) => favorites.includes(product.id))
      setProducts((prev) => ({
        ...prev,
        favorites: favoriteProducts,
      }))
    } else {
      setProducts((prev) => ({
        ...prev,
        favorites: [],
      }))
    }
  }, [favorites, allProducts])

  const addToOrder = (product: Product) => {
    // Guardar como producto reciente
    saveRecentProduct(product)

    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((item) => item.product.id === product.id)

      if (existingItem) {
        return prevOrder.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prevOrder, { product, quantity: 1 }]
      }
    })

    // Mostrar feedback
    toast({
      title: "Producto añadido",
      description: `${product.name} añadido a la orden`,
      duration: 1500,
    })
  }

  const removeFromOrder = (productId: string) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((item) => item.product.id === productId)

      if (existingItem && existingItem.quantity > 1) {
        return prevOrder.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
        )
      } else {
        return prevOrder.filter((item) => item.product.id !== productId)
      }
    })
  }

  const deleteFromOrder = (productId: string) => {
    setOrder((prevOrder) => prevOrder.filter((item) => item.product.id !== productId))
  }

  const calculateTotal = () => {
    return order.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const generateReceipt = async () => {
    if (order.length === 0) return

    try {
      setProcessingOrder(true)
      // Guardar ticket
      const ticket = await addTicket(order, user?.uid, user?.email || undefined)

      // Limpiar orden
      setOrder([])

      // Mostrar confirmación
      toast({
        title: "Ticket generado",
        description: `Ticket #${ticket.ticketNumber} generado correctamente`,
        variant: "success",
      })
    } catch (error: any) {
      console.error("Error al generar ticket:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo generar el ticket",
      })
    } finally {
      setProcessingOrder(false)
    }
  }

  // Filtrar productos por término de búsqueda
  const filteredProducts =
    searchTerm.trim() !== ""
      ? allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (product.origin && product.origin.toLowerCase().includes(searchTerm.toLowerCase())),
        )
      : []

  return (
    <AuthenticatedLayout>
      <PageContainer>
        <SectionHeader
          title="Punto de Venta"
          icon={<Coffee className="h-5 w-5" />}
          action={
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsSearching(!isSearching)}>
                {isSearching ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          }
        />

        {isSearching && (
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              className="pl-9 border-secondary/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        )}

        {indexUrl && <FirebaseIndexAlert indexUrl={indexUrl} onClose={() => setIndexUrl(null)} />}

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Cargando...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 flex-1 overflow-hidden">
            <div className="flex flex-col h-full">
              {searchTerm.trim() !== "" ? (
                // Mostrar resultados de búsqueda
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium mb-2">Resultados de búsqueda ({filteredProducts.length})</div>
                  <ScrollArea className="h-[200px]">
                    <div className="grid grid-cols-2 gap-2 p-1">
                      {filteredProducts.length === 0 ? (
                        <div className="col-span-2 text-center p-4 text-muted-foreground italic">
                          No se encontraron productos
                        </div>
                      ) : (
                        filteredProducts.map((product) => (
                          <Card
                            key={product.id}
                            className="cursor-pointer hover:bg-accent/20 transition-colors border-secondary/30 relative shadow-sm"
                          >
                            <CardContent className="p-3" onClick={() => addToOrder(product)}>
                              <div className="font-medium">{product.name}</div>
                              {product.origin && (
                                <div className="text-xs text-secondary italic">Origen: {product.origin}</div>
                              )}
                              <div className="text-sm text-muted-foreground">${product.price.toFixed(2)}</div>
                            </CardContent>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={`absolute top-1 right-1 h-6 w-6 ${isFavorite(product.id) ? "text-yellow-500" : "text-muted-foreground"}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(product.id)
                              }}
                            >
                              <Star className="h-3 w-3" fill={isFavorite(product.id) ? "currentColor" : "none"} />
                            </Button>
                          </Card>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
              ) : (
                // Mostrar pestañas normales
                <Tabs
                  defaultValue={activeTab}
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="flex-1 flex flex-col"
                >
                  <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${categories.length + 2}, 1fr)` }}>
                    <TabsTrigger
                      value="favorites"
                      className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white"
                    >
                      <Star className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger
                      value="recent"
                      className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                      <Clock className="h-4 w-4" />
                    </TabsTrigger>
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.id}
                        value={category.id}
                        className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Pestaña de favoritos */}
                  <TabsContent value="favorites" className="flex-1 overflow-hidden">
                    <ScrollArea className="h-[200px]">
                      <div className="grid grid-cols-2 gap-2 p-1">
                        {products.favorites?.length === 0 ? (
                          <div className="col-span-2 text-center p-4 text-muted-foreground italic">
                            No tienes productos favoritos. Marca productos como favoritos haciendo clic en la estrella.
                          </div>
                        ) : (
                          products.favorites?.map((product) => (
                            <Card
                              key={product.id}
                              className="cursor-pointer hover:bg-accent/20 transition-colors border-secondary/30 relative shadow-sm"
                            >
                              <CardContent className="p-3" onClick={() => addToOrder(product)}>
                                <div className="font-medium">{product.name}</div>
                                {product.origin && (
                                  <div className="text-xs text-secondary italic">Origen: {product.origin}</div>
                                )}
                                <div className="text-sm text-muted-foreground">${product.price.toFixed(2)}</div>
                              </CardContent>
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`absolute top-1 right-1 h-6 w-6 text-yellow-500`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(product.id)
                                }}
                              >
                                <Star className="h-3 w-3" fill="currentColor" />
                              </Button>
                            </Card>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  {/* Pestaña de recientes */}
                  <TabsContent value="recent" className="flex-1 overflow-hidden">
                    <ScrollArea className="h-[200px]">
                      <div className="grid grid-cols-2 gap-2 p-1">
                        {recentProducts.length === 0 ? (
                          <div className="col-span-2 text-center p-4 text-muted-foreground italic">
                            No hay productos recientes. Los productos que agregues a la orden aparecerán aquí.
                          </div>
                        ) : (
                          recentProducts.map((product) => (
                            <Card
                              key={product.id}
                              className="cursor-pointer hover:bg-accent/20 transition-colors border-secondary/30 relative shadow-sm"
                            >
                              <CardContent className="p-3" onClick={() => addToOrder(product)}>
                                <div className="font-medium">{product.name}</div>
                                {product.origin && (
                                  <div className="text-xs text-secondary italic">Origen: {product.origin}</div>
                                )}
                                <div className="text-sm text-muted-foreground">${product.price.toFixed(2)}</div>
                              </CardContent>
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`absolute top-1 right-1 h-6 w-6 ${isFavorite(product.id) ? "text-yellow-500" : "text-muted-foreground"}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavorite(product.id)
                                }}
                              >
                                <Star className="h-3 w-3" fill={isFavorite(product.id) ? "currentColor" : "none"} />
                              </Button>
                            </Card>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  {/* Pestañas de categorías */}
                  {categories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="flex-1 overflow-hidden">
                      <ScrollArea className="h-[200px]">
                        <div className="grid grid-cols-2 gap-2 p-1">
                          {products[category.id]?.length === 0 ? (
                            <div className="col-span-2 text-center p-4 text-muted-foreground italic">
                              No hay productos en esta categoría
                            </div>
                          ) : (
                            products[category.id]?.map((product) => (
                              <Card
                                key={product.id}
                                className="cursor-pointer hover:bg-accent/20 transition-colors border-secondary/30 relative shadow-sm"
                              >
                                <CardContent className="p-3" onClick={() => addToOrder(product)}>
                                  <div className="font-medium">{product.name}</div>
                                  {product.origin && (
                                    <div className="text-xs text-secondary italic">Origen: {product.origin}</div>
                                  )}
                                  <div className="text-sm text-muted-foreground">${product.price.toFixed(2)}</div>
                                </CardContent>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className={`absolute top-1 right-1 h-6 w-6 ${isFavorite(product.id) ? "text-yellow-500" : "text-muted-foreground"}`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleFavorite(product.id)
                                  }}
                                >
                                  <Star className="h-3 w-3" fill={isFavorite(product.id) ? "currentColor" : "none"} />
                                </Button>
                              </Card>
                            ))
                          )}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  ))}
                </Tabs>
              )}
            </div>

            <Card className="flex flex-col border rounded-lg overflow-hidden border-secondary/30 shadow-md">
              <div className="p-3 bg-muted/50 font-medium font-serif flex justify-between items-center">
                <span>Orden Actual</span>
                {order.length > 0 && (
                  <StatusBadge status="info">
                    {order.length} {order.length === 1 ? "producto" : "productos"}
                  </StatusBadge>
                )}
              </div>

              <ScrollArea className="flex-1 h-[200px]">
                {order.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground italic">No hay productos en la orden</div>
                ) : (
                  <div className="p-2">
                    {order.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex items-center justify-between py-2 border-b border-secondary/10 last:border-0"
                      >
                        <div className="flex-1">
                          <div className="font-medium">{item.product.name}</div>
                          {item.product.origin && (
                            <div className="text-xs text-secondary italic">Origen: {item.product.origin}</div>
                          )}
                          <div className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 border-secondary/30"
                            onClick={() => removeFromOrder(item.product.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <Badge variant="outline" className="min-w-[30px] text-center border-secondary/30">
                            {item.quantity}
                          </Badge>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 border-secondary/30"
                            onClick={() => addToOrder(item.product)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => deleteFromOrder(item.product.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <Separator className="bg-secondary/20" />

              <div className="p-3 flex justify-between items-center font-medium">
                <span>Total:</span>
                <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
              </div>

              <ActionButton
                className="m-3 bg-secondary hover:bg-secondary/80"
                disabled={order.length === 0 || processingOrder}
                onClick={generateReceipt}
                loading={processingOrder}
                icon={<Receipt className="h-4 w-4" />}
              >
                {processingOrder ? "Procesando..." : "Generar Ticket"}
              </ActionButton>
            </Card>
          </div>
        )}

        {/* Componente de notificaciones de pedidos */}
        <OrderNotifications />
        <HelpDrawer />
        <Toaster />
      </PageContainer>
    </AuthenticatedLayout>
  )
}
