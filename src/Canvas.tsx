
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CanvasProps {
  skyboxImages?: string[]; // Array of 6 image URLs for the skybox
  skyboxVideo?: string; // URL for the skybox video
}

const Canvas: React.FC<CanvasProps> = ({ skyboxImages = [], skyboxVideo }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    let video: HTMLVideoElement | null = null;
    let videoTexture: THREE.VideoTexture | null = null;

    // Skybox video setup
    if (skyboxVideo) {
      video = document.createElement('video');
      video.src = skyboxVideo;
      video.crossOrigin = 'anonymous';
      video.loop = true;
      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.play();
      videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      videoTexture.format = THREE.RGBFormat;

      // Use a large sphere geometry for immersive 3D effect
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      // Invert the sphere to render the texture on the inside
      geometry.scale(-1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ map: videoTexture });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);
    } else if (skyboxImages.length === 6) {
      // Skybox image setup
      const loader = new THREE.CubeTextureLoader();
      const texture = loader.load(skyboxImages);
      scene.background = texture;
    }

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Animation loop
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      if (video) {
        video.pause();
        video.src = '';
      }
    };
  }, [skyboxImages, skyboxVideo]);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default Canvas;
