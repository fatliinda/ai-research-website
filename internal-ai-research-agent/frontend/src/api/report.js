import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/reports",
});

export const getReports = async () => {
  return await API.get("/");
};

export const getReportById = async (id) => {
  return await API.get(`/${id}`);
};

export const generateReport = async (data) => {
  return await API.post("/generate", data);
};