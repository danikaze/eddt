export function formatCredits(cr: number): string {
  return `${cr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} CR`;
}
