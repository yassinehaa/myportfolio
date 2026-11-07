import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCcw, Sparkles } from 'lucide-react';

export const Background3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [motionMode, setMotionMode] = useState<'interactive' | 'gentle'>('interactive');
  const [wireframeGlow, setWireframeGlow] = useState(true);

  // Mouse & Scroll references for smooth interpolation
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ current: 0, target: 0 });
  const monogramGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Detect software WebGL per Three.js architectural guidelines
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090909, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 3. Construct Procedural 3D "Y" and "H" Geometries
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    monogramGroupRef.current = rootGroup;

    // Helper: Create "Y" shape with clean architectural angles
    const createYShape = () => {
      const shape = new THREE.Shape();
      const w = 0.24; // stem half-width
      const armW = 0.28; // arm thickness
      
      // Bottom stem
      shape.moveTo(-w, -1.25);
      shape.lineTo(w, -1.25);
      shape.lineTo(w, -0.15);
      // Right diagonal arm
      shape.lineTo(1.05, 1.25);
      shape.lineTo(1.05 - armW, 1.25);
      shape.lineTo(0, 0.25); // Center crotch
      // Left diagonal arm
      shape.lineTo(-(1.05 - armW), 1.25);
      shape.lineTo(-1.05, 1.25);
      shape.lineTo(-w, -0.15);
      shape.closePath();
      return shape;
    };

    // Helper: Create "H" shape with clean architectural proportions
    const createHShape = () => {
      const shape = new THREE.Shape();
      const colW = 0.32;
      const span = 0.95;
      const barH = 0.28;

      // Left column bottom
      shape.moveTo(-span, -1.25);
      shape.lineTo(-span + colW, -1.25);
      shape.lineTo(-span + colW, -barH / 2);
      // Crossbar to right column
      shape.lineTo(span - colW, -barH / 2);
      shape.lineTo(span - colW, -1.25);
      // Right column bottom
      shape.lineTo(span, -1.25);
      shape.lineTo(span, 1.25);
      shape.lineTo(span - colW, 1.25);
      shape.lineTo(span - colW, barH / 2);
      // Crossbar top
      shape.lineTo(-span + colW, barH / 2);
      shape.lineTo(-span + colW, 1.25);
      shape.lineTo(-span, 1.25);
      shape.closePath();
      return shape;
    };

    const extrudeSettings = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.045,
      bevelThickness: 0.045,
    };

    const yGeometry = new THREE.ExtrudeGeometry(createYShape(), extrudeSettings);
    const hGeometry = new THREE.ExtrudeGeometry(createHShape(), extrudeSettings);

    // Center geometries
    yGeometry.center();
    hGeometry.center();

    // PBR Titanium Material with Cinnabar Accent Emissive
    const solidMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.28,
      metalness: 0.88,
      emissive: 0xe32b3c,
      emissiveIntensity: 0.09,
    });

    // Wireframe Glow Material
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xe32b3c,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    // Group for "Y"
    const yGroup = new THREE.Group();
    const yMesh = new THREE.Mesh(yGeometry, solidMaterial);
    const yWire = new THREE.Mesh(yGeometry, wireMaterial);
    yGroup.add(yMesh);
    yGroup.add(yWire);
    yGroup.position.set(-1.35, 0, 0);
    rootGroup.add(yGroup);

    // Group for "H"
    const hGroup = new THREE.Group();
    const hMesh = new THREE.Mesh(hGeometry, solidMaterial);
    const hWire = new THREE.Mesh(hGeometry, wireMaterial);
    hGroup.add(hMesh);
    hGroup.add(hWire);
    hGroup.position.set(1.35, 0, 0);
    rootGroup.add(hGroup);

    // 4. Floating Orbital Geometric Elements & Particle Ring
    const particleCount = isSoftwareGl ? 35 : 75;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 3.5;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = height;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xe32b3c,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    rootGroup.add(particles);

    // Accent Orbital Rings
    const ringGeometry = new THREE.TorusGeometry(2.8, 0.012, 16, 80);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xe32b3c,
      transparent: true,
      opacity: 0.18,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI * 0.38;
    rootGroup.add(ringMesh);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);

    const redRimLight = new THREE.PointLight(0xe32b3c, 4.5, 12);
    redRimLight.position.set(-3, -2, 2);
    scene.add(redRimLight);

    const blueBackLight = new THREE.PointLight(0x223344, 2.0, 10);
    blueBackLight.position.set(2, 3, -4);
    scene.add(blueBackLight);

    // 6. Event Handlers: Mouse & Scroll
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 ... +1
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current.target = maxScroll > 0 ? scrollY / maxScroll : 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with Organic Motions
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth damping on mouse input
      const dampSpeed = 2.4;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * (dampSpeed * delta);
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * (dampSpeed * delta);

      // Smooth damping on scroll
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * (3.0 * delta);

      if (!prefersReducedMotion) {
        // Organic floating wave
        const floatY = Math.sin(elapsed * 1.1) * 0.18;
        const wobbleX = Math.cos(elapsed * 0.8) * 0.08;

        // Interactive tilt vs gentle mode
        const tiltIntensity = motionMode === 'interactive' ? 0.45 : 0.18;
        const targetRotY = mouseRef.current.x * tiltIntensity + (scrollRef.current.current * Math.PI * 1.2);
        const targetRotX = -mouseRef.current.y * tiltIntensity + wobbleX;

        rootGroup.rotation.y = targetRotY;
        rootGroup.rotation.x = targetRotX;
        rootGroup.position.y = floatY - (scrollRef.current.current * 1.2);
        rootGroup.position.z = -scrollRef.current.current * 2.2;

        // Individual subtle counters: "Y" and "H" breathing relative to each other
        yGroup.rotation.z = Math.sin(elapsed * 1.4) * 0.04;
        hGroup.rotation.z = -Math.sin(elapsed * 1.4) * 0.04;

        yGroup.position.y = Math.cos(elapsed * 1.3) * 0.06;
        hGroup.position.y = -Math.cos(elapsed * 1.3) * 0.06;

        // Orbital particles and ring rotation
        particles.rotation.y = elapsed * 0.12;
        ringMesh.rotation.z = elapsed * 0.08;

        // Orbit red point light around the monogram
        redRimLight.position.x = Math.sin(elapsed * 0.9) * 4.5;
        redRimLight.position.y = Math.cos(elapsed * 0.7) * 2.5;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      yGeometry.dispose();
      hGeometry.dispose();
      solidMaterial.dispose();
      wireMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, [motionMode]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Three.js Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full opacity-65 md:opacity-80 transition-opacity duration-700"
      />

      {/* Subtle Bottom Ambient Gradient Mask ensuring maximum text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/40 pointer-events-none" />

      {/* Discreet 3D Motion Mode Toggle (Accessible in bottom corner) */}
      <div className="absolute bottom-5 left-6 pointer-events-auto hidden md:flex items-center gap-2 text-[10px] font-mono text-[#a09c9a]/60 hover:text-[#f2efeb] transition-colors">
        <button
          onClick={() => setMotionMode(m => m === 'interactive' ? 'gentle' : 'interactive')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#121212]/80 hover:bg-[#181818] border border-white/10 transition-all cursor-pointer backdrop-blur-sm"
          title="Toggle 3D YH Monogram Response Mode"
        >
          <Sparkles className="w-3 h-3 text-[#e32b3c]" />
          <span>3D YH: {motionMode === 'interactive' ? 'INTERACTIVE ORBIT' : 'GENTLE FLOATING'}</span>
        </button>
      </div>
    </div>
  );
};
