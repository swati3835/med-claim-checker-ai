
import { useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, FileText, Stethoscope, Receipt } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface ProcessingResultsProps {
  isProcessing: boolean;
  prescriptionFile?: File | null;
  billFile?: File | null;
}

const ProcessingResults = ({ isProcessing, prescriptionFile, billFile }: ProcessingResultsProps) => {
  const [processingProgress, setProcessingProgress] = useState(0);

  // Simulate processing progress
  React.useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(interval);
    } else {
      setProcessingProgress(0);
    }
  }, [isProcessing]);

  // Mock results data
  const ocrResults = {
    prescription: {
      patientName: "John Doe",
      doctorName: "Dr. Smith",
      date: "2024-01-15",
      medications: ["Amoxicillin 500mg", "Paracetamol 650mg"],
      tests: ["Blood Sugar", "Lipid Profile", "Complete Blood Count"]
    },
    bill: {
      hospitalName: "City Medical Center",
      billDate: "2024-01-20",
      totalAmount: "$285.50",
      tests: ["Blood Sugar Test", "Lipid Profile", "CBC Test"],
      medications: ["Amoxicillin", "Paracetamol"]
    }
  };

  const validationResults = {
    prescriptionValid: true,
    testsMatch: true,
    medicationsMatch: true,
    amountReasonable: true,
    overallScore: 95
  };

  if (isProcessing) {
    return (
      <Card className="medical-shadow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-6 h-6 animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
            <span>Processing Documents...</span>
          </CardTitle>
          <CardDescription>
            Extracting text and validating against medical standards
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{processingProgress}%</span>
            </div>
            <Progress value={processingProgress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium">OCR Extraction</p>
              <p className="text-xs text-muted-foreground">Reading document content</p>
            </div>
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <Stethoscope className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Medical Validation</p>
              <p className="text-xs text-muted-foreground">Checking prescriptions</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Receipt className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Bill Verification</p>
              <p className="text-xs text-muted-foreground">Matching claims</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prescriptionFile && !billFile) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Overall Validation Score */}
      <Card className="medical-shadow border-2 border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-green-700">Validation Complete</CardTitle>
                <CardDescription>Overall compliance score: {validationResults.overallScore}%</CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700 text-lg px-4 py-2">
              {validationResults.overallScore}% Match
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Detailed Results */}
      <Tabs defaultValue="ocr" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ocr">OCR Results</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="ocr" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prescriptionFile && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <span>Prescription Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p><strong>Patient:</strong> {ocrResults.prescription.patientName}</p>
                    <p><strong>Doctor:</strong> {ocrResults.prescription.doctorName}</p>
                    <p><strong>Date:</strong> {ocrResults.prescription.date}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Medications:</p>
                    <ul className="space-y-1">
                      {ocrResults.prescription.medications.map((med, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Badge variant="outline">{med}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Prescribed Tests:</p>
                    <ul className="space-y-1">
                      {ocrResults.prescription.tests.map((test, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-purple-50">{test}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {billFile && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Receipt className="w-5 h-5 text-pink-600" />
                    <span>Bill Data</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p><strong>Hospital:</strong> {ocrResults.bill.hospitalName}</p>
                    <p><strong>Date:</strong> {ocrResults.bill.billDate}</p>
                    <p><strong>Total:</strong> {ocrResults.bill.totalAmount}</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Tests Performed:</p>
                    <ul className="space-y-1">
                      {ocrResults.bill.tests.map((test, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-pink-50">{test}</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Validation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Tests vs Standard Treatment</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">Valid</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Medication Dosage</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">Appropriate</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Test Necessity</span>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="text-yellow-600 font-medium">Review Needed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bill Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Tests Match Prescription</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">100% Match</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pricing Reasonable</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">Within Range</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>No Duplicate Charges</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-600 font-medium">Verified</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-700">AI Recommendations</CardTitle>
              <CardDescription>Suggestions for improved medical care and cost optimization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700">Approved for Reimbursement</span>
                  </div>
                  <p className="text-sm text-green-600">
                    All prescribed tests are medically justified and bill amounts are reasonable.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-blue-700">Cost Optimization</span>
                  </div>
                  <p className="text-sm text-blue-600">
                    Consider generic alternatives for medications to reduce costs by ~30%.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Stethoscope className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-700">Medical Advice</span>
                  </div>
                  <p className="text-sm text-purple-600">
                    Follow-up blood work recommended in 3 months to monitor treatment effectiveness.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProcessingResults;
