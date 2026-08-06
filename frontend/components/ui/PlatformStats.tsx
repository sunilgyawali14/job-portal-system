const stats = [
  ["50k+", "Active jobs"],
  ["8k+", "Companies hiring"],
  ["120k+", "Successful matches"],
  ["4.9/5", "Candidate rating"],
];

export function PlatformStats() {
  return (
    <section className="bg-indigo-600 py-12 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-white/15 px-5 sm:grid-cols-4 sm:px-8">
        {stats.map(([value, label]) => (
          <div className="py-5 text-center" key={label}>
            <p className="font-display text-3xl font-bold tracking-[-0.05em] sm:text-4xl">
              {value}
            </p>
            <p className="mt-1 text-sm text-indigo-100">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
