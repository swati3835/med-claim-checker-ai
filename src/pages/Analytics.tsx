
import { useState } from "react";
import { TrendingUp, PieChart, BarChart3, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from "recharts";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

const Analytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const monthlyData = [
    { month: "Jan", claims: 186, approved: 156, rejected: 30 },
    { month: "Feb", claims: 205, approved: 187, rejected: 18 },
    { month: "Mar", claims: 198, approved: 176, rejected: 22 },
    { month: "Apr", claims: 224, approved: 209, rejected: 15 },
    { month: "May", claims: 267, approved: 248, rejected: 19 },
    { month: "Jun", claims: 289, approved: 277, rejected: 12 },
  ];

  const claimTypesData = [
    { name: "Prescription", value: 45, color: "#9333ea" },
    { name: "Lab Tests", value: 30, color: "#f472b6" },
    { name: "Consultations", value: 15, color: "#06b6d4" },
    { name: "Procedures", value: 10, color: "#10b981" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <AdminHeader 
            title="Analytics" 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <main className="p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-purple-900">Reports & Analytics</h2>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>

            {/* Claims Trend */}
            <Card className="medical-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Claims Trend Analysis
                </CardTitle>
                <CardDescription>
                  Monthly claims submission and approval trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="claims" 
                        stroke="#9333ea" 
                        strokeWidth={3}
                        name="Total Claims"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="approved" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        name="Approved"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="rejected" 
                        stroke="#ef4444" 
                        strokeWidth={3}
                        name="Rejected"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Claim Types Distribution */}
              <Card className="medical-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-purple-600" />
                    Claim Types Distribution
                  </CardTitle>
                  <CardDescription>
                    Breakdown of different claim types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Tooltip />
                        <RechartsPieChart data={claimTypesData} cx="50%" cy="50%" outerRadius={80}>
                          {claimTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 space-y-2">
                    {claimTypesData.map((type) => (
                      <div key={type.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: type.color }}
                          />
                          <span className="text-sm">{type.name}</span>
                        </div>
                        <span className="text-sm font-medium">{type.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card className="medical-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Key Metrics
                  </CardTitle>
                  <CardDescription>
                    Performance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Approval Rate</span>
                        <span className="font-medium">94.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>OCR Accuracy</span>
                        <span className="font-medium">98.7%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Processing Speed</span>
                        <span className="font-medium">89.3%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-pink-600 h-2 rounded-full" style={{ width: '89.3%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>AI Accuracy</span>
                        <span className="font-medium">96.1%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96.1%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
