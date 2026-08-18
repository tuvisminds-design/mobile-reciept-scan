import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, title, icon, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-20 ${className}`}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 flex items-center gap-3">
          {icon && <span className="text-teal-600">{icon}</span>}
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            {title}
          </h2>
          <div className="ml-4 hidden h-px flex-1 bg-slate-200 sm:block" />
        </div>
        {children}
      </div>
    </section>
  )
}
