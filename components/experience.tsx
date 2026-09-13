import type React from "react"
import { Calendar, GraduationCap, Microscope, Users, FlaskConical } from "lucide-react"

const RESEARCH_EXPERIENCE = [
  {
    title: "Undergraduate Researcher",
    org: "Photonics & Quantum Technology Lab, PES University",
    advisor: "Advisor: Dr. Kaustav Bhowmick, Associate Professor, ECE",
    period: "Jan 2025 - Present",
    color: "#4a9eff",
    projects: [
      {
        name: "Photonic Entanglement Coherence Protection via Metasurface Engineering",
        points: [
          "Modeled decoherence suppression in photonic entangled states using Lindblad dynamics (QuTiP)",
          "Demonstrated coherence revival under asymmetric damping; quantified concurrence and negativity across engineered spectral densities",
          "Identified intra-inter entanglement transfer regimes establishing conditions for robust photonic entanglement preservation",
          "Manuscript in preparation",
        ],
      },
      {
        name: "Two-Dimensional Discrete Time Crystal Simulation",
        points: [
          "Simulated 2D periodically driven Floquet spin systems (Cirq) to study disorder-induced MBL and ETH breakdown",
          "Mapped phase boundaries via disorder sweeps and scaling analysis; identified critical thresholds and characterized long-lived period-doubled oscillations in prethermal regimes",
        ],
      },
    ],
  },
]

const TEACHING = [
  {
    title: "Teaching Assistant: Quantum Entanglement & Quantum Computing",
    org: "PES University",
    period: "Aug-Dec 2025",
    color: "#a8dadc",
    points: [
      "Led laboratory sessions covering quantum algorithms, entanglement measures, stabilizer formalism, and quantum channels",
      "Delivered invited lectures on entanglement theory and quantum circuit models",
    ],
  },
  {
    title: "Teaching Assistant: Quantum Transport & Logic Gates",
    org: "PES University",
    period: "Jan 2026 - Present",
    color: "#a8dadc",
    points: [
      "Conducted lab sessions on quantum transport models, dissipation, and hardware-aware gate realizations",
      "Delivered invited lecture modules on loss mechanisms and gate robustness",
    ],
  },
  {
    title: "Subject Matter Expert: Introduction to Quantum Computing",
    org: "PESU IO",
    period: "Aug-Nov 2025",
    color: "#77dd77",
    points: [
      "Designed and delivered 1-month intensive course: quantum gates, VQE, QAOA, noise-aware circuits",
      "Developed problem sets and simulation labs on IBM Quantum hardware for undergraduate learners",
    ],
  },
]

const LEADERSHIP = [
  {
    title: "Club Head: Q-Forest Quantum Computing Society",
    org: "PES University",
    period: "May 2024 – May 2025",
    color: "#4a9eff",
    points: [
      "Led student-run academic society focused on quantum computing and quantum simulation (100+ members)",
      "Organized research-oriented bootcamps and symposia including Quanta and Graviton 2.0",
    ],
  },
  {
    title: "Research Head: Equinox Space Technology Society",
    org: "PES University",
    period: "May 2024 – May 2025",
    color: "#77dd77",
    points: [
      "Headed research activities in computational astrophysics, quantum sensing, and space-oriented quantum technologies",
      "Coordinated student research teams and mentored simulation-driven research projects",
    ],
  },
]

const EDUCATION = [
  {
    degree: "B.Tech in Computer Science (AI/ML)",
    institution: "PES University, Bengaluru",
    period: "2023-2027",
    color: "#4a9eff",
    coursework: [
      "Quantum Entanglement & Quantum Computing",
      "Quantum Transport & Logic Gates",
      "Nonlinear Optics & Quantum Technology",
      "Chip-Level Photonics",
      "Linear Algebra & Its Applications",
      "Design & Analysis of Algorithms",
    ],
  },
]

function SectionLabel({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-7">
      <Icon className="h-4 w-4" style={{ color, opacity: 0.6 }} />
      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground/40">{label}</p>
    </div>
  )
}

