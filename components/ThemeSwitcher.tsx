"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import {MoonIcon, SunIcon} from '@/icons'
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isRotated, setIsRotated] = useState(false);

  const handleButtonClick = () => {
    setIsRotated(true);
    setTheme(theme === "light" ? "dark" : "light");

    setTimeout(() => {
      setIsRotated(false);
    }, 300);
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      className="w-auto"
      style={{ transform: isRotated ? "rotate(90deg)" : "rotate(0)" }}
      onClick={handleButtonClick}
      isIconOnly
      radius="full"
      variant="flat">
      {theme === "light" ? (
        <MoonIcon
          className="text-default-500"
          icon="solar:sun-linear"
          width={40}
        />
      ) : (
        <SunIcon
          className="text-white"
          icon="solar:moon-linear"
          width={40}
        />
      )}
    </Button>
  );
}
