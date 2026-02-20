// VR Controller - WebXR immersive VR for Quest 3s
// Sierra Online / King's Quest VGA aesthetic in room-scale VR
// 128-color VGA palette with RGBA transparency support

class VRController {
    // VGA 128-color palette — Sierra SCI-era richness (KQ5/KQ6 style)
    // Indices 0-15 = classic EGA base, 16-127 = extended VGA
    static VGA = [
        // ── 0-15: Classic EGA base ──
        0x000000, 0x0000AA, 0x00AA00, 0x00AAAA,
        0xAA0000, 0xAA00AA, 0xAA5500, 0xAAAAAA,
        0x555555, 0x5555FF, 0x55FF55, 0x55FFFF,
        0xFF5555, 0xFF55FF, 0xFFFF55, 0xFFFFFF,
        // ── 16-31: Grays & Neutrals ──
        0x0D0D0D, 0x1A1A1A, 0x2A2A2A, 0x3D3D3D,
        0x4F4F4F, 0x626262, 0x767676, 0x8B8B8B,
        0x9F9F9F, 0xB4B4B4, 0xC8C8C8, 0xDCDCDC,
        0xECECEC, 0xF5F0E0, 0xFFF8DC, 0xFDF5E6,
        // ── 32-47: Skin, Sand, Warm tones ──
        0xFFE4C4, 0xFFDAAF, 0xF5C8A0, 0xE8B48A,
        0xD49A6A, 0xC08050, 0xDAA520, 0xFFD700,
        0xFFA500, 0xFF8C00, 0xFF6347, 0xCD5C5C,
        0xFFC0CB, 0xFFB6C1, 0xFF69B4, 0xDB7093,
        // ── 48-63: Blues & Purples ──
        0x000033, 0x000066, 0x000099, 0x0033CC,
        0x0066FF, 0x3399FF, 0x66BBFF, 0x99DDFF,
        0xCCEEFF, 0x191970, 0x4B0082, 0x663399,
        0x8A2BE2, 0x9370DB, 0xBA55D3, 0xDDA0DD,
        // ── 64-79: Greens & Nature ──
        0x002200, 0x003300, 0x004D00, 0x006600,
        0x228B22, 0x2E8B57, 0x3CB371, 0x32CD32,
        0x90EE90, 0x98FB98, 0x6B8E23, 0x556B2F,
        0x808000, 0x9ACD32, 0x7CFC00, 0x00FF7F,
        // ── 80-95: Browns & Earth ──
        0x1A0A00, 0x2D1600, 0x3E2723, 0x4E342E,
        0x5D4037, 0x6D4C41, 0x795548, 0x8D6E63,
        0xA0522D, 0xCD853F, 0xD2691E, 0xDEB887,
        0xF4A460, 0xFFE4B5, 0xC4A882, 0xBDB76B,
        // ── 96-111: Water & Ice ──
        0x001122, 0x002244, 0x003355, 0x004466,
        0x006688, 0x0088AA, 0x00AACC, 0x33CCEE,
        0x66EEFF, 0xAAFFFF, 0xE0FFFF, 0xF0FFFF,
        0x40E0D0, 0x48D1CC, 0x00CED1, 0x20B2AA,
        // ── 112-127: Fire, Lava, Magic ──
        0x1A0000, 0x330000, 0x660000, 0x8B0000,
        0xCC0000, 0xFF0000, 0xFF3300, 0xFF6600,
        0xFF9900, 0xFFCC00, 0xFFFF66, 0xFFFFAA,
        0x800080, 0xCC00CC, 0xFF00FF, 0xEE82EE
    ];

    // Backward-compatible alias
    static EGA = VRController.VGA;

    // Named color indices — classic EGA (0-15) + extended VGA (16-127)
    static C = {
        // Classic EGA (0-15)
        BLACK: 0, BLUE: 1, GREEN: 2, CYAN: 3,
        RED: 4, MAGENTA: 5, BROWN: 6, LGRAY: 7,
        DGRAY: 8, LBLUE: 9, LGREEN: 10, LCYAN: 11,
        LRED: 12, LMAGENTA: 13, YELLOW: 14, WHITE: 15,
        // Grays & Neutrals (16-31)
        NEAR_BLACK: 16, CHARCOAL: 18, SLATE: 20, MID_GRAY: 23,
        SILVER: 25, ASH: 27, PEARL: 28, PARCHMENT: 29, CORNSILK: 30, OLD_LACE: 31,
        // Skin & Warm (32-47)
        BISQUE: 32, PEACH: 33, TAN: 35, SKIN: 37,
        GOLDENROD: 38, GOLD: 39, ORANGE: 40, DARK_ORANGE: 41,
        TOMATO: 42, INDIAN_RED: 43, PINK: 44, LIGHT_PINK: 45, HOT_PINK: 46, ROSE: 47,
        // Blues & Purples (48-63)
        MIDNIGHT: 48, NAVY: 50, ROYAL_BLUE: 51,
        BRIGHT_BLUE: 52, SKY_BLUE: 53, LIGHT_SKY: 54, PALE_SKY: 55,
        ICE_BLUE: 56, DARK_MIDNIGHT: 57, INDIGO: 58, PURPLE: 59,
        BLUE_VIOLET: 60, MED_PURPLE: 61, ORCHID: 62, PLUM: 63,
        // Greens (64-79)
        DARKEST_GREEN: 64, DARK_FOREST: 65, DEEP_FOREST: 66, FOREST: 67,
        FOREST_GREEN: 68, SEA_GREEN: 69, MED_GREEN: 70, LIME: 71,
        PALE_GREEN: 72, MINT: 73, OLIVE_DRAB: 74, DARK_OLIVE: 75,
        OLIVE: 76, YELLOW_GREEN: 77, LAWN: 78, SPRING: 79,
        // Browns & Earth (80-95)
        DARKEST_BROWN: 80, DARK_EARTH: 81, DARK_BROWN: 82, COFFEE: 83,
        MED_BROWN: 84, WOOD: 85, LIGHT_WOOD: 86, DRIFTWOOD: 87,
        SIENNA: 88, PERU: 89, CHOCOLATE: 90, BURLYWOOD: 91,
        SANDY: 92, MOCCASIN: 93, KHAKI: 94, DARK_KHAKI: 95,
        // Water & Ice (96-111)
        DEEP_OCEAN: 96, DARK_WATER: 97, OCEAN: 98, DEEP_SEA: 99,
        SEA_WATER: 100, TROPICAL: 101, CLEAR_WATER: 102, SURFACE: 103,
        SHALLOW: 104, CRYSTAL: 105, ICE: 106, AZURE: 107,
        TURQUOISE: 108, MED_TURQUOISE: 109, DARK_TURQUOISE: 110, LIGHT_SEA: 111,
        // Fire & Magic (112-127)
        EMBER: 112, DEEP_RED: 113, CRIMSON: 114, DARK_CRIMSON: 115,
        BRIGHT_RED: 116, PURE_RED: 117, FIRE_ORANGE: 118, FLAME: 119,
        BRIGHT_ORANGE: 120, WARM_YELLOW: 121, PALE_YELLOW: 122, CREAM: 123,
        MAGIC_PURPLE: 124, BRIGHT_MAGENTA: 125, FUCHSIA: 126, VIOLET: 127
    };

    constructor(game) {
        this.game = game;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.vrButton = document.getElementById('vr-button');
        this.isVRMode = false;
        this.vrSupported = false;

        // Room management
        this.roomGroup = null;
        this.interactables = [];
        this.animatedObjects = [];
        this.textPanel = null;
        this.messagePanel = null;
        this.messageFadeTimer = 0;

        // VR controllers
        this.controllers = [];
        this.controllerGrips = [];
        this.raycaster = new THREE.Raycaster();
        this.tempMatrix = new THREE.Matrix4();

        // Locomotion
        this.cameraRig = null;
        this.moveSpeed = 2.5;
        this.snapAngle = Math.PI / 6; // 30 degree snap turn
        this.lastSnapTime = 0;
        this.lastTriggerTime = [0, 0];

        // Material cache (EGA palette)
        this.materialCache = new Map();
        this.flatMaterialCache = new Map();

        // Animation
        this.clock = new THREE.Clock();
        this.animTime = 0;

        // Immersion systems
        this.audioCtx = null;
        this._ambientNodes = [];
        this._currentAmbientRoom = null;
        this._birdTimer = null;
        this._hoveredObj = null;
        this._hoverRing = null;
        this._vignetteMesh = null;
        this._shadowDisc = null;
        this._speechBubble = null;
        this._bubbleTimer = null;
        this._isMoving = false;

        this.init();
    }

    // ========================================================================
    // INITIALIZATION
    // ========================================================================

    init() {
        if ('xr' in navigator) {
            navigator.xr.isSessionSupported('immersive-vr').then((supported) => {
                this.vrSupported = supported;
                if (supported) {
                    this.vrButton.disabled = false;
                    this.vrButton.addEventListener('click', () => this.toggleVR());
                } else {
                    this.vrButton.textContent = 'VR Not Supported';
                    this.vrButton.disabled = true;
                }
            }).catch(() => {
                this.vrButton.textContent = 'WebXR Error';
                this.vrButton.disabled = true;
            });
        } else {
            this.vrButton.textContent = 'WebXR Not Available';
            this.vrButton.disabled = true;
        }
        this.setupThreeJS();
    }

    setupThreeJS() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(VRController.VGA[VRController.C.LBLUE]);

