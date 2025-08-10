import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricsCard from './components/MetricsCard';
import RecentArticlesList from './components/RecentArticlesList';
import TrendingContentWidget from './components/TrendingContentWidget';
import QuickActions from './components/QuickActions';
import KnowledgeMapPreview from './components/KnowledgeMapPreview';
import ActivityFeed from './components/ActivityFeed';
import RoleBasedWidget from './components/RoleBasedWidget';

const Dashboard = () => {
  // Mock user data - in real app this would come from auth context
  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin' // Admin, Editor, Contributor, Viewer
  };

  const metricsData = [
    {
      title: 'Total Articles',
      value: '1,247',
      change: '+12%',
      changeType: 'increase',
      icon: 'FileText',
      color: 'primary'
    },
    {
      title: 'Active Users',
      value: '892',
      change: '+8%',
      changeType: 'increase',
      icon: 'Users',
      color: 'success'
    },
    {
      title: 'Search Queries',
      value: '15.2K',
      change: '+23%',
      changeType: 'increase',
      icon: 'Search',
      color: 'accent'
    },
    {
      title: 'Avg. Response Time',
      value: '1.2s',
      change: '-5%',
      changeType: 'increase',
      icon: 'Zap',
      color: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {currentUser?.name}
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your knowledge base today.
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <QuickActions />
            </div>
          </div>
          
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Left Column - Recent Articles */}
            <div className="xl:col-span-2">
              <RecentArticlesList />
            </div>
            
            {/* Right Column - Trending Content */}
            <div>
              <TrendingContentWidget />
            </div>
          </div>
          
          {/* Knowledge Map Section */}
          <div className="mb-8">
            <KnowledgeMapPreview />
          </div>
          
          {/* Bottom Grid - Activity Feed & Role-based Widget */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Activity Feed */}
            <div className="xl:col-span-2">
              <ActivityFeed />
            </div>
            
            {/* Role-based Widget */}
            <div>
              <RoleBasedWidget userRole={currentUser?.role} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;