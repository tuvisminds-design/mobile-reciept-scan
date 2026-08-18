import type { Certification } from '../content/portfolio'
import { Section } from './Section'

export function CertificationsSection({ items }: { items: Certification[] }) {
  return (
    <Section id="certifications" title="Certifications">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 font-semibold text-slate-700">Certification</th>
                <th className="px-5 py-3 font-semibold text-slate-700">Issuer</th>
                <th className="px-5 py-3 font-semibold text-slate-700">Platform</th>
                <th className="px-5 py-3 font-semibold text-slate-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((cert) => (
                <tr key={cert.name} className="border-b border-slate-100 last:border-0">
                  <td className="px-5 py-3.5 font-medium text-slate-800">{cert.name}</td>
                  <td className="px-5 py-3.5 text-slate-600">{cert.issuer}</td>
                  <td className="px-5 py-3.5 text-slate-600">{cert.platform}</td>
                  <td className="px-5 py-3.5 text-slate-500">{cert.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}
