import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

// ── Design tokens ─────────────────────────────────────────────────────────────
const BG       = "#08050F";
const PURPLE   = "#7B35D4";
const PURPLE_L = "#A855F7";
const PINK     = "#C840A0";
const WHITE    = "#FFFFFF";
const DIM      = "rgba(255,255,255,0.55)";

// ── Helpers ───────────────────────────────────────────────────────────────────
const e = (frame: number, from: number, to: number, easing = Easing.out(Easing.cubic)) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

const slideUp = (frame: number, from: number, to: number, dist = 28) =>
  interpolate(frame, [from, to], [dist, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

// ── Components ────────────────────────────────────────────────────────────────
const LogoMark: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 200 } });
  return (
    <div style={{
      position: "absolute", top: 52, left: 64,
      width: 56, height: 56,
      background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_L})`,
      borderRadius: "50%",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 0 0 2px rgba(123,53,212,0.3), 0 8px 32px rgba(123,53,212,0.5)`,
      opacity: e(frame, 15, 25),
      transform: `scale(${scale})`,
    }}>
      <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 26, fontWeight: 700, color: WHITE, lineHeight: 1 }}>P</span>
    </div>
  );
};

const LogoName: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{
    position: "absolute", top: 66, left: 134,
    opacity: e(frame, 20, 32),
    transform: `translateX(${interpolate(frame, [20, 32], [-20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
  }}>
    <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 22, fontWeight: 700, color: WHITE, letterSpacing: -0.3, lineHeight: 1 }}>
      Prisca Dezigns
    </div>
    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "3.5px", color: "rgba(168,85,247,0.85)", textTransform: "uppercase", marginTop: 3 }}>
      Creative Agency
    </div>
  </div>
);

const Badge: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{
    position: "absolute", top: 52, right: 64,
    background: "rgba(123,53,212,0.15)",
    border: "1px solid rgba(168,85,247,0.3)",
    borderRadius: 50, padding: "8px 20px",
    fontSize: 12, fontWeight: 600, letterSpacing: "2px",
    color: "rgba(168,85,247,0.9)", textTransform: "uppercase",
    opacity: e(frame, 25, 37),
  }}>
    Limited Offer
  </div>
);

const AccentLine: React.FC<{ frame: number; top?: boolean }> = ({ frame, top = true }) => (
  <div style={{
    position: "absolute",
    [top ? "top" : "bottom"]: 0, left: 0, right: 0,
    height: 3,
    background: top
      ? `linear-gradient(90deg, transparent, ${PURPLE} 30%, ${PINK} 65%, transparent)`
      : `linear-gradient(90deg, transparent, ${PINK} 30%, ${PURPLE} 65%, transparent)`,
    transform: `scaleX(${e(frame, 18, 30)})`,
    transformOrigin: top ? "left" : "right",
  }} />
);

const Eyebrow: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{
    position: "absolute", top: 200, left: 64,
    display: "flex", alignItems: "center", gap: 12,
    opacity: e(frame, 28, 40),
    transform: `translateY(${slideUp(frame, 28, 40)}px)`,
  }}>
    <div style={{ width: 8, height: 8, borderRadius: "50%", background: PINK }} />
    <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(200,64,160,0.9)" }}>
      Branding &amp; Web Design
    </div>
  </div>
);

const Headline: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ position: "absolute", top: 235, left: 64, right: 64 }}>
    {/* Line 1 */}
    <div style={{
      fontFamily: "'Playfair Display', serif", fontSize: 84, fontWeight: 900,
      color: WHITE, lineHeight: 1.0, letterSpacing: -2,
      opacity: e(frame, 35, 50),
      transform: `translateY(${slideUp(frame, 35, 50)}px)`,
    }}>Your Brand.</div>

    {/* Line 2 — gradient shimmer */}
    <div style={{
      fontFamily: "'Playfair Display', serif", fontSize: 84, fontWeight: 900,
      lineHeight: 1.0, letterSpacing: -2,
      background: `linear-gradient(90deg, ${PURPLE_L} 0%, ${PINK} 50%, ${PURPLE_L} 100%)`,
      backgroundSize: "200% auto",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      backgroundPositionX: `${interpolate(frame, [60, 149], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
      opacity: e(frame, 42, 57),
      transform: `translateY(${slideUp(frame, 42, 57)}px)`,
    }}>Elevated.</div>

    {/* Line 3 */}
    <div style={{
      fontFamily: "'Playfair Display', serif", fontSize: 84, fontWeight: 900,
      color: WHITE, lineHeight: 1.0, letterSpacing: -2,
      opacity: e(frame, 49, 64),
      transform: `translateY(${slideUp(frame, 49, 64)}px)`,
    }}>Finally.</div>
  </div>
);

const MockupCards: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{
    position: "absolute", top: 210, right: 64, width: 320,
    opacity: e(frame, 55, 75),
    transform: `translateX(${interpolate(frame, [55, 75], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px)`,
  }}>
    {[
      { label: "Brand Identity", bars: [0.9, 0.7, 0.55], stat: "100%", sub: "Custom & Unique" },
      { label: "Website Performance", bars: [0.9, 0.4], stat: "3×", sub: "More Enquiries" },
    ].map((card, i) => (
      <div key={i} style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 20, padding: 24, marginBottom: 16,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)` }} />
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(168,85,247,0.6)", marginBottom: 10 }}>{card.label}</div>
        {card.bars.map((w, j) => (
          <div key={j} style={{ height: 8, borderRadius: 4, marginBottom: 8, background: j === 0 ? `linear-gradient(90deg, ${PURPLE}, ${PURPLE_L})` : "rgba(255,255,255,0.07)", width: `${w*100}%` }} />
        ))}
        <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, background: `linear-gradient(90deg, ${PURPLE_L}, ${PINK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{card.stat}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{card.sub}</span>
        </div>
      </div>
    ))}
  </div>
);

