import Link from "next/link"
import { ArrowLeft, FileText, BookOpen, Download, ExternalLink } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Teaching Notes | Machiraju Karthikeya",
    description:
        "Structured lecture notes in quantum mechanics, quantum computing, and quantum transport. Developed during teaching assistantships at PES University.",
}

interface CourseCard {
    id: string
    course: string
    role: string
    period: string
    color: string
    description: string
    siteUrl?: string
    pdfPath?: string
}

const COURSES: CourseCard[] = [
    {
        id: "qeqc",
        course: "Quantum Entanglement & Quantum Computing",
        role: "Teaching Assistant",
        period: "Aug–Dec 2025",
        color: "#4a9eff",
        description: "Full course website with lecture material, problem sets, and simulation labs.",
        siteUrl: "https://0shunya0.github.io/QEQC_course_website/",
    },
    {
        id: "qtlg",
        course: "Quantum Transport & Logic Gates",
        role: "Teaching Assistant",
        period: "Jan–May 2026",
        color: "#f4a261",
        description:
            "Quantum Transport Models. Landauer–Büttiker formalism, conductance quantization, dissipative transport, gate robustness under transport noise.",
        pdfPath: "/notes/qtlg_tr-6.pdf",
    },
    {
        id: "iqc",
        course: "Introduction to Quantum Computing",
        role: "Subject Matter Expert, PESU IO",
        period: "Aug–Nov 2025",
        color: "#77dd77",
        description:
            "Quantum Fourier Transform & DFT Programming. DFT to QFT circuits, gate decomposition, phase kickback, IBM Quantum implementation.",
        pdfPath: "/notes/dft_prog-1.pdf",
    },
]

function CourseCardView({ item }: { item: CourseCard }) {
    return (
        <div
            className="relative flex flex-col"
            style={{ background: "rgba(17,22,17,0.8)", border: `1px solid ${item.color}28` }}
        >
            <div className="h-px w-full" style={{ background: item.color, opacity: 0.6 }} />

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-base font-semibold font-chalk leading-snug mb-0.5" style={{ color: "rgba(220,232,220,0.92)" }}>
                    {item.course}
                </h3>
                <p className="text-xs font-mono mt-0.5 mb-4" style={{ color: item.color, opacity: 0.7 }}>
                    {item.role} · {item.period}
                </p>

                <p className="text-xs font-mono leading-relaxed mb-5 flex-1" style={{ color: "rgba(184,204,184,0.7)" }}>
                    {item.description}
                </p>

                <div className="flex gap-2 mt-auto">
                    {item.siteUrl && (
                        <a
                            href={item.siteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-2 border border-dashed transition-all duration-200 hover:opacity-80"
                            style={{ borderColor: `${item.color}40`, color: item.color, background: `${item.color}10` }}
                        >
                            <ExternalLink className="h-3 w-3" />
                            Open course site
                        </a>
                    )}
                    {item.pdfPath && (
                        <>
                            <a
                                href={item.pdfPath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-2 border border-dashed transition-all duration-200 hover:opacity-80"
                                style={{ borderColor: `${item.color}40`, color: item.color, background: `${item.color}10` }}
                            >
                                <FileText className="h-3 w-3" />
                                View PDF
                            </a>
                            <a
                                href={item.pdfPath}
                                download
                                className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-2 border border-dashed transition-all duration-200"
                                style={{ borderColor: "rgba(200,230,200,0.15)", color: "rgba(184,204,184,0.45)" }}
                            >
                                <Download className="h-3 w-3" />
                                Download
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function TeachingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground relative">

            {/* Background equations */}
            <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
                {[
                    { text: "H|ψ⟩ = E|ψ⟩", top: "12%", left: "3%", rot: "-8deg", color: "#4a9eff", op: 0.08 },
                    { text: "ρ̇ = -i[H,ρ] + ΣₖLₖρLₖ† − ½{Lₖ†Lₖ,ρ}", top: "35%", right: "4%", rot: "10deg", color: "#77dd77", op: 0.07 },
                    { text: "G = (2e²/h) T", top: "58%", left: "5%", rot: "-6deg", color: "#f4a261", op: 0.07 },
                    { text: "U_F = e^{-iH_FT}", bottom: "22%", right: "5%", rot: "7deg", color: "#c8dcc8", op: 0.06 },
                    { text: "[x̂,p̂] = iℏ", top: "78%", left: "28%", rot: "-10deg", color: "#4a9eff", op: 0.06 },
                    { text: "QFT|j⟩ = (1/√N) Σₖ e^{2πijk/N}|k⟩", top: "20%", right: "8%", rot: "-5deg", color: "#77dd77", op: 0.065 },
                ].map((eq, i) => (
                    <div
                        key={i}
                        className="absolute font-mono"
                        style={{
                            top: (eq as { top?: string }).top,
                            bottom: (eq as { bottom?: string }).bottom,
                            left: (eq as { left?: string }).left,
                            right: (eq as { right?: string }).right,
                            transform: `rotate(${eq.rot})`,
                            color: eq.color,
                            opacity: eq.op,
                            fontSize: "0.62rem",
                            fontFamily: "var(--font-chalk)",
                        }}
                    >
                        {eq.text}
                    </div>
                ))}
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">

                {/* Back */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground/35 hover:text-muted-foreground/60 transition-colors mb-12 group"
                >
                    <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Back to portfolio
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-muted-foreground/45 mb-6"
                        style={{ border: "1px dashed rgba(200,230,200,0.12)" }}
                    >
                        <BookOpen className="h-3 w-3" />
                        Teaching Assistantship · PES University &amp; PESU IO
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-chalk mb-3 leading-tight">
                        Lecture Notes
                    </h1>
                    <p className="text-sm text-muted-foreground/55 max-w-2xl leading-relaxed font-mono mb-1">
                        Notes developed while TAing quantum computing, entanglement theory, and quantum
                        transport at PES University. Each set ties formal theory to the simulation
                        approaches used in the lab.
                    </p>
                </div>

                {/* Course cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-14">
                    {COURSES.map((item) => (
                        <CourseCardView key={item.id} item={item} />
                    ))}
                </div>

                <div className="chalk-divider mb-10" />

                {/* Footer */}
                <div
                    className="p-5"
                    style={{ background: "rgba(14,18,14,0.5)", border: "1px dashed rgba(200,230,200,0.07)" }}
                >
                    <p className="text-xs font-mono text-muted-foreground/40 leading-relaxed mb-2">
                        Notes connect rigorous quantum formalism to numerical simulation — intended for students
                        making the jump from coursework to actual research code.
                    </p>
                    <p className="text-xs font-mono text-muted-foreground/25">
                        Feedback:{" "}
                        <a
                            href="mailto:karthikeyamachiraju005@gmail.com"
                            className="text-accent/45 hover:text-accent/65 transition-colors"
                        >
                            karthikeyamachiraju005@gmail.com
                        </a>
                    </p>
                </div>

            </div>
        </main>
    )
}
