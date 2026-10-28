import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  showArrow?: boolean;
};

export function PrimaryButton({ children, showArrow = true, className = "", ...props }: PrimaryButtonProps) {
  return (
    <button className={`primary ${className}`} {...props}>
      {children}
      {showArrow && <ArrowRight size={17} aria-hidden="true" />}
    </button>
  );
}
