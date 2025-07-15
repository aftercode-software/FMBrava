import type { Agenda } from "@/utils/fetchAgenda";

export default function EventCard({ event }: { event: Agenda }) {
  const date = new Date(event.dia);
  const day = date.getDate();
  const month = date.toLocaleDateString("es-AR", { month: "long" });

  return (
    <div className="flex items-center gap-[4px] md:h-full w-full text-white/40">
      <div className="md:w-[50%] w-[50%] flex flex-col justify-center text-right">
        <p className="text-base md:text-3xl font-inter capitalize">{month}</p>
        <p className="text-6xl md:text-9xl font-extrabold tracking-tighter">{day}</p>
      </div>

      <div className="md:w-[50%] w-[50%] flex-1 h-full md:h-full overflow-hidden">
        <img
          src={event.imagen.url}
          alt={event.imagen.alt}
          className="w-[100%] md:w-[82%] h-[80%] md:h-full object-cover md:rounded-[8px_8px_76px_8px] rounded-[8px_8px_36px_8px] border-1 border-[#4d4d4d]"
        />
      </div>
    </div>
  );
}
