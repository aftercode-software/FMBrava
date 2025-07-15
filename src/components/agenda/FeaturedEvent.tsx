import type { Agenda } from "@/utils/fetchAgenda";

export default function FeaturedEvent({ event }: { event: Agenda }) {
  const date = new Date(event.dia);
  const day = date.getDate();
  const month = date.toLocaleDateString("es-AR", { month: "long" });

  return (
    <div className="relative h-full text-white rounded-[8px_8px_76px_8px] overflow-hidden border border-[#4d4d4d]">
      <img
        src={event.imagen.url}
        alt={event.imagen.alt}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(322deg,rgba(255,20,20,1) 0%, rgba(0,0,0,0.45) 35%, rgba(255,255,255,0) 100%)",
        }}
      ></div>

      <div className="relative z-20 h-full flex flex-col justify-end p-6">
        <div className="flex justify-between items-end w-full">
          <div className="text-left max-w-[60%]">
            <h3 className="text-xl md:text-3xl font-bold leading-tight">
              {event.nombre}
            </h3>
          </div>
          <div className="flex flex-col text-right justify-end h-full">
            <p className="font-medium capitalize font-inter tracking-wider text-xl md:text-3xl">
              {month}
            </p>
            <p className="text-6xl md:text-9xl font-extrabold font-inter tracking-tight">
              {day}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
