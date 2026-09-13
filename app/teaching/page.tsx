import Link from "next/link"
import { ArrowLeft, FileText, BookOpen, Clock, Download } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Teaching Notes | Machiraju Karthikeya",
    description:
        "Structured lecture notes in quantum mechanics, quantum computing, and quantum transport. Developed during teaching assistantships at PES University.",
}

type NoteTag = "Foundations" | "Advanced" | "Simulation-oriented" | "Hardware-oriented"

interface NoteEntry {
    id: string
    title: string
    subtitle: string
    course: string
    tag: NoteTag
    topics: string[]
    pdfPath?: string
    available: boolean
}

const NOTES: NoteEntry[] = [
    // ── Quantum Entanglement & Quantum Computing ────────────────────────────────
    {
        id: "hilbert",
        title: "Quantum States & Hilbert Spaces",
        subtitle: "Foundations of state representation and operator formalism",
        course: "Quantum Entanglement & Quantum Computing",
        tag: "Foundations",
        topics: [
            "State vectors and Dirac notation",
            "Bra-ket formalism",
            "Observables and Hermitian operators",
            "Completeness and orthonormality",
        ],
        available: false,
    },
    {
        id: "entanglement",
        title: "Entanglement & Separability",
        subtitle: "Structure of multipartite quantum systems",
        course: "Quantum Entanglement & Quantum Computing",
        tag: "Advanced",
        topics: [
            "Tensor products and composite systems",
            "Schmidt decomposition",
            "Entanglement measures: concurrence, negativity",
            "PPT criterion and separability tests",
        ],
        available: false,
    },
    {
        id: "channels",
        title: "Quantum Channels & Noise",
        subtitle: "Completely positive maps and Kraus representation",
        course: "Quantum Entanglement & Quantum Computing",
        tag: "Simulation-oriented",
        topics: [
            "Kraus operators and operator-sum representation",
            "Depolarizing, dephasing, amplitude damping channels",
            "Choi-Jamiolkowski isomorphism",
            "Simulation of noisy circuits",
        ],
        available: false,
    },
    {
        id: "stabilizer",
        title: "Stabilizer Formalism",
        subtitle: "Efficient simulation and error correction",
        course: "Quantum Entanglement & Quantum Computing",
        tag: "Advanced",
        topics: [
            "Pauli group and stabilizer states",
            "Clifford circuits and efficient simulation",
            "Stabilizer codes (Steane, Shor)",
            "Fault-tolerant gate sets",
        ],
        available: false,
    },
    // ── Quantum Transport & Logic Gates ────────────────────────────────────────
    {
        id: "lindblad",
        title: "Open Quantum Systems & Lindblad Dynamics",
        subtitle: "Master equation formalism for dissipative evolution",
        course: "Quantum Transport & Logic Gates",
        tag: "Simulation-oriented",
        topics: [
            "Markovian approximation and Born-Markov limit",
            "Lindblad master equation derivation",
            "Steady states and decoherence timescales",
            "Numerical integration with QuTiP",
        ],
        available: false,
    },
    {
        id: "transport",
        title: "Quantum Transport Models",
        subtitle: "Conductance, dissipation, and scattering in quantum systems",
        course: "Quantum Transport & Logic Gates",
        tag: "Hardware-oriented",
        topics: [
            "Landauer-Büttiker formalism",
            "Transmission coefficients and conductance quantization",
            "Dissipative transport and loss mechanisms",
            "Gate robustness under transport noise",
        ],
        pdfPath: "/notes/qtlg_tr-6.pdf",
        available: true,
    },
    // ── Introduction to Quantum Computing ─────────────────────────────────────
    {
        id: "dft",
        title: "Quantum Fourier Transform & DFT Programming",
        subtitle: "From classical DFT to QFT circuits — implementation and intuition",
        course: "Introduction to Quantum Computing",
        tag: "Simulation-oriented",
        topics: [
            "Discrete Fourier Transform review and matrix form",
            "QFT circuit construction and gate decomposition",
            "Phase kickback and periodicity detection",
            "Implementation on IBM Quantum hardware",
        ],
        pdfPath: "/notes/dft_prog-1.pdf",
        available: true,
    },
    {
        id: "algorithms",
        title: "Variational Quantum Algorithms",
        subtitle: "VQE, QAOA, and hybrid quantum-classical methods",
        course: "Introduction to Quantum Computing",
        tag: "Simulation-oriented",
        topics: [
            "Variational Quantum Eigensolver (VQE)",
            "Quantum Approximate Optimization Algorithm (QAOA)",
            "Ansatz design and parameter optimization",
            "Noise-aware circuit compilation on IBM Quantum",
        ],
        available: false,
    },
]

const TAG_CONFIG: Record<NoteTag, { color: string; bg: string; border: string }> = {
    Foundations: { color: "#a8dadc", bg: "rgba(168,218,220,0.07)", border: "rgba(168,218,220,0.25)" },
    Advanced: { color: "#4a9eff", bg: "rgba(74,158,255,0.07)", border: "rgba(74,158,255,0.25)" },
    "Simulation-oriented": { color: "#77dd77", bg: "rgba(119,221,119,0.07)", border: "rgba(119,221,119,0.25)" },
    "Hardware-oriented": { color: "#f4a261", bg: "rgba(244,162,97,0.07)", border: "rgba(244,162,97,0.25)" },
}

