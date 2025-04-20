import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileCheck, AlertCircle, Activity } from "lucide-react";
import { FileUpload } from "@/components/file-upload/FileUpload";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

// This will be replaced with actual Supabase types later
type AnalysisJob = {
  id: string;
  created_at: string;
  status: "pending" | "processing" | "completed" | "failed";
  result_url?: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState({
    actuals_current: null as File | null,
    actuals_prior_month: null as File | null, 
    actuals_prior_year: null as File | null,
    budget: null as File | null
  });
  
  const [fileLabels, setFileLabels] = useState({
    actuals_current: "Current Month",
    actuals_prior_month: "Prior Month", 
    actuals_prior_year: "Prior Year",
    budget: "Budget"
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<"online" | "offline" | "checking">("checking");
  
  // Mock data - will be replaced with actual Supabase query
  const recentJobs: AnalysisJob[] = [
    { 
      id: "1", 
      created_at: "2025-04-18T14:30:00Z", 
      status: "completed", 
      result_url: "/results/1" 
    },
    { 
      id: "2", 
      created_at: "2025-04-15T10:15:00Z", 
      status: "completed", 
      result_url: "/results/2" 
    },
    { 
      id: "3", 
      created_at: "2025-04-12T16:45:00Z", 
      status: "failed" 
    }
  ];

  // Check backend health status
  useState(() => {
    const checkHealth = async () => {
      try {
        // This would be replaced with an actual API call
        // const response = await fetch('/health');
        // if (response.ok) {
        //   setBackendStatus("online");
        // } else {
        //   setBackendStatus("offline");
        // }
        
        // Mock API call for now
        setTimeout(() => {
          setBackendStatus("online");
        }, 1000);
      } catch (error) {
        setBackendStatus("offline");
      }
    };
    
    checkHealth();
  });

  const handleAnalyze = async () => {
    // Validate all files are selected
    if (!files.actuals_current || !files.actuals_prior_month || 
        !files.actuals_prior_year || !files.budget) {
      alert("Please upload all required files");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Prepare form data with files and labels
      const formData = new FormData();
      formData.append('actuals_current', files.actuals_current);
      formData.append('actuals_current_label', fileLabels.actuals_current);
      
      formData.append('actuals_prior_month', files.actuals_prior_month);
      formData.append('actuals_prior_month_label', fileLabels.actuals_prior_month);
      
      formData.append('actuals_prior_year', files.actuals_prior_year);
      formData.append('actuals_prior_year_label', fileLabels.actuals_prior_year);
      
      formData.append('budget', files.budget);
      formData.append('budget_label', fileLabels.budget);
      
      // Mock API call - will be replaced with actual implementation
      console.log("Uploading files with labels:", { files, fileLabels });
      
      // This would be the actual API call
      // const response = await fetch('/extract', {
      //   method: 'POST',
      //   headers: {
      //     'x-api-key': 'YOUR_API_KEY' // This would be securely stored
      //   },
      //   body: formData
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to upload files');
      // }
      
      // const data = await response.json();
      // console.log("API response:", data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // After extraction, call calculate_noi endpoint
      // const noiResponse = await fetch('/calculate_noi', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + supabaseToken
      //   },
      //   body: JSON.stringify({ job_id: data.job_id })
      // });
      
      // Generate insights
      // const insightsResponse = await fetch('/generate_insights', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + supabaseToken
      //   },
      //   body: JSON.stringify({ job_id: data.job_id })
      // });
      
      // Navigate to results page
      navigate("/results");
    } catch (error) {
      console.error("Error analyzing files:", error);
      alert("An error occurred while analyzing files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const getStatusBadge = (status: AnalysisJob["status"]) => {
    switch (status) {
      case "completed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success text-success-foreground">Completed</span>;
      case "processing":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning text-warning-foreground">Processing</span>;
      case "pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-info text-info-foreground">Pending</span>;
      case "failed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-destructive text-destructive-foreground">Failed</span>;
      default:
        return null;
    }
  };

  return (
    <AppLayout isAuthenticated={true}>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">API Status:</span>
            {backendStatus === "checking" ? (
              <span className="flex items-center text-sm text-gray-500">
                <Activity className="h-4 w-4 mr-1 animate-pulse" />
                Checking...
              </span>
            ) : backendStatus === "online" ? (
              <span className="flex items-center text-sm text-success-foreground">
                <div className="h-2 w-2 rounded-full bg-success mr-1"></div>
                Online
              </span>
            ) : (
              <span className="flex items-center text-sm text-destructive">
                <div className="h-2 w-2 rounded-full bg-destructive mr-1"></div>
                Offline
              </span>
            )}
          </div>
        </div>
        
        {backendStatus === "offline" && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              The API service is currently unavailable. Some features may not work properly.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="upload" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="history">Analysis History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>NOI Analysis</CardTitle>
                <CardDescription>
                  Upload your financial documents to analyze Net Operating Income
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUpload
                    id="actuals_current"
                    label="Current Month Actuals"
                    value={files.actuals_current}
                    onChange={(file) => setFiles(prev => ({ ...prev, actuals_current: file }))}
                    allowLabeling={true}
                    fileLabel={fileLabels.actuals_current}
                    onLabelChange={(label) => setFileLabels(prev => ({ ...prev, actuals_current: label }))}
                  />
                  
                  <FileUpload
                    id="actuals_prior_month"
                    label="Prior Month Actuals"
                    value={files.actuals_prior_month}
                    onChange={(file) => setFiles(prev => ({ ...prev, actuals_prior_month: file }))}
                    allowLabeling={true}
                    fileLabel={fileLabels.actuals_prior_month}
                    onLabelChange={(label) => setFileLabels(prev => ({ ...prev, actuals_prior_month: label }))}
                  />
                  
                  <FileUpload
                    id="actuals_prior_year"
                    label="Prior Year Same Month"
                    value={files.actuals_prior_year}
                    onChange={(file) => setFiles(prev => ({ ...prev, actuals_prior_year: file }))}
                    allowLabeling={true}
                    fileLabel={fileLabels.actuals_prior_year}
                    onLabelChange={(label) => setFileLabels(prev => ({ ...prev, actuals_prior_year: label }))}
                  />
                  
                  <FileUpload
                    id="budget"
                    label="Current Month Budget"
                    value={files.budget}
                    onChange={(file) => setFiles(prev => ({ ...prev, budget: file }))}
                    allowLabeling={true}
                    fileLabel={fileLabels.budget}
                    onLabelChange={(label) => setFileLabels(prev => ({ ...prev, budget: label }))}
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    disabled={
                      isUploading || 
                      !files.actuals_current || 
                      !files.actuals_prior_month || 
                      !files.actuals_prior_year || 
                      !files.budget ||
                      backendStatus === "offline"
                    }
                    onClick={handleAnalyze}
                    className="flex items-center gap-2"
                  >
                    {isUploading ? "Processing..." : "Analyze NOI"}
                    {!isUploading && <Upload className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Analysis History</CardTitle>
                <CardDescription>
                  View your previous NOI analyses
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentJobs.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No analysis jobs found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentJobs.map((job) => (
                      <div 
                        key={job.id} 
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {job.status === "completed" ? (
                              <FileCheck className="h-6 w-6 text-success-foreground" />
                            ) : job.status === "failed" ? (
                              <AlertCircle className="h-6 w-6 text-destructive" />
                            ) : (
                              <FileCheck className="h-6 w-6 text-info-foreground" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Analysis #{job.id}</h4>
                            <p className="text-xs text-gray-500">{formatDate(job.created_at)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {getStatusBadge(job.status)}
                          {job.status === "completed" && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => navigate(`/results/${job.id}`)}
                            >
                              View
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
