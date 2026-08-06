const steps = [
  [
    "01",
    "Create your profile",
    "Tell us about your experience, skills, and what you’re looking for.",
  ],
  [
    "02",
    "Discover great roles",
    "Explore curated opportunities from companies ready to meet you.",
  ],
  [
    "03",
    "Apply with confidence",
    "Send thoughtful applications and keep every opportunity in one place.",
  ],
];

export function HowItWorks() {
  return (
    <section className="bg-indigo-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.05em] text-ink sm:text-4xl">
            Your next opportunity is three steps away.
          </h2>
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map(([number, title, text]) => (
            <li key={number}>
              <span className="font-display text-5xl font-bold tracking-[-0.07em] text-indigo-200">
                {number}
              </span>
              <div className="mt-5 h-px bg-indigo-100" />
              <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-ink-soft">
                {text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
