import React, { forwardRef, useRef, useMemo, useCallback } from "react";
import { Center, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CoffeeModel = forwardRef(
  (
    {
      scrollBasedAnimation = true,
      numberOfSections = 5,
      isMultiple = false,
      multipleIndex = 0,
      ...props
    },
    ref
  ) => {
    const { materials, nodes } = useGLTF("./model/cup-foree.glb", true);
    const groupRef = useRef();
    const scroll = useScroll();

    const materialOpacity = 0.8;
    const materialRoughness = 0.1;
    const materialMetalness = 0.0;
    const materialTransmission = 0.9;

    const positionAmplitude = 2;
    const enableRotation = true;
    const enablePositionChange = true;

    const transparentMaterial = useMemo(() => {
      return new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: materialOpacity,
        roughness: materialRoughness,
        metalness: materialMetalness,
        transmission: materialTransmission,
      });
    }, [
      materialOpacity,
      materialRoughness,
      materialMetalness,
      materialTransmission,
    ]);

    // Generate section animations based on numberOfSections
    const sectionAnimations = useMemo(() => {
      const baseAnimations = [
        // Section 0 - "Grind The Essentials"
        {
          rotation: { x: 0, y: 3, z: 0 },
          position: { x: 0, y: -1, z: 0 },
          scale: 0.7,
        },
        // Section 1 - "Fresh Beans / Modern Tech / Every Cup"
        {
          rotation: { x: 0, y: Math.PI * 3, z: 0.02 },
          position: { x: -1.5, y: -1.2, z: 0.5 },
          scale: 1.1,
        },
        // Section 2 - "Our Story"
        {
          rotation: { x: -0.3, y: Math.PI, z: -0.3 },
          position: { x: 0, y: -0.3, z: 1 },
          scale: 0.5,
        },
        // Section 3 - "What's Poppin"
        {
          rotation: { x: 0.2, y: Math.PI * 0.7, z: 0 },
          position: { x: 3, y: -0.9, z: -0.5 },
          scale: 1.4,
        },
        // Section 4 - "Menu Must-Haves" - Hide main model
        {
          rotation: { x: 0, y: Math.PI * 2, z: 0 },
          position: { x: 0, y: 0, z: 2 },
          scale: 0, // Hide main model
        },
      ];

      // Generate additional animations if numberOfSections > 5
      const animations = [...baseAnimations];
      while (animations.length < numberOfSections) {
        const cycleIndex = (animations.length - 5) % baseAnimations.length;
        const baseAnim = baseAnimations[cycleIndex];
        const variation = Math.sin(animations.length * 0.5) * 0.3;

        animations.push({
          rotation: {
            x: baseAnim.rotation.x + variation,
            y: baseAnim.rotation.y + variation,
            z: baseAnim.rotation.z + variation * 0.5,
          },
          position: {
            x: baseAnim.position.x + variation,
            y: baseAnim.position.y + variation * 0.5,
            z: baseAnim.position.z + variation * 0.3,
          },
          scale: Math.max(0.1, baseAnim.scale + variation * 0.2),
        });
      }

      return animations;
    }, [numberOfSections]);

    // Define positions for the 3 models at the end
    const multipleModelPositions = [
      { x: -5.5, y: -3, z: 0 }, // Left model
      { x: 0, y: -3, z: 0 }, // Center model
      { x: 5.5, y: -3, z: 0 }, // Right model
    ];

    const multipleModelRotations = [
      { x: 0, y: 3.2, z: 0 }, // Left model - slight left turn/
      { x: 0, y: 3, z: 0 }, // Center model - facing forward
      { x: 0, y: 2.8, z: 0 }, // Right model - slight right turn
    ];

    const multipleModelScale = [0.6, 0.6, 0.6];

    // Ref callback to handle both internal ref and forwarded ref
    const setGroupRef = useCallback(
      (node) => {
        groupRef.current = node;
        if (ref) {
          if (typeof ref === "function") ref(node);
          else ref.current = node;
        }
      },
      [ref]
    );

    // Animation frame
    useFrame((state) => {
      if (!groupRef.current || !scrollBasedAnimation) return;

      // Get scroll progress (0 to 1)
      const scrollProgress = scroll.offset;

      if (isMultiple) {
        // Animation for the 3 models at the end
        const lastSectionStart = Math.max(
          0.8,
          (numberOfSections - 2) / numberOfSections
        ); // Adjust based on numberOfSections
        const appearProgress = Math.max(
          0,
          (scrollProgress - lastSectionStart) / (1 - lastSectionStart)
        );

        if (scrollProgress >= lastSectionStart) {
          // Set position for each model
          const basePosition = multipleModelPositions[multipleIndex];
          const baseRotation = multipleModelRotations[multipleIndex];
          const baseScale = multipleModelScale[multipleIndex];

          // Animate entrance with scale and position
          const scaleProgress = Math.min(1, appearProgress * 2); // Scale up quickly
          const bounceEffect = 1 + Math.sin(appearProgress * Math.PI) * 0.1; // Subtle bounce

          groupRef.current.position.x = basePosition.x;
          groupRef.current.position.y =
            basePosition.y + (1 - appearProgress) * 2; // Drop from above
          groupRef.current.position.z = basePosition.z;

          groupRef.current.rotation.x = baseRotation.x;
          groupRef.current.rotation.y =
            baseRotation.y + (1 - appearProgress) * Math.PI; // Spin into place
          groupRef.current.rotation.z = baseRotation.z;

          groupRef.current.scale.setScalar(
            scaleProgress * bounceEffect * baseScale
          );

          // Add subtle floating animation when fully appeared
          if (appearProgress > 0.5) {
            const floatTime = state.clock.elapsedTime + multipleIndex * 0.5; // Offset timing per model
            groupRef.current.position.y += Math.sin(floatTime) * 0.1;
            groupRef.current.rotation.y += Math.sin(floatTime * 0.5) * 0.05;
          }
        } else {
          // Hide models when not in last section
          groupRef.current.scale.setScalar(0);
        }

        return; // Exit early for multiple models
      }

      // Original single model animation logic
      // Calculate current section and progress within that section
      const totalProgress = scrollProgress * (numberOfSections - 1);
      const currentSection = Math.floor(totalProgress);
      const sectionProgress = totalProgress - currentSection;

      // Ensure we don't go out of bounds
      const fromSection = Math.min(
        currentSection,
        sectionAnimations.length - 1
      );
      const toSection = Math.min(
        currentSection + 1,
        sectionAnimations.length - 1
      );

      const fromAnim = sectionAnimations[fromSection];
      const toAnim = sectionAnimations[toSection];

      // Smooth interpolation function
      const lerp = (start, end, factor) => start + (end - start) * factor;
      const smoothstep = (t) => t * t * (3 - 2 * t); // Smooth easing
      const easedProgress = smoothstep(sectionProgress);

      if (enableRotation) {
        // Interpolate rotation
        groupRef.current.rotation.x = lerp(
          fromAnim.rotation.x,
          toAnim.rotation.x,
          easedProgress
        );
        groupRef.current.rotation.y = lerp(
          fromAnim.rotation.y,
          toAnim.rotation.y,
          easedProgress
        );
        groupRef.current.rotation.z = lerp(
          fromAnim.rotation.z,
          toAnim.rotation.z,
          easedProgress
        );
      }

      if (enablePositionChange) {
        // Interpolate position
        groupRef.current.position.x =
          lerp(fromAnim.position.x, toAnim.position.x, easedProgress) *
          positionAmplitude;
        groupRef.current.position.y =
          lerp(fromAnim.position.y, toAnim.position.y, easedProgress) *
          positionAmplitude;
        groupRef.current.position.z =
          lerp(fromAnim.position.z, toAnim.position.z, easedProgress) *
          positionAmplitude;
      }

      // Interpolate scale
      const targetScale = lerp(fromAnim.scale, toAnim.scale, easedProgress);
      groupRef.current.scale.setScalar(targetScale);
    });

    return (
      <Center>
        <group {...props} ref={setGroupRef}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cup.geometry}
            material={transparentMaterial}
            position={nodes.Cup.position}
          />

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Logo.geometry}
            material={materials.LogoMaterial}
            position={nodes.Logo.position}
          />

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Lid.geometry}
            material={transparentMaterial}
            position={nodes.Lid.position}
          />

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.CoffeFluidMesh.geometry}
            material={materials.CoffeeLiquidMaterial}
            position={nodes.CoffeFluidMesh.position}
            visible={false}
          />

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Coffee.geometry}
            material={materials.CoffeeMaterial}
            position={nodes.Coffee.position}
          />

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Foam.geometry}
            material={materials.FoamMaterial}
            position={nodes.Foam.position}
          />
        </group>
      </Center>
    );
  }
);

CoffeeModel.displayName = "CoffeeModel";

export default CoffeeModel;
useGLTF.preload("./model/cup-foree.glb");
