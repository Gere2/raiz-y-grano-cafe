"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Eye, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getTickets, type Ticket, deleteTicket } from "@/lib/ticket-service"
import { AuthenticatedLayout } from "@/components/authenticated-layout"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
// Importar el nuevo componente TicketDetail
import { TicketDetail } from "@/components/ticket-detail"
// Importar el componente TicketFilter
import { TicketFilter } from "@/components/ticket-filter"
// Importar el componente TicketSummary
import { TicketSummary } from "@/components/ticket-summary"

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<Ticket[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReceipt, setSelectedReceipt] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  // Añadir estados para los filtros
  const [filters, setFilters] = useState({
    dateFrom: undefined as Date | undefined,
    dateTo: undefined as Date | undefined,
    minAmount: undefined as number | undefined,
    maxAmount: undefined as number | undefined,
    sortBy: "date-desc" as string,
  })

  useEffect(() => {
    loadTickets()
  }, [])

  const loadTickets = async () => {
    try {
      setLoading(true)
      const tickets = await getTickets()
      setReceipts(tickets)
    } catch (error) {
      console.error("Error al cargar tickets:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los tickets",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredReceipts = receipts
    .filter((receipt) => {
      // Filtro de búsqueda
      const matchesSearch =
        searchTerm === "" ||
        receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (receipt.ticketNumber && receipt.ticketNumber.toString().includes(searchTerm)) ||
        (receipt.date && format(new Date((receipt.date as any).toDate()), "dd/MM/yyyy").includes(searchTerm))

      // Filtro de fecha
      const receiptDate = receipt.date ? new Date((receipt.date as any).toDate()) : new Date()
      const matchesDateFrom = !filters.dateFrom || receiptDate >= filters.dateFrom
      const matchesDateTo = !filters.dateTo || receiptDate <= filters.dateTo

      // Filtro de monto
      const matchesMinAmount = !filters.minAmount || receipt.total >= filters.minAmount
      const matchesMaxAmount = !filters.maxAmount || receipt.total <= filters.maxAmount

      return matchesSearch && matchesDateFrom && matchesDateTo && matchesMinAmount && matchesMaxAmount
    })
    .sort((a, b) => {
      // Ordenamiento
      const dateA = a.date ? new Date((a.date as any).toDate()) : new Date()
      const dateB = b.date ? new Date((b.date as any).toDate()) : new Date()

      switch (filters.sortBy) {
        case "date-asc":
          return dateA.getTime() - dateB.getTime()
        case "date-desc":
          return dateB.getTime() - dateA.getTime()
        case "amount-asc":
          return a.total - b.total
        case "amount-desc":
          return b.total - a.total
        default:
          return dateB.getTime() - dateA.getTime()
      }
    })

  const handlePrint = () => {
    // En una app real, esto activaría la funcionalidad de impresión
    toast({
      title: "Imprimiendo",
      description: "Enviando ticket a la impresora...",
    })
  }

  const handleDownload = () => {
    // En una app real, esto descargaría el ticket como PDF
    toast({
      title: "Descargando",
      description: "Descargando ticket como PDF...",
    })
  }

  const handleDeleteTicket = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este ticket?")) {
      return
    }

    try {
      setDeleting(true)
      await deleteTicket(id)
      await loadTickets()
      setSelectedReceipt(null)
      toast({
        title: "Ticket eliminado",
        description: "El ticket se ha eliminado correctamente",
      })
    } catch (error) {
      console.error("Error al eliminar ticket:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el ticket",
      })
    } finally {
      setDeleting(false)
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
          <h1 className="text-xl font-bold">Tickets</h1>
          <div className="w-9"></div> {/* Spacer for alignment */}
        </header>

        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar tickets..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <TicketFilter onFilterChange={setFilters} />
        </div>
        {filteredReceipts.length > 0 && <TicketSummary tickets={filteredReceipts} />}

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Cargando tickets...</span>
          </div>
        ) : (
          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {filteredReceipts.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground">No se encontraron tickets</div>
              ) : (
                filteredReceipts.map((receipt) => (
                  <Card key={receipt.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                    <CardContent className="p-3" onClick={() => setSelectedReceipt(receipt)}>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" className="w-full h-full p-0 m-0">
                            <div className="flex items-center justify-between w-full">
                              <div className="text-left">
                                <div className="font-medium">
                                  Ticket #{receipt.ticketNumber || receipt.id.substring(0, 6)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {format(new Date((receipt.date as any).toDate()), "dd MMMM yyyy, HH:mm", {
                                    locale: es,
                                  })}
                                </div>
                                {receipt.userName && (
                                  <div className="text-xs text-muted-foreground">Usuario: {receipt.userName}</div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="font-medium">${receipt.total.toFixed(2)}</div>
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </Button>
                        </DialogTrigger>
                        {/* Reemplazar el contenido del DialogContent con el componente TicketDetail */}
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Ticket #{receipt.ticketNumber || receipt.id.substring(0, 6)}</DialogTitle>
                          </DialogHeader>
                          <TicketDetail
                            ticket={receipt}
                            onDelete={() => {
                              loadTickets()
                              setSelectedReceipt(null)
                            }}
                          />
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        )}

        <Toaster />
      </div>
    </AuthenticatedLayout>
  )
}
