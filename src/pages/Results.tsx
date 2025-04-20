import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Download, ArrowUpFromLine, ArrowDownFromLine, ChevronRight } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data - will be replaced with actual API response
const mockResult = {
  id: "1",
  property_name: "City View Apartments",
  analysis_date: "2025-04-19T10:30:00Z",
  noi: {
    current: 52480,
    prior_month: 50750,
    prior_year: 53000,
    budget: 53000
  },
  variances: {
    vs_prior_month: 3.4,
    vs_prior_year: -1.0,
    vs_budget: -1.0
  },
  income: {
    current: 345000,
    prior_month: 340000,
    prior_year: 312000,
    budget: 350000
  },
  expenses: {
    current: 88200,
    prior_month: 97500,
    prior_year: 81800,
    budget: 90000
  },
  summary: "The Net Operating Income (NOI) for City View Apartments has improved by 3.4% compared to the prior month but is 1.0% below both the budgeted target and the same month last year. The positive variance against the prior month is primarily driven by a 1.5% increase in rental income and a 9.5% decrease in operating expenses compared to the prior month. Utility costs were significantly lower than the previous month but trending slightly higher than budgeted. Maintenance expenses were successfully kept below both historical and budgeted levels.",
  pdf_url: "https://example.com/reports/1.pdf",
  detailed_categories: [
    {
      name: "Rental Income",
      current: 325000,
      prior_month: 320000,
      prior_year: 292000,
      budget: 330000,
    },
    {
      name: "Other Income",
      current: 20000,
      prior_month: 20000,
      prior_year: 20000,
      budget: 20000,
    },
    {
      name: "Utilities",
      current: 25000,
      prior_month: 28000,
      prior_year: 22000,
      budget: 24000,
      expense: true
    },
    {
      name: "Maintenance",
      current: 18200,
      prior_month: 21500,
      prior_year: 16800,
      budget: 19000,
      expense: true
    },
    {
      name: "Administrative",
      current: 15000,
      prior_month: 15000,
      prior_year: 14000,
      budget: 15000,
      expense: true
    },
    {
      name: "Insurance",
      current: 12000,
      prior_month: 12000,
      prior_year: 11000,
      budget: 12000,
      expense: true
    },
    {
      name: "Property Taxes",
      current: 18000,
      prior_month: 18000,
      prior_year: 18000,
      budget: 18000,
      expense: true
    },
  ]
};

// Chart data preparation
const prepareChartData = (data: typeof mockResult) => {
  return [
    { name: "Current", NOI: data.noi.current, Income: data.income.current, Expenses: data.expenses.current },
    { name: "Prior Month", NOI: data.noi.prior_month, Income: data.income.prior_month, Expenses: data.expenses.prior_month },
    { name: "Prior Year", NOI: data.noi.prior_year, Income: data.income.prior_year, Expenses: data.expenses.prior_year },
    { name: "Budget", NOI: data.noi.budget, Income: data.income.budget, Expenses: data.expenses.budget }
  ];
};

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
};

// Format percentage
const formatPercentage = (value: number) => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<typeof mockResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock API call - will be replaced with actual Supabase query
    const fetchResult = async () => {
      try {
        setIsLoading(true);
        // This would be the actual API call
        // const token = await getAuthToken();
        // const response = await fetch(`/api/results/${id}`, {
        //   headers: {
        //     'Authorization': `Bearer ${token}`
        //   }
        // });
        // if (!response.ok) {
        //   throw new Error('Failed to fetch results');
        // }
        // const data = await response.json();
        // setResult(data);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data for now
        setResult(mockResult);
      } catch (error) {
        console.error("Error fetching result:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (isLoading) {
    return (
      <AppLayout isAuthenticated={true}>
        <div className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[500px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Loading analysis results...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!result) {
    return (
      <AppLayout isAuthenticated={true}>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Analysis Not Found</h2>
            <p className="text-gray-500 mb-6">The requested analysis could not be found or has been deleted.</p>
            <Button onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const chartData = prepareChartData(result);

  return (
    <AppLayout isAuthenticated={true}>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{result.property_name}</h1>
            <p className="text-gray-500">
              Analysis from {new Date(result.analysis_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <a href={result.pdf_url} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" />
              Download PDF Report
            </a>
          </Button>
        </div>

        {/* NOI Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Net Operating Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div className="text-right font-medium text-gray-600">CURRENT</div>
              <div className="text-right font-medium text-gray-600">PREVIOUS</div>
            </div>
            
            <div className="space-y-0">
              <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100">
                <div className="text-left text-gray-600">Month vs. prior month</div>
                <div className="text-right font-mono font-bold text-gray-900">{formatCurrency(result.noi.current)}</div>
                <div className="text-right">
                  <span className="font-mono font-bold text-gray-900">{formatCurrency(result.noi.prior_month)}</span>
                  <div className={result.variances.vs_prior_month >= 0 ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                    {formatPercentage(result.variances.vs_prior_month)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-100">
                <div className="text-left text-gray-600">Actual vs. budget</div>
                <div className="text-right font-mono font-bold text-gray-900">{formatCurrency(result.noi.current)}</div>
                <div className="text-right">
                  <span className="font-mono font-bold text-gray-900">{formatCurrency(result.noi.budget)}</span>
                  <div className={result.variances.vs_budget >= 0 ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                    {formatPercentage(result.variances.vs_budget)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 p-6">
                <div className="text-left text-gray-600">Actual vs. Prior Year</div>
                <div className="text-right font-mono font-bold text-gray-900">{formatCurrency(result.noi.current)}</div>
                <div className="text-right">
                  <span className="font-mono font-bold text-gray-900">{formatCurrency(result.noi.prior_year)}</span>
                  <div className={result.variances.vs_prior_year >= 0 ? "text-emerald-600 font-medium" : "text-red-600 font-medium"}>
                    {formatPercentage(result.variances.vs_prior_year)}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI-Generated Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{result.summary}</p>
          </CardContent>
        </Card>

        {/* Charts & Tables */}
        <Tabs defaultValue="chart" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle>NOI Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                      />
                      <Legend />
                      <Bar dataKey="NOI" fill="#2563eb" />
                      <Bar dataKey="Income" fill="#16a34a" />
                      <Bar dataKey="Expenses" fill="#ef4444" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="table">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Category</th>
                        <th className="text-right py-2 px-4">Current</th>
                        <th className="text-right py-2 px-4">Prior Month</th>
                        <th className="text-right py-2 px-4">Prior Year</th>
                        <th className="text-right py-2 px-4">Budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-muted/50 font-semibold">
                        <td className="py-2 px-4">Total Income</td>
                        <td className="text-right py-2 px-4">{formatCurrency(result.income.current)}</td>
                        <td className="text-right py-2 px-4">{formatCurrency(result.income.prior_month)}</td>
                        <td className="text-right py-2 px-4">{formatCurrency(result.income.prior_year)}</td>
                        <td className="text-right py-2 px-4">{formatCurrency(result.income.budget)}</td>
                      </tr>
                      
                      {result.detailed_categories
                        .filter(cat => !cat.expense)
                        .map((category, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 px-4 pl-8 flex items-center">
                              <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                              {category.name}
                            </td>
                            <td className="text-right py-2 px-4">{formatCurrency(category.current)}</td>
                            <td className="text-right py-2 px-4">{formatCurrency(category.prior_month)}</td>
                            <td className="text-right py-2 px-4">{formatCurrency(category.prior_year)}</td>
                            <td className="text-right py-2 px-4">{formatCurrency(category.budget)}</td>
                          </tr>
                        ))}
                      
                      <tr className="bg-muted/50 font-semibold">
                        <td className="py-2 px-4">Total Expenses</td>
                        <td className="text-right py-2 px-4">{formatCurrency(result.expenses.current)}</td>
                        <td className="text-right py-2 px-4">{formatCurrency(result.expenses.prior_month)}</td>
                        <td className="text-right py-2 px-4">{formatCurrency(result.expenses.prior_year)}</td>
                        <td className="text-right py-2 px-4">{formatCurrency(result.expenses.budget)}</td>
                      </tr>
                      
                      {result.detailed_categories
                        .filter(cat => cat.expense)
                        .map((category, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2 px-4 pl-8 flex items-center">
                              <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                              {category.name}
                            </td>
                            <td className="text-right py-2 px-4">{formatCurrency(category.current)}</td>
                            <td className="text-right py-2 px-4">{formatCurrency(category.prior_month)}</td>
                            <td className="text-right py-2 px-4">{formatCurrency(category.prior_year)}</td>
                            <td className="text-right py-2 px-4">{formatCurrency(category.budget)}</td>
                          </tr>
                        ))}
                      
                      <tr className="bg-primary/10 font-bold">
                        <td className="py-3 px-4">Net Operating Income (NOI)</td>
                        <td className="text-right py-3 px-4">{formatCurrency(result.noi.current)}</td>
                        <td className="text-right py-3 px-4">{formatCurrency(result.noi.prior_month)}</td>
                        <td className="text-right py-3 px-4">{formatCurrency(result.noi.prior_year)}</td>
                        <td className="text-right py-3 px-4">{formatCurrency(result.noi.budget)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Results;
