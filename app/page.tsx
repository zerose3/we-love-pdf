import { Hero } from "./sections/hero"
import { Tools } from "./sections/tools"
import { HowItWorks } from "./sections/how-it-works"
import { Features } from "./sections/features"
import { Pricing } from "./sections/pricing"
import { Testimonials } from "./sections/testimonials"
import { FAQ } from "./sections/faq"
import { Footer } from "./sections/footer"

export default function Home() {
  return (
    <>
      <Hero />
      <Tools />
      <HowItWorks />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  )
}