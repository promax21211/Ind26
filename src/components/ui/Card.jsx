export default function Card({ children, className = '', hover = false, as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`glass-panel ${hover ? 'transition-all duration-300 hover:border-saffron/40 hover:-translate-y-1' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
