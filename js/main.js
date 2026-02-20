// Main Game Initialization
let game;
let vrController;

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('game-canvas');
    const textArea = document.getElementById('text-area');
    const commandInput = document.getElementById('command-input');
    
    // Initialize game engine
    game = new GameEngine(canvas, textArea);
    game.loadRooms(STORY_CONTENT.rooms);
    game.loadObjects(STORY_CONTENT.objects);
    
    // Initialize VR controller
    vrController = new VRController(game);
    
    // Start the game
    game.start();
    installEasterEggs(); // must run after game is initialised
    
    // Command input handling
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                // Special handling for riddle answer
                if (game.currentRoom === 'deep_forest' && !game.gameState.gnomeHelped) {
                    handleRiddleAnswer(command);
                } else {
                    game.processCommand(command);
                }
                
                // Update VR room if in VR mode
                if (vrController.isVRMode) {
                    vrController.updateRoom();
                }
                
                // Check win condition
                checkWinCondition();
            }
            commandInput.value = '';
        }
    });
    
    // Focus on input
    commandInput.focus();
});

function handleRiddleAnswer(answer) {
    const lowerAnswer = answer.toLowerCase();
    
    if (lowerAnswer.includes('mountain') || lowerAnswer.includes('mountains')) {
        game.displayText("\n> " + answer, '#55FF55');
        game.displayText("\nGnome: 'CORRECT! Mountains have roots in the earth, are taller");
        game.displayText("than trees, reach up to the sky, yet never grow!'");
        game.displayText("\nThe gnome smiles and steps aside.");
        game.displayText("'You may take the magic bean as your reward!'");
        game.displayText("\nThe gnome vanishes in a puff of smoke!");
        
        game.gameState.gnomeHelped = true;
        game.addScore(20);
        
        // Redraw room
        const room = game.rooms[game.currentRoom];
        game.drawRoom(room);
        
        // Open path
        game.rooms.deep_forest.exits.east = 'forest_clearing';
    } else {
        game.displayText("\n> " + answer, '#55FF55');
        game.displayText("\nGnome: 'No, that's not it! Think harder!'");
    }
}

let gameWon = false;
function checkWinCondition() {
    if (gameWon) return;
    // Check if player has returned pudding to throne room
    if (game.currentRoom === 'throne_room' && game.hasObject('royal_pudding')) {
        gameWon = true;
        game.displayText("\n========================================");
        game.displayText("You present the Royal Pudding to the King!");
        game.displayText("\nKing: 'MY PUDDING! You've done it, Sir Graham!'");
        game.displayText("'You are truly the bravest and most pudding-focused");
        game.displayText("knight in all the kingdom!'");
        game.displayText("\nThe King immediately begins eating the pudding with");
        game.displayText("a giant spoon, a look of pure bliss on his face.");
        game.displayText("\nWizard Ignatius peeks in: 'Sorry about that whole");
        game.displayText("teleportation mishap. I'll try to sneeze AWAY from");
        game.displayText("my spellbook next time.'");
        game.displayText("\n========================================");
        game.addScore(50);
        game.displayText("\n*** YOU HAVE WON! ***");
        game.displayText(`Final Score: ${game.gameState.score}/${game.gameState.maxScore}`);
        game.displayText("\nThank you for playing King's Quest VR: The Magical Mishap!");
        game.displayText("A Sierra-style adventure by KQVR Productions");
        game.displayText("========================================\n");
        
        // Disable further input
        document.getElementById('command-input').disabled = true;
        
        // Show victory animation in VR if active
        if (vrController.isVRMode) {
            showVRVictory();
        }
    }
}

