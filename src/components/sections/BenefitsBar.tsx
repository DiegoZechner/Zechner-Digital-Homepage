import React from "react";
import { PenTool, TrendingUp, ShieldCheck } from "lucide-react";

export function BenefitsBar() {
  const benefits = [
    {
      title: "Individuelles Design",
      text: "Maßgeschneidert für deine Branche und dein Unternehmen.",
      icon: <PenTool className="w-8 h-8 text-primary" />,
    },
    {
      title: "Mehr Anfragen",
      text: "Websites, die Vertrauen schaffen und Besucher zu Kunden machen.",
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
    },
    {
      title: "Rundum-Service",
      text: "Von Strategie über Design bis Umsetzung – alles aus einer Hand.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    },
  ];

  return (
    <section className="relative w-full pb-20 pt-10 md:pt-0 bg-background z-20 -mt-10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx}
              className="glass bg-white/60 p-8 rounded-[2rem] flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow border border-white/50"
            >
              <div className="mb-4 p-4 rounded-full bg-primary/10">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
