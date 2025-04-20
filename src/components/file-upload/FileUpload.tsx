import { useState } from "react";
import { FileUp, FileCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FileUploadProps {
  id: string;
  label: string;
  onChange: (file: File | null) => void;
  value: File | null;
  accept?: string;
  allowLabeling?: boolean;
  fileLabel?: string;
  onLabelChange?: (label: string) => void;
}

export function FileUpload({ 
  id, 
  label, 
  onChange, 
  value, 
  accept = ".pdf,.xlsx,.csv,.xls,.txt", 
  allowLabeling = false,
  fileLabel = "",
  onLabelChange
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0]);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onChange(null);
    if (onLabelChange) {
      onLabelChange("");
    }
  };

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onLabelChange) {
      onLabelChange(e.target.value);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{label}</h3>
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors relative
          ${isDragging ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          id={id} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
          accept={accept}
        />
        {value ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <FileCheck className="h-5 w-5 text-success-foreground" />
              <span className="text-sm font-medium truncate max-w-[200px]">
                {value.name}
              </span>
              <button 
                onClick={handleReset}
                className="text-xs text-gray-500 hover:text-destructive ml-2"
              >
                (Reset)
              </button>
            </div>
            
            {allowLabeling && (
              <div className="w-full max-w-xs">
                <Label htmlFor={`${id}-label`} className="text-xs text-gray-500">
                  Label this document (e.g., "Current Month", "Budget")
                </Label>
                <Input
                  id={`${id}-label`}
                  value={fileLabel}
                  onChange={handleLabelChange}
                  placeholder="Enter document label"
                  className="mt-1 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <FileUp className="h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-500">
              Drop file or click to browse
            </span>
            <span className="text-xs text-gray-400">
              Supported formats: PDF, Excel, CSV, TXT
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
