function BackgroundEffects() {
  return (
    <>
      {/* Top Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* Right Glow */}
      <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-blue-500/20 blur-[140px]" />

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[150px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </>
  );
}

export default BackgroundEffects;