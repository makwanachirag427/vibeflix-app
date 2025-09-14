import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);

  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/trending`);
        setTrendingContent(res.data.content);
      } catch (error) {
        console.log(error.message);
      }
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};
export default useGetTrendingContent;
