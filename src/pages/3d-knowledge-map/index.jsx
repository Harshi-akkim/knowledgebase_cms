import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Scene3D from './components/Scene3D';
import ControlPanel from './components/ControlPanel';
import MiniMap from './components/MiniMap';
import NodeTooltip from './components/NodeTooltip';
import NavigationControls from './components/NavigationControls';

const KnowledgeMap3D = () => {
  const navigate = useNavigate();
  
  // State management
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [filteredNodes, setFilteredNodes] = useState([]);
  const [filteredConnections, setFilteredConnections] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [tooltipData, setTooltipData] = useState({ node: null, position: { x: 0, y: 0 }, visible: false });
  
  // Control states
  const [isControlPanelExpanded, setIsControlPanelExpanded] = useState(true);
  const [isMiniMapVisible, setIsMiniMapVisible] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewMode, setViewMode] = useState('3d');
  const [currentViewport, setCurrentViewport] = useState({ x: 0, z: 0, width: 20, height: 20 });
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRelationships, setSelectedRelationships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockNodes = [
    {
      id: 'node-1',
      title: 'React Component Architecture',
      summary: 'Comprehensive guide to building scalable React applications with proper component architecture patterns and best practices.',
      category: 'Technical',
      importance: 95,
      author: 'Sarah Chen',
      lastModified: '2025-01-15T10:30:00Z',
      views: 2847,
      connections: 12,
      tags: ['React', 'Architecture', 'Components', 'Best Practices'],
      position: [0, 0, 0]
    },
    {
      id: 'node-2',
      title: 'API Integration Guidelines',
      summary: 'Standard procedures for integrating third-party APIs, handling authentication, error management, and data validation.',
      category: 'Technical',
      importance: 88,
      author: 'Michael Rodriguez',
      lastModified: '2025-01-10T14:20:00Z',
      views: 1923,
      connections: 8,
      tags: ['API', 'Integration', 'Authentication', 'Validation'],
      position: [5, 2, -3]
    },
    {
      id: 'node-3',
      title: 'Business Process Optimization',
      summary: 'Methodologies for analyzing and optimizing business processes to improve efficiency and reduce operational costs.',
      category: 'Business',
      importance: 76,
      author: 'Jennifer Park',
      lastModified: '2025-01-08T09:15:00Z',
      views: 1456,
      connections: 6,
      tags: ['Process', 'Optimization', 'Efficiency', 'Cost Reduction'],
      position: [-4, 1, 4]
    },
    {
      id: 'node-4',
      title: 'Data Security Protocols',
      summary: 'Essential security measures for protecting sensitive data, including encryption, access controls, and audit trails.',
      category: 'Policy',
      importance: 92,
      author: 'David Kim',
      lastModified: '2025-01-12T16:45:00Z',
      views: 3241,
      connections: 15,
      tags: ['Security', 'Data Protection', 'Encryption', 'Compliance'],
      position: [3, -1, 6]
    },
    {
      id: 'node-5',
      title: 'Employee Onboarding Process',
      summary: 'Step-by-step guide for onboarding new employees, including documentation, training schedules, and integration activities.',
      category: 'Process',
      importance: 68,
      author: 'Lisa Thompson',
      lastModified: '2025-01-05T11:30:00Z',
      views: 987,
      connections: 4,
      tags: ['Onboarding', 'Training', 'HR', 'Documentation'],
      position: [-6, 0, -2]
    },
    {
      id: 'node-6',
      title: 'Quality Assurance Standards',
      summary: 'Comprehensive QA standards covering testing methodologies, code review processes, and quality metrics.',
      category: 'Process',
      importance: 84,
      author: 'Robert Wilson',
      lastModified: '2025-01-14T13:20:00Z',
      views: 2156,
      connections: 10,
      tags: ['QA', 'Testing', 'Code Review', 'Quality'],
      position: [2, 3, -5]
    },
    {
      id: 'node-7',
      title: 'Customer Support Training',
      summary: 'Training materials and procedures for customer support representatives, including communication guidelines and escalation processes.',
      category: 'Training',
      importance: 72,
      author: 'Amanda Davis',
      lastModified: '2025-01-07T15:10:00Z',
      views: 1334,
      connections: 7,
      tags: ['Support', 'Training', 'Communication', 'Escalation'],
      position: [-3, -2, 3]
    },
    {
      id: 'node-8',
      title: 'Project Management Framework',
      summary: 'Standardized framework for managing projects from initiation to closure, including templates and best practices.',
      category: 'Business',
      importance: 80,
      author: 'James Miller',
      lastModified: '2025-01-11T08:45:00Z',
      views: 1789,
      connections: 9,
      tags: ['Project Management', 'Framework', 'Templates', 'Best Practices'],
      position: [4, 1, 2]
    }
  ];

  const mockConnections = [
    { from: 'node-1', to: 'node-2', type: 'references', strength: 0.8 },
    { from: 'node-1', to: 'node-6', type: 'related', strength: 0.6 },
    { from: 'node-2', to: 'node-4', type: 'prerequisite', strength: 0.9 },
    { from: 'node-3', to: 'node-5', type: 'contains', strength: 0.7 },
    { from: 'node-3', to: 'node-8', type: 'related', strength: 0.8 },
    { from: 'node-4', to: 'node-6', type: 'follows', strength: 0.5 },
    { from: 'node-5', to: 'node-7', type: 'related', strength: 0.6 },
    { from: 'node-6', to: 'node-8', type: 'references', strength: 0.7 },
    { from: 'node-7', to: 'node-8', type: 'contains', strength: 0.4 }
  ];

  const categories = [
    { id: 'technical', name: 'Technical', count: 2 },
    { id: 'business', name: 'Business', count: 2 },
    { id: 'process', name: 'Process', count: 2 },
    { id: 'policy', name: 'Policy', count: 1 },
    { id: 'training', name: 'Training', count: 1 }
  ];

  const relationshipTypes = [
    { type: 'references', label: 'References', count: 3 },
    { type: 'related', label: 'Related', count: 4 },
    { type: 'prerequisite', label: 'Prerequisite', count: 1 },
    { type: 'contains', label: 'Contains', count: 2 },
    { type: 'follows', label: 'Follows', count: 1 }
  ];

  // Initialize data
  useEffect(() => {
    setNodes(mockNodes);
    setConnections(mockConnections);
    setFilteredNodes(mockNodes);
    setFilteredConnections(mockConnections);
  }, []);

  // Filter nodes and connections based on current filters
  useEffect(() => {
    let filtered = [...nodes];

    // Category filter
    if (selectedCategories?.length > 0) {
      filtered = filtered?.filter(node => 
        selectedCategories?.some(cat => 
          categories?.find(c => c?.id === cat)?.name === node?.category
        )
      );
    }

    // Search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(node =>
        node?.title?.toLowerCase()?.includes(query) ||
        node?.summary?.toLowerCase()?.includes(query) ||
        node?.tags?.some(tag => tag?.toLowerCase()?.includes(query))
      );
      
      // Highlight matching nodes
      setHighlightedNodes(filtered?.map(node => node?.id));
    } else {
      setHighlightedNodes([]);
    }

    setFilteredNodes(filtered);

    // Filter connections based on visible nodes
    const visibleNodeIds = filtered?.map(node => node?.id);
    const filteredConns = connections?.filter(conn => {
      const hasValidNodes = visibleNodeIds?.includes(conn?.from) && visibleNodeIds?.includes(conn?.to);
      const matchesRelationshipFilter = selectedRelationships?.length === 0 || 
        selectedRelationships?.includes(conn?.type);
      return hasValidNodes && matchesRelationshipFilter;
    });

    setFilteredConnections(filteredConns);
  }, [nodes, connections, selectedCategories, selectedRelationships, searchQuery]);

  // Event handlers
  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node);
    setTooltipData({ node: null, position: { x: 0, y: 0 }, visible: false });
  }, []);

  const handleNodeHover = useCallback((node, isHovered) => {
    setHoveredNode(isHovered ? node : null);
    
    if (isHovered) {
      // Calculate tooltip position (simplified - in real app would use mouse position)
      const tooltipPosition = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 3
      };
      
      setTooltipData({
        node,
        position: tooltipPosition,
        visible: true
      });
    } else {
      setTooltipData(prev => ({ ...prev, visible: false }));
    }
  }, []);

  const handleCategoryFilter = useCallback((categories) => {
    setSelectedCategories(categories);
  }, []);

  const handleRelationshipFilter = useCallback((relationships) => {
    setSelectedRelationships(relationships);
  }, []);

  const handleSearchHighlight = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  const handleResetView = useCallback(() => {
    setSelectedNode(null);
    setHoveredNode(null);
    setHighlightedNodes([]);
    setSelectedCategories([]);
    setSelectedRelationships([]);
    setSearchQuery('');
    setViewMode('3d');
    setCurrentViewport({ x: 0, z: 0, width: 20, height: 20 });
    setZoomLevel(1);
    setAutoRotate(false);
  }, []);

  const handleViewArticle = useCallback((node) => {
    navigate(`/article-viewer?id=${node?.id}`);
  }, [navigate]);

  const handleEditArticle = useCallback((node) => {
    navigate(`/content-management?edit=${node?.id}`);
  }, [navigate]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev * 1.2, 5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.1));
  }, []);

  const handleToggleAutoRotate = useCallback(() => {
    setAutoRotate(prev => !prev);
  }, []);

  const handleExportView = useCallback(() => {
    // In a real app, this would capture the 3D scene and export as image
    console.log('Exporting current view...');
    alert('Export functionality would be implemented here');
  }, []);

  const handleCameraChange = useCallback((cameraData) => {
    // Update viewport for minimap
    setCurrentViewport({
      x: cameraData?.position?.[0],
      z: cameraData?.position?.[2],
      width: 20 / zoomLevel,
      height: 20 / zoomLevel
    });
  }, [zoomLevel]);

  const handleViewportChange = useCallback((viewport) => {
    setCurrentViewport(prev => ({ ...prev, ...viewport }));
  }, []);

  const handleCloseTooltip = useCallback(() => {
    setTooltipData(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="px-6 py-4">
          <Breadcrumb />
          
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-foreground mb-2">3D Knowledge Map</h1>
            <p className="text-muted-foreground">
              Explore knowledge relationships through interactive 3D visualization. 
              Navigate with mouse/trackpad, filter by categories, and discover content connections.
            </p>
          </div>
        </div>

        {/* 3D Scene Container */}
        <div className="relative h-[calc(100vh-12rem)] w-full">
          <Scene3D
            nodes={filteredNodes}
            connections={filteredConnections}
            selectedNode={selectedNode}
            highlightedNodes={highlightedNodes}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            viewportChange={currentViewport}
            autoRotate={autoRotate}
            onCameraChange={handleCameraChange}
            viewMode={viewMode}
          />

          {/* Control Panel */}
          <ControlPanel
            onCategoryFilter={handleCategoryFilter}
            onRelationshipFilter={handleRelationshipFilter}
            onSearchHighlight={handleSearchHighlight}
            onViewModeChange={handleViewModeChange}
            onResetView={handleResetView}
            categories={categories}
            relationshipTypes={relationshipTypes}
            isExpanded={isControlPanelExpanded}
            onToggleExpanded={() => setIsControlPanelExpanded(!isControlPanelExpanded)}
          />

          {/* Mini Map */}
          <MiniMap
            nodes={filteredNodes}
            currentViewport={currentViewport}
            onViewportChange={handleViewportChange}
            isVisible={isMiniMapVisible}
            onToggleVisibility={() => setIsMiniMapVisible(!isMiniMapVisible)}
          />

          {/* Navigation Controls */}
          <NavigationControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onResetView={handleResetView}
            onToggleAutoRotate={handleToggleAutoRotate}
            onExportView={handleExportView}
            isAutoRotating={autoRotate}
            zoomLevel={zoomLevel}
          />

          {/* Node Tooltip */}
          <NodeTooltip
            node={tooltipData?.node}
            position={tooltipData?.position}
            onClose={handleCloseTooltip}
            onViewArticle={handleViewArticle}
            onEditArticle={handleEditArticle}
            isVisible={tooltipData?.visible}
          />
        </div>

        {/* Mobile Instructions */}
        <div className="md:hidden px-6 py-4 bg-muted/50">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2"><strong>Touch Controls:</strong></p>
            <ul className="space-y-1 text-xs">
              <li>• Single finger: Rotate view</li>
              <li>• Two fingers: Zoom in/out</li>
              <li>• Tap node: Select and view details</li>
              <li>• Double tap: View article</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KnowledgeMap3D;