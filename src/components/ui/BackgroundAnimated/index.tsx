const PS3Background = () => {
  return (
    <div className="fixed -z-10 inset-0 bg-background overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-[hsl(var(--background))] via-[hsl(220,20%,6%)] to-[hsl(220,25%,3%)]" />

      {/* Wave ribbons */}
      <div
        className="absolute -inset-[50%] opacity-30"
        style={{
          background: `linear-gradient(135deg, transparent 30%, hsl(var(--wave-1) / 0.6) 45%, hsl(var(--wave-1) / 0.3) 50%, transparent 65%)`,
          animation: "wave-flow-1 12s ease-in-out infinite",
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute -inset-[50%] opacity-25"
        style={{
          background: `linear-gradient(160deg, transparent 25%, hsl(var(--wave-2) / 0.5) 40%, hsl(var(--wave-2) / 0.2) 55%, transparent 70%)`,
          animation: "wave-flow-2 15s ease-in-out infinite",
          filter: "blur(80px)",
        }}
      />

      <div
        className="absolute -inset-[50%] opacity-20"
        style={{
          background: `linear-gradient(120deg, transparent 35%, hsl(var(--wave-3) / 0.5) 48%, hsl(var(--wave-3) / 0.2) 55%, transparent 68%)`,
          animation: "wave-flow-3 18s ease-in-out infinite",
          filter: "blur(100px)",
        }}
      />

      <div
        className="absolute -inset-[60%] opacity-15"
        style={{
          background: `linear-gradient(145deg, transparent 30%, hsl(var(--wave-4) / 0.4) 45%, hsl(var(--wave-4) / 0.15) 55%, transparent 65%)`,
          animation: "wave-flow-4 20s ease-in-out infinite",
          filter: "blur(90px)",
        }}
      />

      {/* Thin bright ribbons */}
      <div
        className="absolute -inset-[30%] opacity-40"
        style={{
          background: `linear-gradient(140deg, transparent 44%, hsl(var(--wave-1) / 0.8) 49%, hsl(var(--wave-2) / 0.6) 51%, transparent 56%)`,
          animation: "wave-flow-1 10s ease-in-out infinite",
          filter: "blur(20px)",
        }}
      />

      <div
        className="absolute -inset-[30%] opacity-30"
        style={{
          background: `linear-gradient(155deg, transparent 46%, hsl(var(--wave-2) / 0.7) 49.5%, hsl(var(--wave-3) / 0.5) 50.5%, transparent 54%)`,
          animation: "wave-flow-2 13s ease-in-out infinite",
          filter: "blur(15px)",
        }}
      />

      {/* Subtle particle shimmer */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 600px 200px at 30% 60%, hsl(var(--wave-1) / 0.08), transparent),
                       radial-gradient(ellipse 400px 150px at 70% 40%, hsl(var(--wave-2) / 0.06), transparent)`,
          animation: "shimmer 6s ease-in-out infinite",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--background))_100%)]" />
    </div>
  );
};

export default PS3Background;
