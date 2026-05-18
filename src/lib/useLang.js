import { useLocation } from 'react-router-dom'
import { resolvePath } from './routes'

/** Current language derived from the URL (URL is the source of truth). */
export function useLang() {
  const { pathname } = useLocation()
  return resolvePath(pathname).lang
}

/** Current { lang, pageKey, params } derived from the URL. */
export function useRouteInfo() {
  const { pathname } = useLocation()
  return resolvePath(pathname)
}
