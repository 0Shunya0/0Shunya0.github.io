import { Button } from "@/components/ui/button"
import { ExternalLink, Github, BookOpen, FlaskConical, Microscope, Zap } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type ResearchStatus = "manuscript" | "active" | "completed" | "exploratory"
type ResearchDomain = "lgt" | "floquet" | "openqs" | "qml"

interface ResearchEntry {
  title: string
  subtitle: string
  domain: ResearchDomain
  status: ResearchStatus
  featured: boolean
  why: string
  methods: string[]
  outcome: string
  tools: string[]
  githubUrl?: string
  paperUrl?: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const DOMAIN_META: Record<ResearchDomain, { label: string; color: string; dim?: boolean }> = {
  lgt: { label: "Lattice Gauge Theory", color: "#4a9eff" },
  floquet: { label: "Non-Equilibrium Dynamics", color: "#77dd77" },
  openqs: { label: "Open Quantum Systems", color: "#a8dadc" },
  qml: { label: "QML Methods", color: "#b08060", dim: true },
}

const STATUS_META: Record<ResearchStatus, { label: string; color: string }> = {
  manuscript: { label: "Manuscript in Prep", color: "#a8dadc" },
  active: { label: "Active Research", color: "#77dd77" },
  completed: { label: "Completed Study", color: "#4a9eff" },
  exploratory: { label: "Exploratory Study", color: "#b08060" },
}

const RESEARCH: ResearchEntry[] = [
  // ── FEATURED ─────────────────────────────────────────────────────────────
  {
    title: "Holonomic Quantum Gates in Disordered Waveguide Structures",
    subtitle: "Robustness of Geometric Photonic Gates in Random Media",
    domain: "openqs",
    status: "manuscript",
    featured: true,
    why: "Geometric phases are intrinsically noise-resilient. Establishing their robustness in disordered photonic media is key to fault-tolerant photonic quantum computing.",
    methods: [
      "Adiabatic holonomy in random media",
      "Anderson localization in photonic waveguides",
      "Gate fidelity under disorder averaging",
    ],
    outcome: "Quantified gate robustness thresholds as a function of disorder strength. Demonstrated partial preservation of geometric phase under moderate disorder.",
    tools: ["QuTiP", "Python", "Lumerical (waveguide modeling)"],
  },
  // ── PRIMARY ───────────────────────────────────────────────────────────────
  {
    title: "Two-Dimensional Discrete Time Crystal Simulation",
    subtitle: "Floquet DTC vs Rondeau Temporal Order across Spatial Geometries",
    domain: "floquet",
    status: "active",
    featured: false,
    why: "Time-crystalline phases in driven many-body systems are prototypical examples of non-equilibrium order - directly relevant to the stability of gauge field configurations under real-time evolution.",
    methods: [
      "Floquet unitary evolution (Cirq)",
      "Mean-field density matrix simulation",
      "Exact diagonalization benchmarks",
      "Disorder sweeps and phase boundary mapping",
    ],
    outcome: "Mapped critical disorder thresholds for ETH violation. Characterized long-lived period-doubled oscillations in prethermal regimes on 1D, 2D square, and honeycomb geometries.",
    tools: ["Cirq", "NumPy", "SciPy", "Python"],
  },
  {
    title: "Composite Pulses for Tri-State X-Gates in Qutrit Systems",
    subtitle: "Narrowband Control via Composite Pulse Sequences",
    domain: "openqs",
    status: "manuscript",
    featured: false,
    why: "Qutrits extend the computational basis beyond qubits. Robust single-qutrit control under narrow bandwidth constraints is essential for photonic qutrit implementations.",
    methods: [
      "Composite pulse design for SU(3) rotations",
      "Robustness to amplitude and frequency errors",
      "Bloch-sphere generalization to SU(3) manifold",
    ],
    outcome: "Designed narrowband composite pulse sequences achieving high-fidelity X-gate operation in the presence of systematic control errors.",
    tools: ["QuTiP", "Python", "SymPy"],
  },
  {
    title: "Quantum Support Vector Machines for HEP Event Classification",
    subtitle: "Quantum Kernel Methods on CERN Open Data",
    domain: "qml",
    status: "active",
    featured: false,
    why: "Methodological: probing where quantum kernel advantage appears - and where it fails under noise and scaling constraints. Calibration-aware evaluation against classical SVM baselines.",
    methods: [
      "ZZ and Pauli feature maps (Qiskit)",
      "Quantum kernel alignment and expressivity analysis",
      "Hybrid quantum-classical SVM architecture",
      "Benchmarking against classical RBF kernel",
    ],
    outcome: "Identified noise sensitivity regimes where quantum kernels underperform classical baselines. Ongoing analysis of feature map expressivity in high-dimensional HEP feature spaces.",
    tools: ["Qiskit", "PennyLane", "scikit-learn", "Python"],
  },
  {
    title: "Optical Loss Mechanisms in Polymer and Glass Photonic Crystals",
    subtitle: "Defect-Induced Attenuation and Scattering Analysis",
    domain: "openqs",
    status: "manuscript",
    featured: false,
    why: "Loss mechanisms limit photonic platform viability for quantum simulation. Characterizing defect-induced attenuation is a prerequisite for engineering low-loss photonic quantum systems.",
    methods: [
      "FDTD simulation (Lumerical)",
      "Defect modeling in photonic crystal geometries",
      "Spectral attenuation analysis",
    ],
    outcome: "Characterized dominant loss channels in polymer vs. glass photonic crystals as a function of defect density and spectral regime.",
    tools: ["Lumerical", "Python", "NumPy"],
  },
  {
    title: "Quantum Key Distribution Protocol Demonstration",
    subtitle: "BB84-Inspired Hardware Implementation",
    domain: "qml",
    status: "completed",
    featured: false,
    why: "Hardware demonstration of quantum cryptographic primitives. Implemented as an educational platform for quantum randomness and eavesdropping detection.",
    methods: [
      "BB84 protocol simulation",
      "QBER (quantum bit error rate) analysis",
      "Arduino + Raspberry Pi sensor entropy sourcing",
    ],
    outcome: "End-to-end demonstration with eavesdropper detection via QBER threshold analysis. Deployed as teaching demonstration.",
    tools: ["Arduino", "Raspberry Pi", "Python"],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function DomainPip({ domain }: { domain: ResearchDomain }) {
  const meta = DOMAIN_META[domain]
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-mono"
      style={{ color: meta.dim ? "rgba(176,128,96,0.55)" : meta.color, opacity: meta.dim ? 0.8 : 1 }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{ background: meta.color, opacity: meta.dim ? 0.5 : 0.8 }}
      />
      {meta.label}
      {meta.dim && (
        <span className="text-[9px] text-muted-foreground/30 ml-0.5">(methodological)</span>
      )}
    </span>
  )
}

function StatusBadge({ status }: { status: ResearchStatus }) {
  const meta = STATUS_META[status]
  return (
    <span
      className="text-xs font-mono px-2 py-0.5 border"
      style={{
        color: meta.color,
        borderColor: `${meta.color}30`,
        background: `${meta.color}08`,
      }}
    >
      {meta.label}
    </span>
  )
}

function ResearchCard({ entry, index }: { entry: ResearchEntry; index: number }) {
  const domainMeta = DOMAIN_META[entry.domain]
  const isDimDomain = domainMeta.dim

  return (
    <div
      className="relative p-5 transition-all duration-300 group"
      style={{
        background: "rgba(17,17,17,0.6)",
        border: "1px dashed rgba(224,224,224,0.1)",
        opacity: isDimDomain ? 0.85 : 1,
      }}
    >
      {/* Left domain accent bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-0.5"
        style={{ background: domainMeta.color, opacity: isDimDomain ? 0.3 : 0.5 }}
      />

      <div className="pl-3">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <DomainPip domain={entry.domain} />
            <StatusBadge status={entry.status} />
          </div>
          <span className="text-xs font-mono text-muted-foreground/25">#{String(index + 1).padStart(2, "0")}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-foreground/90 font-chalk mb-0.5 leading-snug">
          {entry.title}
        </h3>
        {entry.subtitle !== entry.title && (
          <p className="text-xs font-mono text-muted-foreground/45 mb-3 italic">{entry.subtitle}</p>
        )}

        {/* Why it matters */}
        <div className="mb-3">
          <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider mb-1">Why it matters</p>
          <p className="text-sm text-muted-foreground/65 leading-relaxed">{entry.why}</p>
        </div>

        {/* Methods */}
        <div className="mb-3">
          <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider mb-1.5">Methods</p>
          <div className="space-y-1">
            {entry.methods.map((m, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-muted-foreground/25 mt-1 shrink-0" style={{ fontSize: "0.55rem" }}>▸</span>
                <p className="text-xs text-muted-foreground/60 font-mono leading-snug">{m}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outcome */}
        <div className="mb-4 pl-3 border-l border-border/20">
          <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider mb-1">Outcome</p>
          <p className="text-xs text-muted-foreground/60 leading-relaxed">{entry.outcome}</p>
        </div>

        {/* Tools + Links */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {entry.tools.map((tool) => (
              <span key={tool} className="text-xs font-mono px-1.5 py-0.5 border border-border/15 text-muted-foreground/40">
                {tool}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {entry.paperUrl && (
              <Button size="sm" variant="ghost"
                className="h-7 px-2 text-xs font-mono text-muted-foreground/40 hover:text-foreground/70 hover:bg-muted/10"
                asChild>
                <a href={entry.paperUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />Paper
                </a>
              </Button>
            )}
            {entry.githubUrl && (
              <Button size="sm" variant="ghost"
                className="h-7 px-2 text-xs font-mono text-muted-foreground/40 hover:text-foreground/70 hover:bg-muted/10"
                asChild>
                <a href={entry.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3 w-3 mr-1" />Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── SECTION ─────────────────────────────────────────────────────────────────
export function Projects() {
  const featured = RESEARCH.filter((r) => r.featured)
  const primary = RESEARCH.filter((r) => !r.featured && DOMAIN_META[r.domain].dim !== true)
  const secondary = RESEARCH.filter((r) => !r.featured && DOMAIN_META[r.domain].dim === true)

  // Current open questions
  const openQuestions = [
    "Can photonic platforms simulate real-time gauge field dynamics beyond classical tractability?",
    "How can decoherence be engineered - not eliminated - to preserve entanglement in open quantum systems?",
    "What are scalable approaches to digital simulation of U(1) and SU(2) lattice gauge theories?",
    "How does many-body localization structure the stability of non-equilibrium phases in driven lattice systems?",
  ]

  return (
    <section id="research" className="py-20 relative overflow-hidden section-gradient">
      {/* Background equation */}
      <div className="absolute right-6 top-1/4 equation-watermark pointer-events-none select-none">
        <div className="text-3xl font-mono text-muted-foreground opacity-15 transform rotate-6">
          H_KS = -J∑□(U□+U□†) + h∑Zⱼ
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider mb-3">
            Scientific Contributions
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-chalk mb-4">
            Research
          </h2>
          <p className="text-sm text-muted-foreground/60 max-w-2xl leading-relaxed font-mono">
            Work spanning open quantum systems, non-equilibrium dynamics, and photonic platforms-
            building toward quantum simulation of lattice gauge theories.
          </p>
        </div>

        {/* ── Featured Work ──────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-4 w-4 text-accent/60" />
            <p className="text-xs font-mono text-muted-foreground/45 uppercase tracking-wider">
              Featured - Manuscripts in Preparation
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {featured.map((entry, i) => (
              <ResearchCard key={entry.title} entry={entry} index={i} />
            ))}
          </div>
        </div>

        {/* Chalk divider */}
        <div className="chalk-divider mb-14" />

        {/* ── Primary Research ──────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <FlaskConical className="h-4 w-4 text-primary/60" />
            <p className="text-xs font-mono text-muted-foreground/45 uppercase tracking-wider">
              Primary Research
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {primary.map((entry, i) => (
              <ResearchCard key={entry.title} entry={entry} index={featured.length + i} />
            ))}
          </div>
        </div>

        {/* ── Open Questions ─────────────────────────────────────────── */}
        <div className="mb-14 p-6 border border-border/15" style={{ background: "rgba(17,17,17,0.4)" }}>
          <div className="flex items-center gap-3 mb-5">
            <Microscope className="h-4 w-4 text-accent/50" />
            <p className="text-xs font-mono text-muted-foreground/45 uppercase tracking-wider">
              Open Questions I Care About
            </p>
          </div>
          <div className="space-y-3">
            {openQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-muted-foreground/25 font-mono text-xs mt-0.5 shrink-0">Q{i + 1}.</span>
                <p className="text-sm text-muted-foreground/60 font-mono leading-relaxed italic">{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chalk divider */}
        <div className="chalk-divider mb-14" />

        {/* ── Secondary / Methodological ────────────────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-4 w-4 text-muted-foreground/30" />
            <p className="text-xs font-mono text-muted-foreground/35 uppercase tracking-wider">
              Secondary & Methodological Work
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {secondary.map((entry, i) => (
              <ResearchCard key={entry.title} entry={entry} index={featured.length + primary.length + i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}