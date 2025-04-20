
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      // Will implement Supabase auth later
      console.log("Reset password for:", email);
      
      // Mock successful submission
      setTimeout(() => {
        setIsSubmitted(true);
      }, 1000);
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      console.error("Reset password error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <AppLayout>
        <div className="container max-w-md mx-auto py-12 px-4">
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex justify-center mb-4">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl text-center">Check your email</CardTitle>
              <CardDescription className="text-center">
                We've sent you a link to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-gray-500">
                Please check your inbox and click on the link to reset your password.
                If you don't see the email, check your spam folder.
              </p>
              
              <Button variant="outline" className="mt-4" asChild>
                <Link to="/login">Return to Login</Link>
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 text-center">
              <p className="text-sm text-gray-500">
                Didn't receive an email?
              </p>
              <Button 
                variant="link" 
                className="text-primary hover:underline"
                onClick={() => setIsSubmitted(false)}
              >
                Try again
              </Button>
            </CardFooter>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Enter your email address and we'll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {error && (
                <div className="p-3 text-sm text-destructive-foreground bg-destructive/20 rounded-md">
                  {error}
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Remember your password?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Back to login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ForgotPassword;
