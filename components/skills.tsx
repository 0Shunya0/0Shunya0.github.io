import { Atom, Calculator, Cpu, Layers, BookOpen, Award, ExternalLink } from "lucide-react"

// ─── Data ─────────────────────────────────────────────────────────────────────
const SKILL_GROUPS = [
  {
    category: "Quantum Simulation",
    icon: Atom,
    color: "#4a9eff",
    primary: true,
    tools: [
      { name: "QuTiP", note: "Lindblad dynamics, open systems, density matrices" },
      { name: "Cirq", note: "Floquet evolution, many-body spin models" },
      { name: "Qiskit", note: "Quantum circuits, noise modeling, VQE/QAOA" },
      { name: "PennyLane", note: "Quantum ML, kernel methods, hybrid circuits" },
    ],
  },
  {
    category: "Physics & Formalism",
    icon: Calculator,
    color: "#77dd77",
    primary: true,
    tools: [
      { name: "Open quantum systems", note: "Lindblad master equation, Markovian dynamics, reservoir engineering" },
      { name: "Floquet theory", note: "Driven many-body systems, time-crystalline phases, stroboscopic evolution" },
      { name: "Many-body physics", note: "Spin models, MBL, eigenstate thermalization, disorder" },
      { name: "Lattice gauge theory", note: "Schwinger model VQE, Jordan-Wigner & Kogut-Susskind formulations, exact diagonalization benchmarking" },
      { name: "Cavity QED / photonics", note: "Decoherence engineering, entanglement measures, metasurface modeling" },
    ],
  },
  {
    category: "Scientific Computing",
    icon: Cpu,
    color: "#a8dadc",
    primary: true,
    tools: [
      { name: "Python", note: "NumPy, SciPy, SymPy — primary research environment" },
      { name: "Sparse methods", note: "Krylov subspace solvers, Lanczos, exact diagonalization" },
      { name: "ODE / master equation solvers", note: "Runge-Kutta, adaptive steppers, Lindblad integrators" },
      { name: "MATLAB", note: "Legacy simulation, numerical linear algebra" },
      { name: "CUDA / HPC", note: "Basic GPU acceleration for tensor operations" },
    ],
  },
  {
    category: "Photonic Simulation",
    icon: Layers,
    color: "#a8dadc",
    primary: false,
    tools: [
      { name: "Lumerical FDTD", note: "Waveguide design, metasurface modeling, dispersion analysis" },
      { name: "Photonic crystal modeling", note: "Defect analysis, band structure, loss mechanisms" },
    ],
  },
]

const TEACHING = [
  {
    course: "Quantum Entanglement & Quantum Computing",
    role: "Teaching Assistant",
    period: "Aug–Dec 2025",
    detail:
      "Lab sessions covering quantum algorithms, entanglement measures, stabilizer formalism, quantum channels. Delivered invited lectures on entanglement theory and circuit models.",
    siteUrl: "https://0shunya0.github.io/QEQC_course_website/",
  },
  {
    course: "Quantum Transport & Logic Gates",
    role: "Teaching Assistant",
    period: "Jan–May 2026",
    detail:
      "Lab sessions on quantum transport models, dissipation, hardware-aware gate realizations. Invited lecture modules on loss mechanisms and gate robustness.",
  },
  {
    course: "Introduction to Quantum Computing",
    role: "Subject Matter Expert, PESU IO",
    period: "Aug–Nov 2025",
    detail:
      "Designed and delivered 1-month intensive course: quantum gates, VQE, QAOA, noise-aware circuits. Problem sets and simulation labs on IBM Quantum hardware.",
  },
]

const CERTS = [
  { name: "IBM Qiskit Advocate", year: "2025", strong: true },
  { name: "Womanium Quantum + AI Program — QBronze, QNickel, QCobalt", year: "2024", strong: true },
  { name: "Introduction to Quantum Information Science — KAIST", year: "2024", strong: false },
]

const ADDITIONAL_TOOLS = ["LaTeX", "Git / GitHub", "Docker", "Linux", "Jupyter", "C / C++", "SQL"]

