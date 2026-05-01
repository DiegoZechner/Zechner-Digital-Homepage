import { Header } from "@/components/layout/Header";
import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { IndustryHero } from "@/components/sections/IndustryHero";
import { LaunchExperience } from "@/components/launch/LaunchExperience";
import { ViewportFrame } from "@/components/launch/ViewportFrame";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <LaunchExperience />
      <ViewportFrame />

      <Header />

      <main className="flex flex-1 flex-col">
        {/* Hero */}
        <IndustryHero />

        {/* Portfolio Section */}
        <PortfolioGallery />

        {/* Google Reviews Section */}
        <GoogleReviews />

        {/* CTA Section — IntegratedBio style */}
        <section className="py-24 md:py-32 px-6 md:px-12 bg-background relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none animate-blob-2" />
          <div className="absolute bottom-0 left-[5%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-foreground-secondary/10 rounded-full blur-[80px] pointer-events-none animate-blob-3" />

          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="rounded-3xl border border-border bg-card p-10 md:p-20 text-center">
              <span className="font-mono-label text-muted-foreground mb-6 block">
                Next Step
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground leading-[1.1]">
                Ready for the
                <br />
                next step?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Let&apos;s find out together how we can support your business 
                through modern digital solutions.
              </p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href="#"
                  className="inline-flex items-center h-14 px-8 rounded-lg bg-foreground text-background font-mono-label hover:opacity-90 transition-opacity"
                >
                  Start a project
                </a>
                <a
                  href="#"
                  className="group inline-flex items-center justify-center w-14 h-14 rounded-lg bg-accent hover:bg-accent-strong transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-accent-foreground transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer — IntegratedBio style */}
      <footer className="border-t border-border bg-foreground-secondary text-primary-foreground pt-16 pb-8 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="font-mono-label !text-base tracking-[0.12em] text-primary-foreground mb-4">
                ZECHNER{" "}
                <span className="text-accent">DIGITAL</span>
              </div>
              <p className="text-primary-foreground/50 max-w-sm leading-relaxed">
                Premium web design and digital solutions for companies that 
                want to appear more professional and gain more inquiries.
              </p>
            </div>
            <div>
              <h4 className="font-mono-label text-primary-foreground/40 mb-5">
                Navigation
              </h4>
              <ul className="space-y-3 text-primary-foreground/60">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Work
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-mono-label text-primary-foreground/40 mb-5">
                Legal
              </h4>
              <ul className="space-y-3 text-primary-foreground/60">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Imprint
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-primary-foreground/40">
            <p className="font-mono-label">
              © {new Date().getFullYear()} Zechner Digital. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="hover:text-accent transition-colors font-mono-label"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors font-mono-label"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
