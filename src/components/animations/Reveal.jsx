import { motion } from 'framer-motion'

/**
 * Reveal — wrap any block with an editorial fade-up reveal on scroll.
 * Slow, smooth, expo-out — never aggressive.
 */
const defaultEase = [0.16, 1, 0.3, 1]

export default function Reveal({
  children,
  delay = 0,
  duration = 1.1,
  y = 28,
  amount = 0.25,
  className = '',
  as: Tag = 'div',
}) {
  const MotionTag = motion[Tag] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: defaultEase }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * RevealText — splits text into lines/words for an editorial line-by-line rise.
 * Pass children as a string. For longer paragraphs prefer <Reveal>.
 */
export function RevealLines({ children, className = '', delay = 0 }) {
  // children is expected to be string or array of strings
  const lines = Array.isArray(children) ? children : String(children).split('\n')
  return (
    <span className={`block overflow-hidden ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: defaultEase, delay: delay + i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function StaggerGroup({ children, className = '', delayChildren = 0, stagger = 0.08 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: defaultEase } },
}
