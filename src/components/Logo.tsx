interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'color';
  className?: string;
}

export default function Logo({ size = 48, showText = true, variant = 'color', className = '' }: LogoProps) {
  const colors = {
    navy: '#1B3A5F',
    teal: '#2AAFB5',
    orange: '#F5A623',
    cream: '#FBF3D5',
    white: '#FFFFFF',
  };

  const textColor = variant === 'light' ? colors.white : colors.navy;
  const subColor = variant === 'light' ? colors.teal : colors.teal;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Circle background */}
        <circle cx="50" cy="50" r="48" fill={variant === 'light' ? 'rgba(255,255,255,0.1)' : colors.cream} stroke={colors.teal} strokeWidth="2" />
        
        {/* Sun */}
        <circle cx="65" cy="32" r="12" fill={colors.orange} opacity="0.9" />
        
        {/* Sun rays */}
        <g stroke={colors.orange} strokeWidth="1.5" opacity="0.6">
          <line x1="65" y1="16" x2="65" y2="12" />
          <line x1="77" y1="20" x2="80" y2="17" />
          <line x1="81" y1="32" x2="85" y2="32" />
          <line x1="77" y1="44" x2="80" y2="47" />
        </g>

        {/* Palm tree trunk */}
        <path d="M 38 75 Q 40 55 42 40" stroke={colors.navy} strokeWidth="3" strokeLinecap="round" fill="none" />
        
        {/* Palm leaves */}
        <g fill={colors.teal}>
          <path d="M 42 40 Q 30 30 20 35 Q 30 38 42 40" opacity="0.9" />
          <path d="M 42 40 Q 50 25 60 28 Q 50 35 42 40" opacity="0.8" />
          <path d="M 42 40 Q 35 25 28 22 Q 33 32 42 40" opacity="0.85" />
          <path d="M 42 40 Q 55 32 62 35 Q 52 40 42 40" opacity="0.75" />
          <path d="M 42 40 Q 42 22 45 18 Q 46 30 42 40" opacity="0.8" />
        </g>

        {/* Waves */}
        <path d="M 15 72 Q 25 68 35 72 Q 45 76 55 72 Q 65 68 75 72 Q 85 76 90 72" 
              stroke={colors.teal} strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M 15 78 Q 25 74 35 78 Q 45 82 55 78 Q 65 74 75 78 Q 85 82 90 78" 
              stroke={colors.teal} strokeWidth="1.5" fill="none" opacity="0.4" />
      </svg>

      {/* Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span 
            className="font-[Pacifico] text-lg sm:text-xl"
            style={{ color: variant === 'light' ? colors.white : colors.navy }}
          >
            Zanzibar
          </span>
          <span 
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold"
            style={{ color: subColor }}
          >
            Vibe Tours
          </span>
        </div>
      )}
    </div>
  );
}
