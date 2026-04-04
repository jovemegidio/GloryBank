interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  onClick,
  hover = false,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-6 ${hover ? "cursor-pointer transition-all duration-200 hover:border-violet-500/30" : ""} ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{ background: "#141828", border: "1px solid rgba(30,35,56,0.8)" }}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`text-[15px] font-semibold text-slate-100 ${className}`}>
      {children}
    </h3>
  );
}
