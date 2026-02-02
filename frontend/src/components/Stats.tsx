interface StatsProps {
  totalShortened?: number;
}

export const Stats = ({ totalShortened = 0 }: StatsProps) => {
  return (
    <div className="stats">
      <div className="stat-item">
        <div className="stat-number">{totalShortened.toLocaleString()}</div>
        <div className="stat-label">Links Created</div>
      </div>
      <div className="stat-divider"></div>
      <div className="stat-item">
        <div className="stat-number">99.9%</div>
        <div className="stat-label">Uptime</div>
      </div>
      <div className="stat-divider"></div>
      <div className="stat-item">
        <div className="stat-number">&lt;100ms</div>
        <div className="stat-label">Response Time</div>
      </div>
    </div>
  );
};