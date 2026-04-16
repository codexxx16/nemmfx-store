'use client';
import { useEffect, useState } from 'react';

interface Props {
  mediafireUrl: string;
  fileName: string;
  onClose: () => void;
}

export default function DownloadOverlay({ mediafireUrl, fileName, onClose }: Props) {
  const [phase, setPhase] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase progression
    const t1 = setTimeout(() => setPhase(2), 1500);
    const t2 = setTimeout(() => setPhase(3), 2500);
    const t3 = setTimeout(() => {
      window.open(mediafireUrl, '_blank');
      onClose();
    }, 3000);

    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 2, 100));
    }, 60);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [mediafireUrl, onClose]);

  const phaseText = [
    'Preparing your download...',
    'Downloading...',
    'Redirecting to secure server...',
  ][phase - 1];

  const circumference = 2 * Math.PI * 35;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="download-overlay">
      <div className="download-modal glass-modal">
        <div className="download-logo">NemmFX</div>
        <div className="download-filename">{fileName}</div>
        <div className="download-progress-ring">
          <svg viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="35" className="ring-bg" />
            <circle
              cx="40"
              cy="40"
              r="35"
              className="ring-fill"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <div className="ring-icon">
            {phase === 1 && '⬇'}
            {phase === 2 && '📦'}
            {phase === 3 && '✓'}
          </div>
        </div>
        <div className="download-phase-text">{phaseText}</div>
        <div className="download-progress-bar">
          <div className="download-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
