import React from 'react';
import { motion } from 'motion/react';

interface DiceVisualizerProps {
  value: number; // 1 to 6
  label?: string;
  isRolling?: boolean;
  size?: 'sm' | 'md' | 'lg';
  themeColor?: 'amber' | 'stone';
}

export const DiceVisualizer: React.FC<DiceVisualizerProps> = ({
  value,
  label,
  isRolling = false,
  size = 'md',
}) => {
  // Constrain value between 1 and 6
  const num = Math.min(6, Math.max(1, value));

  // Determine pip positions for standard die layout
  const renderPips = (n: number) => {
    const pipColor = 'bg-[#2D2A26]';
    switch (n) {
      case 1:
        return (
          <div className="flex h-full w-full items-center justify-center">
            <span className={`h-3 w-3 rounded-full ${pipColor} shadow-inner`} />
          </div>
        );
      case 2:
        return (
          <div className="flex h-full w-full flex-col justify-between p-2">
            <div className="flex justify-start">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
            <div className="flex justify-end">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex h-full w-full flex-col justify-between p-2">
            <div className="flex justify-start">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
            <div className="flex justify-center">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
            <div className="flex justify-end">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex h-full w-full flex-col justify-between p-2">
            <div className="flex justify-between">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
            <div className="flex justify-between">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex h-full w-full flex-col justify-between p-2">
            <div className="flex justify-between">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
            <div className="flex justify-center">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
            <div className="flex justify-between">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="flex h-full w-full flex-col justify-between p-2">
            <div className="flex justify-between">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
            <div className="flex justify-between">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
            <div className="flex justify-between">
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${pipColor}`} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-14 h-14 rounded-2xl',
    lg: 'w-20 h-20 rounded-2xl',
  }[size];

  return (
    <div className="flex flex-col items-center gap-1.5">
      <motion.div
        animate={
          isRolling
            ? {
                rotate: [0, -15, 20, -10, 15, 0],
                y: [0, -8, -12, -4, 0],
                scale: [1, 1.08, 0.95, 1.04, 1],
              }
            : { rotate: 0, y: 0, scale: 1 }
        }
        transition={
          isRolling
            ? { duration: 0.65, ease: 'easeInOut', repeat: Infinity }
            : { duration: 0.25 }
        }
        className={`${sizeClasses} relative border-2 border-[#4A443F] bg-white shadow-[0_4px_12px_rgba(74,68,63,0.12)] select-none transition-shadow`}
      >
        {renderPips(num)}
      </motion.div>
      {label && (
        <span className="text-[11px] font-semibold tracking-wider text-[#9A8F81] uppercase">
          {label}
        </span>
      )}
    </div>
  );
};
