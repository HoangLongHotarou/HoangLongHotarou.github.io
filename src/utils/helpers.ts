export function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  const first = parts[0]?.[0] ?? '';
  const last = parts[parts.length - 1]?.[0] ?? '';
  return (first + (parts.length > 1 ? last : '')).toUpperCase();
}
