"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react"


export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, subject, message } = formData
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`
    window.location.href = `mailto:karthikeyamachiraju005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden section-gradient">
      <div className="absolute bottom-8 right-8 equation-watermark pointer-events-none select-none">
        <div className="font-mono" style={{ fontFamily: "var(--font-chalk)", fontSize: "1.1rem" }}>⟨ψ|H|ψ⟩ = E</div>
      </div>
      <div className="chalk-scribble-2" /><div className="chalk-scribble-5" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-14">
          <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider mb-3">Reach Out</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-chalk mb-4">Contact</h2>
          <p className="text-sm text-muted-foreground/55 max-w-xl leading-relaxed font-mono">
            Open to research collaborations, PhD inquiries, and discussions on quantum simulation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: contact info */}
          <div className="space-y-8">
            <div className="space-y-4">
              {[
                { Icon: Mail, label: "Email", value: "karthikeyamachiraju005@gmail.com", href: "mailto:karthikeyamachiraju005@gmail.com", color: "#4a9eff" },
                { Icon: MapPin, label: "Location", value: "Bangalore, India", href: undefined, color: "#a8dadc" },
              ].map(({ Icon, label, value, href, color }) => (
                <div key={label} className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 flex items-center justify-center shrink-0"
                    style={{ border: `1px dashed ${color}40`, background: `${color}08` }}
                  >
                    <Icon className="h-4 w-4" style={{ color, opacity: 0.7 }} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground/35 uppercase tracking-wider">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-mono text-foreground/70 hover:text-foreground/90 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-mono text-foreground/70">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="chalk-divider" />

            <div className="flex gap-3">
              <a
                href="https://github.com/0Shunya0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono text-muted-foreground/50 hover:text-foreground/75 transition-colors"
                style={{ border: "1px dashed rgba(200,230,200,0.15)" }}
              >
                <Github className="h-3.5 w-3.5" />GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/karthikeya-machiraju-870411284/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-mono text-muted-foreground/50 hover:text-foreground/75 transition-colors"
                style={{ border: "1px dashed rgba(200,230,200,0.15)" }}
              >
                <Linkedin className="h-3.5 w-3.5" />LinkedIn
              </a>
            </div>

            <div
              className="p-4"
              style={{ background: "rgba(14,20,14,0.5)", border: "1px dashed rgba(200,230,200,0.1)" }}
            >
              <p className="text-xs font-mono text-muted-foreground/38 uppercase tracking-wider mb-2">Particularly interested in</p>
              {[
                "PhD positions in quantum simulation / lattice gauge theories",
                "Research collaborations on non-equilibrium many-body systems",
                "Open quantum systems and photonic quantum computing",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 mt-1.5">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0 bg-primary/40" />
                  <p className="text-xs text-muted-foreground/55 font-mono leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div
            className="p-6"
            style={{ background: "rgba(14,20,14,0.7)", border: "1px dashed rgba(200,230,200,0.14)" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Send className="h-4 w-4 text-primary/60" />
              <p className="text-xs font-mono text-muted-foreground/40 uppercase tracking-wider">Send a Message</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-muted-foreground/40 uppercase tracking-wider mb-1.5">Name</label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} required
                    className="bg-transparent border-0 border-b border-dashed border-border/30 rounded-none focus:border-primary/50 focus-visible:ring-0 font-mono text-sm text-foreground/80 placeholder:text-muted-foreground/20" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-muted-foreground/40 uppercase tracking-wider mb-1.5">Email</label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required
                    className="bg-transparent border-0 border-b border-dashed border-border/30 rounded-none focus:border-primary/50 focus-visible:ring-0 font-mono text-sm text-foreground/80 placeholder:text-muted-foreground/20" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-muted-foreground/40 uppercase tracking-wider mb-1.5">Subject</label>
                <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                  className="bg-transparent border-0 border-b border-dashed border-border/30 rounded-none focus:border-primary/50 focus-visible:ring-0 font-mono text-sm text-foreground/80 placeholder:text-muted-foreground/20" />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-mono text-muted-foreground/40 uppercase tracking-wider mb-1.5">Message</label>
                <Textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} required
                  className="bg-transparent border border-dashed border-border/20 rounded-none focus:border-primary/40 focus-visible:ring-0 font-mono text-sm text-foreground/80 placeholder:text-muted-foreground/20 resize-none" />
              </div>
              <Button type="submit"
                className="w-full quantum-gradient text-white hover:opacity-90 transition-all duration-300 font-chalk rounded-none mt-2">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
