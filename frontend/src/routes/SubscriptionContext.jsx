import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  async function loadSubscriptions() {
    try {
      setLoading(true);

      const response = await api.get("/subscriptions");

      setSubscriptions(response.data.subscriptions);
    } catch (error) {
      console.error(
        "Failed to load subscriptions:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function addSubscription(subscription) {
    const response = await api.post(
      "/subscriptions",
      subscription
    );

    setSubscriptions((current) => [
      ...current,
      response.data.subscription,
    ]);

    return response.data.subscription;
  }

  async function updateSubscription(id, data) {
    const response = await api.patch(
      `/subscriptions/${id}`,
      data
    );

    setSubscriptions((current) =>
      current.map((subscription) =>
        subscription._id === id
          ? response.data.subscription
          : subscription
      )
    );

    return response.data.subscription;
  }

  async function deleteSubscription(id) {
    await api.delete(`/subscriptions/${id}`);

    setSubscriptions((current) =>
      current.filter(
        (subscription) =>
          subscription._id !== id
      )
    );
  }

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        loading,
        addSubscription,
        updateSubscription,
        deleteSubscription,
        loadSubscriptions,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscriptions() {
  return useContext(SubscriptionContext);
}