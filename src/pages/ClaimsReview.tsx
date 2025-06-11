
import { useState } from "react";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

const ClaimsReview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pendingClaims = [
    {
      id: "CLM-001",
      patientName: "John Doe",
      claimAmount: "$150.00",
      submissionDate: "2024-01-15",
      prescriptionMatch: 95,
      billMatch: 88,
      aiRecommendation: "Approve",
      riskLevel: "Low"
    },
    {
      id: "CLM-002",
      patientName: "Jane Smith",
      claimAmount: "$75.50",
      submissionDate: "2024-01-14",
      prescriptionMatch: 72,
      billMatch: 65,
      aiRecommendation: "Review",
      riskLevel: "Medium"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-orange-100 text-orange-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <AdminHeader 
            title="Claims Review" 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <main className="p-6">
            <Tabs defaultValue="pending" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pending">Pending Review</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="flagged">Flagged</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-6">
                {pendingClaims.map((claim) => (
                  <Card key={claim.id} className="medical-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{claim.id} - {claim.patientName}</CardTitle>
                          <CardDescription>
                            Submitted on {claim.submissionDate} • Amount: {claim.claimAmount}
                          </CardDescription>
                        </div>
                        <Badge className={getRiskColor(claim.riskLevel)}>
                          {claim.riskLevel} Risk
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold">AI Analysis</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Prescription Match:</span>
                              <span className="text-sm font-medium">{claim.prescriptionMatch}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full" 
                                style={{ width: `${claim.prescriptionMatch}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Bill Match:</span>
                              <span className="text-sm font-medium">{claim.billMatch}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-pink-600 h-2 rounded-full" 
                                style={{ width: `${claim.billMatch}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold">AI Recommendation</h4>
                          <div className="flex items-center gap-2">
                            {claim.aiRecommendation === "Approve" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <AlertTriangle className="w-5 h-5 text-orange-600" />
                            )}
                            <span className="font-medium">{claim.aiRecommendation}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-semibold">Actions</h4>
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive">
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                            <Button size="sm" variant="outline">
                              <Clock className="w-4 h-4 mr-2" />
                              Hold
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="approved">
                <Card className="medical-shadow">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No approved claims to display</h3>
                    <p className="text-gray-600">Approved claims will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rejected">
                <Card className="medical-shadow">
                  <CardContent className="p-6 text-center">
                    <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No rejected claims to display</h3>
                    <p className="text-gray-600">Rejected claims will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="flagged">
                <Card className="medical-shadow">
                  <CardContent className="p-6 text-center">
                    <AlertTriangle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No flagged claims to display</h3>
                    <p className="text-gray-600">Claims requiring special attention will appear here</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ClaimsReview;