        // Camera rig for VR locomotion (move this group, camera stays at origin within it)
        this.cameraRig = new THREE.Group();
        this.scene.add(this.cameraRig);

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.05, 100);
        this.camera.position.set(0, 1.6, 0);
        this.cameraRig.add(this.camera);

        // Renderer - optimized for Quest 3s
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap for mobile VR
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.xr.enabled = true;
        this.renderer.shadowMap.enabled = false; // Disable shadows for Quest perf
        this.renderer.outputColorSpace = THREE.SRGBColorSpace || THREE.sRGBEncoding;

        // Room group (holds all room-specific objects for easy cleanup)
        this.roomGroup = new THREE.Group();
        this.scene.add(this.roomGroup);

        // Setup XR controllers
        this.setupControllers();

        // Build initial room
        this.createRoom();

        // Persistent immersion systems (survive room changes)
        this._addPlayerShadow();
        this._setupVignette();
        this._setupHoverRing();
    }

    setupControllers() {
        // Controller 0 and 1 (ray pointers)
        for (let i = 0; i < 2; i++) {
            const controller = this.renderer.xr.getController(i);
            controller.userData.index = i;
            this.cameraRig.add(controller);
            this.controllers.push(controller);

            // Visible ray line
            const lineGeom = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 0, -4)
            ]);
            const lineMat = new THREE.LineBasicMaterial({
                color: VRController.VGA[VRController.C.LCYAN],
                linewidth: 2
            });
            const line = new THREE.Line(lineGeom, lineMat);
            line.visible = false;
            controller.add(line);
            controller.userData.line = line;

            // Pointer sphere at tip
            const pointer = new THREE.Mesh(
                new THREE.SphereGeometry(0.025, 8, 8),
                new THREE.MeshBasicMaterial({ color: VRController.VGA[VRController.C.LCYAN] })
            );
            pointer.position.set(0, 0, -3.5); // Position at ray tip
            pointer.visible = false;
            controller.add(pointer);
            controller.userData.pointer = pointer;

            // Controller events
            controller.addEventListener('selectstart', (e) => this.onSelectStart(e));
            controller.addEventListener('selectend', (e) => this.onSelectEnd(e));
            controller.addEventListener('connected', (e) => this.onControllerConnected(e, controller));
            controller.addEventListener('disconnected', (e) => this.onControllerDisconnected(e, controller));
        }

        // Controller grip models (simple Sierra-style wand)
        for (let i = 0; i < 2; i++) {
            const grip = this.renderer.xr.getControllerGrip(i);
            this.cameraRig.add(grip);
            this.controllerGrips.push(grip);

            // Simple wand model
            const wand = this.createWandModel();
            grip.add(wand);
        }
    }

    createWandModel() {
        const group = new THREE.Group();
        // Handle
        const handle = new THREE.Mesh(
            new THREE.CylinderGeometry(0.015, 0.02, 0.12, 6),
            this.getEGAMaterial(VRController.C.BROWN)
        );
        handle.rotation.x = Math.PI / 2;
        handle.position.z = -0.06;
        group.add(handle);
        // Crystal tip
        const tip = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.02, 0),
            this.getEGAMaterial(VRController.C.LCYAN)
        );
        tip.position.z = -0.13;
        group.add(tip);
        return group;
    }

    onControllerConnected(event, controller) {
        controller.userData.inputSource = event.data;
        controller.userData.line.visible = true;
        controller.userData.pointer.visible = true;
    }

    onControllerDisconnected(event, controller) {
        controller.userData.inputSource = null;
        controller.userData.line.visible = false;
        controller.userData.pointer.visible = false;
    }

    onSelectStart(event) {
        const controller = event.target;
        const idx = controller.userData.index;
        const now = performance.now();
        if (now - this.lastTriggerTime[idx] < 200) return; // debounce
        this.lastTriggerTime[idx] = now;
        this.handleInteraction(controller);
    }

    onSelectEnd(event) {
        // No-op for now
    }

    /** Trigger haptic rumble on a controller (Quest 3s, etc.) */
    triggerHaptic(controller, intensity = 0.5, duration = 100) {
        try {
            const source = controller.userData.inputSource;
            if (source?.gamepad?.hapticActuators?.length) {
                source.gamepad.hapticActuators[0].pulse(intensity, duration);
            }
        } catch (_) { /* haptics are optional */ }
    }

    // ========================================================================
    // MATERIAL SYSTEM (VGA Palette + RGBA)
    // ========================================================================

    getEGAMaterial(colorIndex, options = {}) {
        const key = `${colorIndex}_${options.transparent || false}_${options.emissive || false}_${options.side || 0}`;
        if (this.materialCache.has(key)) return this.materialCache.get(key);

        const mat = new THREE.MeshLambertMaterial({
            color: VRController.VGA[colorIndex],
            flatShading: true,
            transparent: options.transparent || false,
            opacity: options.opacity !== undefined ? options.opacity : 1.0,
            side: options.side || THREE.FrontSide
        });

        if (options.emissive) {
            mat.emissive = new THREE.Color(VRController.VGA[colorIndex]);
            mat.emissiveIntensity = options.emissiveIntensity || 0.3;
        }

        this.materialCache.set(key, mat);
        return mat;
    }

    getEGABasicMaterial(colorIndex) {
        const key = `basic_${colorIndex}`;
        if (this.flatMaterialCache.has(key)) return this.flatMaterialCache.get(key);
        const mat = new THREE.MeshBasicMaterial({ color: VRController.VGA[colorIndex] });
        this.flatMaterialCache.set(key, mat);
        return mat;
    }

    /** Create dithered texture (checkerboard of two VGA colors) */
    createDitherTexture(colorIdx1, colorIdx2, size = 8) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const c1 = '#' + VRController.VGA[colorIdx1].toString(16).padStart(6, '0');
        const c2 = '#' + VRController.VGA[colorIdx2].toString(16).padStart(6, '0');
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                ctx.fillStyle = ((x + y) % 2 === 0) ? c1 : c2;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        const tex = new THREE.CanvasTexture(canvas);
        tex.magFilter = THREE.NearestFilter;
        tex.minFilter = THREE.NearestFilter;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        return tex;
    }

    /** Create a material with dithered VGA texture */
    getDitherMaterial(colorIdx1, colorIdx2, repeat = 4) {
        const key = `dither_${colorIdx1}_${colorIdx2}_${repeat}`;
        if (this.materialCache.has(key)) return this.materialCache.get(key);
        const tex = this.createDitherTexture(colorIdx1, colorIdx2);
        tex.repeat.set(repeat, repeat);
        const mat = new THREE.MeshLambertMaterial({ map: tex, flatShading: true });
        this.materialCache.set(key, mat);
        return mat;
    }

    /** Create a smooth VGA gradient texture (no dithering) */
    createGradientTexture(colorIdx1, colorIdx2, size = 64, vertical = true) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const c1 = '#' + VRController.VGA[colorIdx1].toString(16).padStart(6, '0');
        const c2 = '#' + VRController.VGA[colorIdx2].toString(16).padStart(6, '0');
        const grad = vertical
            ? ctx.createLinearGradient(0, 0, 0, size)
            : ctx.createLinearGradient(0, 0, size, 0);
        grad.addColorStop(0, c1);
        grad.addColorStop(1, c2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, size, size);
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        return tex;
    }

    /** Get a smooth gradient material (VGA-quality) */
    getGradientMaterial(colorIdx1, colorIdx2, repeat = 1) {
        const key = `grad_${colorIdx1}_${colorIdx2}_${repeat}`;
        if (this.materialCache.has(key)) return this.materialCache.get(key);
        const tex = this.createGradientTexture(colorIdx1, colorIdx2);
        tex.repeat.set(repeat, repeat);
        const mat = new THREE.MeshLambertMaterial({ map: tex, flatShading: true });
        this.materialCache.set(key, mat);
        return mat;
    }

    /** Create material from raw RGBA values (0-255 for RGB, 0.0-1.0 for alpha) */
    getRGBAMaterial(r, g, b, a = 1.0, options = {}) {
        const hexColor = (r << 16) | (g << 8) | b;
        const key = `rgba_${hexColor}_${a}_${options.emissive || false}`;
        if (this.materialCache.has(key)) return this.materialCache.get(key);
        const mat = new THREE.MeshLambertMaterial({
            color: hexColor,
            flatShading: true,
            transparent: a < 1.0,
            opacity: a,
            side: options.side || THREE.FrontSide
        });
        if (options.emissive) {
            mat.emissive = new THREE.Color(hexColor);
            mat.emissiveIntensity = options.emissiveIntensity || 0.3;
        }
        this.materialCache.set(key, mat);
        return mat;
    }

    /** Create material from any hex color with optional alpha */
    getHexMaterial(hexColor, alpha = 1.0, options = {}) {
        const key = `hex_${hexColor}_${alpha}_${options.emissive || false}`;
        if (this.materialCache.has(key)) return this.materialCache.get(key);
        const mat = new THREE.MeshLambertMaterial({
            color: hexColor,
            flatShading: true,
            transparent: alpha < 1.0,
            opacity: alpha,
            side: options.side || THREE.FrontSide
        });
        if (options.emissive) {
            mat.emissive = new THREE.Color(hexColor);
            mat.emissiveIntensity = options.emissiveIntensity || 0.3;
        }
        this.materialCache.set(key, mat);
        return mat;
    }

    // ========================================================================
    // ROOM BUILDING
    // ========================================================================

    clearRoom() {
        // Reset fog and any per-room scene overrides
        this.scene.fog = null;

        // Remove all objects from room group
        while (this.roomGroup.children.length > 0) {
            const child = this.roomGroup.children[0];
            this.roomGroup.remove(child);
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => { if (!this.materialCache.has(m)) m.dispose(); });
                }
            }
            // Recursively dispose children
            child.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose();
            });
        }
        this.interactables = [];
        this.animatedObjects = [];
        this.textPanel = null;
        // Clear per-room immersion state
        this._hoveredObj = null;
        if (this._hoverRing) this._hoverRing.material.opacity = 0;
        if (this._speechBubble) {
            this.roomGroup.remove(this._speechBubble);
            this._speechBubble = null;
        }
    }

    createRoom() {
        this.clearRoom();

        const roomId = this.game.currentRoom;
        const room = this.game.rooms[roomId];
        if (!room) return;

        // Build room-specific environment
        const builders = {
            'castle_gate': () => this.buildCastleGate(),
            'courtyard': () => this.buildCourtyard(),
            'wizard_tower': () => this.buildWizardTower(),
            'throne_room': () => this.buildThroneRoom(),
            'forest_path': () => this.buildForestPath(),
            'forest_clearing': () => this.buildForestClearing(),
            'deep_forest': () => this.buildDeepForest(),
            'cloud_realm': () => this.buildCloudRealm(),
            'dragon_lair': () => this.buildDragonLair()
        };

        if (builders[roomId]) {
            builders[roomId]();
        } else {
            this.buildDefaultRoom();
        }

        // Add room description text panel
        this.createTextPanel(room.description);

        // Add exit markers
        this.addExitMarkers(room.exits);

        // Immersion: ambient audio, room sign, clouds
        if (this.isVRMode) {
            this.playAmbient(roomId);
            const roomNames = {
                castle_gate: 'CASTLE GATE', courtyard: 'COURTYARD',
                wizard_tower: "WIZARD'S TOWER", throne_room: 'THRONE ROOM',
                forest_path: 'FOREST PATH', forest_clearing: 'FOREST CLEARING',
                deep_forest: 'DEEP FOREST', cloud_realm: 'CLOUD REALM',
                dragon_lair: "DRAGON'S LAIR"
            };
            this.addRoomSign(roomNames[roomId] || roomId.toUpperCase().replace(/_/g, ' '));
            this.addRoomClouds();
        }

        // Reset camera rig position
        this.cameraRig.position.set(0, 0, 2);
    }

    // --- Room Helpers ---

    addGround(colorIndex, size = 12, dither = null) {
        const geom = new THREE.PlaneGeometry(size, size);
        const mat = dither
            ? this.getDitherMaterial(dither[0], dither[1], Math.floor(size * 2))
            : this.getEGAMaterial(colorIndex);
        const mesh = new THREE.Mesh(geom, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = 0;
        this.roomGroup.add(mesh);
        return mesh;
    }

    addSky(colorIndex, colorIndex2 = null) {
        // Sky dome — smooth gradient instead of dither for SCI-era quality.
        // Creates its own non-cached material to avoid mutating the shared BackSide flag.
        const geom = new THREE.SphereGeometry(40, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        let skyMat;
        if (colorIndex2) {
            const tex = this.createGradientTexture(colorIndex, colorIndex2, 256, true);
            tex.wrapS = THREE.RepeatWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            skyMat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide });
        } else {
            skyMat = new THREE.MeshBasicMaterial({
                color: VRController.VGA[colorIndex],
                side: THREE.BackSide
            });
        }
        const sky = new THREE.Mesh(geom, skyMat);
        sky.position.y = 0;
        this.roomGroup.add(sky);
        return sky;
    }

    addWall(x, z, width, height, rotY, colorIndex, dither = null) {
        const geom = new THREE.PlaneGeometry(width, height);
        const mat = dither
            ? this.getDitherMaterial(dither[0], dither[1], Math.floor(width * 2))
            : this.getEGAMaterial(colorIndex);
        const wall = new THREE.Mesh(geom, mat);
        wall.position.set(x, height / 2, z);
        wall.rotation.y = rotY;
        this.roomGroup.add(wall);
        return wall;
    }

    addBox(x, y, z, w, h, d, colorIndex) {
        const geom = new THREE.BoxGeometry(w, h, d);
        const mat = this.getEGAMaterial(colorIndex);
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(x, y, z);
        this.roomGroup.add(mesh);
        return mesh;
    }

    addCylinder(x, y, z, radiusTop, radiusBottom, height, colorIndex, segments = 8) {
        const geom = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments);
        const mat = this.getEGAMaterial(colorIndex);
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(x, y, z);
        this.roomGroup.add(mesh);
        return mesh;
    }

    addSphere(x, y, z, radius, colorIndex) {
        const geom = new THREE.SphereGeometry(radius, 8, 6);
        const mat = this.getEGAMaterial(colorIndex);
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(x, y, z);
        this.roomGroup.add(mesh);
        return mesh;
    }

    addCone(x, y, z, radius, height, colorIndex, segments = 8) {
        const geom = new THREE.ConeGeometry(radius, height, segments);
        const mat = this.getEGAMaterial(colorIndex);
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.set(x, y, z);
        this.roomGroup.add(mesh);
        return mesh;
    }

    /** VGA-rich tree: trunk + layered foliage with multi-green palette */
    addTree(x, z, height = 3, foliageRadius = 1.2, type = 'deciduous') {
        const group = new THREE.Group();
        const C = VRController.C;

        // Trunk - rich wood brown
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.12, 0.18, height * 0.6, 6),
            this.getEGAMaterial(C.WOOD)
        );
        trunk.position.set(0, height * 0.3, 0);
        group.add(trunk);

        if (type === 'deciduous') {
            // Layered foliage spheres — VGA multi-green palette
            const foliage1 = new THREE.Mesh(
                new THREE.SphereGeometry(foliageRadius, 6, 5),
                this.getEGAMaterial(C.FOREST_GREEN)
            );
            foliage1.position.set(0, height * 0.65, 0);
            group.add(foliage1);

            const foliage2 = new THREE.Mesh(
                new THREE.SphereGeometry(foliageRadius * 0.8, 6, 5),
                this.getEGAMaterial(C.SEA_GREEN)
            );
            foliage2.position.set(foliageRadius * 0.4, height * 0.75, 0);
            group.add(foliage2);

            const foliage3 = new THREE.Mesh(
                new THREE.SphereGeometry(foliageRadius * 0.7, 6, 5),
                this.getEGAMaterial(C.DARK_FOREST)
            );
            foliage3.position.set(-foliageRadius * 0.3, height * 0.55, foliageRadius * 0.2);
            group.add(foliage3);
        } else if (type === 'pine') {
            // Conical pine tree (stacked cones) — VGA forest greens
            for (let i = 0; i < 3; i++) {
                const cone = new THREE.Mesh(
                    new THREE.ConeGeometry(foliageRadius * (1 - i * 0.2), height * 0.3, 6),
                    this.getEGAMaterial(i % 2 === 0 ? C.FOREST_GREEN : C.DEEP_FOREST)
                );
                cone.position.set(0, height * (0.5 + i * 0.2), 0);
                group.add(cone);
            }
        }

        group.position.set(x, 0, z);
        this.roomGroup.add(group);
        return group;
    }

    /** Add a bush (VGA palette overlapping spheres) */
    addBush(x, z, radius = 0.4) {
        const C = VRController.C;
        const group = new THREE.Group();
        const s1 = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 6, 4),
            this.getEGAMaterial(C.FOREST_GREEN)
        );
        s1.position.set(0, radius * 0.6, 0);
        group.add(s1);
        const s2 = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 0.7, 6, 4),
            this.getEGAMaterial(C.DARK_FOREST)
        );
        s2.position.set(radius * 0.4, radius * 0.5, 0);
        group.add(s2);
        group.position.set(x, 0, z);
        this.roomGroup.add(group);
        return group;
    }

    /** Add a torch on a wall */
    addTorch(x, y, z) {
        const C = VRController.C;
        // Bracket
        this.addBox(x, y, z, 0.06, 0.3, 0.06, C.BROWN);
        // Flame (emissive)
        const flameGeom = new THREE.ConeGeometry(0.06, 0.15, 5);
        const flameMat = new THREE.MeshBasicMaterial({
            color: VRController.VGA[C.YELLOW]
        });
        const flame = new THREE.Mesh(flameGeom, flameMat);
        flame.position.set(x, y + 0.2, z);
        this.roomGroup.add(flame);
        // Point light
        const light = new THREE.PointLight(VRController.VGA[C.YELLOW], 0.6, 5);
        light.position.set(x, y + 0.25, z);
        this.roomGroup.add(light);
        // Animate flame
        this.animatedObjects.push({
            type: 'flame', mesh: flame,
            baseY: y + 0.2, phase: Math.random() * Math.PI * 2
        });
        return flame;
    }

    /** Create an NPC billboard sprite */
    addNPC(type, x, z, facing = 0) {
        const C = VRController.C;
        const group = new THREE.Group();

        if (type === 'guard') {
            // Body
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.35, 0.6, 0.25), C.RED, 0, 0.7, 0);
            // Legs
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.12, 0.4, 0.12), C.BROWN, -0.08, 0.2, 0);
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.12, 0.4, 0.12), C.BROWN, 0.08, 0.2, 0);
            // Head/helmet
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.14, 6, 5), C.LGRAY, 0, 1.15, 0);
            // Spear
            this.addMeshToGroup(group, new THREE.CylinderGeometry(0.02, 0.02, 1.5, 4), C.BROWN, 0.25, 1.0, 0);
            this.addMeshToGroup(group, new THREE.ConeGeometry(0.04, 0.15, 4), C.LGRAY, 0.25, 1.82, 0);
        } else if (type === 'wizard') {
            // Robe
            const robeGeom = new THREE.CylinderGeometry(0.15, 0.3, 0.9, 6);
            this.addMeshToGroup(group, robeGeom, C.BLUE, 0, 0.55, 0);
            // Stars on robe (small yellow dots)
            for (let i = 0; i < 4; i++) {
                const angle = (i / 4) * Math.PI * 2;
                this.addMeshToGroup(group, new THREE.SphereGeometry(0.02, 4, 3), C.YELLOW,
                    Math.cos(angle) * 0.18, 0.5 + i * 0.1, Math.sin(angle) * 0.18);
            }
            // Head
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.14, 6, 5), C.BROWN, 0, 1.15, 0);
            // Beard
            this.addMeshToGroup(group, new THREE.ConeGeometry(0.1, 0.2, 4), C.WHITE, 0, 0.95, 0.08);
            // Hat
            this.addMeshToGroup(group, new THREE.ConeGeometry(0.18, 0.5, 6), C.MAGENTA, 0, 1.55, 0);
            // Hat brim
            this.addMeshToGroup(group, new THREE.CylinderGeometry(0.22, 0.22, 0.04, 8), C.MAGENTA, 0, 1.28, 0);
            // Staff
            this.addMeshToGroup(group, new THREE.CylinderGeometry(0.02, 0.02, 1.4, 4), C.BROWN, -0.3, 0.8, 0);
            // Staff crystal
            const staffCrystal = this.addMeshToGroup(group, new THREE.OctahedronGeometry(0.08, 0), C.LCYAN, -0.3, 1.55, 0);
            this.animatedObjects.push({ type: 'glow', mesh: staffCrystal, phase: 0 });
        } else if (type === 'king') {
            // Royal robe
            this.addMeshToGroup(group, new THREE.CylinderGeometry(0.18, 0.35, 0.8, 6), C.MAGENTA, 0, 0.5, 0);
            // Ermine trim (white dots)
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                this.addMeshToGroup(group, new THREE.SphereGeometry(0.025, 4, 3), C.WHITE,
                    Math.cos(angle) * 0.32, 0.15, Math.sin(angle) * 0.32);
            }
            // Head
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.14, 6, 5), C.BROWN, 0, 1.1, 0);
            // Beard
            this.addMeshToGroup(group, new THREE.ConeGeometry(0.1, 0.15, 4), C.WHITE, 0, 0.92, 0.08);
            // Crown
            const crownGeom = new THREE.CylinderGeometry(0.14, 0.16, 0.1, 6);
            this.addMeshToGroup(group, crownGeom, C.YELLOW, 0, 1.32, 0);
            // Crown points
            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI * 2;
                this.addMeshToGroup(group, new THREE.ConeGeometry(0.025, 0.08, 4), C.YELLOW,
                    Math.cos(angle) * 0.12, 1.42, Math.sin(angle) * 0.12);
            }
            // Crown jewels
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.025, 4, 3), C.RED, 0, 1.35, 0.14);
            // Scepter
            this.addMeshToGroup(group, new THREE.CylinderGeometry(0.015, 0.015, 0.7, 4), C.YELLOW, 0.25, 0.7, 0.1);
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.04, 6, 4), C.RED, 0.25, 1.08, 0.1);
        } else if (type === 'gnome') {
            // Body (red outfit)
            this.addMeshToGroup(group, new THREE.CylinderGeometry(0.12, 0.18, 0.5, 6), C.RED, 0, 0.35, 0);
            // Legs
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.08, 0.2, 0.08), C.BLUE, -0.05, 0.1, 0);
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.08, 0.2, 0.08), C.BLUE, 0.05, 0.1, 0);
            // Boots
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.1, 0.05, 0.12), C.BROWN, -0.05, 0.025, 0.02);
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.1, 0.05, 0.12), C.BROWN, 0.05, 0.025, 0.02);
            // Head
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.1, 6, 5), C.BROWN, 0, 0.75, 0);
            // Long beard
            this.addMeshToGroup(group, new THREE.ConeGeometry(0.08, 0.25, 4), C.WHITE, 0, 0.55, 0.06);
            // Pointy hat
            this.addMeshToGroup(group, new THREE.ConeGeometry(0.12, 0.3, 6), C.RED, 0, 1.0, 0);
            // Eyes (grumpy)
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.015, 4, 3), C.BLACK, -0.04, 0.77, 0.08);
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.015, 4, 3), C.BLACK, 0.04, 0.77, 0.08);
        } else if (type === 'servant') {
            // Concerned castle servant — simple tunic, head, arms
            // Randomize clothing color from a few VGA options
            const tunicColors = [C.BLUE, C.BROWN, C.RED, C.GREEN, C.DGRAY];
            const tunicColor = tunicColors[Math.floor(Math.abs(x * 7 + z * 13)) % tunicColors.length];
            // Body / tunic
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.3, 0.5, 0.2), tunicColor, 0, 0.65, 0);
            // Apron (lighter front panel)
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.22, 0.4, 0.02), C.PARCHMENT, 0, 0.65, 0.11);
            // Legs
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.1, 0.35, 0.1), C.BROWN, -0.07, 0.18, 0);
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.1, 0.35, 0.1), C.BROWN, 0.07, 0.18, 0);
            // Shoes
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.11, 0.04, 0.14), C.DARK_BROWN, -0.07, 0.02, 0.02);
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.11, 0.04, 0.14), C.DARK_BROWN, 0.07, 0.02, 0.02);
            // Head
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.12, 6, 5), C.PEACH, 0, 1.05, 0);
            // Hair (cap / top of head)
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.1, 6, 3, 0, Math.PI * 2, 0, Math.PI / 2), C.BROWN, 0, 1.1, 0);
            // Arms (at sides, slightly out — carrying gesture)
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.08, 0.35, 0.08), tunicColor, -0.22, 0.7, 0);
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.08, 0.35, 0.08), tunicColor, 0.22, 0.7, 0);
            // Hands
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.04, 4, 3), C.PEACH, -0.22, 0.5, 0);
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.04, 4, 3), C.PEACH, 0.22, 0.5, 0);
        } else if (type === 'dragon') {
            // Large sleeping dragon body (curled)
            const bodyGeom = new THREE.SphereGeometry(0.8, 8, 6);
            bodyGeom.scale(1.5, 0.6, 1);
            this.addMeshToGroup(group, bodyGeom, C.GREEN, 0, 0.5, 0);
            // Head
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.35, 6, 5), C.GREEN, -1.0, 0.4, 0);
            // Snout
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.4, 0.2, 0.25), C.GREEN, -1.35, 0.35, 0);
            // Nostrils
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.04, 4, 3), C.BLACK, -1.5, 0.38, 0.08);
            this.addMeshToGroup(group, new THREE.SphereGeometry(0.04, 4, 3), C.BLACK, -1.5, 0.38, -0.08);
            // Eye (closed = line, represented as thin box)
            this.addMeshToGroup(group, new THREE.BoxGeometry(0.12, 0.02, 0.02), C.BLACK, -0.85, 0.55, 0.2);
            // Horn
            this.addMeshToGroup(group, new THREE.ConeGeometry(0.06, 0.25, 4), C.LGRAY, -0.75, 0.8, 0);
            // Wing (folded)
            const wingGeom = new THREE.PlaneGeometry(1.0, 0.6);
            const wing = new THREE.Mesh(wingGeom, this.getEGAMaterial(C.DGRAY, { side: THREE.DoubleSide }));
            wing.position.set(0.2, 0.9, 0);
            wing.rotation.z = -0.3;
            wing.rotation.x = 0.2;
            group.add(wing);
            // Tail (curling away)
            for (let i = 0; i < 6; i++) {
                const angle = i * 0.5;
                const tx = 0.8 + Math.cos(angle) * (0.4 + i * 0.15);
                const tz = Math.sin(angle) * 0.6;
                const size = 0.2 - i * 0.02;
                this.addMeshToGroup(group, new THREE.SphereGeometry(size, 5, 4), C.GREEN, tx, 0.25, tz);
            }
            // Tail spike
            this.addMeshToGroup(group, new THREE.ConeGeometry(0.06, 0.15, 4), C.DGRAY, 1.8, 0.3, 0.4);
            // Smoke puffs from nose (snoring)
            for (let i = 0; i < 4; i++) {
                const puff = this.addMeshToGroup(group,
                    new THREE.SphereGeometry(0.06 + i * 0.03, 5, 4), C.LGRAY,
                    -1.6 - i * 0.15, 0.4 + i * 0.05, 0);
                puff.material = this.getEGAMaterial(C.LGRAY, { transparent: true, opacity: 0.5 - i * 0.1 });
                this.animatedObjects.push({ type: 'float', mesh: puff, baseY: puff.position.y, phase: i * 0.5 });
            }
        }

        group.position.set(x, 0, z);
        group.rotation.y = facing;
        group.userData.npcType = type;
        group.userData.interactable = true;
        this.roomGroup.add(group);
        this.interactables.push(group);
        // Non-wandering NPCs slowly turn to face the player
        if (!['servant', 'dragon'].includes(type)) {
            this.animatedObjects.push({ type: 'gaze', mesh: group });
        }
        return group;
    }

    addMeshToGroup(group, geometry, colorIndex, x, y, z) {
        const mat = this.getEGAMaterial(colorIndex);
        const mesh = new THREE.Mesh(geometry, mat);
        mesh.position.set(x, y, z);
        group.add(mesh);
        return mesh;
    }

    addExitMarkers(exits) {
        const C = VRController.C;
        const positions = {
            north: { x: 0, z: -5.5, rot: 0 },
            south: { x: 0, z: 5.5, rot: Math.PI },
            east: { x: 5.5, z: 0, rot: -Math.PI / 2 },
            west: { x: -5.5, z: 0, rot: Math.PI / 2 },
            up: { x: 0, z: 0, rot: 0, isUp: true },
            down: { x: 0, z: 0, rot: 0, isDown: true }
        };

        for (const [dir, roomId] of Object.entries(exits)) {
            const pos = positions[dir];
            if (!pos) continue;

            const group = new THREE.Group();

            if (pos.isUp || pos.isDown) {
                // Vertical exit marker
                const arrow = new THREE.Mesh(
                    new THREE.ConeGeometry(0.2, 0.4, 6),
                    this.getEGAMaterial(C.LCYAN, { emissive: true, emissiveIntensity: 0.5 })
                );
                arrow.position.set(pos.x, pos.isUp ? 2.5 : 0.3, pos.z);
                if (pos.isDown) arrow.rotation.z = Math.PI;
                group.add(arrow);
                this.animatedObjects.push({ type: 'bob', mesh: arrow, baseY: arrow.position.y, phase: 0 });
            } else {
                // Archway exit marker
                const archLeft = new THREE.Mesh(
                    new THREE.BoxGeometry(0.15, 2.5, 0.15),
                    this.getEGAMaterial(C.LGRAY)
                );
                archLeft.position.set(-0.6, 1.25, 0);
                group.add(archLeft);

                const archRight = new THREE.Mesh(
                    new THREE.BoxGeometry(0.15, 2.5, 0.15),
                    this.getEGAMaterial(C.LGRAY)
                );
                archRight.position.set(0.6, 1.25, 0);
                group.add(archRight);

                const archTop = new THREE.Mesh(
                    new THREE.BoxGeometry(1.35, 0.15, 0.15),
                    this.getEGAMaterial(C.LGRAY)
                );
                archTop.position.set(0, 2.55, 0);
                group.add(archTop);

                // Direction arrow
                const arrow = new THREE.Mesh(
                    new THREE.ConeGeometry(0.12, 0.25, 4),
                    this.getEGAMaterial(C.LCYAN, { emissive: true, emissiveIntensity: 0.5 })
                );
                arrow.rotation.x = -Math.PI / 2;
                arrow.position.set(0, 1.5, -0.2);
                group.add(arrow);
                this.animatedObjects.push({ type: 'pulse', mesh: arrow, phase: 0 });

                // Direction label
                const label = this.createSmallLabel(dir.toUpperCase());
                label.position.set(0, 2.8, 0);
                group.add(label);
            }

            group.position.set(pos.x, 0, pos.z);
            group.rotation.y = pos.rot || 0;
            group.userData.exitDir = dir;
            group.userData.exitRoom = roomId;
            group.userData.interactable = true;
            this.roomGroup.add(group);
            this.interactables.push(group);
        }
    }

    createSmallLabel(text) {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 128, 32);
        ctx.strokeStyle = '#00AAAA';
        ctx.lineWidth = 2;
        ctx.strokeRect(2, 2, 124, 28);
        ctx.font = 'bold 18px "Courier New", monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.fillText(text, 64, 22);
        const tex = new THREE.CanvasTexture(canvas);
        tex.magFilter = THREE.NearestFilter;
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.12), mat);
        return mesh;
    }

    // ========================================================================
    // ROOM BUILDERS — Sierra AGI aesthetic translated to VR
    // ========================================================================

    setupOutdoorLighting() {
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        this.roomGroup.add(ambient);
        const sun = new THREE.DirectionalLight(0xffffff, 0.8);
        sun.position.set(5, 10, 3);
        this.roomGroup.add(sun);
    }

    setupIndoorLighting(ambientIntensity = 0.3) {
        const ambient = new THREE.AmbientLight(0xffffff, ambientIntensity);
        this.roomGroup.add(ambient);
    }

    buildCastleGate() {
        const C = VRController.C;
        this.scene.background = new THREE.Color(VRController.VGA[C.SKY_BLUE]);
        this.setupOutdoorLighting();

        // Ground - lush grass with cobblestone path
        this.addGround(C.FOREST_GREEN, 14);
        // Cobblestone path (center strip — VGA earth tones)
        const path = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 14),
            this.getDitherMaterial(C.MED_BROWN, C.COFFEE, 14)
        );
        path.rotation.x = -Math.PI / 2;
        path.position.y = 0.01;
        this.roomGroup.add(path);

        // Sky — VGA blue gradient
        this.addSky(C.SKY_BLUE, C.PALE_SKY);

        // Castle wall (north side — weathered stone)
        this.addWall(0, -6, 14, 5, 0, C.SILVER);
        // Stone texture on wall (horizontal lines)
        for (let i = 0; i < 6; i++) {
            const line = this.addBox(0, 0.8 * i + 0.4, -5.98, 14, 0.02, 0.02, C.SLATE);
        }

        // Gate archway (opening in wall)
        this.addBox(-2.5, 2.5, -6, 4.5, 5, 0.5, C.LGRAY); // left wall section
        this.addBox(2.5, 2.5, -6, 4.5, 5, 0.5, C.LGRAY);  // right wall section
        this.addBox(0, 4.2, -6, 2, 1.6, 0.5, C.LGRAY);     // above gate
        // Gate opening (dark)
        this.addBox(0, 1.7, -6, 2, 3.4, 0.3, C.BLACK);

        // Portcullis bars
        for (let i = -3; i <= 3; i++) {
            this.addBox(i * 0.25, 1.7, -5.85, 0.04, 3.4, 0.04, C.BROWN);
        }
        for (let i = 0; i < 5; i++) {
            this.addBox(0, 0.5 + i * 0.7, -5.85, 2, 0.04, 0.04, C.BROWN);
        }

        // Left tower
        this.addCylinder(-5.5, 3, -6, 1.2, 1.2, 6, C.LGRAY);
        // Tower battlements
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            this.addBox(-5.5 + Math.cos(angle) * 1.1, 6.2, -6 + Math.sin(angle) * 1.1, 0.3, 0.4, 0.3, C.LGRAY);
        }
        // Tower windows
        this.addBox(-5.5, 3.5, -4.7, 0.3, 0.45, 0.1, C.DGRAY);
        this.addBox(-5.5, 2, -4.7, 0.3, 0.45, 0.1, C.DGRAY);

        // Right tower
        this.addCylinder(5.5, 3, -6, 1.2, 1.2, 6, C.LGRAY);
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            this.addBox(5.5 + Math.cos(angle) * 1.1, 6.2, -6 + Math.sin(angle) * 1.1, 0.3, 0.4, 0.3, C.LGRAY);
        }
        this.addBox(5.5, 3.5, -4.7, 0.3, 0.45, 0.1, C.DGRAY);
        this.addBox(5.5, 2, -4.7, 0.3, 0.45, 0.1, C.DGRAY);

        // Guard NPC
        this.addNPC('guard', -3.5, -3, Math.PI / 4);

        // Bushes
        this.addBush(-4, 2);
        this.addBush(4, 2);
        this.addBush(-5, 3);
        this.addBush(5, 3);
    }

    buildCourtyard() {
        const C = VRController.C;
        this.scene.background = new THREE.Color(VRController.VGA[C.SKY_BLUE]);
        this.setupOutdoorLighting();

        // Cobblestone floor (checkered — VGA stone tones)
        this.addGround(C.SILVER, 12, [C.SILVER, C.SLATE]);

        // Sky
        this.addSky(C.SKY_BLUE, C.PALE_SKY);

        // Low walls with battlements on all sides
        const wallH = 3.5;
        for (const [x, z, rot, w] of [[0, -6, 0, 12], [0, 6, Math.PI, 12], [-6, 0, Math.PI / 2, 12], [6, 0, -Math.PI / 2, 12]]) {
            this.addWall(x, z, w, wallH, rot, C.LGRAY);
        }
        // Battlements
        for (let i = -5; i <= 5; i += 2) {
            this.addBox(i, wallH + 0.2, -6, 0.6, 0.4, 0.3, C.LGRAY);
            this.addBox(i, wallH + 0.2, 6, 0.6, 0.4, 0.3, C.LGRAY);
            this.addBox(-6, wallH + 0.2, i, 0.3, 0.4, 0.6, C.LGRAY);
            this.addBox(6, wallH + 0.2, i, 0.3, 0.4, 0.6, C.LGRAY);
        }

        // Central fountain
        // Basin
        this.addCylinder(0, 0.4, 0, 1.2, 1.4, 0.8, C.LGRAY);
        // Water
        const water = this.addCylinder(0, 0.85, 0, 1.1, 1.1, 0.05, C.CYAN);
        this.animatedObjects.push({ type: 'water', mesh: water, phase: 0 });
        // Pedestal
        this.addCylinder(0, 1.2, 0, 0.2, 0.25, 0.8, C.LGRAY);
        // Water spray (small spheres)
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const spray = this.addSphere(Math.cos(angle) * 0.3, 1.7 - Math.abs(Math.sin(i * 1.5)) * 0.3,
                Math.sin(angle) * 0.3, 0.05, C.LCYAN);
            this.animatedObjects.push({ type: 'spray', mesh: spray, baseY: spray.position.y, phase: i });
        }

        // Wizard tower visible through west archway
        this.addCylinder(-7, 2.5, -2, 1.0, 1.0, 5, C.MAGENTA);
        this.addCone(-7, 5.5, -2, 1.3, 2, C.MAGENTA);

        // Windows on walls
        for (let i = -3; i <= 3; i += 2) {
            this.addBox(i, 2.2, -5.95, 0.3, 0.5, 0.1, C.DGRAY);
        }

        // Concerned servants running about
        const servantPositions = [
            { x: -2.5, z:  1.5, facing: 0.4 },
            { x:  3.0, z: -1.0, facing: 2.1 },
            { x: -1.0, z:  3.5, facing: -0.8 },
            { x:  2.0, z:  3.0, facing: 1.5 },
            { x: -3.5, z: -2.0, facing: -1.2 },
            { x:  1.5, z: -3.5, facing: 3.0 },
        ];
        for (const sp of servantPositions) {
            const servant = this.addNPC('servant', sp.x, sp.z, sp.facing);
            this.animatedObjects.push({
                type: 'wander',
                mesh: servant,
                baseX: sp.x,
                baseZ: sp.z,
                phase: sp.x * 2 + sp.z * 3,
                radius: 1.2 + Math.abs(sp.x * 0.2)
            });
        }
    }

    buildWizardTower() {
        const C = VRController.C;
        this.scene.background = new THREE.Color(VRController.VGA[C.MAGENTA]);
        this.setupIndoorLighting(0.25);

        // Floor - stone tiles
        this.addGround(C.DGRAY, 10, [C.DGRAY, C.LGRAY]);

        // Circular stone walls (octagonal approximation)
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const nextAngle = ((i + 1) / 8) * Math.PI * 2;
            const x = Math.cos(angle + Math.PI / 8) * 5;
            const z = Math.sin(angle + Math.PI / 8) * 5;
            this.addWall(x, z, 4, 5, angle + Math.PI / 8 + Math.PI, C.BROWN);
        }

        // Shelves on walls
        // Left shelf
        this.addBox(-3.5, 2.2, -3.5, 2.5, 0.08, 0.4, C.BROWN);
        this.addBox(-3.5, 1.6, -3.5, 2.5, 0.08, 0.4, C.BROWN);

        // Potion bottles on shelves
        const potionColors = [C.RED, C.GREEN, C.BLUE, C.MAGENTA, C.CYAN];
        for (let i = 0; i < 5; i++) {
            const bottle = this.addCylinder(-4.2 + i * 0.4, 2.4, -3.5, 0.06, 0.06, 0.2, potionColors[i]);
            // Cork
            this.addCylinder(-4.2 + i * 0.4, 2.55, -3.5, 0.04, 0.04, 0.06, C.BROWN);
        }

        // Books on lower shelf
        const bookColors = [C.RED, C.BLUE, C.GREEN, C.BROWN, C.MAGENTA, C.CYAN];
        for (let i = 0; i < 6; i++) {
            this.addBox(-4.1 + i * 0.35, 1.75, -3.5, 0.25, 0.25, 0.15, bookColors[i]);
        }

        // Right shelf
        this.addBox(3.5, 2.2, -3.5, 2.5, 0.08, 0.4, C.BROWN);
        // Crystal artifacts
        for (let i = 0; i < 4; i++) {
            const crystal = new THREE.Mesh(
                new THREE.OctahedronGeometry(0.1, 0),
                this.getEGAMaterial(C.LCYAN, { emissive: true, emissiveIntensity: 0.4 })
            );
            crystal.position.set(2.8 + i * 0.4, 2.4, -3.5);
            this.roomGroup.add(crystal);
            this.animatedObjects.push({ type: 'rotate', mesh: crystal, phase: i * 0.5 });
        }

        // Wizard's desk
        this.addBox(0, 0.8, -1.5, 1.5, 0.08, 0.8, C.BROWN);
        this.addBox(-0.6, 0.4, -1.5, 0.1, 0.8, 0.1, C.BROWN);
        this.addBox(0.6, 0.4, -1.5, 0.1, 0.8, 0.1, C.BROWN);

        // Spell book on desk
        this.addBox(0, 0.9, -1.5, 0.4, 0.06, 0.3, C.RED);
        // Spell book spine
        this.addBox(0, 0.93, -1.5, 0.02, 0.02, 0.3, C.YELLOW);

        // Candle
        this.addCylinder(0.4, 0.9, -1.5, 0.03, 0.03, 0.15, C.WHITE);
        this.addTorch(0.4, 1.0, -1.5);

        // Window showing starry sky
        this.addBox(3.5, 2.5, 1.5, 1.0, 1.2, 0.1, C.BLACK);
        // Stars in window
        for (let i = 0; i < 8; i++) {
            this.addSphere(3.2 + Math.random() * 0.6, 2.2 + Math.random() * 0.6, 1.45, 0.02, C.WHITE);
        }

        // Wizard NPC
        if (!this.game.gameState.wizardHappy) {
            this.addNPC('wizard', -1.5, -0.5, Math.PI / 4);
        } else {
            const wiz = this.addNPC('wizard', -1.5, -0.5, Math.PI / 4);
            // Add sparkles around wizard when happy
            for (let i = 0; i < 8; i++) {
                const sparkle = this.addSphere(
                    -1.5 + Math.cos(i) * 0.5, 1.5 + Math.sin(i) * 0.3, -0.5 + Math.sin(i * 2) * 0.3,
                    0.03, C.YELLOW);
                this.animatedObjects.push({ type: 'sparkle', mesh: sparkle, phase: i * 0.5 });
            }
        }

        // Add mystical point light (purple tint)
        const mysticLight = new THREE.PointLight(VRController.VGA[C.MAGENTA], 0.4, 8);
        mysticLight.position.set(0, 3, 0);
        this.roomGroup.add(mysticLight);

        // Add warm light from candle
        const candleLight = new THREE.PointLight(VRController.VGA[C.YELLOW], 0.5, 4);
        candleLight.position.set(0.4, 1.2, -1.5);
        this.roomGroup.add(candleLight);
    }

    buildThroneRoom() {
        const C = VRController.C;
        this.scene.background = new THREE.Color(VRController.VGA[C.RED]);
        this.setupIndoorLighting(0.3);

        // Polished floor
        this.addGround(C.DGRAY, 14, [C.MAGENTA, C.BLUE]);

        // Grand stone walls
        this.addWall(0, -7, 14, 6, 0, C.BROWN);
        this.addWall(0, 7, 14, 6, Math.PI, C.BROWN);
        this.addWall(-7, 0, 14, 6, Math.PI / 2, C.BROWN);
        this.addWall(7, 0, 14, 6, -Math.PI / 2, C.BROWN);

        // Ceiling
        const ceiling = new THREE.Mesh(
            new THREE.PlaneGeometry(14, 14),
            this.getDitherMaterial(C.RED, C.MAGENTA, 12)
        );
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = 6;
        this.roomGroup.add(ceiling);

        // Stone pillars
        for (let i = 0; i < 5; i++) {
            this.addCylinder(-5 + i * 2.5, 3, -6.5, 0.3, 0.35, 6, C.LGRAY);
            this.addCylinder(-5 + i * 2.5, 3, 6.5, 0.3, 0.35, 6, C.LGRAY);
            // Pillar capitals
            this.addBox(-5 + i * 2.5, 6, -6.5, 0.8, 0.15, 0.8, C.LGRAY);
            this.addBox(-5 + i * 2.5, 6, 6.5, 0.8, 0.15, 0.8, C.LGRAY);
        }

        // Red carpet with perspective (center aisle)
        const carpet = new THREE.Mesh(
            new THREE.PlaneGeometry(2.5, 12),
            this.getEGAMaterial(C.RED)
        );
        carpet.rotation.x = -Math.PI / 2;
        carpet.position.y = 0.02;
        this.roomGroup.add(carpet);
        // Carpet border pattern (gold dots)
        for (let i = 0; i < 10; i++) {
            this.addBox(-1.1, 0.03, -4 + i * 0.9, 0.08, 0.01, 0.08, C.YELLOW);
            this.addBox(1.1, 0.03, -4 + i * 0.9, 0.08, 0.01, 0.08, C.YELLOW);
        }

        // Throne platform (elevated)
        this.addBox(0, 0.3, -5.5, 3, 0.6, 2, C.LGRAY);
        this.addBox(0, 0.05, -5.5, 3.5, 0.1, 2.5, C.YELLOW); // gold trim

        // Throne
        this.addBox(0, 1.2, -5.8, 1.0, 1.2, 0.5, C.YELLOW); // Back
        this.addBox(0, 0.8, -5.3, 1.0, 0.1, 0.8, C.YELLOW);  // Seat
        // Armrests
        this.addBox(-0.55, 0.95, -5.3, 0.1, 0.3, 0.8, C.YELLOW);
        this.addBox(0.55, 0.95, -5.3, 0.1, 0.3, 0.8, C.YELLOW);
        // Throne jewels
        this.addSphere(0, 1.6, -5.75, 0.08, C.RED);
        this.addSphere(-0.25, 1.4, -5.75, 0.06, C.RED);
        this.addSphere(0.25, 1.4, -5.75, 0.06, C.RED);

        // King on throne
        this.addNPC('king', 0, 0.6, Math.PI);

        // Tapestry on east wall (showing dragon)
        const tapestryCanvas = document.createElement('canvas');
        tapestryCanvas.width = 128;
        tapestryCanvas.height = 128;
        const tctx = tapestryCanvas.getContext('2d');
        tctx.fillStyle = '#0000AA';
        tctx.fillRect(0, 0, 128, 128);
        tctx.fillStyle = '#00AA00';
        // Simple dragon shape
        tctx.beginPath();
        tctx.arc(64, 70, 25, 0, Math.PI * 2);
        tctx.fill();
        tctx.beginPath();
        tctx.moveTo(40, 50);
        tctx.lineTo(88, 50);
        tctx.lineTo(70, 90);
        tctx.fill();
        tctx.fillStyle = '#FFFF55';
        tctx.font = 'bold 12px monospace';
        tctx.textAlign = 'center';
        tctx.fillText('DRAGON', 64, 110);
        const tapTex = new THREE.CanvasTexture(tapestryCanvas);
        tapTex.magFilter = THREE.NearestFilter;
        const tapMat = new THREE.MeshBasicMaterial({ map: tapTex, side: THREE.DoubleSide });
        const tapestry = new THREE.Mesh(new THREE.PlaneGeometry(2, 2.5), tapMat);
        tapestry.position.set(6.95, 3, -2);
        tapestry.rotation.y = -Math.PI / 2;
        this.roomGroup.add(tapestry);
        // Tapestry rod
        this.addBox(6.95, 4.3, -2, 0.05, 0.05, 2.5, C.BROWN);

        // Torches on walls
        this.addTorch(-5, 2.5, -6.8);
        this.addTorch(5, 2.5, -6.8);
        this.addTorch(-5, 2.5, 1);
        this.addTorch(5, 2.5, 1);
    }

    buildForestPath() {
        const C = VRController.C;
        this.scene.background = new THREE.Color(VRController.VGA[C.LIGHT_SKY]);
        this.setupOutdoorLighting();

        // Ground - lush forest floor
        this.addGround(C.FOREST_GREEN, 16);
        // Dirt path — rich VGA earth tones
        const path = new THREE.Mesh(
            new THREE.PlaneGeometry(2.5, 16),
            this.getDitherMaterial(C.WOOD, C.COFFEE, 16)
        );
        path.rotation.x = -Math.PI / 2;
        path.position.y = 0.01;
        this.roomGroup.add(path);

        // Sky — VGA azure gradient
        this.addSky(C.SKY_BLUE, C.ICE_BLUE);

        // Trees lining the path (Sierra-style forest)
        // Close trees (large, detailed)
        this.addTree(-3.5, -2, 4, 1.5, 'deciduous');
        this.addTree(3.5, -2, 4.5, 1.6, 'deciduous');
        this.addTree(-4, 3, 3.5, 1.3, 'deciduous');
        this.addTree(4, 3, 3.8, 1.4, 'deciduous');

        // Medium distance trees
        this.addTree(-5, -5, 3, 1.2, 'pine');
        this.addTree(5, -5, 3.5, 1.1, 'pine');
        this.addTree(-5.5, 1, 3, 1.0, 'deciduous');
        this.addTree(5.5, 1, 2.8, 1.0, 'deciduous');

        // Background trees (smaller)
        for (let i = 0; i < 8; i++) {
            const side = i < 4 ? -1 : 1;
            const z = -6 + i * 2;
            this.addTree(side * (6 + Math.random()), z, 2.5 + Math.random(), 0.9, i % 2 === 0 ? 'pine' : 'deciduous');
        }

        // Bushes along path
        this.addBush(-2, -3);
        this.addBush(2, 1);
        this.addBush(-1.8, 4);
        this.addBush(2.2, -5);

        // Flowers (small colored dots on ground)
        const flowerColors = [C.RED, C.YELLOW, C.LMAGENTA, C.WHITE];
        for (let i = 0; i < 20; i++) {
            const fx = -6 + Math.random() * 12;
            const fz = -6 + Math.random() * 12;
            if (Math.abs(fx) < 1.5) continue; // Don't place on path
            this.addSphere(fx, 0.08, fz, 0.04, flowerColors[i % flowerColors.length]);
        }

        // Path stones
        for (let i = 0; i < 8; i++) {
            this.addBox(
                (Math.random() - 0.5) * 1.5, 0.02, -5 + i * 1.5,
                0.15, 0.04, 0.12, C.DGRAY
            );
        }
    }

    buildForestClearing() {
        const C = VRController.C;
        this.scene.background = new THREE.Color(VRController.VGA[C.WHITE]);
        this.setupOutdoorLighting();

        // Bright sunny clearing
        const sun = new THREE.DirectionalLight(0xffffff, 0.4);
        sun.position.set(3, 8, 2);
        this.roomGroup.add(sun);

        // Ground - lush green with central soil patch
        this.addGround(C.LGREEN, 14);
        // Central rich soil
        const soil = this.addCylinder(0, 0.01, 0, 1.2, 1.5, 0.05, C.BROWN);

        // Sky
        this.addSky(C.WHITE, C.LCYAN);

        // Sun (emissive sphere)
        const sunMesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.8, 8, 6),
            new THREE.MeshBasicMaterial({ color: VRController.VGA[C.YELLOW] })
        );
        sunMesh.position.set(5, 12, -3);
        this.roomGroup.add(sunMesh);
        // Sun light
        const sunLight = new THREE.PointLight(VRController.VGA[C.YELLOW], 0.3, 20);
        sunLight.position.copy(sunMesh.position);
        this.roomGroup.add(sunLight);

        // Trees surrounding clearing (ring of trees)
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            const dist = 5.5 + Math.random() * 1.5;
            this.addTree(
                Math.cos(angle) * dist,
                Math.sin(angle) * dist,
                3 + Math.random() * 2,
                1.2 + Math.random() * 0.5,
                i % 3 === 0 ? 'pine' : 'deciduous'
            );
        }

        // Flowers
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 1.5 + Math.random() * 3;
            const colors = [C.RED, C.YELLOW, C.LMAGENTA, C.WHITE, C.LCYAN];
            this.addSphere(
                Math.cos(angle) * dist, 0.08, Math.sin(angle) * dist,
                0.04, colors[Math.floor(Math.random() * colors.length)]
            );
        }

        // Beanstalk (if grown!)
        if (this.game.gameState.beanstalkGrown) {
            // Massive twisting beanstalk going up to the sky
            const beanGroup = new THREE.Group();
            for (let i = 0; i < 25; i++) {
                const y = i * 0.8;
                const twist = Math.sin(i * 0.3) * 0.5;
                const size = 0.4 - i * 0.01;
                const segment = new THREE.Mesh(
                    new THREE.CylinderGeometry(size * 0.8, size, 0.85, 6),
                    this.getEGAMaterial(i % 2 === 0 ? C.GREEN : C.LGREEN)
                );
                segment.position.set(twist, y, Math.cos(i * 0.3) * 0.3);
                beanGroup.add(segment);

                // Leaves sprouting from stalk
                if (i % 3 === 0 && i > 2) {
                    const side = i % 2 === 0 ? 1 : -1;
                    const leaf = new THREE.Mesh(
                        new THREE.PlaneGeometry(0.8, 0.3),
                        this.getEGAMaterial(i % 6 === 0 ? C.LGREEN : C.GREEN, { side: THREE.DoubleSide })
                    );
                    leaf.position.set(twist + side * 0.5, y, Math.cos(i * 0.3) * 0.3);
                    leaf.rotation.z = side * 0.5;
                    leaf.rotation.y = Math.random() * Math.PI;
                    beanGroup.add(leaf);
                }
            }
            beanGroup.position.set(0, 0, 0);
            this.roomGroup.add(beanGroup);
        }
    }

    buildDeepForest() {
        const C = VRController.C;
        this.scene.background = new THREE.Color(VRController.VGA[C.BLACK]);
        this.setupIndoorLighting(0.15);

        // Dark ambient
        const darkLight = new THREE.AmbientLight(VRController.VGA[C.GREEN], 0.1);
        this.roomGroup.add(darkLight);

        // Ground - dark mossy forest floor
        this.addGround(C.DGRAY, 12, [C.DGRAY, C.GREEN]);

        // Fog
        this.scene.fog = new THREE.FogExp2(VRController.VGA[C.DGRAY], 0.08);

        // Dense trees everywhere creating a canopy
        for (let layer = 0; layer < 3; layer++) {
            const count = 6 + layer * 3;
            const dist = 3 + layer * 2;
            for (let i = 0; i < count; i++) {
                const angle = (i / count) * Math.PI * 2 + layer * 0.3;
                const d = dist + Math.random() * 1.5;
                const darkness = layer === 0 ? 'deciduous' : 'pine';
                this.addTree(
                    Math.cos(angle) * d, Math.sin(angle) * d,
                    3 + Math.random() * 2, 1.0 + Math.random() * 0.5, darkness
                );
            }
        }

        // Twisted vines hanging from trees
        for (let i = 0; i < 10; i++) {
            const vx = -4 + Math.random() * 8;
            const vz = -4 + Math.random() * 8;
            for (let j = 0; j < 6; j++) {
                this.addSphere(vx + Math.sin(j * 0.8) * 0.15, 3.5 - j * 0.4, vz, 0.03, C.GREEN);
            }
        }

        // Glowing mushrooms (emissive)
        for (let i = 0; i < 8; i++) {
            const mx = -3 + i * 0.8;
            const mz = -2 + Math.random() * 4;
            // Mushroom cap
            const cap = new THREE.Mesh(
                new THREE.ConeGeometry(0.12, 0.08, 6),
                this.getEGAMaterial(C.RED, { emissive: true, emissiveIntensity: 0.3 })
            );
            cap.position.set(mx, 0.18, mz);
            cap.rotation.z = Math.PI;
            this.roomGroup.add(cap);
            // Mushroom stem
            this.addCylinder(mx, 0.08, mz, 0.03, 0.04, 0.16, C.WHITE);
            // Glow
            const glow = new THREE.PointLight(VRController.VGA[C.RED], 0.15, 1.5);
            glow.position.set(mx, 0.2, mz);
            this.roomGroup.add(glow);
        }

        // Gnome NPC (if not helped yet)
        if (!this.game.gameState.gnomeHelped) {
            this.addNPC('gnome', 2, -2, -Math.PI / 4);
            // Bag with magic bean at gnome's feet
            this.addBox(2.3, 0.08, -1.8, 0.15, 0.12, 0.12, C.BROWN);
            this.addSphere(2.3, 0.16, -1.8, 0.03, C.LGREEN);
        }

        // Mysterious fog particles
        for (let i = 0; i < 15; i++) {
            const fogPuff = this.addSphere(
                -4 + Math.random() * 8, 0.3 + Math.random() * 0.5, -4 + Math.random() * 8,
                0.15 + Math.random() * 0.2, C.LGRAY
            );
            fogPuff.material = this.getEGAMaterial(C.LGRAY, { transparent: true, opacity: 0.2 });
            this.animatedObjects.push({ type: 'drift', mesh: fogPuff, phase: Math.random() * Math.PI * 2 });
        }
    }

    buildCloudRealm() {
        const C = VRController.C;
        this.scene.background = new THREE.Color(VRController.VGA[C.WHITE]);

        // Ethereal lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.7);
        this.roomGroup.add(ambient);
        const sun = new THREE.DirectionalLight(0xffffff, 0.5);
        sun.position.set(0, 10, 0);
        this.roomGroup.add(sun);

        // Cloud ground (multiple white/light gray spheres making bumpy surface)
        for (let i = 0; i < 40; i++) {
            const cx = -6 + Math.random() * 12;
            const cz = -6 + Math.random() * 12;
            const size = 0.5 + Math.random() * 1.0;
            const cloud = this.addSphere(cx, -0.2, cz, size, i % 3 === 0 ? C.LGRAY : C.WHITE);
            cloud.scale.set(1, 0.4, 1);
        }
        // Flat cloud floor underneath
        const cloudFloor = new THREE.Mesh(
            new THREE.PlaneGeometry(16, 16),
            this.getEGAMaterial(C.WHITE)
        );
        cloudFloor.rotation.x = -Math.PI / 2;
        cloudFloor.position.y = -0.5;
        this.roomGroup.add(cloudFloor);

        // Sky
        this.addSky(C.WHITE, C.LCYAN);

        // Cotton candy castle ahead (north)
        const castleGroup = new THREE.Group();
        // Main body
        this.addMeshToGroup(castleGroup, new THREE.BoxGeometry(4, 3, 3), C.LMAGENTA, 0, 1.5, 0);
        // Windows
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 3; col++) {
                this.addMeshToGroup(castleGroup, new THREE.BoxGeometry(0.4, 0.5, 0.05), C.MAGENTA,
                    -1 + col, 1.2 + row * 1.2, 1.55);
            }
        }
        // Left tower
        this.addMeshToGroup(castleGroup, new THREE.CylinderGeometry(0.7, 0.7, 4.5, 8), C.LMAGENTA, -2.5, 2.25, 0);
        this.addMeshToGroup(castleGroup, new THREE.ConeGeometry(0.9, 1.5, 8), C.MAGENTA, -2.5, 5, 0);
        // Right tower
        this.addMeshToGroup(castleGroup, new THREE.CylinderGeometry(0.7, 0.7, 4.5, 8), C.LMAGENTA, 2.5, 2.25, 0);
        this.addMeshToGroup(castleGroup, new THREE.ConeGeometry(0.9, 1.5, 8), C.MAGENTA, 2.5, 5, 0);
        // Center spire
        this.addMeshToGroup(castleGroup, new THREE.CylinderGeometry(0.4, 0.4, 2, 6), C.LMAGENTA, 0, 4, 0);
        this.addMeshToGroup(castleGroup, new THREE.ConeGeometry(0.6, 1.5, 6), C.MAGENTA, 0, 5.75, 0);
        // Flags
        this.addMeshToGroup(castleGroup, new THREE.PlaneGeometry(0.4, 0.2), C.YELLOW, -2.5, 6, 0.1);
        this.addMeshToGroup(castleGroup, new THREE.PlaneGeometry(0.4, 0.2), C.YELLOW, 2.5, 6, 0.1);
        // Door
        this.addMeshToGroup(castleGroup, new THREE.BoxGeometry(0.8, 1.5, 0.1), C.BROWN, 0, 0.75, 1.55);
        // Candy decorations (colored dots)
        const candyColors = [C.RED, C.YELLOW, C.LCYAN, C.LGREEN];
        for (let i = 0; i < 15; i++) {
            this.addMeshToGroup(castleGroup,
                new THREE.SphereGeometry(0.06, 4, 3), candyColors[i % candyColors.length],
                -1.5 + Math.random() * 3, 0.5 + Math.random() * 2.5, 1.52);
        }
        castleGroup.position.set(0, 0, -8);
        this.roomGroup.add(castleGroup);

        // Beanstalk top (visible at edge)
        this.addCylinder(-4, 0, 4, 0.5, 0.6, 2, C.GREEN);
        this.addSphere(-4, 1.2, 4, 0.8, C.LGREEN);

        // Rainbow in background
        const rainbowColors = [C.RED, C.LRED, C.YELLOW, C.LGREEN, C.CYAN, C.LBLUE, C.LMAGENTA];
        for (let c = 0; c < rainbowColors.length; c++) {
            const radius = 8 + c * 0.3;
            for (let j = 0; j < 20; j++) {
                const angle = (j / 20) * Math.PI;
                const rx = -6 + Math.cos(angle) * radius;
                const ry = Math.sin(angle) * radius * 0.5 + 2;
                this.addSphere(rx, ry, -12, 0.15, rainbowColors[c]);
            }
        }

        // Floating cloud puffs in the air
        for (let i = 0; i < 10; i++) {
            const cloud = this.addSphere(
                -5 + Math.random() * 10, 3 + Math.random() * 4, -5 + Math.random() * 10,
                0.3 + Math.random() * 0.5, C.WHITE
            );
            cloud.scale.set(1.5, 0.5, 1);
            this.animatedObjects.push({ type: 'drift', mesh: cloud, phase: Math.random() * 10 });
        }
    }

    buildDragonLair() {
        const C = VRController.C;
        this.scene.background = new THREE.Color(VRController.VGA[C.NEAR_BLACK]);
        this.setupIndoorLighting(0.15);

        // Dark cave atmosphere with warm ember glow
        this.scene.fog = new THREE.FogExp2(VRController.VGA[C.EMBER], 0.06);

        // Cave floor (rough stone — dark VGA earth)
        this.addGround(C.DARK_BROWN, 14, [C.DARK_EARTH, C.NEAR_BLACK]);

        // Cave walls (irregular — dark stone)
        // North wall with stalactites
        this.addWall(0, -7, 14, 6, 0, C.DARK_BROWN);
        // Side walls
        this.addWall(-7, 0, 14, 6, Math.PI / 2, C.DARK_BROWN);
        this.addWall(7, 0, 14, 6, -Math.PI / 2, C.DARK_BROWN);
        // Back wall
        this.addWall(0, 7, 14, 6, Math.PI, C.DARK_BROWN);

        // Cave ceiling
        const caveCeiling = new THREE.Mesh(
            new THREE.PlaneGeometry(14, 14),
            this.getDitherMaterial(C.NEAR_BLACK, C.CHARCOAL, 12)
        );
        caveCeiling.rotation.x = Math.PI / 2;
        caveCeiling.position.y = 6;
        this.roomGroup.add(caveCeiling);

        // Stalactites
        for (let i = 0; i < 12; i++) {
            const sx = -5 + Math.random() * 10;
            const sz = -5 + Math.random() * 10;
            const length = 0.5 + Math.random() * 1.5;
            this.addCone(sx, 6 - length / 2, sz, 0.15 + Math.random() * 0.1, length, C.DGRAY);
        }

        // TREASURE PILE (lots of VGA gold!)
        const goldX = -3, goldZ = -3;
        // Gold mound (stacked coins — rich VGA gold palette)
        for (let i = 0; i < 30; i++) {
            const gx = goldX + (Math.random() - 0.5) * 3;
            const gz = goldZ + (Math.random() - 0.5) * 3;
            const gy = Math.random() * 0.6;
            const size = 0.06 + Math.random() * 0.08;
            this.addCylinder(gx, gy, gz, size, size, 0.03, i % 3 === 0 ? C.GOLD : C.WARM_YELLOW, 8);
        }
        // Jewels scattered in treasure — VGA gem palette
        const jewelColors = [C.CRIMSON, C.TURQUOISE, C.SPRING, C.ORCHID, C.SKY_BLUE, C.TOMATO];
        for (let i = 0; i < 10; i++) {
            const jx = goldX + (Math.random() - 0.5) * 2.5;
            const jz = goldZ + (Math.random() - 0.5) * 2.5;
            const mesh = new THREE.Mesh(
                new THREE.OctahedronGeometry(0.06, 0),
                this.getEGAMaterial(jewelColors[i % jewelColors.length], { emissive: true, emissiveIntensity: 0.3 })
            );
            mesh.position.set(jx, 0.2 + Math.random() * 0.3, jz);
            this.roomGroup.add(mesh);
        }
        // Gold chalices
        for (let i = 0; i < 3; i++) {
            this.addCylinder(goldX - 0.8 + i * 0.8, 0.3, goldZ, 0.08, 0.12, 0.2, C.YELLOW);
        }

        // THE DRAGON (sleeping!)
        this.addNPC('dragon', -2, 0, Math.PI / 6);

        // ROYAL PUDDING PEDESTAL
        const pedX = 4, pedZ = -4;
        // Ornate pedestal
        this.addCylinder(pedX, 0.5, pedZ, 0.35, 0.45, 1, C.LGRAY);
        this.addCylinder(pedX, 1.05, pedZ, 0.4, 0.35, 0.1, C.LGRAY);
        // Pedestal gold bands
        this.addCylinder(pedX, 0.3, pedZ, 0.46, 0.46, 0.04, C.YELLOW);
        this.addCylinder(pedX, 0.7, pedZ, 0.38, 0.38, 0.04, C.YELLOW);

        // The Royal Pudding (if still here!)
        if (this.game.objects.royal_pudding && this.game.objects.royal_pudding.location === 'dragon_lair') {
            // Pudding bowl
            this.addCylinder(pedX, 1.15, pedZ, 0.25, 0.3, 0.1, C.YELLOW);
            // Pudding body
            const pudding = this.addSphere(pedX, 1.35, pedZ, 0.2, C.BROWN);
            // Glaze highlight
            this.addSphere(pedX - 0.05, 1.38, pedZ + 0.05, 0.1, C.YELLOW);
            // Cream on top
            this.addSphere(pedX, 1.5, pedZ, 0.12, C.WHITE);
            // Cherry on top!
            this.addSphere(pedX, 1.6, pedZ, 0.05, C.RED);

            // Magical glow around pudding
            const puddingLight = new THREE.PointLight(VRController.VGA[C.YELLOW], 0.5, 3);
            puddingLight.position.set(pedX, 1.5, pedZ);
            this.roomGroup.add(puddingLight);
            // Sparkle particles
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const sparkle = this.addSphere(
                    pedX + Math.cos(angle) * 0.4, 1.35 + Math.sin(angle * 2) * 0.2,
                    pedZ + Math.sin(angle) * 0.4, 0.03, C.YELLOW
                );
                this.animatedObjects.push({ type: 'orbit', mesh: sparkle, center: { x: pedX, y: 1.35, z: pedZ }, radius: 0.4, phase: i });
            }

            // Make pudding interactable
            pudding.userData.interactable = true;
            pudding.userData.objectId = 'royal_pudding';
            this.interactables.push(pudding);
        }

        // Torches on walls
        this.addTorch(-6.5, 2.5, -3);
        this.addTorch(6.5, 2.5, -3);
        this.addTorch(-6.5, 2.5, 3);
        this.addTorch(6.5, 2.5, 3);

        // Warm ominous light from treasure
        const treasureLight = new THREE.PointLight(VRController.VGA[C.YELLOW], 0.3, 6);
        treasureLight.position.set(goldX, 1, goldZ);
        this.roomGroup.add(treasureLight);
    }

    buildDefaultRoom() {
        const C = VRController.C;
        this.setupOutdoorLighting();
        this.addGround(C.GREEN, 10);
        this.addSky(C.LBLUE);
    }

    // ========================================================================
    // VR TEXT SYSTEM (Sierra-style dialog boxes)
    // ========================================================================

    createTextPanel(text, position = null) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 1024;
        canvas.height = 256;

        // Black background with cyan border (Sierra AGI style)
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#00AAAA';
        ctx.lineWidth = 6;
        ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

        // Inner border
        ctx.strokeStyle = '#0000AA';
        ctx.lineWidth = 2;
        ctx.strokeRect(14, 14, canvas.width - 28, canvas.height - 28);

        // Text
        ctx.font = '22px "Courier New", monospace';
        ctx.fillStyle = '#FFFFFF';

        // Word wrap
        const words = text.split(' ');
        let line = '';
        let y = 48;
        const maxWidth = canvas.width - 60;

        for (const word of words) {
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && line !== '') {
                ctx.fillText(line.trim(), 30, y);
                line = word + ' ';
                y += 28;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line.trim(), 30, y);

        // Score display
        if (this.game.gameState) {
            ctx.fillStyle = '#FFFF55';
            ctx.font = '16px "Courier New", monospace';
            ctx.fillText(`Score: ${this.game.gameState.score}/${this.game.gameState.maxScore}`, 30, canvas.height - 25);
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide
        });

        if (this.textPanel) {
            this.roomGroup.remove(this.textPanel);
        }

        this.textPanel = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 0.875), material);
        // Place at comfortable reading height — camera rig starts at z=2, panel at z=-3.5
        const pos = position || new THREE.Vector3(0, 1.8, -3.5);
        this.textPanel.position.copy(pos);
        this.roomGroup.add(this.textPanel);
    }

    /** Show a temporary VR message (floats in front of player) */
    showVRMessage(text) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 64;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#00AAAA';
        ctx.lineWidth = 3;
        ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

        ctx.font = '20px "Courier New", monospace';
        ctx.fillStyle = '#55FF55';
        ctx.textAlign = 'center';
        ctx.fillText(text, canvas.width / 2, 40);

        const texture = new THREE.CanvasTexture(canvas);
        texture.magFilter = THREE.NearestFilter;
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });

        // Parent to camera so the message follows the player's head (HMD-tracked)
        if (this.messagePanel) {
            this.camera.remove(this.messagePanel);
        }
        this.messagePanel = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.19), material);
        this.messagePanel.position.set(0, -0.18, -1.2); // Lower-center of FOV
        this.camera.add(this.messagePanel);
        this.messageFadeTimer = 4.0; // seconds
    }

    // ========================================================================
    // VR INPUT & INTERACTION
    // ========================================================================

    handleControllerInput(time, frame, dt) {
        if (!frame) return;
        const session = this.renderer.xr.getSession();
        if (!session) return;

        // Use passed dt; clamp to sane range to avoid teleporting on hiccups
        if (!dt || dt > 0.1) dt = 0.016;

        for (const source of session.inputSources) {
            if (!source.gamepad) continue;
            const gp = source.gamepad;
            const handedness = source.handedness;

            // Thumbstick axes
            const axisX = gp.axes.length > 2 ? gp.axes[2] : 0;
            const axisY = gp.axes.length > 3 ? gp.axes[3] : 0;
            const deadzone = 0.15;

            if (handedness === 'left') {
                // Left thumbstick: smooth locomotion
                if (Math.abs(axisX) > deadzone || Math.abs(axisY) > deadzone) {
                    // Get camera forward/right vectors
                    const dir = new THREE.Vector3();
                    this.camera.getWorldDirection(dir);
                    dir.y = 0;
                    dir.normalize();

                    const right = new THREE.Vector3();
                    right.crossVectors(dir, new THREE.Vector3(0, 1, 0));

                    // Move camera rig
                    const moveX = axisX * this.moveSpeed * dt;
                    const moveZ = axisY * this.moveSpeed * dt;

                    this.cameraRig.position.addScaledVector(right, moveX);
                    this.cameraRig.position.addScaledVector(dir, -moveZ);

                    // Clamp to room bounds
                    this.cameraRig.position.x = Math.max(-6, Math.min(6, this.cameraRig.position.x));
                    this.cameraRig.position.z = Math.max(-6, Math.min(6, this.cameraRig.position.z));
                    this._isMoving = true; // triggers comfort vignette
                }
            } else if (handedness === 'right') {
                // Right thumbstick: snap turn
                const now = performance.now();
                if (Math.abs(axisX) > 0.6 && now - this.lastSnapTime > 300) {
                    this.cameraRig.rotation.y -= Math.sign(axisX) * this.snapAngle;
                    this.lastSnapTime = now;
                }
            }

            // Face buttons - A (right) / X (left) show inventory in VR
            if (gp.buttons.length > 4 && gp.buttons[4].value > 0.5) {
                const now = performance.now();
                if (!this._lastInventoryPress || now - this._lastInventoryPress > 1200) {
                    this._lastInventoryPress = now;
                    const names = this.game.inventory
                        .map(id => this.game.objects[id]?.name)
                        .filter(Boolean);
                    const msg = names.length > 0
                        ? 'Bag: ' + names.join(', ')
                        : 'Bag: Empty';
                    this.showVRMessage(msg);
                }
            }
        }
    }

    handleInteraction(controller) {
        // Raycast from controller into scene
        this.tempMatrix.identity().extractRotation(controller.matrixWorld);
        this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
        this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tempMatrix);

        // Test against interactables
        const allInteractableMeshes = [];
        this.interactables.forEach(obj => {
            if (obj.userData.interactable) {
                allInteractableMeshes.push(obj);
            }
            obj.traverse(child => {
                if (child.isMesh) allInteractableMeshes.push(child);
            });
        });

        const intersects = this.raycaster.intersectObjects(allInteractableMeshes, true);
        if (intersects.length > 0) {
            const hit = intersects[0].object;
            // Walk up to find the interactable parent
            let target = hit;
            while (target && !target.userData.interactable && target.parent !== this.roomGroup) {
                target = target.parent;
            }

            if (target && target.userData.exitDir) {
                // Navigate to exit
                const dir = target.userData.exitDir;
                const room = this.game.rooms[this.game.currentRoom];
                if (room.exits[dir]) {
                    this.triggerHaptic(controller, 0.3, 80);
                    this.playSFX('exit');
                    this.game.enterRoom(room.exits[dir]);
                    this.createRoom();
                    this.showVRMessage(`\u2192 ${dir.toUpperCase()}`);
                    if (typeof checkWinCondition === 'function') checkWinCondition();
                }
            } else if (target && target.userData.npcType) {
                // Talk to NPC
                const room = this.game.rooms[this.game.currentRoom];
                if (room.onTalk) {
                    this.triggerHaptic(controller, 0.2, 60);
                    this.playSFX('talk');
                    room.onTalk(this.game, target.userData.npcType);
                    // Show diegetic speech bubble
                    const npcGreetings = {
                        guard: 'The pudding is missing! The King is furious!',
                        wizard: 'I sneezed mid-spell. Most... embarrassing.',
                        king: 'WHERE IS MY PUDDING?!',
                        gnome: 'Answer my riddle and I may let you pass!',
                        dragon: 'Zzzzz... *SNOOORE* ...zzz',
                        servant: 'Oh, whatever shall we do?!'
                    };
                    this.showNPCSpeechBubble(target, npcGreetings[target.userData.npcType] || '...');
                    this.showVRMessage(`Talking to ${target.userData.npcType}...`);
                }
            } else if (target && target.userData.objectId) {
                // Interact with object
                const objId = target.userData.objectId;
                const obj = this.game.objects[objId];
                if (obj && obj.takeable) {
                    this.triggerHaptic(controller, 0.6, 120);
                    this.playSFX('pickup');
                    this.game.addToInventory(objId);
                    if (obj.onTake) obj.onTake(this.game);
                    this.createRoom(); // Refresh room
                    this.showVRMessage(`Got: ${obj.name}`);
                    if (typeof checkWinCondition === 'function') checkWinCondition();
                }
            }
        }
    }

    // ========================================================================
    // SESSION MANAGEMENT
    // ========================================================================

    toggleVR() {
        if (!this.isVRMode) {
            this.enterVR();
        } else {
            this.exitVR();
        }
    }

    async enterVR() {
        if (!this.vrSupported) {
            alert('VR is not supported on this device');
            return;
        }

        try {
            // Hide 2D UI
            document.getElementById('canvas-container').style.display = 'none';
            document.getElementById('text-area').style.display = 'none';
            document.getElementById('input-area').style.display = 'none';

            // Append VR renderer
            document.body.appendChild(this.renderer.domElement);
            this.renderer.domElement.style.position = 'fixed';
            this.renderer.domElement.style.top = '0';
            this.renderer.domElement.style.left = '0';
            this.renderer.domElement.style.width = '100%';
            this.renderer.domElement.style.height = '100%';
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            // Request immersive VR with optional hand tracking
            const sessionOptions = {
                optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
            };
            const session = await navigator.xr.requestSession('immersive-vr', sessionOptions);
            await this.renderer.xr.setSession(session);

            this.isVRMode = true;
            this.vrButton.textContent = 'Exit VR Mode';

            // Initialise audio (user gesture = VR entry)
            this.initAudio();

            // Build room for VR
            this.createRoom();

            // Show Sierra-style welcome/controls panel
            this.showVRWelcome();

            // Start render loop
            this.renderer.setAnimationLoop((time, frame) => this.render(time, frame));

            // Handle session end
            session.addEventListener('end', () => {
                this.exitVR();
            });

        } catch (error) {
            console.error('Failed to enter VR:', error);
            this.exitVR();
            alert('Failed to enter VR mode: ' + error.message);
        }
    }

    exitVR() {
        this.isVRMode = false;
        this.vrButton.textContent = 'Enter VR Mode';

        // Stop ambient audio
        this._stopAmbient();

        // Clear fog
        this.scene.fog = null;

        // Show 2D UI
        document.getElementById('canvas-container').style.display = 'block';
        document.getElementById('text-area').style.display = 'block';
        document.getElementById('input-area').style.display = 'flex';

        // Remove VR renderer
        if (this.renderer.domElement.parentElement === document.body) {
            document.body.removeChild(this.renderer.domElement);
        }

        this.renderer.setAnimationLoop(null);
    }

    // ========================================================================
    // RENDER LOOP
    // ========================================================================

    render(time, frame) {
        const dt = this.clock.getDelta();
        this.animTime += dt;

        // Handle VR controller input (pass dt so locomotion is correct)
        this.handleControllerInput(time, frame, dt);

        // Update animations
        this.updateAnimations(this.animTime);

        // VR immersion updates
        if (this.isVRMode) {
            this.updateHoverHighlight();
            this._updateVignette(this._isMoving, dt);
            this._isMoving = false; // reset each frame
            // Billboard speech bubble to face camera
            if (this._speechBubble) {
                this._speechBubble.quaternion.copy(this.camera.getWorldQuaternion(new THREE.Quaternion()));
            }
        }

        // Fade message panel
        if (this.messagePanel && this.messageFadeTimer > 0) {
            this.messageFadeTimer -= dt;
            if (this.messageFadeTimer <= 0) {
                this.camera.remove(this.messagePanel);
                this.messagePanel = null;
            } else if (this.messageFadeTimer < 1.0) {
                this.messagePanel.material.opacity = this.messageFadeTimer;
            }
        }

        // Render
        this.renderer.render(this.scene, this.camera);
    }

    updateAnimations(time) {
        for (const anim of this.animatedObjects) {
            switch (anim.type) {
                case 'flame':
                    anim.mesh.position.y = anim.baseY + Math.sin(time * 8 + anim.phase) * 0.02;
                    anim.mesh.scale.setScalar(0.9 + Math.sin(time * 12 + anim.phase) * 0.15);
                    break;
                case 'bob':
                    anim.mesh.position.y = anim.baseY + Math.sin(time * 2 + anim.phase) * 0.15;
                    break;
                case 'pulse':
                    const scale = 0.8 + Math.sin(time * 3 + anim.phase) * 0.2;
                    anim.mesh.scale.setScalar(scale);
                    break;
                case 'water':
                    anim.mesh.rotation.y = time * 0.2;
                    break;
                case 'spray':
                    anim.mesh.position.y = anim.baseY + Math.sin(time * 4 + anim.phase) * 0.15;
                    break;
                case 'rotate':
                    anim.mesh.rotation.y = time * 1.5 + anim.phase;
                    anim.mesh.rotation.x = Math.sin(time + anim.phase) * 0.3;
                    break;
                case 'glow':
                    if (anim.mesh.material && anim.mesh.material.emissiveIntensity !== undefined) {
                        anim.mesh.material.emissiveIntensity = 0.3 + Math.sin(time * 2 + anim.phase) * 0.2;
                    }
                    break;
                case 'sparkle':
                    anim.mesh.visible = Math.sin(time * 5 + anim.phase) > 0;
                    break;
                case 'float':
                    anim.mesh.position.y = anim.baseY + Math.sin(time * 0.5 + anim.phase) * 0.15;
                    break;
                case 'drift':
                    anim.mesh.position.x += Math.sin(time * 0.3 + anim.phase) * 0.002;
                    anim.mesh.position.z += Math.cos(time * 0.2 + anim.phase) * 0.002;
                    break;
                case 'orbit':
                    if (anim.center) {
                        const angle = time * 0.8 + anim.phase;
                        anim.mesh.position.x = anim.center.x + Math.cos(angle) * anim.radius;
                        anim.mesh.position.z = anim.center.z + Math.sin(angle) * anim.radius;
                        anim.mesh.position.y = anim.center.y + Math.sin(time * 2 + anim.phase) * 0.1;
                    }
                    break;
                case 'wander': {
                    // Servants wander nervously back and forth
                    const speed = 1.4;
                    const r = anim.radius || 1.5;
                    const wx = anim.baseX + Math.sin(time * speed + anim.phase) * r;
                    const wz = anim.baseZ + Math.cos(time * speed * 0.7 + anim.phase * 1.3) * r;
                    anim.mesh.position.x = wx;
                    anim.mesh.position.z = wz;
                    // Face direction of travel
                    const dx = Math.cos(time * speed + anim.phase) * r * speed;
                    const dz = -Math.sin(time * speed * 0.7 + anim.phase * 1.3) * r * speed * 0.7;
                    anim.mesh.rotation.y = Math.atan2(dx, dz);
                    // Slight bobbing while walking
                    anim.mesh.position.y = Math.abs(Math.sin(time * 6 + anim.phase)) * 0.04;
                    break;
                }
                case 'gaze': {
                    // NPC slowly turns to face the player
                    if (!this.cameraRig) break;
                    const playerPos = new THREE.Vector3();
                    this.camera.getWorldPosition(playerPos);
                    playerPos.y = anim.mesh.position.y;
                    const npcPos = new THREE.Vector3();
                    anim.mesh.getWorldPosition(npcPos);
                    const toPlayer = playerPos.sub(npcPos);
                    if (toPlayer.lengthSq() > 0.01) {
                        const targetAngle = Math.atan2(toPlayer.x, toPlayer.z);
                        const diff = ((targetAngle - anim.mesh.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
                        anim.mesh.rotation.y += diff * 0.025; // slow, graceful turn
                    }
                    break;
                }
                case 'cloud': {
                    anim.angle += anim.speed;
                    anim.mesh.position.x = Math.cos(anim.angle) * anim.dist;
                    anim.mesh.position.z = Math.sin(anim.angle) * anim.dist - 8;
                    anim.mesh.position.y = anim.baseY + Math.sin(time * 0.18 + anim.angle) * 0.4;
                    break;
                }
            }
        }
    }

    // ========================================================================
    // UTILITIES
    // ========================================================================

    updateRoom() {
        if (this.isVRMode) {
            this.createRoom();
        }
    }

    convertColor(hexColor) {
        return new THREE.Color(hexColor);
    }

    // ========================================================================
    // IMMERSION SYSTEMS — Audio · Hover Ring · Vignette · Signs · Clouds
    // ========================================================================

    // ── AUDIO ─────────────────────────────────────────────────────────
    initAudio() {
        try {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        } catch (e) { console.warn('Web Audio API unavailable:', e); }
    }

    _createNoiseBuffer(duration = 2) {
        if (!this.audioCtx) return null;
        const rate = this.audioCtx.sampleRate;
        const buf = this.audioCtx.createBuffer(1, Math.floor(rate * duration), rate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        return buf;
    }

    _makeNoise(filterType = 'lowpass', freq = 400, gain = 0.1) {
        if (!this.audioCtx) return [];
        const src = this.audioCtx.createBufferSource();
        src.buffer = this._createNoiseBuffer(2);
        src.loop = true;
        const filt = this.audioCtx.createBiquadFilter();
        filt.type = filterType; filt.frequency.value = freq; filt.Q.value = 1.0;
        const g = this.audioCtx.createGain(); g.gain.value = gain;
        src.connect(filt); filt.connect(g); g.connect(this.audioCtx.destination);
        src.start();
        return [src, filt, g];
    }

    _makeOscillator(freq = 220, wave = 'sine', gain = 0.04) {
        if (!this.audioCtx) return [];
        const osc = this.audioCtx.createOscillator();
        osc.type = wave; osc.frequency.value = freq;
        const lfo = this.audioCtx.createOscillator();
        lfo.type = 'sine'; lfo.frequency.value = 0.25;
        const lfoG = this.audioCtx.createGain(); lfoG.gain.value = 2;
        lfo.connect(lfoG); lfoG.connect(osc.frequency); lfo.start();
        const g = this.audioCtx.createGain(); g.gain.value = gain;
        osc.connect(g); g.connect(this.audioCtx.destination);
        osc.start();
        return [osc, lfo, lfoG, g];
    }

    _scheduleBirdChirps() {
        if (!this.audioCtx) return;
        const chirp = () => {
            if (!this.isVRMode || !this.audioCtx) return;
            const t = this.audioCtx.currentTime;
            const osc = this.audioCtx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(2000 + Math.random() * 600, t);
            osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 300, t + 0.18);
            const g = this.audioCtx.createGain();
            g.gain.setValueAtTime(0.07, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
            osc.connect(g); g.connect(this.audioCtx.destination);
            osc.start(t); osc.stop(t + 0.25);
            this._birdTimer = setTimeout(chirp, 1200 + Math.random() * 4000);
        };
        this._birdTimer = setTimeout(chirp, 400 + Math.random() * 1800);
    }

    _stopAmbient() {
        clearTimeout(this._birdTimer);
        this._birdTimer = null;
        for (const n of this._ambientNodes) {
            try { if (n.stop) n.stop(); n.disconnect(); } catch (_) {}
        }
        this._ambientNodes = [];
        this._currentAmbientRoom = null;
    }

    playAmbient(roomId) {
        this._stopAmbient();
        if (!this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        this._currentAmbientRoom = roomId;
        switch (roomId) {
            case 'castle_gate':
            case 'forest_path':
            case 'forest_clearing':
                this._ambientNodes.push(...this._makeNoise('lowpass', 320, 0.055));
                this._scheduleBirdChirps();
                break;
            case 'courtyard':
                this._ambientNodes.push(...this._makeNoise('bandpass', 700, 0.045));
                this._ambientNodes.push(...this._makeNoise('bandpass', 1800, 0.025));
                this._scheduleBirdChirps();
                break;
            case 'wizard_tower':
                this._ambientNodes.push(...this._makeOscillator(110, 'sine', 0.038));
                this._ambientNodes.push(...this._makeNoise('highpass', 4000, 0.018));
                break;
            case 'throne_room':
                this._ambientNodes.push(...this._makeNoise('lowpass', 180, 0.048));
                this._ambientNodes.push(...this._makeOscillator(55, 'sine', 0.022));
                break;
            case 'deep_forest':
                this._ambientNodes.push(...this._makeNoise('lowpass', 100, 0.065));
                this._ambientNodes.push(...this._makeOscillator(3600, 'square', 0.01));
                break;
            case 'cloud_realm':
                this._ambientNodes.push(...this._makeNoise('highpass', 1200, 0.048));
                this._ambientNodes.push(...this._makeOscillator(880, 'sine', 0.02));
                break;
            case 'dragon_lair': {
                this._ambientNodes.push(...this._makeNoise('lowpass', 75, 0.08));
                this._ambientNodes.push(...this._makeNoise('bandpass', 450, 0.04));
                // Dragon breathing LFO
                const breathOsc = this.audioCtx.createOscillator();
                breathOsc.type = 'sawtooth'; breathOsc.frequency.value = 55;
                const breathLFO = this.audioCtx.createOscillator();
                breathLFO.type = 'sine'; breathLFO.frequency.value = 0.12;
                const breathLfoG = this.audioCtx.createGain(); breathLfoG.gain.value = 0.04;
                const breathG = this.audioCtx.createGain(); breathG.gain.value = 0.025;
                breathLFO.connect(breathLfoG); breathLfoG.connect(breathG.gain);
                breathOsc.connect(breathG); breathG.connect(this.audioCtx.destination);
                breathLFO.start(); breathOsc.start();
                this._ambientNodes.push(breathOsc, breathLFO, breathLfoG, breathG);
                break;
            }
            default:
                this._ambientNodes.push(...this._makeNoise('lowpass', 250, 0.04));
        }
    }

    playSFX(type) {
        if (!this.audioCtx) return;
        if (this.audioCtx.state === 'suspended') this.audioCtx.resume();
        const ctx = this.audioCtx;
        const t = ctx.currentTime;
        if (type === 'pickup') {
            [440, 550, 660, 880].forEach((f, i) => {
                const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
                const g = ctx.createGain();
                g.gain.setValueAtTime(0.16, t + i * 0.06);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.06 + 0.1);
                o.connect(g); g.connect(ctx.destination);
                o.start(t + i * 0.06); o.stop(t + i * 0.06 + 0.12);
            });
        } else if (type === 'exit') {
            const buf = this._createNoiseBuffer(0.4);
            if (!buf) return;
            const src = ctx.createBufferSource(); src.buffer = buf;
            const filt = ctx.createBiquadFilter(); filt.type = 'bandpass';
            filt.frequency.setValueAtTime(200, t);
            filt.frequency.exponentialRampToValueAtTime(2800, t + 0.35);
            const g = ctx.createGain();
            g.gain.setValueAtTime(0.18, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            src.connect(filt); filt.connect(g); g.connect(ctx.destination);
            src.start(t);
        } else if (type === 'talk') {
            [330, 440, 330, 550].forEach((f, i) => {
                const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = f;
                const g = ctx.createGain();
                g.gain.setValueAtTime(0.055, t + i * 0.065);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.065 + 0.055);
                o.connect(g); g.connect(ctx.destination);
                o.start(t + i * 0.065); o.stop(t + i * 0.065 + 0.06);
            });
        } else if (type === 'error') {
            const o = ctx.createOscillator(); o.type = 'sawtooth';
            o.frequency.setValueAtTime(220, t);
            o.frequency.exponentialRampToValueAtTime(110, t + 0.18);
            const g = ctx.createGain();
            g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
            o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.22);
        } else if (type === 'victory') {
            [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => {
                const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = f;
                const g = ctx.createGain();
                g.gain.setValueAtTime(0.14, t + i * 0.1);
                g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.18);
                o.connect(g); g.connect(ctx.destination);
                o.start(t + i * 0.1); o.stop(t + i * 0.1 + 0.2);
            });
        }
    }

    // ── COMFORT VIGNETTE ───────────────────────────────────────────────
    _setupVignette() {
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 256;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(128, 128, 58, 128, 128, 128);
        grad.addColorStop(0,   'rgba(0,0,0,0)');
        grad.addColorStop(0.62,'rgba(0,0,0,0)');
        grad.addColorStop(1.0, 'rgba(0,0,0,1)');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, 256, 256);
        const tex = new THREE.CanvasTexture(canvas);
        const mat = new THREE.MeshBasicMaterial({
            map: tex, side: THREE.BackSide,
            transparent: true, opacity: 0,
            depthTest: false, depthWrite: false
        });
        this._vignetteMesh = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 8), mat);
        this._vignetteMesh.renderOrder = 999;
        this.camera.add(this._vignetteMesh);
    }

    _updateVignette(isMoving, dt) {
        if (!this._vignetteMesh) return;
        const target = isMoving ? 0.9 : 0;
        const cur = this._vignetteMesh.material.opacity;
        this._vignetteMesh.material.opacity =
            THREE.MathUtils.lerp(cur, target, Math.min(dt * 10, 1));
    }

    // ── PLAYER SHADOW ────────────────────────────────────────────────────
    _addPlayerShadow() {
        const geo = new THREE.CircleGeometry(0.22, 16);
        const mat = new THREE.MeshBasicMaterial({
            color: 0x000000, transparent: true, opacity: 0.35, depthWrite: false
        });
        this._shadowDisc = new THREE.Mesh(geo, mat);
        this._shadowDisc.rotation.x = -Math.PI / 2;
        this._shadowDisc.position.y = 0.005;
        this.cameraRig.add(this._shadowDisc);
    }

    // ── HOVER HIGHLIGHT RING ──────────────────────────────────────────
    _setupHoverRing() {
        const mat = new THREE.MeshBasicMaterial({
            color: VRController.VGA[VRController.C.YELLOW],
            transparent: true, opacity: 0
        });
        this._hoverRing = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.025, 6, 24), mat);
        this._hoverRing.rotation.x = Math.PI / 2;
        this.scene.add(this._hoverRing); // scene-level — survives clearRoom
    }

    updateHoverHighlight() {
        const ctrl = this.controllers.find(c => c.userData.line?.visible)
            || this.controllers[0];
        if (!ctrl || !this._hoverRing) return;

        this.tempMatrix.identity().extractRotation(ctrl.matrixWorld);
        const ray = new THREE.Raycaster();
        ray.ray.origin.setFromMatrixPosition(ctrl.matrixWorld);
        ray.ray.direction.set(0, 0, -1).applyMatrix4(this.tempMatrix);
        ray.far = 6;

        const meshes = [];
        this.interactables.forEach(o => o.traverse(c => { if (c.isMesh) meshes.push(c); }));
        const hits = ray.intersectObjects(meshes, true);

        let hit = null;
        if (hits.length) {
            let t = hits[0].object;
            while (t && t !== this.roomGroup) {
                if (t.userData.interactable) { hit = t; break; }
                t = t.parent;
            }
        }
        this._hoveredObj = hit;

        if (this._hoveredObj) {
            const box = new THREE.Box3().setFromObject(this._hoveredObj);
            const center = new THREE.Vector3(); box.getCenter(center);
            const size  = new THREE.Vector3(); box.getSize(size);
            const r = Math.max(size.x, size.z) * 0.55 + 0.12;
            this._hoverRing.position.set(center.x, box.min.y + 0.01, center.z);
            this._hoverRing.scale.setScalar(r / 0.35);
            this._hoverRing.material.opacity = 0.5 + Math.sin(this.animTime * 5) * 0.35;
            this._hoverRing.rotation.z = this.animTime * 1.8;
        } else {
            this._hoverRing.material.opacity = 0;
        }

        // Tint controller ray + pointer based on hover state
        const col = this._hoveredObj
            ? VRController.VGA[VRController.C.YELLOW]
            : VRController.VGA[VRController.C.LCYAN];
        for (const c of this.controllers) {
            c.userData.pointer?.material.color.setHex(col);
            c.userData.line?.material.color.setHex(col);
        }
    }

    // ── ROOM SIGN ──────────────────────────────────────────────────────────
    addRoomSign(name) {
        const C = VRController.C;
        const post = new THREE.Mesh(
            new THREE.CylinderGeometry(0.04, 0.05, 2.5, 6),
            this.getEGAMaterial(C.WOOD)
        );
        post.position.set(0, 1.25, -5.15);
        this.roomGroup.add(post);

        const board = new THREE.Mesh(
            new THREE.BoxGeometry(2.3, 0.55, 0.08),
            this.getEGAMaterial(C.PERU)
        );
        board.position.set(0, 2.42, -5.15);
        this.roomGroup.add(board);

        // Canvas-textured face
        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 128;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#C07840';
        ctx.fillRect(0, 0, 512, 128);
        for (let i = 0; i < 10; i++) { // wood grain
            ctx.strokeStyle = 'rgba(0,0,0,0.09)'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(0, 13 * i + 3); ctx.lineTo(512, 13 * i + 6); ctx.stroke();
        }
        ctx.font = 'bold 46px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#3A1000';
        ctx.fillText(name, 256, 80);
        ctx.strokeStyle = '#3A1000'; ctx.lineWidth = 5;
        ctx.strokeRect(5, 5, 502, 118);

        const tex = new THREE.CanvasTexture(canvas);
        tex.magFilter = THREE.NearestFilter;
        const face = new THREE.Mesh(
            new THREE.PlaneGeometry(2.25, 0.52),
            new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide })
        );
        face.position.set(0, 2.42, -5.10);
        this.roomGroup.add(face);
    }

    // ── OUTDOOR CLOUDS ────────────────────────────────────────────────────
    addRoomClouds() {
        const C = VRController.C;
        const outdoor = ['castle_gate', 'courtyard', 'forest_path', 'forest_clearing'];
        if (!outdoor.includes(this.game.currentRoom)) return;
        for (let i = 0; i < 8; i++) {
            const group = new THREE.Group();
            const puffs = 3 + Math.floor(Math.random() * 3);
            for (let j = 0; j < puffs; j++) {
                const puff = new THREE.Mesh(
                    new THREE.SphereGeometry(0.5 + Math.random() * 0.7, 7, 5),
                    this.getEGAMaterial(j % 2 === 0 ? C.WHITE : C.LGRAY)
                );
                puff.position.set(j * 0.9 - puffs * 0.45, Math.random() * 0.3, 0);
                puff.scale.y = 0.45 + Math.random() * 0.2;
                group.add(puff);
            }
            const angle = (i / 8) * Math.PI * 2;
            const dist  = 14 + Math.random() * 8;
            group.position.set(
                Math.cos(angle) * dist,
                8 + Math.random() * 5,
                Math.sin(angle) * dist - 8
            );
            this.roomGroup.add(group);
            this.animatedObjects.push({
                type: 'cloud', mesh: group,
                angle, dist,
                speed: 0.0006 + Math.random() * 0.0005,
                baseY: group.position.y
            });
        }
    }

    // ── VR WELCOME PANEL ────────────────────────────────────────────────
    showVRWelcome() {
        const canvas = document.createElement('canvas');
        canvas.width = 1024; canvas.height = 512;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000080'; ctx.fillRect(0, 0, 1024, 512);
        ctx.strokeStyle = '#00AAAA'; ctx.lineWidth = 8;
        ctx.strokeRect(12, 12, 1000, 488);
        ctx.strokeStyle = '#0000AA'; ctx.lineWidth = 2;
        ctx.strokeRect(22, 22, 980, 468);
        ctx.textAlign = 'center';
        ctx.font = 'bold 68px "Courier New", monospace';
        ctx.fillStyle = '#FFFF55';
        ctx.fillText("KING'S QUEST VR", 512, 108);
        ctx.font = 'bold 30px "Courier New", monospace';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('The Magical Mishap', 512, 160);
        ctx.strokeStyle = '#00AAAA'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(70, 186); ctx.lineTo(954, 186); ctx.stroke();
        ctx.font = '24px "Courier New", monospace'; ctx.fillStyle = '#55FFFF';
        [
            '[ LEFT STICK ]   Walk  /  Strafe',
            '[ RIGHT STICK ]  Snap Turn  (30\u00b0)',
            '[ TRIGGER ]      Interact  \u2022  Talk  \u2022  Pick Up',
            '[ A / X ]        Show Inventory',
            '[ GLOWING RING ] Marks what you can interact with',
        ].forEach((l, i) => ctx.fillText(l, 512, 240 + i * 44));
        ctx.font = '21px "Courier New", monospace'; ctx.fillStyle = '#55FF55';
        ctx.fillText('Find the Royal Pudding before dinner time!', 512, 476);

        const tex = new THREE.CanvasTexture(canvas);
        tex.magFilter = THREE.NearestFilter;
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(3.6, 1.8),
            new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide })
        );
        mesh.position.set(0, 1.6, -2.5);
        this.cameraRig.add(mesh);
        setTimeout(() => {
            this.cameraRig.remove(mesh);
            tex.dispose(); mesh.geometry.dispose(); mesh.material.dispose();
        }, 9000);
    }

    // ── NPC SPEECH BUBBLE ───────────────────────────────────────────────
    showNPCSpeechBubble(npcGroup, text) {
        if (this._speechBubble) {
            this.roomGroup.remove(this._speechBubble);
            this._speechBubble = null;
        }
        if (!text || !npcGroup) return;

        const canvas = document.createElement('canvas');
        canvas.width = 512; canvas.height = 160;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFEF0';
        if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(4, 4, 504, 124, 10); ctx.fill(); }
        else { ctx.fillRect(4, 4, 504, 124); }
        ctx.strokeStyle = '#000066'; ctx.lineWidth = 4; ctx.stroke();
        // Pointer tail
        ctx.fillStyle = '#FFFEF0';
        ctx.beginPath(); ctx.moveTo(216, 126); ctx.lineTo(256, 155); ctx.lineTo(296, 126);
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = '#000066'; ctx.lineWidth = 2; ctx.stroke();
        // Text
        ctx.fillStyle = '#000055';
        ctx.font = '22px "Courier New", monospace'; ctx.textAlign = 'center';
        const words = text.split(' ');
        let line = '', y = 44;
        for (const w of words) {
            const test = line + w + ' ';
            if (ctx.measureText(test).width > 468 && line) {
                ctx.fillText(line.trim(), 256, y); line = w + ' '; y += 28;
            } else line = test;
        }
        ctx.fillText(line.trim(), 256, y);

        const tex = new THREE.CanvasTexture(canvas);
        tex.magFilter = THREE.NearestFilter;
        const mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1.5, 0.47),
            new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide })
        );
        const box = new THREE.Box3().setFromObject(npcGroup);
        mesh.position.set(npcGroup.position.x, box.max.y + 0.38, npcGroup.position.z);
        this.roomGroup.add(mesh);
        this._speechBubble = mesh;
        clearTimeout(this._bubbleTimer);
        this._bubbleTimer = setTimeout(() => {
            if (this._speechBubble) {
                this.roomGroup.remove(this._speechBubble); this._speechBubble = null;
            }
        }, 5500);
    }
}
