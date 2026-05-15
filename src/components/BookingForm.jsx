import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { parsePhoneNumberFromString } from 'libphonenumber-js/min'

import 'react-phone-number-input/style.css'

import { guessDefaultCountry } from '../lib/guessDefaultCountry'
import { DELIVERY_CITY_VALUES } from '../lib/deliveryCities'
import {
  buildAccrocarBookingMessage,
  computeInclusiveDays,
  formatBookingDate,
  parseISODateLocal,
  todayISODateLocal,
} from '../lib/bookingMessage'
import { whatsappLink } from '../lib/whatsapp'

const ease = [0.16, 1, 0.3, 1]

/**
 * @param {{ brand: string, model: string }} car
 */
export default function BookingForm({ car }) {
  const { t, i18n } = useTranslation()
  const carName = `${car.brand} ${car.model}`

  const todayIso = useMemo(() => todayISODateLocal(), [])

  const [startDateIso, setStartDateIso] = useState('')
  const [endDateIso, setEndDateIso] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState(() => guessDefaultCountry())
  const [optionalMessage, setOptionalMessage] = useState('')
  const [deliveryCity, setDeliveryCity] = useState('')
  const [deliveryCityOther, setDeliveryCityOther] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [errors, setErrors] = useState({})

  const startDateObj = useMemo(() => parseISODateLocal(startDateIso), [startDateIso])
  const endDateObj = useMemo(() => parseISODateLocal(endDateIso), [endDateIso])

  const minEndIso = startDateIso || todayIso

  const durationDays = useMemo(() => {
    if (!startDateObj || !endDateObj) return null
    const n = computeInclusiveDays(startDateObj, endDateObj)
    return n >= 1 ? n : null
  }, [startDateObj, endDateObj])

  const durationLabel =
    durationDays == null
      ? null
      : durationDays === 1
        ? t('booking.durationOneDay')
        : t('booking.durationDays', { count: durationDays })

  const onStartChange = (e) => {
    const v = e.target.value
    setStartDateIso(v)
    if (endDateIso && v && endDateIso < v) setEndDateIso('')
  }

  const validate = () => {
    const next = {}
    if (!startDateIso || !startDateObj) {
      next.startDate = t('booking.errorStartDate')
    }
    if (!endDateIso || !endDateObj) {
      next.endDate = t('booking.errorEndDate')
    } else if (
      startDateObj &&
      endDateObj &&
      endDateObj.getTime() < startDateObj.getTime()
    ) {
      next.endBeforeStart = t('booking.errorEndBeforeStart')
    }
    if (!fullName.trim()) next.fullName = t('booking.errorFullName')
    if (!phone || !isValidPhoneNumber(phone)) {
      next.phone = t('booking.errorPhone')
    }
    if (!deliveryCity) {
      next.deliveryCity = t('booking.errorDeliveryCity')
    } else if (deliveryCity === 'other' && !deliveryCityOther.trim()) {
      next.deliveryCityOther = t('booking.errorDeliveryCityOther')
    }
    if (!deliveryAddress.trim()) {
      next.deliveryAddress = t('booking.errorDeliveryAddress')
    }
    return next
  }

  const resolvedDeliveryCityLabel =
    deliveryCity === 'other'
      ? deliveryCityOther.trim()
      : deliveryCity
        ? t(`booking.deliveryCities.${deliveryCity}`)
        : ''

  const onSubmit = (e) => {
    e.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const startStr = formatBookingDate(startDateObj, i18n.language)
    const endStr = formatBookingDate(endDateObj, i18n.language)
    const days = computeInclusiveDays(startDateObj, endDateObj)
    const dur =
      days === 1 ? t('booking.durationOneDay') : t('booking.durationDays', { count: days })

    const parsed = parsePhoneNumberFromString(phone)
    const phoneDisplay = parsed ? parsed.formatInternational() : phone
    const phoneCc = parsed?.countryCallingCode
    const phoneNationalFormatted = parsed?.formatNational() || ''

    let countryName = country
    try {
      countryName = new Intl.DisplayNames([i18n.language], { type: 'region' }).of(country)
    } catch {
      /* ISO code */
    }

    const message = buildAccrocarBookingMessage(i18n, t, {
      carName,
      startDate: startStr,
      endDate: endStr,
      durationLabel: dur,
      fullName: fullName.trim(),
      phoneInternational: phoneDisplay,
      phoneCc,
      phoneNationalFormatted,
      countryName: countryName || country,
      deliveryCityLabel: resolvedDeliveryCityLabel,
      deliveryAddress: deliveryAddress.trim(),
      optionalMessage: optionalMessage.trim(),
    })

    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  const errorList = [...new Set(Object.values(errors).filter(Boolean))]

  return (
    <div className="booking-form">
      <form onSubmit={onSubmit} className="space-y-8" noValidate>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
        >
          <div>
            <label htmlFor="booking-start" className="eyebrow block mb-3">
              {t('booking.startDate')}
            </label>
            <input
              id="booking-start"
              type="date"
              name="startDate"
              value={startDateIso}
              min={todayIso}
              onChange={onStartChange}
              aria-invalid={Boolean(errors.startDate || errors.endBeforeStart)}
              className="w-full border border-sand/70 bg-pearl px-4 py-3.5 text-obsidian text-[15px] focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson/30 transition-colors duration-500 [color-scheme:light]"
            />
            {errors.startDate && (
              <p className="mt-2 text-sm text-crimson">{errors.startDate}</p>
            )}
          </div>
          <div>
            <label htmlFor="booking-end" className="eyebrow block mb-3">
              {t('booking.endDate')}
            </label>
            <input
              id="booking-end"
              type="date"
              name="endDate"
              value={endDateIso}
              min={minEndIso}
              onChange={(e) => setEndDateIso(e.target.value)}
              aria-invalid={Boolean(errors.endDate || errors.endBeforeStart)}
              className="w-full border border-sand/70 bg-pearl px-4 py-3.5 text-obsidian text-[15px] focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson/30 transition-colors duration-500 [color-scheme:light]"
            />
            {errors.endDate && (
              <p className="mt-2 text-sm text-crimson">{errors.endDate}</p>
            )}
          </div>
        </motion.div>

        {errors.endBeforeStart && (
          <p className="text-sm text-crimson -mt-2" role="alert">
            {errors.endBeforeStart}
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.04 }}
          className="border border-sand/60 bg-pearl px-5 py-5 sm:px-6 sm:py-6"
        >
          <p className="eyebrow">{t('booking.duration')}</p>
          <p className="mt-3 font-serif text-2xl sm:text-3xl text-crimson">
            {durationLabel ?? '—'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.06 }}
        >
          <label htmlFor="booking-fullname" className="eyebrow block mb-3">
            {t('booking.fullName')}
          </label>
          <input
            id="booking-fullname"
            type="text"
            name="name"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            className="w-full border border-sand/70 bg-pearl px-4 py-3.5 text-obsidian text-[15px] placeholder:text-obsidian/30 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson/30 transition-colors duration-500"
          />
          {errors.fullName && (
            <p className="mt-2 text-sm text-crimson">{errors.fullName}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.08 }}
        >
          <label htmlFor="booking-phone" className="eyebrow block mb-3">
            {t('booking.phone')}
          </label>
          <div className={errors.phone ? 'ring-1 ring-crimson/40 rounded-sm' : ''}>
            <PhoneInput
              international
              countryCallingCodeEditable={false}
              country={country}
              value={phone}
              onChange={(v) => setPhone(v || '')}
              onCountryChange={(c) => c && setCountry(c)}
              className="accrocar-phone"
              numberInputProps={{
                id: 'booking-phone',
                autoComplete: 'tel',
              }}
            />
          </div>
          {errors.phone && <p className="mt-2 text-sm text-crimson">{errors.phone}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.09 }}
        >
          <label htmlFor="booking-delivery-city" className="eyebrow block mb-3">
            {t('booking.deliveryCity')}
          </label>
          <select
            id="booking-delivery-city"
            name="deliveryCity"
            value={deliveryCity}
            onChange={(e) => {
              setDeliveryCity(e.target.value)
              if (e.target.value !== 'other') setDeliveryCityOther('')
            }}
            aria-invalid={Boolean(errors.deliveryCity || errors.deliveryCityOther)}
            className="w-full border border-sand/70 bg-pearl px-4 py-3.5 text-obsidian text-[15px] focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson/30 transition-colors duration-500"
          >
            <option value="">{t('booking.deliveryCityPlaceholder')}</option>
            {DELIVERY_CITY_VALUES.map((v) => (
              <option key={v} value={v}>
                {t(`booking.deliveryCities.${v}`)}
              </option>
            ))}
          </select>
          {(errors.deliveryCity || errors.deliveryCityOther) && (
            <p className="mt-2 text-sm text-crimson">
              {errors.deliveryCity || errors.deliveryCityOther}
            </p>
          )}
          {deliveryCity === 'other' && (
            <div className="mt-4">
              <label htmlFor="booking-delivery-city-other" className="sr-only">
                {t('booking.deliveryCityOther')}
              </label>
              <input
                id="booking-delivery-city-other"
                type="text"
                value={deliveryCityOther}
                onChange={(e) => setDeliveryCityOther(e.target.value)}
                placeholder={t('booking.deliveryCityOtherPlaceholder')}
                aria-invalid={Boolean(errors.deliveryCityOther)}
                className="w-full border border-sand/70 bg-pearl px-4 py-3.5 text-obsidian text-[15px] placeholder:text-obsidian/30 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson/30 transition-colors duration-500"
              />
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.095 }}
        >
          <label htmlFor="booking-delivery-address" className="eyebrow block mb-3">
            {t('booking.deliveryAddress')}
          </label>
          <input
            id="booking-delivery-address"
            type="text"
            name="deliveryAddress"
            autoComplete="street-address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            placeholder={t('booking.deliveryAddressPlaceholder')}
            aria-invalid={Boolean(errors.deliveryAddress)}
            className="w-full border border-sand/70 bg-pearl px-4 py-3.5 text-obsidian text-[15px] placeholder:text-obsidian/30 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson/30 transition-colors duration-500"
          />
          {errors.deliveryAddress && (
            <p className="mt-2 text-sm text-crimson">{errors.deliveryAddress}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          <label htmlFor="booking-note" className="eyebrow block mb-3">
            {t('booking.optionalMessage')}
          </label>
          <textarea
            id="booking-note"
            name="message"
            rows={3}
            value={optionalMessage}
            onChange={(e) => setOptionalMessage(e.target.value)}
            placeholder={t('booking.optionalPlaceholder')}
            className="w-full resize-y min-h-[100px] border border-sand/70 bg-pearl px-4 py-3.5 text-obsidian text-[15px] placeholder:text-obsidian/30 focus:border-crimson focus:outline-none focus:ring-1 focus:ring-crimson/30 transition-colors duration-500"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {errorList.length > 0 && (
            <motion.div
              key="form-errors"
              role="alert"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease }}
              className="overflow-hidden border border-crimson/25 bg-crimson/[0.04] px-5 py-4"
            >
              <p className="eyebrow text-crimson mb-2">{t('booking.fixForm')}</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-obsidian/80">
                {errorList.map((msg) => (
                  <li key={msg}>{msg}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.13 }}
          className="flex flex-col gap-5 pt-1"
        >
          <motion.button
            type="submit"
            whileTap={{ scale: 0.985 }}
            className="btn-luxe-primary w-full sm:w-auto justify-center"
          >
            {t('booking.submit')}
          </motion.button>
          <p className="text-[11px] uppercase tracking-luxe text-sand-600 leading-relaxed max-w-md">
            {t('booking.whatsappHint')}
          </p>
        </motion.div>
      </form>
    </div>
  )
}
