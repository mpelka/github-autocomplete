import { useEffect, useRef, useState } from "react";
import { GHItem } from "./types";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function useOutsideClick(reset: () => void): {
  dropdownMenuRef: React.RefObject<HTMLDivElement>;
  inputRef: React.RefObject<HTMLInputElement>;
} {
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const menuNode = dropdownMenuRef.current;
      const inputNode = inputRef.current;
      const isOutsideMenu = menuNode !== null && !menuNode.contains(event.target as any);
      const isOutsideInput = inputNode !== null && !inputNode.contains(event.target as any);

      if (isOutsideMenu && isOutsideInput) {
        reset();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return { dropdownMenuRef, inputRef };
}

export function useKeyboard(
  reset: () => void,
  results: GHItem[],
): {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
} {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        reset();
      }

      if (event.code === "ArrowDown" && results !== undefined && selectedIndex < results?.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      }

      if (event.code === "ArrowUp" && results !== undefined && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      }

      if (event.code === "Enter") {
        window.open(results?.[selectedIndex]?.html_url, "_blank", "noopener,noreferrer");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, results, reset]);

  return { selectedIndex, setSelectedIndex };
}
