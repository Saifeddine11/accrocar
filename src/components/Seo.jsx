import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { resolvePath, fullUrl, alternatesFor, LANGUAGES, DEFAULT_LANG } from '../lib/routes'

const BASE_URL = 'https://accrocar.com'

/**
 * Seo — declarative meta + structured-data per page.
 *
 * Canonical is always emitted: explicit `url` prop takes priority,
 * otherwise it is derived from the current route (pathname only, no query).
 */
export default function Seo({
  title,
  description,
  keywords,
  image = `${BASE_URL}/bently.webp`,
  imageAlt,
  imageType = 'image/webp',
  imageWidth = '1536',
  imageHeight = '1024',
  preloadImage,
  preloadMobileImage,
  preloadImageType = 'image/webp',
  url,
  jsonLd,
}) {
  const { t } = useTranslation()
  const location = useLocation()

  const fullTitle = title
    ? `${title}${t('seo.titleSuffix')}`
    : t('seo.defaultTitle')

  // Resolve the current localized page → canonical + hreflang cluster.
  // Non-www, no trailing slash (except root).
  //
  // IMPORTANT: for mapped multilingual pages the canonical is ALWAYS derived
  // from the live route (the static `url` prop pages pass is a legacy
  // English-only value and must be ignored here, otherwise every language
  // would canonicalise to the English URL). The `url` prop is honoured only
  // for unmapped routes (standalone FR landing pages).
  const { lang, pageKey, params } = resolvePath(location.pathname)
  const isMapped = !!pageKey

  let canonicalUrl
  let alternates = null
  if (isMapped) {
    canonicalUrl = fullUrl(pageKey, lang, params)
    alternates = alternatesFor(pageKey, params)
  } else if (url) {
    canonicalUrl = url
  } else {
    const p = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '')
    canonicalUrl = `${BASE_URL}${p}`
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      <link rel="canonical" href={canonicalUrl} />

      {alternates &&
        LANGUAGES.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={alternates[l]} />
        ))}
      {alternates && (
        <link rel="alternate" hrefLang="x-default" href={alternates[DEFAULT_LANG]} />
      )}

      {preloadImage && (
        <link
          rel="preload"
          as="image"
          href={preloadImage}
          type={preloadImageType}
          media="(min-width: 768px)"
          fetchpriority="high"
        />
      )}
      {preloadMobileImage && (
        <link
          rel="preload"
          as="image"
          href={preloadMobileImage}
          type={preloadImageType}
          media="(max-width: 767px)"
          fetchpriority="high"
        />
      )}

      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
      {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}

      {(Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []).map(
        (block, i) =>
          block ? (
            <script key={i} type="application/ld+json">
              {JSON.stringify(block)}
            </script>
          ) : null,
      )}
    </Helmet>
  )
}