function showVRVictory() {
    if (!vrController || !vrController.scene) return;

    // Play victory fanfare
    if (vrController.playSFX) vrController.playSFX('victory');

    // VGA-palette celebratory fireworks
    const vgaColors = VRController.VGA || [
        0xFFFF55, 0xFF5555, 0x55FF55, 0x5555FF,
        0xFF55FF, 0x55FFFF, 0xFFFFFF
    ];
    const burstColors = [14, 39, 121, 117, 126, 108, 122, 40, 15]; // VGA palette burst
    const geometry = new THREE.SphereGeometry(0.08, 6, 4);
    const particles = [];

    for (let i = 0; i < 60; i++) {
        const colorIdx = burstColors[i % burstColors.length];
        const color = vgaColors[colorIdx] || 0xFFFF55;
        const material = new THREE.MeshBasicMaterial({ color });
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(
            (Math.random() - 0.5) * 8,
            Math.random() * 0.5,
            (Math.random() - 0.5) * 8
        );
        particle.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.06,
            0.04 + Math.random() * 0.08,
            (Math.random() - 0.5) * 0.06
        );
        vrController.roomGroup.add(particle);
        particles.push(particle);
    }

    // Show VR message
    if (vrController.showVRMessage) {
        vrController.showVRMessage('YOU HAVE WON! The Royal Pudding is saved!');
    }

    // Animate particles rising and fading
    let frame = 0;
    const animateVictory = () => {
        frame++;
        for (const p of particles) {
            p.position.add(p.userData.velocity);
            p.userData.velocity.y -= 0.0008; // gravity
            p.rotation.x += 0.05;
            p.rotation.z += 0.07;
            // Shrink over time
            const scale = Math.max(0, 1 - frame / 180);
            p.scale.setScalar(scale);
        }
        if (frame < 180) {
            requestAnimationFrame(animateVictory);
        } else {
            // Cleanup
            for (const p of particles) {
                vrController.roomGroup.remove(p);
                p.geometry.dispose();
                p.material.dispose();
            }
        }
    };
    animateVictory();
}

// Easter eggs and Sierra-style responses
const easterEggs = {
    'xyzzy': "A hollow voice says 'Wrong game, adventurer!'",
    'plugh': "Nothing happens. This isn't Colossal Cave!",
    'help me': "The game whispers: 'Read the room descriptions carefully...'",
    'hint': "Sierra Hint: Try TALKING to people and EXAMINING everything!",
    'die': "You trip on a pebble. But this is a friendly Sierra game - you're fine!",
    'quit': "A true adventurer never quits! (But you can close the tab.)",
    'save': "Sierra would charge you for hint books, but we give saves for free... just kidding, no save system!",
    'load': "Load game? This IS the game! Just keep playing.",
    'ken': "Ken Williams nods approvingly from the Sierra offices.",
    'roberta': "Roberta Williams smiles at your adventurous spirit!"
};

// Integrate easter eggs into processCommand safely
function installEasterEggs() {
    if (!game || !game.processCommand) return;
    const originalProcess = game.processCommand.bind(game);
    game.processCommand = function(input) {
        const lower = input.toLowerCase().trim();
        if (easterEggs[lower]) {
            this.displayText("\n> " + input, '#55FF55');
            this.displayText(easterEggs[lower]);
            if (vrController && vrController.isVRMode && vrController.showVRMessage) {
                vrController.showVRMessage(easterEggs[lower]);
            }
            return;
        }
        originalProcess(input);
    };
}
// installEasterEggs is now called inside DOMContentLoaded after game init

// Window resize handler
window.addEventListener('resize', () => {
    if (vrController && vrController.camera && vrController.renderer && !vrController.isVRMode) {
        vrController.camera.aspect = window.innerWidth / window.innerHeight;
        vrController.camera.updateProjectionMatrix();
        vrController.renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
    // ESC to exit VR
    if (e.key === 'Escape' && vrController && vrController.isVRMode) {
        vrController.exitVR();
    }
    // F1 = help
    if (e.key === 'F1') {
        e.preventDefault();
        game.processCommand('help');
    }
    // F5 = inventory
    if (e.key === 'F5') {
        e.preventDefault();
        game.processCommand('inventory');
    }
});
