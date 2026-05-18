import { Link } from 'react-router-dom'
import { whatsappLink } from '../../lib/whatsapp'

// ── Content block renderers ───────────────────────────────────────────────────

function Paragraph({ text }) {
  return (
    <p className="text-obsidian/80 leading-relaxed text-[15.5px] md:text-base mb-6">
      {text}
    </p>
  )
}

function Heading2({ text }) {
  return (
    <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-obsidian border-l-[3px] border-crimson pl-4 mt-14 mb-5 leading-tight">
      {text}
    </h2>
  )
}

function Heading3({ text }) {
  return (
    <h3 className="font-serif text-xl md:text-2xl tracking-tight text-obsidian mt-10 mb-4 leading-tight">
      {text}
    </h3>
  )
}

function InlineImage({ src, alt, width, height, caption }) {
  return (
    <figure className="my-10 -mx-4 md:mx-0">
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-obsidian/50 text-[12px] tracking-wide text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function Pullquote({ text }) {
  return (
    <blockquote className="my-10 bg-obsidian text-pearl p-8 md:p-10 relative">
      <span className="absolute left-8 top-6 text-sand/40 font-serif text-6xl leading-none select-none" aria-hidden="true">
        "
      </span>
      <p className="font-serif italic text-xl md:text-2xl leading-snug text-pearl/90 relative z-10 pt-4">
        {text}
      </p>
    </blockquote>
  )
}

function List({ items }) {
  return (
    <ul className="my-6 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-obsidian/80 text-[15px] leading-relaxed">
          <span className="mt-[9px] flex-shrink-0 h-px w-6 bg-sand/70" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function CtaBlock({ item }) {
  const isWhatsapp = item.href === 'whatsapp'
  const href = isWhatsapp ? whatsappLink(item.message || '') : null

  return (
    <div className="my-10 bg-sand/10 border-l-4 border-sand p-6 md:p-8 flex flex-wrap items-center gap-4">
      {isWhatsapp ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxe py-3 px-6 text-[11px]"
        >
          {item.label}
        </a>
      ) : (
        <Link
          to={item.to}
          className={
            item.variant === 'primary'
              ? 'btn-luxe py-3 px-6 text-[11px]'
              : 'link-reveal font-medium text-[13px] tracking-wide text-obsidian'
          }
        >
          {item.label}
        </Link>
      )}
    </div>
  )
}

// ── Main renderer ─────────────────────────────────────────────────────────────
export default function ArticleBody({ content }) {
  if (!content || content.length === 0) return null

  return (
    <div className="max-w-2xl mx-auto">
      {content.map((item, i) => {
        switch (item.type) {
          case 'paragraph':
            return <Paragraph key={i} text={item.text} />
          case 'h2':
            return <Heading2 key={i} text={item.text} />
          case 'h3':
            return <Heading3 key={i} text={item.text} />
          case 'image':
            return (
              <InlineImage
                key={i}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                caption={item.caption}
              />
            )
          case 'pullquote':
            return <Pullquote key={i} text={item.text} />
          case 'list':
            return <List key={i} items={item.items} />
          case 'cta':
            return <CtaBlock key={i} item={item} />
          default:
            return null
        }
      })}
    </div>
  )
}
