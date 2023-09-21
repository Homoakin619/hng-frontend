"use client";
import Loader from "@/components/Loader";
import { images } from "@/images";
import ImageCard from "@/components/ImageCard";

import { DragEvent, KeyboardEvent, TouchEvent, useEffect, useState } from "react";
import Navigation from "@/components/Navigation";


type ImagesProp = {
    id: number;
    tag: string;
    src: string;
}

export default function Home() {
   
  const [imageList, setImageList] = useState<ImagesProp[]>(images);
  const [loading,setLoading] = useState(true)
  const [dragId, setDragId] = useState("");


  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    const searchText = event.currentTarget.value;
    const imgDivs = document.getElementsByClassName('gallery-item');

    for (let i = 0; i< imgDivs.length; i++) {
        let tag = imgDivs[i].getAttribute('title') as string;
        if (tag.indexOf(searchText) > -1) {
            (imgDivs[i] as HTMLDivElement).style.display = ""
        } else {
            (imgDivs[i] as HTMLDivElement).style.display = "none"
        }
    }

  }


  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation()
    let element = event.currentTarget as HTMLDivElement;
    let id = (event.currentTarget as HTMLDivElement).id;
    setDragId(id);
  };


  const handleDrop = (event: DragEvent) => {
    const element = event.currentTarget as HTMLDivElement;
    const sourcePos = imageList.find((image) => "" + image.id === dragId);
    const targetPos = imageList.find(
      (image) => "" + image.id === element.id
    );
    
    const updatedImages = [...imageList];
    const [movedImage] = updatedImages.splice(sourcePos?.id as number, 1);
    updatedImages.splice(targetPos?.id as number, 0, movedImage);
   
    element.classList.remove("is-over");
    setImageList(updatedImages);
  };


  const handleEnter = (event: DragEvent<HTMLDivElement>) => {
    let element = event.target as HTMLDivElement;
    
    let hoveredElement = (event.currentTarget as HTMLDivElement);
    let draggedElement = element;

    if (hoveredElement.tagName != "div") {
      hoveredElement = element.parentElement as HTMLDivElement;
    }
    
    if (hoveredElement.id != draggedElement.id) {
      hoveredElement.classList.add("is-over");
    }
    
  };

  
  const handleLeave = (event: DragEvent<HTMLDivElement>) => {
    let element = event.target as HTMLDivElement;
    if (element.tagName !== "div") {
      element = element.parentElement as HTMLDivElement;
    }
    element.classList.remove("is-over");
    
  };

  return (
    <>
    <Navigation handler={handleKeyUp} />
      <div className="gallery-wrapper">
        {imageList.map((image, index) => {
          return (
            <div
              title={image.tag}
              className="gallery-item"
              key={index}
              draggable={true}
              id={"" + index}
              onDragOver={(event) => event.preventDefault()}
              onDragStart={handleDrag}
              onDrop={handleDrop}
              onDragEnter={handleEnter}
              onDragLeave={handleLeave}
            >
              <ImageCard image={image.src} description="" />
            </div>
          );
        })}
      </div>
    </>
  );
}