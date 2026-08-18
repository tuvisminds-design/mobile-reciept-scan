import { Section } from './Section'

export function SkillsSection({ skills }: { skills: Record<string, string[]> }) {
  return (
    <Section id="skills" title="Skills & Tools">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-700">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
