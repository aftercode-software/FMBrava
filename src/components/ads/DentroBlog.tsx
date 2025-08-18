import { useEffect, useRef, useState } from "react";
import {
  fetchAnunciosEntreSecciones,
  type Anuncio,
} from "@/utils/fetchAnuncios";

export default function DentroBlog({ ad }: { ad: Anuncio | null }) {
  const [anuncio, setAnuncio] = useState<Anuncio | null>(ad || null);
  const uniqueId = useRef(
    `anuncio-entre-secciones-${Math.random().toString(36).substr(2, 9)}`
  );

  const handleImageFetch = async (ad: Anuncio | null) => {
    if (!ad || !ad.image) return null;
    try {
      const res = await fetch(
        `/api/img/get-presigned?url=${encodeURIComponent(ad.image.url)}`
      );
      const { url } = await res.json();
      setAnuncio({
        ...ad,
        image: {
          ...ad.image,
          url: url,
        },
      });
    } catch (error) {
      console.error("error showing add");
      return ad;
    }
  };
  useEffect(() => {
    if (!ad) return;
    handleImageFetch(ad);
  }, []);

  const viewSent = useRef(false);
  const viewInProgress = useRef(false);
  const clickInProgress = useRef(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchAnunciosEntreSecciones().then((anuncios: Anuncio[]) => {
      if (!mounted) return;
      if (anuncios.length > 0) {
        const random = anuncios[Math.floor(Math.random() * anuncios.length)];
        setAnuncio(random);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!anuncio || !divRef.current) return;

    const adId = anuncio.id;

    const incrementViews = async (id: string) => {
      if (viewSent.current || viewInProgress.current) return;
      viewInProgress.current = true;
      try {
        await fetch("/api/ads/increment-view-count", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        viewSent.current = true;
      } catch (error) {
        console.log("error showing add");
      } finally {
        viewInProgress.current = false;
      }
    };

    const incrementClicks = async (id: string) => {
      if (clickInProgress.current) return;
      clickInProgress.current = true;
      try {
        await fetch("/api/ads/increment-click-count", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
      } catch (error) {
        console.log("error showing add");
      } finally {
        clickInProgress.current = false;
      }
    };

    const observer = new window.IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !viewSent.current) {
            incrementViews(adId);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(divRef.current);

    const handleClick = () => {
      incrementClicks(adId);
    };

    divRef.current.addEventListener("click", handleClick);

    return () => {
      observer.disconnect();
      divRef.current?.removeEventListener("click", handleClick);
    };
  }, [anuncio]);

  return (
    <picture className="flex flex-col items-center w-full my-20">
      <div
        ref={divRef}
        id={uniqueId.current}
        data-anuncio-id={anuncio?.id}
        className={`overflow-hidden cursor-pointer ${anuncio ? "" : "h-0"}`}
      >
        {anuncio && (
          <a
            id="anuncio-link"
            href={anuncio.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img
              src={anuncio.image.url}
              alt={anuncio.image.alt}
              className="w-full h-full object-cover"
            />
          </a>
        )}
      </div>
    </picture>
  );
}
