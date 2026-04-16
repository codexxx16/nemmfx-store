'use client';
import { useEffect, useState } from 'react';
import { Download, Package, CheckCircle2, Zap } from 'lucide-react';

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

  const phaseTexts = [
    'Preparing your download...',
    'Validating file integrity...',
    'Redirecting to secure server...',
  ];

  const circumference = 2 * Math.PI * 35;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div className="download-overlay">
      <div className="download-modal glass-modal">
        <div className="download-logo">NemmFX</div>
        <div className="download-filename">{fileName}</div>
        
        {/* Modern Progress Ring with Icons */}
        <div className="download-progress-ring">
          <svg viewBox="0 0 80 80" className="w-24 h-24">
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
            {phase === 1 && <Download className="w-8 h-8 text-accent animate-bounce" />}
            {phase === 2 && <Package className="w-8 h-8 text-accent animate-spin" />}
            {phase === 3 && <CheckCircle2 className="w-8 h-8 text-success" />}
          </div>
        </div>

        <div className="download-phase-text">{phaseTexts[phase - 1]}</div>
        
        {/* Modern Progress Bar */}
        <div className="download-progress-bar">
          <div className="download-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted uppercase tracking-widest font-bold">
          <Zap className="w-3 h-3 text-accent" />
          Secure encrypted transfer
        </div>
      </div>
    </div>
  );
}
