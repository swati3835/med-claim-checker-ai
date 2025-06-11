import { useState } from "react";
import { FileText, Receipt, Bot, Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import UploadSection from "@/components/UploadSection";
import ProcessingResults from "@/components/ProcessingResults";

const Index = () => {
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [billFile, setBillFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePrescriptionUpload = (file: File) => {
    setPrescriptionFile(file);
    toast({
      title: "Prescription uploaded",
      description: `File "${file.name}" uploaded successfully.`,
    });
  };

  const handleBillUpload = (file: File) => {
    setBillFile(file);
    toast({
      title: "Bill uploaded", 
      description: `File "${file.name}" uploaded successfully.`,
    });
  };

  const handleProcessDocuments = async () => {
    if (!prescriptionFile && !billFile) {
      toast({
        title: "No files to process",
        description: "Please upload at least one document to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setHasProcessed(false);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setIsProcessing(false);
    setHasProcessed(true);
    
    toast({
      title: "Processing complete!",
      description: "Your documents have been analyzed successfully.",
    });
  };

  const resetProcess = () => {
    setPrescriptionFile(null);
    setBillFile(null);
    setHasProcessed(false);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <Header />
      
      {/* Admin Access Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => navigate("/admin")}
          variant="outline"
          className="gap-2 bg-white/80 backdrop-blur-sm border-purple-200 hover:bg-purple-50"
        >
          <Settings className="w-4 h-4" />
          Admin
        </Button>
      </div>
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 medical-gradient rounded-2xl flex items-center justify-center animate-float">
              <Bot className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            Smart Medical Reimbursement
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your prescriptions and bills to instantly verify medical claims with AI-powered OCR and validation
          </p>
          
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-sm font-medium">OCR Extraction</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Bot className="w-6 h-6 text-pink-600" />
              </div>
              <p className="text-sm font-medium">AI Validation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Instant Results</p>
            </div>
          </div>
        </div>

        {/* Upload Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UploadSection
            title="Upload Prescription"
            description="Upload your medical prescription for analysis"
            acceptedTypes=".pdf,.jpg,.jpeg,.png"
            onFileUpload={handlePrescriptionUpload}
            uploadedFile={prescriptionFile}
            icon={<FileText className="w-6 h-6" />}
            color="purple"
          />
          
          <UploadSection
            title="Upload Bill/Receipt"
            description="Upload your medical bill or receipt for verification"
            acceptedTypes=".pdf,.jpg,.jpeg,.png"
            onFileUpload={handleBillUpload}
            uploadedFile={billFile}
            icon={<Receipt className="w-6 h-6" />}
            color="pink"
          />
        </div>

        {/* Process Button */}
        {(prescriptionFile || billFile) && !hasProcessed && (
          <div className="flex justify-center">
            <Button
              onClick={handleProcessDocuments}
              disabled={isProcessing}
              className="medical-gradient text-white px-8 py-3 text-lg font-semibold hover:opacity-90 transition-all duration-300 medical-shadow"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Bot className="w-5 h-5 mr-2" />
                  Process Documents
                </>
              )}
            </Button>
          </div>
        )}

        {/* Processing Results */}
        <ProcessingResults 
          isProcessing={isProcessing}
          prescriptionFile={prescriptionFile}
          billFile={billFile}
        />

        {/* Reset Button */}
        {hasProcessed && (
          <div className="flex justify-center space-x-4">
            <Button onClick={resetProcess} variant="outline" className="px-6">
              Process New Documents
            </Button>
          </div>
        )}

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="text-center p-6 medical-shadow hover:scale-105 transition-transform duration-300">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Advanced OCR</h3>
              <p className="text-muted-foreground">
                Extract text from handwritten prescriptions and printed bills with 99% accuracy
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 medical-shadow hover:scale-105 transition-transform duration-300">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">AI Validation</h3>
              <p className="text-muted-foreground">
                Smart validation against medical standards and treatment protocols
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 medical-shadow hover:scale-105 transition-transform duration-300">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Instant Processing</h3>
              <p className="text-muted-foreground">
                Get results in seconds with comprehensive analysis and recommendations
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
