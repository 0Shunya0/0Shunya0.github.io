"use client"

import { useEffect, useRef } from "react"

export function QuantumCircuit() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Animate quantum gates
    const gates = svg.querySelectorAll(".quantum-gate")
    gates.forEach((gate, index) => {
      const element = gate as SVGElement
      element.style.animationDelay = `${index * 0.2}s`
    })
  }, [])

  return (
    <div className="relative w-full max-w-2xl mx-auto my-8">
      <svg ref={svgRef} viewBox="0 0 400 200" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
        {/* Quantum wires */}
        <line x1="20" y1="50" x2="380" y2="50" stroke="#3b82f6" strokeWidth="2" />
        <line x1="20" y1="100" x2="380" y2="100" stroke="#3b82f6" strokeWidth="2" />
        <line x1="20" y1="150" x2="380" y2="150" stroke="#3b82f6" strokeWidth="2" />

        {/* Hadamard Gates */}
        <rect
          x="60"
          y="35"
          width="30"
          height="30"
          fill="#8b5cf6"
          stroke="#a855f7"
          strokeWidth="2"
          className="quantum-gate animate-pulse"
        />
        <text x="75" y="55" fill="white" textAnchor="middle" fontSize="14" fontWeight="bold">
          H
        </text>

        <rect
          x="120"
          y="85"
          width="30"
          height="30"
          fill="#8b5cf6"
          stroke="#a855f7"
          strokeWidth="2"
          className="quantum-gate animate-pulse"
        />
        <text x="135" y="105" fill="white" textAnchor="middle" fontSize="14" fontWeight="bold">
          H
        </text>

        {/* CNOT Gates */}
        <circle cx="200" cy="50" r="8" fill="#06b6d4" className="quantum-gate animate-pulse" />
        <circle cx="200" cy="100" r="4" fill="#06b6d4" className="quantum-gate animate-pulse" />
        <line x1="200" y1="50" x2="200" y2="100" stroke="#06b6d4" strokeWidth="2" />

        {/* Rotation Gates */}
        <rect
          x="260"
          y="35"
          width="30"
          height="30"
          fill="#10b981"
          stroke="#059669"
          strokeWidth="2"
          className="quantum-gate animate-pulse"
          rx="5"
        />
        <text x="275" y="55" fill="white" textAnchor="middle" fontSize="12" fontWeight="bold">
          Ry
        </text>

        <rect
          x="320"
          y="135"
          width="30"
          height="30"
          fill="#f59e0b"
          stroke="#d97706"
          strokeWidth="2"
          className="quantum-gate animate-pulse"
          rx="5"
        />
        <text x="335" y="155" fill="white" textAnchor="middle" fontSize="12" fontWeight="bold">
          Rz
        </text>

        {/* Measurement */}
        <rect
          x="360"
          y="85"
          width="20"
          height="30"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          className="quantum-gate animate-pulse"
          rx="3"
        />
        <path d="M365 95 Q370 90 375 95 Q370 100 365 95" fill="none" stroke="#ef4444" strokeWidth="2" />
      </svg>
    </div>
  )
}
