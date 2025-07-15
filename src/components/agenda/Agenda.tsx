import { useState } from "react";
import type { Agenda as AgendaType } from "@/utils/fetchAgenda";

import Container from "../containers/Container.tsx";
import ViewAllButton from "../ViewAllButton.astro";
import EventCard from "./EventCard";
import FeaturedEvent from "./FeaturedEvent";
import Title from "../Title.astro";

type Props = {
  events: AgendaType[];
};

export default function Agenda({ events }: Props) {
   const featured = events[0]; 
  const rest = events.slice(1);
  const goToEvent = (id: string) => {
    window.location.href = `/agenda?id=${id}`;
  };

  return (
      <section className="relative h-full md:h-[55vh]">
        <div className="flex flex-col md:flex-row h-full w-full gap-y-10 md:gap-6">
          <div  key={featured.id} onClick={() => goToEvent(featured.id)}  className="md:w-[30%] md:h-full w-full h-[400px] cursor-pointer">
            <FeaturedEvent event={featured} />
          </div>
          <div  className="w-full md:flex-1 grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-10 md:gap-y-10 h-[300px] md:h-full">
            {rest.map((event) => (
              <div key={event.id} onClick={() => goToEvent(event.id)} className="cursor-pointer">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
