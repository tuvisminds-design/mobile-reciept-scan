import type { Experience } from '../content/portfolio'
import { WhyItMattersCallout } from './WhyItMattersCallout'

export function ExperienceSection({ items }: { items: Experience[] }) {
  return (
    <div className="space-y-8">
      {items.map((role) => (
        <article
          key={`${role.company}-${role.title}`}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
        >
          <div className="border-l-4 border-teal-600 bg-gradient-to-r from-slate-50 to-white px-6 py-5">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {role.title} — {role.company}
                </h3>
                <p className="text-sm text-slate-500">
                  {role.period} · {role.location}
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-5">
            {role.subRoles ? (
              <div className="space-y-6">
                {role.subRoles.map((sub) => (
                  <div
                    key={sub.title}
                    className="rounded-lg border border-slate-100 bg-slate-50/50 p-5"
                  >
                    <h4 className="mb-3 font-medium text-slate-800">{sub.title}</h4>
                    <ul className="space-y-2">
                      {sub.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <WhyItMattersCallout text={sub.whyItMatters} />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <ul className="space-y-2">
                  {role.bullets?.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                      {bullet}
                    </li>
                  ))}
                </ul>
                {role.whyItMatters && <WhyItMattersCallout text={role.whyItMatters} />}
              </>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
