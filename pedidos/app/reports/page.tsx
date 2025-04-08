"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CalendarIcon, Loader2 } from "lucide-react"
import { format, subDays, startOfDay, endOfDay } from "date-fns"
import { es } from "date-fns/locale"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AuthenticatedLayout } from "@/components/authenticated-layout"
import { getDailySales, getTopProducts, getSalesSummary } from "@/lib/stats-service"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ReportsPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [loading, setLoading] = useState(true)
  const [salesData, setSalesData] = useState<any[]>([])
  const [productData, setProductData] = useState<any[]>([])
  const [summary, setSummary] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageTicket: 0,
  })

  useEffect(() => {
    loadData()
  }, [date])

  const loadData = async () => {
    try {
      setLoading(true)

      // Calcular fechas
      const startDate = startOfDay(subDays(date, 6)) // 7 días atrás
      const endDate = endOfDay(date)

      // Cargar datos
      const [dailySales, topProducts, salesSummary] = await Promise.all([
        getDailySales(7),
        getTopProducts(5, startDate, endDate),
        getSalesSummary(startDate, endDate),
      ])

      setSalesData(dailySales)
      setProductData(topProducts)
      setSummary(salesSummary)
    } catch (error) {
      console.error("Error al cargar datos:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los datos de reportes",
      })
    } finally {
      setLoading(false)
    }
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
          <h1 className="text-xl font-bold">Reportes</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </header>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Cargando datos...</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader className="p-3 pb-1">
                  <CardTitle className="text-sm font-medium">Ventas</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold">${summary.totalSales.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">
                    {format(subDays(date, 6), "dd MMM", { locale: es })} - {format(date, "dd MMM yyyy", { locale: es })}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-3 pb-1">
                  <CardTitle className="text-sm font-medium">Órdenes</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold">{summary.totalOrders}</div>
                  <p className="text-xs text-muted-foreground">
                    {format(subDays(date, 6), "dd MMM", { locale: es })} - {format(date, "dd MMM yyyy", { locale: es })}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-4">
              <CardHeader className="p-3 pb-1">
                <CardTitle className="text-sm font-medium">Valor promedio por orden</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="text-2xl font-bold">${summary.averageTicket.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {format(subDays(date, 6), "dd MMM", { locale: es })} - {format(date, "dd MMM yyyy", { locale: es })}
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="sales" className="flex-1">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="sales">Ventas</TabsTrigger>
                <TabsTrigger value="products">Productos</TabsTrigger>
              </TabsList>

              <TabsContent value="sales" className="h-[300px]">
                <Card>
                  <CardHeader className="p-3 pb-1">
                    <CardTitle className="text-sm font-medium">Ventas por día</CardTitle>
                    <CardDescription className="text-xs">
                      {format(subDays(date, 6), "dd MMM", { locale: es })} -{" "}
                      {format(date, "dd MMM yyyy", { locale: es })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => {
                              const date = new Date(value)
                              return format(date, "dd/MM", { locale: es })
                            }}
                          />
                          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                          <Tooltip
                            formatter={(value) => [`$${value}`, "Ventas"]}
                            labelFormatter={(label) => {
                              const date = new Date(label)
                              return format(date, "dd MMMM yyyy", { locale: es })
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#7a7d4e"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="h-[300px]">
                <Card>
                  <CardHeader className="p-3 pb-1">
                    <CardTitle className="text-sm font-medium">Productos más vendidos</CardTitle>
                    <CardDescription className="text-xs">
                      {format(subDays(date, 6), "dd MMM", { locale: es })} -{" "}
                      {format(date, "dd MMM yyyy", { locale: es })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={productData}
                          layout="vertical"
                          margin={{ top: 5, right: 10, left: 70, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" tickLine={false} axisLine={false} />
                          <YAxis dataKey="productName" type="category" tickLine={false} axisLine={false} width={60} />
                          <Tooltip formatter={(value) => [`${value}`, "Cantidad"]} />
                          <Bar dataKey="quantity" fill="#7a7d4e" radius={4} barSize={20} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}

        <Toaster />
      </div>
    </AuthenticatedLayout>
  )
}
