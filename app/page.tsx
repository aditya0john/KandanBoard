"use client";
import { useEffect, useState } from "react";

import KanbanBoard from "@/components/KanbanBoard";
import Login from "@/components/Login";


export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
    else setLoggedIn(false);
  }, []);

  if (loggedIn === undefined) return null;

  return !loggedIn ? (
    <Login onLoginSuccess={() => setLoggedIn(true)} />
  ) : (
    <KanbanBoard onLogOutSuccess={() => setLoggedIn(false)} />
  );
}
