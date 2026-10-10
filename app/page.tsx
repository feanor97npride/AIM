import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"
import { Header } from "@/components/site/header"
import { Hero } from "@/components/site/hero"
import { Process } from "@/components/site/process"
import { Projects } from "@/components/site/projects"
import { Services } from "@/components/site/services"
import { getSiteContent } from "@/lib/site-content"

export default async function Home() {
  const site = await getSiteContent()

  return (
    <>
      <Header site={site} />
      <main id="principal">
        <Hero site={site} />
        <Services site={site} />
        <Projects site={site} />
        <Process site={site} />
        <Contact site={site} />
      </main>
      <Footer site={site} />
    </>
  )
}
