export interface Point {
  x: number
  y: number
}

/**
 * Converts an ordered list of points into a smooth SVG path "d" string using a
 * uniform Catmull-Rom-to-cubic-Bezier conversion (tangent = (next - prev) / 2,
 * control-point offset = tangent / 3). The resulting curve passes through every
 * point without the visible straight-segment kinks of a polyline.
 */
export function smoothPath(points: Point[]): string {
  if (points.length === 0) return ''
  if (points.length < 3) {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
  }

  const d: string[] = [`M${points[0].x.toFixed(2)},${points[0].y.toFixed(2)}`]

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2

    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6

    d.push(
      `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`,
    )
  }

  return d.join(' ')
}
