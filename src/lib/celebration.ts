const COLORS = [
  '#e85d04',
  '#f48c06',
  '#ffba08',
  '#d00000',
  '#ff6b35',
  '#ffd166',
  '#06d6a0',
  '#ef476f',
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  color: string;
  size: number;
  shape: 'rect' | 'circle';
  rotation: number;
  rotSpeed: number;
};

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let rafId = 0;
let running = false;

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function ensureCanvas(): CanvasRenderingContext2D | null {
  if (prefersReducedMotion()) return null;

  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = 'fx-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    window.addEventListener('resize', resizeCanvas);
  }
  resizeCanvas();
  return ctx;
}

function resizeCanvas(): void {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function spawnBurst(
  originX: number,
  originY: number,
  count: number,
  spread = 1
): void {
  const c = ensureCanvas();
  if (!c) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const ox = originX * w;
  const oy = originY * h;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = (4 + Math.random() * 10) * spread;
    particles.push({
      x: ox,
      y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      life: 1,
      decay: 0.008 + Math.random() * 0.012,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 4 + Math.random() * 6,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.3,
    });
  }

  startLoop();
}

function spawnFirework(x: number, y: number): void {
  spawnBurst(x, y, 35, 1.2);
}

function startLoop(): void {
  if (running) return;
  running = true;
  const tick = () => {
    const c = ctx;
    if (!c || !canvas) {
      running = false;
      return;
    }

    c.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18;
      p.vx *= 0.99;
      p.life -= p.decay;
      p.rotation += p.rotSpeed;

      if (p.life <= 0) return false;

      c.save();
      c.globalAlpha = Math.max(0, p.life);
      c.translate(p.x, p.y);
      c.rotate(p.rotation);
      c.fillStyle = p.color;

      if (p.shape === 'rect') {
        c.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        c.beginPath();
        c.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        c.fill();
      }
      c.restore();
      return true;
    });

    if (particles.length > 0) {
      rafId = requestAnimationFrame(tick);
    } else {
      running = false;
      c.clearRect(0, 0, canvas.width, canvas.height);
    }
  };
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tick);
}

/** 出结果时：中心礼花 + 两侧喷射 */
export function celebrateResult(anchor?: HTMLElement): void {
  if (prefersReducedMotion()) return;

  let cx = 0.5;
  let cy = 0.45;
  if (anchor) {
    const rect = anchor.getBoundingClientRect();
    cx = (rect.left + rect.width / 2) / window.innerWidth;
    cy = (rect.top + rect.height / 3) / window.innerHeight;
  }

  spawnBurst(cx, cy, 70, 1.1);
  setTimeout(() => spawnBurst(0.15, cy + 0.05, 35, 0.9), 120);
  setTimeout(() => spawnBurst(0.85, cy + 0.05, 35, 0.9), 120);
  setTimeout(() => spawnFirework(0.3, 0.25), 280);
  setTimeout(() => spawnFirework(0.7, 0.28), 380);
  setTimeout(() => spawnFirework(0.5, 0.2), 480);

  if (navigator.vibrate) {
    navigator.vibrate([15, 40, 25]);
  }
}

/** 确认「就这个」时的小庆祝 */
export function celebrateConfirm(): void {
  if (prefersReducedMotion()) return;
  spawnBurst(0.5, 0.55, 40, 0.7);
  if (navigator.vibrate) navigator.vibrate(20);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