const Divider: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{
    position: "absolute", top: 545, left: 64,
    height: 2,
    width: `${e(frame, 65, 82) * 360}px`,
    background: `linear-gradient(90deg, ${PURPLE}, ${PINK}, transparent)`,
  }} />
);

const SubCopy: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{
    position: "absolute", top: 570, left: 64, right: 64,
    fontSize: 19, fontWeight: 400, color: "rgba(255,255,255,0.6)", lineHeight: 1.65,
    opacity: e(frame, 75, 90),
    transform: `translateY(${slideUp(frame, 75, 90)}px)`,
  }}>
    We build <strong style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>websites, logos &amp; brand identities</strong> that turn visitors<br />
    into paying clients — fast, polished, and built to convert.
  </div>
);

const Pills: React.FC<{ frame: number }> = ({ frame }) => {
  const pills = ["• Web Design", "• Logo & Branding", "• Social Media", "• Brand Strategy", "• Digital Products"];
  return (
    <div style={{ position: "absolute", top: 715, left: 64, display: "flex", gap: 12, flexWrap: "wrap" }}>
      {pills.map((p, i) => (
        <div key={i} style={{
          background: "rgba(123,53,212,0.12)",
          border: "1px solid rgba(123,53,212,0.3)",
          borderRadius: 50, padding: "10px 20px",
          fontSize: 13, fontWeight: 600, letterSpacing: "0.5px",
          color: "rgba(200,160,255,0.9)",
          opacity: e(frame, 85 + i * 4, 98 + i * 4),
          transform: `translateY(${slideUp(frame, 85 + i * 4, 98 + i * 4)}px)`,
        }}>{p}</div>
      ))}
    </div>
  );
};

const CTA: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{
    position: "absolute", bottom: 120, left: 64, right: 64,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    opacity: e(frame, 100, 118),
    transform: `translateY(${slideUp(frame, 100, 118)}px)`,
  }}>
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 12,
      background: `linear-gradient(135deg, ${PURPLE}, ${PURPLE_L}, ${PINK})`,
      backgroundSize: "200% auto",
      backgroundPositionX: `${interpolate(frame, [118, 149], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
      color: WHITE, fontSize: 17, fontWeight: 700,
      padding: "20px 44px", borderRadius: 100,
      boxShadow: `0 8px 40px rgba(123,53,212,0.55), 0 2px 8px rgba(0,0,0,0.3)`,
      textTransform: "uppercase", letterSpacing: "1.5px",
    }}>
      Get Your Free Quote →
    </div>
    <div style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.4)", letterSpacing: "0.5px" }}>
      <span style={{ color: "rgba(168,85,247,0.7)" }}>priscadezigns.org</span>
    </div>
  </div>
);

const Offer: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{
    position: "absolute", bottom: 56, left: 64, right: 64,
    background: "rgba(123,53,212,0.1)",
    border: "1px solid rgba(168,85,247,0.2)",
    borderRadius: 16, padding: "16px 28px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    opacity: e(frame, 110, 128),
    transform: `translateY(${slideUp(frame, 110, 128)}px)`,
  }}>
    <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
      🎁 First 5 clients get <strong style={{ color: PURPLE_L }}>1 month free maintenance</strong> — don't miss out
    </div>
    <div style={{
      background: `linear-gradient(135deg, ${PURPLE}, ${PINK})`,
      borderRadius: 8, padding: "6px 16px",
      fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", color: WHITE, textTransform: "uppercase",
    }}>Claim Now</div>
  </div>
);

const Background: React.FC<{ frame: number }> = ({ frame }) => (
  <>
    {/* Grid */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `linear-gradient(rgba(123,53,212,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(123,53,212,0.07) 1px, transparent 1px)`,
      backgroundSize: "72px 72px",
      opacity: e(frame, 0, 12),
    }} />
    {/* Orb 1 */}
    <div style={{ position: "absolute", width: 700, height: 700, top: -180, left: -180, borderRadius: "50%", background: "radial-gradient(circle, rgba(110,40,200,0.55) 0%, transparent 70%)", filter: "blur(90px)", opacity: e(frame, 0, 14) }} />
    {/* Orb 2 */}
    <div style={{ position: "absolute", width: 550, height: 550, bottom: -120, right: -100, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,50,160,0.38) 0%, transparent 70%)", filter: "blur(90px)", opacity: e(frame, 4, 18) }} />
    {/* Orb 3 */}
    <div style={{ position: "absolute", width: 300, height: 300, top: 380, right: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(90,80,240,0.4) 0%, transparent 70%)", filter: "blur(90px)", opacity: e(frame, 8, 22) }} />
  </>
);

// ── Main composition ──────────────────────────────────────────────────────────
export const PriscaAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: "'Space Grotesk', sans-serif", overflow: "hidden" }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');`}</style>

      <Background frame={frame} />
      <AccentLine frame={frame} top={true} />
      <AccentLine frame={frame} top={false} />

      <LogoMark frame={frame} fps={fps} />
      <LogoName frame={frame} />
      <Badge frame={frame} />
      <Eyebrow frame={frame} />
      <Headline frame={frame} />
      <MockupCards frame={frame} />
      <Divider frame={frame} />
      <SubCopy frame={frame} />
      <Pills frame={frame} />
      <CTA frame={frame} />
      <Offer frame={frame} />
    </AbsoluteFill>
  );
};
