
import { useState, useEffect } from 'react';
import { Activity, ArrowUpRight, Users, DollarSign, ShoppingCart, Percent } from 'lucide-react';
import MetricsCard from './MetricsCard';
import FilterBar from './FilterBar';
import ChartSection from './ChartSection';
import InsightsPanel from './InsightsPanel';
import DataTable from './DataTable';
import ExportOptions from './ExportOptions';
import { useToast } from '@/components/ui/use-toast';
import { generateMockData } from '@/utils/data';

interface DashboardProps {
  className?: string;
}

const Dashboard = ({ className }: DashboardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>({
    metrics: [],
    chart: [],
    insights: [],
    tableData: [],
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      // Simulate API loading
      setIsLoading(true);
      try {
        // Generate mock data
        const mockData = generateMockData();
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setData(mockData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleFilterChange = (filters: any) => {
    // In a real app, this would filter the data based on the selected filters
    console.log('Filters changed:', filters);
    
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      // Generate new filtered mock data
      const mockData = generateMockData();
      setData(mockData);
      setIsLoading(false);
    }, 500);
  };

  const handleExport = (format: string, options: any) => {
    console.log('Exporting in format:', format, 'with options:', options);
    // In a real app, this would generate and download a report
  };

  const tableColumns = [
    {
      key: 'date',
      header: 'Date',
      sortable: true,
    },
    {
      key: 'product',
      header: 'Product',
      sortable: true,
    },
    {
      key: 'revenue',
      header: 'Revenue',
      sortable: true,
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      key: 'units',
      header: 'Units',
      sortable: true,
      render: (value: number) => value.toLocaleString(),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: string) => {
        const statusColors: Record<string, string> = {
          completed: 'bg-green-100 text-green-800',
          pending: 'bg-yellow-100 text-yellow-800',
          failed: 'bg-red-100 text-red-800',
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[value] || ''}`}>
            {value}
          </span>
        );
      },
    },
  ];

  return (
    <div className={className}>
      <div className="space-y-6">
        <FilterBar onFilterChange={handleFilterChange} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricsCard
            title="Total Revenue"
            value={`$${data.metrics.totalRevenue?.toLocaleString() || '0'}`}
            change={data.metrics.revenueChange}
            trend={data.metrics.revenueChange >= 0 ? 'up' : 'down'}
            icon={<DollarSign className="h-4 w-4" />}
            color="blue"
            tooltip="Total revenue across all products and channels"
            isLoading={isLoading}
          />
          <MetricsCard
            title="Conversion Rate"
            value={`${data.metrics.conversionRate?.toFixed(2) || '0'}%`}
            change={data.metrics.conversionChange}
            trend={data.metrics.conversionChange >= 0 ? 'up' : 'down'}
            icon={<Percent className="h-4 w-4" />}
            color="purple"
            tooltip="Percentage of visitors who completed a purchase"
            isLoading={isLoading}
          />
          <MetricsCard
            title="Active Users"
            value={data.metrics.activeUsers?.toLocaleString() || '0'}
            change={data.metrics.usersChange}
            trend={data.metrics.usersChange >= 0 ? 'up' : 'down'}
            icon={<Users className="h-4 w-4" />}
            color="green"
            tooltip="Number of unique active users in the current period"
            isLoading={isLoading}
          />
          <MetricsCard
            title="Total Orders"
            value={data.metrics.totalOrders?.toLocaleString() || '0'}
            change={data.metrics.ordersChange}
            trend={data.metrics.ordersChange >= 0 ? 'up' : 'down'}
            icon={<ShoppingCart className="h-4 w-4" />}
            color="orange"
            tooltip="Total number of orders in the current period"
            isLoading={isLoading}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChartSection data={data.chart} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-1">
            <InsightsPanel insights={data.insights} isLoading={isLoading} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DataTable 
              data={data.tableData} 
              columns={tableColumns}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-1">
            <ExportOptions onExport={handleExport} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
