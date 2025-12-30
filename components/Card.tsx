export function Card({
  title,
  subtitle,
  children,
  href
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  href?: string;
}) {
  const Wrapper: any = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className="block rounded-2xl bg-slate-900/50 border border-slate-800 p-4 hover:bg-slate-900/70 transition"
    >
      <div className="text-lg font-semibold">{title}</div>
      {subtitle ? <div className="mt-1 text-sm text-slate-300">{subtitle}</div> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </Wrapper>
  );
}
