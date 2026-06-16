"use client";

import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="border px-4 py-2 rounded" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="border px-4 py-2 rounded"
    >
      {theme === "dark" ? <span>☀️ Light</span> : <span>🌙 Dark</span>}
    </button>
  );
}
