import { Badge } from "@/components/ui/badge";
import { IPayment } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PAID: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  REFUNDED: "bg-gray-100 text-gray-800",
};

export function PaymentHistoryTable({ payments }: { payments: IPayment[] }) {
  if (payments.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        No payment history yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-b bg-muted/50 text-left">
          <tr>
            <th className="p-3">Property</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Paid On</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b last:border-0">
              <td className="p-3 font-medium">
                {payment.rentalRequest?.property?.title ?? "—"}
              </td>
              <td className="p-3">৳{payment.amount.toLocaleString()}</td>
              <td className="p-3">
                <Badge className={STATUS_STYLES[payment.status] ?? ""} variant="outline">
                  {payment.status}
                </Badge>
              </td>
              <td className="p-3 text-muted-foreground">
                {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString() : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}