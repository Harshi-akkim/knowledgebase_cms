import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const TrendingContentWidget = () => {
  const navigate = useNavigate();

  const trendingContent = [
    {
      id: 1,
      title: "How to Implement Single Sign-On (SSO)",
      category: "Security",
      views: 1247,
      trend: "up",
      trendValue: "+23%",
      timeframe: "24h"
    },
    {
      id: 2,
      title: "Database Backup and Recovery Procedures",
      category: "Operations",
      views: 892,
      trend: "up",
      trendValue: "+18%",
      timeframe: "24h"
    },
    {
      id: 3,
      title: "API Rate Limiting Best Practices",
      category: "Development",
      views: 756,
      trend: "up",
      trendValue: "+15%",
      timeframe: "24h"
    },
    {
      id: 4,
      title: "Customer Support Escalation Process",
      category: "Support",
      views: 634,
      trend: "down",
      trendValue: "-5%",
      timeframe: "24h"
    },
    {
      id: 5,
      title: "Mobile App Deployment Guidelines",
      category: "Development",
      views: 523,
      trend: "up",
      trendValue: "+12%",
      timeframe: "24h"
    }
  ];

  const handleContentClick = (contentId) => {
    navigate(`/article-viewer?id=${contentId}`);
  };

  const handleViewAnalytics = () => {
    navigate('/search-results?filter=trending');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Trending Content</h3>
          </div>
          <button
            onClick={handleViewAnalytics}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            View Analytics
          </button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Most viewed articles in the last 24 hours</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {trendingContent?.map((content, index) => (
            <div
              key={content?.id}
              onClick={() => handleContentClick(content?.id)}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-primary">#{index + 1}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                  {content?.title}
                </h4>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-accent font-medium">{content?.category}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{content?.views?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 ${
                  content?.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  <Icon 
                    name={content?.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} 
                    size={12} 
                  />
                  <span className="text-xs font-medium">{content?.trendValue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-center">
            <button
              onClick={handleViewAnalytics}
              className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
            >
              <span>View Detailed Analytics</span>
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingContentWidget;