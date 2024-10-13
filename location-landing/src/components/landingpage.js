import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import LocationMap from './locationmap'; // Import your LocationMap component

const LandingPage = () => {
  const [showMap, setShowMap] = React.useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Welcome to the Location Tracker</h1>
        <p className="mt-4">Click the button to see your location on the map.</p>
        <button 
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? 'Hide Map' : 'Show Map'}
        </button>
      </div>
      <Canvas className="w-full h-96">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={'orange'} />
        </mesh>
      </Canvas>
      {showMap && <LocationMap />}
    </div>
  );
};

export default LandingPage;
