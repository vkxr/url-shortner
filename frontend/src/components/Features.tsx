export const Features = () => {
  const features = [
    { icon: '⚡', title: 'Lightning Fast', desc: 'Instant URL shortening' },
    { icon: '🔒', title: 'Secure', desc: 'Safe and reliable' },
    { icon: '📊', title: 'Analytics Ready', desc: 'Track your links' },
  ];

  return (
    <div className="features">
      {features.map((feature, idx) => (
        <div key={idx} className="feature-card">
          <div className="feature-icon">{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.desc}</p>
        </div>
      ))}
    </div>
  );
};