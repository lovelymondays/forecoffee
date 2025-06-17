import { Center, useGLTF, useScroll } from "@react-three/drei";
import { forwardRef, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";

const CoffeeModel = forwardRef(
  (
    {
      scrollBasedAnimation = true,
      sectionIndex = 0, // Which section this model represents
      totalSections = 10, // Total number of sections
      ...props
    },
    ref
  ) => {
    const { materials, nodes } = useGLTF("./model/cup-foree.glb", true);
    const scroll = useScroll();

    // Leva controls for animation parameters
    const {
      enableScrollAnimation,
      rotationSpeed,
      floatAmplitude,
      floatSpeed,
      // scaleVariation,
      positionSmoothing,
      materialOpacity,
      materialRoughness,
      materialMetalness,
      materialTransmission,
    } = useControls(`Coffee Model ${sectionIndex + 1} - Animation`, {
      // Animation controls
      enableScrollAnimation: { value: true },
      rotationSpeed: { value: 0.1, min: 0, max: 2, step: 0.01 },
      floatAmplitude: { value: 0.1, min: 0, max: 1, step: 0.01 },
      floatSpeed: { value: 1, min: 0, max: 5, step: 0.1 },
      scaleVariation: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
      positionSmoothing: { value: 0.1, min: 0.01, max: 1, step: 0.01 },

      // Material controls
      materialOpacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
      materialRoughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
      materialMetalness: { value: 0.1, min: 0, max: 1, step: 0.01 },
      materialTransmission: { value: 0.2, min: 0, max: 1, step: 0.01 },
    });

    // Separate position controls for each section
    const positionControls = {};
    const scaleControls = {};
    const rotationControls = {};

    // Create dynamic position controls for each section
    // for (let i = 0; i < totalSections; i++) {
    //   const sectionControls = useControls(
    //     `Model ${sectionIndex + 1} - Section ${i + 1} Position`,
    //     {
    //       [`position_${i}`]: {
    //         value: {
    //           x: [-3, 3, 0, 0, -2, 2, -1, 1][i] || 0,
    //           y: [0, 0, 2, -2, 1, -1, 0.5, -0.5][i] || 0,
    //           z: [0, 0, 0, 2, -1, 1, -0.5, 0.5][i] || 0,
    //         },
    //         step: 0.1,
    //       },
    //       [`scale_${i}`]: {
    //         value: [0.4, 0.6, 0.8, 0.5, 0.7, 0.3, 0.9, 0.6][i] || 0.5,
    //         min: 0.1,
    //         max: 3,
    //         step: 0.05,
    //       },
    //       [`rotationX_${i}`]: {
    //         value: 0,
    //         min: -180,
    //         max: 180,
    //         step: 1,
    //       },
    //       [`rotationY_${i}`]: {
    //         value: [0, 90, 180, 270, 45, 135, 225, 315][i] || 0,
    //         min: -180,
    //         max: 180,
    //         step: 1,
    //       },
    //       [`rotationZ_${i}`]: {
    //         value: 0,
    //         min: -180,
    //         max: 180,
    //         step: 1,
    //       },
    //     }
    //   );

    //   positionControls[i] = sectionControls[`position_${i}`];
    //   scaleControls[i] = sectionControls[`scale_${i}`];
    //   rotationControls[i] = {
    //     x: sectionControls[`rotationX_${i}`] * (Math.PI / 180),
    //     y: sectionControls[`rotationY_${i}`] * (Math.PI / 180),
    //     z: sectionControls[`rotationZ_${i}`] * (Math.PI / 180),
    //   };
    // }

    // Static positioning controls (when scroll animation is disabled)
    // const {
    //   staticPositionX,
    //   staticPositionY,
    //   staticPositionZ,
    //   staticScale,
    //   staticRotationX,
    //   staticRotationY,
    //   staticRotationZ,
    // } = useControls(`Model ${sectionIndex + 1} - Static Position`, {
    //   staticPositionX: {
    //     value: initialPosition[0],
    //     min: -10,
    //     max: 10,
    //     step: 0.1,
    //   },
    //   staticPositionY: {
    //     value: initialPosition[1],
    //     min: -10,
    //     max: 10,
    //     step: 0.1,
    //   },
    //   staticPositionZ: {
    //     value: initialPosition[2],
    //     min: -10,
    //     max: 10,
    //     step: 0.1,
    //   },
    //   staticScale: { value: scale, min: 0.1, max: 3, step: 0.05 },
    //   staticRotationX: { value: 0, min: -180, max: 180, step: 1 },
    //   staticRotationY: { value: 0, min: -180, max: 180, step: 1 },
    //   staticRotationZ: { value: 0, min: -180, max: 180, step: 1 },
    // });

    // Create dynamic material
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

    const groupRef = useRef();
    const baseRotation = useRef(0);
    const animationTime = useRef(0);

    // Dynamic section configuration using individual position controls
    const sectionConfig = useMemo(() => {
      const positions = [];
      const scales = [];
      const rotations = [];

      // Use the individual position controls for each section
      for (let i = 0; i < totalSections; i++) {
        const pos = positionControls[i] || { x: 0, y: 0, z: 0 };
        const scl = scaleControls[i] || 1;
        const rot = rotationControls[i] || { x: 0, y: 0, z: 0 };

        positions.push([pos.x, pos.y, pos.z]);
        scales.push(scl);
        rotations.push(rot);
      }

      return { positions, scales, rotations };
    }, [totalSections, positionControls, scaleControls, rotationControls]);

    // Animation frame
    useFrame((state, delta) => {
      if (!groupRef.current) return;

      animationTime.current += delta;

      if (enableScrollAnimation && scroll && scrollBasedAnimation) {
        const scrollOffset = scroll.offset;
        const progress = scrollOffset * (totalSections - 1);

        // Calculate current section and interpolation
        const currentSection = Math.floor(progress);
        const sectionProgress = progress - currentSection;
        const nextSection = Math.min(currentSection + 1, totalSections - 1);

        // Get positions, scales, and rotations for interpolation
        const currentPos = sectionConfig.positions[currentSection] || [0, 0, 0];
        const nextPos = sectionConfig.positions[nextSection] || currentPos;
        // const currentScale = sectionConfig.scales[currentSection] || 1;
        // const nextScale = sectionConfig.scales[nextSection] || currentScale;
        const currentRot = sectionConfig.rotations[currentSection] || {
          x: 0,
          y: 0,
          z: 0,
        };
        const nextRot = sectionConfig.rotations[nextSection] || currentRot;

        // Smooth interpolation with easing
        const easeProgress = 1 - Math.pow(1 - sectionProgress, 3); // Ease out cubic

        const x = THREE.MathUtils.lerp(currentPos[0], nextPos[0], easeProgress);
        const y = THREE.MathUtils.lerp(currentPos[1], nextPos[1], easeProgress);
        const z = THREE.MathUtils.lerp(currentPos[2], nextPos[2], easeProgress);
        // const s = THREE.MathUtils.lerp(currentScale, nextScale, easeProgress);

        // Interpolate rotations
        const rx = THREE.MathUtils.lerp(currentRot.x, nextRot.x, easeProgress);
        const ry = THREE.MathUtils.lerp(currentRot.y, nextRot.y, easeProgress);
        const rz = THREE.MathUtils.lerp(currentRot.z, nextRot.z, easeProgress);

        // Apply floating animation
        const floatOffset =
          Math.sin(animationTime.current * floatSpeed) * floatAmplitude;

        // Smooth position updates
        const targetPosition = new THREE.Vector3(x, y + floatOffset, z);
        groupRef.current.position.lerp(targetPosition, positionSmoothing);

        // Scale animation with breathing effect
        // const breathingScale =
        //   s + Math.sin(animationTime.current * 2) * (scaleVariation * 0.5);
        // groupRef.current.scale.setScalar(breathingScale);

        // Apply all rotations
        groupRef.current.rotation.x = rx;
        groupRef.current.rotation.y = ry + baseRotation.current;
        groupRef.current.rotation.z = rz;
      } else {
        // Static positioning when scroll animation is disabled
        // const staticPos = new THREE.Vector3(
        //   staticPositionX,
        //   staticPositionY,
        //   staticPositionZ
        // );
        // Apply floating even in static mode
        // const floatOffset =
        //   Math.sin(animationTime.current * floatSpeed) * floatAmplitude;
        // staticPos.y += floatOffset;
        // groupRef.current.position.lerp(staticPos, positionSmoothing);
        // groupRef.current.scale.setScalar(staticScale);
        // Apply static rotations (converted from degrees to radians)
        // groupRef.current.rotation.x = staticRotationX * (Math.PI / 180);
        // groupRef.current.rotation.y =
        //   staticRotationY * (Math.PI / 180) + baseRotation.current;
        // groupRef.current.rotation.z = staticRotationZ * (Math.PI / 180);
      }

      // Continuous base rotation
      baseRotation.current += delta * rotationSpeed;
    });

    return (
      <Center>
        <group
          {...props}
          ref={(node) => {
            groupRef.current = node;
            if (ref) {
              if (typeof ref === "function") ref(node);
              else ref.current = node;
            }
          }}
        >
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

export default CoffeeModel;
useGLTF.preload("./model/cup-fore.glb");
