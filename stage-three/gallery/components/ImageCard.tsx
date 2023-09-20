type ImageProp = {
    image: string,
    description: string,
}

export default function ImageCard({image,description}: ImageProp) {
  return (
    
      // <figure className="" >
        <img
          src={image}
          alt="Image"
          className="gallery-image"
        />
      // </figure>
    
  );
}
