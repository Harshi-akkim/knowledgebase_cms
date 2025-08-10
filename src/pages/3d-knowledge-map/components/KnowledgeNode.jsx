import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sphere } from '@react-three/drei';


const KnowledgeNode = ({ 
  node, 
  position, 
  onNodeClick, 
  onNodeHover, 
  isHighlighted = false,
  isSelected = false,
  scale = 1 
}) => {
  const meshRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animate node rotation and hover effects
  useFrame((state) => {
    if (meshRef?.current) {
      meshRef.current.rotation.y += 0.01;
      
      if (hovered || isHighlighted) {
        meshRef?.current?.scale?.setScalar(Math.sin(state?.clock?.elapsedTime * 2) * 0.1 + 1.2);
      } else {
        meshRef?.current?.scale?.setScalar(1);
      }
    }
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Technical': '#2196F3',
      'Business': '#4CAF50',
      'Process': '#FF9800',
      'Policy': '#9C27B0',
      'Training': '#F44336',
      'General': '#607D8B'
    };
    return colors?.[category] || '#607D8B';
  };

  const getNodeSize = (importance) => {
    return Math.max(0.5, Math.min(2, importance / 10)) * scale;
  };

  const handleClick = (event) => {
    event?.stopPropagation();
    onNodeClick(node);
  };

  const handlePointerOver = (event) => {
    event?.stopPropagation();
    setHovered(true);
    onNodeHover(node, true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (event) => {
    event?.stopPropagation();
    setHovered(false);
    onNodeHover(node, false);
    document.body.style.cursor = 'auto';
  };

  const nodeSize = getNodeSize(node?.importance);
  const nodeColor = getCategoryColor(node?.category);

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[nodeSize, 16, 16]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          color={nodeColor}
          emissive={isSelected ? nodeColor : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
          transparent
          opacity={hovered || isHighlighted ? 0.9 : 0.7}
        />
      </Sphere>
      {(hovered || isHighlighted || isSelected) && (
        <Text
          ref={textRef}
          position={[0, nodeSize + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
          textAlign="center"
        >
          {node?.title}
        </Text>
      )}
    </group>
  );
};

export default KnowledgeNode;