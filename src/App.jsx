import React, { useRef, useLayoutEffect, useState } from 'react';
import Lenis from 'lenis';
import {
  ExternalLink,
  Mail,
  Linkedin,
  Phone,
  FileText,
  Cpu,
  Layers,
  ShieldCheck,
  Compass,
  Zap,
  Activity,
  CheckCircle2,
  X,
  ChevronRight
} from 'lucide-react';

// Geometric Jigsaw Bezier generator
function Jr(e, t, n, r, i, l) {
  if (!i) return ` L${n.toFixed(1)} ${r.toFixed(1)}`;
  const o = n - e, s = r - t, u = Math.hypot(o, s), a = s / u, m = -o / u, h = 0.62;
  const d = (g, v) => `${(e + o * g + a * v * h * l * i).toFixed(1)} ${(t + s * g + m * v * h * l * i).toFixed(1)}`;
  return ` L${d(0.36, 0)} C${d(0.4, 0)} ${d(0.43, 0.1)} ${d(0.39, 0.17)} C${d(0.33, 0.27)} ${d(0.4, 0.36)} ${d(0.5, 0.36)} C${d(0.6, 0.36)} ${d(0.67, 0.27)} ${d(0.61, 0.17)} C${d(0.57, 0.1)} ${d(0.6, 0)} ${d(0.64, 0)} L${n.toFixed(1)} ${r.toFixed(1)}`;
}

// Procedural jigsaw tile grid generator
function sa(e, t, n, r, i) {
  const l = e / n, o = t / r, s = Math.min(l, o), u = () => Math.random() < 0.5 ? 1 : -1;
  const a = [], m = [];
  for (let d = 0; d <= r; d++) {
    a[d] = []; m[d] = [];
    for (let g = 0; g <= n; g++) {
      a[d][g] = u();
      m[d][g] = u();
    }
  }
  const h = [];
  for (let d = 0; d < r; d++) {
    for (let g = 0; g < n; g++) {
      const v = g === 0 ? -i : g * l;
      const S = g === n - 1 ? e + i : (g + 1) * l;
      const k = d === 0 ? -i : d * o;
      const f = d === r - 1 ? t + i : (d + 1) * o;
      const c = d > 0 ? -a[d][g] : 0;
      const p = d < r - 1 ? a[d + 1][g] : 0;
      const w = g > 0 ? -m[d][g] : 0;
      const E = g < n - 1 ? m[d][g + 1] : 0;
      const P = `M${v} ${k}` +
        Jr(v, k, S, k, c, s) +
        Jr(S, k, S, f, E, s) +
        Jr(S, f, v, f, p, s) +
        Jr(v, f, v, k, w, s) + " Z";
      h.push({ r: d, c: g, d: P, cx: (g + 0.5) * l, cy: (d + 0.5) * o });
    }
  }
  return h;
}

// Visual art poster configurations
const artConfig = {
  planys: {
    label: "Planys Technologies",
    n: "01",
    stat: "10+",
    size: "32cqw",
    lh: 0.85,
    caption: "engineers, technicians & validation personnel guided across vehicle trials",
    color: "#f5bfb1"
  },
  systems: {
    label: "Deep-Water HIL",
    n: "02",
    stat: "99.8%",
    size: "36cqw",
    lh: 0.82,
    caption: "system reliability across high-voltage tether, CAN, and sensor buses",
    color: "#aad5ef"
  },
  defence: {
    label: "iDEX · DISC-1",
    n: "03",
    stat: "IECEx",
    size: "28cqw",
    lh: 0.86,
    caption: "certified hazardous environment robotics & defence challenge validation",
    color: "#e4d998"
  },
  toolkit: {
    label: "Anna University",
    n: "04",
    stat: "EEE",
    size: "38cqw",
    lh: 0.82,
    caption: "B.Tech Electrical & Electronics Engineering, Tindivanam campus",
    color: "#addbbb"
  }
};

const clamp = (e) => e < 0 ? 0 : e > 1 ? 1 : e;
const easeInOutCubic = (e) => e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2;

// Layout variables
const fi = "max(5vw, calc((100% - 1400px) / 2))";
const gridCols = "repeat(auto-fit, minmax(min(100%, 460px), 1fr))";
const sectionStyle = {
  position: "relative",
  minHeight: "100vh",
  boxSizing: "border-box",
  padding: `14vh ${fi}`,
  display: "grid",
  gridTemplateColumns: gridCols,
  gap: "64px 6vw",
  alignItems: "center"
};
const colStyle = { display: "flex", flexDirection: "column", gap: 32, minWidth: 0 };
const tagStyle = { fontSize: 15, fontWeight: 500, color: "var(--accent)" };
const h2Style = {
  margin: 0,
  fontWeight: 600,
  fontSize: "clamp(44px, 5.2vw, 92px)",
  lineHeight: 0.94,
  letterSpacing: "-0.045em",
  textWrap: "balance"
};
const pillBtn = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: 52,
  borderRadius: 999,
  fontWeight: 500,
  fontSize: 15,
  textDecoration: "none",
  transition: "all 0.25s ease"
};
const primaryBtn = {
  ...pillBtn,
  padding: "0 28px",
  background: "var(--accent)",
  color: "#ffffff"
};
const secondaryBtn = {
  ...pillBtn,
  padding: "0 24px",
  border: "1px solid var(--line-strong)",
  color: "var(--ink)",
  background: "var(--surface)"
};

