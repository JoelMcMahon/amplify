import { useEffect, useState } from "react";
import { db } from "../../firebase/config";

export const useGetUser = (userId) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const setStateUser = async () => {
      setLoading(true);
      const response = await db.collection("users").doc(userId).get();
      setUser(response.data());
      setLoading(false);
    };

    setStateUser();
  }, []);

  return { loading, user };
};
