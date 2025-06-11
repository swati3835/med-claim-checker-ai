
import { useState } from "react";
import { BarChart3, FileText, Users, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";
import StatsCard from "@/components/StatsCard";
import RecentActivity from "@/components/RecentActivity";
import ClaimsChart from "@/components/ClaimsChart";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    {
      title: "Total Claims",
      value: "2,847",
      change: "+12.5%",
      icon: FileText,
      color: "purple"
    },
    {
      title: "Approved Claims",
      value: "2,156",
      change: "+8.2%",
      icon: CheckCircle,
      color: "green"
    },
    {
      title: "Pending Review",
      value: "423",
      change: "-2.1%",
      icon: AlertTriangle,
      color: "orange"
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+15.3%",
      icon: Users,
      color: "pink"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <AdminHeader 
            title="Dashboard Overview" 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <main className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ClaimsChart />
              <RecentActivity />
            </div>

            {/* Quick Actions */}
            <Card className="medical-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common administrative tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                    <h3 className="font-semibold text-purple-900">Review Pending Claims</h3>
                    <p className="text-sm text-purple-600">423 claims awaiting review</p>
                  </div>
                  <div className="p-4 border border-pink-200 rounded-lg hover:bg-pink-50 cursor-pointer transition-colors">
                    <h3 className="font-semibold text-pink-900">Generate Reports</h3>
                    <p className="text-sm text-pink-600">Monthly and quarterly reports</p>
                  </div>
                  <div className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                    <h3 className="font-semibold text-blue-900">Manage Users</h3>
                    <p className="text-sm text-blue-600">User accounts and permissions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
