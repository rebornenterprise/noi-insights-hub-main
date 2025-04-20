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

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // This would be the actual Supabase authentication implementation
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      
      // if (error) {
      //   throw error;
      // }
      
      // Store the JWT token for API requests
      // localStorage.setItem('supabase.auth.token', data.session.access_token);
      
      // Mock successful login for now
      console.log("Login attempt with:", { email, password });
      
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials and try again.");
      console.error("Login error:", err);
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
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {error && (
                <div className="p-3 text-sm text-destructive-foreground bg-destructive/20 rounded-md">
                  {error}
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Login;
