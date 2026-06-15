import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <Navigation />
      <Hero />
      <Projects />   {/* id="research" — Research section immediately after hero */}
      <About />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}