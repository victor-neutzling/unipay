type BrandProps = { className?: string };

export function Brand({ className = "" }: BrandProps) {
  return <span className={`brand ${className}`}>unipay<span>.</span></span>;
}
