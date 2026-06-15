"use client"

import { useEffect, useRef } from "react"

export default function ShunyaLogo({ size = 60, className = "" }: { size?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.35
    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, size, size)

      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius)
      gradient.addColorStop(0, "#1e40af")
      gradient.addColorStop(1, "#5b21b6")

      ctx.strokeStyle = gradient
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = "#5b21b6"
      ctx.lineWidth = 1
      ctx.globalAlpha = 0.4
      ctx.beginPath()

      for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 3 + rotation
        const spiralRadius = radius * 0.5 * (1 - i / 30)
        const x = centerX + Math.cos(angle) * spiralRadius
        const y = centerY + Math.sin(angle) * spiralRadius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()
      ctx.globalAlpha = 1

      ctx.fillStyle = "#1e40af"
      ctx.globalAlpha = 0.6
      ctx.beginPath()
      ctx.arc(centerX, centerY, 1, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1

      rotation += 0.008
      requestAnimationFrame(animate)
    }

    animate()
  }, [size])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`${className}`}
      style={{ filter: "drop-shadow(0 0 3px rgba(30, 64, 175, 0.1))" }}
    />
  )
}
