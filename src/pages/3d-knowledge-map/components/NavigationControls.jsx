import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationControls = ({ 
  onZoomIn, 
  onZoomOut, 
  onResetView, 
  onToggleAutoRotate,
  onExportView,
  isAutoRotating = false,
  zoomLevel = 1,
  className = "" 
}) => {
  const controls = [
    {
      icon: 'ZoomIn',
      label: 'Zoom In',
      action: onZoomIn,
      disabled: zoomLevel >= 5
    },
    {
      icon: 'ZoomOut',
      label: 'Zoom Out',
      action: onZoomOut,
      disabled: zoomLevel <= 0.1
    },
    {
      icon: 'RotateCcw',
      label: 'Reset View',
      action: onResetView,
      disabled: false
    },
    {
      icon: isAutoRotating ? 'Pause' : 'Play',
      label: isAutoRotating ? 'Stop Rotation' : 'Auto Rotate',
      action: onToggleAutoRotate,
      disabled: false,
      active: isAutoRotating
    },
    {
      icon: 'Download',
      label: 'Export View',
      action: onExportView,
      disabled: false
    }
  ];

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div className="flex items-center space-x-2 bg-surface/95 backdrop-blur-sm border border-border rounded-lg shadow-floating p-2">
        {controls?.map((control, index) => (
          <Button
            key={index}
            variant={control?.active ? "default" : "ghost"}
            size="icon"
            onClick={control?.action}
            disabled={control?.disabled}
            className="h-10 w-10"
            title={control?.label}
          >
            <Icon name={control?.icon} size={18} />
          </Button>
        ))}
        
        {/* Zoom Level Indicator */}
        <div className="ml-2 px-3 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>
    </div>
  );
};

export default NavigationControls;