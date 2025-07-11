import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  Settings,
  User,
  UserCheck,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const profiles = [
  {
    id: 1,
    name: "FM BRAVA",
    img: "/logo-white.png",
    isActive: true,
  },
  {
    id: 2,
    name: "FM AYER",
    img: "/fm-ayer-logo.png",
    isActive: false,
  },
];

export default function RadioSelector() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 text-white hover:text-gray-300 p-1"
          onMouseEnter={() => setIsOpen(true)}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          <RadioImage src={"/logo-white.png"} type={"brava"} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-60 bg-negro/80 backdrop-blur-sm  border-gray-700 text-white p-3"
        align="end"
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="flex flex-col gap-2">
          <span className="font-inter text-white font-semibold px-1 py-2">
            Elegí tu radio
          </span>
          {profiles.map((profile) => (
            <DropdownMenuItem
              key={profile.id}
              className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer rounded-sm"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <RadioImage
                src={profile.img}
                type={profile.name === "FM BRAVA" ? "brava" : "ayer"}
              />
              <span className="text-sm font-medium font-inter">
                {profile.name}
              </span>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator className="bg-gray-700" />

        <div className="pt-1">
          <DropdownMenuItem className="flex bg-rojo items-center justify-center p-3 hover:bg-white hover:text-black cursor-pointer rounded-sm transition-colors duration-200">
            <span className="text-sm font-medium font-ibm uppercase">
              Escribinos
            </span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RadioImage({ src, type }: { src: string; type: "brava" | "ayer" }) {
  return (
    <picture
      className={`aspect-square rounded-sm p-1 flex items-center ${
        type === "brava" ? "bg-rojo" : "bg-[#29A9E0]"
      }`}
    >
      <img src={src} alt={`${type} Radio`} className="w-10" />
    </picture>
  );
}
