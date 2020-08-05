export function formatNumber(n: number | string): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatCredits(cr: number): string {
  return `${formatNumber(cr)} CR`;
}

export function formatLy(ly: number): string {
  return `${formatNumber(ly.toFixed(2))} Ly`;
}
