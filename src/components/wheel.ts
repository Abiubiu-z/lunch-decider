import type { MenuItem } from '../data/menu';

const COLORS = [
  '#FF8C42',
  '#F48C06',
  '#FFBA08',
  '#E85D04',
  '#D00000',
  '#FAA307',
  '#E9C46A',
  '#F4A261',
  '#E76F51',
  '#2A9D8F',
  '#264653',
  '#6B4423',
];

export type WheelController = {
  setItems: (items: MenuItem[]) => void;
  spin: () => Promise<MenuItem | null>;
  isSpinning: () => boolean;
};

export function createWheel(canvas: HTMLCanvasElement): WheelController {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D not supported');

  let items: MenuItem[] = [];
  let rotation = 0;
  let spinning = false;
  const size = canvas.width;

  function draw() {
    if (!ctx) return;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 4;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    const n = items.length;
    if (n === 0) {
      ctx.fillStyle = '#f4d4b8';
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#6b4423';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('暂无候选', 0, 6);
      ctx.restore();
      return;
    }

    const slice = (Math.PI * 2) / n;

    for (let i = 0; i < n; i++) {
      const start = i * slice;
      const end = start + slice;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(start + slice / 2);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'right';
      const label =
        items[i].name.length > 6
          ? items[i].name.slice(0, 5) + '…'
          : items[i].name;
      ctx.fillText(label, radius - 12, 4);
      ctx.restore();
    }

    ctx.restore();

    ctx.fillStyle = '#3d2314';
    ctx.beginPath();
    ctx.moveTo(cx, 8);
    ctx.lineTo(cx - 10, 28);
    ctx.lineTo(cx + 10, 28);
    ctx.closePath();
    ctx.fill();
  }

  function setItems(newItems: MenuItem[]) {
    items = newItems;
    if (!spinning) draw();
  }

  function isSpinning() {
    return spinning;
  }

  function spin(): Promise<MenuItem | null> {
    if (spinning || items.length === 0) {
      return Promise.resolve(null);
    }

    const n = items.length;
    const winnerIndex = Math.floor(Math.random() * n);
    const slice = (Math.PI * 2) / n;
    const spins = 4 + Math.random() * 2;
    const targetAngle =
      spins * Math.PI * 2 +
      (Math.PI * 1.5 - (winnerIndex + 0.5) * slice);

    const startRotation = rotation;
    const delta = targetAngle - (startRotation % (Math.PI * 2));
    const totalDelta = delta + spins * Math.PI * 2;
    const duration = 4000;
    const startTime = performance.now();

    spinning = true;

    return new Promise((resolve) => {
      function frame(now: number) {
        const t = Math.min(1, (now - startTime) / duration);
        const ease = 1 - Math.pow(1 - t, 3);
        rotation = startRotation + totalDelta * ease;
        draw();

        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          spinning = false;
          rotation = startRotation + totalDelta;
          draw();
          resolve(items[winnerIndex] ?? null);
        }
      }
      requestAnimationFrame(frame);
    });
  }

  draw();

  return { setItems, spin, isSpinning };
}
