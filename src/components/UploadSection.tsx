
import { useState } from "react";
import { Upload, FileText, Image, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UploadSectionProps {
  title: string;
  description: string;
  acceptedTypes: string;
  onFileUpload: (file: File) => void;
  uploadedFile?: File | null;
  icon: React.ReactNode;
  color: "purple" | "pink";
}

const UploadSection = ({ 
  title, 
  description, 
  acceptedTypes, 
  onFileUpload, 
  uploadedFile, 
  icon,
  color 
}: UploadSectionProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileUpload(files[0]);
    }
  };

  const gradientClass = color === "purple" 
    ? "from-purple-500 to-purple-600" 
    : "from-pink-500 to-pink-600";

  const borderClass = color === "purple" 
    ? "border-purple-300" 
    : "border-pink-300";

  return (
    <Card className={`medical-shadow transition-all duration-300 hover:scale-105 ${uploadedFile ? 'ring-2 ring-green-400' : ''}`}>
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-r ${gradientClass} rounded-lg flex items-center justify-center text-white`}>
            {icon}
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
            ${isDragOver ? `${borderClass} bg-opacity-10` : 'border-gray-300'}
            ${uploadedFile ? 'border-green-400 bg-green-50' : 'hover:border-purple-400'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept={acceptedTypes}
            onChange={handleFileSelect}
          />
          
          {uploadedFile ? (
            <div className="space-y-3">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-700">{uploadedFile.name}</p>
                <p className="text-sm text-green-600">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                  Ready for Processing
                </Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700">
                  Drop your file here or click to browse
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supports: {acceptedTypes}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Maximum file size: 10MB
                </p>
              </div>
              <Button variant="outline" className="mt-4">
                <Image className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          )}
        </div>
        
        {uploadedFile && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <p className="text-sm text-blue-700">
                File uploaded successfully. Click "Process Documents" to continue.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadSection;
