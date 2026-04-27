import { Header } from "@/components/layout/Header";
import { PortfolioGallery } from "@/components/sections/PortfolioGallery";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { IndustryHero } from "@/components/sections/IndustryHero";
import { BenefitsBar } from "@/components/sections/BenefitsBar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      <main className="flex flex-1 flex-col">
        {/* New Industry Slider Hero */}
        <IndustryHero />
        <BenefitsBar />

        {/* Portfolio Section */}
        <PortfolioGallery />

        {/* Google Reviews Section */}
        <GoogleReviews />

        {/* CTA / Services Placeholder Section */}
        <section className="py-24 px-4 md:px-8 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/30 pointer-events-none"></div>
          <div className="container mx-auto max-w-5xl text-center relative z-10 glass p-12 md:p-20 rounded-3xl border border-border">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">Bereit für den nächsten Schritt?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Lassen Sie uns gemeinsam herausfinden, wie wir Ihr Unternehmen durch moderne digitale Lösungen unterstützen können.
            </p>
            <Button size="lg" className="text-base h-14 px-8">
              Unverbindliches Erstgespräch
            </Button>
          </div>
        </section>
      </main>

      {/* Footer Placeholder */}
      <footer className="border-t border-border bg-card pt-16 pb-8 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="font-bold text-xl tracking-wider text-primary mb-4">
                ZECHNER <span className="text-foreground">DIGITAL</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Premium Webdesign und digitale Lösungen für Unternehmen, die wachsen wollen.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Startseite</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Leistungen</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Projekte</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Kontakt</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Impressum</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Datenschutz</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">AGB</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Zechner Digital. Alle Rechte vorbehalten.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
