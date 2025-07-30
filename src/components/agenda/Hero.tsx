import type { Agenda } from "@/utils/fetchAgenda";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import Container from "../containers/Container";
import EventCard from "./EventCard";
import FeaturedEvent from "./FeaturedEvent";

export default function AgendaHero({ events }: { events: Agenda[] }) {
  const [featured, setFeatured] = useState(events[0]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      const selected = events.find((e) => e.id === id);
      if (selected) setFeatured(selected);
    }
  }, [events]);

  const handleEventSelect = useCallback((event: Agenda) => {
    setFeatured(event);
  }, []);

  const currentIndex = events.findIndex((e) => e.id === featured.id);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < events.length - 1;

  const goToPrevious = () => {
    if (canGoPrevious) {
      handleEventSelect(events[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      handleEventSelect(events[currentIndex + 1]);
    }
  };

  const rest = events.filter((e) => e.id !== featured.id);

  return (
    <section className="bg-negro-900 text-white gridpy-12 lg:py-16 min-h-screen">
      <Container className="space-y-0 lg:space-y-16 grid grid-cols-1 lg:grid-cols-2 gap-20">
        <aside>
          <section className="text-left space-y-2">
            <div className="space-y-4">
              <span className="font-inter font-extrabold lg:text-xl tracking-[0.25em] text-negro-400 uppercase">
                BRAVA te invita a
              </span>
              <h1 className="text-6xl lg:text-8xl 3xl:text-9xl font-bold font-tusker tracking-wide mt-4 uppercase">
                {featured.nombre}
              </h1>
            </div>

            <div className="space-x-4 items-end flex max-w-4xl font-ibm">
              <span className="text-green-400 font-medium text-lg md:text-xl">
                100% match con vos
              </span>
              <p className="flex gap-1 items-center font-medium text-lg md:text-xl font-ibm text-white">
                el{" "}
                {new Date(featured.dia).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          </section>
          <section className="relative" aria-labelledby="featured-event-title">
            <div className="relative  gap-8 lg:gap-12 items-center">
              <div className="space-y-6 lg:space-y-8">
                <div className="flex items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-base lg:text-lg xl:text-xl font-ibm text-white/70 mt-2 leading-relaxed transition-opacity duration-200 `}
                    >
                      {featured.descripcion}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rojo focus:ring-offset-2 focus:ring-offset-negro-900"
                    aria-label="Evento anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <span className="text-sm text-white/60 font-ibm">
                    {currentIndex + 1} de {events.length}
                  </span>

                  <button
                    onClick={goToNext}
                    disabled={!canGoNext}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rojo focus:ring-offset-2 focus:ring-offset-negro-900"
                    aria-label="Siguiente evento"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </aside>
        <div className="transition-opacity duration-200 w-full">
          <div
            className="absolute top-1/2 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-rojo rounded-full blur-[200px] lg:blur-[400px] opacity-30 pointer-events-none -translate-y-1/2"
            aria-hidden="true"
          />
          <FeaturedEvent event={featured} />
        </div>
      </Container>
      {events.length > 1 && (
        <Container>
          <section aria-labelledby="other-events-title">
            <h3
              id="other-events-title"
              className="text-2xl lg:text-3xl font-inter font-bold my-8 text-center lg:text-left"
            >
              Otros eventos
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {rest.map((event) => (
                <button
                  key={event.id}
                  onClick={() => handleEventSelect(event)}
                  className="group text-left transition-transform duration-200 hover:scale-105 focus:outline-none  rounded-lg"
                  aria-label={`Seleccionar evento: ${event.nombre}`}
                >
                  <div className="transition-opacity duration-200 group-hover:opacity-90">
                    <EventCard event={event} />
                  </div>
                </button>
              ))}
            </div>
          </section>
        </Container>
      )}
    </section>
  );
}
