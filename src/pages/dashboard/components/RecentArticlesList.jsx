import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentArticlesList = () => {
  const navigate = useNavigate();

  const recentArticles = [
    {
      id: 1,
      title: "Getting Started with Knowledge Management",
      category: "Onboarding",
      author: "Sarah Johnson",
      authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      lastModified: "2 hours ago",
      status: "published",
      views: 245,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300"
    },
    {
      id: 2,
      title: "Advanced Search Techniques and Best Practices",
      category: "User Guide",
      author: "Michael Chen",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      lastModified: "5 hours ago",
      status: "published",
      views: 189,
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300"
    },
    {
      id: 3,
      title: "Content Organization Strategies for Large Teams",
      category: "Best Practices",
      author: "Emily Rodriguez",
      authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      lastModified: "1 day ago",
      status: "draft",
      views: 67,
      thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300"
    },
    {
      id: 4,
      title: "API Integration Guide for Developers",
      category: "Technical",
      author: "David Park",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      lastModified: "2 days ago",
      status: "published",
      views: 312,
      thumbnail: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300"
    },
    {
      id: 5,
      title: "User Permission Management Tutorial",
      category: "Administration",
      author: "Lisa Thompson",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      lastModified: "3 days ago",
      status: "published",
      views: 156,
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      published: "bg-success text-success-foreground",
      draft: "bg-warning text-warning-foreground",
      archived: "bg-muted text-muted-foreground"
    };
    return colors?.[status] || colors?.draft;
  };

  const handleArticleClick = (articleId) => {
    navigate(`/article-viewer?id=${articleId}`);
  };

  const handleViewAll = () => {
    navigate('/content-management');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Articles</h3>
          <button
            onClick={handleViewAll}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            View All
          </button>
        </div>
      </div>
      <div className="divide-y divide-border">
        {recentArticles?.map((article) => (
          <div
            key={article?.id}
            onClick={() => handleArticleClick(article?.id)}
            className="p-4 hover:bg-muted/50 transition-smooth cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={article?.thumbnail}
                  alt={article?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1">
                      {article?.title}
                    </h4>
                    <p className="text-xs text-accent font-medium mb-2">
                      {article?.category}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(article?.status)}`}>
                    {article?.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={article?.authorAvatar}
                        alt={article?.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{article?.author}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{article?.views}</span>
                    </div>
                    <span>{article?.lastModified}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentArticlesList;