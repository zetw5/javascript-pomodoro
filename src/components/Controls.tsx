interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function Controls({ isRunning, onStart, onPause, onReset }: ControlsProps) {
  return (
    <div className="flex items-center gap-6">
      {/* Reset button */}
      <button
        onClick={onReset}
        className="control-btn bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
        title="Reset"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>

      {/* Play/Pause button */}
      <button
        onClick={isRunning ? onPause : onStart}
        className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200 hover:scale-105 active:scale-95"
        title={isRunning ? 'Pause' : 'Start'}
      >
        {isRunning ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        )}
      </button>

      {/* Skip button (placeholder for symmetry) */}
      <button
        onClick={onReset}
        className="control-btn bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
        title="Skip"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 4 15 12 5 20 5 4" />
          <line x1="19" y1="5" x2="19" y2="19" />
        </svg>
      </button>
    </div>
  );
}
