import { contactInterests, personal } from '../content/portfolio'
import { Section } from './Section'

export function ContactSection() {
  return (
    <Section id="contact" title="Contact">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-8">
        <p className="mb-4 text-slate-600">I enjoy discussions around:</p>
        <div className="mb-8 flex flex-wrap gap-2">
          {contactInterests.map((item) => (
            <span
              key={item}
              className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          <a
            href={`mailto:${personal.email}`}
            className="text-sm font-medium text-teal-700 hover:underline"
          >
            {personal.email}
          </a>
          <a href={`tel:${personal.phone}`} className="text-sm font-medium text-teal-700 hover:underline">
            {personal.phone}
          </a>
        </div>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 py-8 text-center text-sm text-slate-400">
      <p>
        © {new Date().getFullYear()} {personal.name}. All rights reserved.
      </p>
    </footer>
  )
}
