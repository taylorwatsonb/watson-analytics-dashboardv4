
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: ReactNode;
  color?: string;
  tooltip?: string;
  isLoading?: boolean;
}

const MetricsCard = ({
  title,
  value,
  change,
  trend = 'neutral',
  icon,
  color = 'blue',
  tooltip,
  isLoading = false,
}: MetricsCardProps) => {
  const colorClasses = {
    blue: 'bg-visualization-blue-light text-visualization-blue',
    indigo: 'bg-visualization-indigo-light text-visualization-indigo',
    purple: 'bg-visualization-purple-light text-visualization-purple',
    pink: 'bg-visualization-pink-light text-visualization-pink',
    red: 'bg-visualization-red-light text-visualization-red',
    orange: 'bg-visualization-orange-light text-visualization-orange',
    yellow: 'bg-visualization-yellow-light text-visualization-yellow',
    green: 'bg-visualization-green-light text-visualization-green',
    teal: 'bg-visualization-teal-light text-visualization-teal',
    cyan: 'bg-visualization-cyan-light text-visualization-cyan',
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  if (isLoading) {
    return (
      <div className="metric-card animate-pulse">
        <div className="flex items-center justify-between mb-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className={cn(
      "metric-card overflow-hidden",
      "animate-fade-in"
    )}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {icon && (
          <div className={cn("p-2 rounded-full", colorClasses[color as keyof typeof colorClasses])}>
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex flex-col">
        <span className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
          {value}
        </span>
        
        {change !== undefined && (
          <div className={cn("flex items-center text-sm", trendColors[trend])}>
            {trend === 'up' ? (
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
            ) : trend === 'down' ? (
              <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
            ) : null}
            <span>
              {change > 0 ? '+' : ''}{change}%
              <span className="text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
