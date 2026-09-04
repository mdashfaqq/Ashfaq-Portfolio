import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Animated 3D Character Component
function CharacterModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const [blinkState, setBlinkState] = useState(0); // 0: open, 1: closing, 2: opening
  
  // Smooth head movement following mouse
  useFrame((state) => {
    if (headRef.current) {
      const targetX = mousePosition.x * 0.3;
      const targetY = mousePosition.y * 0.2;
      
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetX,
        0.05
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -targetY,
        0.05
      );
    }
    
    // Floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(1); // Start closing
      setTimeout(() => setBlinkState(2), 100); // Start opening
      setTimeout(() => setBlinkState(0), 200); // Fully open
    }, 3000 + Math.random() * 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);

  const eyeScaleY = blinkState === 1 ? 0.1 : blinkState === 2 ? 0.1 : 1;

  return (
    <group ref={groupRef}>
      <group ref={headRef}>
        {/* Head */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial 
            color="#e8c4a0" 
            roughness={0.4} 
            metalness={0.1}
          />
        </mesh>

        {/* Hair - styled wavy hair */}
        <group position={[0, 0.8, 0]}>
          {/* Main hair volume */}
          <mesh position={[0, 0.3, -0.2]}>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshStandardMaterial 
              color="#1a1a2e" 
              roughness={0.6} 
              metalness={0.2}
            />
          </mesh>
          
          {/* Hair strands/waves */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 0.8;
            return (
              <mesh 
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  0.4 + Math.random() * 0.2,
                  Math.sin(angle) * radius * 0.5
                ]}
                rotation={[Math.random() * 0.3, angle, Math.random() * 0.2]}
              >
                <boxGeometry args={[0.15, 0.4, 0.15]} />
                <meshStandardMaterial 
                  color="#1a1a2e" 
                  roughness={0.6} 
                  metalness={0.2}
                />
              </mesh>
            );
          })}
        </group>

        {/* Eyes */}
        <group position={[0, 0.1, 0.8]}>
          {/* Left Eye */}
          <group position={[-0.35, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.18, 32, 32]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
              <sphereGeometry args={[0.12, 32, 32]} />
              <meshStandardMaterial color="#3d2314" />
            </mesh>
            <mesh position={[0.02, 0.02, 0.18]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Eyelid for blinking */}
            <mesh 
              position={[0, 0.15, 0.05]} 
              scale={[1, eyeScaleY, 1]}
            >
              <sphereGeometry args={[0.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#e8c4a0" />
            </mesh>
          </group>

          {/* Right Eye */}
          <group position={[0.35, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.18, 32, 32]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, 0, 0.1]}>
              <sphereGeometry args={[0.12, 32, 32]} />
              <meshStandardMaterial color="#3d2314" />
            </mesh>
            <mesh position={[0.02, 0.02, 0.18]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Eyelid for blinking */}
            <mesh 
              position={[0, 0.15, 0.05]} 
              scale={[1, eyeScaleY, 1]}
            >
              <sphereGeometry args={[0.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#e8c4a0" />
            </mesh>
          </group>
        </group>

        {/* Eyebrows */}
        <group position={[0, 0.35, 0.75]}>
          <mesh position={[-0.35, 0, 0]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[0.25, 0.04, 0.05]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          <mesh position={[0.35, 0, 0]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.25, 0.04, 0.05]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
        </group>

        {/* Nose */}
        <mesh position={[0, -0.1, 0.9]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#dcc4a8" />
        </mesh>

        {/* Mouth - slight smile */}
        <mesh position={[0, -0.35, 0.85]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.15, 0.03, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#c4857a" />
        </mesh>

        {/* Freckles */}
        {[...Array(6)].map((_, i) => {
          const x = (Math.random() - 0.5) * 0.4;
          const y = -0.15 + (Math.random() - 0.5) * 0.2;
          return (
            <mesh 
              key={i} 
              position={[x, y, 0.95]}
            >
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshStandardMaterial color="#c9a88c" />
            </mesh>
          );
        })}

        {/* Earring */}
        <mesh position={[-1.05, -0.1, 0]} rotation={[0, 0, 0.3]}>
          <torusGeometry args={[0.08, 0.02, 8, 24]} />
          <meshStandardMaterial 
            color="#c0c0c0" 
            roughness={0.2} 
            metalness={0.9}
          />
        </mesh>
      </group>
    </group>
  );
}

// Scene setup with camera and lighting
function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 4);
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45} />
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1} 
        castShadow
      />
      <pointLight position={[-5, 3, 5]} intensity={0.5} color="#8b5cf6" />
      <pointLight position={[5, -3, 5]} intensity={0.3} color="#3b82f6" />
      
      {/* Character */}
      <Float rotationIntensity={0.2} floatIntensity={0.3} speed={2}>
        <CharacterModel mousePosition={mousePosition} />
      </Float>
      
      {/* Environment and shadows */}
      <Environment preset="city" />
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.3} 
        scale={5} 
        blur={2.5} 
        far={4}
      />
    </>
  );
}

// Main 3D Character Canvas Component
export function Character3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}