function BulletPoint({ text, color }: { text: string; color: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: color, opacity: 0.5 }} />
      <p className="text-xs text-muted-foreground/60 leading-relaxed">{text}</p>
    </div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden section-gradient">
      <div
        className="absolute left-4 top-1/3 pointer-events-none select-none"
        style={{ opacity: 0.09, transform: "rotate(-8deg)", color: "#77dd77", fontSize: "0.68rem", fontFamily: "var(--font-chalk)" }}
      >
        U_F = exp(-iH_F T)
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mb-12">
          <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider mb-3">Academic Record</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-chalk mb-4">
            Experience & Education
          </h2>
        </div>

        {/* Research Experience */}
        <div className="mb-14">
          <SectionLabel icon={Microscope} label="Research Experience" color="#4a9eff" />
          {RESEARCH_EXPERIENCE.map((exp, i) => (
            <div
              key={i}
              className="p-6 mb-4"
              style={{
                background: "rgba(17,17,17,0.6)",
                border: "1px dashed rgba(74,158,255,0.2)",
                borderLeft: "3px solid rgba(74,158,255,0.55)",
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div>
                  <p className="text-base font-semibold text-foreground/90 font-chalk">{exp.title}</p>
                  <p className="text-sm font-mono text-primary/70 mt-0.5">{exp.org}</p>
                  <p className="text-xs font-mono text-muted-foreground/35 mt-0.5">{exp.advisor}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground/35 shrink-0">
                  <Calendar className="h-3 w-3" />
                  {exp.period}
                </div>
              </div>
              <div className="mt-5 space-y-5">
                {exp.projects.map((proj, j) => (
                  <div key={j}>
                    <p className="text-xs font-mono text-primary/60 mb-2 italic">{proj.name}</p>
                    <div className="space-y-1.5">
                      {proj.points.map((pt, k) => (
                        <BulletPoint key={k} text={pt} color="#4a9eff" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="chalk-divider mb-14" />

        {/* Teaching */}
        <div className="mb-14">
          <SectionLabel icon={FlaskConical} label="Teaching & Mentorship" color="#a8dadc" />
          <div className="space-y-4">
            {TEACHING.map((t, i) => (
              <div
                key={i}
                className="p-4"
                style={{
                  background: "rgba(17,17,17,0.45)",
                  border: "1px dashed rgba(224,224,224,0.08)",
                  borderLeft: `2px solid rgba(168,218,220,0.4)`,
                }}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground/80 font-chalk">{t.title}</p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: t.color, opacity: 0.65 }}>{t.org}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/30 shrink-0">{t.period}</span>
                </div>
                <div className="space-y-1.5">
                  {t.points.map((pt, j) => (
                    <BulletPoint key={j} text={pt} color={t.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chalk-divider mb-14" />

        {/* Leadership */}
        <div className="mb-14">
          <SectionLabel icon={Users} label="Leadership & Service" color="#77dd77" />
          <div className="grid md:grid-cols-2 gap-4">
            {LEADERSHIP.map((l, i) => (
              <div
                key={i}
                className="p-4"
                style={{
                  background: "rgba(17,17,17,0.4)",
                  border: "1px dashed rgba(224,224,224,0.07)",
                  borderLeft: `2px solid rgba(119,221,119,0.4)`,
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground/75 font-chalk leading-snug">{l.title}</p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: l.color, opacity: 0.55 }}>{l.org}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/28 shrink-0">{l.period}</span>
                </div>
                <div className="space-y-1.5">
                  {l.points.map((pt, j) => (
                    <BulletPoint key={j} text={pt} color={l.color} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chalk-divider mb-14" />

        {/* Education */}
        <div>
          <SectionLabel icon={GraduationCap} label="Education" color="#a8dadc" />
          <div className="grid md:grid-cols-2 gap-5">
            {EDUCATION.map((edu, i) => (
              <div
                key={i}
                className="p-5"
                style={{
                  background: "rgba(17,17,17,0.4)",
                  border: "1px dashed rgba(224,224,224,0.08)",
                  borderLeft: `2px solid ${edu.color}55`,
                }}
              >
                <p className="text-sm font-semibold text-foreground/80 font-chalk leading-snug mb-0.5">
                  {edu.degree}
                </p>
                <p className="text-xs font-mono text-muted-foreground/50 mb-0.5">{edu.institution}</p>
                <p className="text-xs font-mono text-muted-foreground/28 mb-4">{edu.period}</p>
                <p className="text-xs font-mono text-muted-foreground/30 uppercase tracking-wider mb-2">
                  Physics-relevant coursework
                </p>
                <div className="space-y-1.5">
                  {edu.coursework.map((course, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: edu.color, opacity: 0.4 }} />
                      <p className="text-xs text-muted-foreground/50 font-mono leading-snug">{course}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}