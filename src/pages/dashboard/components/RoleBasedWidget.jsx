import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoleBasedWidget = ({ userRole = 'Admin' }) => {
  const navigate = useNavigate();

  const getWidgetContent = () => {
    switch (userRole) {
      case 'Admin':
        return {
          title: 'System Health',
          icon: 'Shield',
          color: 'text-error',
          metrics: [
            { label: 'Server Uptime', value: '99.9%', status: 'good' },
            { label: 'Database Performance', value: '95ms', status: 'good' },
            { label: 'Active Users', value: '1,247', status: 'good' },
            { label: 'Storage Used', value: '78%', status: 'warning' }
          ],
          actions: [
            { label: 'System Settings', icon: 'Settings', action: () => console.log('System Settings') },
            { label: 'User Management', icon: 'Users', action: () => console.log('User Management') }
          ]
        };
      
      case 'Editor':
        return {
          title: 'Content Overview',
          icon: 'Edit',
          color: 'text-primary',
          metrics: [
            { label: 'Articles Edited', value: '23', status: 'good' },
            { label: 'Pending Reviews', value: '5', status: 'warning' },
            { label: 'Published Today', value: '8', status: 'good' },
            { label: 'Draft Articles', value: '12', status: 'neutral' }
          ],
          actions: [
            { label: 'Review Queue', icon: 'Clock', action: () => navigate('/content-management?tab=review') },
            { label: 'Content Templates', icon: 'FileText', action: () => navigate('/content-management?tab=templates') }
          ]
        };
      
      case 'Contributor':
        return {
          title: 'My Contributions',
          icon: 'User',
          color: 'text-accent',
          metrics: [
            { label: 'Articles Created', value: '15', status: 'good' },
            { label: 'Draft Articles', value: '3', status: 'neutral' },
            { label: 'Total Views', value: '2,456', status: 'good' },
            { label: 'Comments Received', value: '47', status: 'good' }
          ],
          actions: [
            { label: 'My Drafts', icon: 'FileText', action: () => navigate('/content-management?filter=my-drafts') },
            { label: 'Create Article', icon: 'Plus', action: () => navigate('/content-management?action=create') }
          ]
        };
      
      default:
        return {
          title: 'Quick Access',
          icon: 'Zap',
          color: 'text-success',
          metrics: [
            { label: 'Bookmarked Articles', value: '12', status: 'good' },
            { label: 'Recent Searches', value: '8', status: 'neutral' },
            { label: 'Favorite Categories', value: '5', status: 'good' },
            { label: 'Reading Progress', value: '67%', status: 'good' }
          ],
          actions: [
            { label: 'My Bookmarks', icon: 'Bookmark', action: () => navigate('/search-results?filter=bookmarked') },
            { label: 'Search History', icon: 'History', action: () => navigate('/search-results?tab=history') }
          ]
        };
    }
  };

  const widget = getWidgetContent();

  const getStatusColor = (status) => {
    const colors = {
      good: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      neutral: 'text-muted-foreground'
    };
    return colors?.[status] || colors?.neutral;
  };

  const getStatusIcon = (status) => {
    const icons = {
      good: 'CheckCircle',
      warning: 'AlertTriangle',
      error: 'XCircle',
      neutral: 'Minus'
    };
    return icons?.[status] || icons?.neutral;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name={widget?.icon} size={20} className={widget?.color} />
          <h3 className="text-lg font-semibold text-foreground">{widget?.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Role-specific dashboard for {userRole?.toLowerCase()} users
        </p>
      </div>
      <div className="p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {widget?.metrics?.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{metric?.label}</p>
                <p className="text-lg font-semibold text-foreground">{metric?.value}</p>
              </div>
              <Icon 
                name={getStatusIcon(metric?.status)} 
                size={16} 
                className={getStatusColor(metric?.status)}
              />
            </div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
          {widget?.actions?.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              iconName={action?.icon}
              iconPosition="left"
              onClick={action?.action}
              className="w-full justify-start"
            >
              {action?.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleBasedWidget;