import React from 'react';
import Icon from '../../../components/AppIcon';

const ContentMetrics = ({ metrics }) => {
  const metricCards = [
    {
      title: 'Total Articles',
      value: metrics?.totalArticles,
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      title: 'Published',
      value: metrics?.published,
      change: '+8%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      title: 'Under Review',
      value: metrics?.underReview,
      change: '+3',
      changeType: 'neutral',
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      title: 'Total Views',
      value: metrics?.totalViews?.toLocaleString(),
      change: '+24%',
      changeType: 'positive',
      icon: 'Eye',
      color: 'text-accent'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricCards?.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-subtle transition-smooth">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${metric?.color}`}>
              <Icon name={metric?.icon} size={20} />
            </div>
            <span className={`text-sm font-medium ${getChangeColor(metric?.changeType)}`}>
              {metric?.change}
            </span>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {metric?.value}
            </h3>
            <p className="text-sm text-muted-foreground">
              {metric?.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentMetrics;