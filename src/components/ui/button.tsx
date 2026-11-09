import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  // fond #0066FF + blanc = 4.8:1 ; survol plus sombre (6.2:1), jamais plus clair
  primary: "bg-accent text-on-accent hover:bg-accent-hover shadow-card",
  secondary: "bg-surface text-text border border-border-strong hover:bg-raised hover:border-border-input",
};

const SIZES: Record<ButtonSize, string> = {
  md: "h-9 px-3.5 gap-2 text-base",
  lg: "h-11 px-5 gap-2 text-md",
};

type ButtonLinkProps = React.ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize };

/** Lien qui ressemble à un bouton (navigation, pas action). */
export function ButtonLink({ variant = "secondary", size = "md", className, ...rest }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "pressable inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap rounded-md font-medium",
        "[&_svg]:size-4 [&_svg]:shrink-0",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    />
  );
}
