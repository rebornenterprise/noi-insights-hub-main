
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreditCard, User, Building2 } from "lucide-react";

const Settings = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Mock subscription data - will be replaced with actual Stripe data
  const subscription = {
    plan: "basic",
    status: "active",
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    analysisCount: 3,
    maxAnalyses: 5
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    
    try {
      // Mock API call - will be replaced with actual Supabase update
      console.log("Updating profile:", { name, email });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast or message
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "basic":
        return <Badge variant="outline" className="ml-2">Basic</Badge>;
      case "pro":
        return <Badge className="ml-2 bg-primary">Pro</Badge>;
      default:
        return null;
    }
  };

  return (
    <AppLayout isAuthenticated={true}>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="billing">Subscription</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span>Subscription Plan</span>
                  {getPlanBadge(subscription.plan)}
                </CardTitle>
                <CardDescription>
                  Manage your subscription and billing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <User className="mr-2 h-5 w-5 text-primary" />
                        Basic Plan
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          Up to 5 analyses per month
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          Standard PDF reports
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          Email support
                        </li>
                      </ul>
                      <div className="mt-4">
                        <p className="text-gray-500 text-sm">
                          <strong>Price:</strong> Free
                        </p>
                      </div>
                      {subscription.plan === "basic" ? (
                        <Badge variant="outline" className="mt-4">Current Plan</Badge>
                      ) : (
                        <Button variant="outline" className="mt-4" size="sm">
                          Downgrade
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-primary rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Building2 className="mr-2 h-5 w-5 text-primary" />
                        Pro Plan
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          Unlimited analyses
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          Advanced PDF reports with branding
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          Priority support
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">•</span>
                          Data export options
                        </li>
                      </ul>
                      <div className="mt-4">
                        <p className="text-gray-500 text-sm">
                          <strong>Price:</strong> $49/month
                        </p>
                      </div>
                      {subscription.plan === "pro" ? (
                        <Badge className="mt-4 bg-primary">Current Plan</Badge>
                      ) : (
                        <Button className="mt-4" size="sm">
                          Upgrade
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Current Usage</h3>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Analyses Used</span>
                      <span className="font-medium">
                        {subscription.analysisCount} / {subscription.maxAnalyses === -1 ? '∞' : subscription.maxAnalyses}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ 
                          width: subscription.maxAnalyses === -1 
                            ? '10%' // Show minimal progress for unlimited plan
                            : `${(subscription.analysisCount / subscription.maxAnalyses) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                      Your current billing period ends on {subscription.currentPeriodEnd.toLocaleDateString()}.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Payment Method</h3>
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-2">
                <p className="text-sm text-gray-500">
                  Need help with your subscription? <a href="#" className="text-primary hover:underline">Contact support</a>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Settings;
