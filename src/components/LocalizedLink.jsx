import { Link, NavLink } from 'react-router-dom'
import { localizePath } from '../lib/routes'
import { useLang } from '../lib/useLang'

/**
 * Internal link that resolves to the correct localized + translated URL
 * for the current language.
 *
 *   <LocalizedLink page="fleet">Fleet</LocalizedLink>
 *   <LocalizedLink page="carDetail" params={{ id }}>…</LocalizedLink>
 *   <LocalizedLink page="home">Home</LocalizedLink>
 *
 * `lang` prop forces a specific language (used by single-language landing pages).
 */
export default function LocalizedLink({ page, params, lang, nav = false, children, ...rest }) {
  const current = useLang()
  const to = localizePath(page, lang || current, params)
  const Cmp = nav ? NavLink : Link
  return (
    <Cmp to={to} {...rest}>
      {children}
    </Cmp>
  )
}
