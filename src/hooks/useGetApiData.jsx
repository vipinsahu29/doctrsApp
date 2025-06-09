// src/hooks/useTableData.js
import { useEffect,useState, useCallback } from "react";

const useGetApiData = (inputParameter,getTableDataFn) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!getTableDataFn) {
      // console.warn("getTableData function is not provided");
      return;
    }

    setLoading(true);
    const { data, errorMessage, count } = await getTableDataFn(inputParameter);
    setData(data);
    setCount(count);
    setError(errorMessage);
    setLoading(false);
  }, [inputParameter, getTableDataFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, count, error, loading, refetch: fetchData };
};

export default useGetApiData;
