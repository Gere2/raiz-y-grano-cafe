import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  variant?: "default" | "minimal" | "inverse"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function BrandLogo({ variant = "default", size = "md", className }: BrandLogoProps) {
  const logoSrc =
    variant === "minimal" ? "/logo-minimal.svg" : variant === "inverse" ? "/logo-inverse.svg" : "/logo.svg"

  const sizeMap = {
    sm: { width: 100, height: 100 },
    md: { width: 150, height: 150 },
    lg: { width: 200, height: 200 },
  }

  const { width, height } = sizeMap[size]

  return (
    <div className={cn("flex justify-center", className)}>
      <Image
        src={logoSrc || "/placeholder.svg"}
        alt="RAÍZ y GRANO"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  )
}
