import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Planet(props: any) {
    const ref = useRef<Mesh>()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    
    useFrame((state, delta) => {
      if (ref.current) {
        ref.current.rotation.x += delta;
      }
    })

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => (event.stopPropagation(), hover(true))}
            onPointerOut={(event) => hover(false)}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

export function SolarSystemComponent() {
    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Canvas style={{ background: 'black' }}>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Planet position={[-3, 0, 0]}  />
                <Planet position={[3, 0, 0]} />
                <Planet position={[0, 0, 0]} scale={2} />
                <OrbitControls />
            </Canvas>
        </div>
    )
}