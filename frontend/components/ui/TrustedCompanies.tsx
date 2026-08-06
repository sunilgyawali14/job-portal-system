const companies = [
  "Google",
  "microsoft",
  "airbnb",
  "Spotify",
  "slack",
  "Shopify",
];

export function TrustedCompanies() {
  const loopedCompanies = [...companies, ...companies];

  return (
    <section
      className="overflow-hidden border-y border-line bg-paper py-10"
      id="companies"
    >
      <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">
          Trusted by people at leading companies
        </p>
      </div>
      <div className="mt-8 overflow-hidden" aria-label="Trusted companies">
        <div className="marquee-track-ltr flex w-max items-center gap-12 pr-12 text-xl font-bold tracking-[-0.05em] text-ink-faint sm:gap-20 sm:pr-20">
          {loopedCompanies.map((company, index) => (
            <span
              className="min-w-28 transition-colors hover:text-indigo-600"
              key={`${company}-${index}`}
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
