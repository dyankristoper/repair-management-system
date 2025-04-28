import { useEffect, useRef, useState } from "react";

export function useRevealSection(options = {}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          // Update state instead of manipulating classes
          setIsVisible(true);
          // Stop observing after revealing
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || "0px",
      }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    // Cleanup observer on component unmount
    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return { ref: sectionRef, isVisible };
}
