import { useState } from 'react'
import { highlights, personal } from '../content/portfolio'

export function Hero() {
  const [photoOk, setPhotoOk] = useState(true)

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="bg-grid absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_75%_-10%,_rgba(20,184,166,0.28),_transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_110%,_rgba(15,23,42,0.9),_transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-teal-200">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
              Open to AI Product & Business Analyst roles
            </span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
              {personal.name}
            </h1>

            <p className="mt-4 text-lg font-medium md:text-2xl">
              <span className="bg-gradient-to-r from-teal-300 to-emerald-200 bg-clip-text text-transparent">
                {personal.title}
              </span>
              <span className="mx-2 text-slate-600">/</span>
              <span className="text-slate-300">{personal.subtitle}</span>
            </p>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-400 md:mx-0 md:text-base">
              Turning business problems into structured, data-driven solutions — bridging
              AI automation, product thinking, and workflow analysis.
            </p>

            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400 md:justify-start">
              <svg className="h-4 w-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {personal.location}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <a
                href={`mailto:${personal.email}`}
                className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5 hover:bg-teal-400"
              >
                Get in touch
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition-colors hover:border-teal-500 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href={personal.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition-colors hover:border-teal-500 hover:text-white"
              >
                Medium
              </a>
              <a
                href={personal.drivePortfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-700 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition-colors hover:border-teal-500 hover:text-white"
              >
                Portfolio Drive
              </a>
            </div>
          </div>

          <div className="relative shrink-0">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-500/30 to-emerald-500/10 blur-2xl" />
            {photoOk ? (
              <div className="relative h-44 w-44 overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-white/20 md:h-56 md:w-56">
                <img
                  src={`${import.meta.env.BASE_URL}profile.jpg`}
                  alt={personal.name}
                  className="h-full w-full object-cover"
                  onError={() => setPhotoOk(false)}
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
              </div>
            ) : (
              <div className="relative flex h-44 w-44 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-teal-500 to-emerald-700 font-display text-6xl font-semibold text-white shadow-2xl ring-1 ring-white/20 md:h-56 md:w-56">
                MK
              </div>
            )}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-800 bg-slate-800/60 sm:grid-cols-4">
          {highlights.map((item) => (
            <div key={item.label} className="bg-slate-950/60 px-5 py-6 text-center md:text-left">
              <p className="text-3xl font-bold text-white">{item.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
