"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Leaf } from "@/components/leaf"
import { RaizGranoLogo } from "@/components/raizygrano-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { FirebaseAuthHelp } from "@/components/firebase-auth-help"

export default function LoginPage() {
  const { signIn, registerUser } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await signIn(email, password)
      router.push("/")
    } catch (error: any) {
      console.error("Error de inicio de sesión:", error)

      // Mejorar los mensajes de error
      if (
        error.message.includes("auth/invalid-credential") ||
        error.message.includes("auth/user-not-found") ||
        error.message.includes("auth/wrong-password")
      ) {
        setError("Correo electrónico o contraseña incorrectos")
      } else if (error.message.includes("auth/too-many-requests")) {
        setError("Demasiados intentos fallidos. Por favor, inténtalo más tarde")
      } else {
        setError(`Error al iniciar sesión: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validación básica
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setLoading(false)
      return
    }

    try {
      await registerUser(email, password)
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
      })
      router.push("/")
    } catch (error: any) {
      console.error("Error de registro:", error)

      // Mejorar los mensajes de error
      if (error.message.includes("auth/email-already-in-use")) {
        setError("Este correo electrónico ya está en uso")
      } else if (error.message.includes("auth/invalid-email")) {
        setError("El formato del correo electrónico no es válido")
      } else if (error.message.includes("auth/weak-password")) {
        setError("La contraseña es demasiado débil")
      } else if (error.message.includes("auth/operation-not-allowed")) {
        setError(
          "El registro con correo electrónico y contraseña no está habilitado. Por favor, contacta al administrador.",
        )
      } else {
        setError(`Error al registrar usuario: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0e9d2] bg-opacity-80 flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <RaizGranoLogo className="mx-auto mb-4" />
          <p className="text-muted-foreground italic">Sistema de punto de venta</p>
        </div>

        <Card className="border-secondary/30">
          <CardHeader>
            <CardTitle className="text-center font-serif">Bienvenido</CardTitle>
            <CardDescription className="text-center">Inicia sesión o regístrate para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-secondary/30"
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary/80" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cargando...
                        </>
                      ) : (
                        "Iniciar Sesión"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Correo electrónico</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Contraseña</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border-secondary/30"
                      />
                      <p className="text-xs text-muted-foreground">La contraseña debe tener al menos 6 caracteres</p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full bg-secondary hover:bg-secondary/80" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Cargando...
                        </>
                      ) : (
                        "Registrarse"
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} RAÍZ y GRANO</p>
          </CardFooter>
        </Card>
      </div>

      {/* Decoración de hojas */}
      <div className="absolute top-0 left-0 w-32 h-32 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-4 -left-4 transform rotate-45">
          <Leaf className="w-16 h-16 text-secondary" />
        </div>
        <div className="absolute top-8 left-8 transform -rotate-15">
          <Leaf className="w-12 h-12 text-secondary" />
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -bottom-4 -right-4 transform -rotate-45">
          <Leaf className="w-16 h-16 text-secondary" />
        </div>
        <div className="absolute bottom-8 right-8 transform rotate-15">
          <Leaf className="w-12 h-12 text-secondary" />
        </div>
      </div>

      <div className="mt-4 text-center">
        <FirebaseAuthHelp />
      </div>

      <Toaster />
    </div>
  )
}
