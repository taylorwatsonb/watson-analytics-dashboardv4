
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Image, Table as TableIcon, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ExportOptionsProps {
  onExport: (format: string, options: ExportOptionState) => void;
}

interface ExportOptionState {
  format: string;
  includeCharts: boolean;
  includeInsights: boolean;
  includeRawData: boolean;
  dateRange: string;
}

const ExportOptions = ({ onExport }: ExportOptionsProps) => {
  const [options, setOptions] = useState<ExportOptionState>({
    format: 'pdf',
    includeCharts: true,
    includeInsights: true,
    includeRawData: false,
    dateRange: 'last30days',
  });
  const { toast } = useToast();

  const handleOptionChange = (key: keyof ExportOptionState, value: any) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = () => {
    onExport(options.format, options);
    
    toast({
      title: "Report Exported",
      description: `Your report has been exported as a ${options.format.toUpperCase()} file.`,
    });
  };

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document', icon: <FileText className="h-4 w-4 mr-2" /> },
    { value: 'csv', label: 'CSV Spreadsheet', icon: <FileSpreadsheet className="h-4 w-4 mr-2" /> },
    { value: 'xls', label: 'Excel Workbook', icon: <TableIcon className="h-4 w-4 mr-2" /> },
    { value: 'png', label: 'PNG Image', icon: <Image className="h-4 w-4 mr-2" /> },
  ];

  const dateRanges = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'lastYear', label: 'Last Year' },
    { value: 'all', label: 'All Time' },
  ];

  return (
    <Card className="shadow-sm animate-scale-in">
      <CardHeader className="pb-3">
        <CardTitle>Export Report</CardTitle>
        <CardDescription>
          Download your business data in various formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Export Format</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {exportFormats.map((format) => (
                <Button
                  key={format.value}
                  variant={options.format === format.value ? "default" : "outline"}
                  className="justify-start h-auto py-3 w-full"
                  onClick={() => handleOptionChange('format', format.value)}
                >
                  {format.icon}
                  <span className="truncate">{format.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Date Range</Label>
            <Select
              value={options.dateRange}
              onValueChange={(value) => handleOptionChange('dateRange', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>Include in Report</Label>
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="charts"
                  checked={options.includeCharts}
                  onCheckedChange={(checked) => 
                    handleOptionChange('includeCharts', checked === true)
                  }
                />
                <label
                  htmlFor="charts"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Charts and Visualizations
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insights"
                  checked={options.includeInsights}
                  onCheckedChange={(checked) => 
                    handleOptionChange('includeInsights', checked === true)
                  }
                />
                <label
                  htmlFor="insights"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Insights and Recommendations
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rawData"
                  checked={options.includeRawData}
                  onCheckedChange={(checked) => 
                    handleOptionChange('includeRawData', checked === true)
                  }
                />
                <label
                  htmlFor="rawData"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Raw Data Tables
                </label>
              </div>
            </div>
          </div>

          <Button 
            className="w-full mt-4" 
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExportOptions;
