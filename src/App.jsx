/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from "@react-three/fiber";
import Watch from "./modelComps/Watch";
import { Environment, ScrollControls, useScroll } from "@react-three/drei";
import { getProject, val } from "@theatre/core";

import { SheetProvider, PerspectiveCamera, useCurrentSheet, editable as e, } from "@theatre/r3f";

function App() {
  const sheet  = getProject('Product Animation').sheet('Scene');

  return (
    <>
      <Canvas gl={{ physicallyCorrectLights: true, preserveDrawingBuffer: true }}>
        <ScrollControls pages={5}>
          <SheetProvider sheet={sheet}>
          <Scene />
        </SheetProvider>
        </ScrollControls>
      </Canvas>
    </>
  )
}

export default App

const Scene = () => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length);
    sheet.sequence.position = scroll.offset * sequenceLength;
  })

  return <>
  <color attach='background' args={['silver']} />
        <Environment preset='city' />
        <PerspectiveCamera theatreKey='Camera' makeDefault postion={[0,0,0]} fov={90} near={0.1} far={70} />
        <ambientLight intensity={1} />
        {/* <spotLight position={[1, 1, 1]} /> */}
        <directionalLight intensity={3} />
        <Watch /></>;
}