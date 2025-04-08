"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Search, Edit, Trash2, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { getCategories, addCategory, updateCategory, deleteCategory, type Category } from "@/lib/product-service"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FirebaseSecurityCheck } from "@/components/firebase-security-check"
import { AuthenticatedLayout } from "@/components/layouts/authenticated-layout"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  const [categoryName, setCategoryName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await getCategories()
      setCategories(data)
      setError(null)
    } catch (error: any) {
      console.error("Error al cargar categorías:", error)
      setError("No se pudieron cargar las categorías. Por favor, intenta de nuevo.")
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las categorías",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      setError("El nombre de la categoría es obligatorio")
      toast({
        variant: "destructive",
        title: "Error",
        description: "El nombre de la categoría es obligatorio",
      })
      return
    }

    setLoading(true)
    setError(null)

    try {
      console.log("Intentando añadir categoría:", categoryName)
      await addCategory({ name: categoryName.trim() })
      await loadCategories()
      setCategoryName("")
      setIsAddDialogOpen(false)
      toast({
        title: "Categoría añadida",
        description: "La categoría se ha añadido correctamente",
      })
    } catch (error: any) {
      console.error("Error al añadir categoría:", error)
      setError(`Error al añadir categoría: ${error.message}`)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo añadir la categoría",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEditCategory = async () => {
    if (!currentCategory || !categoryName.trim()) {
      setError("El nombre de la categoría es obligatorio")
      toast({
        variant: "destructive",
        title: "Error",
        description: "El nombre de la categoría es obligatorio",
      })
      return
    }

    setLoading(true)
    setError(null)

    try {
      await updateCategory(currentCategory.id, { name: categoryName.trim() })
      await loadCategories()
      setCategoryName("")
      setCurrentCategory(null)
      setIsEditDialogOpen(false)
      toast({
        title: "Categoría actualizada",
        description: "La categoría se ha actualizado correctamente",
      })
    } catch (error: any) {
      console.error("Error al actualizar categoría:", error)
      setError(`Error al actualizar categoría: ${error.message}`)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo actualizar la categoría",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (
      !confirm(
        "¿Estás seguro de que quieres eliminar esta categoría? Los productos asociados a esta categoría quedarán sin categoría.",
      )
    ) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      await deleteCategory(id)
      await loadCategories()
      toast({
        title: "Categoría eliminada",
        description: "La categoría se ha eliminado correctamente",
      })
    } catch (error: any) {
      console.error("Error al eliminar categoría:", error)
      setError(`Error al eliminar categoría: ${error.message}`)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "No se pudo eliminar la categoría",
      })
    } finally {
      setLoading(false)
    }
  }

  const openEditDialog = (category: Category) => {
    setCurrentCategory(category)
    setCategoryName(category.name)
    setIsEditDialogOpen(true)
  }

  return (
    <AuthenticatedLayout>
      <div className="container max-w-md mx-auto px-4 py-4 h-[100dvh] flex flex-col">
        <header className="flex items-center justify-between mb-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold font-serif">Gestión de Categorías</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Plus className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-serif">Añadir Categoría</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="border-secondary/30"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <DialogFooter>
                  <Button onClick={handleAddCategory} className="bg-secondary hover:bg-secondary/80" disabled={loading}>
                    {loading ? "Añadiendo..." : "Añadir"}
                  </Button>
                </DialogFooter>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <FirebaseSecurityCheck />

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar categorías..."
            className="pl-9 border-secondary/30"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && !isAddDialogOpen && !isEditDialogOpen && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="flex-1 border-secondary/30">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-lg font-serif">Categorías ({filteredCategories.length})</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-3 space-y-3">
              {loading && filteredCategories.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground italic">Cargando categorías...</div>
              ) : filteredCategories.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground italic">No se encontraron categorías</div>
              ) : (
                filteredCategories.map((category) => (
                  <Card key={category.id} className="border-secondary/20">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{category.name}</div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => openEditDialog(category)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-serif">Editar Categoría</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nombre *</Label>
                <Input
                  id="edit-name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="border-secondary/30"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <DialogFooter>
                <Button onClick={handleEditCategory} className="bg-secondary hover:bg-secondary/80" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar"}
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>

        <Toaster />
      </div>
    </AuthenticatedLayout>
  )
}
