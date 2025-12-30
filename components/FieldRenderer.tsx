import { Field } from "../lib/types";
import { getExerciseAnswers, setExerciseField } from "../lib/storage";
import { useEffect, useState } from "react";

export function FieldRenderer({
  exerciseId,
  field,
}: {
  exerciseId: string;
  field: Field;
}) {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    setAnswers(getExerciseAnswers(exerciseId));
  }, [exerciseId]);

  const value = answers[field.id];

  const update = (v: any) => {
    setAnswers((prev) => ({ ...prev, [field.id]: v }));
    setExerciseField(exerciseId, field.id, v);
  };

  if (field.type === "text") {
    return (
      <div className="space-y-2">
        <div className="text-sm text-slate-200">{field.label}</div>
        {field.multiline ? (
          <textarea
            className="w-full min-h-[140px] rounded-xl bg-slate-900 border border-slate-800 p-3 text-slate-100"
            placeholder={field.placeholder ?? ""}
            value={value ?? ""}
            onChange={(e) => update(e.target.value)}
          />
        ) : (
          <input
            className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-slate-100"
            placeholder={field.placeholder ?? ""}
            value={value ?? ""}
            onChange={(e) => update(e.target.value)}
          />
        )}
      </div>
    );
  }

  if (field.type === "number") {
    return (
      <div className="space-y-2">
        <div className="text-sm text-slate-200">{field.label}</div>
        <input
          type="number"
          className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-slate-100"
          placeholder={field.placeholder ?? ""}
          value={value ?? ""}
          onChange={(e) =>
            update(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-xl bg-slate-900/40 border border-slate-800 p-3">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => update(e.target.checked)}
        />
        <span className="text-sm text-slate-200">{field.label}</span>
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <div className="space-y-2">
        <div className="text-sm text-slate-200">{field.label}</div>
        <select
          className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-slate-100"
          value={value ?? ""}
          onChange={(e) => update(e.target.value)}
        >
          <option value="">Selecciona…</option>
          {field.options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "table") {
    const tableValue: Record<string, any> = value ?? {};
    return (
      <div className="space-y-2">
        <div className="text-sm text-slate-200">{field.label}</div>
        <div className="rounded-2xl border border-slate-800 overflow-hidden">
          {field.rows.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between gap-3 border-b border-slate-800 p-3 bg-slate-900/40"
            >
              <div className="text-sm text-slate-200">{r.label}</div>
              <input
                type="number"
                className="w-40 rounded-xl bg-slate-900 border border-slate-800 p-2 text-slate-100 text-right"
                value={tableValue[r.id]?.valor ?? ""}
                onChange={(e) => {
                  const next = {
                    ...tableValue,
                    [r.id]: {
                      ...(tableValue[r.id] ?? {}),
                      valor:
                        e.target.value === "" ? "" : Number(e.target.value),
                    },
                  };
                  update(next);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "values_select") {
    const selected: string[] = Array.isArray(value) ? value : [];
console.log("RENDER VALUES_SELECT OK", field.id);

    const toggle = (opt: string) => {
      const isChecked = selected.includes(opt);
      let next = [...selected];

      if (isChecked) {
        next = next.filter((v) => v !== opt);
      } else {
        if (next.length >= field.max) return;
        next.push(opt);
      }

      update(next);
    };

    return (
      <div className="space-y-3">
        <div className="text-sm text-slate-200">{field.label}</div>

        <div className="text-xs text-slate-400">
          {selected.length} / {field.max} seleccionados
        </div>

        <div className="grid grid-cols-2 gap-2">
          {field.options.map((opt) => {
            const isChecked = selected.includes(opt);
            return (
              <label
                key={opt}
                className={`flex items-center gap-2 rounded-xl border p-2 text-sm cursor-pointer ${
                  isChecked
                    ? "border-slate-400 bg-slate-800"
                    : "border-slate-800 bg-slate-900/40"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(opt)}
                />
                <span className="text-slate-100">{opt}</span>
              </label>
            );
          })}
        </div>

        <div className="text-xs text-slate-400">
          No busques los “correctos”. Elige los que hoy resuenan.
        </div>
      </div>
    );
  }

  return null;
}
