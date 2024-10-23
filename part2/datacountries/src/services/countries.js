import axios from "axios";
// const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const baseUrl = "http://localhost:3001"

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((request) => request.data);
};

const show = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`);
  return request.then((request) => request.data);
};

export default { getAll, show };
