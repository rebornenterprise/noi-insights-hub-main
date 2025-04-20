import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// This would be replaced with actual Supabase client
// import { supabase } from '@/lib/supabase';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // This would be the actual Supabase authentication implementation
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: {
      //     data: {
      //       full_name: name,
      //     }
      //   }
      // });
      
      // if (error) {
      //   throw error;
      // }
      
      // Mock successful signup for now
      console.log("Signup attempt with:", { email, password, name });
      
      toast({
        title: "Account created",
        description: "Please check your email to verify your account.",
      });
      
      setTimeout(() => {
        navigate("/verify-email");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Building2 className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your information to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              {error && (
                <div className="p-3 text-sm text-destructive-foreground bg-destructive/20 rounded-md">
                  {error}
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Signup;
