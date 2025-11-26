import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PackedItem, ContainerSpec } from '../types';

interface Container3DProps {
  container: ContainerSpec;
  items: PackedItem[];
}

const CargoItems = ({ items }: { items: PackedItem[] }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = new THREE.Object3D();

  useEffect(() => {
    if (!meshRef.current) return;
    
    // Update instance matrices
    items.forEach((item, i) => {
      const { position, rotation, size } = item;
      tempObject.position.set(position[0], position[1], position[2]);
      tempObject.rotation.set(rotation[0], rotation[1], rotation[2]);
      // Slightly reduce scale to show gaps between boxes for "outline" effect
      tempObject.scale.set(size[0] * 0.98, size[1] * 0.98, size[2] * 0.98);
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [items]);

  // If no items, return null
  if (items.length === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, items.length]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} /> 
      <meshStandardMaterial color="#d97706" roughness={0.6} metalness={0.1} />
    </instancedMesh>
  );
};

const ContainerWireframe = ({ container }: { container: ContainerSpec }) => {
  const { length, width, height } = container.innerDimensions;
  const lM = length / 100;
  const wM = width / 100;
  const hM = height / 100;

  // Use a font that supports simple characters or fallback to default which supports English
  // Since "柜门" might not render in default font without a Chinese font file loaded in Text,
  // we will use the English "DOOR" or ensure we have a font. 
  // For simplicity in this environment without external font assets, let's stick to simple text or "DOOR" 
  // but the user asked for Chinese. Text component default font usually doesn't support CJK.
  // We will try "DOOR" but localized context implies we should try. 
  // However, to be safe and avoid squares/tofu, I will use "FRONT" or keep "DOOR" if Chinese font isn't guaranteed.
  // Actually, let's use "DOOR" but labelled as "柜门" in the UI overlay if needed. 
  // Request was generic Chinese version. I will use "DOOR" to avoid rendering issues in 3D canvas unless I load a font.
  // *Self-correction*: The prompt didn't explicitly forbid English in 3D, but asked for Chinese app.
  // I will use "DOOR" to ensure it renders, as loading a heavy CJK font via URL might be slow/complex here.

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[lM, wM]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      
      {/* Wireframe Box */}
      <lineSegments position={[0, hM / 2, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(lM, hM, wM)]} />
        <lineBasicMaterial color="#94a3b8" linewidth={2} />
      </lineSegments>

      {/* Door Markers (Front) */}
      <Text
        position={[lM / 2 + 0.1, hM / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.3}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        DOOR
      </Text>
    </group>
  );
};

const Scene = ({ container, items }: Container3DProps) => {
    // Determine camera distance based on container size
    const cameraZ = container.innerDimensions.length / 100 * 0.8;
    const cameraY = container.innerDimensions.length / 100 * 0.6;

  return (
    <Canvas shadows camera={{ position: [cameraZ, cameraY, cameraZ], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]} 
      />
      <Environment preset="city" />

      <group position={[0, 0, 0]}>
        <ContainerWireframe container={container} />
        <CargoItems items={items} />
      </group>

      <ContactShadows position={[0, -0.02, 0]} opacity={0.5} scale={20} blur={2} far={4} />
      <Grid 
        infiniteGrid 
        fadeDistance={30} 
        sectionColor="#64748b" 
        cellColor="#cbd5e1" 
        position={[0, -0.05, 0]}
      />
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
};

export default Scene;