
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
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
              We've sent you a verification link to complete your registration
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-gray-500">
              Please check your inbox and click on the link to verify your email address.
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
            <Button variant="link" className="text-primary hover:underline">
              Resend verification email
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default VerifyEmail;
