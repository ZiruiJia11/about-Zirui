import { useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import "./ShinyText.css";

const ShinyText = ({ text, speed = 3.5, className = "", color = "#98620a", shineColor = "#f4b63f" }) => {
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const cycle = (time % (speed * 1000)) / (speed * 1000);
    progress.set(cycle * 100);
  });

  const backgroundPosition = useTransform(progress, (value) => `${150 - value * 2}% center`);

  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, ${color} 0%, ${color} 36%, ${shineColor} 50%, ${color} 64%, ${color} 100%)`,
        backgroundPosition,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
