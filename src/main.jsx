import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import './styles.css';

function PetalField() {
  return (
    <div className="petal-field" aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => (
        <i
          key={index}
          className="scene-petal"
          style={{
            '--x': `${(index * 17 + 5) % 106}%`,
            '--y': `${-10 - (index % 5) * 12}%`,
            '--size': `${9 + (index % 4) * 3}px`,
            '--duration': `${5.5 + (index % 4) * 1.15}s`,
            '--delay': `${index * -0.48}s`,
            '--drift': `${(index % 2) * 42 - 18}px`,
          }}
        />
      ))}
    </div>
  );
}

function CinematicScene({ phase }) {
  if (phase === 'complete') return null;

  return (
    <div className={`cinematic-scene scene-${phase}`} aria-hidden="true">
      <div className="scene-halo" />
      <div className="scene-curtain scene-curtain-left" />
      <div className="scene-curtain scene-curtain-right" />
      <div className="scene-garland scene-garland-left"><span /></div>
      <div className="scene-garland scene-garland-right"><span /></div>
      <div className="scene-emblem"><i /><i /><i /></div>
      <PetalField />
    </div>
  );
}

function InvitationApp() {
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    if (phase !== 'arrive') return undefined;
    const unveil = window.setTimeout(() => setPhase('unveil'), 650);
    const complete = window.setTimeout(() => setPhase('complete'), 4100);
    return () => {
      window.clearTimeout(unveil);
      window.clearTimeout(complete);
    };
  }, [phase]);

  const handleInvitationLoad = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('complete');
      return;
    }
    setPhase('arrive');
  };

  return (
    <main className="invitation-app" aria-label="Vatsal and Muskan wedding invitation">
      <iframe
        className="invitation-frame"
        src="/invitation.html"
        title="Vatsal and Muskan wedding invitation"
        allow="autoplay"
        onLoad={handleInvitationLoad}
      />
      <p className="creator-watermark">Made by Kunal Gugarwal</p>
      <CinematicScene phase={phase} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<InvitationApp />);
