import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NodeTooltip = ({ 
  node, 
  position, 
  onClose, 
  onViewArticle, 
  onEditArticle,
  isVisible = false 
}) => {
  if (!isVisible || !node) return null;

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Technical': 'Code',
      'Business': 'Briefcase',
      'Process': 'GitBranch',
      'Policy': 'Shield',
      'Training': 'GraduationCap',
      'General': 'FileText'
    };
    return icons?.[category] || 'FileText';
  };

  const getImportanceLevel = (importance) => {
    if (importance >= 80) return { label: 'Critical', color: 'text-error' };
    if (importance >= 60) return { label: 'High', color: 'text-warning' };
    if (importance >= 40) return { label: 'Medium', color: 'text-accent' };
    return { label: 'Low', color: 'text-muted-foreground' };
  };

  const importanceLevel = getImportanceLevel(node?.importance);

  return (
    <div 
      className="fixed bg-surface border border-border rounded-lg shadow-floating z-1000 w-80 max-w-sm"
      style={{
        left: `${position?.x}px`,
        top: `${position?.y}px`,
        transform: 'translate(-50%, -100%)',
        marginTop: '-10px'
      }}
    >
      {/* Arrow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-border"></div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-7 border-r-7 border-t-7 border-l-transparent border-r-transparent border-t-surface" style={{ marginTop: '-1px' }}></div>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate mb-1">
              {node?.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name={getCategoryIcon(node?.category)} size={14} />
              <span>{node?.category}</span>
              <span>•</span>
              <span className={importanceLevel?.color}>{importanceLevel?.label}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 flex-shrink-0"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {node?.summary}
        </p>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div>
            <span className="text-muted-foreground">Author:</span>
            <div className="font-medium text-foreground">{node?.author}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Updated:</span>
            <div className="font-medium text-foreground">{formatDate(node?.lastModified)}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Views:</span>
            <div className="font-medium text-foreground">{node?.views?.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Connections:</span>
            <div className="font-medium text-foreground">{node?.connections}</div>
          </div>
        </div>

        {/* Tags */}
        {node?.tags && node?.tags?.length > 0 && (
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-1">Tags:</div>
            <div className="flex flex-wrap gap-1">
              {node?.tags?.slice(0, 4)?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              {node?.tags?.length > 4 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground">
                  +{node?.tags?.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onViewArticle(node)}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            View Article
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditArticle(node)}
            iconName="Edit"
            iconPosition="left"
            className="flex-1"
          >
            Edit
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Importance Score: {node?.importance}/100</span>
            <span>ID: {node?.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeTooltip;