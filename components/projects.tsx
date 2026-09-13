import { Button } from "@/components/ui/button"
import { ExternalLink, Github, BookOpen, FlaskConical, Microscope, Zap, FileText } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────
type ResearchStatus = "manuscript" | "active" | "completed" | "exploratory" | "submitted" | "accepted" | "revision"
type ResearchDomain = "lgt" | "floquet" | "openqs" | "qml"

interface ResearchEntry {
  title: string
  subtitle: string
  domain: ResearchDomain
  status: ResearchStatus
  // Overrides the STATUS_META label for this card only (e.g. to include a venue) —
  // status still drives badge color, statusLabel only overrides the displayed text.
  statusLabel?: string
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
  submitted: { label: "Submitted", color: "#77dd77" },
  accepted: { label: "Accepted", color: "#c4a84c" },
  revision: { label: "In Revision", color: "#f4a261" },
}

// ─── Publications ─────────────────────────────────────────────────────────────
type PubStatus = "submitted" | "ready" | "drafting" | "accepted" | "revision"

interface Publication {
  title: string
  firstAuthor: boolean
  status: PubStatus
  venue?: string
}

const PUB_STATUS: Record<PubStatus, { label: string; color: string; desc: string }> = {
  submitted: { label: "submitted", color: "#77dd77", desc: "under review" },
  ready:     { label: "ready",     color: "#4a9eff", desc: "complete draft" },
  drafting:  { label: "drafting",  color: "#b08060", desc: "in write-up" },
  accepted:  { label: "accepted",  color: "#c4a84c", desc: "accepted for publication" },
  revision:  { label: "in revision", color: "#f4a261", desc: "revising per reviewer feedback" },
}

const PUBLICATIONS: Publication[] = [
  {
    title: "Variational Quantum Simulation of the Schwinger Model",
    firstAuthor: true,
    status: "revision",
  },
  {
    title: "Drive Structure Reverses the Sign of Coordination Sensitivity in Prethermal Time Crystals",
    firstAuthor: true,
    status: "drafting",
  },
  {
    title: "Where Does Quantum Generative Augmentation Help? Decomposing Rebalancing, Diversity, and Learning in Imbalanced Classification",
    firstAuthor: true,
    status: "submitted",
    venue: "Quantum Machine Intelligence",
  },
  {
    title: "Holonomic Quantum Gates in Disordered Photonic Waveguide Structures",
    firstAuthor: false,
    status: "submitted",
    venue: "QIP (Springer)",
  },
  {
    title: "Photon Blockade and Nonlinear Optics in Si₃N₄ Microring Cavities",
    firstAuthor: false,
    status: "accepted",
    venue: "FiO+LS 2026",
  },
  {
    title: "Optical Loss Mechanisms in Polymer and Glass Photonic Crystal Waveguides",
    firstAuthor: false,
    status: "accepted",
    venue: "FiO+LS 2026",
  },
]

const RESEARCH: ResearchEntry[] = [
  // ── FEATURED ─────────────────────────────────────────────────────────────
  {
    title: "Variational Quantum Simulation of the Schwinger Model",
    subtitle: "U(1) Lattice Gauge Theory via VQE",
    domain: "lgt",
    status: "revision",
    featured: true,
    why: "The Schwinger model (1+1D QED) is the canonical testbed for quantum simulation of gauge theories. Demonstrating that VQE recovers known physics — including the string-breaking transition — establishes the computational framework for gauge systems inaccessible to classical methods.",
    methods: [
      "Jordan-Wigner transformation to qubit Hamiltonian (Kogut-Susskind formulation)",
      "Hardware-efficient VQE ansatz with gauge-invariant encoding",
      "Exact diagonalization benchmarking against trapped-ion experimental results",
      "Entanglement entropy as order parameter for the string-breaking transition",
    ],
    outcome: "Reproduced trapped-ion benchmark results to 0.013% deviation. Identified entanglement entropy as a more noise-robust order parameter than local observables — critical for hardware implementation of gauge-invariant measurements under realistic noise.",
    tools: ["Qiskit", "QuTiP", "Python", "NumPy/SciPy"],
  },
  {
    title: "Holonomic Quantum Gates in Disordered Waveguide Structures",
    subtitle: "Robustness of Geometric Photonic Gates in Random Media",
    domain: "openqs",
    status: "submitted",
    statusLabel: "Submitted, QIP (Springer)",
    featured: true,
    why: "Geometric phases are intrinsically noise-resilient. Establishing their robustness in disordered photonic media is key to fault-tolerant photonic quantum computing.",
    methods: [
      "Adiabatic holonomy in random media",
      "Anderson localization in photonic waveguides",
      "Gate fidelity under disorder averaging",
    ],
    outcome: "Gate fidelity holds at ≈0.997 while concurrence falls to 0.49 under 1/f noise — showing that fidelity metrics alone systematically miss decoherence in geometric photonic gates. Establishes robustness thresholds as a function of disorder strength.",
    tools: ["QuTiP", "Python", "Lumerical (waveguide modeling)"],
  },
  // ── PRIMARY ───────────────────────────────────────────────────────────────
  {
    title: "Drive Structure Reverses the Sign of Coordination Sensitivity in Prethermal Time Crystals",
    subtitle: "Two-Dimensional Discrete Time Crystal Simulation",
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
    outcome: "Corrected a 19.2× mean-field overestimate of critical disorder down to the experimentally measured 5.0× via exact diagonalization. Mapped phase boundaries on 1D, 2D square, and honeycomb geometries; characterized long-lived period-doubled oscillations in prethermal regimes.",
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
    title: "Where Does Quantum Generative Augmentation Help?",
    subtitle: "Decomposing Rebalancing, Diversity, and Learning in Imbalanced Classification",
    domain: "qml",
    status: "submitted",
    featured: false,
    why: "Reported gains from quantum generative models are rarely separated into their sources. This work decomposes a reported advantage into class rebalancing, sample diversity, and genuine learning, and tests each with explicit controls.",
    methods: [
      "Untrained-generator control: identical initialization, zero training steps",
      "Noise-injection ablation on a deterministic quantum generator",
      "Calibration-aware protocol with per-seed resampling over 15 seeds",
      "Real-hardware noise characterization on IBM Fez, depth- and qubit-matched",
    ],
    outcome: "Rebalancing accounts for most of the reported effect; diversity contributes less and only at extreme scarcity; genuine learning contributes least, appearing in one of six evaluated cells. A protocol ablation shows that single result is itself contingent on a calibrated decision threshold and a random-forest downstream classifier.",
    tools: ["PennyLane", "Qiskit", "IBM Fez", "scikit-learn", "Python"],
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
    status: "accepted",
    statusLabel: "Accepted, FiO+LS 2026",
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

function StatusBadge({ status, label }: { status: ResearchStatus; label?: string }) {
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
      {label ?? meta.label}
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
            <StatusBadge status={entry.status} label={entry.statusLabel} />
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
    "What are scalable routes to SU(2) and non-Abelian lattice gauge theories — beyond the U(1) Schwinger model?",
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
            Lattice gauge theory simulation, non-equilibrium many-body dynamics, and photonic
            platforms — from VQE implementation to phase boundary mapping to decoherence engineering.
          </p>
        </div>

        {/* ── Publications & Manuscripts ─────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="h-4 w-4 text-primary/50" />
            <p className="text-xs font-mono text-muted-foreground/45 uppercase tracking-wider">
              Publications & Manuscripts
            </p>
          </div>

          {/* Status key */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 mb-5">
            {(Object.entries(PUB_STATUS) as [PubStatus, typeof PUB_STATUS[PubStatus]][]).map(([key, s]) => (
              <div key={key} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: s.color, opacity: 0.65 }} />
                <span className="text-xs font-mono text-muted-foreground/38">{s.label} — {s.desc}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            {PUBLICATIONS.map((pub, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-4 py-2.5"
                style={{
                  background: "rgba(14,20,14,0.5)",
                  border: "1px dashed rgba(200,230,200,0.07)",
                }}
              >
                <span className="text-xs font-mono text-muted-foreground/22 shrink-0 mt-px">[{i + 1}]</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start gap-2">
                    <p className="text-sm font-mono text-foreground/75 leading-snug flex-1">{pub.title}</p>
                    {pub.firstAuthor && (
                      <span
                        className="text-[10px] font-mono px-1.5 py-0.5 border shrink-0"
                        style={{
                          color: "#4a9eff",
                          borderColor: "rgba(74,158,255,0.2)",
                          background: "rgba(74,158,255,0.06)",
                        }}
                      >
                        first author
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-0.5">
                    <span
                      className="text-xs font-mono"
                      style={{ color: PUB_STATUS[pub.status].color, opacity: 0.8 }}
                    >
                      {PUB_STATUS[pub.status].label}
                    </span>
                    {pub.venue && (
                      <span className="text-xs font-mono text-muted-foreground/32">{pub.venue}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chalk divider */}
        <div className="chalk-divider mb-14" />

        {/* ── Featured Work ──────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-4 w-4 text-accent/60" />
            <p className="text-xs font-mono text-muted-foreground/45 uppercase tracking-wider">
              Featured Research
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