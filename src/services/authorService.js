import axios from "axios";

const API_URL = "http://your-api-url.com/api/authors";
export const getAuthors = async () => {
  return await axios.get(API_URL);
};
