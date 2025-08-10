import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: "Create Article",
      icon: "Plus",
      variant: "default",
      action: () => navigate('/content-management?action=create')
    },
    {
      label: "Advanced Search",
      icon: "Search",
      variant: "outline",
      action: () => navigate('/search-results')
    },
    {
      label: "Manage Categories",
      icon: "FolderTree",
      variant: "secondary",
      action: () => navigate('/content-management?tab=categories')
    }
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {quickActions?.map((action, index) => (
        <Button
          key={index}
          variant={action?.variant}
          iconName={action?.icon}
          iconPosition="left"
          onClick={action?.action}
          className="flex-shrink-0"
        >
          {action?.label}
        </Button>
      ))}
    </div>
  );
};

export default QuickActions;