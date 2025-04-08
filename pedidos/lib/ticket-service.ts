import {
  collection,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
  getDoc,
  limit,
} from "firebase/firestore"
import { db } from "./firebase"
import type { Product } from "./product-service"
import { getNextTicketNumber, getFiscalData, type FiscalData } from "./fiscal-service"

// Tipos
export type OrderItem = {
  product: Product
  quantity: number
}

export type Ticket = {
  id: string
  ticketNumber: number
  date: Timestamp
  items: OrderItem[]
  total: number
  userId?: string
  userName?: string
  createdAt?: Timestamp
  fiscalData?: FiscalData
}

// Colección
const TICKETS_COLLECTION = "tickets"

// Obtener tickets
export const getTickets = async (): Promise<Ticket[]> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    const ticketsRef = collection(db, TICKETS_COLLECTION)
    const q = query(ticketsRef, orderBy("ticketNumber", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Ticket,
    )
  } catch (error: any) {
    console.error("Error al obtener tickets:", error)
    return []
  }
}

// Obtener ticket por ID
export const getTicketById = async (id: string): Promise<Ticket | null> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    const docRef = doc(db, TICKETS_COLLECTION, id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Ticket
    }

    return null
  } catch (error: any) {
    console.error("Error al obtener ticket:", error)
    return null
  }
}

// Añadir ticket
export const addTicket = async (items: OrderItem[], userId?: string, userName?: string): Promise<Ticket> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    // Calcular total
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    // Obtener el siguiente número de ticket
    const ticketNumber = await getNextTicketNumber()

    // Obtener datos fiscales
    const fiscalData = await getFiscalData()

    const ticketData = {
      ticketNumber,
      date: serverTimestamp(),
      items,
      total,
      userId,
      userName,
      createdAt: serverTimestamp(),
      fiscalData,
    }

    const docRef = await addDoc(collection(db, TICKETS_COLLECTION), ticketData)

    return {
      id: docRef.id,
      ...ticketData,
      date: Timestamp.now(), // Temporal para el retorno
    }
  } catch (error: any) {
    throw new Error(`Error al añadir ticket: ${error.message}`)
  }
}

// Eliminar ticket
export const deleteTicket = async (id: string): Promise<void> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    const docRef = doc(db, TICKETS_COLLECTION, id)
    await deleteDoc(docRef)
  } catch (error: any) {
    throw new Error(`Error al eliminar ticket: ${error.message}`)
  }
}

// Obtener tickets por usuario
export const getTicketsByUser = async (userId: string): Promise<Ticket[]> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    const ticketsRef = collection(db, TICKETS_COLLECTION)
    const q = query(ticketsRef, where("userId", "==", userId), orderBy("ticketNumber", "desc"))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Ticket,
    )
  } catch (error: any) {
    console.error("Error al obtener tickets por usuario:", error)
    return []
  }
}

// Obtener tickets por fecha
export const getTicketsByDate = async (startDate: Date, endDate: Date): Promise<Ticket[]> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    const ticketsRef = collection(db, TICKETS_COLLECTION)
    const q = query(
      ticketsRef,
      where("date", ">=", Timestamp.fromDate(startDate)),
      where("date", "<=", Timestamp.fromDate(endDate)),
      orderBy("date", "desc"),
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Ticket,
    )
  } catch (error: any) {
    console.error("Error al obtener tickets por fecha:", error)
    return []
  }
}

// Obtener ventas totales
export const getTotalSales = async (startDate?: Date, endDate?: Date): Promise<number> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    let tickets: Ticket[]

    if (startDate && endDate) {
      tickets = await getTicketsByDate(startDate, endDate)
    } else {
      tickets = await getTickets()
    }

    return tickets.reduce((sum, ticket) => sum + ticket.total, 0)
  } catch (error: any) {
    console.error("Error al obtener ventas totales:", error)
    return 0
  }
}

// Obtener tickets recientes
export const getRecentTickets = async (count = 5): Promise<Ticket[]> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    const ticketsRef = collection(db, TICKETS_COLLECTION)
    const q = query(ticketsRef, orderBy("ticketNumber", "desc"), limit(count))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Ticket,
    )
  } catch (error: any) {
    console.error("Error al obtener tickets recientes:", error)
    return []
  }
}

// Obtener el último número de ticket
export const getLastTicketNumber = async (): Promise<number> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    const ticketsRef = collection(db, TICKETS_COLLECTION)
    const q = query(ticketsRef, orderBy("ticketNumber", "desc"), limit(1))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return 0 // No hay tickets, empezamos desde 0
    }

    const lastTicket = querySnapshot.docs[0].data() as Ticket
    return lastTicket.ticketNumber || 0
  } catch (error: any) {
    console.error("Error al obtener último número de ticket:", error)
    // En caso de error de permisos, devolvemos 0 para evitar bloquear la aplicación
    if (error.code === "permission-denied") {
      console.warn("Permisos insuficientes para acceder a los tickets. Usando valor predeterminado.")
      return 0
    }
    throw error
  }
}
