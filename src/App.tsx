import { AboutSection } from './components/AboutSection'
import { CertificationsSection } from './components/CertificationsSection'
import { ContactSection, Footer } from './components/ContactSection'
import { EducationSection } from './components/EducationSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { ProjectsSection } from './components/ProjectsSection'
import { Section } from './components/Section'
import { SkillsSection } from './components/SkillsSection'
import {
  caseStudies,
  certifications,
  education,
  experience,
  productProjects,
  skills,
} from './content/portfolio'

function BriefcaseIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.379A18.922 18.922 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.379m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
      <main>
        <AboutSection />
        <Section
          id="experience"
          eyebrow="02 — Career"
          title="Experience"
          icon={<BriefcaseIcon />}
          className="bg-white"
        >
          <ExperienceSection items={experience} />
        </Section>
        <Section id="projects" eyebrow="03 — Selected Work" title="Projects & Case Studies">
          <ProjectsSection productProjects={productProjects} caseStudies={caseStudies} />
        </Section>
        <SkillsSection skills={skills} />
        <EducationSection items={education} />
        <CertificationsSection items={certifications} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
