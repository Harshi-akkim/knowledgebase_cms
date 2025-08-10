import React, { useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MiniMap = ({ 
  nodes = [], 
  currentViewport, 
  onViewportChange, 
  isVisible = true,
  onToggleVisibility 
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isVisible || !canvasRef?.current || nodes?.length === 0) return;

    const canvas = canvasRef?.current;
    const ctx = canvas?.getContext('2d');
    const rect = canvas?.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect?.width * window.devicePixelRatio;
    canvas.height = rect?.height * window.devicePixelRatio;
    ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx?.clearRect(0, 0, rect?.width, rect?.height);

    // Calculate bounds
    const bounds = {
      minX: Math.min(...nodes?.map(n => n?.position?.[0])),
      maxX: Math.max(...nodes?.map(n => n?.position?.[0])),
      minZ: Math.min(...nodes?.map(n => n?.position?.[2])),
      maxZ: Math.max(...nodes?.map(n => n?.position?.[2]))
    };

    const width = bounds?.maxX - bounds?.minX;
    const height = bounds?.maxZ - bounds?.minZ;
    const scale = Math.min((rect?.width - 20) / width, (rect?.height - 20) / height);

    // Draw nodes
    nodes?.forEach(node => {
      const x = ((node?.position?.[0] - bounds?.minX) / width) * (rect?.width - 20) + 10;
      const y = ((node?.position?.[2] - bounds?.minZ) / height) * (rect?.height - 20) + 10;
      
      ctx?.beginPath();
      ctx?.arc(x, y, Math.max(2, node?.importance / 5), 0, 2 * Math.PI);
      
      // Color based on category
      const colors = {
        'Technical': '#2196F3',
        'Business': '#4CAF50',
        'Process': '#FF9800',
        'Policy': '#9C27B0',
        'Training': '#F44336',
        'General': '#607D8B'
      };
      ctx.fillStyle = colors?.[node?.category] || '#607D8B';
      ctx?.fill();
    });

    // Draw viewport indicator
    if (currentViewport) {
      const viewX = ((currentViewport?.x - bounds?.minX) / width) * (rect?.width - 20) + 10;
      const viewY = ((currentViewport?.z - bounds?.minZ) / height) * (rect?.height - 20) + 10;
      const viewWidth = (currentViewport?.width / width) * (rect?.width - 20);
      const viewHeight = (currentViewport?.height / height) * (rect?.height - 20);

      ctx.strokeStyle = '#2196F3';
      ctx.lineWidth = 2;
      ctx?.strokeRect(
        viewX - viewWidth / 2,
        viewY - viewHeight / 2,
        viewWidth,
        viewHeight
      );
    }
  }, [nodes, currentViewport, isVisible]);

  const handleCanvasClick = (event) => {
    if (!canvasRef?.current || !onViewportChange) return;

    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    const x = event?.clientX - rect?.left;
    const y = event?.clientY - rect?.top;

    // Calculate world position
    const bounds = {
      minX: Math.min(...nodes?.map(n => n?.position?.[0])),
      maxX: Math.max(...nodes?.map(n => n?.position?.[0])),
      minZ: Math.min(...nodes?.map(n => n?.position?.[2])),
      maxZ: Math.max(...nodes?.map(n => n?.position?.[2]))
    };

    const width = bounds?.maxX - bounds?.minX;
    const height = bounds?.maxZ - bounds?.minZ;

    const worldX = ((x - 10) / (rect?.width - 20)) * width + bounds?.minX;
    const worldZ = ((y - 10) / (rect?.height - 20)) * height + bounds?.minZ;

    onViewportChange({ x: worldX, z: worldZ });
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={onToggleVisibility}
          className="w-10 h-10 bg-surface/90 backdrop-blur-sm border border-border rounded-lg shadow-floating flex items-center justify-center hover:bg-muted transition-smooth"
        >
          <Icon name="Map" size={16} />
        </button>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-4 right-4 w-48 h-36 bg-surface/95 backdrop-blur-sm border border-border rounded-lg shadow-floating z-50"
    >
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-foreground">Mini Map</span>
          <button
            onClick={onToggleVisibility}
            className="w-5 h-5 flex items-center justify-center hover:bg-muted rounded transition-smooth"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-24 bg-muted rounded cursor-pointer"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
};

export default MiniMap;