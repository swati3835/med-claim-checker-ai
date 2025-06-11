
import { Clock, FileText, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "claim_approved",
      user: "John Doe",
      description: "Prescription claim approved",
      amount: "$150.00",
      time: "2 min ago",
      status: "approved"
    },
    {
      id: 2,
      type: "document_uploaded",
      user: "Jane Smith",
      description: "Medical bill uploaded",
      amount: "$75.50",
      time: "5 min ago",
      status: "pending"
    },
    {
      id: 3,
      type: "claim_rejected",
      user: "Mike Johnson",
      description: "Invalid prescription format",
      amount: "$200.00",
      time: "12 min ago",
      status: "rejected"
    },
    {
      id: 4,
      type: "ocr_completed",
      user: "Sarah Wilson",
      description: "OCR processing completed",
      amount: "$90.25",
      time: "18 min ago",
      status: "processed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "pending": return "bg-orange-100 text-orange-800";
      case "processed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "claim_approved": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "claim_rejected": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <FileText className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <Card className="medical-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Latest claims and document processing activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.user}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  {activity.amount}
                </span>
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
