// Single source of truth for WhatsApp deep-links (wa.me).
// Use digits only — no "+", spaces, or leading zeros.
// Example: +212 713 155 350 → 212713155350
export const WHATSAPP_NUMBER = '212713155350'
export const INSTAGRAM_URL = 'https://www.instagram.com/accro_car?igsh=cWFnZTh6NGZhb3Yx'

/**
 * @param {string} message - Raw message (will be passed through encodeURIComponent).
 */
export function whatsappLink(message = '') {
  const text = encodeURIComponent(
    message ||
      'Hello Accrocar — I would like to make a reservation in Marrakech.',
  )
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

/** Human-readable +212 … for UI (digits from {@link WHATSAPP_NUMBER}). */
export function whatsappDisplayNumber() {
  const n = String(WHATSAPP_NUMBER).replace(/\D/g, '')
  if (!n) return ''
  if (n.startsWith('212') && n.length >= 12) {
    return `+212 ${n.slice(3, 6)} ${n.slice(6, 9)} ${n.slice(9)}`
  }
  return `+${n}`
}
