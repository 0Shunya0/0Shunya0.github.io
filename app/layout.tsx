import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Patrick_Hand_SC, Merriweather, Caveat } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
})

const patrickHandSC = Patrick_Hand_SC({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chalk",
})

const caveat = Caveat({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-handwritten",
})

const merriweather = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Machiraju Karthikeya | Quantum Simulation",
  description:
    "Undergraduate researcher in computational quantum physics. Quantum simulation of lattice gauge theories, non-equilibrium many-body dynamics, and open quantum systems. PES University & IIT Madras.",
  keywords: [
    "quantum simulation",
    "lattice gauge theory",
    "non-equilibrium quantum dynamics",
    "Floquet time crystals",
    "open quantum systems",
    "photonic entanglement",
    "many-body physics",
    "QuTiP",
    "Cirq",
    "quantum computing research",
  ],
  authors: [{ name: "Machiraju Karthikeya" }],
  creator: "Machiraju Karthikeya",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Machiraju Karthikeya | Quantum Simulation",
    description:
      "Undergraduate researcher: quantum simulation of lattice gauge theories and non-equilibrium quantum dynamics.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark antialiased ${inter.variable} ${jetbrainsMono.variable} ${patrickHandSC.variable} ${caveat.variable} ${merriweather.variable}`}
    >
      <body className="bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}