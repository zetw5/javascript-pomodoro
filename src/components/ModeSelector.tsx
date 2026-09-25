import { TimerMode } from '../hooks/usePomodoro';

interface ModeSelectorProps {
  mode: TimerMode;
  onSwitch: (mode: TimerMode) => void;
}

const MODES: { key: TimerMode; label: string }[] = [
  { key: 'focus', label: 'Focus' },
  { key: 'shortBreak', label: 'Short Break' },
  { key: 'longBreak', label: 'Long Break' },
];

const MODE_BG: Record<TimerMode, string> = {
  focus: 'bg-red-500/20 text-red-400 border-red-500/30',
  shortBreak: 'bg-green-500/20 text-green-400 border-green-500/30',
  longBreak: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export default function ModeSelector({ mode, onSwitch }: ModeSelectorProps) {
  return (
    <div className="flex gap-2">
      {MODES.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSwitch(key)}
          className={`mode-btn border ${
            mode === key ? MODE_BG[key] : 'mode-btn-inactive border-transparent'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
