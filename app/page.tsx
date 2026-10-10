import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { Process } from "@/components/site/process"
import { Projects } from "@/components/site/projects"
import { Services } from "@/components/site/services"

export default function Home() {
  return (
    <>
      <Header />
      <main id="principal">
        <Hero />
        <Services />
        <Projects />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
