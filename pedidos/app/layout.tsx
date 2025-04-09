
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
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/pedidos/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/pedidos/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/pedidos/favicon-16x16.png" />
        <link rel="manifest" href="/pedidos/site.webmanifest" />
      </head>
      <body className="font-serif bg-cream-50">
        <div className="min-h-screen flex flex-col">
          <header className="bg-coffee-500 py-3 text-white text-center shadow-md">
            <div className="container mx-auto px-4">
              <img 
                src="/pedidos/logo-minimal.svg" 
                alt="RAÍZ y GRANO" 
                className="h-10 mx-auto" 
              />
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="py-4 text-center text-xs text-coffee-400 border-t border-cream-200">
            <p>&copy; {new Date().getFullYear()} RAÍZ y GRANO - Todos los derechos reservados</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
