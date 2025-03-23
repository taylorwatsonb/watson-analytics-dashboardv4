
import { Link } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="space-y-4 mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-xl font-medium tracking-tight">
                Watson <span className="text-primary">Analytics</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Transforming business data into actionable insights with elegant, intuitive visualizations.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Watson Analytics Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
