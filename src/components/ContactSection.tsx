import { contactInterests, personal } from '../content/portfolio'
import { Section } from './Section'

export function ContactSection() {
  return (
    <Section id="contact" eyebrow="07 — Get in touch" title="Contact">
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 text-white md:p-12">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_90%_0%,_rgba(20,184,166,0.25),_transparent)]" />
        <div className="relative">
          <h3 className="font-display text-2xl font-semibold md:text-3xl">
            Let's build something worth measuring.
          </h3>
          <p className="mt-3 max-w-xl text-slate-400">
            Open to AI Product and Business Analyst roles, collaborations, and
            conversations around:
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {contactInterests.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-sm font-medium text-slate-200"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${personal.email}`}
              className="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-teal-400"
            >
              {personal.email}
            </a>
            <a
              href={`tel:${personal.phone}`}
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-teal-500 hover:text-white"
            >
              {personal.phone}
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-teal-500 hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-display text-lg font-semibold text-white">
          Madhwaraj Kulkarni<span className="text-teal-500">.</span>
        </p>
        <div className="flex flex-wrap items-center gap-5 text-sm">
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-400">
            LinkedIn
          </a>
          <a href={personal.medium} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-teal-400">
            Medium
          </a>
          <a href={`mailto:${personal.email}`} className="transition-colors hover:text-teal-400">
            Email
          </a>
        </div>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} {personal.name}
        </p>
      </div>
    </footer>
  )
}
