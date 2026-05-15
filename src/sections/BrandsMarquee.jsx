import { useTranslation } from 'react-i18next'
import { BRAND_LOGO_STRIP } from '../data/brandLogos'
import Reveal from '../components/animations/Reveal'

const cellClass =
  'flex h-12 w-[min(100%,7.5rem)] shrink-0 items-center justify-center px-2 md:h-[3.25rem] md:w-[8.5rem]'

const imgClass =
  'h-7 w-auto max-w-[min(100%,6.75rem)] object-contain object-center opacity-[0.52] sepia brightness-[0.45] saturate-[0.9] transition-[opacity,filter] duration-500 ease-out group-hover:opacity-[0.92] group-hover:sepia-0 group-hover:brightness-0 motion-reduce:transition-none md:h-8 md:max-w-[min(100%,7.75rem)]'

const textFallbackClass =
  'max-w-full truncate text-center font-sans text-[0.62rem] font-medium uppercase leading-none tracking-[0.2em] text-sand-600 transition-colors duration-500 ease-out group-hover:text-crimson motion-reduce:transition-none md:text-[0.68rem] md:tracking-[0.22em]'

const linkClass =
  'group inline-flex no-underline outline-none ring-0 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-obsidian/25 focus-visible:ring-offset-2 focus-visible:ring-offset-pearl'

function BrandMark({ logo, index }) {
  const inner =
    logo.src != null && logo.src !== '' ? (
      <img
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={imgClass}
      />
    ) : (
      <span className={textFallbackClass} role="img" aria-label={logo.alt}>
        {logo.textFallback ?? ''}
      </span>
    )

  return (
    <a
      key={`${logo.id}-${index}`}
      href={logo.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={logo.linkAriaLabel}
      className={linkClass}
    >
      <span className={cellClass}>{inner}</span>
    </a>
  )
}

export default function BrandsMarquee() {
  const { t } = useTranslation()
  const doubled = [...BRAND_LOGO_STRIP, ...BRAND_LOGO_STRIP]

  return (
    <section
      className="border-y border-sand/50 bg-pearl py-20 md:py-28"
      aria-labelledby="brands-marquee-heading"
    >
      <Reveal className="container-editorial mb-12 md:mb-14">
        <p id="brands-marquee-heading" className="eyebrow flex items-center gap-3">
          <span className="hairline" />
          {t('home.brands.eyebrow')}
        </p>
      </Reveal>

      <div className="hidden motion-reduce:block">
        <div className="container-editorial flex flex-wrap items-center justify-center gap-x-8 gap-y-9 px-4 md:gap-x-12 md:gap-y-10">
          {BRAND_LOGO_STRIP.map((logo, i) => (
            <BrandMark key={`${logo.id}-static-${i}`} logo={logo} index={i} />
          ))}
        </div>
      </div>

      <div className="motion-reduce:hidden relative overflow-x-hidden marquee-mask">
        <div className="flex w-max items-center gap-x-10 md:gap-x-16 lg:gap-x-20 animate-marquee py-1">
          {doubled.map((logo, i) => (
            <BrandMark key={`${logo.id}-marquee-${i}`} logo={logo} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
