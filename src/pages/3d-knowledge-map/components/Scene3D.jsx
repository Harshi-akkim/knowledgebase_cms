import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

import KnowledgeNode from './KnowledgeNode';
import ConnectionLine from './ConnectionLine';

const CameraController = ({ viewportChange, autoRotate, onCameraChange }) => {
  const { camera } = useThree();
  const controlsRef = useRef();

  useFrame(() => {
    if (autoRotate && controlsRef?.current) {
      controlsRef.current.autoRotate = true;
      controlsRef.current.autoRotateSpeed = 0.5;
    } else if (controlsRef?.current) {
      controlsRef.current.autoRotate = false;
    }
  });

  useEffect(() => {
    if (viewportChange && camera) {
      camera?.position?.set(viewportChange?.x, viewportChange?.y || 10, viewportChange?.z);
      camera?.lookAt(viewportChange?.x, 0, viewportChange?.z);
    }
  }, [viewportChange, camera]);

  const handleChange = () => {
    if (onCameraChange && camera) {
      onCameraChange({
        position: camera?.position?.toArray(),
        target: controlsRef?.current?.target?.toArray() || [0, 0, 0]
      });
    }
  };

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={5}
      maxDistance={100}
      maxPolarAngle={Math.PI}
      onChange={handleChange}
    />
  );
};

const LoadingFallback = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#2196F3" transparent opacity={0.5} />
  </mesh>
);

const Scene3D = ({ 
  nodes = [], 
  connections = [], 
  selectedNode = null,
  highlightedNodes = [],
  onNodeClick,
  onNodeHover,
  viewportChange,
  autoRotate = false,
  onCameraChange,
  viewMode = '3d'
}) => {
  const [hoveredNode, setHoveredNode] = useState(null);

  const handleNodeHover = (node, isHovered) => {
    setHoveredNode(isHovered ? node : null);
    onNodeHover(node, isHovered);
  };

  // Enhanced position validation function
  const validatePosition = (position) => {
    if (!position || !Array.isArray(position) || position?.length !== 3) {
      return [0, 0, 0];
    }
    return position?.map(coord => {
      if (typeof coord !== 'number' || !isFinite(coord) || isNaN(coord)) {
        return 0;
      }
      return coord;
    });
  };

  const getNodePosition = (node, mode) => {
    // Validate node exists and has required properties
    if (!node || !node?.id) {
      return [0, 0, 0];
    }

    let calculatedPosition;
    
    switch (mode) {
      case 'cluster':
        // Group nodes by category in clusters
        const categoryPositions = {
          'Technical': [-10, 0, -10],
          'Business': [10, 0, -10],
          'Process': [-10, 0, 10],
          'Policy': [10, 0, 10],
          'Training': [0, 0, -15],
          'General': [0, 0, 15]
        };
        const basePos = categoryPositions?.[node?.category] || [0, 0, 0];
        const randomX = Math.random() - 0.5;
        const randomY = Math.random() - 0.5;
        const randomZ = Math.random() - 0.5;
        
        calculatedPosition = [
          basePos?.[0] + (isFinite(randomX) ? randomX * 8 : 0),
          basePos?.[1] + (isFinite(randomY) ? randomY * 4 : 0),
          basePos?.[2] + (isFinite(randomZ) ? randomZ * 8 : 0)
        ];
        break;
      
      case 'hierarchy':
        // Arrange nodes in hierarchical levels
        const importance = node?.importance || 50;
        const level = Math.floor(importance / 25);
        const nodeIdNum = parseInt(node?.id?.replace(/\D/g, '')) || 1;
        const angle = (nodeIdNum * 0.618) * Math.PI * 2; // Golden angle
        const radius = 5 + level * 3;
        
        calculatedPosition = [
          isFinite(Math.cos(angle) * radius) ? Math.cos(angle) * radius : 0,
          isFinite(level * 4 - 6) ? level * 4 - 6 : 0,
          isFinite(Math.sin(angle) * radius) ? Math.sin(angle) * radius : 0
        ];
        break;
      
      case 'timeline':
        // Arrange nodes along timeline
        const lastModified = node?.lastModified;
        if (lastModified) {
          const timeIndex = new Date(lastModified)?.getTime();
          const currentTime = Date.now();
          const yearInMs = 365 * 24 * 60 * 60 * 1000;
          const normalizedTime = (timeIndex - currentTime + yearInMs) / yearInMs;
          
          if (isFinite(normalizedTime)) {
            const randomY = Math.random() - 0.5;
            const randomZ = Math.random() - 0.5;
            calculatedPosition = [
              normalizedTime * 30 - 15,
              isFinite(randomY) ? randomY * 4 : 0,
              isFinite(randomZ) ? randomZ * 10 : 0
            ];
          } else {
            calculatedPosition = [0, 0, 0];
          }
        } else {
          calculatedPosition = [0, 0, 0];
        }
        break;
      
      default:
        calculatedPosition = node?.position || [0, 0, 0];
        break;
    }

    // Always validate the final position
    return validatePosition(calculatedPosition);
  };

  return (
    <Canvas
      camera={{ position: [0, 10, 20], fov: 60 }}
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}
    >
      <Suspense fallback={<LoadingFallback />}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4CAF50" />
        <spotLight
          position={[0, 20, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.6}
          castShadow
        />

        {/* Environment */}
        <Environment preset="night" />

        {/* Camera Controls */}
        <CameraController
          viewportChange={viewportChange}
          autoRotate={autoRotate}
          onCameraChange={onCameraChange}
        />

        {/* Render Nodes */}
        {nodes?.filter(node => node && node?.id)?.map((node) => (
          <KnowledgeNode
            key={node?.id}
            node={node}
            position={getNodePosition(node, viewMode)}
            onNodeClick={onNodeClick}
            onNodeHover={handleNodeHover}
            isHighlighted={highlightedNodes?.includes(node?.id)}
            isSelected={selectedNode?.id === node?.id}
            scale={viewMode === 'hierarchy' ? 0.8 : 1}
          />
        ))}

        {/* Render Connections */}
        {connections?.filter(connection => connection && connection?.from && connection?.to)?.map((connection, index) => {
          const startNode = nodes?.find(n => n?.id === connection?.from);
          const endNode = nodes?.find(n => n?.id === connection?.to);
          
          if (!startNode || !endNode || !startNode?.id || !endNode?.id) return null;

          const startPosition = getNodePosition(startNode, viewMode);
          const endPosition = getNodePosition(endNode, viewMode);

          // Validate positions before rendering
          const validStartPos = validatePosition(startPosition);
          const validEndPos = validatePosition(endPosition);

          const isHighlighted = 
            hoveredNode?.id === connection?.from || 
            hoveredNode?.id === connection?.to ||
            selectedNode?.id === connection?.from ||
            selectedNode?.id === connection?.to;

          return (
            <ConnectionLine
              key={`${connection?.from}-${connection?.to}-${index}`}
              startPosition={validStartPos}
              endPosition={validEndPos}
              relationship={connection}
              isHighlighted={isHighlighted}
              opacity={viewMode === 'timeline' ? 0.3 : 0.6}
            />
          );
        })}

        {/* Grid Helper for reference */}
        <gridHelper args={[50, 50, '#334155', '#1e293b']} />
      </Suspense>
    </Canvas>
  );
};

export default Scene3D;