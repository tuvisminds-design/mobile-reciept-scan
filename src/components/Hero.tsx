import { personal } from '../content/portfolio'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-900" />
      <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 text-4xl font-bold shadow-lg ring-4 ring-white/10">
            MK
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">{personal.name}</h1>
            <p className="mt-3 text-lg text-teal-300 md:text-xl">
              {personal.title} <span className="text-slate-400">|</span> {personal.subtitle}
            </p>
            <p className="mt-2 text-sm text-slate-400">{personal.location}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href={`mailto:${personal.email}`}
                className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-500"
              >
                Email Me
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-teal-500 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href={personal.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-teal-500 hover:text-white"
              >
                Medium
              </a>
              <a
                href={personal.drivePortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-teal-500 hover:text-white"
              >
                Portfolio Drive
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
