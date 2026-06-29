import { useEffect, useState } from "react";
import { useAuth } from "../../Firebase/useAuth";
import { subscribeClientProjects } from "../services/dashboardService";
import type { Project } from "../types";

export function useProjects() {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeClientProjects(
      currentUser.uid,
      (data) => {
        setProjects(data);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching projects:", err);
        setProjects([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  return { projects, loading };
}
