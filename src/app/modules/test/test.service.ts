import axios from "axios";
const m = async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  return response.data;
};

export const testService = { m };
