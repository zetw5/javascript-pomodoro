import { useState } from 'react';
import { TimerSettings } from '../hooks/usePomodoro';

interface SettingsProps {
  settings: TimerSettings;
  onUpdate: (settings: TimerSettings) => void;
  onClose: () => void;
}

export default function Settings({ settings, onUpdate, onClose }: SettingsProps) {
  const [localSettings, setLocalSettings] = useState<TimerSettings>({ ...settings });

  const handleChange = (key: keyof TimerSettings, value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1 && num <= 120) {
      setLocalSettings(prev => ({ ...prev, [key]: num }));
    }
  };

  const handleSave = () => {
    onUpdate(localSettings);
    onClose();
  };

  const inputs: { key: keyof TimerSettings; label: string; min: number; max: number }[] = [
    { key: 'focus', label: 'Focus Duration', min: 1, max: 120 },
    { key: 'shortBreak', label: 'Short Break', min: 1, max: 30 },
    { key: 'longBreak', label: 'Long Break', min: 1, max: 60 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gray-900 border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-white/90">Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {inputs.map(({ key, label, min, max }) => (
            <div key={key}>
              <label className="block text-sm text-white/50 mb-2">{label}</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={localSettings[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-lg"
                />
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 min-w-[70px]">
                  <input
                    type="number"
                    min={min}
                    max={max}
                    value={localSettings[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full bg-transparent text-white text-center text-sm outline-none tabular-nums"
                  />
                  <span className="text-white/40 text-xs ml-1">min</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-8 w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-medium
            hover:bg-white/20 transition-all duration-200 active:scale-[0.98]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
