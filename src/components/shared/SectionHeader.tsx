import Link from "next/link";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  subtitle,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} ${className}`}>
      {subtitle && (
        <p className="text-brand-accent text-sm md:text-base font-bold tracking-widest uppercase mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-brand-text-secondary text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
