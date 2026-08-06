const testimonials = [
  {
    quote:
      "JobPortal made my job search feel focused instead of overwhelming. I found a role I love in three weeks.",
    name: "Sarah Johnson",
    role: "Product Designer at Webflow",
    initials: "SJ",
  },
  {
    quote:
      "The quality of the roles here is exceptional. It connected me with companies that really value great engineering.",
    name: "David Chen",
    role: "Software Engineer at Figma",
    initials: "DC",
  },
  {
    quote:
      "I was looking for a change with more purpose. JobPortal helped me find exactly that.",
    name: "Maya Patel",
    role: "Growth Lead at Notion",
    initials: "MP",
  },
];

export function Testimonials() {
  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-canvas py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
            Success stories
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-ink sm:text-4xl">
            Real people. Better careers.
          </h2>
        </div>
      </div>
      <div className="mt-10 overflow-hidden" aria-label="Candidate testimonials">
        <div className="marquee-track-ltr flex w-max gap-5 pr-5">
          {loopedTestimonials.map((item, index) => (
            <figure
              className="w-[20rem] shrink-0 rounded-2xl border border-line bg-paper p-6 shadow-[0_8px_30px_rgba(31,35,68,0.05)] sm:w-[25rem]"
              key={`${item.name}-${index}`}
            >
              <div className="text-lg tracking-[0.2em] text-amber">★★★★★</div>
              <blockquote className="mt-5 text-base leading-7 text-ink-soft">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                  {item.initials}
                </span>
                <span>
                  <strong className="block text-sm text-ink">
                    {item.name}
                  </strong>
                  <span className="text-xs text-ink-faint">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
