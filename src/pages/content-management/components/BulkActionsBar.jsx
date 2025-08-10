import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ 
  selectedCount, 
  onBulkAction, 
  onClearSelection,
  isVisible 
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionInProgress, setActionInProgress] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Choose action...' },
    { value: 'publish', label: 'Publish Selected' },
    { value: 'unpublish', label: 'Unpublish Selected' },
    { value: 'archive', label: 'Archive Selected' },
    { value: 'delete', label: 'Delete Selected' },
    { value: 'duplicate', label: 'Duplicate Selected' },
    { value: 'export', label: 'Export Selected' },
    { value: 'move-category', label: 'Move to Category' },
    { value: 'assign-author', label: 'Assign Author' }
  ];

  const statusChangeOptions = [
    { value: 'Published', label: 'Published' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Under Review', label: 'Under Review' },
    { value: 'Archived', label: 'Archived' }
  ];

  const categoryOptions = [
    { value: 'getting-started', label: 'Getting Started' },
    { value: 'user-guides', label: 'User Guides' },
    { value: 'api-docs', label: 'API Documentation' },
    { value: 'troubleshooting', label: 'Troubleshooting' },
    { value: 'best-practices', label: 'Best Practices' },
    { value: 'security', label: 'Security' }
  ];

  const handleExecuteAction = async () => {
    if (!selectedAction) return;

    setActionInProgress(true);
    
    try {
      await onBulkAction(selectedAction, selectedCount);
      setSelectedAction('');
      setShowConfirmation(false);
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setActionInProgress(false);
    }
  };

  const getActionIcon = (action) => {
    const icons = {
      'publish': 'CheckCircle',
      'unpublish': 'XCircle',
      'archive': 'Archive',
      'delete': 'Trash2',
      'duplicate': 'Copy',
      'export': 'Download',
      'move-category': 'FolderOpen',
      'assign-author': 'UserCheck'
    };
    return icons?.[action] || 'Settings';
  };

  const isDestructiveAction = (action) => {
    return ['delete', 'archive']?.includes(action);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card border border-border rounded-lg shadow-floating p-4 min-w-96">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">
                {selectedCount}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">
                {selectedCount} article{selectedCount !== 1 ? 's' : ''} selected
              </h3>
              <p className="text-xs text-muted-foreground">
                Choose an action to apply to selected items
              </p>
            </div>
          </div>
          
          <button
            onClick={onClearSelection}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Select
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Choose action..."
              className="w-full"
            />
          </div>

          {selectedAction && (
            <Button
              variant={isDestructiveAction(selectedAction) ? 'destructive' : 'default'}
              onClick={() => setShowConfirmation(true)}
              loading={actionInProgress}
              iconName={getActionIcon(selectedAction)}
              iconPosition="left"
            >
              Execute
            </Button>
          )}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">Quick actions:</span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('publish', selectedCount)}
            iconName="CheckCircle"
            iconPosition="left"
          >
            Publish
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('archive', selectedCount)}
            iconName="Archive"
            iconPosition="left"
          >
            Archive
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBulkAction('export', selectedCount)}
            iconName="Download"
            iconPosition="left"
          >
            Export
          </Button>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-floating">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDestructiveAction(selectedAction) ? 'bg-destructive/10' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={getActionIcon(selectedAction)} 
                    size={20} 
                    className={isDestructiveAction(selectedAction) ? 'text-destructive' : 'text-primary'} 
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Confirm Action</h3>
                  <p className="text-sm text-muted-foreground">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-sm text-foreground mb-6">
                Are you sure you want to {selectedAction?.replace('-', ' ')} {selectedCount} selected article{selectedCount !== 1 ? 's' : ''}?
              </p>

              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant={isDestructiveAction(selectedAction) ? 'destructive' : 'default'}
                  onClick={handleExecuteAction}
                  loading={actionInProgress}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActionsBar;