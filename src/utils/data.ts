
// Generate mock data for the dashboard

export const generateMockData = () => {
  // Mock metrics
  const metrics = {
    totalRevenue: Math.floor(Math.random() * 1000000) + 500000,
    revenueChange: (Math.random() * 20) - 5,
    conversionRate: (Math.random() * 5) + 1,
    conversionChange: (Math.random() * 10) - 3,
    activeUsers: Math.floor(Math.random() * 50000) + 10000,
    usersChange: (Math.random() * 15) - 3,
    totalOrders: Math.floor(Math.random() * 10000) + 2000,
    ordersChange: (Math.random() * 25) - 5,
  };

  // Mock chart data
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const chart = months.map(month => {
    const revenue = Math.floor(Math.random() * 100000) + 50000;
    return {
      name: month,
      revenue,
      profit: Math.floor(revenue * (0.2 + Math.random() * 0.3)), // 20-50% profit margin
      customers: Math.floor(Math.random() * 1000) + 500,
    };
  });

  // Mock insights
  const insights = [
    {
      id: '1',
      title: 'Revenue growth is accelerating',
      description: 'Your revenue growth rate has increased by 15% compared to the previous period. This positive trend is driven primarily by increased sales in the Product A category and improved conversion rates from your latest marketing campaign.',
      category: 'success',
      impact: 'high',
      actionItems: [
        'Increase inventory of Product A to meet growing demand',
        'Expand the successful marketing campaign to other channels',
        'Consider bundling Product A with complementary products to increase average order value',
      ],
    },
    {
      id: '2',
      title: 'Customer acquisition cost is rising',
      description: 'The cost to acquire new customers has increased by 12% over the last quarter. This trend could impact overall profitability if not addressed.',
      category: 'warning',
      impact: 'medium',
      actionItems: [
        'Review and optimize current marketing spend across channels',
        'Implement a referral program to decrease acquisition costs',
        'Focus on retention strategies for existing customers',
      ],
    },
    {
      id: '3',
      title: 'Mobile traffic conversion opportunity',
      description: 'Mobile traffic has increased by 35%, but the conversion rate on mobile devices is 40% lower than desktop. There is a significant opportunity to improve mobile user experience.',
      category: 'info',
      impact: 'high',
      actionItems: [
        'Conduct usability testing for the mobile checkout process',
        'Implement mobile-specific UI improvements',
        'Optimize page load times for mobile devices',
      ],
    },
    {
      id: '4',
      title: 'Inventory alert for top products',
      description: 'Several top-selling products are projected to go out of stock within the next 2 weeks based on current sales velocity.',
      category: 'action',
      impact: 'high',
      actionItems: [
        'Expedite restocking of identified products',
        'Implement inventory alerts at higher threshold levels',
        'Consider temporary promotion of alternative products',
      ],
    },
  ];

  // Mock table data
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  const statuses = ['completed', 'pending', 'failed'];
  
  const tableData = Array.from({ length: 20 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    const revenue = Math.floor(Math.random() * 10000) + 1000;
    const units = Math.floor(Math.random() * 100) + 10;
    
    return {
      id: `ORDER-${1000 + i}`,
      date: date.toISOString().split('T')[0],
      product: products[Math.floor(Math.random() * products.length)],
      revenue,
      units,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });

  return {
    metrics,
    chart,
    insights,
    tableData,
  };
};

// Helper to generate realistic trends
export const generateTrendData = (startValue: number, volatility: number, length: number) => {
  const data = [];
  let currentValue = startValue;
  
  for (let i = 0; i < length; i++) {
    // Random walk with drift
    const change = volatility * (Math.random() - 0.5);
    currentValue = Math.max(0, currentValue + change);
    data.push(currentValue);
  }
  
  return data;
};

// Format currency helper
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format percentage helper
export const formatPercentage = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};
