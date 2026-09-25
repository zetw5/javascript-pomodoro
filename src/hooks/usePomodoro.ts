import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';

export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
  focus: number;
  shortBreak: number;
  longBreak: number;
}

export interface TodayStats {
  date: string;
  sessionsCompleted: number;
  totalFocusMinutes: number;
}

const DEFAULT_SETTINGS: TimerSettings = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
};

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

export function usePomodoro() {
  const [settings, setSettings] = useLocalStorage<TimerSettings>('pomodoro-settings', DEFAULT_SETTINGS);
  const [stats, setStats] = useLocalStorage<TodayStats>('pomodoro-stats', {
    date: getTodayKey(),
    sessionsCompleted: 0,
    totalFocusMinutes: 0,
  });

  const [mode, setMode] = useState<TimerMode>('focus');
  const [timeLeft, setTimeLeft] = useState(settings.focus * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Reset stats if it's a new day
  useEffect(() => {
    const today = getTodayKey();
    if (stats.date !== today) {
      setStats({ date: today, sessionsCompleted: 0, totalFocusMinutes: 0 });
    }
  }, [stats.date, setStats]);

  const totalTime = settings[mode] * 60;
  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const completeSession = useCallback(() => {
    clearTimer();
    setIsRunning(false);

    if (mode === 'focus') {
      setStats(prev => ({
        ...prev,
        date: getTodayKey(),
        sessionsCompleted: prev.sessionsCompleted + 1,
        totalFocusMinutes: prev.totalFocusMinutes + settings.focus,
      }));
    }

    // Play notification sound
    try {
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
      }, 300);
    } catch {
      // Audio not available
    }

    // Auto-switch mode
    if (mode === 'focus') {
      const nextMode = (stats.sessionsCompleted + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
      setMode(nextMode);
      setTimeLeft(settings[nextMode] * 60);
    } else {
      setMode('focus');
      setTimeLeft(settings.focus * 60);
    }
  }, [mode, settings, stats.sessionsCompleted, clearTimer, setStats]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearTimer();
    }

    return clearTimer;
  }, [isRunning, clearTimer, completeSession]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  
  const reset = () => {
    clearTimer();
    setIsRunning(false);
    setTimeLeft(settings[mode] * 60);
  };

  const switchMode = (newMode: TimerMode) => {
    clearTimer();
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(settings[newMode] * 60);
  };

  const updateSettings = (newSettings: TimerSettings) => {
    setSettings(newSettings);
    if (!isRunning) {
      setTimeLeft(newSettings[mode] * 60);
    }
  };

  return {
    mode,
    timeLeft,
    isRunning,
    progress,
    totalTime,
    settings,
    stats,
    showSettings,
    setShowSettings,
    start,
    pause,
    reset,
    switchMode,
    updateSettings,
  };
}
