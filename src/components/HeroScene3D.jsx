import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, useGLTF, Stars, Sphere } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef, Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { useDarkMode } from '../hooks/useDarkMode'

function NeuralPathway({ start, end, color, isDark }) {
  const curve = useMemo(() => {
    // Create a curved path that "plugs" into the brain
    return new THREE.CatmullRomCurve3([
      start,
      new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5).add(new THREE.Vector3(Math.random() * 0.4, 1, Math.random() * 0.4)),
      end
    ])
  }, [start, end])

  return (
    <mesh>
      <tubeGeometry args={[curve, 32, 0.012, 8, false]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={isDark ? 0.25 : 0.15} 
        blending={THREE.AdditiveBlending} 
      />
    </mesh>
  )
}

function NeuralField({ color, isDark, brainRotationRef }) {
  const groupRef = useRef()
  
  const neurons = useMemo(() => {
    return [
      { pos: new THREE.Vector3(-2.8, 1.2, 0.5), anchor: new THREE.Vector3(-0.8, 0.5, 0.2) },
      { pos: new THREE.Vector3(2.8, 0.8, -0.5), anchor: new THREE.Vector3(0.8, 0.3, -0.2) },
      { pos: new THREE.Vector3(-1.8, -1.8, 1), anchor: new THREE.Vector3(-0.4, -0.6, 0.4) },
      { pos: new THREE.Vector3(1.8, -1.5, -1), anchor: new THREE.Vector3(0.4, -0.5, -0.3) },
      { pos: new THREE.Vector3(0, 2.2, -1.5), anchor: new THREE.Vector3(0, 0.8, -0.4) },
    ]
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current && brainRotationRef.current) {
      // Sync with brain rotation but add a slight lag/float
      groupRef.current.rotation.y = brainRotationRef.current.y * 0.8
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {neurons.map((n, i) => (
        <group key={i}>
          <group position={n.pos}>
            <Sphere args={[0.07, 16, 16]}>
              <meshBasicMaterial color={color} />
            </Sphere>
            <Sphere args={[0.2, 16, 16]}>
              <meshBasicMaterial color={color} transparent opacity={0.1} />
            </Sphere>
            <pointLight intensity={0.5} distance={2} color={color} />
          </group>

          <NeuralPathway 
            start={n.pos} 
            end={n.anchor} 
            color={color} 
            isDark={isDark}
          />
        </group>
      ))}
    </group>
  )
}

function BrainModel({ isDark, brainRotationRef }) {
  const { scene } = useGLTF('/human-brain.glb')
  const brainRef = useRef()

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color = new THREE.Color(isDark ? '#38BDF8' : '#0284C7')
      child.material.emissive = new THREE.Color(isDark ? '#0EA5E9' : '#0369A1')
      child.material.emissiveIntensity = isDark ? 0.7 : 0.2
      child.material.roughness = 0.4
      child.material.metalness = 0.7
    }
  })

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (brainRef.current) {
      const ry = t * 0.15
      const rz = Math.sin(t * 0.2) * 0.05
      brainRef.current.rotation.y = ry
      brainRef.current.rotation.z = rz
      if (brainRotationRef.current) {
        brainRotationRef.current.y = ry
        brainRotationRef.current.z = rz
      }
    }
  })

  return (
    <primitive 
      ref={brainRef} 
      object={scene} 
      scale={1.4} 
      position={[0, 0, 0]} 
    />
  )
}

function Scene({ isDark }) {
  const accentColor = isDark ? '#38BDF8' : '#0284C7'
  const brainRotationRef = useRef({ y: 0, z: 0 })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={30} />
      <ambientLight intensity={isDark ? 0.6 : 1} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color={accentColor} />
      <pointLight position={[-10, -10, -10]} intensity={1} color={accentColor} />
      
      <Stars radius={400} depth={50} count={isDark ? 1200 : 400} factor={4} saturation={0} fade speed={1} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
        <Suspense fallback={null}>
          <BrainModel isDark={isDark} brainRotationRef={brainRotationRef} />
        </Suspense>
        <NeuralField color={accentColor} isDark={isDark} brainRotationRef={brainRotationRef} />
      </Float>
    </>
  )
}

export default function HeroScene3D() {
  const isDark = useDarkMode()

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 10], fov: 30 }}
      style={{ background: 'transparent', pointerEvents: 'none' }}
      gl={{ 
        alpha: true, 
        antialias: true, 
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
        premultipliedAlpha: false
      }}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0)
      }}
    >
      <Suspense fallback={null}>
        <Scene isDark={isDark} />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/human-brain.glb')