// ─── Section ──────────────────────────────────────────────────────────────────
export function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden section-gradient">
      {/*
        Inject hover styles for the teaching notes button via a <style> tag.
        This avoids onMouseEnter/onMouseLeave handlers (which break Server Components)
        while keeping the distinct teal hover effect.
      */}
      <style>{`
        .teaching-notes-btn {
          background: rgba(168,218,220,0.09);
          border: 1px solid rgba(168,218,220,0.5);
          color: #a8dadc;
          letter-spacing: 0.03em;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .teaching-notes-btn:hover {
          background: rgba(168,218,220,0.18);
          border-color: rgba(168,218,220,0.85);
          color: #c5e9eb;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-14">
          <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider mb-3">
            Technical Profile
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-chalk mb-4">
            Methods & Tools
          </h2>
          <p className="text-sm text-muted-foreground/55 max-w-xl leading-relaxed font-mono">
            Focused on computational and simulation tools relevant to quantum physics research.
            General software engineering skills listed separately below.
          </p>
        </div>

        {/* ── Quantum & Scientific Stack ──────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-14">
          {SKILL_GROUPS.filter((g) => g.primary).map((group) => {
            const Icon = group.icon
            return (
              <div
                key={group.category}
                className="p-5 relative"
                style={{
                  background: "rgba(17,17,17,0.5)",
                  border: "1px dashed rgba(224,224,224,0.1)",
                }}
              >
                <div
                  className="absolute left-0 top-4 bottom-4 w-0.5"
                  style={{ background: group.color, opacity: 0.45 }}
                />
                <div className="pl-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="h-4 w-4" style={{ color: group.color, opacity: 0.7 }} />
                    <p
                      className="text-xs font-mono uppercase tracking-wider"
                      style={{ color: group.color, opacity: 0.8 }}
                    >
                      {group.category}
                    </p>
                  </div>
                  <div className="space-y-3">
                    {group.tools.map((tool) => (
                      <div key={tool.name}>
                        <p className="text-sm font-mono text-foreground/80 mb-0.5">{tool.name}</p>
                        <p className="text-xs text-muted-foreground/45 leading-snug">{tool.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Photonic (secondary) */}
        {SKILL_GROUPS.filter((g) => !g.primary).map((group) => {
          const Icon = group.icon
          return (
            <div
              key={group.category}
              className="p-5 mb-14 relative opacity-80"
              style={{
                background: "rgba(17,17,17,0.4)",
                border: "1px dashed rgba(224,224,224,0.07)",
              }}
            >
              <div
                className="absolute left-0 top-4 bottom-4 w-0.5"
                style={{ background: group.color, opacity: 0.3 }}
              />
              <div className="pl-4">
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="h-4 w-4" style={{ color: group.color, opacity: 0.5 }} />
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/40">
                    {group.category}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {group.tools.map((tool) => (
                    <div key={tool.name}>
                      <p className="text-sm font-mono text-foreground/65 mb-0.5">{tool.name}</p>
                      <p className="text-xs text-muted-foreground/38 leading-snug">{tool.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}

        <div className="chalk-divider mb-14" />

        {/* ── Teaching & Academic Service ─────────────────────────── */}
        <div className="mb-14">

          {/* Header row — label + prominent CTA side by side */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-accent/50" />
              <p className="text-xs font-mono text-muted-foreground/40 uppercase tracking-wider">
                Teaching & Academic Service
              </p>
            </div>

            {/*
              Plain <a> with target="_blank" — NOT Next.js <Link>.
              <Link> does same-tab client navigation and ignores target="_blank".
              Hover is handled by .teaching-notes-btn CSS class above.
            */}
            <a
              href="/teaching"
              target="_blank"
              rel="noopener noreferrer"
              className="teaching-notes-btn inline-flex items-center gap-2 px-4 py-2 text-xs font-mono shrink-0"
            >
              <BookOpen className="h-3.5 w-3.5" />
              View Teaching Notes
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </div>

          {/* Teaching entries */}
          <div className="space-y-4">
            {TEACHING.map((t, i) => (
              <div
                key={i}
                className="p-4 relative"
                style={{
                  background: "rgba(17,17,17,0.4)",
                  borderLeft: "2px solid rgba(224,224,224,0.1)",
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground/80 font-chalk">{t.course}</p>
                    <p className="text-xs font-mono mt-0.5 text-accent/60">{t.role}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/35 shrink-0">{t.period}</span>
                </div>
                <p className="text-xs text-muted-foreground/55 leading-relaxed">{t.detail}</p>
                {t.siteUrl && (
                  <a
                    href={t.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-accent/55 hover:text-accent/80 transition-colors mt-2"
                  >
                    Open course site
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs font-mono text-muted-foreground/30 italic mt-4 pl-1">
            Includes original structured lecture notes developed for these courses.
          </p>
        </div>

        <div className="chalk-divider mb-14" />

        {/* ── Certifications ──────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-5">
            <Award className="h-4 w-4 text-primary/50" />
            <p className="text-xs font-mono text-muted-foreground/40 uppercase tracking-wider">
              Certifications
            </p>
          </div>
          <div className="space-y-2.5">
            {CERTS.map((cert, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                  style={{ background: cert.strong ? "#4a9eff" : "rgba(224,224,224,0.2)" }}
                />
                <div>
                  <p
                    className="text-sm font-mono leading-snug"
                    style={{
                      color: cert.strong ? "rgba(224,224,224,0.75)" : "rgba(224,224,224,0.42)",
                    }}
                  >
                    {cert.name}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground/30 mt-0.5">{cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Additional Tools ────────────────────────────────────── */}
        <div>
          <p className="text-xs font-mono text-muted-foreground/30 uppercase tracking-wider mb-3">
            Additional Tools
          </p>
          <div className="flex flex-wrap gap-2">
            {ADDITIONAL_TOOLS.map((tool) => (
              <span
                key={tool}
                className="text-xs font-mono px-2 py-0.5 text-muted-foreground/30 border border-border/12"
              >
                {tool}
              </span>
            ))}
          </div>
          <p className="text-xs font-mono text-muted-foreground/22 mt-3 italic">
            General software engineering tools — not the research focus.
          </p>
        </div>

      </div>
    </section>
  )
}