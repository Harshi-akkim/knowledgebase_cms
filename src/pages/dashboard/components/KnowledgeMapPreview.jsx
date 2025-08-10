import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KnowledgeMapPreview = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const mockNodes = [
    { id: 1, x: 150, y: 100, size: 'large', category: 'Security', connections: 3 },
    { id: 2, x: 300, y: 80, size: 'medium', category: 'Development', connections: 5 },
    { id: 3, x: 250, y: 180, size: 'small', category: 'Operations', connections: 2 },
    { id: 4, x: 100, y: 200, size: 'medium', category: 'Support', connections: 4 },
    { id: 5, x: 350, y: 150, size: 'small', category: 'Documentation', connections: 2 },
    { id: 6, x: 200, y: 120, size: 'large', category: 'Best Practices', connections: 6 }
  ];

  const getNodeColor = (category) => {
    const colors = {
      'Security': '#F44336',
      'Development': '#2196F3',
      'Operations': '#4CAF50',
      'Support': '#FF9800',
      'Documentation': '#9C27B0',
      'Best Practices': '#607D8B'
    };
    return colors?.[category] || '#757575';
  };

  const getNodeSize = (size) => {
    const sizes = {
      small: 8,
      medium: 12,
      large: 16
    };
    return sizes?.[size] || 12;
  };

  const handleExploreMap = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/3d-knowledge-map');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Knowledge Map</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Maximize2"
            iconPosition="left"
            onClick={handleExploreMap}
            loading={isLoading}
          >
            Explore Full Map
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Interactive visualization of content relationships
        </p>
      </div>
      <div className="p-6">
        <div className="relative bg-muted/30 rounded-lg h-64 overflow-hidden">
          {/* SVG Network Visualization */}
          <svg className="w-full h-full" viewBox="0 0 400 250">
            {/* Connection Lines */}
            <g className="opacity-40">
              <line x1="150" y1="100" x2="300" y2="80" stroke="currentColor" strokeWidth="1" />
              <line x1="150" y1="100" x2="250" y2="180" stroke="currentColor" strokeWidth="1" />
              <line x1="300" y1="80" x2="350" y2="150" stroke="currentColor" strokeWidth="1" />
              <line x1="250" y1="180" x2="100" y2="200" stroke="currentColor" strokeWidth="1" />
              <line x1="200" y1="120" x2="150" y2="100" stroke="currentColor" strokeWidth="2" />
              <line x1="200" y1="120" x2="300" y2="80" stroke="currentColor" strokeWidth="2" />
              <line x1="200" y1="120" x2="250" y2="180" stroke="currentColor" strokeWidth="1" />
            </g>
            
            {/* Nodes */}
            {mockNodes?.map((node) => (
              <g key={node?.id}>
                <circle
                  cx={node?.x}
                  cy={node?.y}
                  r={getNodeSize(node?.size)}
                  fill={getNodeColor(node?.category)}
                  className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                />
                <circle
                  cx={node?.x}
                  cy={node?.y}
                  r={getNodeSize(node?.size) + 2}
                  fill="none"
                  stroke={getNodeColor(node?.category)}
                  strokeWidth="1"
                  className="opacity-30"
                />
              </g>
            ))}
          </svg>
          
          {/* Overlay Controls */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button className="w-8 h-8 bg-surface/90 border border-border rounded-lg flex items-center justify-center hover:bg-surface transition-smooth">
              <Icon name="ZoomIn" size={14} />
            </button>
            <button className="w-8 h-8 bg-surface/90 border border-border rounded-lg flex items-center justify-center hover:bg-surface transition-smooth">
              <Icon name="ZoomOut" size={14} />
            </button>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-surface/90 border border-border rounded-lg p-3">
            <div className="text-xs font-medium text-foreground mb-2">Categories</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries({
                'Security': '#F44336',
                'Development': '#2196F3',
                'Operations': '#4CAF50',
                'Support': '#FF9800'
              })?.map(([category, color]) => (
                <div key={category} className="flex items-center space-x-1">
                  <div 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-muted-foreground">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Circle" size={12} />
              <span>156 Articles</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="GitBranch" size={12} />
              <span>23 Categories</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Link" size={12} />
              <span>89 Connections</span>
            </div>
          </div>
          
          <button
            onClick={handleExploreMap}
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            View Interactive Map →
          </button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeMapPreview;