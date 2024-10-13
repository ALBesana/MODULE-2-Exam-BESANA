// main.js

import * as THREE from 'three';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the background color of the scene
scene.background = new THREE.Color(0x87CEEB); // Light blue background

// Wood color material
const woodMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });

// Function to create the smaller room
function createRoom() {
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xd3d3d3 }); // Light gray walls

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(4, 3);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.set(0, 1.5, -2);
    scene.add(backWall);

    // Left wall (with window)
    const leftWallGeometry = new THREE.PlaneGeometry(4, 3);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-2, 1.5, 0);
    scene.add(leftWall);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(4, 4);
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xdeb887 }); // Light wood floor color
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, 0);
    scene.add(floor);
}

// Function to create the bed and add a pillow
function createBed() {
    const bedWidth = 1.0;  // Slightly wider for single-sized
    const bedLength = 2.0; // Slightly longer    
    const bedHeight = 0.2;

    // Bed frame
    const bedFrameGeometry = new THREE.BoxGeometry(bedWidth, bedHeight, bedLength);
    const bedFrame = new THREE.Mesh(bedFrameGeometry, woodMaterial); // Wood-colored material
    bedFrame.position.set(-1.55, bedHeight / 2, -1.6); // Repositioned to the corner of the two walls
    scene.add(bedFrame);

    // Mattress
    const mattressGeometry = new THREE.BoxGeometry(bedWidth - 0.1, 0.05, bedLength - 0.1);
    const mattressMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const mattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    mattress.position.set(-1.55, bedHeight + 0.03, -1.6);
    scene.add(mattress);

    // Pillow
    const pillowGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.3);
    const pillowMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF });
    const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow.position.set(-1.55, bedHeight + 0.1, -1.8); // Positioned near the back wall
    scene.add(pillow);
}

// Function to create a study area (table, laptop, and chair with legs)
function createStudyArea() {
    const tableWidth = 1.0;
    const tableDepth = 0.5;
    const tableHeight = 0.7;

    // Tabletop
    const tableGeometry = new THREE.BoxGeometry(tableWidth, 0.05, tableDepth);
    const table = new THREE.Mesh(tableGeometry, woodMaterial); // Wood-colored material
    table.position.set(1.0, tableHeight, -1.2); // Closer to the wall
    scene.add(table);

    // Table legs (4 legs)
    const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, tableHeight, 32);
    const legPositions = [
        [1.5, tableHeight / 2, -1.45], [0.5, tableHeight / 2, -1.45],  // Back legs
        [1.5, tableHeight / 2, -0.95], [0.5, tableHeight / 2, -0.95]   // Front legs
    ];

    legPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, woodMaterial);
        leg.position.set(...pos);
        scene.add(leg);
    });

    // Laptop (open)
    const laptopBaseGeometry = new THREE.BoxGeometry(0.6, 0.03, 0.4);
    const laptopBase = new THREE.Mesh(laptopBaseGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
    laptopBase.position.set(1.0, tableHeight + 0.03, -1.15); 
    scene.add(laptopBase);

    const laptopScreenGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.02);
    const laptopScreen = new THREE.Mesh(laptopScreenGeometry, new THREE.MeshStandardMaterial({ color: 0x000000 }));
    laptopScreen.position.set(1.0, tableHeight + 0.25, -1.34); 
    laptopScreen.rotation.x = Math.PI / 1.8; // Tilted to look open
    scene.add(laptopScreen);

    // Chair seat
    const chairSeatGeometry = new THREE.BoxGeometry(0.5, 0.05, 0.5);
    const chairMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const chairSeat = new THREE.Mesh(chairSeatGeometry, chairMaterial);
    chairSeat.position.set(1.0, 0.45, -1.7);
    scene.add(chairSeat);

    // Chair legs (4 legs)
    const chairLegPositions = [
        [1.25, 0.2, -1.9], [0.75, 0.2, -1.9],  // Back legs
        [1.25, 0.2, -1.5], [0.75, 0.2, -1.5]   // Front legs
    ];

    chairLegPositions.forEach(pos => {
        const leg = new THREE.Mesh(legGeometry, chairMaterial);
        leg.position.set(...pos);
        scene.add(leg);
    });

    // Chair backrest
    const chairBackGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.05);
    const chairBack = new THREE.Mesh(chairBackGeometry, chairMaterial);
    chairBack.position.set(1.0, 0.8, -1.95);
    scene.add(chairBack);
}

// Function to create a window on the left wall
function createWindow() {
    const windowWidth = 1.5;  // Bigger window
    const windowHeight = 1.0;

    // Window frame
    const windowFrameGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, 0.1);
    const windowFrameMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const windowFrame = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial);
    windowFrame.position.set(-1.8, 1.5, -0.5); // Repositioned closer to the bed on the left wall
    scene.add(windowFrame);

    // Glass (transparent effect)
    const glassGeometry = new THREE.PlaneGeometry(windowWidth - 0.1, windowHeight - 0.1);
    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.5
    });
    const glass = new THREE.Mesh(glassGeometry, glassMaterial);
    glass.position.set(-1.8, 1.5, -0.45); // Just in front of the window frame
    scene.add(glass);
}

// Create the smaller room, bed (with pillow), study area, and window
createRoom();
createBed();
createStudyArea();
createWindow();

// Adjust the camera position and field of view to capture the smaller room
camera.position.set(3, 3.5, 5); // Move the camera up and back for a better view
camera.lookAt(0, 1, 0); // Focus on the center of the room

// Add basic lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Add a directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Start the animation
animate();
