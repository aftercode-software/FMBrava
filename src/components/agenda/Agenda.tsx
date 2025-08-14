import type { Agenda } from "@/utils/fetchAgenda";
import EventCard from "./EventCard";
import FeaturedEvent from "./FeaturedEvent";

type Props = {
  events: Agenda[];
  cantidad?: number;
};

export default function Agenda({ events, cantidad }: Props) {
  const featured = events[0];
  const rest = events.slice(1);
  const goToEvent = (id: string) => {
    window.location.href = `/agenda?id=${id}`;
  };

  return (
    <section className="mt-6 w-full">
      <div className="flex flex-col lg:flex-row lg:min-h-[600px] h-full w-full gap-y-10 lg:gap-6">
        <div
          key={featured.id}
          onClick={() => goToEvent(featured.id)}
          className="h-98 sm:h-auto lg:w-[38%] w-full cursor-pointer"
        >
          <FeaturedEvent event={featured} />
        </div>
        <div className="w-full lg:flex-1 grid grid-cols-2 gap-x-4 gap-y-6 lg:gap-y-10 lg:h-full">
          {rest.slice(0, cantidad).map((event) => (
            <div
              key={event.id}
              onClick={() => goToEvent(event.id)}
              className="cursor-pointer"
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
