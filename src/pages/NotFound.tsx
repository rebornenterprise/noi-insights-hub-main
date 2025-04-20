import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">The page you are looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
