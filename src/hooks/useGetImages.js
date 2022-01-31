import { useState, useEffect } from "react";
import axios from "axios";

function useGetImages(pageNum) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    let cancel;

    setIsLoading(true);
    setError(false);

    let urlString = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&extras=url_s&api_key=aabca25d8cd75f676d3a74a72dcebf21&format=json&nojsoncallback=1`;
    urlString += `&page=${pageNum}`;
    axios
      .get(urlString, {
        cancelToken: new CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        console.log(res.data.photos);
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
        if (axios.isCancel(err)) return;
        setError(err);
      });

    return () => cancel();
  }, [pageNum]);

  return { isLoading, error, images, hasMore };
}

export default useGetImages;
