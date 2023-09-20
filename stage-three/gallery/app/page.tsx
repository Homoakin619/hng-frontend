import Gallery from "@/components/Gallery";
import Loader from "@/components/Loader";
import { getImages } from "@/images";
import { Suspense } from "react";

type ImagesProp = {
    id: number;
    category: string;
    src: string;
}

export default function HomePage() {
    const images = getImages()
    console.log(images);
    
  return (
    <Suspense fallback={<Loader />}>
      <Gallery promise={images} />
    </Suspense>
  );
}
