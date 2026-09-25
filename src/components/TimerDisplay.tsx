import { TimerMode } from '../hooks/usePomodoro';

interface TimerDisplayProps {
  timeLeft: number;
  progress: number;
  mode: TimerMode;
}

const MODE_COLORS: Record<TimerMode, string> = {
  focus: '#ef4444',
  shortBreak: '#22c55e',
  longBreak: '#3b82f6',
};

const MODE_GLOW: Record<TimerMode, string> = {
  focus: 'rgba(239, 68, 68, 0.3)',
  shortBreak: 'rgba(34, 197, 94, 0.3)',
  longBreak: 'rgba(59, 130, 246, 0.3)',
};

export default function TimerDisplay({ timeLeft, progress, mode }: TimerDisplayProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);
  const color = MODE_COLORS[mode];
  const glow = MODE_GLOW[mode];

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-20 transition-colors duration-700"
        style={{ backgroundColor: color }}
      />
      
      {/* SVG Ring */}
      <svg width="320" height="320" className="transform -rotate-90">
        {/* Background ring */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="8"
        />
        {/* Progress ring */}
        <circle
          cx="160"
          cy="160"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="timer-ring"
          style={{ filter: `drop-shadow(0 0 8px ${glow})` }}
        />
      </svg>

      {/* Time display */}
      <div className="absolute flex flex-col items-center">
        <span
          className="text-7xl font-extralight tracking-wider tabular-nums transition-colors duration-700"
          style={{ color }}
        >
          {display}
        </span>
      </div>
    </div>
  );
}
