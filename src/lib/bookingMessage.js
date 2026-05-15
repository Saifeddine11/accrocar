export function formatBookingDate(date, locale) {
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Inclusive calendar days from start to end (same calendar day = 1). */
export function computeInclusiveDays(from, to) {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate())
  return Math.round((b.getTime() - a.getTime()) / 86400000) + 1
}

/** @param {string} iso - YYYY-MM-DD */
export function parseISODateLocal(iso) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function todayISODateLocal() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * @param {import('i18next').i18n} i18n
 * @param {import('i18next').TFunction} t
 */
export function buildAccrocarBookingMessage(
  i18n,
  t,
  {
    carName,
    startDate,
    endDate,
    durationLabel,
    fullName,
    phoneInternational,
    phoneCc,
    phoneNationalFormatted,
    countryName,
    deliveryCityLabel,
    deliveryAddress,
    optionalMessage,
  },
) {
  const lines = [
    t('bookingWhatsapp.greeting'),
    t('bookingWhatsapp.intent', { carName }),
    '',
    t('bookingWhatsapp.detailsHeader'),
    t('bookingWhatsapp.lineFullName', { name: fullName }),
  ]

  if (
    i18n.exists('bookingWhatsapp.linePhoneSplit') &&
    phoneCc != null &&
    phoneNationalFormatted?.trim()
  ) {
    lines.push(
      t('bookingWhatsapp.linePhoneSplit', {
        cc: phoneCc,
        national: phoneNationalFormatted,
      }),
    )
  } else {
    lines.push(t('bookingWhatsapp.linePhone', { phone: phoneInternational }))
  }

  lines.push(t('bookingWhatsapp.lineCar', { carName }))

  if (i18n.exists('bookingWhatsapp.lineDateRange')) {
    lines.push(t('bookingWhatsapp.lineDateRange', { start: startDate, end: endDate }))
  } else {
    lines.push(t('bookingWhatsapp.lineStart', { date: startDate }))
    lines.push(t('bookingWhatsapp.lineEnd', { date: endDate }))
  }

  lines.push(
    t('bookingWhatsapp.lineDuration', { duration: durationLabel }),
    t('bookingWhatsapp.lineDeliveryCity', { city: deliveryCityLabel }),
    t('bookingWhatsapp.lineDeliveryAddress', { address: deliveryAddress }),
  )

  const countryLine = t('bookingWhatsapp.lineCountry', { country: countryName })
  if (countryLine) lines.push(countryLine)

  if (optionalMessage?.trim()) {
    lines.push('', t('bookingWhatsapp.optionalWithMessage', { message: optionalMessage.trim() }))
  }

  lines.push('', t('bookingWhatsapp.closing'))
  return lines.join('\n')
}
