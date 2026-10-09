import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";
import { useAuth } from "./AuthContext";

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch subscriptions whenever the authenticated user changes.
  useEffect(() => {
    let cancelled = false;

    async function fetchSubscriptions() {
      // Wait until session restoration has finished.
      if (authLoading) return;

      // No logged-in user: never retain another user's data.
      if (!user) {
        setSubscriptions([]);
        setLoading(false);
        return;
      }

      // Clear previous user's data before fetching new data.
      setSubscriptions([]);
      setLoading(true);

      try {
        const response = await api.get("/subscriptions");

        if (!cancelled) {
          setSubscriptions(response.data.subscriptions);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to load subscriptions", error);
          setSubscriptions([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchSubscriptions();

    // Ignore responses from an outdated user/session.
    return () => {
      cancelled = true;
    };
  }, [user?._id, authLoading]);

  // Manually reload subscriptions when needed.
  async function loadSubscriptions() {
    if (!user || authLoading) {
      setSubscriptions([]);
      return;
    }

    try {
      setLoading(true);

      const response = await api.get("/subscriptions");

      setSubscriptions(response.data.subscriptions);
    } catch (error) {
      console.error("Failed to load subscriptions", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function addSubscription(data) {
    const response = await api.post("/subscriptions", data);

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
        (subscription) => subscription._id !== id
      )
    );
  }

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        loading: authLoading || loading,
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
