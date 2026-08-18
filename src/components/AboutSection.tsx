import { about } from '../content/portfolio'
import { Section } from './Section'

export function AboutSection() {
  return (
    <Section id="about" eyebrow="01 — Introduction" title="About Me" className="bg-white">
      <div className="max-w-3xl space-y-4">
        <p className="text-lg leading-relaxed text-slate-700">{about.summary}</p>
        {about.details.map((para) => (
          <p key={para.slice(0, 40)} className="leading-relaxed text-slate-600">
            {para}
          </p>
        ))}
        <div className="pt-4">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-slate-500">
            Areas of Interest
          </p>
          <div className="flex flex-wrap gap-2">
            {about.interests.map((item) => (
              <span
                key={item}
                className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
