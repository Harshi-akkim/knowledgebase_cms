import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WorkflowPanel = ({ workflowItems, onAssignReviewer, onApprove, onReject }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      'pending-review': 'bg-warning text-warning-foreground',
      'in-review': 'bg-accent text-accent-foreground',
      'approved': 'bg-success text-success-foreground',
      'rejected': 'bg-destructive text-destructive-foreground'
    };
    return colors?.[status] || 'bg-secondary text-secondary-foreground';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-destructive',
      'medium': 'text-warning',
      'low': 'text-muted-foreground'
    };
    return colors?.[priority] || 'text-muted-foreground';
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Approval Workflow</h3>
          <span className="text-sm text-muted-foreground">
            {workflowItems?.length} items pending
          </span>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {workflowItems?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">All caught up!</h4>
            <p className="text-muted-foreground">No articles pending review</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {workflowItems?.map((item) => (
              <div key={item?.id} className="p-4 hover:bg-muted/30 transition-smooth">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate mb-1">
                      {item?.title}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span>by {item?.author}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(item?.submittedAt)}</span>
                      <span>•</span>
                      <span className={getPriorityColor(item?.priority)}>
                        {item?.priority} priority
                      </span>
                    </div>
                  </div>
                  
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                    {item?.status?.replace('-', ' ')}
                  </span>
                </div>

                {item?.reviewNotes && (
                  <div className="bg-muted/50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Review Notes:</p>
                    <p className="text-sm text-foreground">{item?.reviewNotes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {item?.assignedReviewer ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-secondary-foreground">
                            {item?.assignedReviewer?.split(' ')?.map(n => n?.[0])?.join('')}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Assigned to {item?.assignedReviewer}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Unassigned</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    {item?.status === 'pending-review' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAssignReviewer(item?.id)}
                        iconName="UserPlus"
                        iconPosition="left"
                      >
                        Assign
                      </Button>
                    )}
                    
                    {item?.status === 'in-review' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onReject(item?.id)}
                          iconName="X"
                          iconPosition="left"
                        >
                          Reject
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => onApprove(item?.id)}
                          iconName="Check"
                          iconPosition="left"
                        >
                          Approve
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {workflowItems?.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button variant="outline" fullWidth iconName="Eye" iconPosition="left">
            View All Workflow Items
          </Button>
        </div>
      )}
    </div>
  );
};

export default WorkflowPanel;