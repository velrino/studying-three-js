import { useRef, useState, Suspense } from 'react'
import { Mesh, TextureLoader, BackSide } from 'three'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Stars() {
    const texture = useLoader(TextureLoader, "textures/galaxy.png");

    return (
        <mesh>
            <sphereGeometry args={[1000, 32, 32]} />
            <meshBasicMaterial map={texture} side={BackSide} transparent={true} />
        </mesh>
    );
}

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
            <meshStandardMaterial color={hovered ? props.colorHovered : props.colorDefault} />
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
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>
                <Planet position={[-3, 0, 0]} colorDefault='#A22B0F' />
                <Planet position={[3, 0, 0]} colorDefault='#1F9FC7' />
                <Planet position={[0, 0, 0]} colorDefault='#FC9601' colorHovered='#FC9601' scale={2} />
                <OrbitControls />
            </Canvas>
        </div>
    )
}
