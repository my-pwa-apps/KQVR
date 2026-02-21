// Game Engine - Core adventure game mechanics
class GameEngine {
    constructor(canvas, textArea) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.textArea = textArea;
        this.currentRoom = 'castle_gate';
        this.inventory = [];
        this.gameState = {
            hasKey: false,
            dragonAsleep: false,
            dragonDeepAsleep: false,
            lullabyUsed: false,
            wizardHappy: false,
            gnomeHelped: false,
            hasMagicBean: false,
            beanstalkGrown: false,
            musicBoxOpened: false,
            score: 0,
            maxScore: 175
        };
        this.commandHistory = [];
        this.rooms = {};
        this.objects = {};
        this.parser = new CommandParser(this);
        
        this.initializeColorPalette();
    }
    
    initializeColorPalette() {
        // VGA 128-color palette — Sierra SCI-era richness (KQ5/KQ6 style)
        // Indices 0-15 = classic EGA base, 16-127 = extended VGA
        this.colors = [
            // ── 0-15: Classic EGA base ──
            '#000000', '#0000AA', '#00AA00', '#00AAAA',
            '#AA0000', '#AA00AA', '#AA5500', '#AAAAAA',
            '#555555', '#5555FF', '#55FF55', '#55FFFF',
            '#FF5555', '#FF55FF', '#FFFF55', '#FFFFFF',
            // ── 16-31: Grays & Neutrals ──
            '#0D0D0D', '#1A1A1A', '#2A2A2A', '#3D3D3D',
            '#4F4F4F', '#626262', '#767676', '#8B8B8B',
            '#9F9F9F', '#B4B4B4', '#C8C8C8', '#DCDCDC',
            '#ECECEC', '#F5F0E0', '#FFF8DC', '#FDF5E6',
            // ── 32-47: Skin, Sand, Warm tones ──
            '#FFE4C4', '#FFDAAF', '#F5C8A0', '#E8B48A',
            '#D49A6A', '#C08050', '#DAA520', '#FFD700',
            '#FFA500', '#FF8C00', '#FF6347', '#CD5C5C',
            '#FFC0CB', '#FFB6C1', '#FF69B4', '#DB7093',
            // ── 48-63: Blues & Purples ──
            '#000033', '#000066', '#000099', '#0033CC',
            '#0066FF', '#3399FF', '#66BBFF', '#99DDFF',
            '#CCEEFF', '#191970', '#4B0082', '#663399',
            '#8A2BE2', '#9370DB', '#BA55D3', '#DDA0DD',
            // ── 64-79: Greens & Nature ──
            '#002200', '#003300', '#004D00', '#006600',
            '#228B22', '#2E8B57', '#3CB371', '#32CD32',
            '#90EE90', '#98FB98', '#6B8E23', '#556B2F',
            '#808000', '#9ACD32', '#7CFC00', '#00FF7F',
            // ── 80-95: Browns & Earth ──
            '#1A0A00', '#2D1600', '#3E2723', '#4E342E',
            '#5D4037', '#6D4C41', '#795548', '#8D6E63',
            '#A0522D', '#CD853F', '#D2691E', '#DEB887',
            '#F4A460', '#FFE4B5', '#C4A882', '#BDB76B',
            // ── 96-111: Water & Ice ──
            '#001122', '#002244', '#003355', '#004466',
            '#006688', '#0088AA', '#00AACC', '#33CCEE',
            '#66EEFF', '#AAFFFF', '#E0FFFF', '#F0FFFF',
            '#40E0D0', '#48D1CC', '#00CED1', '#20B2AA',
            // ── 112-127: Fire, Lava, Magic ──
            '#1A0000', '#330000', '#660000', '#8B0000',
            '#CC0000', '#FF0000', '#FF3300', '#FF6600',
            '#FF9900', '#FFCC00', '#FFFF66', '#FFFFAA',
            '#800080', '#CC00CC', '#FF00FF', '#EE82EE'
        ];
        
        // Named color constants — Classic EGA (0-15)
        this.BLACK = 0;
        this.BLUE = 1;
        this.GREEN = 2;
        this.CYAN = 3;
        this.RED = 4;
        this.MAGENTA = 5;
        this.BROWN = 6;
        this.LIGHT_GRAY = 7;
        this.DARK_GRAY = 8;
        this.LIGHT_BLUE = 9;
        this.LIGHT_GREEN = 10;
        this.LIGHT_CYAN = 11;
        this.LIGHT_RED = 12;
        this.LIGHT_MAGENTA = 13;
        this.YELLOW = 14;
        this.WHITE = 15;
        // Extended VGA named constants (16-127)
        this.NEAR_BLACK = 16;
        this.CHARCOAL = 18;
        this.SLATE = 20;
        this.SILVER = 25;
        this.PARCHMENT = 29;
        this.PEACH = 33;
        this.TAN = 35;
        this.SKIN = 37;
        this.GOLDENROD = 38;
        this.GOLD = 39;
        this.ORANGE = 40;
        this.DARK_ORANGE = 41;
        this.TOMATO = 42;
        this.PINK = 44;
        this.SKY_BLUE = 53;
        this.LIGHT_SKY = 54;
        this.INDIGO = 58;
        this.PURPLE = 59;
        this.ORCHID = 62;
        this.FOREST_GREEN = 68;
        this.SEA_GREEN = 69;
        this.LIME = 71;
        this.OLIVE = 76;
        this.DARK_BROWN = 82;
        this.COFFEE = 83;
        this.WOOD = 85;
        this.SIENNA = 88;
        this.PERU = 89;
        this.SANDY = 92;
        this.OCEAN = 98;
        this.TROPICAL = 101;
        this.TURQUOISE = 108;
        this.EMBER = 112;
        this.CRIMSON = 114;
        this.FIRE_ORANGE = 118;
        this.WARM_YELLOW = 121;
        this.MAGIC_PURPLE = 124;
        this.VIOLET = 127;
        
        // Initialize Sierra drawing primitives
        this.initSierraGraphics();
    }
    
    initSierraGraphics() {
        // Sierra AGI-style drawing functions
        this.sierraGfx = {
            // Draw a filled rectangle
            fillRect: (x, y, width, height, color) => {
                this.ctx.fillStyle = this.colors[color];
                this.ctx.fillRect(x, y, width, height);
            },
            
            // Draw a line
            drawLine: (x1, y1, x2, y2, color) => {
                this.ctx.strokeStyle = this.colors[color];
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
                this.ctx.stroke();
            },
            
            // Draw a filled polygon (Sierra AGI style)
            fillPolygon: (points, color) => {
                if (points.length < 3) return;
                this.ctx.fillStyle = this.colors[color];
                this.ctx.beginPath();
                this.ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    this.ctx.lineTo(points[i].x, points[i].y);
                }
                this.ctx.closePath();
                this.ctx.fill();
            },
            
            // Draw a filled circle
            fillCircle: (x, y, radius, color) => {
                this.ctx.fillStyle = this.colors[color];
                this.ctx.beginPath();
                this.ctx.arc(x, y, radius, 0, Math.PI * 2);
                this.ctx.fill();
            },
            
            // Draw outline circle
            drawCircle: (x, y, radius, color) => {
                this.ctx.strokeStyle = this.colors[color];
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(x, y, radius, 0, Math.PI * 2);
                this.ctx.stroke();
            },
            
            // Draw horizontal gradient (for sky effects)
            fillGradient: (x, y, width, height, color1, color2) => {
                const gradient = this.ctx.createLinearGradient(x, y, x, y + height);
                gradient.addColorStop(0, this.colors[color1]);
                gradient.addColorStop(1, this.colors[color2]);
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(x, y, width, height);
            },
            
            // Draw a pixel
            drawPixel: (x, y, color) => {
                this.ctx.fillStyle = this.colors[color];
                this.ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
            },
            
            // Draw rectangle with RGBA transparency
            fillRectAlpha: (x, y, width, height, color, alpha) => {
                this.ctx.globalAlpha = alpha;
                this.ctx.fillStyle = this.colors[color];
                this.ctx.fillRect(x, y, width, height);
                this.ctx.globalAlpha = 1.0;
            },
            
            // Draw with raw RGBA values
            fillRectRGBA: (x, y, width, height, r, g, b, a) => {
                this.ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
                this.ctx.fillRect(x, y, width, height);
            },
            
            // Draw filled polygon with alpha
            fillPolygonAlpha: (points, color, alpha) => {
                if (points.length < 3) return;
                this.ctx.globalAlpha = alpha;
                this.ctx.fillStyle = this.colors[color];
                this.ctx.beginPath();
                this.ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    this.ctx.lineTo(points[i].x, points[i].y);
                }
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.globalAlpha = 1.0;
            },
            
            // Draw filled circle with alpha
            fillCircleAlpha: (x, y, radius, color, alpha) => {
                this.ctx.globalAlpha = alpha;
                this.ctx.fillStyle = this.colors[color];
                this.ctx.beginPath();
                this.ctx.arc(x, y, radius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.globalAlpha = 1.0;
            }
        };
    }
    
    /** Get CSS rgba() string for a palette color with alpha */
    rgba(colorIndex, alpha = 1.0) {
        const hex = this.colors[colorIndex] || '#FFFFFF';
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    loadRooms(rooms) {
        this.rooms = rooms;
        console.log("Loaded rooms:", Object.keys(rooms));
    }
    
    loadObjects(objects) {
        this.objects = objects;
    }
    
    start() {
        // Clear text area
        this.textArea.innerHTML = '';
        this.displayText("╔════════════════════════════════════════╗", '#00AAAA');
        this.displayText("║  KING'S QUEST VR: THE MAGICAL MISHAP  ║", '#00AAAA');
        this.displayText("║  A Sierra-style Adventure in VR       ║", '#00AAAA');
        this.displayText("║  by KQVR Productions                  ║", '#00AAAA');
        this.displayText("╚════════════════════════════════════════╝", '#00AAAA');
        this.displayText("");
        this.displayText("You are Sir Graham, a knight with a peculiar problem.");
        this.displayText("The court wizard's spell went awry and accidentally");
        this.displayText("teleported the kingdom's royal pudding to a dragon's lair!");
        this.displayText("The king is VERY upset about his dessert.");
        this.displayText("");
        this.displayText("Your quest: Retrieve the Royal Pudding before dinner time!");
        this.displayText("(Type HELP for commands, or enter VR mode on Quest 3s!)\n");
        this.enterRoom(this.currentRoom);
    }
    
    enterRoom(roomId) {
        const prevRoom = this.currentRoom;
        this.currentRoom = roomId;
        const room = this.rooms[roomId];
        if (!room) {
            this.displayText("ERROR: You've wandered into undefined space!");
            console.error("Room not found:", roomId, "Available rooms:", Object.keys(this.rooms));
            return;
        }

        // LFSR dissolve transition (AGI-style) when changing rooms
        if (prevRoom !== roomId && this.ctx) {
            this.dissolveTransition(room);
        } else {
            this.drawRoom(room);
        }

        this.displayText("\n" + room.description);

        // Show visible objects
        const visibleObjects = this.getVisibleObjects(roomId);
        if (visibleObjects.length > 0) {
            this.displayText("You can see: " + visibleObjects.join(", "));
        }

        // Show exits
        const exits = Object.keys(room.exits);
        if (exits.length > 0) {
            this.displayText("Obvious exits: " + exits.join(", ").toUpperCase());
        }
    }

    /** AGI-style dissolve transition — coprime step walk covers every pixel exactly once.
     *  For a 640×400 = 256 000 pixel canvas we use step 65537 (Fermat prime).
     *  gcd(65537, 256000) = 1, so the walk is a complete permutation. */
    dissolveTransition(newRoom) {
        const oldImage = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.drawRoom(newRoom);
        const newImage = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.putImageData(oldImage, 0, 0);

        const totalPixels = this.canvas.width * this.canvas.height;
        // Step must be coprime with totalPixels.  65537 works for 640×400;
        // fall back to a safe odd non-multiple-of-5 for other canvas sizes.
        const STEP = ((totalPixels % 65537) !== 0) ? 65537 : 98767;
        const pixelsPerFrame = Math.ceil(totalPixels / 24); // ~24 frames ≈ 400 ms at 60 fps
        const data = oldImage.data;
        const src  = newImage.data;
        let pos = 0;
        let revealed = 0;

        const dissolveStep = () => {
            for (let i = 0; i < pixelsPerFrame && revealed < totalPixels; i++) {
                const idx = pos * 4;
                data[idx]     = src[idx];
                data[idx + 1] = src[idx + 1];
                data[idx + 2] = src[idx + 2];
                data[idx + 3] = src[idx + 3];
                pos = (pos + STEP) % totalPixels;
                revealed++;
            }
            this.ctx.putImageData(oldImage, 0, 0);
            if (revealed < totalPixels) {
                requestAnimationFrame(dissolveStep);
            }
        };
        dissolveStep();
    }
    
    drawRoom(room) {
        // Draw room-specific graphics using Sierra AGI style
        if (room.draw) {
            room.draw(this.sierraGfx, this.gameState, this);
        }
        
        // Draw player character (Sierra AGI-style animated sprite)
        this.drawPlayer(room.playerX || 320, room.playerY || 280);
    }
    
    drawPlayer(x, y) {
        const gfx = this.sierraGfx;
        const ctx = this.ctx;
        
        // Sierra AGI-style character sprite (more detailed)
        // Shadow
        gfx.fillPolygon([
            {x: x - 10, y: y + 20},
            {x: x + 10, y: y + 20},
            {x: x + 8, y: y + 22},
            {x: x - 8, y: y + 22}
        ], this.DARK_GRAY);
        
        // Legs (walking pose)
        gfx.fillRect(x - 6, y + 5, 4, 10, this.BROWN);
        gfx.fillRect(x + 2, y + 5, 4, 10, this.BROWN);
        
        // Boots
        gfx.fillRect(x - 7, y + 14, 5, 4, this.BLACK);
        gfx.fillRect(x + 2, y + 14, 5, 4, this.BLACK);
        
        // Tunic body (blue, Sierra style)
        gfx.fillPolygon([
            {x: x - 8, y: y - 12},
            {x: x + 8, y: y - 12},
            {x: x + 10, y: y + 5},
            {x: x - 10, y: y + 5}
        ], this.BLUE);
        
        // Tunic shadow/shading
        gfx.drawLine(x + 6, y - 10, x + 8, y + 3, this.DARK_GRAY);
        
        // Belt
        gfx.fillRect(x - 10, y - 2, 20, 2, this.BROWN);
        
        // Arms
        gfx.fillPolygon([
            {x: x - 8, y: y - 10},
            {x: x - 14, y: y - 8},
            {x: x - 14, y: y + 2},
            {x: x - 10, y: y + 3}
        ], this.LIGHT_GRAY);
        
        gfx.fillPolygon([
            {x: x + 8, y: y - 10},
            {x: x + 14, y: y - 8},
            {x: x + 14, y: y + 2},
            {x: x + 10, y: y + 3}
        ], this.LIGHT_GRAY);
        
        // Hands
        gfx.fillRect(x - 15, y + 1, 3, 3, this.BROWN);
        gfx.fillRect(x + 12, y + 1, 3, 3, this.BROWN);
        
        // Sword on belt
        gfx.fillRect(x + 6, y - 6, 2, 10, this.LIGHT_GRAY);
        gfx.fillRect(x + 5, y - 7, 4, 2, this.BROWN);
        
        // Head (helmet)
        gfx.fillCircle(x, y - 22, 8, this.LIGHT_GRAY);
        
        // Helmet visor opening
        gfx.fillRect(x - 4, y - 23, 8, 4, this.BLACK);
        
        // Helmet plume
        gfx.fillPolygon([
            {x: x - 2, y: y - 30},
            {x: x, y: y - 35},
            {x: x + 2, y: y - 30}
        ], this.RED);
        
        // Face visible through visor (simple)
        gfx.drawPixel(x - 2, y - 22, this.BROWN);
        gfx.drawPixel(x + 2, y - 22, this.BROWN);
    }
    
    getVisibleObjects(roomId) {
        return Object.keys(this.objects)
            .filter(objId => this.objects[objId].location === roomId)
            .map(objId => this.objects[objId].name);
    }
    
    processCommand(input) {
        this.displayText("\n> " + input, '#55FF55');
        this.commandHistory.push(input);
        
        const result = this.parser.parse(input);
        
        if (result.redraw) {
            const room = this.rooms[this.currentRoom];
            this.drawRoom(room);
        }
    }
    
    displayText(text, color = '#FFFFFF') {
        const p = document.createElement('p');
        p.style.margin = '2px 0';
        p.style.padding = '0';
        p.style.color = color;
        p.style.lineHeight = '1.3';
        p.textContent = text;
        this.textArea.appendChild(p);
        this.textArea.scrollTop = this.textArea.scrollHeight;

        // Keep text area from growing unbounded
        while (this.textArea.children.length > 150) {
            this.textArea.removeChild(this.textArea.firstChild);
        }
    }
    
    addToInventory(objectId) {
        const obj = this.objects[objectId];
        if (obj) {
            this.inventory.push(objectId);
            obj.location = 'inventory';
            this.displayText("You pick up the " + obj.name + ".");
            return true;
        }
        return false;
    }
    
    removeFromInventory(objectId) {
        const index = this.inventory.indexOf(objectId);
        if (index > -1) {
            this.inventory.splice(index, 1);
            return true;
        }
        return false;
    }
    
    hasObject(objectId) {
        return this.inventory.includes(objectId);
    }
    
    addScore(points) {
        this.gameState.score += points;
        this.displayText(`♪ [Score: ${this.gameState.score}/${this.gameState.maxScore}]`, '#FFFF55');
    }

    /** Persist game state to localStorage */
    save() {
        const saveData = {
            currentRoom: this.currentRoom,
            inventory: [...this.inventory],
            gameState: { ...this.gameState },
            objectLocations: {},
            roomExits: {}
        };
        for (const id in this.objects) {
            saveData.objectLocations[id] = this.objects[id].location;
        }
        for (const roomId in this.rooms) {
            saveData.roomExits[roomId] = { ...this.rooms[roomId].exits };
        }
        try {
            localStorage.setItem('kqvr_save', JSON.stringify(saveData));
            this.displayText("Game saved! The royal archivist nods approvingly.", '#FFFF55');
        } catch (e) {
            this.displayText("Save failed! A dragon sneezed on the memory.", '#FF5555');
        }
    }

    /** Restore game state from localStorage */
    load() {
        const raw = localStorage.getItem('kqvr_save');
        if (!raw) {
            this.displayText("No saved game found. Type SAVE to save first.", '#FF5555');
            return;
        }
        try {
            const data = JSON.parse(raw);
            this.currentRoom = data.currentRoom;
            this.inventory = data.inventory || [];
            Object.assign(this.gameState, data.gameState || {});
            for (const id in (data.objectLocations || {})) {
                if (this.objects[id]) this.objects[id].location = data.objectLocations[id];
            }
            for (const roomId in (data.roomExits || {})) {
                if (this.rooms[roomId]) Object.assign(this.rooms[roomId].exits, data.roomExits[roomId]);
            }
            this.displayText("Game loaded! The pudding awaits.", '#FFFF55');
            this.enterRoom(this.currentRoom);
        } catch (e) {
            this.displayText("Save data corrupted. The wizard sneezed on it.", '#FF5555');
        }
    }

    /** Sierra-style death: humorous text, then respawn in current room */
    die(message) {
        const quips = [
            "You have died. This is Sierra, after all.",
            "Your adventure ends here. Briefly.",
            "The kingdom mourns. Once they finish mourning the pudding.",
            "Death came for you quite... promptly.",
            "You are no longer among the living. Temporarily."
        ];
        this.displayText("\n\u2620  " + message, '#FF5555');
        this.displayText(quips[Math.floor(Math.random() * quips.length)], '#FF5555');
        this.displayText("\nThe wizard Ignatius sighs and casts a quick revival spell.", '#AAAAAA');
        this.displayText("'Not my fault this time,' he mutters.", '#AAAAAA');
        this.displayText("You wake up, slightly singed but alive.\n", '#AAAAAA');
        setTimeout(() => this.enterRoom(this.currentRoom), 1400);
    }

    /** Restart — reload page for simplicity */
    restart() {
        this.displayText("The wizard hiccups. The world resets...", '#AAAAAA');
        setTimeout(() => window.location.reload(), 800);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Command Parser
// ─────────────────────────────────────────────────────────────────────────────
class CommandParser {
    constructor(game) {
        this.game = game;
        this._confusedLines = [
            "I don't understand that. (Type HELP for commands)",
            "That verb isn't in this kingdom.",
            "Even the castle gargoyles look puzzled by that.",
            "The parser stares at you blankly.",
            "Try something like: EXAMINE FOUNTAIN or TAKE KEY",
            "Your lips moved but nothing game-mechanical happened.",
            "The wizard could parse that, but he's busy apologising.",
        ];
        this._confusedIdx = 0;
    }
    
    parse(input) {
        const words = input.toLowerCase().trim().split(/\s+/);
        const verb = words[0];
        const noun = words.slice(1).join(' ');
        let redraw = false;

        if (['n', 'north'].includes(verb))       { redraw = this.move('north');
        } else if (['s', 'south'].includes(verb)){ redraw = this.move('south');
        } else if (['e', 'east'].includes(verb)) { redraw = this.move('east');
        } else if (['w', 'west'].includes(verb)) { redraw = this.move('west');
        } else if (['u', 'up'].includes(verb))   { redraw = this.move('up');
        } else if (['d', 'down'].includes(verb)) { redraw = this.move('down');
        } else if (verb === 'go' && noun)        { redraw = this.move(noun);
        } else if (['get', 'take', 'pick', 'grab'].includes(verb))     { this.take(noun);
        } else if (['drop', 'leave', 'put'].includes(verb))             { this.drop(noun);
        } else if (['look', 'l'].includes(verb)) {
            if (noun) this.examine(noun);
            else      this.game.enterRoom(this.game.currentRoom);
        } else if (['examine', 'x', 'inspect', 'check'].includes(verb)){ this.examine(noun);
        } else if (['read', 'peruse', 'study', 'decipher'].includes(verb)){ this.examine(noun);
        } else if (['use', 'apply', 'activate'].includes(verb))         { this.use(noun);
        } else if (['open', 'unlock'].includes(verb))                   { this.open(noun);
        } else if (['inventory', 'i', 'inv', 'bag', 'items'].includes(verb)){ this.showInventory();
        } else if (['help', '?', 'commands'].includes(verb))            { this.showHelp();
        } else if (['talk', 'speak', 'ask', 'tell', 'chat'].includes(verb)){ this.talk(noun);
        } else if (verb === 'give')                                     { this.give(noun);
        } else if (['eat', 'drink', 'taste', 'lick'].includes(verb))   { this.eat(noun);
        } else if (['climb', 'scale', 'ascend'].includes(verb))        { this.climb(noun);
        } else if (['smell', 'sniff'].includes(verb))                   { this.smell(noun);
        } else if (['knock', 'tap', 'bang'].includes(verb))            { this.knock(noun);
        } else if (['push', 'press', 'shove'].includes(verb))          { this.push(noun);
        } else if (['pull', 'yank', 'drag'].includes(verb))            { this.pull(noun);
        } else if (['listen', 'hear', 'hark'].includes(verb))          { this.listen(noun);
        } else if (['throw', 'toss', 'hurl'].includes(verb))           { this.throwItem(noun);
        } else if (['wait', 'z', 'rest', 'pause'].includes(verb))      { this.wait();
        } else if (['sit', 'nap', 'sleep', 'lie'].includes(verb))      { this.sit(noun);
        } else if (['wave', 'greet', 'bow'].includes(verb))            { this.wave(noun);
        } else if (['save', 'savegame'].includes(verb))                { this.game.save();
        } else if (['load', 'loadgame', 'restore'].includes(verb))     { this.game.load();
        } else if (['restart', 'reset', 'newgame'].includes(verb))     { this.game.restart();
        } else { this.noVerb(); }

        return { redraw };
    }
    
    move(direction) {
        const room = this.game.rooms[this.game.currentRoom];
        const nextRoom = room.exits[direction];
        if (nextRoom) {
            if (room.exitConditions && room.exitConditions[direction]) {
                const condition = room.exitConditions[direction];
                if (!condition(this.game.gameState)) return false;
            }
            this.game.enterRoom(nextRoom);
            return true;
        } else {
            const blocked = [
                "You can't go that way.",
                "A solid wall disagrees with your travel plans.",
                "Nothing but stone in that direction.",
            ];
            this.game.displayText(blocked[Math.floor(Math.random() * blocked.length)]);
            return false;
        }
    }
    
    take(noun) {
        if (!noun) { this.game.displayText("Take what? The open air?"); return; }
        // Let the room intercept special take actions first
        const room = this.game.rooms[this.game.currentRoom];
        if (room.onAction && room.onAction(this.game, 'take', noun)) return;
        const objectId = this.findObject(noun, this.game.currentRoom);
        if (objectId) {
            const obj = this.game.objects[objectId];
            if (obj.takeable) {
                this.game.addToInventory(objectId);
                if (obj.onTake) obj.onTake(this.game);
            } else {
                this.game.displayText("You can't take that! (Believe me, you tried.)");
            }
        } else {
            const nope = ["You don't see that here.", "Nothing matching that is visible.", "You reach for it, but grasp only air."];
            this.game.displayText(nope[Math.floor(Math.random() * nope.length)]);
        }
    }
    
    drop(noun) {
        if (!noun) { this.game.displayText("Drop what?"); return; }
        const objectId = this.findObject(noun, 'inventory');
        if (objectId) {
            const obj = this.game.objects[objectId];
            obj.location = this.game.currentRoom;
            this.game.removeFromInventory(objectId);
            this.game.displayText("You drop the " + obj.name + ".");
        } else {
            this.game.displayText("You don't have that.");
        }
    }
    
    examine(noun) {
        if (!noun) { this.game.displayText("Examine what, exactly?"); return; }
        // Check inventory and room objects first
        const objectId = this.findObject(noun);
        if (objectId) {
            const obj = this.game.objects[objectId];
            this.game.displayText(obj.description);
            if (obj.onExamine) obj.onExamine(this.game);
            return;
        }
        // Check room's named examine targets
        const room = this.game.rooms[this.game.currentRoom];
        if (room.examineTargets) {
            const words = noun.toLowerCase().split(/\s+/);
            for (const [key, response] of Object.entries(room.examineTargets)) {
                const keys = key.toLowerCase().split(/[,|\s]+/).filter(Boolean);
                if (words.some(w => keys.some(k => k === w || k.startsWith(w) || w.startsWith(k)))) {
                    if (typeof response === 'function') response(this.game);
                    else this.game.displayText(response);
                    return;
                }
            }
        }
        // Room-level fallback
        if (room.onAction && room.onAction(this.game, 'examine', noun)) return;
        const dunno = [
            "You don't see anything special about that.",
            "Nothing remarkable there. Move along.",
            "You stare at it intently. It remains unremarkable.",
        ];
        this.game.displayText(dunno[Math.floor(Math.random() * dunno.length)]);
    }
    
    use(noun) {
        if (!noun) { this.game.displayText("Use what?"); return; }
        // Parse "use X on Y" pattern
        let itemNoun = noun, targetNoun = null;
        const onIdx = noun.indexOf(' on ');
        if (onIdx > -1) {
            itemNoun = noun.slice(0, onIdx).trim();
            targetNoun = noun.slice(onIdx + 4).trim();
        }
        const objectId = this.findObject(itemNoun, 'inventory') || this.findObject(itemNoun, this.game.currentRoom);
        if (objectId) {
            const obj = this.game.objects[objectId];
            if (obj.onUse) { obj.onUse(this.game, targetNoun); return; }
        }
        const room = this.game.rooms[this.game.currentRoom];
        if (room.onAction && room.onAction(this.game, 'use', itemNoun, targetNoun)) return;
        if (objectId) this.game.displayText("You're not sure how to use that here.");
        else this.game.displayText("You don't see that here.");
    }
    
    open(noun) {
        if (!noun) { this.game.displayText("Open what?"); return; }
        let target = noun, tool = null;
        const withIdx = noun.indexOf(' with '), usingIdx = noun.indexOf(' using ');
        if (withIdx > -1)  { target = noun.slice(0, withIdx).trim(); tool = noun.slice(withIdx + 6).trim(); }
        else if (usingIdx > -1) { target = noun.slice(0, usingIdx).trim(); tool = noun.slice(usingIdx + 7).trim(); }
        const room = this.game.rooms[this.game.currentRoom];
        if (room.onAction && room.onAction(this.game, 'open', target, tool)) return;
        this.game.displayText("You can't open that.");
    }

    talk(noun) {
        const room = this.game.rooms[this.game.currentRoom];
        if (room.onTalk) {
            room.onTalk(this.game, noun || '');
        } else {
            const lonely = ["There's nobody here to talk to.", "The walls don't respond. (You tried.)", "Hello? ... Only echoes reply."];
            this.game.displayText(lonely[Math.floor(Math.random() * lonely.length)]);
        }
    }

    give(noun) {
        const room = this.game.rooms[this.game.currentRoom];
        if (room.onGive) room.onGive(this.game, noun);
        else this.game.displayText("There's nobody here to give anything to.");
    }

    eat(noun) {
        if (!noun) { this.game.displayText("Eat what?"); return; }
        const eatFunny = [
            "That's not food! (Well, not for you anyway.)",
            "You resist the urge to eat that.",
            "Your stomach politely declines.",
            "The food critics of the kingdom would rate that: inedible.",
        ];
        this.game.displayText(eatFunny[Math.floor(Math.random() * eatFunny.length)]);
    }

    climb(noun) {
        if (!noun) { this.game.displayText("Climb what?"); return; }
        const room = this.game.rooms[this.game.currentRoom];
        if (room.onClimb) room.onClimb(this.game, noun);
        else this.game.displayText("You can't climb that. (You tried. Gravity won.)");
    }

    smell(noun) {
        const smells = {
            dragon: "Sulphur, smoke, and unwashed scales. Very pungent.",
            pudding: "OH. That smell. Butter, vanilla, and pure triumph. Must retrieve pudding IMMEDIATELY.",
            wizard: "Burnt parchment, exotic herbs, and a faint undercurrent of regret.",
            fountain: "Cold stone and clean water. Refreshingly boring.",
            gnome: "Earth, pipe smoke, and someone who has not bathed since the last riddle.",
            forest: "Rich loam, ancient wood, and something faintly magical.",
            cloud: "Vanilla! Wait — clouds smell like vanilla here? Magic is weird.",
            mushroom: "A curiously soporific aroma. Notes of sleeping draught and woodland damp.",
        };
        const key = Object.keys(smells).find(k => noun?.includes(k)) || '';
        this.game.displayText(smells[key] || "You take a deep whiff. Notes of adventure, stone dust, and something vaguely pudding-adjacent.");
    }

    knock(noun) {
        if (!noun) { this.game.displayText("Knock on what? Your own head?"); return; }
        const room = this.game.rooms[this.game.currentRoom];
        if (room.onAction && room.onAction(this.game, 'knock', noun)) return;
        this.game.displayText("You knock. Nothing answers. Probably for the best.");
    }

    push(noun) {
        if (!noun) { this.game.displayText("Push what?"); return; }
        const p = [`You push the ${noun}. It pushes back (philosophically).`, `The ${noun} wobbles slightly, then settles back.`, `Pushing it accomplishes nothing. (You note this for posterity.)`, `The universe remains indifferent.`];
        this.game.displayText(p[Math.floor(Math.random() * p.length)]);
    }

    pull(noun) {
        if (!noun) { this.game.displayText("Pull what?"); return; }
        const p = [`You pull on the ${noun}. Mild strain ensues.`, `The ${noun} resists. You don't insist.`, `You give it a firm tug. It remains smugly in place.`];
        this.game.displayText(p[Math.floor(Math.random() * p.length)]);
    }

    listen(noun) {
        const room = this.game.rooms[this.game.currentRoom];
        if (room.onAction && room.onAction(this.game, 'listen', noun)) return;
        const l = ["You listen carefully. Birds, distant wind, and your own heartbeat.", "The world hums with quiet mystery — or possibly just the fountain.", "You strain your ears. Not quite enough plot is happening to generate sound."];
        this.game.displayText(l[Math.floor(Math.random() * l.length)]);
    }

    throwItem(noun) {
        if (!noun) { this.game.displayText("Throw what?"); return; }
        const objId = this.findObject(noun, 'inventory');
        if (objId) {
            this.game.displayText(`You hurl the ${this.game.objects[objId].name} with gusto.`);
            this.game.displayText("It bounces off the wall and lands at your feet. Anticlimactic.");
        } else { this.game.displayText("You don't have that to throw."); }
    }

    wait() {
        const w = ["Time passes. Nothing happens. The pudding remains missed.", "You wait. A breeze stirs. The kingdom holds its breath.", "Five seconds of valuable adventure time: elapsed.", "You twirl your thumbs. Somewhere, a king grows hungrier."];
        this.game.displayText(w[Math.floor(Math.random() * w.length)]);
    }

    sit(noun) {
        if (this.game.currentRoom === 'throne_room') {
            this.game.displayText("You consider sitting on the King's throne.");
            this.game.displayText("The King drums his fingers. Very. Loudly. You wisely reconsider.");
        } else {
            const s = ["You sit down briefly, then remember you're on a quest.", "The ground is harder than it looks. You stand back up.", "You sit. Nothing in particular happens. You stand."];
            this.game.displayText(s[Math.floor(Math.random() * s.length)]);
        }
    }

    wave(noun) {
        if (!noun) { this.game.displayText("You wave at the air. The air does not wave back."); return; }
        this.game.displayText(`You wave at the ${noun}. They look mildly puzzled.`);
    }

    noVerb() {
        this.game.displayText(this._confusedLines[this._confusedIdx % this._confusedLines.length]);
        this._confusedIdx++;
    }

    findObject(noun, location = null) {
        if (!noun) return null;
        const lnoun = noun.toLowerCase();
        for (let objId in this.game.objects) {
            const obj = this.game.objects[objId];
            const nameMatch = obj.name.toLowerCase().includes(lnoun);
            const aliasMatch = obj.aliases?.some(a => a.toLowerCase().includes(lnoun));
            if (nameMatch || aliasMatch) {
                if (location === null || obj.location === location ||
                    (location === 'inventory' && this.game.hasObject(objId))) {
                    return objId;
                }
            }
        }
        return null;
    }

    showInventory() {
        if (this.game.inventory.length === 0) {
            this.game.displayText("You are empty-handed. (Just like your quest, so far.)");
        } else {
            this.game.displayText("You are carrying:");
            this.game.inventory.forEach(objId => {
                this.game.displayText("  \u25ba " + this.game.objects[objId].name);
            });
        }
    }

    showHelp() {
        this.game.displayText("\n\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557", '#00AAAA');
        this.game.displayText("\u2551       KING'S QUEST VR  \u2502 COMMANDS      \u2551", '#00AAAA');
        this.game.displayText("\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563", '#00AAAA');
        this.game.displayText("\u2551 Move: N S E W U D  (or full word)       \u2551", '#00AAAA');
        this.game.displayText("\u2551 LOOK [thing]   EXAMINE/X [thing]        \u2551", '#00AAAA');
        this.game.displayText("\u2551 TAKE [item]    DROP [item]               \u2551", '#00AAAA');
        this.game.displayText("\u2551 USE [item]     USE [item] ON [target]    \u2551", '#00AAAA');
        this.game.displayText("\u2551 OPEN [thing]   TALK [person]             \u2551", '#00AAAA');
        this.game.displayText("\u2551 GIVE [item]    INVENTORY / I             \u2551", '#00AAAA');
        this.game.displayText("\u2551 SMELL [thing]  LISTEN  WAIT/Z            \u2551", '#00AAAA');
        this.game.displayText("\u2551 SAVE           LOAD     RESTART          \u2551", '#00AAAA');
        this.game.displayText("\u2560\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2563", '#00AAAA');
        this.game.displayText("\u2551 VR: Trigger=Action  A=Inventory         \u2551", '#00AAAA');
        this.game.displayText("\u2551     Y=Examine        X=Use     B=Save   \u2551", '#00AAAA');
        this.game.displayText("\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d", '#00AAAA');
        this.game.displayText("TIP: Type EXAMINE things — clues are everywhere!", '#FFFF55');
        this.game.displayText("TIP: SAVE often! (Sierra games can be fatal.)\n", '#FFFF55');
    }
}
