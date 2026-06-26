import { Images, FolderGit2, EyeOff } from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { EmptyState } from "../components/EmptyState";
import { usePortfolio } from "../hooks/useAdminData";
import { formatDate } from "../lib/format";
import type { PortfolioItem } from "../types";

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        published
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          : "bg-muted text-muted-foreground",
      )}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}

function CoverThumb({ item }: { item: PortfolioItem }) {
  if (!item.imageUrl) {
    return (
      <div className="flex h-12 w-16 items-center justify-center rounded-md bg-muted text-muted-foreground">
        <Images className="h-4 w-4" aria-hidden="true" />
      </div>
    );
  }
  return (
    <img
      src={item.imageUrl}
      alt=""
      className="h-12 w-16 rounded-md object-cover ring-1 ring-border"
      loading="lazy"
    />
  );
}

export function PortfolioManagement() {
  const portfolio = usePortfolio();

  const total = portfolio.data.length;
  const publishedCount = portfolio.data.filter((p) => p.published).length;
  const draftCount = total - publishedCount;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Portfolio"
        description="Manage the showcase projects that appear on the public marketing site. Only published projects are visible to visitors."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={FolderGit2}
          label="Projects"
          value={portfolio.loading ? "…" : total}
        />
        <StatCard
          icon={Images}
          label="Published"
          value={portfolio.loading ? "…" : publishedCount}
        />
        <StatCard
          icon={EyeOff}
          label="Drafts"
          value={portfolio.loading ? "…" : draftCount}
        />
      </div>

      {portfolio.loading ? (
        <p className="text-sm text-muted-foreground">Loading portfolio…</p>
      ) : portfolio.error ? (
        <p className="text-sm text-destructive">
          Couldn&apos;t load portfolio: {portfolio.error}
        </p>
      ) : portfolio.data.length === 0 ? (
        <EmptyState
          icon={Images}
          title="No portfolio projects yet"
          description="Add your first showcase project to display it on the public site."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Cover</th>
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Tech</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {portfolio.data.map((item) => (
                  <tr key={item.id} className="align-top">
                    <td className="px-4 py-3">
                      <CoverThumb item={item} />
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="mt-0.5 max-w-md truncate text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {item.category}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {item.technologies.length}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge published={item.published} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {item.order}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(item.updatedAt ?? item.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
