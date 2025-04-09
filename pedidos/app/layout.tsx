import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

export const metadata: Metadata = {
  title: "RAÍZ y GRANO - Pedidos",
  description: "Sistema de pedidos para profesores de RAÍZ y GRANO",
  metadataBase: new URL(process.env.NODE_ENV === "production" ? "https://raizygrano.com" : "http://localhost:3000"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${lora.variable}`}>
      <body className="font-serif">{children}</body>
    </html>
  )
}
