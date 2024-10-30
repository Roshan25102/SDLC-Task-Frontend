import React, { useEffect, useState } from "react";
import Card from "./Card"; 
import "./Home.css"; 

const Home = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const numberOfImages = 70; 
  const fetchImages = async () => {
    try {
      const imagePromises = Array.from({ length: numberOfImages }, (_, index) =>
        fetch(`https://picsum.photos/id/${index + 1}/200/300`)
      );
      const responses = await Promise.all(imagePromises);
      const imageUrls = responses.map(response => ({
        url: response.url,
        title: `Image ${response.url.split("/").pop().split(".")[0]}`, 
      }));
      setImages(imageUrls);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="home">
      <h1>Random Images</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {images.map((image, index) => (
            <Card key={index} image={image} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
