import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { RecentActivity } from "@/lib/types";


interface RecentActivityTableProps {
  activities: RecentActivity[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "APPROVED":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "REJECTED":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "ACTIVE":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

export default function RecentActivityTable({ activities }: RecentActivityTableProps) {
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent activity found
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tenant</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell className="font-medium">{activity.tenantName}</TableCell>
            <TableCell>{activity.propertyName}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(activity.status)}>
                {activity.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              ${activity.amount.toFixed(2)}
            </TableCell>
            <TableCell>
              {new Date(activity.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}