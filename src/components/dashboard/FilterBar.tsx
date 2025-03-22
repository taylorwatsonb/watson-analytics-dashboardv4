
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Filter, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  dateRange: { from: Date | undefined; to: Date | undefined };
  product: string;
  region: string;
  channel: string;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: undefined, to: undefined },
    product: 'all',
    region: 'all',
    channel: 'all',
  });

  const [date, setDate] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateSelect = (selectedDate: any) => {
    setDate(selectedDate);
    handleFilterChange('dateRange', selectedDate);
  };

  const clearFilters = () => {
    const resetFilters = {
      dateRange: { from: undefined, to: undefined },
      product: 'all',
      region: 'all',
      channel: 'all',
    };
    setFilters(resetFilters);
    setDate({ from: undefined, to: undefined });
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = () => {
    return filters.product !== 'all' || 
           filters.region !== 'all' || 
           filters.channel !== 'all' || 
           filters.dateRange.from !== undefined;
  };

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center">
          <Filter className="h-4 w-4 mr-2 text-gray-500" />
          <h3 className="text-sm font-medium">Filters</h3>
        </div>
        
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs flex items-center gap-1"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <ChevronDown className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-180")} />
          </Button>
          
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs flex items-center gap-1 text-gray-500 hover:text-destructive ml-2"
            >
              <X className="h-3 w-3" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-300",
        isExpanded ? "mt-4" : "mt-4"
      )}>
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date.from && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  "Date range"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Select
            value={filters.product}
            onValueChange={(value) => handleFilterChange('product', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="product-a">Product A</SelectItem>
              <SelectItem value="product-b">Product B</SelectItem>
              <SelectItem value="product-c">Product C</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            value={filters.region}
            onValueChange={(value) => handleFilterChange('region', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
              <SelectItem value="latin-america">Latin America</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            value={filters.channel}
            onValueChange={(value) => handleFilterChange('channel', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="direct">Direct Sales</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="partner">Partner</SelectItem>
              <SelectItem value="reseller">Reseller</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
