import type { Education } from '../content/portfolio'
import { Section } from './Section'

export function EducationSection({ items }: { items: Education[] }) {
  return (
    <Section id="education" eyebrow="05 — Academics" title="Education">
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((edu) => (
          <div
            key={edu.degree}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-md"
          >
            <h3 className="font-semibold text-slate-900">{edu.degree}</h3>
            <p className="mt-1 text-sm text-teal-700">{edu.institution}</p>
            <p className="mt-2 text-sm text-slate-500">
              {edu.period}
              {edu.gpa && ` · GPA: ${edu.gpa}`}
            </p>
            {edu.highlights && (
              <ul className="mt-4 space-y-1">
                {edu.highlights.map((h) => (
                  <li key={h} className="text-sm text-slate-600">
                    · {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  )
}
