
import { useState } from "react";
import { Search, Filter, Download, Eye, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminSidebar from "@/components/AdminSidebar";
import AdminHeader from "@/components/AdminHeader";

const DocumentManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const documents = [
    {
      id: "DOC-001",
      patientName: "John Doe",
      type: "Prescription",
      uploadDate: "2024-01-15",
      status: "Verified",
      ocrStatus: "Completed",
      fileSize: "2.4 MB"
    },
    {
      id: "DOC-002",
      patientName: "Jane Smith",
      type: "Bill",
      uploadDate: "2024-01-14",
      status: "Pending",
      ocrStatus: "Processing",
      fileSize: "1.8 MB"
    },
    {
      id: "DOC-003",
      patientName: "Mike Johnson",
      type: "Prescription",
      uploadDate: "2024-01-13",
      status: "Rejected",
      ocrStatus: "Failed",
      fileSize: "3.1 MB"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="flex">
        <AdminSidebar isOpen={sidebarOpen} />
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <AdminHeader 
            title="Document Management" 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <main className="p-6">
            <Card className="medical-shadow">
              <CardHeader>
                <CardTitle>All Documents</CardTitle>
                <CardDescription>
                  Manage uploaded prescriptions and bills
                </CardDescription>
                <div className="flex gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document ID</TableHead>
                      <TableHead>Patient Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>OCR Status</TableHead>
                      <TableHead>File Size</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-mono">{doc.id}</TableCell>
                        <TableCell>{doc.patientName}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.uploadDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{doc.ocrStatus}</TableCell>
                        <TableCell>{doc.fileSize}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;
