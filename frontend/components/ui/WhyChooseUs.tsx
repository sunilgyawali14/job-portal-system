import {
  BadgeCheck,
  HeartHandshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Sparkles,
    title: "Smarter matches",
    text: "Discover roles aligned with your skills and ambitions.",
  },
  {
    icon: BadgeCheck,
    title: "Verified opportunities",
    text: "We partner with trusted companies that are actively hiring.",
  },
  {
    icon: HeartHandshake,
    title: "People-first support",
    text: "Practical resources and guidance at every stage of your search.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-paper py-20 sm:py-28" id="about">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
            Why JobPortal
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-ink sm:text-4xl">
            A better way to find your next role.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article
              className="rounded-2xl border border-line p-7 transition-shadow hover:shadow-[0_14px_32px_rgba(31,35,68,0.08)]"
              key={title}
            >
              <span className="grid size-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
