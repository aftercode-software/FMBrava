"use client";

import { useState } from "react";
import { ChevronDown, Radio } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const profiles = [
  {
    id: 1,
    name: "FM BRAVA",
    img: "/logo-white.png",
    isActive: true,
    bgColor: "bg-rojo",
  },
  {
    id: 2,
    link: "https://www.fmayer.net.ar/",
    name: "FM AYER",
    img: "/fm-ayer-logo.png",
    isActive: false,
    bgColor: "bg-[#29A9E0]",
  },
];

export default function RadioSelector() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-3 focus:outline-none text-white hover:text-gray-100 transition-all duration-300 ease-out p-2 rounded-xl hover:bg-white/5 backdrop-blur-sm">
          <ChevronDown
            className={`w-5 h-5 transition-all duration-300 ease-out ${
              isOpen ? "rotate-180 text-rojo" : "group-hover:text-rojo"
            }`}
          />
          <div className="relative">
            <RadioImage
              src={profiles[0].img}
              type={profiles[0].name === "FM BRAVA" ? "brava" : "ayer"}
              bgColor={profiles[0].bgColor}
              size="lg"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 bg-black/90 backdrop-blur-xl border *:font-ibm border-gray-800/50 text-white p-0 shadow-2xl shadow-black/50 rounded-2xl overflow-hidden"
        align="end"
        sideOffset={8}
      >
        <div className="relative bg-gradient-to-r from-red-600/20 to-blue-500/20 border-gray-800/50">
          <div className="p-6 border-b border-gray-800/50">
            <div className="flex items-center gap-3 mb-2">
              <Radio className="w-5 h-5 text-rojo" />
              <span className="font-semibold text-lg tracking-tight">
                Elegí tu radio
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Seleccioná tu estación favorita
            </p>
          </div>

          <div className="p-4 pt-0 space-y-2 *:font-ibm">
            {profiles.map((profile, index) => (
              <button
                key={profile.id}
                className={`group w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ease-out hover:bg-white/5 hover:scale-[1.02] $`}
                onClick={() => {
                  setIsOpen(false);
                  if ((profile.id = 2))
                    window.open("https://www.fmayer.net.ar/", "_blank");
                }}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="relative">
                  <RadioImage
                    src={profile.img}
                    type={profile.name === "FM BRAVA" ? "brava" : "ayer"}
                    bgColor={profile.bgColor}
                    size="md"
                  />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-white group-hover:text-gray-100 transition-colors">
                    {profile.name}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {profile.isActive ? "En vivo" : "Disponible"}
                  </div>
                </div>
                <div className="w-2 h-2 rounded-full transition-all duration-300  bg-green-400 animate-pulse" />
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-gray-800/50">
            <button
              className="w-full rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold py-4 px-6 transition-all duration-200 hover:scale-[1.02] uppercase tracking-wide text-sm"
              onClick={() =>
                window.open(
                  "https://api.whatsapp.com/send?phone=542613440000&text=Hola%20Brava!!",
                  "_blank"
                )
              }
            >
              <span className="flex items-center justify-center gap-2">
                Escribinos
              </span>
            </button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RadioImage({
  src,
  type,
  bgColor,
  size = "md",
}: {
  src: string;
  type: "brava" | "ayer";
  bgColor: string;
  size?: "md" | "lg";
}) {
  const sizeClasses = size === "lg" ? "w-14 h-14" : "w-12 h-12";
  const imgSizeClasses = size === "lg" ? "w-12 h-12" : "w-10 h-10";

  const image = (
    <div
      className={`${sizeClasses} rounded-xl ${bgColor} shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
    >
      <div className="w-full h-full rounded-[10px] flex items-center justify-center">
        <img
          src={src || "/placeholder.svg"}
          alt={`${type} Radio`}
          className={`${imgSizeClasses} object-contain`}
        />
      </div>
    </div>
  );

  if (type === "ayer") {
    return (
      <a
        href="https://www.fmayer.net.ar/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {image}
      </a>
    );
  }
  return image;
}
