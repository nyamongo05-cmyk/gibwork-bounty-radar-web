
import { useMemo, useState } from "react";

type Bounty = {
  id: number;
  title: string;
  description: string;
  reward: number;
  status: "Open" | "In Progress" | "Closed";
  submissions: number;
  approved: number;
  tags: string[];
};

const bounties: Bounty[] = [
  {
    id: 1,
    title: "Build a Gibwork CLI Monitor",
    description:
      "Create a developer tool that discovers and tracks Gibwork bounty activity.",
    reward: 250,
    status: "Open",
    submissions: 4,
    approved: 1,
    tags: ["TypeScript", "SDK", "CLI"],
  },
  {
    id: 2,
    title: "Improve Developer Documentation",
    description:
      "Help developers understand and integrate the Gibwork SDK more easily.",
    reward: 150,
    status: "Open",
    submissions: 7,
    approved: 2,
    tags: ["Docs", "Developer"],
  },
  {
    id: 3,
    title: "Build an Automation Script",
    description:
      "Create a script that automates repetitive bounty-related developer tasks.",
    reward: 200,
    status: "In Progress",
    submissions: 5,
    approved: 1,
    tags: ["Automation", "JavaScript"],
  },
  {
    id: 4,
    title: "Gibwork API Testing",
    description:
      "Create automated tests for common Gibwork SDK operations.",
    reward: 100,
    status: "Closed",
    submissions: 9,
    approved: 3,
    tags: ["Testing", "API"],
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Priority");

  const filtered = useMemo(() => {
    let result = bounties.filter((bounty) => {
      const text =
        `${bounty.title} ${bounty.description} ${bounty.tags.join(" ")}`
          .toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());
      const matchesStatus =
        status === "All" || bounty.status === status;

      return matchesSearch && matchesStatus;
    });

    if (sort === "Reward") {
      result = [...result].sort((a, b) => b.reward - a.reward);
    }

    if (sort === "Submissions") {
      result = [...result].sort(
        (a, b) => b.submissions - a.submissions
      );
    }

    if (sort === "Priority") {
      result = [...result].sort((a, b) => {
        const scoreA = a.reward + (10 - a.submissions) * 10;
        const scoreB = b.reward + (10 - b.submissions) * 10;
        return scoreB - scoreA;
      });
    }

    return result;
  }, [search, status, sort]);

  const open = bounties.filter((b) => b.status === "Open").length;
  const submissions = bounties.reduce(
    (sum, bounty) => sum + bounty.submissions,
    0
  );
  const approved = bounties.reduce(
    (sum, bounty) => sum + bounty.approved,
    0
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-5 py-8">

        <header className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-cyan-400">
                DEVELOPER TOOLING
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Gibwork Bounty Radar
              </h1>

              <p className="mt-2 max-w-2xl text-slate-400">
                Discover, filter and prioritize Gibwork bounties from one
                developer-focused dashboard.
              </p>
            </div>

            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              Prototype
            </div>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Open Bounties" value={open} />
          <Stat label="Tracked Tasks" value={bounties.length} />
          <Stat label="Submissions" value={submissions} />
          <Stat label="Approved" value={approved} />
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search bounties..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
            >
              <option>All</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
            >
              <option>Priority</option>
              <option>Reward</option>
              <option>Submissions</option>
            </select>
          </div>
        </section>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Bounties
          </h2>

          <span className="text-sm text-slate-500">
            {filtered.length} results
          </span>
        </div>

        <section className="mt-4 grid gap-4 md:grid-cols-2">
          {filtered.map((bounty) => (
            <article
              key={bounty.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-500/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500">
                    BOUNTY #{bounty.id}
                  </span>

                  <h3 className="mt-1 text-lg font-semibold">
                    {bounty.title}
                  </h3>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    bounty.status === "Open"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : bounty.status === "In Progress"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {bounty.status}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {bounty.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {bounty.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-800 pt-4">
                <Metric label="Reward" value={`$${bounty.reward}`} />
                <Metric
                  label="Submissions"
                  value={bounty.submissions}
                />
                <Metric
                  label="Approved"
                  value={bounty.approved}
                />
              </div>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
          <h2 className="font-semibold text-cyan-300">
            Prototype Notice
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            This dashboard currently uses demonstration bounty data.
            The separate Gibwork Bounty Radar CLI connects to the
            Gibwork SDK. The next integration step is connecting this
            interface to a supported server-side Gibwork data source.
          </p>
        </section>

        <footer className="mt-10 border-t border-slate-800 pt-5 text-sm text-slate-500">
          Gibwork Bounty Radar · Developer tooling prototype
        </footer>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
