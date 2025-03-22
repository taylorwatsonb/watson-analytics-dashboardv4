
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Lightbulb, TrendingUp, TrendingDown, AlertTriangle, ChevronRight } from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'success' | 'warning' | 'info' | 'action';
  impact: 'high' | 'medium' | 'low';
  actionItems?: string[];
}

interface InsightsPanelProps {
  insights: Insight[];
  isLoading?: boolean;
}

const InsightsPanel = ({ insights, isLoading = false }: InsightsPanelProps) => {
  const [expandedInsights, setExpandedInsights] = useState<string[]>([]);

  const toggleInsight = (id: string) => {
    setExpandedInsights(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const categoryIcons = {
    success: <TrendingUp className="h-4 w-4" />,
    warning: <TrendingDown className="h-4 w-4" />,
    info: <Lightbulb className="h-4 w-4" />,
    action: <AlertTriangle className="h-4 w-4" />,
  };

  const categoryColors = {
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-orange-100 text-orange-800 border-orange-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200',
    action: 'bg-purple-100 text-purple-800 border-purple-200',
  };

  const impactColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  if (isLoading) {
    return (
      <Card className="shadow-sm animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <CardTitle>Business Insights</CardTitle>
        </div>
        <CardDescription>
          Actionable recommendations based on data analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight) => (
            <div
              key={insight.id}
              className={cn(
                "p-4 border rounded-lg transition-all duration-300",
                "hover:shadow-md hover:border-primary/40",
                categoryColors[insight.category]
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full p-1.5 bg-white">
                    {categoryIcons[insight.category]}
                  </div>
                  <h3 className="font-medium">{insight.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="outline"
                    className={cn("text-xs", impactColors[insight.impact])}
                  >
                    {insight.impact} impact
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleInsight(insight.id)}
                  >
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedInsights.includes(insight.id) && "rotate-90"
                      )}
                    />
                  </Button>
                </div>
              </div>
              
              <div
                className={cn(
                  "mt-2 text-sm transition-all overflow-hidden",
                  expandedInsights.includes(insight.id)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                <p className="mb-3">{insight.description}</p>
                
                {insight.actionItems && insight.actionItems.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    <div className="mt-2">
                      <h4 className="text-sm font-medium mb-2">Recommended Actions:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {insight.actionItems.map((action, index) => (
                          <li key={index} className="text-sm">{action}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;
