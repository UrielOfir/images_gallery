import "./App.css";
import React, { useState, useRef, useCallback } from "react";
import useGetImages from "./hooks/useGetImages";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, error, images, hasMore } = useGetImages(pageNum);

  const navigate = useNavigate();
  const routeChange = (imgUrl) => {
    let path = `ImageView/`;
    navigate(path, { state: { imgUrl } });
  };

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <div className="App">
      <h1>Gallery</h1>
      <div className="images-container">
        {images.map((image, i) => {
          if (images.length === i + 1) {
            return (
              <div
                className="img-holder"
                key={i}
                ref={lastBookElementRef}
                onClick={() => routeChange(image)}
              >
                <img src={image} alt="" />
              </div>
            );
          } else {
            return (
              <div
                className="img-holder"
                key={i}
                onClick={() => routeChange(image)}
              >
                <img src={image} alt="" />
              </div>
            );
          }
        })}
      </div>
      <div>{isLoading && "Loading..."}</div>
      <div>{error && "Error..."}</div>
    </div>
  );
}
