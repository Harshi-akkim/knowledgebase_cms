import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

const ConnectionLine = ({ 
  startPosition, 
  endPosition, 
  relationship, 
  isHighlighted = false,
  opacity = 0.6 
}) => {
  const points = useMemo(() => {
    // Validate input positions to prevent NaN values
    const validatePosition = (pos) => {
      if (!pos || !Array.isArray(pos) || pos?.length !== 3) {
        return [0, 0, 0];
      }
      return pos?.map(coord => {
        if (typeof coord !== 'number' || !isFinite(coord) || isNaN(coord)) {
          return 0;
        }
        return coord;
      });
    };

    const validStartPosition = validatePosition(startPosition);
    const validEndPosition = validatePosition(endPosition);
    
    const start = new THREE.Vector3(...validStartPosition);
    const end = new THREE.Vector3(...validEndPosition);
    
    // Validate that the vectors are valid
    if (!start || !end || 
        !isFinite(start?.x) || !isFinite(start?.y) || !isFinite(start?.z) ||
        !isFinite(end?.x) || !isFinite(end?.y) || !isFinite(end?.z)) {
      // Return a simple line between origin points if validation fails
      return [new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0)];
    }
    
    // Create a curved line for better visual appeal
    const mid = start?.clone()?.lerp(end, 0.5);
    
    // Add safe randomness to the curve with bounds checking
    const randomOffset = Math.random() * 2 - 1;
    if (isFinite(randomOffset)) {
      mid.y += randomOffset;
    }
    
    // Validate mid point before creating curve
    if (!isFinite(mid?.x) || !isFinite(mid?.y) || !isFinite(mid?.z)) {
      mid?.set(
        (start?.x + end?.x) / 2,
        (start?.y + end?.y) / 2,
        (start?.z + end?.z) / 2
      );
    }
    
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const curvePoints = curve?.getPoints(20);
    
    // Validate all curve points to ensure no NaN values
    return curvePoints?.filter(point => 
      point && 
      isFinite(point?.x) && 
      isFinite(point?.y) && 
      isFinite(point?.z)
    ) || [start, end];
    
  }, [startPosition, endPosition]);

  const getRelationshipColor = (type) => {
    const colors = {
      'references': '#2196F3',
      'related': '#4CAF50',
      'prerequisite': '#FF9800',
      'follows': '#9C27B0',
      'contains': '#F44336'
    };
    return colors?.[type] || '#607D8B';
  };

  const lineColor = getRelationshipColor(relationship?.type);

  // Only render if we have valid points
  if (!points || points?.length < 2) {
    return null;
  }

  return (
    <Line
      points={points}
      color={lineColor}
      lineWidth={isHighlighted ? 3 : 1}
      transparent
      opacity={isHighlighted ? 0.9 : opacity}
    />
  );
};

export default ConnectionLine;