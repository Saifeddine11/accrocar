import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const panelEase = [0.16, 1, 0.3, 1]

function ChevronIcon({ open }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none flex h-4 w-4 shrink-0 items-center justify-center text-sand-600"
      initial={false}
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.35, ease: panelEase }}
    >
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 1.5L6 6l5-4.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  )
}

/**
 * Custom luxury dropdown for Fleet filters — pearl / obsidian / crimson / sand palette.
 */
export default function FleetLuxeSelect({
  label,
  value,
  onChange,
  options,
  isOpen,
  onOpenChange,
  id: idProp,
}) {
  const uid = useId()
  const baseId = idProp ?? `fleet-filter-${uid.replace(/:/g, '')}`
  const listboxId = `${baseId}-listbox`
  const triggerRef = useRef(null)
  const listRef = useRef(null)
  const containerRef = useRef(null)

  const [highlightIndex, setHighlightIndex] = useState(0)

  const selectedOption = options.find((o) => o.value === value) ?? options[0]
  const defaultValue = options[0]?.value
  const isNonDefault = value !== defaultValue

  useEffect(() => {
    if (!isOpen) return
    const i = options.findIndex((o) => o.value === value)
    setHighlightIndex(i >= 0 ? i : 0)
  }, [isOpen, value, options])

  useEffect(() => {
    if (!isOpen) return
    const onDocPointer = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onOpenChange(false)
      }
    }
    document.addEventListener('mousedown', onDocPointer)
    document.addEventListener('touchstart', onDocPointer, { passive: true })
    return () => {
      document.removeEventListener('mousedown', onDocPointer)
      document.removeEventListener('touchstart', onDocPointer)
    }
  }, [isOpen, onOpenChange])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onOpenChange(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onOpenChange])

  const selectIndex = useCallback(
    (index) => {
      const opt = options[index]
      if (opt) {
        onChange(opt.value)
        onOpenChange(false)
        triggerRef.current?.focus()
      }
    },
    [options, onChange, onOpenChange],
  )

  const onTriggerKeyDown = (e) => {
    if (e.key === 'Tab') {
      if (isOpen) onOpenChange(false)
      return
    }

    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        onOpenChange(true)
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightIndex((i) => Math.min(i + 1, options.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Home') {
      e.preventDefault()
      setHighlightIndex(0)
      return
    }
    if (e.key === 'End') {
      e.preventDefault()
      setHighlightIndex(options.length - 1)
      return
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      selectIndex(highlightIndex)
    }
  }

  useEffect(() => {
    if (!isOpen || !listRef.current) return
    const el = listRef.current.querySelector(`[data-index="${highlightIndex}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [highlightIndex, isOpen])

  return (
    <div ref={containerRef} className="relative w-full">
      <span
        id={`${baseId}-label`}
        className="mb-1.5 block font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-crimson"
      >
        {label}
      </span>
      <button
        ref={triggerRef}
        type="button"
        id={`${baseId}-trigger`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-labelledby={`${baseId}-label`}
        onClick={() => onOpenChange(!isOpen)}
        onKeyDown={onTriggerKeyDown}
        className={[
          'flex w-full min-h-[48px] items-center justify-between gap-3 border bg-pearl px-3 py-2.5 text-left transition-[border-color,box-shadow] duration-300 md:min-h-[44px]',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crimson/35',
          isOpen
            ? 'border-crimson/45 shadow-[0_0_0_1px_rgba(113,0,20,0.1)]'
            : 'border-sand/55 hover:border-sand hover:shadow-[0_1px_0_rgba(179,143,111,0.12)]',
        ].join(' ')}
      >
        <span
          className={`min-w-0 truncate font-sans text-[11px] font-medium uppercase tracking-[0.14em] ${
            isNonDefault ? 'text-crimson' : 'text-obsidian'
          }`}
        >
          {selectedOption?.label}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={`${baseId}-label`}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: panelEase }}
            className="absolute left-0 right-0 top-[calc(100%+0.25rem)] z-50 max-h-[min(50vh,22rem)] overflow-y-auto overscroll-contain border border-sand/60 bg-pearl py-1 shadow-[0_16px_48px_rgba(22,22,22,0.1)]"
          >
            {options.map((opt, index) => {
              const selected = opt.value === value
              const highlighted = index === highlightIndex
              let rowClass =
                'cursor-pointer border-b border-sand/25 px-3 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 last:border-b-0 '
              if (selected) {
                rowClass += 'bg-crimson/[0.07] text-crimson'
              } else if (highlighted) {
                rowClass += 'bg-sand/12 text-obsidian'
              } else {
                rowClass += 'text-obsidian hover:bg-sand/10'
              }

              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={selected}
                  data-index={index}
                  onMouseEnter={() => setHighlightIndex(index)}
                  onClick={() => selectIndex(index)}
                  className={rowClass}
                >
                  {opt.label}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
