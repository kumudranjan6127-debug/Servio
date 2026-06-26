import { FileText, IndianRupee, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/app/components/ui/utils";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { EmptyState } from "../components/EmptyState";
import { useProjectInvoices } from "../hooks/useAdminData";
import { formatCurrency } from "../lib/format";
import type { InvoiceLineItem, InvoiceStatus } from "../types";

/** Sum of line-item amounts — the invoice total (derived, never stored). */
function invoiceTotal(items: InvoiceLineItem[]): number {
  return items.reduce((sum, i) => sum + (i.amount || 0), 0);
}

const STATUS_PILL_CLASSES: Record<InvoiceStatus, string> = {
  paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  unpaid: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  overdue: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  paid: "Paid",
  unpaid: "Unpaid",
  overdue: "Overdue",
};

function StatusPill({ status }: { status: InvoiceStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        STATUS_PILL_CLASSES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export function ProjectInvoices() {
  const invoices = useProjectInvoices();

  const total = invoices.data.length;
  const paidCount = invoices.data.filter((i) => i.status === "paid").length;
  const outstanding = invoices.data
    .filter((i) => i.status !== "paid")
    .reduce((sum, i) => sum + invoiceTotal(i.items), 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Invoices"
        description="Issue invoices to clients. They appear on the client's dashboard Invoices section, addressed by their account email."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={FileText}
          label="Invoices"
          value={invoices.loading ? "…" : total}
        />
        <StatCard
          icon={CheckCircle2}
          label="Paid"
          value={invoices.loading ? "…" : paidCount}
        />
        <StatCard
          icon={IndianRupee}
          label="Outstanding"
          value={invoices.loading ? "…" : formatCurrency(outstanding)}
        />
      </div>

      {invoices.loading ? (
        <p className="text-sm text-muted-foreground">Loading invoices…</p>
      ) : invoices.error ? (
        <p className="text-sm text-destructive">
          Couldn&apos;t load invoices: {invoices.error}
        </p>
      ) : invoices.data.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No invoices yet"
          description="Issue your first invoice to a client to show it on their dashboard."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card text-card-foreground">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Invoice</th>
                  <th className="px-4 py-3 font-medium">Client</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Issued</th>
                  <th className="px-4 py-3 font-medium">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.data.map((invoice) => (
                  <tr key={invoice.id} className="align-top">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {invoice.number}
                      <span className="ml-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {invoice.items.length} item
                        {invoice.items.length === 1 ? "" : "s"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {invoice.clientEmail}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {formatCurrency(invoiceTotal(invoice.items))}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={invoice.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {invoice.date || "—"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {invoice.dueDate || "—"}
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
