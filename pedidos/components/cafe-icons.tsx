import type * as React from "react"

interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number
}

export function CoffeeIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  )
}

export function CoffeeGrinderIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 2v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2" />
      <rect x="6" y="6" width="12" height="8" rx="2" />
      <path d="M10 14v3" />
      <path d="M14 14v3" />
      <path d="M8 17h8" />
      <path d="M10 20h4" />
      <circle cx="12" cy="10" r="1" />
    </svg>
  )
}

export function CoffeeBeanIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 12c0-6 9-6 9 0s-9 6-9 0" />
      <path d="M9 12c0-6 9-6 9 0s-9 6-9 0" />
    </svg>
  )
}

export function PlantIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 10V5c0-1.1.9-2 2-2s2 .9 2 2v10c0 1.1-.9 2-2 2s-2-.9-2-2v-5z" />
      <path d="M12 10H8c-1.1 0-2-.9-2-2s.9-2 2-2h10c1.1 0 2 .9 2 2s-.9 2-2 2h-4z" />
      <path d="M12 22v-8" />
      <path d="M8 22c-1.1 0-2-.9-2-2v-3c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2H8z" />
    </svg>
  )
}

export function LeafDecoration({
  className,
  position,
}: { className?: string; position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const positionClasses = {
    "top-left": "top-0 left-0 rotate-45",
    "top-right": "top-0 right-0 -rotate-45",
    "bottom-left": "bottom-0 left-0 -rotate-45",
    "bottom-right": "bottom-0 right-0 rotate-45",
  }

  return (
    <div
      className={`absolute w-32 h-32 overflow-hidden opacity-30 pointer-events-none ${positionClasses[position]} ${className}`}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute text-secondary"
        style={{
          top: position.includes("top") ? "-20px" : "auto",
          bottom: position.includes("bottom") ? "-20px" : "auto",
          left: position.includes("left") ? "-20px" : "auto",
          right: position.includes("right") ? "-20px" : "auto",
        }}
      >
        <path d="M60 20 C 70 40, 80 60, 60 100" />
        <path d="M60 40 C 80 50, 90 60, 100 70" />
        <path d="M60 40 C 40 50, 30 60, 20 70" />
        <path d="M60 60 C 75 65, 85 70, 90 80" />
        <path d="M60 60 C 45 65, 35 70, 30 80" />
      </svg>
    </div>
  )
}
