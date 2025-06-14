import React, { useEffect, useRef, Suspense, forwardRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Coffee Model Component with forwardRef
const CoffeeModel = forwardRef(
  ({ position = [0, 0, 0], scale = 1, color = "#8B4513" }, ref) => {
    // Since we can't load external GLB files, we'll create a stylized coffee cup using primitives
    return (
      <group ref={ref} position={position} scale={scale}>
        {/* Coffee Cup Base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.6, 1.2, 32]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Coffee Cup Handle */}
        <mesh position={[0.9, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.3, 0.08, 8, 16]} />
          <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Coffee Liquid */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.75, 0.75, 0.1, 32]} />
          <meshStandardMaterial
            color="#2F1B14"
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>

        {/* Steam Effect */}
        <group position={[0, 0.8, 0]}>
          {[...Array(5)].map((_, i) => (
            <mesh
              key={i}
              position={[Math.sin(i) * 0.2, i * 0.3, Math.cos(i) * 0.2]}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial
                color="white"
                transparent
                opacity={0.6 - i * 0.1}
                roughness={1}
              />
            </mesh>
          ))}
        </group>
      </group>
    );
  }
);

// Lights Component
const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
    </>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-black">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>
);

// Main App Component
export default function Demo() {
  const containerRef = useRef();
  const canvasRef = useRef();
  const model1Ref = useRef();
  const model2Ref = useRef();
  const timelineRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const model1 = model1Ref.current;
    const model2 = model2Ref.current;

    if (!container || !model1 || !model2) return;

    // Create GSAP timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        pin: ".canvas-container",
        anticipatePin: 1,
        refreshPriority: -1,
        // markers: true, // Enable for debugging
      },
    });

    // Initial positions
    gsap.set(model1.position, { x: -2, y: 0, z: 0 });
    gsap.set(model2.position, { x: 8, y: 0, z: 0 });
    gsap.set(model1.rotation, { y: -0.5 });
    gsap.set(model2.rotation, { y: 0.5 });

    // Animation timeline
    tl.to(
      model1.position,
      {
        x: -8,
        duration: 1,
        ease: "power2.inOut",
      },
      0
    )
      .to(
        model1.rotation,
        {
          y: -1.5,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        model2.position,
        {
          x: 2,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        model2.rotation,
        {
          y: -0.5,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

    timelineRef.current = tl;

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative">
      {/* Scroll Container */}
      <div ref={containerRef} className="h-[200vh] relative">
        {/* Fixed Canvas Container */}
        <div className="canvas-container fixed inset-0 z-10">
          <Canvas
            ref={canvasRef}
            camera={{ position: [0, 0, 10], fov: 50 }}
            shadows
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <Lights />

              {/* Environment */}
              <Environment preset="studio" />

              {/* 3D Models */}
              <CoffeeModel ref={model1Ref} color="#8B4513" scale={1.5} />
              <CoffeeModel ref={model2Ref} color="#D2691E" scale={1.2} />

              {/* Controls */}
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
            </Suspense>
          </Canvas>
        </div>

        {/* Content Sections */}
        <div className="relative z-20 pointer-events-none">
          {/* Section 1 */}
          <section className="h-screen flex items-center justify-end pr-16">
            <div className="max-w-md text-white pointer-events-auto">
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Classic
                <br />
                <span className="text-amber-400">Roast</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Experience the rich, bold flavors of our signature dark roast.
                Carefully crafted for the perfect morning ritual.
              </p>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105">
                Discover More
              </button>
            </div>
          </section>

          {/* Section 2 */}
          <section className="h-screen flex items-center justify-start pl-16">
            <div className="max-w-md text-white pointer-events-auto">
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Golden
                <br />
                <span className="text-orange-400">Blend</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                A lighter, more delicate blend with notes of caramel and
                vanilla. Perfect for afternoon contemplation.
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105">
                Explore Blend
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Performance Monitor */}
      <div className="fixed top-4 left-4 z-30 bg-black/50 text-white p-3 rounded-lg text-sm font-mono">
        <div>
          Scroll Progress: <span id="progress">0%</span>
        </div>
        <div>
          FPS: <span id="fps">60</span>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 -z-10"></div>
    </div>
  );
}
