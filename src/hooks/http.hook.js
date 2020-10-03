import { useState, useCallback, useRef, useEffect } from "react";

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      try {
        setIsLoading(true);
        const abortCtrl = new AbortController();
        fetchRequests.current.push(abortCtrl);
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: abortCtrl.signal,
        });
        const responseData = await response.json();
        fetchRequests.current = fetchRequests.current.filter(
          (reqCtrl) => reqCtrl !== abortCtrl
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      fetchRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
