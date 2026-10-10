type BrandRuneProps = {
  size?: number;
  className?: string;
};

export default function BrandRune({ size = 28, className = '' }: BrandRuneProps) {
  return (
    <svg
      aria-hidden="true"
      className={`brand-rune ${className}`.trim()}
      height={size}
      viewBox="0 0 48 48"
      width={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="brand-rune__outer" d="M8 40V8h8l8 13 8-13h8v32" />
      <path className="brand-rune__inner" d="M16 40V25l8 10 8-10v15" />
      <path className="brand-rune__bar" d="M8 8h32" />
    </svg>
  );
}
