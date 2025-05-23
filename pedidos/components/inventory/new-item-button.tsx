"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Loader2 } from "lucide-react"
import { addInventoryItem, type InventoryCategory } from "@/lib/inventory-service"
import { toast } from "@/components/ui/use-toast"

interface NewItemButtonProps {
  categories: InventoryCategory[]
  onItemAdded: () => void
}

export function NewItemButton({ categories, onItemAdded }: NewItemButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "0",
    unit: "unidades",
    minStock: "0",
    supplier: "",
    batchNumber: "",
    notes: "",
  })

  // Depuración: Mostrar las categorías recibidas
  useEffect(() => {
    console.log("Categorías disponibles:", categories)
  }, [categories])

  const handleSubmit = async () => {
    if (!formData.name || !formData.category) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor completa los campos obligatorios",
      })
      return
    }

    try {
      setLoading(true)
      console.log("Enviando datos:", formData)

      // Crear un objeto con solo los campos necesarios
      const itemData: any = {
        name: formData.name,
        category: formData.category,
        stock: Number(formData.stock),
        unit: formData.unit,
        minStock: Number(formData.minStock),
      }

      // Solo añadir campos opcionales si tienen un valor
      if (formData.supplier && formData.supplier.trim() !== "") {
        itemData.supplier = formData.supplier.trim()
      }

      if (formData.batchNumber && formData.batchNumber.trim() !== "") {
        itemData.batchNumber = formData.batchNumber.trim()
      }

      if (formData.notes && formData.notes.trim() !== "") {
        itemData.notes = formData.notes.trim()
      }

      await addInventoryItem(itemData)

      toast({
        title: "Item añadido",
        description: "El item se ha añadido correctamente al inventario",
      })

      // Limpiar formulario
      setFormData({
        name: "",
        category: "",
        stock: "0",
        unit: "unidades",
        minStock: "0",
        supplier: "",
        batchNumber: "",
        notes: "",
      })

      // Cerrar diálogo
      setOpen(false)

      // Notificar al componente padre
      onItemAdded()
    } catch (error: any) {
      console.error("Error al añadir item:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo añadir el item",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button variant="outline" size="sm" className="h-8" onClick={() => setOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Nuevo Item
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Añadir Item al Inventario</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-secondary/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    console.log("Categoría seleccionada:", value)
                    setFormData({ ...formData, category: value })
                  }}
                >
                  <SelectTrigger id="category" className="border-secondary/30">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories && categories.length > 0 ? (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-categories" disabled>
                        No hay categorías disponibles
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Actual</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="border-secondary/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unidad</Label>
                <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                  <SelectTrigger id="unit" className="border-secondary/30">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unidades">Unidades</SelectItem>
                    <SelectItem value="kg">Kilogramos</SelectItem>
                    <SelectItem value="g">Gramos</SelectItem>
                    <SelectItem value="l">Litros</SelectItem>
                    <SelectItem value="ml">Mililitros</SelectItem>
                    <SelectItem value="paquetes">Paquetes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="minStock">Stock Mínimo</Label>
                <Input
                  id="minStock"
                  type="number"
                  min="0"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                  className="border-secondary/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplier">Proveedor</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="border-secondary/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="batchNumber">Número de Lote</Label>
                <Input
                  id="batchNumber"
                  value={formData.batchNumber}
                  onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                  className="border-secondary/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="border-secondary/30"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-secondary hover:bg-secondary/80" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Añadiendo...
                </>
              ) : (
                "Añadir Item"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
