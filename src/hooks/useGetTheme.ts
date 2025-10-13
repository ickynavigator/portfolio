import { useEffect, useState } from "react";

const useGetTheme = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    document.addEventListener(
      "themechange",
      () => {
        setIsDark(document.documentElement.classList.contains("dark"));
      },
      {
        signal: abortController.signal,
      },
    );

    return () => {
      abortController.abort();
    };
  }, []);

  return isDark;
};

export default useGetTheme;
