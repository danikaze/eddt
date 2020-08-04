export function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatCredits(cr: number): string {
  return `${formatNumber(cr)} CR`;
}

export function formatLy(cr: number): string {
  return `${formatNumber(cr)} Ly`;
}
