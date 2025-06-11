
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ClaimsChart = () => {
  const data = [
    { month: "Jan", approved: 186, rejected: 24, pending: 45 },
    { month: "Feb", approved: 205, rejected: 18, pending: 52 },
    { month: "Mar", approved: 198, rejected: 22, pending: 38 },
    { month: "Apr", approved: 224, rejected: 15, pending: 41 },
    { month: "May", approved: 267, rejected: 19, pending: 35 },
    { month: "Jun", approved: 289, rejected: 12, pending: 42 },
  ];

  return (
    <Card className="medical-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Claims Overview
        </CardTitle>
        <CardDescription>
          Monthly claims processing statistics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="approved" fill="#10b981" name="Approved" />
              <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClaimsChart;
