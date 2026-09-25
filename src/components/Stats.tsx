import { TodayStats } from '../hooks/usePomodoro';

interface StatsProps {
  stats: TodayStats;
}

export default function Stats({ stats }: StatsProps) {
  const hours = Math.floor(stats.totalFocusMinutes / 60);
  const mins = stats.totalFocusMinutes % 60;
  const focusTimeDisplay = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
      <div className="stat-card">
        <div className="text-3xl font-light text-white/90 mb-1">
          {stats.sessionsCompleted}
        </div>
        <div className="text-xs text-white/40 uppercase tracking-wider">
          Sessions
        </div>
      </div>
      <div className="stat-card">
        <div className="text-3xl font-light text-white/90 mb-1">
          {focusTimeDisplay}
        </div>
        <div className="text-xs text-white/40 uppercase tracking-wider">
          Focus Time
        </div>
      </div>
    </div>
  );
}
