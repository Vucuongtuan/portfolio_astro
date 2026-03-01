import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./layer-background.module.scss";

interface Props {
  enableCircle?: boolean;
}

export default function LayerBackgroundClient({ enableCircle = true }: Props) {
  const container = useRef(null);

  useGSAP(
    () => {
      if (!enableCircle) return;

      const tl = gsap.timeline();

      // Intro animation
      tl.from(`.${styles["deco-circle"]}`, {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
      });

      // Mouse move parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 30;
        const y = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(`.${styles["deco-circle-1"]}`, {
          x: x,
          y: y,
          duration: 1.5,
          ease: "power2.out",
        });

        gsap.to(`.${styles["deco-circle-2"]}`, {
          x: x * -1,
          y: y * -1,
          duration: 1.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: container }
  );

  if (!enableCircle) return null;

  return (
    <div ref={container} className={styles["dynamic-layer"]}>
      <div className={`${styles["deco-circle"]} ${styles["deco-circle-1"]}`} />
      <div className={`${styles["deco-circle"]} ${styles["deco-circle-2"]}`} />
    </div>
  );
}
