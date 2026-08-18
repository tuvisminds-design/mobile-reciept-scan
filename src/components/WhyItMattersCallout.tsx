export function WhyItMattersCallout({ text }: { text: string }) {
  return (
    <div className="mt-4 rounded-r-lg border-l-4 border-teal-500 bg-slate-50 px-4 py-3">
      <p className="text-sm leading-relaxed text-slate-700">
        <span className="font-medium italic text-teal-700">Why it matters: </span>
        {text}
      </p>
    </div>
  )
}
