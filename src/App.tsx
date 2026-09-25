import { useEffect } from 'react';
import { usePomodoro } from './hooks/usePomodoro';
import TimerDisplay from './components/TimerDisplay';
import ModeSelector from './components/ModeSelector';
import Controls from './components/Controls';
import Stats from './components/Stats';
import Settings from './components/Settings';

const MODE_LABELS = {
  focus: 'Focus Time',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

export default function App() {
  const {
    mode,
    timeLeft,
    isRunning,
    progress,
    settings,
    stats,
    showSettings,
    setShowSettings,
    start,
    pause,
    reset,
    switchMode,
    skip,
    updateSettings,
  } = usePomodoro();

  // Update document title with timer
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.title = isRunning
      ? `${display} — ${MODE_LABELS[mode]}`
      : 'Pomodoro Focus Timer';
  }, [timeLeft, isRunning, mode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSettings) return;
      if (e.code === 'Space') {
        e.preventDefault();
        isRunning ? pause() : start();
      } else if (e.code === 'KeyR') {
        reset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, start, pause, reset, showSettings]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.07] transition-colors duration-1000"
          style={{
            backgroundColor:
              mode === 'focus' ? '#ef4444' : mode === 'shortBreak' ? '#22c55e' : '#3b82f6',
          }}
        />
      </div>

      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between mb-10">
        <div>
          <h1 className="text-lg font-medium text-white/80">Pomodoro</h1>
          <p className="text-xs text-white/30 mt-0.5">Stay focused, stay productive</p>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 
            text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          title="Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68 1.65 1.65 0 0 0 10 3.17V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>

      {/* Mode Selector */}
      <div className="mb-10">
        <ModeSelector mode={mode} onSwitch={switchMode} />
      </div>

      {/* Timer */}
      <div className="mb-10">
        <TimerDisplay timeLeft={timeLeft} progress={progress} mode={mode} />
      </div>

      {/* Controls */}
      <div className="mb-12">
        <Controls
          isRunning={isRunning}
          onStart={start}
          onPause={pause}
          onReset={reset}
          onSkip={skip}
        />
      </div>

      {/* Stats */}
      <div className="w-full flex justify-center">
        <Stats stats={stats} />
      </div>

      {/* Keyboard hints */}
      <div className="mt-8 flex items-center gap-4 text-[10px] text-white/20">
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/30">Space</kbd>
          Play/Pause
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-white/30">R</kbd>
          Reset
        </span>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          settings={settings}
          onUpdate={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
