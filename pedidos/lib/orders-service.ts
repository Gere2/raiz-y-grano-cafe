import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  type DocumentData,
  type QuerySnapshot,
} from "firebase/firestore"
import { db } from "./firebase"

// Tipos
export type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled"
export type DeliveryType = "classroom" | "pickup"

export type Order = {
  id: string
  teacherName: string
  teacherId?: string
  items: {
    productId: string
    productName: string
    quantity: number
    price: number
  }[]
  total: number
  status: OrderStatus
  deliveryType: DeliveryType
  classroom?: string
  notes?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Colección
const ORDERS_COLLECTION = "teacher_orders"

// Crear un nuevo pedido
export const createOrder = async (order: Omit<Order, "id" | "createdAt" | "updatedAt" | "status">): Promise<Order> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    const orderData = {
      ...order,
      status: "pending" as OrderStatus,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData)

    return {
      id: docRef.id,
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    } as Order
  } catch (error: any) {
    console.error("Error al crear pedido:", error)
    throw new Error(`Error al crear pedido: ${error.message}`)
  }
}

// Escuchar cambios en los pedidos (en tiempo real)
export const listenForNewOrders = (callback: (orders: Order[]) => void): (() => void) => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    const ordersRef = collection(db, ORDERS_COLLECTION)
    const q = query(ordersRef, where("status", "==", "pending"), orderBy("createdAt", "asc"))

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[]
      callback(orders)
    })

    return unsubscribe
  } catch (error: any) {
    console.error("Error al escuchar pedidos:", error)
    return () => {} // Retornar función vacía para evitar errores
  }
}

// Actualizar el estado de un pedido
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<void> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId)
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    })
  } catch (error: any) {
    console.error("Error al actualizar estado del pedido:", error)
    throw new Error(`Error al actualizar estado del pedido: ${error.message}`)
  }
}
