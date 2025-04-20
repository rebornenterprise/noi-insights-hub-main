import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Landing = () => {
  return <AppLayout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-b from-background to-background/95">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl mb-8 leading-tight tracking-tight text-primary font-bold">
              Analyze Net Operating Income
            </h1>
            <p className="text-xl md:text-2xl mb-10 tracking-wide text-neutral-200">
              Compare month vs. prior month, actual vs. budget, actual vs. prior year
            </p>
            <Button size="lg" className="text-lg px-10 py-6 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all shadow-lg" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
          
          <Card className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="mb-8 tracking-wide text-gray-900 font-semibold text-3xl">Net Operating Income</h2>
            
            <div className="flex justify-between mb-4">
              <div className="text-right font-medium text-gray-600">CURRENT</div>
              <div className="text-right font-medium text-gray-600">PREVIOUS</div>
            </div>
            
            <div className="space-y-0">
              <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100">
                <div className="text-left text-gray-600">Month vs. prior month</div>
                <div className="text-right font-mono font-bold text-gray-900">$52,480</div>
                <div className="text-right">
                  <span className="font-mono font-bold text-gray-900">$50,750</span>
                  <div className="text-emerald-600 font-medium">+3,4%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100">
                <div className="text-left text-gray-600">Actual vs. budget</div>
                <div className="text-right font-mono font-bold text-gray-900">$52,480</div>
                <div className="text-right">
                  <span className="font-mono font-bold text-gray-900">$53,000</span>
                  <div className="text-red-600 font-medium">-1,0%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="text-left text-gray-600">Actual vs. Prior Year</div>
                <div className="text-right font-mono font-bold text-gray-900">$52,480</div>
                <div className="text-right">
                  <span className="font-mono font-bold text-gray-900">$53,000</span>
                  <div className="text-emerald-600 font-medium">+3,4%</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background/95">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 tracking-tight text-neutral-50">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all bg-neutral-50">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 bg-neutral-950">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path>
                </svg>
              </div>
              <h3 className="text-xl mb-4 tracking-tight font-semibold text-neutral-950">Document Upload</h3>
              <p className="text-neutral-950">
                Upload your financial documents (PDF, Excel, CSV, TXT) with simple labeling for analysis.
              </p>
            </div>
            
            <div className="rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all bg-neutral-50">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 bg-neutral-950">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary">
                  <path d="M3 3v18h18"></path>
                  <path d="M18 17V9"></path>
                  <path d="M13 17V5"></path>
                  <path d="M8 17v-3"></path>
                </svg>
              </div>
              <h3 className="text-xl mb-4 tracking-tight font-semibold text-neutral-950">Advanced Analytics</h3>
              <p className="text-neutral-950">
                Get detailed variance analysis comparing current performance against prior periods and budget.
              </p>
            </div>
            
            <div className="rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-all bg-neutral-50">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 bg-neutral-950">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-primary">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" x2="12" y1="15" y2="3"></line>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 tracking-tight text-neutral-950">AI Insights</h3>
              <p className="text-neutral-950">
                Receive AI-generated insights and recommendations based on your financial data analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6 tracking-tight text-neutral-50">Ready to optimize your financial analysis?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto tracking-wide text-neutral-50">
            Join hundreds of real estate accountants already saving time and generating better insights.
          </p>
          <div className="flex gap-6 justify-center">
            <Button variant="outline" size="lg" className="font-medium tracking-wide" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button size="lg" className="font-medium tracking-wide" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>;
};
export default Landing;
