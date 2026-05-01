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

const portfolioItems = [
  {
    id: 1,
    number: "01",
    title: "T&A Autoshop",
    description:
      "Interne App und digitale Workflows für Fahrzeugbestand, Aufgaben, Rollen und Verkaufsprozesse.",
    services: ["App Development", "Workflow Automation", "Internal Tools"],
    image: "https://placehold.co/800x600/11151B/CFC8BB?text=T%26A+Autoshop",
    link: "#",
  },
  {
    id: 2,
    number: "02",
    title: "Haus Genie",
    description:
      "Moderner Webauftritt mit klarer Struktur, besserer Nutzerführung und stärkerem Fokus auf Anfragen.",
    services: ["Website Redesign", "Landing Page", "Lead Generation"],
    image: "https://placehold.co/800x600/11151B/CFC8BB?text=Haus+Genie",
    link: "#",
  },
  {
    id: 3,
    number: "03",
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
    <section className="py-24 md:py-32 bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="font-mono-label text-muted-foreground mb-4 block">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Projects that
              <br />
              deliver results.
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            Digital solutions, websites, and systems that make companies more
            modern, efficient, and professional.
          </p>
        </div>

        {/* Portfolio Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-8">
            {portfolioItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:pl-8 md:basis-1/2 lg:basis-2/3"
              >
                <a
                  href={item.link}
                  className="group block rounded-2xl overflow-hidden border border-border bg-card hover:border-accent/30 transition-all duration-500"
                >
                  {/* Image area */}
                  <div className="relative h-64 md:h-[400px] w-full overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover w-full h-full transform group-hover:scale-[1.03] transition-transform duration-700 ease-in-out"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {/* Number + Tags row */}
                    <div className="flex items-start justify-between mb-5">
                      <span className="text-3xl font-bold text-accent-strong/40 font-mono-label !text-2xl">
                        {item.number}
                      </span>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {item.services.map((service, idx) => (
                          <span
                            key={idx}
                            className="font-mono-label !text-[0.65rem] px-3 py-1 rounded border border-border text-muted-foreground"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Link arrow */}
                    <div className="flex items-center gap-2 font-mono-label text-foreground/60 group-hover:text-accent-strong transition-colors">
                      <span>View project</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end gap-3 mt-10">
            <div className="relative">
              <CarouselPrevious className="static translate-y-0 translate-x-0 rounded-full border border-border bg-card hover:bg-foreground hover:text-background transition-colors" />
            </div>
            <div className="relative">
              <CarouselNext className="static translate-y-0 translate-x-0 rounded-full border border-border bg-card hover:bg-foreground hover:text-background transition-colors" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
