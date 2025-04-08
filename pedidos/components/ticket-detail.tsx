"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Separator } from "@/components/ui/separator"
import { TicketActions } from "@/components/ticket-actions"
import type { Ticket } from "@/lib/ticket-service"

interface TicketDetailProps {
  ticket: Ticket
  onDelete?: () => void
}

export function TicketDetail({ ticket, onDelete }: TicketDetailProps) {
  return (
    <div className="py-4">
      <div className="text-center mb-4">
        <h3 className="font-bold text-lg">{ticket.fiscalData?.businessName || "RAÍZ y GRANO"}</h3>
        {ticket.fiscalData?.taxId && <p className="text-sm">RFC: {ticket.fiscalData.taxId}</p>}
        {ticket.fiscalData?.address && <p className="text-sm">{ticket.fiscalData.address}</p>}
        {ticket.fiscalData?.phone && <p className="text-sm">Tel: {ticket.fiscalData.phone}</p>}
        {ticket.fiscalData?.email && <p className="text-sm">{ticket.fiscalData.email}</p>}
        <p className="text-sm mt-2">
          {format(new Date((ticket.date as any).toDate()), "dd MMMM yyyy, HH:mm", {
            locale: es,
          })}
        </p>
        <p className="text-sm font-bold mt-1">Ticket: #{ticket.ticketNumber || ticket.id.substring(0, 6)}</p>
        {ticket.userName && <p className="text-xs text-muted-foreground">Atendido por: {ticket.userName}</p>}
      </div>

      <Separator className="my-2" />

      <div className="space-y-2">
        {ticket.items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>
              {item.quantity}x {item.product.name}
            </span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <Separator className="my-2" />

      <div className="flex justify-between font-bold mt-4">
        <span>Total</span>
        <span>${ticket.total.toFixed(2)}</span>
      </div>

      {ticket.fiscalData?.additionalInfo && (
        <div className="mt-4 text-xs text-center">{ticket.fiscalData.additionalInfo}</div>
      )}

      <div className="text-center text-xs mt-4">¡Gracias por su compra!</div>

      <TicketActions ticketId={ticket.id} onDelete={onDelete} />
    </div>
  )
}