// Reusable Art Card component
function ArtBoard({ art, isHero, isArch, onOpenModal }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", minWidth: 0 }}>
      <div
        data-board
        style={{
          position: "relative",
          width: "min(420px, 82vw, 65vh)",
          aspectRatio: "4/5"
        }}
      >
        {isHero ? (
          <div
            data-art
            data-color="#18221e"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 24,
              overflow: "hidden",
              background: "linear-gradient(145deg, #18221e 0%, #0d1512 100%)",
              color: "#ece8df",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 60px -15px rgba(0,0,0,0.3)"
            }}
          >
            {/* High-tech Subsea Schematic Visual */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.15, pointerEvents: "none" }}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#5cdb95" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div style={{ position: "absolute", inset: 0, padding: "8cqw", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "3.6cqw", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#5cdb95" }}>
                  PLANYS SUBSEA · HIL
                </span>
                <span style={{ fontSize: "3.4cqw", padding: "4px 10px", borderRadius: 999, background: "rgba(92, 219, 149, 0.12)", color: "#5cdb95", border: "1px solid rgba(92, 219, 149, 0.25)" }}>
                  AUV / ROV
                </span>
              </div>

              {/* Central Electronics Radar / Schematic Graphic */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3cqw" }}>
                <div style={{ position: "relative", width: "42cqw", height: "42cqw", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1.5px dashed rgba(92, 219, 149, 0.35)", animation: "spin 20s linear infinite" }} />
                  <div style={{ position: "absolute", inset: "12%", borderRadius: "50%", border: "1px solid rgba(92, 219, 149, 0.2)" }} />
                  <div style={{ position: "absolute", inset: "25%", borderRadius: "50%", background: "radial-gradient(circle, rgba(27,103,76,0.5) 0%, transparent 70%)" }} />
                  <Cpu size={48} style={{ color: "#5cdb95", zIndex: 2 }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "4.8cqw", fontWeight: 600, color: "#fff" }}>STM32 &amp; ARM HIL</div>
                  <div style={{ fontSize: "3.2cqw", color: "#9ca8a2" }}>Subsystem Qualification Engine</div>
                </div>
              </div>

              {/* Bottom Specs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2cqw", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "4cqw" }}>
                <div>
                  <div style={{ fontSize: "3cqw", color: "#8a9690", textTransform: "uppercase" }}>Tether Voltage</div>
                  <div style={{ fontSize: "4.5cqw", fontWeight: 600, color: "#fff" }}>400V DC</div>
                </div>
                <div>
                  <div style={{ fontSize: "3cqw", color: "#8a9690", textTransform: "uppercase" }}>Rating</div>
                  <div style={{ fontSize: "4.5cqw", fontWeight: 600, color: "#5cdb95" }}>100m Subsea</div>
                </div>
              </div>
            </div>
          </div>
        ) : isArch ? (
          <div
            data-art
            data-color="#0a0e12"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 24,
              overflow: "hidden",
              background: "#0a0e12",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 24px 60px -15px rgba(0,0,0,0.4)"
            }}
          >
            {/* Interactive Architecture Preview Board */}
            <div style={{ position: "absolute", inset: 0, padding: "7cqw", display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#fff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "3.6cqw", color: "#64b5f6", fontWeight: 600 }}>ROV ELECTRONICS</span>
                <span style={{ fontSize: "3.2cqw", color: "#8fa3b0" }}>Architecture Stack</span>
              </div>

              {/* Subsystem Bus Graphic */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2.4cqw" }}>
                {[
                  { name: "High-Voltage Tether", spec: "400V DC → Isolated 48V/24V", color: "#f5bfb1" },
                  { name: "Main Flight Controller", spec: "STM32 Dual-Core · RTOS Telemetry", color: "#addbbb" },
                  { name: "Thruster Actuator Bus", spec: "8x VESC BLDC · CANopen Bus", color: "#aad5ef" },
                  { name: "Navigation & Safety", spec: "DVL, IMU, Depth & Leak Optical", color: "#e4d998" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "3cqw 4cqw",
                      borderRadius: 12,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "3.6cqw", fontWeight: 600, color: item.color }}>{item.name}</div>
                      <div style={{ fontSize: "2.8cqw", color: "#8fa3b0" }}>{item.spec}</div>
                    </div>
                    <ChevronRight size={16} style={{ color: "#8fa3b0" }} />
                  </div>
                ))}
              </div>

              <button
                onClick={onOpenModal}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 999,
                  background: "rgba(100, 181, 246, 0.15)",
                  border: "1px solid rgba(100, 181, 246, 0.4)",
                  color: "#64b5f6",
                  fontSize: "3.4cqw",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8
                }}
              >
                <span>Interactive Subsystem Explorer</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        ) : art ? (
          <div
            data-art
            data-color={art.color}
            style={{
              position: "absolute",
              inset: 0,
              containerType: "size",
              overflow: "hidden",
              borderRadius: 24,
              background: art.color,
              boxShadow: "0 20px 45px -10px rgba(0,0,0,0.08)"
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "8cqw",
                right: "8cqw",
                top: "8cqw",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "4.4cqw",
                fontWeight: 600,
                color: "var(--ink)"
              }}
            >
              <span>{art.label}</span>
              <span>{art.n}</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: "7cqw",
                right: "7cqw",
                bottom: "8cqw",
                display: "flex",
                flexDirection: "column",
                gap: "3.5cqw"
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: art.size,
                  lineHeight: art.lh,
                  letterSpacing: "-0.055em",
                  color: "var(--ink)"
                }}
              >
                {art.stat}
              </span>
              <span
                style={{
                  maxWidth: "68cqw",
                  fontSize: "5.2cqw",
                  lineHeight: 1.25,
                  color: "var(--ink-2)"
                }}
              >
                {art.caption}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Card component with tactile knob and lift physics
