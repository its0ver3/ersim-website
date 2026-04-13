export default function MagneticButton({
  children,
  variant = 'filled',
  className = '',
  href,
  ...props
}) {
  const base =
    variant === 'filled'
      ? 'bg-clay text-cream hover:text-cream'
      : 'border border-current text-current'

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      href={href}
      className={`magnetic-btn px-7 py-3.5 rounded-full font-heading font-semibold text-sm tracking-wide ${base} ${className}`}
      {...props}
    >
      <span className="btn-bg rounded-full bg-moss" />
      <span className="relative z-10">{children}</span>
    </Tag>
  )
}
