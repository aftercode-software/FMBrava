import { Newspaper, Radio, Calendar } from "lucide-react";

export default function BravaNewsEmpty() {
  return (
    <div className="min-h-screen text-white">
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
        <div className="flex space-x-8 mb-8">
          <div className="animate-bounce delay-0">
            <div className="w-16 h-16 bg-gradient-to-br from-rojo-500 to-rojo-600 rounded-full flex items-center justify-center">
              <Newspaper className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="animate-bounce delay-150">
            <div className="w-16 h-16 bg-gradient-to-br from-rojo-500 to-rojo-600 rounded-full flex items-center justify-center">
              <Radio className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="animate-bounce delay-300">
            <div className="w-16 h-16 bg-gradient-to-br from-rojo-500 to-rojo-600 rounded-full flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-ibm font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Brava News
          </h1>
          <p className="text-xl font-ibm text-gray-300 mb-4">
            Pronto tendrás aquí las últimas noticias y novedades de la radio.
          </p>
        </div>
      </div>
    </div>
  );
}