function Card({ name, meta, body, href, tags, isCompact, isKnob = true }) {
  const content = (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "6px 14px", flexWrap: "wrap" }}>
        <span style={{ fontWeight: 600, fontSize: isCompact ? 19 : 23, letterSpacing: "-0.03em", color: "var(--ink)" }}>
          {name}
        </span>
        {meta && (
          <span style={{ fontSize: 14, color: "var(--ink-3)", fontWeight: 500 }}>
            {meta}
          </span>
        )}
      </div>
      <p style={{ margin: 0, fontSize: isCompact ? 14.5 : 15.5, lineHeight: 1.55, color: "var(--ink-2)", textWrap: "pretty" }}>
        {body}
      </p>
      {tags && tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
          {tags.map((t, idx) => (
            <span
              key={idx}
              style={{
                padding: "3px 9px",
                borderRadius: 6,
                background: "var(--chip)",
                fontSize: 12.5,
                fontWeight: 500,
                color: "var(--ink-2)"
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {href && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 500, color: "var(--accent)", marginTop: 4 }}>
          <span>View Details</span>
          <ExternalLink size={13} />
        </div>
      )}
    </>
  );

  const className = ["card", isKnob && "knob", href && "lift"].filter(Boolean).join(" ");

  if (href) {
    return (
      <a data-reveal href={href} target="_blank" rel="noreferrer" className={className} style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }

  return (
    <article data-reveal className={className}>
      {content}
    </article>
  );
}

export default function App() {
  const containerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSubsystem, setActiveSubsystem] = useState("power");

  useLayoutEffect(() => {
    const rootEl = containerRef.current;
    if (!rootEl) return;

    const queryAll = (sel, el = rootEl) => Array.from(el.querySelectorAll(sel));
    const sections = queryAll("[data-sec]");

    // Check prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sections.forEach((sec) => (sec.style.background = sec.dataset.tint));
      return;
    }

    const secCount = sections.length;
    const tints = sections.map((s) => s.dataset.tint);
    const boards = sections.map((s) => s.querySelector("[data-board]"));
    const arts = boards.map((b) => b?.querySelector("[data-art]")).filter(Boolean);
    const [bg1, bg2] = queryAll("[data-bg]");
    const puzzleEl = rootEl.querySelector("[data-puzzle]");
    const cursorRing = rootEl.querySelector("[data-cursor-ring]");
    const cursorDot = rootEl.querySelector("[data-cursor-dot]");

    let destroyed = false;
    let animId = 0;
    let resizeTimer = 0;
    let idleTimer = 0;
    let initTime = 0;
    let winWidth = window.innerWidth;
    let secTops = [];
    let boardRects = [];
    let isMobile = false;

    const measureLayout = () => {
      secTops = sections.map((s) => s.getBoundingClientRect().top + window.scrollY);
      boardRects = boards.map((b) => {
        if (!b) return { x: 0, y: 0, w: 300, h: 400 };
        const rect = b.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top + window.scrollY,
          w: rect.width,
          h: rect.height
        };
      });
      isMobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    };
    measureLayout();

    // Smooth scroll with Lenis
    const lenis = new Lenis({ duration: 1.15 });

    const handleAnchor = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      const target = anchor && document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, {
          duration: 1.8,
          easing: (t) => 1 - Math.pow(1 - t, 4)
        });
      }
    };
    document.addEventListener("click", handleAnchor, true);

    // Custom precision cursor
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const mouse = { cx: -999, cy: -999, rx: window.innerWidth / 2, ry: window.innerHeight / 2, s: 1, hover: false };
    let customCursorStyle;

    if (hasFinePointer && cursorRing && cursorDot) {
      cursorRing.style.display = "";
      cursorDot.style.display = "";
      customCursorStyle = document.head.appendChild(document.createElement("style"));
      customCursorStyle.textContent = "* { cursor: none !important; }";
    }

    const onMouseMove = (e) => {
      mouse.cx = e.clientX;
      mouse.cy = e.clientY;
    };
    const onMouseOver = (e) => {
      mouse.hover = !!e.target.closest("a, button, [role=button], input, textarea");
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver);

    // Canvas Snapshots of Art Boards
    let snapshotUrls = [];
    const takeSnapshots = async () => {
      snapshotUrls.forEach((u) => URL.revokeObjectURL(u));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      snapshotUrls = await Promise.all(
        arts.map(async (artEl) => {
          const rect = artEl.getBoundingClientRect();
          const w = rect.width || 340;
          const h = rect.height || 420;
          const canvas = document.createElement("canvas");
          canvas.width = Math.round(w * dpr);
          canvas.height = Math.round(h * dpr);
          const ctx = canvas.getContext("2d");
          ctx.scale(dpr, dpr);

          const bgColor = artEl.dataset.color || "#18221e";
          ctx.fillStyle = bgColor;
          ctx.beginPath();
          ctx.roundRect(0, 0, w, h, 24);
          ctx.fill();

          // Render text content on canvas
          const walker = document.createTreeWalker(artEl, NodeFilter.SHOW_TEXT);
          const range = document.createRange();
          while (walker.nextNode()) {
            const node = walker.currentNode;
            const parent = node.parentElement;
            if (!parent) continue;
            const style = window.getComputedStyle(parent);
            ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
            ctx.fillStyle = style.color;
            ctx.textBaseline = "middle";

            for (const match of node.nodeValue.matchAll(/\S+/g)) {
              range.setStart(node, match.index);
              range.setEnd(node, match.index + match[0].length);
              const cr = range.getClientRects()[0];
              if (cr) {
                const text = style.textTransform === "uppercase" ? match[0].toUpperCase() : match[0];
                ctx.fillText(text, cr.left - rect.left, cr.top - rect.top + cr.height / 2);
              }
            }
          }

          const blob = await new Promise((res) => canvas.toBlob(res, "image/png", 0.95));
          return URL.createObjectURL(blob);
        })
      );
    };

    // Jigsaw Pieces Construction
    let pieces = [];
    let puzzleW = 0, cellW = 0, cellH = 0, pieceBoxW = 0, pieceBoxH = 0;
    let lastProgress = -1, lastSec = -1, lastIdle = -1;
    let puzzleHidden = null, lastHiddenSec = -1;

    const buildPuzzle = () => {
      if (!puzzleEl || !boardRects[0]) return;
      puzzleEl.innerHTML = "";
      const [cols, rows] = isMobile ? [4, 5] : [6, 7];
      const targetH = boardRects[0].h || 420;
      puzzleW = boardRects[0].w || 340;
      cellW = puzzleW / cols;
      cellH = targetH / rows;

      const pad = Math.ceil(Math.min(cellW, cellH) * 0.26);
      pieceBoxW = cellW + 2 * pad;
      pieceBoxH = cellH + 2 * pad;
      const randOffset = () => Math.random() - 0.5;

      pieces = sa(puzzleW, targetH, cols, rows, 0).map((piece) => {
        const wrapper = puzzleEl.appendChild(document.createElement("div"));
        wrapper.style.cssText = `position:absolute;left:0;top:0;width:${pieceBoxW}px;height:${pieceBoxH}px;will-change:transform;`;

        const pathD = piece.d.replace(
          /(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g,
          (_, x, y) => `${(+x - piece.c * cellW + pad).toFixed(1)} ${(+y - piece.r * cellH + pad).toFixed(1)}`
        );

        const face = wrapper.appendChild(document.createElement("div"));
        face.style.cssText = `position:absolute;inset:0;clip-path:path('${pathD}');-webkit-clip-path:path('${pathD}');background-repeat:no-repeat;background-size:${puzzleW}px ${targetH}px;background-position:${(pad - piece.c * cellW).toFixed(1)}px ${(pad - piece.r * cellH).toFixed(1)}px;`;

        return {
          el: wrapper,
          face,
          url: "",
          r: piece.r,
          c: piece.c,
          d: Math.random() * 0.3,
          sx: randOffset() * 2,
          sy: randOffset() * 2,
          rz: randOffset() * 140,
          rx: randOffset() * 50,
          ix: randOffset() * 2,
          iy: randOffset() * 2,
          irz: randOffset() * 220,
          idl: Math.random() * 0.35
        };
      });

      lastProgress = -1;
      puzzleHidden = null;
    };

    const togglePuzzleVisibility = (hidden, secIdx) => {
      if (hidden === puzzleHidden && secIdx === lastHiddenSec) return;
      puzzleHidden = hidden;
      lastHiddenSec = secIdx;
      if (puzzleEl) puzzleEl.style.opacity = hidden ? "0" : "1";
      arts.forEach((art, idx) => {
        art.style.visibility = !hidden && (idx === secIdx || idx === secIdx + 1) ? "hidden" : "";
      });
    };

    const updatePuzzlePhysics = (secIdx, progress, idleProg, winW, winH) => {
      const nextSec = Math.min(secIdx + 1, secCount - 1);
      const curRect = boardRects[secIdx];
      const nextRect = boardRects[nextSec];
      if (!curRect || !nextRect || !pieces.length) return;

      const scaleCur = curRect.w / puzzleW;
      const scaleNext = nextRect.w / puzzleW;

      for (const piece of pieces) {
        const X = easeInOutCubic(clamp((progress - piece.d) / 0.7));
        const startX = curRect.x + (piece.c + 0.5) * cellW * scaleCur;
        const startY = curRect.y + (piece.r + 0.5) * cellH * scaleCur;
        const endX = nextRect.x + (piece.c + 0.5) * cellW * scaleNext;
        const endY = nextRect.y + (piece.r + 0.5) * cellH * scaleNext;

        const sinArch = Math.sin(Math.PI * X);
        const idleFactor = 1 - easeInOutCubic(clamp((idleProg - piece.idl) / 0.65));

        const posX = startX + (endX - startX) * X + piece.sx * sinArch * winW * 0.2 + piece.ix * idleFactor * winW * 0.35;
        const posY = startY + (endY - startY) * X + piece.sy * sinArch * winH * 0.22 + piece.iy * idleFactor * winH * 0.45;
        const currentScale = scaleCur + (scaleNext - scaleCur) * X;

        const passedHalf = X > 0.5;
        const activeUrl = snapshotUrls[passedHalf ? nextSec : secIdx];

        if (activeUrl && piece.url !== activeUrl) {
          piece.url = activeUrl;
          piece.face.style.backgroundImage = `url(${activeUrl})`;
        }

        piece.el.style.transform = `translate3d(${(posX - pieceBoxW / 2).toFixed(1)}px,${(posY - pieceBoxH / 2).toFixed(1)}px,0) perspective(1600px) translateZ(${(sinArch * 160).toFixed(0)}px) rotateZ(${(piece.rz * sinArch + piece.irz * idleFactor).toFixed(1)}deg) rotateX(${(piece.rx * sinArch).toFixed(1)}deg) rotateY(${(180 * X).toFixed(1)}deg)${passedHalf ? " scaleX(-1)" : ""} scale(${(currentScale * (1 + 0.1 * sinArch)).toFixed(3)})`;
        piece.el.style.opacity = idleFactor > 0 ? (1 - idleFactor * 0.9).toFixed(3) : "";
      }
    };

    let activeSecIdx = -1;
    let lastBgOpacity = "";

    // Main animation loop
    const onFrame = (time) => {
      animId = requestAnimationFrame(onFrame);
      lenis.raf(time);

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const scrollY = window.scrollY;

      // Mouse ring physics
      if (hasFinePointer && cursorRing && cursorDot) {
        mouse.rx += (mouse.cx - mouse.rx) * 0.2;
        mouse.ry += (mouse.cy - mouse.ry) * 0.2;
        mouse.s += ((mouse.hover ? 1.8 : 1) - mouse.s) * 0.15;
        cursorRing.style.transform = `translate3d(${mouse.rx.toFixed(1)}px,${mouse.ry.toFixed(1)}px,0) scale(${mouse.s.toFixed(3)})`;
        cursorDot.style.transform = `translate3d(${mouse.cx}px,${mouse.cy}px,0)`;
      }

      // Calculate active section scroll progress
      const calcProgress = (idx) => clamp((winH * 0.92 - secTops[idx + 1] + scrollY) / (winH * 0.62));
      let curIdx = 0;
      while (curIdx < secCount - 1 && calcProgress(curIdx) >= 1) curIdx++;

      const progress = curIdx < secCount - 1 ? calcProgress(curIdx) : 0;
      const idleProg = initTime ? 1 - Math.pow(1 - clamp((time - initTime) / 2200), 3) : 0;

      // Background color interpolation crossfade
      if (curIdx !== activeSecIdx) {
        activeSecIdx = curIdx;
        if (bg1 && tints[curIdx]) bg1.style.background = tints[curIdx];
        if (bg2 && tints[Math.min(curIdx + 1, secCount - 1)]) bg2.style.background = tints[Math.min(curIdx + 1, secCount - 1)];
      }

      const opacityStr = easeInOutCubic(progress).toFixed(3);
      if (opacityStr !== lastBgOpacity && bg2) {
        lastBgOpacity = opacityStr;
        bg2.style.opacity = opacityStr;
      }

      if (!pieces.length) return;

      const isResting = progress <= 0.0005 && idleProg >= 0.999;
      togglePuzzleVisibility(isResting, curIdx);

      if (!(isResting || (progress === lastProgress && curIdx === lastSec && idleProg === lastIdle))) {
        lastProgress = progress;
        lastSec = curIdx;
        lastIdle = idleProg;
        updatePuzzlePhysics(curIdx, progress, idleProg, winW, winH);
      }
    };

    animId = requestAnimationFrame(onFrame);
    arts.forEach((a) => (a.style.visibility = "hidden"));

    (async () => {
      try {
        await Promise.race([document.fonts.ready, new Promise((res) => setTimeout(res, 2200))]);
        if (destroyed) return;
        measureLayout();
        await takeSnapshots();
        if (destroyed) return;
        buildPuzzle();
      } catch (err) {
        console.error("Snapshot error:", err);
        arts.forEach((a) => (a.style.visibility = ""));
      }
      initTime = performance.now() + 100;
    })();

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(async () => {
        measureLayout();
        lastProgress = -1;
        if (window.innerWidth === winWidth) return;
        winWidth = window.innerWidth;
        await takeSnapshots();
        if (!destroyed) buildPuzzle();
      }, 250);
    };

    window.addEventListener("resize", onResize);

    return () => {
      destroyed = true;
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      clearTimeout(idleTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("click", handleAnchor, true);
      lenis.destroy();
      snapshotUrls.forEach((u) => URL.revokeObjectURL(u));
      customCursorStyle?.remove();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ position: "relative", overflow: "clip" }}>
      {/* Dynamic Ambient Cross-fading Background Layers */}
      <div
        data-bg
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          willChange: "opacity"
        }}
      />
      <div
        data-bg
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          willChange: "opacity",
          opacity: 0
        }}
      />

      {/* 3D Jigsaw Puzzle Transformation Canvas Container */}
      <div
        data-puzzle
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 20,
          pointerEvents: "none",
          opacity: 0,
          willChange: "opacity"
        }}
      />

      {/* Custom Precision Cursor */}
      <div
        data-cursor-ring
        style={{
          display: "none",
          position: "fixed",
          left: 0,
          top: 0,
          width: 34,
          height: 34,
          margin: "-17px 0 0 -17px",
          border: "1.5px solid var(--ink)",
          borderRadius: "50%",
          zIndex: 300,
          pointerEvents: "none",
          transition: "transform 0.08s ease-out"
        }}
      />
      <div
        data-cursor-dot
        style={{
          display: "none",
          position: "fixed",
          left: 0,
          top: 0,
          width: 6,
          height: 6,
          margin: "-3px 0 0 -3px",
          background: "var(--ink)",
          borderRadius: "50%",
          zIndex: 301,
          pointerEvents: "none"
        }}
      />

      {/* Fixed Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          padding: `20px ${fi}`,
          pointerEvents: "none"
        }}
      >
        <a
          href="#top"
          className="brand"
          style={{
            pointerEvents: "auto",
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            textDecoration: "none",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            gap: 8
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
          <span>Jayanth S</span>
        </a>

        {/* Floating Navigation Island */}
        <nav
          className="nav"
          style={{
            pointerEvents: "auto",
            display: "flex",
            gap: 3,
            alignItems: "center",
            height: 46,
            padding: "0 6px",
            borderRadius: 999,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            boxShadow: "0 8px 24px -6px rgba(0,0,0,0.06)",
            fontSize: 14,
            fontWeight: 500
          }}
        >
          {[
            ["#experience", "Experience"],
            ["#systems", "Systems"],
            ["#projects", "Projects"],
            ["#architecture", "Architecture"],
            ["#toolkit", "Toolkit"]
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="pill"
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                textDecoration: "none",
                color: "var(--ink-2)"
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              background: "var(--accent)",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: 500
            }}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Main Content Sections */}
      <main id="top" style={{ position: "relative", zIndex: 2 }}>
        {/* HERO SECTION */}
        <section
          data-sec
          data-tint="#f6faf8"
          style={{
            ...sectionStyle,
            padding: `140px ${fi} 12vh`
          }}
        >
          <div style={{ ...colStyle, gap: 28 }}>
            <div data-reveal style={{ display: "inline-flex", alignItems: "center", gap: 8, width: "fit-content", padding: "6px 14px", borderRadius: 999, background: "rgba(27, 103, 76, 0.08)", color: "var(--accent)", fontSize: 13.5, fontWeight: 500 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />
              <span>Manager – Hardware Validation · Planys Technologies</span>
            </div>

            <h1
              data-reveal
              style={{
                margin: 0,
                fontWeight: 600,
                fontSize: "clamp(64px, 8.4vw, 150px)",
                lineHeight: 0.88,
                letterSpacing: "-0.05em",
                color: "var(--ink)"
              }}
            >
              Jayanth<br />S
            </h1>

            <p
              data-reveal
              style={{
                margin: 0,
                maxWidth: 480,
                fontSize: "clamp(18px, 1.4vw, 21px)",
                lineHeight: 1.5,
                letterSpacing: "-0.015em",
                color: "var(--ink-2)",
                textWrap: "pretty"
              }}
            >
              Hardware engineering and validation lead specializing in underwater robotics, AUV/ROV electrical systems, embedded electronics, and mission-critical hardware qualification.
            </p>

            <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#experience" style={primaryBtn}>
                Explore the work
              </a>
              <a href="/Jayanth_S_Resume.pdf" target="_blank" rel="noreferrer" style={secondaryBtn}>
                <FileText size={16} style={{ marginRight: 8 }} />
                <span>Download résumé ↗</span>
              </a>
            </div>

            <div data-reveal style={{ fontSize: 14, color: "var(--ink-3)", display: "flex", alignItems: "center", gap: 16 }}>
              <span>📍 Chennai, India</span>
              <span>•</span>
              <span>B.Tech EEE, Anna University</span>
            </div>
          </div>

          <ArtBoard isHero />
        </section>

        {/* 01 · EXPERIENCE */}
        <section
          id="experience"
          data-sec
          data-tint="#fef0ec"
          style={sectionStyle}
        >
          <ArtBoard art={artConfig.planys} />
          <div style={colStyle}>
            <div data-reveal style={tagStyle}>01 · Leadership &amp; Validation</div>
            <h2 data-reveal style={h2Style}>Tested for the deep abyss.</h2>
            <p data-reveal style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: "var(--ink-2)", textWrap: "pretty" }}>
              Leading hardware validation activities for cutting-edge underwater robotic platforms. Coordinating validation priorities, test execution, and engineering readiness across multi-disciplinary teams.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingRight: 8 }}>
              <Card
                name="Planys Technologies"
                meta="Manager – Hardware Validation · 2026 – Present"
                body="Lead hardware qualification for underwater ROV & AUV platforms. Manage and guide a cross-functional validation team of 10+ personnel (engineers, technicians, interns). Oversee system-level debugging, root-cause analysis, and closure of action items ahead of field trials."
                tags={["Validation Leadership", "HIL Testing", "Team Coordination", "Field Readiness"]}
              />
              <Card
                name="Planys Technologies"
                meta="Senior Engineer · 2025 to 2026"
                body="Led multi-board PCB and subsystem integration involving ARM/STM32 controllers, IMUs, pressure sensors, GPS, RF modems, and telemetry links. Resolved EMC, grounding, and power-rail instability issues in high-current underwater vehicles."
                tags={["STM32", "Signal Integrity", "EMC / EMI", "Tether Telemetry"]}
              />
              <Card
                name="Planys Technologies"
                meta="Assistant Engineer &amp; Intern · 2023 to 2025"
                body="Designed power distribution systems, high-voltage modules, and embedded control units. Firmware development for AVR and ARM microcontrollers (C/C++). Authored validation documentation and IECEx safety compliance reports."
                tags={["Power Distribution", "C / C++", "Battery Packs & BMS", "IECEx"]}
              />
            </div>
          </div>
        </section>

        {/* 02 · SYSTEMS & FIELD QUALIFICATION */}
        <section
          id="systems"
          data-sec
          data-tint="#eaf6fd"
          style={sectionStyle}
        >
          <div style={colStyle}>
            <div data-reveal style={tagStyle}>02 · Systems &amp; Field Trials</div>
            <h2 data-reveal style={h2Style}>Robotics built to endure.</h2>
            <p data-reveal style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: "var(--ink-2)", textWrap: "pretty" }}>
              Bridging the gap between laboratory bench designs and real-world offshore conditions. Rigorous testing protocols ensure uninterrupted power, deterministic telemetry, and structural integrity.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 18, paddingRight: 8 }}>
              <Card
                name="Hardware-in-the-Loop (HIL) Testing"
                meta="Validation Platform"
                body="Engineered custom HIL test rigs for vehicle controllers to simulate sensor faults, load transients, thruster stalls, and communication dropouts before underwater pool testing."
                tags={["HIL Simulation", "Fault Injection", "Thermal Stress", "Load Testing"]}
              />
              <Card
                name="High-Voltage Tether Distribution"
                meta="Power Systems"
                body="Calculated tether wire gauge, thermal dissipation, and voltage drops for 400V DC surface-to-vehicle power delivery with isolated high-efficiency DC-DC step-down converters."
                tags={["400V DC", "Galvanic Isolation", "DC-DC Converters", "Voltage-Drop Math"]}
              />
              <Card
                name="Telemetry &amp; Sensor Interfaces"
                meta="Data Acquisition"
                body="Integrated dual IMUs, high-precision Keller depth/pressure sensors, DVL (Doppler Velocity Log), and optical leak detectors over isolated CAN bus and RS-485 interfaces."
                tags={["CAN Bus", "RS-485", "Sensors & DVL", "Optical Leak Sensors"]}
              />
            </div>
          </div>
          <ArtBoard art={artConfig.systems} />
        </section>

        {/* 03 · SELECTED PROJECTS */}
        <section
          id="projects"
          data-sec
          data-tint="#f6f4e8"
          style={sectionStyle}
        >
          <ArtBoard art={artConfig.defence} />
          <div style={colStyle}>
            <div data-reveal style={tagStyle}>03 · Featured Engineering Projects</div>
            <h2 data-reveal style={h2Style}>Engineered, tested, deployed.</h2>
            <p data-reveal style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: "var(--ink-2)", textWrap: "pretty" }}>
              High-impact defence robotics, hazardous environment platforms, and marine autonomous monitoring vessels.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingRight: 8 }}>
              <Card
                name="iDEX – DISC-1 Defence Robotics"
                meta="Defence Challenge"
                body="Contributed to defence robotics development activities, including system performance validation, ruggedisation, field testing, and electrical interface qualification under stringent operational requirements."
                tags={["Defence Robotics", "Ruggedisation", "Field Trials", "System Debugging"]}
              />
              <Card
                name="IECEx Tank Inspection Robot"
                meta="Hazardous Environments"
                body="Supported hardware validation and subsystem integration for a tethered inspection robot designed for explosive oil/gas storage tanks. Handled high-voltage safety interlocks, sealing certification, and tether drop math."
                tags={["IECEx Certified", "Explosion Proof", "High Voltage Safety", "Tank Inspection"]}
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 16 }}>
                <Card
                  isCompact
                  isKnob={false}
                  name="Waveglider USV"
                  meta="Marine Platform"
                  body="Marine monitoring platform integration: RF communication, solar power harvesting, marine-grade electrical sealing, and telemetry testing."
                  tags={["USV", "Solar", "RF Modem"]}
                />
                <Card
                  isCompact
                  isKnob={false}
                  name="Smart BMS & Battery Packs"
                  meta="Energy Storage"
                  body="Li-ion & LiFePO4 battery pack qualification: cell balancing, thermal cutoff interlocks, and state-of-health telemetry."
                  tags={["LiFePO4", "BMS", "Safety"]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 04 · HARDWARE ARCHITECTURE SPOTLIGHT */}
        <section
          id="architecture"
          data-sec
          data-tint="#0a0e12"
          style={{
            ...sectionStyle,
            alignItems: "start"
          }}
        >
          <div style={{ ...colStyle, color: "#fff" }}>
            <div data-reveal style={{ ...tagStyle, color: "#64b5f6" }}>
              Deep Dive · Hardware Architecture
            </div>
            <h2 data-reveal style={{ ...h2Style, color: "#ffffff" }}>
              Subsea vehicle electronics stack.
            </h2>
            <p data-reveal style={{ margin: 0, maxWidth: 520, fontSize: 17.5, lineHeight: 1.55, color: "#9ca8a2", textWrap: "pretty" }}>
              An inside look into the complete hardware and power architecture powering an industrial underwater ROV/AUV—from the 400V surface umbilical down to real-time CANopen motor telemetry.
            </p>

            <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["STM32 & ARM Microcontrollers", "400V DC Tether Transmission", "Isolated DC-DC Buck Modules", "CAN & RS-485 Industrial Buses", "DVL, IMU & Depth Telemetry", "Fail-safe Optical Leak Detection"].map((spec, i) => (
                <span
                  key={i}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 8,
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: "#ece8df"
                  }}
                >
                  {spec}
                </span>
              ))}
            </div>

            <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  ...primaryBtn,
                  background: "#64b5f6",
                  color: "#0a0e12",
                  cursor: "pointer",
                  border: "none",
                  fontWeight: 600
                }}
              >
                <span>Launch Architecture Explorer →</span>
              </button>
            </div>
          </div>

          <ArtBoard isArch onOpenModal={() => setModalOpen(true)} />
        </section>

        {/* 05 · TOOLKIT & EDUCATION */}
        <section
          id="toolkit"
          data-sec
          data-tint="#ecf7ef"
          style={sectionStyle}
        >
          <div style={colStyle}>
            <div data-reveal style={tagStyle}>05 · Engineering Toolkit</div>
            <h2 data-reveal style={h2Style}>The stack behind it.</h2>
            <p data-reveal style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: "var(--ink-2)", textWrap: "pretty" }}>
              Disciplined engineering methods honed through rigorous lab qualification, HIL simulation, and offshore trial deployments.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 16, paddingRight: 8 }}>
              <div data-reveal className="card" style={{ gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 20, letterSpacing: "-0.03em", color: "var(--ink)" }}>Hardware &amp; HIL</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-2)" }}>
                  Hardware validation, system integration, HIL testing, root-cause analysis, thermal stress, EMC &amp; grounding, reliability testing.
                </span>
              </div>
              <div data-reveal className="card" style={{ gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 20, letterSpacing: "-0.03em", color: "var(--ink)" }}>Embedded &amp; MCU</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-2)" }}>
                  STM32, ARM Cortex, AVR, Arduino, Teensy 4.1, SAMD21, C, C++, Python, RTOS multitasking.
                </span>
              </div>
              <div data-reveal className="card" style={{ gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 20, letterSpacing: "-0.03em", color: "var(--ink)" }}>Power &amp; BMS</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-2)" }}>
                  High-voltage power distribution, Li-ion &amp; LiFePO4 packs, BMS protection, tether voltage-drop calculations, isolated DC-DC.
                </span>
              </div>
              <div data-reveal className="card" style={{ gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 20, letterSpacing: "-0.03em", color: "var(--ink)" }}>Protocols &amp; Sensors</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-2)" }}>
                  UART, CAN, SPI, I2C, RS-485, RS-232, Ethernet, IMUs, Keller depth sensors, DVL, optical leak detection.
                </span>
              </div>
              <div data-reveal className="card" style={{ gridColumn: "1 / -1", gap: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 20, letterSpacing: "-0.03em", color: "var(--ink)" }}>Lab Tools &amp; Qualification</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-2)" }}>
                  DSO (Digital Storage Oscilloscopes), LCR meters, Bench power supplies, Multimeters, EAGLE PCB design, BOM management, IECEx documentation.
                </span>
              </div>
            </div>

            <p data-reveal style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "var(--ink-2)", textWrap: "pretty" }}>
              B.Tech in Electrical and Electronics Engineering, University College of Engineering Tindivanam, Anna University, Chennai (2023).
            </p>
          </div>
          <ArtBoard art={artConfig.toolkit} />
        </section>

        {/* 06 · CONTACT */}
        <section
          id="contact"
          data-sec
          data-tint="#f6faf8"
          style={{
            position: "relative",
            minHeight: "100vh",
            boxSizing: "border-box",
            padding: `14vh ${fi} 36px`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "8vh"
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: "64px 6vw", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "center", minWidth: 0 }}>
              <div
                style={{
                  position: "relative",
                  width: "min(380px, 80vw, 55vh)",
                  aspectRatio: "1",
                  borderRadius: "50%",
                  border: "2px dashed var(--line-strong)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "radial-gradient(circle, rgba(27,103,76,0.06) 0%, transparent 70%)"
                }}
              >
                <div style={{ textAlign: "center", padding: 24 }}>
                  <Mail size={44} style={{ color: "var(--accent)", margin: "0 auto 16px" }} />
                  <div style={{ fontWeight: 600, fontSize: 22, color: "var(--ink)", letterSpacing: "-0.03em" }}>Let's collaborate</div>
                  <div style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 6 }}>Ready for challenging robotics &amp; hardware validation initiatives</div>
                </div>
              </div>
            </div>

            <div style={{ ...colStyle, gap: 28 }}>
              <div data-reveal style={tagStyle}>06 · Contact</div>
              <h2 data-reveal style={h2Style}>The last piece is you.</h2>
              <p data-reveal style={{ margin: 0, maxWidth: 460, fontSize: 18, lineHeight: 1.5, color: "var(--ink-2)", textWrap: "pretty" }}>
                Have an engineering opportunity, a robotics initiative, or hardware validation project you want to build together? I would love to connect.
              </p>

              <div data-reveal style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a
                  href="mailto:jayanthyadhvu123@gmail.com"
                  style={{
                    ...primaryBtn,
                    gap: 10,
                    padding: "0 26px"
                  }}
                >
                  <Mail size={16} />
                  <span>jayanthyadhvu123@gmail.com</span>
                </a>
                <a
                  href="https://linkedin.com/in/jayanth-s-0a23721a5"
                  target="_blank"
                  rel="noreferrer"
                  style={secondaryBtn}
                >
                  <Linkedin size={16} style={{ marginRight: 8 }} />
                  <span>LinkedIn ↗</span>
                </a>
                <a
                  href="tel:+916369143850"
                  style={secondaryBtn}
                >
                  <Phone size={16} style={{ marginRight: 8 }} />
                  <span>+91 6369143850</span>
                </a>
              </div>

              <div data-reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-3)", flexBasis: "100%" }}>
                  Direct Documentation
                </span>
                <a
                  href="/Jayanth_S_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    ...secondaryBtn,
                    height: 44,
                    padding: "0 20px",
                    fontSize: 14
                  }}
                >
                  <FileText size={15} style={{ marginRight: 8 }} />
                  <span>Download Complete ATS Résumé ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              borderTop: "1px solid var(--line)",
              paddingTop: 24,
              fontSize: 14,
              color: "var(--ink-3)"
            }}
          >
            <span>© 2026 Jayanth S · Hardware Engineering &amp; Validation</span>
            <div style={{ display: "flex", gap: 20 }}>
              <a href="#top" style={{ color: "var(--ink)", textDecoration: "none", fontWeight: 500 }}>
                ↑ Back to top
              </a>
              <a href="/Jayanth_S_Resume.pdf" target="_blank" rel="noreferrer" style={{ color: "var(--ink)", textDecoration: "none" }}>
                Résumé PDF ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Subsystem Architecture Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 400,
            background: "rgba(10, 14, 18, 0.85)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px"
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 960,
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#0d1318",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 24,
              padding: "36px",
              color: "#ece8df",
              boxShadow: "0 30px 80px rgba(0,0,0,0.6)"
            }}
          >
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
              style={{
                position: "absolute",
                top: 24,
                right: 24,
                background: "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ece8df",
                cursor: "pointer"
              }}
            >
              <X size={20} />
            </button>

            <div style={{ marginBottom: 28 }}>
              <span style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64b5f6", fontWeight: 600 }}>
                Interactive Deep Dive
              </span>
              <h2 style={{ fontSize: 32, fontWeight: 600, margin: "6px 0 10px", color: "#fff" }}>
                Underwater ROV/AUV Electronics Stack
              </h2>
              <p style={{ margin: 0, fontSize: 15.5, color: "#9ca8a2", maxWidth: 680 }}>
                Explore the hardware subsystems, power distribution, communication buses, and validation protocols designed for mission-critical subsea environments.
              </p>
            </div>

            {/* Subsystem tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {[
                { id: "power", label: "Power & Tether (400V)", icon: Zap },
                { id: "controller", label: "STM32 Controller & RTOS", icon: Cpu },
                { id: "thrusters", label: "Thruster CAN Bus (VESC)", icon: Activity },
                { id: "sensors", label: "Sensors & Telemetry", icon: Compass },
                { id: "safety", label: "Safety & IECEx Protection", icon: ShieldCheck }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeSubsystem === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubsystem(tab.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 18px",
                      borderRadius: 12,
                      background: active ? "#64b5f6" : "rgba(255,255,255,0.05)",
                      color: active ? "#0a0e12" : "#ece8df",
                      border: active ? "1px solid #64b5f6" : "1px solid rgba(255,255,255,0.1)",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Subsystem Details */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16,
                padding: "28px"
              }}
            >
              {activeSubsystem === "power" && (
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: "#64b5f6", margin: "0 0 12px" }}>
                    High-Voltage Tether Distribution &amp; Isolated Step-Down
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "#b0bec5", margin: "0 0 16px" }}>
                    To transmit sufficient electrical energy over 100m+ tethers without debilitating wire resistive loss, surface voltage is stepped up to <strong>400V DC</strong>. Inside the submersible enclosure, high-efficiency synchronous DC-DC buck regulators convert the line down to galvanic-isolated working rails.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                    <div style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontSize: 13, color: "#8fa3b0" }}>Primary Tether Transmission</div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginTop: 4 }}>400V DC</div>
                    </div>
                    <div style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontSize: 13, color: "#8fa3b0" }}>Thruster Power Bus</div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: "#5cdb95", marginTop: 4 }}>48V / 60A Isolated</div>
                    </div>
                    <div style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontSize: 13, color: "#8fa3b0" }}>Logic &amp; Sensors</div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: "#ffd54f", marginTop: 4 }}>24V, 5V &amp; 3.3V Rails</div>
                    </div>
                  </div>
                </div>
              )}

              {activeSubsystem === "controller" && (
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: "#64b5f6", margin: "0 0 12px" }}>
                    STM32 / ARM Cortex Real-Time Embedded Controller
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "#b0bec5", margin: "0 0 16px" }}>
                    The central command module runs on an ARM Cortex controller executing real-time tasks under deterministic RTOS scheduling. It processes telemetry, executes orientation/depth control loops, arbitrates motor setpoints, and enforces hardware failsafes.
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5 }}>
                      <CheckCircle2 size={16} style={{ color: "#5cdb95" }} />
                      <span>Dedicated Hardware Watchdog with sub-millisecond heartbeat monitor</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5 }}>
                      <CheckCircle2 size={16} style={{ color: "#5cdb95" }} />
                      <span>Dual-channel isolated CAN 2.0B transceivers for motor and payload buses</span>
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5 }}>
                      <CheckCircle2 size={16} style={{ color: "#5cdb95" }} />
                      <span>Hardware-in-the-Loop (HIL) automated test harness with fault injection</span>
                    </li>
                  </ul>
                </div>
              )}

              {activeSubsystem === "thrusters" && (
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: "#64b5f6", margin: "0 0 12px" }}>
                    Brushless DC (BLDC) Thruster Bus &amp; VESC Telemetry
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "#b0bec5", margin: "0 0 16px" }}>
                    6 to 8 subsea brushless thrusters deliver 6-DOF vector positioning. Each motor is driven by a custom-tuned VESC/FOC electronic speed controller networked over an isolated CAN bus, streaming real-time RPM, current draw, voltage, and MOSFET thermal telemetry.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                    <div style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontSize: 13, color: "#8fa3b0" }}>Thruster Configuration</div>
                      <div style={{ fontSize: 17, fontWeight: 600, color: "#fff", marginTop: 4 }}>8-Thruster Vectored</div>
                    </div>
                    <div style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontSize: 13, color: "#8fa3b0" }}>Telemetry Rate</div>
                      <div style={{ fontSize: 17, fontWeight: 600, color: "#5cdb95", marginTop: 4 }}>50Hz per Controller</div>
                    </div>
                  </div>
                </div>
              )}

              {activeSubsystem === "sensors" && (
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: "#64b5f6", margin: "0 0 12px" }}>
                    Precision Marine Sensors &amp; Subsea Telemetry
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "#b0bec5", margin: "0 0 16px" }}>
                    Subsea navigation relies on redundant sensor fusion: high-grade 9-DOF IMU, Keller piezoresistive pressure transducer (for millimeter-accurate depth readings), Doppler Velocity Log (DVL) for dead-reckoning bottom tracking, and RF/GPS modems for surface operations.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Keller 30bar Depth Sensor", "9-DOF Precision IMU", "Doppler Velocity Log (DVL)", "RS-485 Optical Multiplexer", "GPS / Telemetry Modems"].map((s, idx) => (
                      <span key={idx} style={{ padding: "6px 12px", borderRadius: 8, background: "rgba(100,181,246,0.12)", color: "#90caf9", fontSize: 13, fontWeight: 500 }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeSubsystem === "safety" && (
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 600, color: "#64b5f6", margin: "0 0 12px" }}>
                    Hazardous Environment (IECEx) Safety &amp; Failsafes
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "#b0bec5", margin: "0 0 16px" }}>
                    Designed for certified deployments in explosive oil/gas storage tanks and hazardous inspection environments. Galvanic optical barriers prevent dangerous ground loops or ignition sparks, paired with optical internal leak sensors triggering automated surface emergency ascent.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontSize: 13, color: "#8fa3b0" }}>Leak Response Time</div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: "#ef5350", marginTop: 4 }}>&lt; 50ms Emergency Cutoff</div>
                    </div>
                    <div style={{ padding: 14, borderRadius: 10, background: "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontSize: 13, color: "#8fa3b0" }}>Compliance Standard</div>
                      <div style={{ fontSize: 18, fontWeight: 600, color: "#ffd54f", marginTop: 4 }}>IECEx Zone 1/2 Certified</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  ...secondaryBtn,
                  background: "rgba(255,255,255,0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  cursor: "pointer"
                }}
              >
                Close Explorer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
