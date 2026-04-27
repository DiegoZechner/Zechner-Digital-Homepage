"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

const portfolioItems = [
  {
    id: 1,
    title: "T&A Autoshop",
    description:
      "Interne App und digitale Workflows für Fahrzeugbestand, Aufgaben, Rollen und Verkaufsprozesse.",
    services: ["App Development", "Workflow Automation", "Internal Tools"],
    image: "https://placehold.co/800x600/11151B/CFC8BB?text=T%26A+Autoshop",
    link: "#",
  },
  {
    id: 2,
    title: "Haus Genie",
    description:
      "Moderner Webauftritt mit klarer Struktur, besserer Nutzerführung und stärkerem Fokus auf Anfragen.",
    services: ["Website Redesign", "Landing Page", "Lead Generation"],
    image: "https://placehold.co/800x600/11151B/CFC8BB?text=Haus+Genie",
    link: "#",
  },
  {
    id: 3,
    title: "Business Dashboard",
    description:
      "Dashboard-Konzept für bessere Übersicht, schnellere Entscheidungen und klarere Prozesse.",
    services: ["Dashboard", "Automation", "Business Intelligence"],
    image: "https://placehold.co/800x600/11151B/CFC8BB?text=Business+Dashboard",
    link: "#",
  },
];

export function PortfolioGallery() {
  return (
    <section className="py-24 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gradient">
            Ausgewählte Projekte
          </h2>
          <p className="text-muted-grey text-lg md:text-xl max-w-2xl">
            Digitale Lösungen, Websites und Systeme, die Unternehmen moderner,
            effizienter und professioneller machen.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {portfolioItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:pl-6 md:basis-1/2 lg:basis-2/3"
              >
                <div className="group relative rounded-2xl overflow-hidden glass hover:border-primary/30 transition-all duration-500 flex flex-col h-full">
                  <div className="relative h-64 md:h-[400px] w-full overflow-hidden bg-muted">
                    {/* Fallback to simple img for external placeholder */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60"></div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-card border border-border text-muted-foreground"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-semibold mb-3 text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-8 flex-grow">
                      {item.description}
                    </p>

                    <Button
                      variant="outline"
                      className="self-start group/btn"
                      asChild
                    >
                      <a href={item.link}>
                        Projekt ansehen
                        <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end gap-4 mt-8">
            <div className="relative">
              <CarouselPrevious className="static translate-y-0 translate-x-0" />
            </div>
            <div className="relative">
              <CarouselNext className="static translate-y-0 translate-x-0" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
