import { GraduationCap, Target, Users, BookOpen } from "lucide-react"

const RESEARCH_FOCUS = [
  { topic: "Lattice gauge theories", detail: "Real-time dynamics, Gauss-law constrained Hilbert spaces, Wilson loop observables", color: "#4a9eff", primary: true },
  { topic: "Open quantum systems", detail: "Lindblad dynamics, reservoir engineering, decoherence in photonic entanglement", color: "#a8dadc", primary: true },
  { topic: "Non-equilibrium many-body physics", detail: "Floquet-driven systems, discrete time crystals, eigenstate thermalization breakdown", color: "#77dd77", primary: true },
  { topic: "Photonic quantum platforms", detail: "Metasurface-assisted coherence protection, holonomic gates in disordered media", color: "#a8dadc", primary: false },
]

const EDUCATION = [
  {
    degree: "B.Tech, Computer Science (AI/ML)",
    institution: "PES University, Bengaluru",
    period: "2023-2027",
    coursework: [
      "Quantum Entanglement & Quantum Computing",
      "Quantum Transport & Logic Gates",
      "Nonlinear Optics & Quantum Technology",
      "Linear Algebra & Its Applications",
      "Design & Analysis of Algorithms",
    ],
    color: "#4a9eff",
  },
]

export function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden section-gradient">
      <div
        className="absolute right-6 top-1/3 pointer-events-none select-none"
        style={{ opacity: 0.1, transform: "rotate(6deg)", fontFamily: "var(--font-chalk)", color: "#4a9eff", fontSize: "0.72rem" }}
      >
        <div>H_KS = -J sum(U_sq + h.c.) + h sum(Z_j)</div>
        <div className="mt-2">G_j |phys⟩ = 0  (Gauss law)</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="mb-12">
          <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider mb-3">Background</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-chalk mb-4">About</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left: Identity + Research Focus */}
          <div className="lg:col-span-2 space-y-8">

            <div
              className="p-5"
              style={{ borderLeft: "2px solid rgba(74,158,255,0.6)", background: "rgba(17,17,17,0.4)" }}
            >
              <p className="text-sm text-muted-foreground/75 leading-relaxed">
                Undergraduate researcher at the{" "}
                <span className="text-foreground/90 font-medium">Photonics & Quantum Technology Lab, PES University</span>,
                working under Dr. Kaustav Bhowmick. My research sits at the boundary of
                computational quantum physics and theoretical many-body science, specifically
                building simulation frameworks for{" "}
                <span className="text-primary/90 font-medium">non-equilibrium quantum systems</span>{" "}
                as a path toward quantum simulation of{" "}
                <span className="text-primary/90 font-medium">lattice gauge theories</span>.
              </p>
              <p className="text-sm text-muted-foreground/65 leading-relaxed mt-3">
                My current work on open quantum systems and photonic platforms is deliberate
                groundwork: understanding decoherence, entanglement dynamics, and dissipative
                control in regimes where classical methods break down. The target is real-time
                LGT dynamics, a problem that sits at the frontier of both quantum simulation
                and high-energy physics.
              </p>
            </div>

            <div>
              <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider mb-4">
                Research Focus
              </p>
              <div className="space-y-3">
                {RESEARCH_FOCUS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3" style={{ opacity: item.primary ? 1 : 0.7 }}>
                    <div
                      className="w-1 mt-1.5 shrink-0 rounded-full"
                      style={{ height: "1rem", background: item.color, opacity: item.primary ? 0.7 : 0.35 }}
                    />
                    <div>
                      <p className="text-sm font-mono text-foreground/80">{item.topic}</p>
                      <p className="text-xs text-muted-foreground/50 leading-snug mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="p-4"
              style={{ background: "rgba(17,17,17,0.35)", border: "1px dashed rgba(224,224,224,0.08)" }}
            >
              <div className="flex items-start gap-3">
                <Target className="h-4 w-4 text-accent/50 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-mono text-muted-foreground/40 uppercase tracking-wider mb-1">
                    Research Direction
                  </p>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed">
                    Seeking a fully-funded PhD position to develop scalable quantum simulation frameworks
                    for lattice gauge theories, focusing on real-time, non-equilibrium dynamics
                    inaccessible to classical methods. Open to research groups in quantum simulation,
                    computational quantum physics, and quantum information for HEP.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { role: "Club Head", org: "Q-Forest Quantum Computing Society", note: "100+ members", color: "#4a9eff" },
                { role: "Research Head", org: "Equinox Space Technology Society", note: "Quantum sensing & astrophysics", color: "#77dd77" },
              ].map((l, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 px-3 py-2.5 flex-1 min-w-[200px]"
                  style={{ background: "rgba(17,17,17,0.4)", border: "1px dashed rgba(224,224,224,0.08)" }}
                >
                  <Users className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: l.color, opacity: 0.6 }} />
                  <div>
                    <p className="text-xs font-mono" style={{ color: l.color, opacity: 0.8 }}>{l.role}</p>
                    <p className="text-xs text-muted-foreground/55">{l.org}</p>
                    <p className="text-xs text-muted-foreground/30 mt-0.5">{l.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Education */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground/35" />
              <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider">Education</p>
            </div>

            {EDUCATION.map((edu, i) => (
              <div
                key={i}
                className="p-4"
                style={{
                  background: "rgba(17,17,17,0.45)",
                  border: "1px dashed rgba(224,224,224,0.08)",
                  borderLeft: `2px solid ${edu.color}55`,
                }}
              >
                <div className="pl-2">
                  <p className="text-sm font-semibold text-foreground/80 font-chalk leading-snug mb-0.5">
                    {edu.degree}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground/50 mb-0.5">{edu.institution}</p>
                  <p className="text-xs font-mono text-muted-foreground/30 mb-3">{edu.period}</p>
                  <div className="flex items-center gap-1.5 mb-2">
                    <BookOpen className="h-3 w-3 text-muted-foreground/25" />
                    <p className="text-xs font-mono text-muted-foreground/30 uppercase tracking-wider">
                      Relevant coursework
                    </p>
                  </div>
                  <div className="space-y-1">
                    {edu.coursework.map((course, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: edu.color, opacity: 0.4 }} />
                        <p className="text-xs text-muted-foreground/50 leading-snug font-mono">{course}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  )
}