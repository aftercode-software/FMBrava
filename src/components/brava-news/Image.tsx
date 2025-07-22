import { useEffect, useState } from "react";

export default function Image({
  url,
  alt,
}: {
  url: string;
  alt: string | undefined;
}) {
  const [imageUrl, setImageUrl] = useState<string>();

  const handleImageFetch = async (src: string | null) => {
    if (!src) return null;
    try {
      const res = await fetch(
        `/api/img/get-presigned?url=${encodeURIComponent(src)}`
      );
      const { url } = await res.json();
      setImageUrl(url);
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };
  useEffect(() => {
    handleImageFetch(url);
  }, []);

  return (
    <picture className="w-full flex justify-center">
      <img
        src={imageUrl}
        alt={alt || "Imagen ilustrativa"}
        className="max-w-full h-auto"
      />
    </picture>
  );
}
