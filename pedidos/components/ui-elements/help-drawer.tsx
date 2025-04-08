"use client"

import { useState } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { HelpCircle, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export function HelpDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4 rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-xl font-serif">Centro de Ayuda</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
          <DrawerDescription>Encuentra respuestas a tus preguntas y aprende a usar el sistema</DrawerDescription>
        </DrawerHeader>

        <Tabs defaultValue="general" className="px-4 py-2">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="ventas">Ventas</TabsTrigger>
            <TabsTrigger value="productos">Productos</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[50vh]">
            <TabsContent value="general" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Navegación</h3>
                <p className="text-sm text-muted-foreground">
                  Utiliza el menú principal para acceder a todas las secciones del sistema. Puedes volver a la pantalla
                  de inicio en cualquier momento haciendo clic en el botón de flecha atrás.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Configuración</h3>
                <p className="text-sm text-muted-foreground">
                  En la sección de configuración puedes personalizar los datos fiscales, ajustar el contador de tickets
                  y cambiar las preferencias del sistema.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Usuarios</h3>
                <p className="text-sm text-muted-foreground">
                  Cada usuario tiene su propia cuenta. Para cerrar sesión, utiliza el menú de usuario en la esquina
                  superior derecha de la pantalla.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="ventas" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Crear una venta</h3>
                <p className="text-sm text-muted-foreground">
                  1. Ve a la sección "Venta" desde el menú principal
                  <br />
                  2. Selecciona los productos haciendo clic en ellos
                  <br />
                  3. Ajusta las cantidades con los botones + y -<br />
                  4. Haz clic en "Generar Ticket" para finalizar la venta
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Productos favoritos</h3>
                <p className="text-sm text-muted-foreground">
                  Puedes marcar productos como favoritos haciendo clic en el icono de estrella. Los productos favoritos
                  aparecerán en la pestaña de favoritos para un acceso más rápido.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Gestión de tickets</h3>
                <p className="text-sm text-muted-foreground">
                  En la sección "Tickets" puedes ver, imprimir y eliminar tickets. Utiliza los filtros para encontrar
                  tickets específicos por fecha o monto.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="productos" className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Añadir productos</h3>
                <p className="text-sm text-muted-foreground">
                  1. Ve a la sección "Productos" desde el menú principal
                  <br />
                  2. Haz clic en el botón + en la esquina superior derecha
                  <br />
                  3. Completa el formulario con los datos del producto
                  <br />
                  4. Haz clic en "Añadir" para guardar el producto
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Gestionar categorías</h3>
                <p className="text-sm text-muted-foreground">
                  En la sección "Categorías" puedes crear, editar y eliminar categorías de productos. Cada producto debe
                  pertenecer a una categoría.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-medium">Editar productos</h3>
                <p className="text-sm text-muted-foreground">
                  Para editar un producto, haz clic en el icono de lápiz junto al producto. Para eliminarlo, haz clic en
                  el icono de papelera.
                </p>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DrawerFooter className="border-t pt-4">
          <p className="text-center text-sm text-muted-foreground">
            Si necesitas más ayuda, contacta al administrador del sistema.
          </p>
          <DrawerClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
