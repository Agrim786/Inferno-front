"use client";

import { useEffect, useState } from "react";

interface AttendanceProgressProps {
  /** Attendance percentage (0–100) */
  percentage: number;
  /** Optional color for the progress ring */
  color?: string;
  /** Optional size (defaults to 160px) */
  size?: number;
}

/**
 * Circular animated progress ring that visually displays attendance percentage.
 * Smooth animation, works in dark/light themes, and reusable across dashboards.
 */
export const AttendanceProgress = ({
  percentage,
  color = "#E85B3F",
  size = 160,
}: AttendanceProgressProps) => {
  const [progress, setProgress] = useState(0);
  const radius = size / 2 - 16; // padding for stroke
  const circumference = 2 * Math.PI * radius;

  // Animate from 0 -> percentage on mount
  useEffect(() => {
    const timer = setTimeout(() => setProgress(percentage), 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="-rotate-90 transform"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          stroke="#2E2E2E"
          strokeWidth="12"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Animated progress circle */}
        <circle
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
          }}
        />
      </svg>

      {/* Center text */}
      <span
        className="absolute text-2xl font-semibold"
        style={{ color }}
      >
        {progress.toFixed(1)}%
      </span>
    </div>
  );
};
