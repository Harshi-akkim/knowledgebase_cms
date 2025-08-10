import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
      
      {/* Geometric Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Circle */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        
        {/* Medium Circle */}
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Small Circles */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-secondary/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-success/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '6s' }} />
      </div>

      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Mobile Optimized Overlay */}
      <div className="md:hidden absolute inset-0 bg-background/80" />
    </div>
  );
};

export default BackgroundPattern;