const COURSES = [
    { name: "Quantum Entanglement & Quantum Computing", role: "Teaching Assistant", period: "Aug–Dec 2025", color: "#4a9eff" },
    { name: "Quantum Transport & Logic Gates", role: "Teaching Assistant", period: "Jan–May 2026", color: "#f4a261" },
    { name: "Introduction to Quantum Computing", role: "Subject Matter Expert, PESU IO", period: "Aug–Nov 2025", color: "#77dd77" },
]

function NoteCard({ note }: { note: NoteEntry }) {
    const tag = TAG_CONFIG[note.tag]

    return (
        <div
            className="relative flex flex-col transition-all duration-200 group"
            style={{
                background: note.available ? "rgba(17,22,17,0.8)" : "rgba(14,18,14,0.55)",
                border: note.available
                    ? `1px solid ${tag.color}28`
                    : "1px dashed rgba(200,230,200,0.08)",
            }}
        >
            {/* Top accent */}
            <div
                className="h-px w-full transition-opacity duration-300"
                style={{ background: tag.color, opacity: note.available ? 0.6 : 0.2 }}
            />

            <div className="p-5 flex flex-col flex-1">
                {/* Tag + course */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                        className="text-xs font-mono px-2 py-0.5 border shrink-0"
                        style={{ color: tag.color, borderColor: tag.border, background: tag.bg }}
                    >
                        {note.tag}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground/28 truncate">
                        {note.course}
                    </span>
                </div>

                {/* Title */}
                <h3
                    className="text-base font-semibold font-chalk leading-snug mb-0.5"
                    style={{ color: note.available ? "rgba(220,232,220,0.92)" : "rgba(200,220,200,0.55)" }}
                >
                    {note.title}
                </h3>
                <p className="text-xs font-mono text-muted-foreground/38 mb-4 italic">{note.subtitle}</p>

                {/* Topics */}
                <div className="space-y-1.5 mb-5 flex-1">
                    {note.topics.map((topic, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <span
                                className="mt-2 shrink-0 rounded-full"
                                style={{ width: 3, height: 3, background: tag.color, opacity: note.available ? 0.55 : 0.25, display: "block" }}
                            />
                            <p
                                className="text-xs font-mono leading-snug"
                                style={{ color: note.available ? "rgba(184,204,184,0.7)" : "rgba(184,204,184,0.38)" }}
                            >
                                {topic}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Action */}
                {note.available && note.pdfPath ? (
                    <div className="flex gap-2 mt-auto">
                        <a
                            href={note.pdfPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-2 border border-dashed transition-all duration-200 hover:opacity-80"
                            style={{ borderColor: tag.border, color: tag.color, background: tag.bg }}
                        >
                            <FileText className="h-3 w-3" />
                            View PDF
                        </a>
                        <a
                            href={note.pdfPath}
                            download
                            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-2 border border-dashed transition-all duration-200"
                            style={{ borderColor: "rgba(200,230,200,0.15)", color: "rgba(184,204,184,0.45)" }}
                        >
                            <Download className="h-3 w-3" />
                            Download
                        </a>
                    </div>
                ) : (
                    <div className="mt-auto flex items-center gap-2">
                        <Clock className="h-3 w-3 text-muted-foreground/18" />
                        <span className="text-xs font-mono text-muted-foreground/22 italic">
                            Being typeset
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function TeachingPage() {
    const availableCount = NOTES.filter((n) => n.available).length
    const totalCount = NOTES.length

    const byCourseName = (name: string) => NOTES.filter((n) => n.course === name)

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
                    <p className="text-xs font-mono text-muted-foreground/28 italic">
                        Uploaded progressively as they are typeset.
                    </p>
                </div>

                {/* Progress bar */}
                <div
                    className="flex flex-wrap items-center gap-4 px-4 py-3 mb-10"
                    style={{ background: "rgba(14,18,14,0.6)", border: "1px dashed rgba(200,230,200,0.1)" }}
                >
                    <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground/28" />
                        <span className="text-xs font-mono text-muted-foreground/38">
                            {availableCount} of {totalCount} notes live
                        </span>
                    </div>
                    <div
                        className="flex-1 min-w-[120px] h-0.5"
                        style={{ background: "rgba(200,230,200,0.07)" }}
                    >
                        <div
                            className="h-full transition-all duration-500"
                            style={{
                                width: `${(availableCount / totalCount) * 100}%`,
                                background: "linear-gradient(90deg, #4a9eff, #77dd77)",
                                opacity: 0.65,
                            }}
                        />
                    </div>
                </div>

                {/* Course sections */}
                {COURSES.map((course) => {
                    const notes = byCourseName(course.name)
                    const liveCount = notes.filter((n) => n.available).length
                    return (
                        <div key={course.name} className="mb-14">
                            {/* Course header */}
                            <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-1.5 h-8 shrink-0"
                                        style={{ background: course.color, opacity: 0.55 }}
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground/80 font-chalk leading-tight">
                                            {course.name}
                                        </p>
                                        <p className="text-xs font-mono mt-0.5" style={{ color: course.color, opacity: 0.6 }}>
                                            {course.role} · {course.period}
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs font-mono text-muted-foreground/28">
                                    {liveCount}/{notes.length} available
                                </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-3">
                                {notes.map((note) => (
                                    <NoteCard key={note.id} note={note} />
                                ))}
                            </div>
                        </div>
                    )
                })}

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
