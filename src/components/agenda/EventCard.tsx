import type { Agenda } from "@/utils/fetchAgenda";

export default function EventCard({ event }: { event: Agenda }) {
  const date = new Date(event.dia);
  let day: string = date.getDate().toString();
  const month = date.toLocaleDateString("es-AR", { month: "long" });

  day = Number(day) < 10 ? `0${day}` : day;

  return (
    <div
      className="group flex items-center gap-2 lg:h-full w-full hover:text-white text-white/60 *:transition-all *:duration-200 cursor-pointer"
      onClick={() => {
        if (event.link) {
          window.open(event.link, "_blank");
        }
      }}
    >
      <div className="lg:w-[50%] w-[49%] flex flex-col justify-center text-right">
        <p className="text-lg lg:text-3xl font-ibm font-medium capitalize">
          Noviembre
        </p>
        <p className="text-6xl lg:text-9xl font-inter font-extrabold tracking-tighter ">
          {day}
        </p>
      </div>

      <div className="lg:w-[50%] w-[60%] h-full lg:h-full overflow-hidden border-1 lg:rounded-[8px_8px_76px_8px] rounded-[8px_8px_36px_8px] border-[#4d4d4d] group-hover:border-white group-hover:scale-105">
        <img
          src={event.imagen.url}
          alt={event.imagen.alt}
          className="w-[100%] lg:h-full object-cover"
        />
      </div>
    </div>
  );
}
