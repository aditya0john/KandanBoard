"use client";

import KandanBoard from "@/components/KandanBoard";
import LogIn from "@/components/LogIn";
import { useState } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(true);

  return !loggedIn ? <LogIn /> : <KandanBoard />;
}
