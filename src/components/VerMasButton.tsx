import { ChevronRight } from "lucide-react";

type Props = {
  cantidad?: number;
  link?: string;
  verTodasTexto?: "todas" | "todos";
};

const VerMasButton = ({
  cantidad,
  link = "#",
  verTodasTexto = "todas",
}: Props) => {
  return (
    <a
      href={link}
      className="group font-inter flex gap-3 md:gap-4 items-center font-semibold md:font-bold text-white md:text-lg *:transition-all *:duration-100"
    >
      Ver {verTodasTexto}
      <span className="bg-white/30 px-4 py-1 rounded-xl group-hover:bg-rojo group-hover:scale-105">
        {cantidad}
      </span>
      <ChevronRight className="group-hover:translate-x-1" />
    </a>
  );
};

export default VerMasButton;
