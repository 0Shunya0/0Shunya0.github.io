"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, FileText, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS 1 - U(1) Lattice Gauge Theory
// ─────────────────────────────────────────────────────────────────────────────
function LGTCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    const W = 280, H = 250; c.width = W; c.height = H
    const N = 7, pad = 26, sp = (W - 2 * pad) / (N - 1)
    let t = 0, id: number
    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < N - 1; i++) for (let j = 0; j < N; j++) {
        const flux = Math.cos(t * 0.38 + i * 1.4 + j * 0.9) * 0.5 + 0.5
        ctx.strokeStyle = `rgba(74,158,255,${0.06 + flux * 0.24})`
        ctx.lineWidth = 1.2 + flux * 1.0
        ctx.beginPath(); ctx.moveTo(pad + i * sp, pad + j * sp); ctx.lineTo(pad + (i + 1) * sp, pad + j * sp); ctx.stroke()
      }
      for (let i = 0; i < N; i++) for (let j = 0; j < N - 1; j++) {
        const flux = Math.cos(t * 0.38 + j * 1.4 + i * 0.9 + 2.1) * 0.5 + 0.5
        ctx.strokeStyle = `rgba(119,221,119,${0.05 + flux * 0.2})`
        ctx.lineWidth = 1.0 + flux * 0.8
        ctx.beginPath(); ctx.moveTo(pad + i * sp, pad + j * sp); ctx.lineTo(pad + i * sp, pad + (j + 1) * sp); ctx.stroke()
      }
      const li = 1 + (Math.floor((Math.sin(t * 0.17) * 0.5 + 0.5) * (N - 3)) % (N - 3))
      const lj = 1 + (Math.floor((Math.cos(t * 0.13) * 0.5 + 0.5) * (N - 3)) % (N - 3))
      const px = pad + li * sp, py = pad + lj * sp
      const pulse = 0.22 + Math.sin(t * 2.0) * 0.1
      ctx.fillStyle = `rgba(74,158,255,${pulse * 0.28})`; ctx.fillRect(px, py, sp, sp)
      ctx.strokeStyle = `rgba(74,158,255,${pulse + 0.35})`; ctx.lineWidth = 2; ctx.setLineDash([4, 3])
      ctx.strokeRect(px, py, sp, sp); ctx.setLineDash([])
      ctx.fillStyle = `rgba(74,158,255,0.7)`; ctx.font = "bold 7.5px 'Courier New',monospace"; ctx.textAlign = "center"
      ctx.fillText("W[□]", px + sp / 2, py + sp / 2 + 3); ctx.textAlign = "left"
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
        const p = 0.5 + Math.sin(t * 1.1 + i * 0.9 + j * 1.3) * 0.4
        ctx.save(); ctx.shadowBlur = 5; ctx.shadowColor = "rgba(224,224,224,0.5)"
        ctx.fillStyle = `rgba(224,224,224,${0.28 + 0.3 * p})`
        ctx.beginPath(); ctx.arc(pad + i * sp, pad + j * sp, 2.5, 0, Math.PI * 2); ctx.fill(); ctx.restore()
      }
      ctx.fillStyle = "rgba(74,158,255,0.18)"; ctx.font = "7.5px monospace"
      ctx.fillText("W[C] = Tr[ ∏ Uₗ ]   Gⱼ|phys⟩ = 0", pad, H - 8)
      t += 0.018; id = requestAnimationFrame(frame)
    }
    frame(); return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={ref} className="w-full max-w-[280px] mx-auto" />
}

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS 2 - Floquet DTC
// ─────────────────────────────────────────────────────────────────────────────
function FloquetCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    const W = 280, H = 250; c.width = W; c.height = H
    const N = 12, chainY = 76, ssp = (W - 50) / (N - 1)
    let t = 0, id: number
    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      const cycle = (t % 6.28) / 6.28
      ctx.fillStyle = "rgba(119,221,119,0.07)"; ctx.fillRect(0, 0, W * cycle, 3)
      ctx.fillStyle = "rgba(119,221,119,0.35)"; ctx.font = "7.5px monospace"
      ctx.fillText(`U_F = e^{-iH₂T/2} · e^{-iH₁T/2}`, 8, 14)
      const stroboParity = Math.floor(t / 3.14) % 2
      for (let i = 0; i < N; i++) {
        const x = 25 + i * ssp
        const up = stroboParity === 0 ? (i % 2 === 0 ? 1 : -1) : (i % 2 === 0 ? -1 : 1)
        const theta = up * Math.PI * 0.72 + Math.sin(t * 0.4 + i * 0.5) * 0.12
        const arrowLen = 18
        const tx = x + Math.sin(theta) * arrowLen * 0.35
        const ty = chainY - Math.cos(theta) * arrowLen
        const glow = Math.abs(up * 0.9)
        if (i < N - 1) {
          ctx.strokeStyle = "rgba(224,224,224,0.07)"; ctx.lineWidth = 0.8
          ctx.beginPath(); ctx.moveTo(x, chainY); ctx.lineTo(x + ssp, chainY); ctx.stroke()
        }
        ctx.strokeStyle = `rgba(119,221,119,${0.45 + glow * 0.45})`; ctx.lineWidth = 1.8
        ctx.save(); ctx.shadowBlur = glow * 7; ctx.shadowColor = "#77dd77"
        ctx.beginPath(); ctx.moveTo(x, chainY); ctx.lineTo(tx, ty); ctx.stroke(); ctx.restore()
        const ang = Math.atan2(ty - chainY, tx - x)
        ctx.fillStyle = `rgba(119,221,119,${0.6 + glow * 0.3})`
        ctx.beginPath(); ctx.moveTo(tx, ty)
        ctx.lineTo(tx - 5 * Math.cos(ang - 0.42), ty - 5 * Math.sin(ang - 0.42))
        ctx.lineTo(tx - 5 * Math.cos(ang + 0.42), ty - 5 * Math.sin(ang + 0.42))
        ctx.closePath(); ctx.fill()
        ctx.fillStyle = "rgba(224,224,224,0.45)"
        ctx.beginPath(); ctx.arc(x, chainY, 3, 0, Math.PI * 2); ctx.fill()
      }
      const tW = W - 40, tH = 110, tX = 20, tY = 122
      ctx.fillStyle = "rgba(10,10,10,0.55)"; ctx.fillRect(tX, tY, tW, tH)
      ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 0.5; ctx.strokeRect(tX, tY, tW, tH)
      ctx.beginPath(); ctx.moveTo(tX, tY + tH / 2); ctx.lineTo(tX + tW, tY + tH / 2)
      ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.stroke()
      ctx.strokeStyle = "rgba(119,221,119,0.85)"; ctx.lineWidth = 1.6; ctx.beginPath()
      for (let i = 0; i < tW; i++) {
        const n = (i / tW) * 28
        const v = Math.cos(Math.PI * n) * Math.exp(-n * 0.005)
        i === 0 ? ctx.moveTo(tX + i, tY + tH / 2 - v * tH * 0.44) : ctx.lineTo(tX + i, tY + tH / 2 - v * tH * 0.44)
      }
      ctx.stroke()
      ctx.strokeStyle = "rgba(244,162,97,0.4)"; ctx.lineWidth = 1.1; ctx.setLineDash([3, 3]); ctx.beginPath()
      for (let i = 0; i < tW; i++) {
        const n = (i / tW) * 28
        const v = Math.cos(Math.PI * n) * Math.exp(-n * 0.075)
        i === 0 ? ctx.moveTo(tX + i, tY + tH / 2 - v * tH * 0.44) : ctx.lineTo(tX + i, tY + tH / 2 - v * tH * 0.44)
      }
      ctx.stroke(); ctx.setLineDash([])
      ctx.font = "7.5px monospace"
      ctx.fillStyle = "rgba(119,221,119,0.7)"; ctx.fillText("● DTC: ⟨σᶻ(nT)⟩ → (-1)ⁿM", tX + 4, tY + 11)
      ctx.fillStyle = "rgba(244,162,97,0.5)"; ctx.fillText("⋯ Thermal (ETH baseline)", tX + 4, tY + 22)
      ctx.fillStyle = "rgba(224,224,224,0.14)"; ctx.fillText("stroboscopic nT →", tX + tW - 108, tY + tH - 6)
      t += 0.14; id = requestAnimationFrame(frame)
    }
    frame(); return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={ref} className="w-full max-w-[280px] mx-auto" />
}

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS 3 - Open Quantum Systems / Photonic Entanglement
// ─────────────────────────────────────────────────────────────────────────────
function OpenQSCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    const W = 280, H = 250; c.width = W; c.height = H
    let t = 0, id: number
    const bloch = (cx: number, cy: number, r: number, theta: number, phi: number, label: string, color: string) => {
      ctx.strokeStyle = "rgba(224,224,224,0.08)"; ctx.lineWidth = 0.8
      ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.28, 0, 0, Math.PI * 2); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke()
      ctx.strokeStyle = "rgba(224,224,224,0.14)"; ctx.lineWidth = 1
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke()
      const vx = cx + r * Math.sin(theta) * Math.cos(phi) * 0.88
      const vy = cy - r * Math.cos(theta) * 0.88
      ctx.strokeStyle = color; ctx.lineWidth = 2
      ctx.save(); ctx.shadowBlur = 8; ctx.shadowColor = color
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(vx, vy); ctx.stroke(); ctx.restore()
      const ang = Math.atan2(vy - cy, vx - cx)
      ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(vx, vy)
      ctx.lineTo(vx - 6 * Math.cos(ang - 0.4), vy - 6 * Math.sin(ang - 0.4))
      ctx.lineTo(vx - 6 * Math.cos(ang + 0.4), vy - 6 * Math.sin(ang + 0.4))
      ctx.closePath(); ctx.fill()
      ctx.fillStyle = color; ctx.font = "bold 8px monospace"; ctx.textAlign = "center"
      ctx.fillText(label, cx, cy + r + 14); ctx.textAlign = "left"
    }
    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      const gamma = 0.18, omega = 0.55
      const thetaA = Math.PI * 0.18 + Math.exp(-gamma * (t % 18)) * Math.PI * 0.62 * Math.abs(Math.cos(omega * t))
      const thetaB = Math.PI * 0.15 + Math.exp(-gamma * 0.6 * (t % 18)) * Math.PI * 0.7 * Math.abs(Math.cos(omega * t + 0.4))
      bloch(70, 105, 50, thetaA, t * 0.6, "Mode A", "rgba(168,218,220,0.9)")
      bloch(210, 105, 50, thetaB, t * 0.6 + Math.PI, "Mode B", "rgba(168,218,220,0.7)")
      const conc = Math.exp(-gamma * 0.4 * (t % 18)) * (0.5 + Math.abs(Math.cos(omega * t)) * 0.4)
      ctx.strokeStyle = `rgba(168,218,220,${conc * 0.6})`; ctx.lineWidth = 1.2 + conc; ctx.setLineDash([4, 4])
      ctx.beginPath(); ctx.moveTo(120, 105); ctx.lineTo(160, 105); ctx.stroke(); ctx.setLineDash([])
      ctx.fillStyle = `rgba(168,218,220,${conc * 0.85})`; ctx.font = "bold 7.5px monospace"; ctx.textAlign = "center"
      ctx.fillText("entangled", 140, 100); ctx.textAlign = "left"
      const tW = W - 40, tH = 76, tX = 20, tY = 168
      ctx.fillStyle = "rgba(10,10,10,0.55)"; ctx.fillRect(tX, tY, tW, tH)
      ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 0.5; ctx.strokeRect(tX, tY, tW, tH)
      ctx.strokeStyle = "rgba(168,218,220,0.8)"; ctx.lineWidth = 1.6; ctx.beginPath()
      for (let i = 0; i < tW; i++) {
        const s = (i / tW) * 20
        const Ct = Math.exp(-0.18 * s) * (0.7 + 0.25 * Math.cos(s * 1.2)) * (0.5 + 0.5 * Math.abs(Math.sin(s * 0.8)))
        i === 0 ? ctx.moveTo(tX + i, tY + tH - 6 - Ct * (tH - 12)) : ctx.lineTo(tX + i, tY + tH - 6 - Ct * (tH - 12))
      }
      ctx.stroke()
      ctx.strokeStyle = "rgba(244,162,97,0.4)"; ctx.lineWidth = 1.1; ctx.setLineDash([3, 3]); ctx.beginPath()
      for (let i = 0; i < tW; i++) {
        const s = (i / tW) * 20
        const Ct = Math.exp(-0.35 * s) * 0.85
        i === 0 ? ctx.moveTo(tX + i, tY + tH - 6 - Ct * (tH - 12)) : ctx.lineTo(tX + i, tY + tH - 6 - Ct * (tH - 12))
      }
      ctx.stroke(); ctx.setLineDash([])
      ctx.font = "7.5px monospace"
      ctx.fillStyle = "rgba(168,218,220,0.7)"; ctx.fillText("● C(t) - metasurface-engineered", tX + 4, tY + 11)
      ctx.fillStyle = "rgba(244,162,97,0.5)"; ctx.fillText("⋯ Standard Lindblad decay", tX + 4, tY + 22)
      ctx.fillStyle = "rgba(224,224,224,0.14)"; ctx.textAlign = "right"
      ctx.fillText("ρ̇ = -i[H,ρ] + Σ(LρL†-½{L†L,ρ})", tX + tW - 2, tY + tH - 5); ctx.textAlign = "left"
      t += 0.016; id = requestAnimationFrame(frame)
    }
    frame(); return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={ref} className="w-full max-w-[280px] mx-auto" />
}

