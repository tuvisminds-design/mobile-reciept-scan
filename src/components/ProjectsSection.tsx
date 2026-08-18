import type { Project } from '../content/portfolio'

function ProjectCard({ project }: { project: Project }) {
  const content = (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg">
      <h3 className="mb-2 font-semibold text-slate-900 group-hover:text-teal-700">
        {project.name}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
      {project.link && (
        <span className="mt-3 text-xs font-medium text-teal-600 group-hover:underline">
          View in Drive →
        </span>
      )}
    </div>
  )

  if (project.link) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    )
  }

  return content
}

export function ProjectsSection({
  productProjects,
  caseStudies,
}: {
  productProjects: Project[]
  caseStudies: Project[]
}) {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">
          <span className="h-4 w-1 rounded-full bg-teal-500" />
          Product Initiatives
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {productProjects.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-800">
          <span className="h-4 w-1 rounded-full bg-teal-500" />
          BA Case Studies
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </div>
  )
}
