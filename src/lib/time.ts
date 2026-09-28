/** Treat naive ISO timestamps from the API as UTC. */
export function parseUtc(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  const trimmed = iso.trim();
  if (!trimmed) return null;
  const hasZone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(trimmed);
  const normalized = hasZone ? trimmed : `${trimmed}Z`;
  const d = new Date(normalized);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatLocal(iso: string | null | undefined): string {
  const d = parseUtc(iso);
  return d ? d.toLocaleString() : "—";
}

export function formatRelativeTime(iso: string | null | undefined): string {
  const d = parseUtc(iso);
  if (!d) return "—";
  const diff = (d.getTime() - Date.now()) / 1000;
  const abs = Math.abs(diff);
  const unit =
    abs < 60
      ? `${Math.round(abs)}s`
      : abs < 3600
        ? `${Math.round(abs / 60)}m`
        : abs < 86400
          ? `${Math.round(abs / 3600)}h`
          : `${Math.round(abs / 86400)}d`;
  return diff >= 0 ? `in ${unit}` : `${unit} ago`;
}
