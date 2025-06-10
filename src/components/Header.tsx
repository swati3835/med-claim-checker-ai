
import { FileText, Shield, CheckCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-white/80 backdrop-blur-md border-b border-purple-200 sticky top-0 z-50">
      <div className="absolute inset-0 medical-gradient opacity-5"></div>
      <div className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center animate-pulse-glow">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MediClaim Verify
              </h1>
              <p className="text-sm text-muted-foreground">Smart Medical Reimbursement Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>OCR Extraction</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4" />
              <span>AI Validation</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Secure Processing</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
