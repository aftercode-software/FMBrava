import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Container from "../containers/Container";
import RadioSelector from "./RadioSelector";

const navigationItems = [
  { name: "Inicio", href: "/" },
  { name: "Programas", href: "/brava-news" },
  { name: "Agenda", href: "/agenda" },
  { name: "Brava News", href: "/brava-news" },

];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const currentPath =
    typeof window !== "undefined" ? window.location.pathname.toLowerCase() : "";

  useEffect(() => {
    const scroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  const navBgClass = scrolled
    ? "bg-gradient-to-b from-negro-900 to-negro/30 backdrop-blur-sm"
    : "bg-gradient-to-b from-negro-900/80 to-transparent";
  const transitionClass = "transition-colors duration-200";

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        className={`
          hidden lg:flex fixed top-0 w-full items-center justify-between 
          py-6  z-40
          ${navBgClass} ${transitionClass}
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="flex items-center justify-between w-full">
          <motion.a className="flex items-center" href="/">
            <img src="/logo.png" alt="Brava Radio" className="h-12 w-auto" />
          </motion.a>

          <div className="flex items-center space-x-8">
            {navigationItems.map((item, index) => {
              let itemPath = "/" + item.name.toLowerCase().replace(/\s+/g, "-");
              if (item.name === "Inicio") itemPath = "";
              const isActive =
                itemPath === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(itemPath);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a
                    href={item.href}
                    className={`flex items-center space-x-2 font-medium transition-colors duration-200 font-inter ${
                      isActive
                        ? "bg-white text-black rounded-full px-5 py-1 hover:text-red-500"
                        : "text-white py-1 rounded-full px-4"
                    }`}
                  >
                    <span>{item.name}</span>
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Radio Selector */}
          <RadioSelector />
        </Container>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        className={`
          lg:hidden fixed top-0 left-0 w-full py-6  z-50
          ${navBgClass} ${transitionClass}
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="flex items-center justify-between w-full">
          <motion.a
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            href="/"
          >
            <img
              src="/logo.png"
              alt="Brava Radio"
              className="h-10 w-auto z-60"
            />
          </motion.a>

          <button
            onClick={toggleMenu}
            className="text-white hover:text-red-500 transition-colors duration-200 "
          >
            <Menu className="h-6 w-6" />
          </button>
        </Container>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-gradient-to-b from-black via-rojo-700 to-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between py-8 border-b border-gray-800">
              <Container className="flex items-center justify-end w-full">
                <motion.button
                  onClick={toggleMenu}
                  className="text-white hover:text-red-500"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </Container>
            </div>

            {/* Menu Items */}
            <Container>
              <div className="flex flex-col py-8 space-y-6">
                {navigationItems.map((item, index) => {
                  let itemPath =
                    "/" + item.name.toLowerCase().replace(/\s+/g, "-");
                  if (item.name === "Inicio") itemPath = "/";
                  const isActive =
                    itemPath === "/"
                      ? currentPath === "/"
                      : currentPath.startsWith(itemPath);

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                    >
                      <a
                        href={item.href}
                        onClick={toggleMenu}
                        className={`flex items-center space-x-3 transition-colors duration-200 text-lg py-2 mx-2 rounded-full justify-center font-inter ${
                          isActive
                            ? "bg-white text-black font-bold"
                            : "text-white font-normal"
                        }`}
                      >
                        <span>{item.name}</span>
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