// ─────────────────────────────────────────────────────────────────────────────
// CANVAS 4 - Quantum SVM · HEP classification
// ─────────────────────────────────────────────────────────────────────────────
function QMLCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = ref.current; if (!c) return
    const ctx = c.getContext("2d"); if (!ctx) return
    const W = 280, H = 250; c.width = W; c.height = H
    let t = 0, id: number
    const signal: [number, number][] = Array.from({ length: 20 }, (_, i) => {
      const a = (i / 20) * Math.PI * 2, r = 18 + Math.sin(i * 2.7) * 6
      return [70 + r * Math.cos(a), 90 + r * Math.sin(a)]
    })
    const background: [number, number][] = Array.from({ length: 20 }, (_, i) => {
      const a = (i / 20) * Math.PI * 2, r = 40 + Math.cos(i * 1.9) * 10
      return [70 + r * Math.cos(a), 90 + r * Math.sin(a)]
    })
    const frame = () => {
      ctx.clearRect(0, 0, W, H)
      const km = 8, ks = 14, kx = 148, ky = 16
      for (let i = 0; i < km; i++) for (let j = 0; j < km; j++) {
        const val = 0.5 + 0.45 * Math.cos((i - j) * 0.9 + t * 0.07 + i * 0.3 + j * 0.2)
        ctx.fillStyle = `rgba(74,${Math.floor(158 * val)},255,${0.12 + val * 0.45})`
        ctx.fillRect(kx + j * ks, ky + i * ks, ks - 1, ks - 1)
      }
      ctx.strokeStyle = "rgba(74,158,255,0.18)"; ctx.lineWidth = 0.8
      ctx.strokeRect(kx, ky, km * ks, km * ks)
      const hi = Math.floor((Math.sin(t * 0.45) * 0.5 + 0.5) * km)
      ctx.strokeStyle = "rgba(74,158,255,0.45)"; ctx.lineWidth = 1
      ctx.strokeRect(kx, ky + hi * ks, km * ks, ks)
      ctx.fillStyle = "rgba(224,224,224,0.14)"; ctx.font = "7.5px monospace"
      ctx.fillText("K_ZZ(xᵢ,xⱼ)", kx, ky + km * ks + 12)
      const mW = 126, mH = 158, mX = 6, mY = 22
      ctx.fillStyle = "rgba(10,10,10,0.45)"; ctx.fillRect(mX, mY, mW, mH)
      ctx.strokeStyle = "rgba(255,255,255,0.06)"; ctx.lineWidth = 0.5; ctx.strokeRect(mX, mY, mW, mH)
      const pulse = 0.35 + Math.sin(t * 0.38) * 0.07
      ctx.strokeStyle = `rgba(119,221,119,${pulse})`; ctx.lineWidth = 1.5; ctx.setLineDash([5, 4]); ctx.beginPath()
      for (let px = 0; px <= mW; px += 2) {
        const fy = mY + mH / 2 + Math.sin((px / mW) * Math.PI * 2.2 + t * 0.14) * 30
        px === 0 ? ctx.moveTo(mX + px, fy) : ctx.lineTo(mX + px, fy)
      }
      ctx.stroke(); ctx.setLineDash([])
      const sX = (x: number) => mX + 6 + ((x - 30) / 100) * (mW - 12)
      const sY = (y: number) => mY + 6 + ((y - 50) / 90) * (mH - 12)
      signal.forEach(([x, y]) => {
        const sx = sX(x), sy = sY(y)
        if (sx < mX + 2 || sx > mX + mW - 2 || sy < mY + 2 || sy > mY + mH - 2) return
        ctx.fillStyle = "rgba(74,158,255,0.65)"
        ctx.beginPath(); ctx.arc(sx, sy, 3.2, 0, Math.PI * 2); ctx.fill()
      })
      background.forEach(([x, y]) => {
        const sx = sX(x), sy = sY(y)
        if (sx < mX + 2 || sx > mX + mW - 2 || sy < mY + 2 || sy > mY + mH - 2) return
        ctx.fillStyle = "rgba(244,162,97,0.6)"
        ctx.beginPath()
        ctx.moveTo(sx, sy - 3.8); ctx.lineTo(sx + 3.8, sy + 3.8); ctx.lineTo(sx - 3.8, sy + 3.8)
        ctx.closePath(); ctx.fill()
      })
      ctx.font = "7.5px monospace"
      ctx.fillStyle = "rgba(74,158,255,0.6)"; ctx.fillText("● Signal (QCD)", mX + 2, mY + mH + 12)
      ctx.fillStyle = "rgba(244,162,97,0.55)"; ctx.fillText("▲ Background", mX + 2, mY + mH + 23)
      ctx.fillStyle = "rgba(119,221,119,0.42)"; ctx.fillText("- Q-kernel boundary", mX + 2, mY + mH + 34)
      const acc = 87 + Math.sin(t * 0.2) * 1.8
      ctx.fillStyle = "rgba(119,221,119,0.1)"; ctx.fillRect(kx, ky + km * ks + 22, km * ks, 18)
      ctx.fillStyle = "rgba(119,221,119,0.55)"; ctx.font = "bold 7.5px monospace"
      ctx.fillText(`acc: ${acc.toFixed(1)}%  CERN OD`, kx + 4, ky + km * ks + 34)
      t += 0.018; id = requestAnimationFrame(frame)
    }
    frame(); return () => cancelAnimationFrame(id)
  }, [])
  return <canvas ref={ref} className="w-full max-w-[280px] mx-auto" />
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATION CONFIG - hierarchy matters: LGT anchor, then Floquet, then Open,
// then QML (secondary). Each description supports the LGT narrative.
// ─────────────────────────────────────────────────────────────────────────────
const SIMS = [
  {
    id: "lgt",
    label: "Lattice Gauge Theory",
    tag: "U(1) · 2D geometries",
    role: "primary" as const,
    equation: "H_KS = -J∑□(U□+U□†) + h∑Zⱼ",
    desc: "Simulation of gauge field dynamics on discrete lattices (square and honeycomb), with Gauss-law constrained Hilbert spaces. Focus on Wilson loop observables, confinement structure, and plaquette flux dynamics in real-time evolution - beyond classical tractability.",
    color: "#4a9eff",
  },
  {
    id: "floquet",
    label: "Non-Equilibrium Dynamics",
    tag: "Floquet · DTC · Real-time",
    role: "primary" as const,
    equation: "⟨σᶻ(nT)⟩ → (-1)ⁿ M_DTC",
    desc: "Driven many-body systems and time-crystalline phases as testbeds for real-time quantum dynamics. Stability and phase structure in non-equilibrium regimes - directly relevant to the out-of-equilibrium sector of lattice gauge theories.",
    color: "#77dd77",
  },
  {
    id: "openqs",
    label: "Open Quantum Systems",
    tag: "Photonic · Lindblad · QuTiP",
    role: "primary" as const,
    equation: "ρ̇ = -i[H,ρ] + Σₖ(LₖρLₖ† - ½{Lₖ†Lₖ,ρ})",
    desc: "Decoherence and dissipative dynamics as controllable mechanisms in quantum simulation. Metasurface-assisted reservoir engineering for photonic entanglement - building a framework for understanding non-equilibrium behavior in many-body and gauge systems.",
    color: "#a8dadc",
  },
  {
    id: "qml",
    label: "QML Methods",
    tag: "Methodological · HEP",
    role: "secondary" as const,
    equation: "K(xᵢ,xⱼ) = |⟨φ(xᵢ)|φ(xⱼ)⟩|²",
    desc: "Evaluation of quantum kernel methods under realistic noise and scaling constraints, benchmarked on CERN Open Data. Analysis of when quantum advantage appears - and when it fails. Methodological work; not the primary research direction.",
    color: "#b08060",
  },
]

