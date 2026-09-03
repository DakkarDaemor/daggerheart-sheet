import { useEffect, useRef, type ChangeEvent, type ReactNode } from "react";

/* ---------------------------------------------------------------------
   PICCOLI COMPONENTI DI UI
--------------------------------------------------------------------- */
export function PipTrack({
  max,
  marked,
  onToggle,
  tone,
}: {
  max: number;
  marked: number;
  onToggle: (index: number) => void;
  tone: string;
}) {
  const pips = [];
  for (let i = 0; i < max; i++) {
    pips.push(
      <button
        key={i}
        type="button"
        onClick={() => onToggle(i)}
        aria-label={`${i + 1}/${max}`}
        className="pip"
        style={{ background: i < marked ? tone : "transparent", borderColor: tone }}
      />
    );
  }
  return <div className="pip-track">{pips}</div>;
}

export function Field({ label, children, wide }: { label: ReactNode; children: ReactNode; wide?: boolean }) {
  return (
    <label className={`field ${wide ? "field-wide" : ""}`}>
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export function Section({ title, children, accent }: { title?: ReactNode; children: ReactNode; accent?: string }) {
  return (
    <div className="section" style={accent ? { borderTopColor: accent } : undefined}>
      {title && <h3 className="section-title">{title}</h3>}
      {children}
    </div>
  );
}

// Textarea che si autoregola in altezza sul proprio contenuto — niente
// maniglia di resize manuale, cresce da sola sia digitando sia quando il
// valore cambia da fuori (caricamento personaggio/preset).
export function AutoTextarea({
  value,
  onChange,
  className,
  placeholder,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [value]);
  return (
    <textarea
      ref={ref}
      className={`autosize ${className || ""}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
