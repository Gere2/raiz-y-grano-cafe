"use client"

import { useState, useEffect } from "react"
import { Plus, Minus, ShoppingCart, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { getProducts, getCategories, type Product, type Category } from "@/lib/product-service"
import { createOrder, type DeliveryType } from "@/lib/orders-service"
import { RaizGranoLogo } from "@/components/raizygrano-logo"

export default function PedidoPage() {
  const [activeTab, setActiveTab] = useState("")
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<{ [key: string]: Product[] }>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Datos del pedido
  const [teacherName, setTeacherName] = useState("")
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("classroom")
  const [classroom, setClassroom] = useState("")
  const [notes, setNotes] = useState("")
  const [orderItems, setOrderItems] = useState<
    {
      productId: string
      productName: string
      quantity: number
      price: number
    }[]
  >([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [cats, prods] = await Promise.all([getCategories(), getProducts()])

      setCategories(cats)

      if (cats.length > 0) {
        setActiveTab(cats[0].id)

        // Organizar productos por categoría
        const productsByCategory: { [key: string]: Product[] } = {}

        // Filtrar productos por categoría
        cats.forEach((cat) => {
          productsByCategory[cat.id] = prods.filter((product) => product.category === cat.id)
        })

        setProducts(productsByCategory)
      }
    } catch (error) {
      console.error("Error al cargar datos:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los productos",
      })
    } finally {
      setLoading(false)
    }
  }

  const addToOrder = (product: Product) => {
    setOrderItems((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id)

      if (existingItem) {
        return prev.map((item) => (item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            productName: product.name,
            quantity: 1,
            price: product.price,
          },
        ]
      }
    })

    toast({
      title: "Producto añadido",
      description: `${product.name} añadido al pedido`,
      duration: 1500,
    })
  }

  const removeFromOrder = (productId: string) => {
    setOrderItems((prev) => {
      const existingItem = prev.find((item) => item.productId === productId)

      if (existingItem && existingItem.quantity > 1) {
        return prev.map((item) => (item.productId === productId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prev.filter((item) => item.productId !== productId)
      }
    })
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleSubmitOrder = async () => {
    if (!teacherName) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor ingrese su nombre",
      })
      return
    }

    if (orderItems.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "El pedido está vacío",
      })
      return
    }

    if (deliveryType === "classroom" && !classroom) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor ingrese el aula para la entrega",
      })
      return
    }

    try {
      setSubmitting(true)

      await createOrder({
        teacherName,
        items: orderItems,
        total: calculateTotal(),
        deliveryType,
        classroom: deliveryType === "classroom" ? classroom : undefined,
        notes: notes || undefined,
      })

      // Mostrar mensaje de éxito
      setOrderSuccess(true)

      // Limpiar formulario
      setOrderItems([])
      setNotes("")
      setTeacherName("")
      setClassroom("")
    } catch (error) {
      console.error("Error al enviar pedido:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar el pedido",
      })
    } finally {
      setSubmitting(false)
    }
  }

  // Si el pedido fue exitoso, mostrar pantalla de confirmación
  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md border-secondary/30">
          <CardHeader className="text-center">
            <RaizGranoLogo className="mx-auto mb-4" />
            <CardTitle className="text-2xl font-serif text-success">¡Pedido Recibido!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Su pedido ha sido enviado correctamente y está siendo procesado.</p>
            <p className="text-muted-foreground">Recibirá una notificación cuando su pedido esté listo.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="bg-secondary hover:bg-secondary/80" onClick={() => setOrderSuccess(false)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Realizar otro pedido
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <header className="text-center mb-6">
          <RaizGranoLogo className="mx-auto mb-4" />
          <h1 className="text-xl font-bold font-serif">Pedido para Profesores</h1>
        </header>

        <Card className="mb-4 border-secondary/30">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-lg font-serif">Información del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="space-y-3">
              <div>
                <Label htmlFor="teacherName">Nombre del Profesor*</Label>
                <Input
                  id="teacherName"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="border-secondary/30"
                  placeholder="Ingrese su nombre"
                />
              </div>

              <div>
                <Label>Tipo de Entrega*</Label>
                <RadioGroup
                  value={deliveryType}
                  onValueChange={(value) => setDeliveryType(value as DeliveryType)}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="classroom" id="classroom" />
                    <Label htmlFor="classroom">Entrega en Aula</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup">Recoger en Cafetería</Label>
                  </div>
                </RadioGroup>
              </div>

              {deliveryType === "classroom" && (
                <div>
                  <Label htmlFor="classroom">Aula*</Label>
                  <Input
                    id="classroom"
                    value={classroom}
                    onChange={(e) => setClassroom(e.target.value)}
                    className="border-secondary/30"
                    placeholder="Ej: A-101"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="notes">Notas Adicionales</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="border-secondary/30"
                  placeholder="Instrucciones especiales, alergias, etc."
                  rows={2}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <Card className="border-secondary/30 p-8 text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Cargando productos...</p>
          </Card>
        ) : (
          <Card className="border-secondary/30 mb-4">
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-lg font-serif">Seleccione Productos</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
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

                {categories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
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
                              className="cursor-pointer hover:bg-accent/20 transition-colors border-secondary/30 shadow-sm"
                              onClick={() => addToOrder(product)}
                            >
                              <CardContent className="p-3">
                                <div className="font-medium">{product.name}</div>
                                {product.origin && (
                                  <div className="text-xs text-secondary italic">Origen: {product.origin}</div>
                                )}
                                <div className="text-sm text-muted-foreground">${product.price.toFixed(2)}</div>
                              </CardContent>
                            </Card>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        )}

        <Card className="border-secondary/30 mb-4">
          <CardHeader className="p-3 pb-0">
            <CardTitle className="text-lg font-serif">Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <ScrollArea className="max-h-[200px]">
              {orderItems.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground italic">No hay productos en el pedido</div>
              ) : (
                <div className="space-y-2">
                  {orderItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between py-2 border-b border-secondary/10 last:border-0"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{item.productName}</div>
                        <div className="text-sm text-muted-foreground">${item.price.toFixed(2)}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 border-secondary/30"
                          onClick={() => removeFromOrder(item.productId)}
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
                          onClick={() =>
                            addToOrder({
                              id: item.productId,
                              name: item.productName,
                              price: item.price,
                              category: "",
                            } as Product)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <Separator className="my-3 bg-secondary/20" />

            <div className="flex justify-between items-center font-medium">
              <span>Total:</span>
              <span className="text-xl font-bold">${calculateTotal().toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-secondary hover:bg-secondary/80"
              disabled={orderItems.length === 0 || submitting}
              onClick={handleSubmitOrder}
            >
              {submitting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Pedido
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Toaster />
    </div>
  )
}
