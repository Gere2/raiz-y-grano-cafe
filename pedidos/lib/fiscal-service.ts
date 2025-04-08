import { db } from "./firebase"
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore"

// Definir colección para configuración
const CONFIG_COLLECTION = "config"
const COUNTER_DOC = "ticketCounter"
const FISCAL_DOC = "fiscalData"

// Definir el tipo FiscalData
export type FiscalData = {
  businessName: string
  taxId: string
  address: string
  phone: string
  email?: string
  additionalInfo?: string
}

// Inicializar el contador si no existe
export const initializeTicketCounter = async (startFrom = 1): Promise<void> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    // Usar la colección 'config' para el documento 'ticketCounter'
    const counterRef = doc(db, CONFIG_COLLECTION, COUNTER_DOC)
    const counterSnap = await getDoc(counterRef)

    if (!counterSnap.exists()) {
      await setDoc(counterRef, { ticketNumber: startFrom })
    }
  } catch (error: any) {
    console.error("Error al inicializar contador de tickets:", error)
    // No propagamos el error para evitar bloquear la aplicación
    if (error.code === "permission-denied") {
      console.warn(
        "Permisos insuficientes para inicializar el contador. Se intentará más tarde cuando el usuario esté autenticado.",
      )
      return
    }
  }
}

// Obtener el siguiente número de ticket
export const getNextTicketNumber = async (): Promise<number> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    // Usar la colección 'config' para el documento 'ticketCounter'
    const counterRef = doc(db, CONFIG_COLLECTION, COUNTER_DOC)
    const counterSnap = await getDoc(counterRef)

    if (!counterSnap.exists()) {
      // Si no existe el contador, lo inicializamos en 1
      await setDoc(counterRef, { ticketNumber: 1 })
      return 1
    }

    // Incrementar el contador y devolver el nuevo valor
    const updateResult = await updateDoc(counterRef, {
      ticketNumber: increment(1),
    })

    // Obtener el valor actualizado
    const updatedSnap = await getDoc(counterRef)
    return updatedSnap.data()?.ticketNumber || 1
  } catch (error: any) {
    console.error("Error al obtener número de ticket:", error)
    // En caso de error, devolvemos un valor por defecto
    if (error.code === "permission-denied") {
      console.warn("Permisos insuficientes para acceder al contador. Usando timestamp como fallback.")
      // Usamos timestamp como fallback para asegurar un número único
      return Date.now()
    }
    return Date.now() // Usamos timestamp como fallback
  }
}

// Obtener datos fiscales
export const getFiscalData = async (): Promise<FiscalData | null> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    // Usar la colección 'config' para el documento 'fiscalData'
    const fiscalRef = doc(db, CONFIG_COLLECTION, FISCAL_DOC)
    const fiscalSnap = await getDoc(fiscalRef)

    if (!fiscalSnap.exists()) {
      // Si no existen datos fiscales, devolver valores por defecto
      return {
        businessName: "RAÍZ y GRANO",
        taxId: "",
        address: "",
        phone: "",
        email: "",
        additionalInfo: "",
      }
    }

    return fiscalSnap.data() as FiscalData
  } catch (error: any) {
    console.error("Error al obtener datos fiscales:", error)
    // En caso de error, devolver valores por defecto
    return {
      businessName: "RAÍZ y GRANO",
      taxId: "",
      address: "",
      phone: "",
      email: "",
      additionalInfo: "",
    }
  }
}

// Guardar datos fiscales
export const saveFiscalData = async (data: FiscalData): Promise<void> => {
  if (!db) throw new Error("Firestore no está inicializado")

  try {
    // Usar la colección 'config' para el documento 'fiscalData'
    const fiscalRef = doc(db, CONFIG_COLLECTION, FISCAL_DOC)
    await setDoc(fiscalRef, data)
  } catch (error: any) {
    console.error("Error al guardar datos fiscales:", error)
    throw error
  }
}
