import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  title: string
  eyebrow?: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, title, eyebrow, icon, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-16 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-10">
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
                {eyebrow}
              </p>
            )}
            <div className="flex items-center gap-3">
              {icon && <span className="text-teal-600">{icon}</span>}
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                {title}
              </h2>
              <div className="ml-4 hidden h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent sm:block" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>{children}</Reveal>
      </div>
    </section>
  )
}
