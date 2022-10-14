import axios from "axios";

const instance = axios.create({
  // THE HALF URL ALSO THE BASE URL WHICH IS COMPLETEF BY ADDING THE NEXT PART OF THE URL
  baseURL: "https://api.themoviedb.org/3",
});
export default instance;
