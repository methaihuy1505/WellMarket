import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/categories")
      .then((res) => {
        if (res && res.data) {
          setCategories(res.data);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading, error };
}
