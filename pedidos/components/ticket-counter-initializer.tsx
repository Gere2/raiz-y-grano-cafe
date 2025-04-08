"use client"

import { useEffect, useState } from "react"
import { initializeTicketCounter } from "@/lib/fiscal-service"
import { getLastTicketNumber } from "@/lib/ticket-service"
import { useAuth } from "@/contexts/auth-context"

export function TicketCounterInitializer() {
  const [initialized, setInitialized] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    // Solo inicializar cuando el usuario esté autenticado
    if (!user) return

    const initialize = async () => {
      try {
        // Obtener el último número de ticket
        const lastNumber = await getLastTicketNumber()

        // Inicializar el contador con el último número + 1
        await initializeTicketCounter(lastNumber + 1)

        setInitialized(true)
      } catch (error) {
        console.error("Error al inicializar contador de tickets:", error)
      }
    }

    initialize()
  }, [user]) // Dependencia en el usuario

  // Este componente no renderiza nada visible
  return null
}
