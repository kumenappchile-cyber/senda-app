export function ProgressPills({ total, done }: { total: number; done: number }) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span>Progreso</span>
        <span>{done}/{total} · {pct}%</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-800 overflow-hidden">
        <div className="h-full bg-slate-200/70" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
