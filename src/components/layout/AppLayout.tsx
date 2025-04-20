
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

export function AppLayout({ children, isAuthenticated = false }: AppLayoutProps) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col dark">
      <header className="bg-zinc-900/95 border-b border-white/10 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/b727830e-7960-490f-acb2-aa2710bd72d1.png" 
              alt="NOI Logo" 
              className="h-14 w-auto"
            />
            <img 
              src="/lovable-uploads/0bf50a81-2365-42a8-b348-c6b757c767e1.png" 
              alt="REBORN Logo" 
              className="h-12 w-auto"
            />
          </Link>
          
          <nav className="flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm font-medium tracking-wide ${
                    location.pathname === '/dashboard' 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white transition-colors'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/results" 
                  className={`text-sm font-medium tracking-wide ${
                    location.pathname === '/results' 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white transition-colors'
                  }`}
                >
                  Results
                </Link>
                <Link 
                  to="/settings" 
                  className={`text-sm font-medium tracking-wide ${
                    location.pathname === '/settings' 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white transition-colors'
                  }`}
                >
                  Settings
                </Link>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-8">
                <Link 
                  to="/login" 
                  className="text-sm font-medium tracking-wide text-gray-400 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="tracking-wide bg-white text-zinc-900 hover:bg-gray-100" 
                  asChild
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground tracking-wide">
          <p>© {new Date().getFullYear()} NOI Insights Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
