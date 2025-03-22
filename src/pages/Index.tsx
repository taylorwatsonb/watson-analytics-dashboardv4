
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight mb-2">Business Analytics Dashboard</h1>
            <p className="text-gray-600">
              Interactive visualization of your business metrics and actionable insights
            </p>
          </div>
          
          <Dashboard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
