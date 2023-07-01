import { useState, useEffect } from "react";
import instance from "@/utils/axios";

export const useWeatherData = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const fetchData = async (params) => {
    try {
      setLoading(true);
      const result = await instance.get("", { params });
      setLoading(false);
      setSuccess(true);
      setData(result.data);
    } catch (e) {
      setLoading(false);
      setSuccess(false);
      setError(true);
      setErrorMessage(e);
    }
  };

  return { data, loading, error, errorMessage, success, fetchData };
};
