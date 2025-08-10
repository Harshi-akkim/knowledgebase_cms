import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'article_created',
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
      },
      action: 'created a new article',
      target: 'Getting Started with Knowledge Management',
      timestamp: '2 minutes ago',
      icon: 'FileText',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'article_updated',
      user: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      action: 'updated',
      target: 'API Integration Guide for Developers',
      timestamp: '15 minutes ago',
      icon: 'Edit',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'user_joined',
      user: {
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      action: 'joined the knowledge base',
      target: null,
      timestamp: '1 hour ago',
      icon: 'UserPlus',
      color: 'text-accent'
    },
    {
      id: 4,
      type: 'category_created',
      user: {
        name: 'David Park',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      action: 'created new category',
      target: 'Mobile Development',
      timestamp: '2 hours ago',
      icon: 'FolderPlus',
      color: 'text-warning'
    },
    {
      id: 5,
      type: 'article_published',
      user: {
        name: 'Lisa Thompson',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
      },
      action: 'published',
      target: 'User Permission Management Tutorial',
      timestamp: '3 hours ago',
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      id: 6,
      type: 'comment_added',
      user: {
        name: 'Alex Wilson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
      },
      action: 'commented on',
      target: 'Database Backup and Recovery Procedures',
      timestamp: '4 hours ago',
      icon: 'MessageCircle',
      color: 'text-primary'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activity' },
    { value: 'articles', label: 'Articles' },
    { value: 'users', label: 'Users' },
    { value: 'categories', label: 'Categories' }
  ];

  const filteredActivities = activities?.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'articles') return ['article_created', 'article_updated', 'article_published', 'comment_added']?.includes(activity?.type);
    if (filter === 'users') return activity?.type === 'user_joined';
    if (filter === 'categories') return activity?.type === 'category_created';
    return true;
  });

  const handleActivityClick = (activity) => {
    if (activity?.target && ['article_created', 'article_updated', 'article_published', 'comment_added']?.includes(activity?.type)) {
      navigate(`/article-viewer?title=${encodeURIComponent(activity?.target)}`);
    }
  };

  const handleViewAll = () => {
    navigate('/content-management?tab=activity');
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          </div>
          <button
            onClick={handleViewAll}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            View All
          </button>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-smooth ${
                filter === option?.value
                  ? 'bg-surface text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {option?.label}
            </button>
          ))}
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-border">
          {filteredActivities?.map((activity) => (
            <div
              key={activity?.id}
              onClick={() => handleActivityClick(activity)}
              className={`p-4 hover:bg-muted/50 transition-smooth ${
                activity?.target ? 'cursor-pointer' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={activity?.user?.avatar}
                      alt={activity?.user?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity?.user?.name}</span>
                        <span className="text-muted-foreground ml-1">{activity?.action}</span>
                        {activity?.target && (
                          <span className="font-medium text-primary ml-1">
                            {activity?.target}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity?.timestamp}
                      </p>
                    </div>
                    
                    <div className={`flex-shrink-0 ${activity?.color}`}>
                      <Icon name={activity?.icon} size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {filteredActivities?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Activity" size={48} className="text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No activity found for the selected filter</p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;