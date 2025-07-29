"use client";

import type { Agenda } from "@/utils/fetchAgenda";
import { useEffect, useState } from "react";

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

  const rest = events.filter((e) => e.id !== featured.id);
  return (
    <section className="bg-negro-900 text-white py-8">
      <Container className="flex flex-col items-center gap-8 lg:gap-32 h-[1200px]">
        <div className="w-full flex justify-between flex-col md:flex-row h-full">
          <div className="w-full lg:w-[75%]">
            <span className="font-inter font-extrabold text-xl tracking-[0.25em] text-negro-400">
              ENTERATE DE TODO
            </span>
            <h1 className="text-6xl lg:text-8xl 3xl:text-9xl font-bold font-tusker tracking-wide mt-4">
              NUESTRA AGENDA
            </h1>
            <div className="flex flex-col gap-4 font-ibm text-xl mt-2">
              <span className="text-green-400 font-medium">
                Consulta nuestros proximos eventos
              </span>
            </div>
            <p className="text-xl lg:text-2xl tracking-tight font-ibm mt-4">
              Descubrí los próximos eventos de Brava para no perderte de
              ninguno.
            </p>
            <div className="hidden md:flex items-center gap-2 mt-6">
              <div>
                <img
                  src="/sections-icons/agenda-icon.webp"
                  alt="Agenda"
                  className="w-24 md:w-32 mb-2"
                />
              </div>
              <div className=" w-[75%]">
                <h2 className="text-[32px] font-inter font-bold text-white tracking-wider">
                  {featured.nombre}
                </h2>
                <p className="text-[20px] font-normal font-ibm text-white/60">
                  {featured.descripcion}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:block bg-rojo h-[30%] w-[30%] absolute top-2/5 left-4/5 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[400px] pointer-events-none"></div>
          <div className="my-6  flex-1 h-[400px] md:max-w-[20%] justify-end">
            <FeaturedEvent event={featured} />
          </div>
          <div className="md:hidden flex items-center gap-2 mt-6">
            <div className=" w-full">
              <h2 className="text-[32px] font-inter font-bold text-white tracking-wider">
                {featured.nombre}
              </h2>
              <p className="text-[20px] font-normal font-ibm text-white/60">
                {featured.descripcion}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:flex-1 grid grid-cols-2 grid-rows-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-y-10 h-[300px] md:h-full z-10">
          {rest.map((event) => (
            <button
              key={event.id}
              onClick={() => setFeatured(event)}
              className="text-left"
            >
              <EventCard event={event} />
            </button>
          ))}
        </div>
        <div className="w-full lg:w-3/5">{/* <Player client:load />  */}</div>
      </Container>
    </section>
  );
}