const BG_EQS: Record<string, { text: string; top?: string; bottom?: string; left?: string; right?: string; rot: string; color: string; opacity: number }[]> = {
  lgt: [
    { text: "W[C] = Tr[ ∏_{l∈C} Uₗ ]", top: "22%", left: "3%", rot: "-11deg", color: "#4a9eff", opacity: 0.17 },
    { text: "Gⱼ|phys⟩ = 0", top: "65%", left: "4%", rot: "-5deg", color: "#77dd77", opacity: 0.2 },
    { text: "∑_{j∈∂□} Eⱼ = 0", top: "78%", left: "20%", rot: "5deg", color: "#e0e0e0", opacity: 0.13 },
    { text: "H_KS = -J∑□(U□+U□†) + h∑Zⱼ", top: "13%", right: "3%", rot: "8deg", color: "#e0e0e0", opacity: 0.13 },
    { text: "⟨W[C]⟩ ~ e^{-σ·Area(C)}", top: "44%", right: "4%", rot: "-9deg", color: "#4a9eff", opacity: 0.15 },
  ],
  floquet: [
    { text: "U_F = e^{-iH_F T}", top: "20%", left: "3%", rot: "-9deg", color: "#77dd77", opacity: 0.18 },
    { text: "⟨σᶻ(nT)⟩ → (-1)ⁿ M_DTC", top: "55%", left: "4%", rot: "-5deg", color: "#4a9eff", opacity: 0.18 },
    { text: "|ψ_F(t)⟩ = e^{-iε_α t}|u_α(t)⟩", top: "70%", left: "16%", rot: "4deg", color: "#e0e0e0", opacity: 0.13 },
    { text: "[H_F, D] = 0  (MBL-protected)", top: "42%", right: "4%", rot: "-11deg", color: "#77dd77", opacity: 0.16 },
    { text: "H_F = H₁ (t<T/2);  H₂ (t>T/2)", top: "13%", right: "2%", rot: "7deg", color: "#e0e0e0", opacity: 0.12 },
  ],
  openqs: [
    { text: "ρ̇ = -i[H,ρ] + Σ(LρL†-½{L†L,ρ})", top: "20%", left: "2%", rot: "-8deg", color: "#a8dadc", opacity: 0.17 },
    { text: "C(ρ) = max(0, λ₁-λ₂-λ₃-λ₄)", top: "62%", left: "4%", rot: "-4deg", color: "#4a9eff", opacity: 0.16 },
    { text: "J(ω) = η·ω·e^{-ω/ωc}", top: "74%", left: "18%", rot: "6deg", color: "#e0e0e0", opacity: 0.12 },
    { text: "E_N = log₂‖ρᵀ_B‖₁", top: "11%", right: "3%", rot: "9deg", color: "#a8dadc", opacity: 0.16 },
    { text: "⟨a†a⟩(t) - Purcell-enhanced", top: "43%", right: "3%", rot: "-10deg", color: "#77dd77", opacity: 0.14 },
  ],
  qml: [
    { text: "K(xᵢ,xⱼ) = |⟨φ(xᵢ)|φ(xⱼ)⟩|²", top: "19%", left: "2%", rot: "-10deg", color: "#b08060", opacity: 0.16 },
    { text: "U_φ(x)|0⟩ = |φ(x)⟩", top: "60%", left: "4%", rot: "-5deg", color: "#4a9eff", opacity: 0.16 },
    { text: "min ½‖w‖² s.t. yᵢ(w·φ(xᵢ)+b) ≥ 1", top: "73%", left: "12%", rot: "4deg", color: "#e0e0e0", opacity: 0.11 },
    { text: "ZZFeatureMap: Rz(2(π-x₁)(π-x₂))", top: "11%", right: "2%", rot: "8deg", color: "#b08060", opacity: 0.14 },
    { text: "align(K, K_ideal) → expressivity", top: "43%", right: "3%", rot: "-9deg", color: "#77dd77", opacity: 0.14 },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// RESEARCH INTERESTS - static, shown always
// ─────────────────────────────────────────────────────────────────────────────
const RESEARCH_INTERESTS = [
  { text: "Quantum simulation of lattice gauge theories (real-time dynamics)", primary: true },
  { text: "Open quantum systems and decoherence engineering", primary: true },
  { text: "Non-equilibrium many-body physics (Floquet systems)", primary: true },
  { text: "Photonic platforms for quantum information processing", primary: false },
]

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
export function Hero() {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const switchTo = useCallback((next: number) => {
    setFading(true)
    setTimeout(() => { setActive(next); setFading(false) }, 220)
  }, [])

  useEffect(() => {
    timerRef.current = setTimeout(() => switchTo((active + 1) % SIMS.length), 7000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active, switchTo])

  const manualSwitch = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    switchTo(i)
  }

  const sim = SIMS[active]
  const bgEqs = BG_EQS[sim.id]

  return (
    <section
      id="home"
      className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden hero-gradient"
    >
      {/* Domain-reactive background equations */}
      {bgEqs.map((eq, i) => (
        <div
          key={`${sim.id}-${i}`}
          className="absolute font-mono pointer-events-none select-none z-0 transition-opacity duration-700"
          style={{
            top: eq.top, bottom: eq.bottom, left: eq.left, right: eq.right,
            transform: `rotate(${eq.rot})`,
            fontSize: "0.68rem", fontFamily: "var(--font-chalk)", letterSpacing: "0.02em",
            color: eq.color, opacity: eq.opacity,
          }}
        >
          {eq.text}
        </div>
      ))}

      <div className="chalk-scribble-1" /><div className="chalk-scribble-3" /><div className="chalk-scribble-6" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
          <div className="space-y-5 lg:pt-4">

            {/* Lab pill */}
            <div className="inline-flex items-center gap-2 border border-border/25 px-3 py-1.5 text-xs font-mono text-muted-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
              Photonics &amp; Quantum Technology Lab · PES University · Advisor: Dr. Kaustav Bhowmick
            </div>

            {/* Name */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground font-chalk leading-tight">
                Machiraju Karthikeya
              </h1>
              <p className="text-xs text-muted-foreground/50 font-mono mt-1.5 tracking-widest">
                Shunya &nbsp;·&nbsp; शून्य &nbsp;·&nbsp; PES University
              </p>
            </div>

            {/* Research identity - LGT as center of gravity */}
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-semibold text-primary leading-snug font-chalk">
                Computational Quantum Physics
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Quantum simulation of lattice gauge theories, with focus on
                real-time dynamics and non-equilibrium systems.
              </p>
              <p className="text-xs text-muted-foreground/55 font-mono leading-relaxed max-w-md">
                Current work: open quantum systems and photonic platforms as
                computational testbeds for many-body dynamics.
              </p>
            </div>

            {/* Research Interests block - tells a PI exactly where you're going */}
            <div>
              <p className="text-xs font-mono text-muted-foreground/40 uppercase tracking-wider mb-2.5">
                Research Interests
              </p>
              <div className="space-y-1.5">
                {RESEARCH_INTERESTS.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: item.primary ? "#4a9eff" : "rgba(224,224,224,0.25)" }}
                    />
                    <p
                      className="text-xs font-mono leading-snug"
                      style={{ color: item.primary ? "rgba(224,224,224,0.75)" : "rgba(224,224,224,0.38)" }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Active sim info - synced to panel */}
            <div
              className="border-l-2 pl-4 py-0.5 transition-all duration-300"
              style={{ borderColor: sim.color }}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-xs font-mono" style={{ color: sim.color }}>
                  {sim.label}
                </p>
                {sim.role === "secondary" && (
                  <span className="text-xs font-mono px-1.5 py-0.5 border text-muted-foreground/40"
                    style={{ borderColor: "rgba(224,224,224,0.12)", fontSize: "0.6rem" }}>
                    methodological
                  </span>
                )}
              </div>
              <p className="text-xs font-mono text-muted-foreground/45 mb-1.5">{sim.equation}</p>
              <p className="text-sm text-muted-foreground/70 leading-relaxed">{sim.desc}</p>
            </div>

            {/* Credential badges */}
            <div className="flex flex-wrap gap-2">
              {["IBM Qiskit Advocate '25", "Womanium Q+AI QCobalt", "KAIST Quantum Info"].map((b) => (
                <span key={b} className="text-xs font-mono px-2 py-0.5 border border-border/20 text-muted-foreground/45">
                  {b}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                size="default"
                onClick={() => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" })}
                className="quantum-gradient text-white hover:opacity-90 transition-all duration-300 font-chalk"
              >
                View Research
              </Button>
              <Button variant="outline" size="default"
                className="border-border/40 text-foreground/80 hover:border-primary/60 hover:text-primary bg-transparent font-mono text-sm"
                asChild>
                <a href="/Karthikeya_Machiraju_CV.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4 mr-2" />CV
                </a>
              </Button>
              <Button variant="outline" size="default"
                className="border-border/40 text-muted-foreground/60 hover:border-accent/60 hover:text-accent bg-transparent font-mono text-sm"
                asChild>
                <a href="https://arxiv.org/search/?searchtype=author&query=Machiraju" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />arXiv
                </a>
              </Button>
            </div>

            {/* Socials */}
            <div className="flex gap-1">
              {[
                { href: "https://github.com/0Shunya0", Icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/karthikeya-machiraju-870411284/", Icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:karthikeyamachiraju005@gmail.com", Icon: Mail, label: "Email" },
              ].map(({ href, Icon, label }) => (
                <Button key={label} variant="ghost" size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted/15 transition-colors"
                  asChild>
                  <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={label}>
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN - Simulation panel ─────────────────────── */}
          <div className="flex flex-col gap-3">

            {/* Tabs - visual hierarchy: first 3 primary, QML dimmer */}
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {SIMS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => manualSwitch(i)}
                  className="text-left px-2.5 py-2 border transition-all duration-200 text-xs font-mono leading-tight relative"
                  style={{
                    borderColor: active === i
                      ? s.color
                      : s.role === "secondary"
                        ? "rgba(224,224,224,0.06)"
                        : "rgba(224,224,224,0.1)",
                    background: active === i ? `${s.color}12` : "transparent",
                    color: active === i
                      ? s.color
                      : s.role === "secondary"
                        ? "rgba(224,224,224,0.22)"
                        : "rgba(224,224,224,0.35)",
                    opacity: s.role === "secondary" && active !== i ? 0.7 : 1,
                  }}
                >
                  {s.label}
                  {s.role === "secondary" && active !== i && (
                    <span className="absolute top-1 right-1 text-[7px] font-mono text-muted-foreground/30">2°</span>
                  )}
                </button>
              ))}
            </div>

            {/* Canvas panel */}
            <div
              className="chalk-card p-4 transition-opacity duration-200"
              style={{ opacity: fading ? 0 : 1, minHeight: 295 }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono" style={{ color: sim.color }}>{sim.label}</span>
                <span className="text-xs font-mono text-muted-foreground/30">{sim.tag}</span>
              </div>
              {active === 0 && <LGTCanvas />}
              {active === 1 && <FloquetCanvas />}
              {active === 2 && <OpenQSCanvas />}
              {active === 3 && <QMLCanvas />}
            </div>

            {/* Nav dots */}
            <div className="flex items-center justify-between px-1">
              <button onClick={() => manualSwitch((active - 1 + SIMS.length) % SIMS.length)}
                className="text-muted-foreground/28 hover:text-muted-foreground/60 transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2 items-center">
                {SIMS.map((s, i) => (
                  <button key={s.id} onClick={() => manualSwitch(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 6 : 5,
                      height: i === active ? 6 : 5,
                      background: i === active
                        ? sim.color
                        : s.role === "secondary"
                          ? "rgba(224,224,224,0.12)"
                          : "rgba(224,224,224,0.2)",
                    }}
                    aria-label={`View ${s.label}`}
                  />
                ))}
              </div>
              <button onClick={() => manualSwitch((active + 1) % SIMS.length)}
                className="text-muted-foreground/28 hover:text-muted-foreground/60 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Scroll cue */}
        <div className="flex justify-center mt-12">
          <Button variant="ghost" size="sm"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="animate-bounce text-muted-foreground/28 hover:text-muted-foreground/60 transition-colors"
            aria-label="Scroll down">
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}