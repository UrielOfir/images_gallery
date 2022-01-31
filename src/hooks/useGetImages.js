import { useState, useEffect } from "react";
import axios from "axios";

function useGetImages(pageNum) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    axios({
      method: "GET",
      url: `https://api.flickr.com/services/rest/`,
      params: {
        method: "flickr.photos.getRecent",
        extras: "url_s",
        api_key: "aabca25d8cd75f676d3a74a72dcebf21",
        format: "json",
        nojsoncallback: "1",
        page: pageNum,
      },
    })
      .then((res) => {
        setImages((prev) => {
          return [
            ...new Set([
              ...prev,
              ...res.data.photos.photo.map((photo) => photo.url_s),
            ]),
          ];
        });

        setHasMore(res.data.photos.page !== res.data.photos.pages);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });

    return;
  }, [pageNum]);

  return { isLoading, error, images, hasMore };
}

export default useGetImages;
