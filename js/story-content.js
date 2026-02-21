// Story Content - Rooms, Objects, and Puzzles

// Seeded PRNG (Mulberry32) for deterministic scene rendering — prevents flicker on redraws.
function seededRand(seed) {
    let s = seed >>> 0;
    return function () {
        s += 0x6D2B79F5; s |= 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const STORY_CONTENT = {
    rooms: {
        castle_gate: {
            description: "You stand before the grand castle gate. The stone walls tower above you, and a worried-looking guard paces back and forth. To the NORTH is the castle courtyard. To the EAST is a forest path.",
            playerX: 320,
            playerY: 300,
            exits: {
                north: 'courtyard',
                east: 'forest_path'
            },
            examineTargets: {
                'gate,portcullis,door': "A heavy iron portcullis guards the entrance. The guard mentions it only opens with the royal golden key — which apparently got misplaced during the pudding crisis.",
                'guard,knight,soldier': "The guard is clearly agitated. He keeps muttering 'the pudding...the pudding...' and pacing. He looks like he hasn't slept since the incident.",
                'wall,stone,tower,battlement': "Thick grey stone walls, centuries old. Someone has scratched on a lower block: 'GUARD TIP: Check the COURTYARD for anything shiny.'",
                'notice,sign,board,post': "A royal notice: WANTED — One (1) Royal Pudding. Last seen departing wizard's tower in a magical flash. If found, return to the King. Reward: continued employment.",
                'path,east,forest': "The forest path heads east into the trees. A signpost reads: 'Forest Path → (Monsters: Occasionally). (Gnomes: Definitely).'",
            },
            draw: (gfx, state, game) => {
                // Sky with gradient
                gfx.fillGradient(0, 0, 640, 150, game.LIGHT_CYAN, game.LIGHT_BLUE);
                
                // Ground (cobblestone path)
                gfx.fillRect(0, 320, 640, 80, game.BROWN);
                
                // Grass on sides
                gfx.fillRect(0, 280, 180, 120, game.GREEN);
                gfx.fillRect(460, 280, 180, 120, game.GREEN);
                
                // Castle wall background (perspective)
                gfx.fillPolygon([
                    {x: 150, y: 80},
                    {x: 490, y: 80},
                    {x: 490, y: 320},
                    {x: 150, y: 320}
                ], game.LIGHT_GRAY);
                
                // Stone texture lines
                for (let i = 0; i < 8; i++) {
                    gfx.drawLine(150, 100 + i * 30, 490, 100 + i * 30, game.DARK_GRAY);
                }
                for (let i = 0; i < 12; i++) {
                    gfx.drawLine(170 + i * 30, 80, 170 + i * 30, 320, game.DARK_GRAY);
                }
                
                // Gate archway (with depth)
                gfx.fillPolygon([
                    {x: 270, y: 150},
                    {x: 370, y: 150},
                    {x: 370, y: 320},
                    {x: 270, y: 320}
                ], game.BLACK);
                
                // Arch top
                gfx.fillCircle(320, 150, 50, game.BLACK);
                gfx.fillRect(270, 100, 100, 50, game.LIGHT_GRAY);
                
                // Gate details (portcullis)
                for (let i = 0; i < 5; i++) {
                    gfx.drawLine(280 + i * 20, 180, 280 + i * 20, 320, game.BROWN);
                }
                for (let i = 0; i < 8; i++) {
                    gfx.drawLine(270, 180 + i * 18, 370, 180 + i * 18, game.BROWN);
                }
                
                // Towers on sides
                gfx.fillRect(120, 60, 50, 260, game.LIGHT_GRAY);
                gfx.fillRect(470, 60, 50, 260, game.LIGHT_GRAY);
                
                // Tower battlements
                for (let i = 0; i < 3; i++) {
                    gfx.fillRect(125 + i * 15, 50, 10, 15, game.LIGHT_GRAY);
                    gfx.fillRect(475 + i * 15, 50, 10, 15, game.LIGHT_GRAY);
                }
                
                // Tower windows
                gfx.fillRect(135, 100, 20, 25, game.DARK_GRAY);
                gfx.fillRect(135, 160, 20, 25, game.DARK_GRAY);
                gfx.fillRect(485, 100, 20, 25, game.DARK_GRAY);
                gfx.fillRect(485, 160, 20, 25, game.DARK_GRAY);
                
                // Guard — Sierra SCI-style armored knight
                // Halberd pole (behind guard)
                gfx.fillRect(168, 220, 3, 100, game.WOOD);
                gfx.drawLine(169, 220, 169, 319, game.BROWN);
                // Halberd blade
                gfx.fillPolygon([
                    {x: 164, y: 220},
                    {x: 169, y: 200},
                    {x: 174, y: 220}
                ], game.SILVER);
                gfx.fillRect(163, 222, 13, 4, game.SILVER);
                gfx.drawLine(169, 200, 169, 224, game.LIGHT_GRAY);
                // Boots
                gfx.fillRect(142, 311, 12, 8, game.DARK_BROWN);
                gfx.fillRect(154, 311, 12, 8, game.DARK_BROWN);
                gfx.drawLine(142, 318, 153, 318, game.BLACK);
                gfx.drawLine(154, 318, 165, 318, game.BLACK);
                // Greaves (plate leg armor)
                gfx.fillRect(143, 291, 10, 21, game.SILVER);
                gfx.fillRect(155, 291, 10, 21, game.SILVER);
                gfx.drawLine(148, 292, 148, 310, game.LIGHT_GRAY);
                gfx.drawLine(160, 292, 160, 310, game.LIGHT_GRAY);
                gfx.drawLine(143, 302, 152, 302, game.LIGHT_GRAY);
                gfx.drawLine(155, 302, 164, 302, game.LIGHT_GRAY);
                // Tabard / surcoat (red over armor)
                gfx.fillRect(142, 264, 24, 28, game.RED);
                gfx.drawLine(154, 265, 154, 291, game.DARK_GRAY);
                // Royal gold cross on tabard
                gfx.fillRect(151, 268, 6, 16, game.GOLD);
                gfx.fillRect(147, 273, 14, 5, game.GOLD);
                // Belt
                gfx.fillRect(142, 290, 24, 4, game.DARK_BROWN);
                gfx.fillRect(151, 288, 7, 8, game.GOLD);
                // Pauldrons (shoulder plates)
                gfx.fillRect(138, 263, 8, 7, game.SILVER);
                gfx.fillRect(163, 263, 8, 7, game.SILVER);
                gfx.drawLine(138, 263, 145, 263, game.LIGHT_GRAY);
                gfx.drawLine(163, 263, 170, 263, game.LIGHT_GRAY);
                // Left arm (shield arm)
                gfx.fillRect(131, 265, 12, 22, game.SILVER);
                gfx.drawLine(134, 265, 134, 286, game.LIGHT_GRAY);
                // Kite shield
                gfx.fillPolygon([
                    {x: 118, y: 267},
                    {x: 131, y: 264},
                    {x: 131, y: 291},
                    {x: 124, y: 298}
                ], game.RED);
                gfx.fillPolygon([
                    {x: 120, y: 269},
                    {x: 130, y: 266},
                    {x: 130, y: 289},
                    {x: 124, y: 295}
                ], game.YELLOW);
                gfx.drawLine(124, 265, 124, 296, game.RED);
                gfx.drawLine(118, 278, 131, 278, game.RED);
                gfx.drawLine(121, 268, 121, 294, game.DARK_GRAY);
                // Right gauntleted arm
                gfx.fillRect(166, 265, 11, 22, game.SILVER);
                gfx.drawLine(169, 265, 169, 286, game.LIGHT_GRAY);
                gfx.fillRect(168, 285, 8, 5, game.SILVER);
                // Breastplate central ridge
                gfx.fillRect(148, 263, 13, 6, game.SILVER);
                gfx.drawLine(154, 263, 154, 268, game.LIGHT_GRAY);
                // Helmet (great helm)
                gfx.fillRect(143, 244, 22, 20, game.SILVER);
                gfx.fillRect(145, 240, 18, 6, game.SILVER);
                gfx.fillRect(152, 237, 5, 5, game.SILVER);
                gfx.drawLine(145, 241, 145, 262, game.LIGHT_GRAY);
                gfx.drawLine(162, 241, 162, 262, game.LIGHT_GRAY);
                // Visor slit
                gfx.fillRect(147, 251, 14, 4, game.BLACK);
                // Face visible below visor
                gfx.fillRect(148, 255, 12, 8, game.SKIN);
                gfx.drawPixel(151, 257, game.BLACK);
                gfx.drawPixel(157, 257, game.BLACK);
                gfx.drawPixel(152, 256, game.WHITE);
                gfx.drawPixel(158, 256, game.WHITE);
                gfx.drawPixel(154, 259, game.DARK_BROWN);
                // Worried mouth (slight downward curve)
                gfx.drawLine(151, 261, 153, 262, game.DARK_BROWN);
                gfx.drawLine(153, 262, 156, 261, game.DARK_BROWN);
                // Cheek guards
                gfx.fillRect(143, 252, 5, 11, game.SILVER);
                gfx.fillRect(160, 252, 5, 11, game.SILVER);
                gfx.drawLine(143, 252, 147, 252, game.LIGHT_GRAY);
                // Helmet nose guard
                gfx.fillRect(152, 251, 4, 8, game.SILVER);
                // Red plume on helmet
                gfx.fillRect(153, 232, 3, 8, game.RED);
                gfx.fillRect(151, 229, 7, 5, game.RED);
                gfx.drawLine(152, 229, 158, 229, game.LIGHT_RED);
                
                // Bushes/shrubs
                gfx.fillCircle(80, 310, 25, game.GREEN);
                gfx.fillCircle(100, 315, 20, game.DARK_GRAY);
                gfx.fillCircle(560, 310, 25, game.GREEN);
                gfx.fillCircle(540, 315, 20, game.DARK_GRAY);
            },
            onTalk: (game, noun) => {
                if (noun && noun.includes('guard')) {
                    game.displayText("Guard: 'Blessed Saint Graham! You're here! The Royal Pudding has vanished!");
                    game.displayText("The King had us all standing at attention for six hours to explain ourselves.");
                    game.displayText("Six. HOURS. Without toilet breaks.");
                    game.displayText("Listen — check the COURTYARD near the FOUNTAIN. I saw something shiny.");
                    game.displayText("A gnome in the DEEP FOREST reportedly has something useful too. Just");
                    game.displayText("be prepared for a riddle. They always have a riddle.'\n");
                } else {
                    game.displayText("The guard waves you north. 'Check the COURTYARD, adventurer!");
                    game.displayText("Near the FOUNTAIN. There's something there. The King is EXTREMELY hungry.'\n");
                }
            }
        },
        
        courtyard: {
            description: "The castle courtyard is filled with concerned servants running about. The wizard's tower is to the WEST. The castle gate is to the SOUTH. The throne room is to the NORTH.",
            playerX: 320,
            playerY: 300,
            exits: {
                south: 'castle_gate',
                west: 'wizard_tower',
                north: 'throne_room'
            },
            examineTargets: {
                'fountain,water,coin': "The fountain sparkles. A coin winks at the bottom — tails side up, which reads: 'Heads: Find the golden key. Tails: Also find the golden key.' Not subtle.",
                'notice,bulletin,board,post': "STAFF BULLETIN: Wizard Ignatius has accidentally teleported the Royal Pudding AGAIN. This is the 7th incident this month. Previous victims: the royal scepter (found in hen-house, 847), and the king's left boot (still missing). Please remain calm.",
                'music box,box,chest,silver,planter,keyhole': (game) => {
                    if (game.gameState.musicBoxOpened) {
                        game.displayText("The silver music box lies open and empty near the fountain. Its job is done.");
                    } else {
                        game.displayText("A small silver music box half-buried in the courtyard planter near the fountain.");
                        game.displayText("It has an ornate keyhole and a royal crest etched on its lid.");
                        game.displayText("(You wonder if the GOLDEN KEY might fit that lock...)");
                    }
                },
                'tower,wizard,west': "The wizard's tower rises to the west. You can hear faint magical muttering and the sound of something being knocked off a shelf.",
                'servant,servants,staff': "The servants are running in panicked circles, wringing their hands. They clearly had only three days of 'pudding crisis response' training.",
            },
            onAction: (game, verb, noun, tool) => {
                if ((verb === 'open' || verb === 'use') &&
                    (noun?.includes('box') || noun?.includes('chest') || noun?.includes('music') || noun?.includes('lock'))) {
                    if (game.gameState.musicBoxOpened) {
                        game.displayText("The music box is already open. You've already collected the lullaby disc.");
                        return true;
                    }
                    const hasKey = game.hasObject('golden_key');
                    const toolIsKey = tool && (tool.includes('key') || tool.includes('golden'));
                    if (hasKey || toolIsKey) {
                        game.displayText("You insert the golden key into the music box keyhole.");
                        game.displayText("*CLICK* — it fits perfectly! The lid springs open with a gentle musical note!");
                        game.displayText("Inside, nestled on purple velvet, is a silver enchanted lullaby disc!");
                        game.displayText("A note reads: 'For emergencies involving sleeping dragons. Do NOT play near the King at bedtime. — I.'");
                        game.gameState.musicBoxOpened = true;
                        game.objects.lullaby_disc.location = 'courtyard';
                        game.addScore(15);
                    } else {
                        game.displayText("The music box has an ornate keyhole. It needs a key.");
                        game.displayText("(Perhaps a GOLDEN KEY would fit?)");
                    }
                    return true;
                }
                return false;
            },
            draw: (gfx, state, game) => {
                // Sky
                gfx.fillGradient(0, 0, 640, 140, game.LIGHT_CYAN, game.LIGHT_BLUE);
                
                // Castle walls surrounding courtyard
                gfx.fillRect(0, 140, 640, 40, game.LIGHT_GRAY);
                
                // Battlements along top
                for (let i = 0; i < 16; i++) {
                    if (i % 2 === 0) {
                        gfx.fillRect(i * 40, 130, 30, 15, game.LIGHT_GRAY);
                    }
                }
                
                // Cobblestone courtyard floor with perspective
                for (let row = 0; row < 8; row++) {
                    const y = 180 + row * 28;
                    const scale = 0.7 + (row * 0.05);
                    const width = Math.floor(35 * scale);
                    const count = Math.floor(640 / width);
                    
                    for (let col = 0; col < count; col++) {
                        const color = (row + col) % 2 === 0 ? game.LIGHT_GRAY : game.DARK_GRAY;
                        gfx.fillRect(col * width, y, width - 1, 27, color);
                    }
                }
                
                // Fountain in center
                // Base
                gfx.fillCircle(320, 260, 45, game.LIGHT_GRAY);
                gfx.fillCircle(320, 260, 40, game.DARK_GRAY);
                
                // Water basin
                gfx.fillCircle(320, 250, 35, game.CYAN);
                gfx.fillCircle(320, 248, 30, game.LIGHT_CYAN);
                
                // Fountain pedestal
                gfx.fillRect(310, 220, 20, 30, game.LIGHT_GRAY);
                
                // Water spray
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const x = 320 + Math.cos(angle) * 15;
                    const y = 230 + Math.sin(angle) * 8 - 10;
                    gfx.drawLine(320, 220, x, y, game.LIGHT_CYAN);
                }
                
                // Archways leading to other areas
                // North archway (to throne room)
                gfx.fillPolygon([
                    {x: 280, y: 160},
                    {x: 360, y: 160},
                    {x: 350, y: 180},
                    {x: 290, y: 180}
                ], game.BLACK);
                
                // West archway (to wizard tower)
                gfx.fillPolygon([
                    {x: 10, y: 200},
                    {x: 80, y: 200},
                    {x: 80, y: 280},
                    {x: 10, y: 280}
                ], game.BLACK);
                
                // Tower visible in corner
                gfx.fillRect(20, 150, 50, 50, game.MAGENTA);
                gfx.fillPolygon([
                    {x: 20, y: 150},
                    {x: 45, y: 130},
                    {x: 70, y: 150}
                ], game.MAGENTA);
                
                // Windows on walls
                for (let i = 0; i < 4; i++) {
                    gfx.fillRect(120 + i * 120, 150, 15, 20, game.DARK_GRAY);
                }
                
                // Concerned servants running about — Sierra SCI style
                const servants = [
                    { x: 160, y: 300, dir:  1, hair: game.BROWN,       tunic: game.BLUE  },
                    { x: 400, y: 270, dir: -1, hair: game.DARK_GRAY,   tunic: game.RED   },
                    { x: 520, y: 320, dir:  1, hair: game.GOLD,        tunic: game.BROWN },
                    { x: 250, y: 340, dir: -1, hair: game.SANDY,        tunic: game.GREEN },
                    { x:  80, y: 280, dir:  1, hair: game.BLACK,       tunic: game.CYAN  },
                ];
                const frameOffset = Math.floor(Date.now() / 300) % 4;
                for (let s = 0; s < servants.length; s++) {
                    const sv = servants[s];
                    const bob = (frameOffset + s) % 2 === 0 ? 0 : -1;
                    // Scale servants by depth (farther back = smaller)
                    const scale = 0.55 + (sv.y - 230) / 250;
                    const bH  = Math.floor(20 * scale);   // body height
                    const bW  = Math.floor(11 * scale);   // body width
                    const legH = Math.floor(10 * scale);  // leg height
                    const legW = Math.floor(4  * scale);
                    const headW = Math.floor(9  * scale);
                    const headH = Math.floor(8  * scale);
                    const neckH = Math.floor(3  * scale);
                    const footH = Math.floor(3  * scale);
                    const bx = sv.x - Math.floor(bW / 2);
                    const by = sv.y - bH + bob;

                    // Feet / shoes
                    const legStep = ((frameOffset + s) % 2 === 0) ? Math.floor(2 * scale) : 0;
                    gfx.fillRect(bx,              sv.y + legH + bob,        legW + 1, footH, game.DARK_BROWN);
                    gfx.fillRect(bx + bW - legW,  sv.y + legH + legStep + bob, legW + 1, footH, game.DARK_BROWN);
                    // Legs (stockings/trousers)
                    gfx.fillRect(bx,              sv.y + bob,        legW, legH, game.BROWN);
                    gfx.fillRect(bx + bW - legW,  sv.y + legStep + bob, legW, legH, game.BROWN);
                    // Tunic body
                    gfx.fillRect(bx, by, bW, bH, sv.tunic);
                    // Apron (white over-front)
                    gfx.fillRect(bx + Math.floor(bW * 0.15), by + Math.floor(bH * 0.1),
                                 Math.floor(bW * 0.7), Math.floor(bH * 0.8), game.WHITE);
                    gfx.drawLine(bx + Math.floor(bW * 0.15), by + Math.floor(bH * 0.1),
                                 bx + Math.floor(bW * 0.85), by + Math.floor(bH * 0.1), game.LIGHT_GRAY);
                    // Arms (reaching out — anxious pose)
                    const armY = by + Math.floor(bH * 0.2);
                    gfx.fillRect(bx - Math.floor(3 * scale), armY, Math.floor(3 * scale), Math.floor(8 * scale), sv.tunic);
                    gfx.fillRect(bx + bW,                    armY, Math.floor(3 * scale), Math.floor(8 * scale), sv.tunic);
                    // Hands
                    gfx.fillRect(bx - Math.floor(4 * scale), armY + Math.floor(7 * scale), Math.floor(4 * scale), Math.floor(3 * scale), game.SKIN);
                    gfx.fillRect(bx + bW,                    armY + Math.floor(7 * scale), Math.floor(4 * scale), Math.floor(3 * scale), game.SKIN);
                    // Neck
                    const nx = bx + Math.floor((bW - Math.floor(5 * scale)) / 2);
                    gfx.fillRect(nx, by - neckH + bob, Math.floor(5 * scale), neckH, game.SKIN);
                    // Head (skin-colored oval)
                    const hx = bx + Math.floor((bW - headW) / 2);
                    const hy = by - neckH - headH + bob;
                    gfx.fillRect(hx, hy, headW, headH, game.SKIN);
                    // Hair / cap
                    gfx.fillRect(hx, hy, headW, Math.floor(headH * 0.4), sv.hair);
                    // Eyes (2 dark pixels)
                    gfx.drawPixel(hx + Math.floor(headW * 0.25), hy + Math.floor(headH * 0.5), game.BLACK);
                    gfx.drawPixel(hx + Math.floor(headW * 0.72), hy + Math.floor(headH * 0.5), game.BLACK);
                    // Eye whites highlight
                    gfx.drawPixel(hx + Math.floor(headW * 0.25) + 1, hy + Math.floor(headH * 0.5) - 1, game.WHITE);
                    // Nose dot
                    gfx.drawPixel(hx + Math.floor(headW * 0.5), hy + Math.floor(headH * 0.65), game.DARK_BROWN);
                    // Worried mouth (small open "o")
                    gfx.drawPixel(hx + Math.floor(headW * 0.4), hy + Math.floor(headH * 0.82), game.DARK_BROWN);
                    gfx.drawPixel(hx + Math.floor(headW * 0.6), hy + Math.floor(headH * 0.82), game.DARK_BROWN);
                    gfx.drawLine(
                        hx + Math.floor(headW * 0.4), hy + Math.floor(headH * 0.82),
                        hx + Math.floor(headW * 0.6), hy + Math.floor(headH * 0.82),
                        game.DARK_BROWN);
                    // Head cap/bonnet outline
                    gfx.drawLine(hx, hy, hx + headW - 1, hy, game.BLACK);
                }

                // Golden Key (visible on courtyard ground if not yet taken)
                if (!game.inventory.includes('golden_key') && game.objects.golden_key && game.objects.golden_key.location === 'courtyard') {
                    const kx = 430, ky = 350;
                    // Key glow
                    gfx.fillCircleAlpha(kx, ky, 14, game.YELLOW, 0.35);
                    // Key ring (round loop at top)
                    gfx.fillCircle(kx, ky - 6, 7, game.GOLD);
                    gfx.fillCircle(kx, ky - 6, 5, game.DARK_BROWN);
                    gfx.fillCircle(kx, ky - 6, 4, game.YELLOW);
                    gfx.fillCircle(kx - 1, ky - 7, 2, game.WHITE);
                    // Key shaft
                    gfx.fillRect(kx - 2, ky, 5, 14, game.GOLD);
                    gfx.drawLine(kx, ky, kx, ky + 14, game.YELLOW);
                    gfx.drawLine(kx - 1, ky, kx - 1, ky + 13, game.DARK_GRAY);
                    // Key bit 1 (teeth)
                    gfx.fillRect(kx + 2, ky + 5, 5, 3, game.GOLD);
                    gfx.drawLine(kx + 2, ky + 5, kx + 6, ky + 5, game.YELLOW);
                    // Key bit 2
                    gfx.fillRect(kx + 2, ky + 10, 4, 3, game.GOLD);
                    gfx.drawLine(kx + 2, ky + 10, kx + 5, ky + 10, game.YELLOW);
                    // Crown emblem on ring
                    gfx.drawPixel(kx - 2, ky - 9, game.YELLOW);
                    gfx.drawPixel(kx,     ky - 10, game.YELLOW);
                    gfx.drawPixel(kx + 2, ky - 9,  game.YELLOW);
                }
            }
        },
        
        wizard_tower: {
            description: "You enter the wizard's tower. Mystical artifacts clutter every shelf, and there's a faint smell of burnt hair. The wizard Ignatius looks embarrassed. To the EAST is the courtyard.",
            playerX: 320,
            playerY: 300,
            exits: {
                east: 'courtyard'
            },
            examineTargets: {
                'bookshelf,shelf,shelves,books,book': "One book stands out: 'Forest Folk and Their Foibles'. Chapter 12: 'Gnomes adore riddles. Their favourite Classic Riddle has an answer that rhymes with MOUNTAINS and FOUNTAINS. They will not let anyone pass until it is answered correctly.'",
                'desk,table,bench': "The wizard's cluttered desk. Under a jar of pickled newt eyes you spy a note: 'TO DO: 1. Apologise to King about pudding. 2. Obtain magic bean. 3. Do NOT sneeze near spellbook again. 4. Apologise to King again (more sincerely).'",
                'potion,potions,bottle,bottles,vial': "Various coloured potions. One label reads: 'SLEEP ENHANCEMENT POTION: amplifies existing sleep states tenfold. Current batch: music-activated, stored on silver disc. Note: Extremely effective on reptiles.'",
                'spellbook,tome,book': "Ignatius's spellbook is open to 'SIMPLE CLEANING CANTRIPS'. Multiple paragraphs are crossed out and replaced with 'TELEPORTATION (EXPERIMENTAL — DO NOT USE NEAR FOOD)'. Mystery solved.",
                'orb,crystal,ball': "The crystal orb glows faintly. In its swirling depths you glimpse a dragon, deeply asleep on a heap of gold. And near it, on a white pedestal — something creamy, domed, and magnificent.",
                'candle,window,star,stars': "Enchanted candles burn pointing upward. Through the window: a billion stars. One of them winks at you. Probably the wizard's handiwork. Or possibly existential.",
            },
            draw: (gfx, state, game) => {
                // Purple/mystical atmosphere
                gfx.fillGradient(0, 0, 640, 200, game.MAGENTA, game.BLUE);
                
                // Stone floor
                gfx.fillRect(0, 280, 640, 120, game.DARK_GRAY);
                
                // Floor tiles
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 2; j++) {
                        if ((i + j) % 2 === 0) {
                            gfx.fillRect(i * 64, 280 + j * 60, 64, 60, game.LIGHT_GRAY);
                        }
                    }
                }
                
                // Curved stone walls (tower interior)
                gfx.fillPolygon([
                    {x: 0, y: 200},
                    {x: 100, y: 220},
                    {x: 100, y: 400},
                    {x: 0, y: 400}
                ], game.BROWN);
                
                gfx.fillPolygon([
                    {x: 640, y: 200},
                    {x: 540, y: 220},
                    {x: 540, y: 400},
                    {x: 640, y: 400}
                ], game.BROWN);
                
                // Shelves with potions and books
                // Left shelf
                gfx.fillRect(50, 200, 120, 8, game.BROWN);
                gfx.fillRect(50, 245, 120, 8, game.BROWN);
                
                // Potion bottles on shelf
                for (let i = 0; i < 5; i++) {
                    const colors = [game.RED, game.GREEN, game.BLUE, game.MAGENTA, game.CYAN];
                    const x = 60 + i * 22;
                    gfx.fillRect(x, 183, 8, 17, colors[i]);
                    gfx.fillRect(x + 2, 179, 4, 4, game.BROWN);
                }
                
                // Books on lower shelf
                for (let i = 0; i < 6; i++) {
                    const colors = [game.RED, game.BLUE, game.GREEN, game.BROWN, game.MAGENTA, game.CYAN];
                    gfx.fillRect(55 + i * 18, 230, 14, 15, colors[i]);
                    gfx.drawLine(55 + i * 18, 230, 55 + i * 18, 245, game.BLACK);
                }
                
                // Right shelf
                gfx.fillRect(470, 200, 120, 8, game.BROWN);
                gfx.fillRect(470, 245, 120, 8, game.BROWN);
                
                // Crystals and artifacts
                for (let i = 0; i < 4; i++) {
                    gfx.fillPolygon([
                        {x: 480 + i * 28, y: 200},
                        {x: 485 + i * 28, y: 185},
                        {x: 490 + i * 28, y: 200}
                    ], game.LIGHT_CYAN);
                }
                
                // Wizard's desk
                gfx.fillRect(220, 270, 100, 12, game.BROWN);
                gfx.fillRect(225, 282, 10, 18, game.BROWN);
                gfx.fillRect(310, 282, 10, 18, game.BROWN);
                
                // Spell book on desk
                gfx.fillRect(240, 258, 30, 12, game.RED);
                gfx.drawLine(255, 258, 255, 270, game.YELLOW);
                
                // Candles
                gfx.fillRect(280, 263, 4, 10, game.WHITE);
                gfx.fillPolygon([
                    {x: 282, y: 260},
                    {x: 280, y: 263},
                    {x: 284, y: 263}
                ], game.YELLOW);
                
                // Wizard Ignatius — Sierra SCI-style detailed character
                const wizX = 180;
                const wizY = 260;

                // Staff (behind robe)
                gfx.fillRect(wizX - 23, wizY - 36, 3, 66, game.WOOD);
                gfx.drawLine(wizX - 22, wizY - 36, wizX - 22, wizY + 30, game.BROWN);
                // Staff orb
                gfx.fillCircle(wizX - 22, wizY - 40, 8, game.CYAN);
                gfx.fillCircle(wizX - 22, wizY - 40, 6, game.LIGHT_CYAN);
                gfx.fillCircle(wizX - 20, wizY - 43, 3, game.WHITE);
                gfx.fillCircle(wizX - 22, wizY - 40, 2, game.CYAN);
                // Staff cross-guard
                gfx.fillRect(wizX - 27, wizY - 33, 10, 3, game.GOLD);

                // Robe (wider, more flared at base — classic old wizard shape)
                gfx.fillPolygon([
                    {x: wizX - 13, y: wizY - 18},
                    {x: wizX + 13, y: wizY - 18},
                    {x: wizX + 20, y: wizY + 28},
                    {x: wizX - 20, y: wizY + 28}
                ], game.INDIGO);
                // Robe highlight/fold lines
                gfx.drawLine(wizX - 2, wizY - 17, wizX - 5, wizY + 27, game.BLUE);
                gfx.drawLine(wizX + 4, wizY - 17, wizX + 8, wizY + 27, game.BLUE);
                // Robe collar (lighter trim)
                gfx.fillRect(wizX - 7, wizY - 18, 14, 5, game.MAGENTA);
                gfx.drawLine(wizX - 7, wizY - 18, wizX + 6, wizY - 18, game.LIGHT_MAGENTA);
                // Robe hem trim
                gfx.drawLine(wizX - 20, wizY + 27, wizX + 20, wizY + 27, game.MAGENTA);
                gfx.drawLine(wizX - 19, wizY + 26, wizX + 19, wizY + 26, game.LIGHT_MAGENTA);

                // Stars on robe (proper 4-point shapes)
                // Star 1 (left mid)
                gfx.drawPixel(wizX - 8, wizY - 6, game.YELLOW);
                gfx.drawPixel(wizX - 9, wizY - 5, game.YELLOW);
                gfx.drawPixel(wizX - 7, wizY - 5, game.YELLOW);
                gfx.drawPixel(wizX - 8, wizY - 4, game.YELLOW);
                // Star 2 (right lower)
                gfx.drawPixel(wizX + 7, wizY + 2, game.GOLD);
                gfx.drawPixel(wizX + 8, wizY + 1, game.GOLD);
                gfx.drawPixel(wizX + 6, wizY + 1, game.GOLD);
                gfx.drawPixel(wizX + 7, wizY + 3, game.GOLD);
                // Star 3 (lower center)
                gfx.drawPixel(wizX - 3, wizY + 12, game.YELLOW);
                gfx.drawPixel(wizX - 4, wizY + 11, game.YELLOW);
                gfx.drawPixel(wizX - 2, wizY + 11, game.YELLOW);
                gfx.drawPixel(wizX - 3, wizY + 13, game.YELLOW);
                // Crescent moon (right upper robe)
                gfx.drawPixel(wizX + 9, wizY - 10, game.YELLOW);
                gfx.drawPixel(wizX + 10, wizY - 11, game.YELLOW);
                gfx.drawPixel(wizX + 11, wizY - 11, game.YELLOW);
                gfx.drawPixel(wizX + 10, wizY - 9,  game.YELLOW);
                gfx.drawPixel(wizX + 9,  wizY - 8,  game.YELLOW);

                // Sleeves (wide, bell-shaped)
                gfx.fillPolygon([
                    {x: wizX - 13, y: wizY - 15},
                    {x: wizX - 23, y: wizY - 5},
                    {x: wizX - 25, y: wizY + 12},
                    {x: wizX - 14, y: wizY + 8}
                ], game.INDIGO);
                gfx.fillPolygon([
                    {x: wizX + 13, y: wizY - 15},
                    {x: wizX + 23, y: wizY - 5},
                    {x: wizX + 25, y: wizY + 12},
                    {x: wizX + 14, y: wizY + 8}
                ], game.INDIGO);
                gfx.drawLine(wizX - 13, wizY - 15, wizX - 25, wizY + 12, game.BLUE);
                gfx.drawLine(wizX + 13, wizY - 15, wizX + 25, wizY + 12, game.BLUE);
                // Hands (wrinkled old hands)
                gfx.fillRect(wizX - 27, wizY + 10, 6, 5, game.SKIN);
                gfx.drawPixel(wizX - 27, wizY + 9,  game.SKIN);
                gfx.drawPixel(wizX - 25, wizY + 9,  game.SKIN);
                gfx.drawPixel(wizX - 23, wizY + 9,  game.SKIN);
                gfx.fillRect(wizX + 22, wizY + 10, 6, 5, game.SKIN);
                gfx.drawPixel(wizX + 22, wizY + 9,  game.SKIN);
                gfx.drawPixel(wizX + 24, wizY + 9,  game.SKIN);
                gfx.drawPixel(wizX + 27, wizY + 9,  game.SKIN);

                // Neck
                gfx.fillRect(wizX - 4, wizY - 22, 8, 4, game.SKIN);

                // Long flowing beard (pointed, Sierra-style)
                gfx.fillPolygon([
                    {x: wizX - 9,  y: wizY - 22},
                    {x: wizX + 9,  y: wizY - 22},
                    {x: wizX + 7,  y: wizY - 2},
                    {x: wizX + 3,  y: wizY + 6},
                    {x: wizX,      y: wizY + 14},
                    {x: wizX - 3,  y: wizY + 6},
                    {x: wizX - 7,  y: wizY - 2}
                ], game.WHITE);
                // Beard hair strands
                for (let i = 0; i < 7; i++) {
                    gfx.drawLine(wizX - 7 + i * 2, wizY - 21, wizX - 5 + i * 2, wizY + 4, game.LIGHT_GRAY);
                }
                // Beard highlight
                gfx.drawLine(wizX - 1, wizY - 21, wizX + 1, wizY + 12, game.WHITE);
                // Moustache
                gfx.fillRect(wizX - 8, wizY - 22, 16, 3, game.WHITE);
                gfx.drawLine(wizX - 8, wizY - 22, wizX - 2, wizY - 25, game.WHITE);
                gfx.drawLine(wizX + 8, wizY - 22, wizX + 2, wizY - 25, game.WHITE);

                // Head (old, wrinkled face)
                gfx.fillRect(wizX - 8, wizY - 36, 16, 16, game.SKIN);
                gfx.fillRect(wizX - 7, wizY - 38, 14, 4, game.SKIN);
                // Cheeks (rosy)
                gfx.drawPixel(wizX - 7, wizY - 25, game.PINK);
                gfx.drawPixel(wizX + 7, wizY - 25, game.PINK);
                // Eyebrows (bushy white, raised in alarm)
                gfx.drawLine(wizX - 8, wizY - 34, wizX - 4, wizY - 36, game.WHITE);
                gfx.drawLine(wizX + 3, wizY - 36, wizX + 8, wizY - 34, game.WHITE);
                gfx.drawLine(wizX - 8, wizY - 33, wizX - 4, wizY - 35, game.LIGHT_GRAY);
                gfx.drawLine(wizX + 3, wizY - 35, wizX + 8, wizY - 33, game.LIGHT_GRAY);
                // Eyes (wide, startled look)
                gfx.fillRect(wizX - 7, wizY - 32, 4, 4, game.WHITE);
                gfx.fillRect(wizX + 3, wizY - 32, 4, 4, game.WHITE);
                gfx.drawPixel(wizX - 6, wizY - 31, game.BLACK);
                gfx.drawPixel(wizX + 5, wizY - 31, game.BLACK);
                gfx.drawPixel(wizX - 5, wizY - 32, game.WHITE);
                gfx.drawPixel(wizX + 6, wizY - 32, game.WHITE);
                // Nose
                gfx.fillPolygon([
                    {x: wizX - 2, y: wizY - 28},
                    {x: wizX + 2, y: wizY - 28},
                    {x: wizX + 3, y: wizY - 25},
                    {x: wizX - 3, y: wizY - 25}
                ], game.PERU);
                // Mouth open (embarrassed / caught)
                gfx.fillRect(wizX - 4, wizY - 24, 8, 3, game.DARK_BROWN);
                gfx.fillRect(wizX - 3, wizY - 23, 6, 2, game.BLACK);
                gfx.drawLine(wizX - 4, wizY - 24, wizX + 3, wizY - 24, game.BROWN);
                // Ear
                gfx.fillRect(wizX - 10, wizY - 34, 3, 7, game.SKIN);
                gfx.fillRect(wizX + 8,  wizY - 34, 3, 7, game.SKIN);
                // Wrinkle lines
                gfx.drawLine(wizX - 6, wizY - 27, wizX - 4, wizY - 26, game.DARK_BROWN);
                gfx.drawLine(wizX + 4, wizY - 27, wizX + 6, wizY - 26, game.DARK_BROWN);
                // Forehead worry lines
                gfx.drawLine(wizX - 4, wizY - 36, wizX + 4, wizY - 36, game.DARK_BROWN);

                // Wizard hat (tall, slightly lopsided — he's flustered)
                gfx.fillPolygon([
                    {x: wizX - 16, y: wizY - 38},
                    {x: wizX - 8,  y: wizY - 72},
                    {x: wizX + 4,  y: wizY - 38}
                ], game.MAGENTA);
                // Hat highlight
                gfx.drawLine(wizX - 14, wizY - 38, wizX - 7, wizY - 70, game.ORCHID);
                // Hat star decoration
                gfx.drawPixel(wizX - 8,  wizY - 60, game.YELLOW);
                gfx.drawPixel(wizX - 9,  wizY - 59, game.YELLOW);
                gfx.drawPixel(wizX - 7,  wizY - 59, game.YELLOW);
                gfx.drawPixel(wizX - 8,  wizY - 58, game.YELLOW);
                gfx.drawPixel(wizX - 8,  wizY - 57, game.YELLOW);
                // Hat brim (wide)
                gfx.fillRect(wizX - 19, wizY - 38, 26, 4, game.MAGENTA);
                gfx.drawLine(wizX - 19, wizY - 38, wizX + 6, wizY - 38, game.ORCHID);
                gfx.drawLine(wizX - 19, wizY - 35, wizX + 6, wizY - 35, game.DARK_GRAY);
                // Hat band
                gfx.fillRect(wizX - 16, wizY - 42, 20, 4, game.VIOLET);

                // Magic sparkles if wizard is happy
                if (state.wizardHappy) {
                    for (let i = 0; i < 8; i++) {
                        const angle = (i / 8) * Math.PI * 2;
                        const px = wizX - 22 + Math.cos(angle) * 12;
                        const py = wizY - 40 + Math.sin(angle) * 12;
                        gfx.drawPixel(px, py, i % 2 === 0 ? game.YELLOW : game.LIGHT_CYAN);
                        gfx.drawPixel(px + 1, py, i % 2 === 0 ? game.GOLD : game.CYAN);
                    }
                    // Extra glow on orb
                    gfx.fillCircleAlpha(wizX - 22, wizY - 40, 12, game.LIGHT_CYAN, 0.35);
                }
                
                // Window showing starry sky
                gfx.fillRect(360, 140, 60, 70, game.BLACK);
                // Stars (fixed positions — avoids flicker on redraw)
                const _wStars = [[6,8],[18,14],[32,5],[44,20],[9,35],[21,27],[38,42],[50,16],[12,50],[28,38],[42,8],[4,24]];
                for (const [sx, sy] of _wStars) gfx.drawPixel(365 + sx, 145 + sy, game.WHITE);
            },
            onTalk: (game, noun) => {
                if (noun && (noun.includes('wizard') || noun.includes('ignatius'))) {
                    if (!game.gameState.wizardHappy) {
                        game.displayText("Wizard Ignatius: 'Oh saints preserve us! I was attempting a CLEANING SPELL.");
                        game.displayText("I sneezed mid-incantation — just slightly — and the pudding WHOOSHED.");
                        game.displayText("I believe it materialized on Dragon Mountain. Which is quite far.");
                        game.displayText("I am deeply, deeply sorry. If you bring me a MAGIC BEAN,");
                        game.displayText("I can prepare something to help you deal with the dragon safely.'");
                    } else if (!game.gameState.beanstalkGrown) {
                        game.displayText("Wizard: 'The bean is fully imbued! Plant it in the FOREST CLEARING");
                        game.displayText("and it should grow to magnificent heights. Cloud-height, specifically.'");
                    } else {
                        game.displayText("Wizard: 'You've done it! The beanstalk is tremendous!");
                        game.displayText("Once you're in the dragon's lair, USE the lullaby disc to deepen");
                        game.displayText("the dragon's sleep, THEN take the pudding. Do NOT skip that step.'");
                        game.displayText("*The wizard looks pointedly meaningful.*");
                    }
                } else {
                    game.displayText("Wizard Ignatius fidgets nervously with his wand.");
                    game.displayText("'I'm sorry about the pudding. Very, very sorry.'");
                }
            },
            onGive: (game, noun) => {
                if (noun && noun.includes('bean') && game.hasObject('magic_bean')) {
                    game.displayText("Wizard: 'Ah! A magic bean! Excellent! Plant this in the");
                    game.displayText("forest clearing and it will grow to the clouds!'");
                    game.displayText("\nThe wizard waves his wand and the bean GLOWS with power!");
                    game.gameState.wizardHappy = true;
                    game.gameState.hasMagicBean = true;
                    game.addScore(20);
                } else {
                    game.displayText("The wizard doesn't want that.");
                }
            }
        },
        
        throne_room: {
            description: "The opulent throne room. The King sits on his throne, looking extremely grumpy and pudding-deprived. A large tapestry hangs on the wall. The courtyard is to the SOUTH.",
            playerX: 320,
            playerY: 320,
            exits: {
                south: 'courtyard'
            },
            examineTargets: {
                'tapestry,banner,hanging': "The tapestry depicts a famous dragon-slaying from the Third Age. Someone has added a small annotation in red ink: 'Note: Dragon weakness = soporific music. Amplifier: magic lullaby disc. See music box, courtyard.'",
                'throne': "The magnificent golden throne. Its cushion bears an embroidered tag: 'ONE SIZE FITS ALL KINGS (even grumpy ones)'. The King fills it completely and is currently doing finger-drum solos on the armrests.",
                'king,crown,monarch': "The King's face has attained a shade of red previously uncharted on the colour wheel. He appears to be composing a detailed mental list of people who have failed him. You suspect you're on it.",
                'notice,decree,scroll,pillar': "A royal decree: 'EDICT #4471: The servant responsible for the pudding incident will polish the throne room floor daily for ONE YEAR. Number of pudding-related edicts this month: 7. Current record: 7.'",
                'floor,marble,tile': "The polished marble floor gleams. You slip slightly trying to look down to examine it. Your dignity takes 1 point of damage.",
                'pillar,column,arch': "Stone pillars line the hall. Scratched into a lower one, in what looks like emergency handwriting: 'GUARD SECRET: The music box in the courtyard planter contains the key to solving the pudding crisis. — Well-meaning anonymous.'",
            },
            draw: (gfx, state, game) => {
                // Grand ceiling
                gfx.fillGradient(0, 0, 640, 150, game.RED, game.MAGENTA);
                
                // Stone walls
                gfx.fillRect(0, 150, 640, 250, game.BROWN);
                
                // Wall pillars
                for (let i = 0; i < 5; i++) {
                    gfx.fillRect(30 + i * 140, 150, 30, 250, game.LIGHT_GRAY);
                    // Pillar tops
                    gfx.fillRect(25 + i * 140, 145, 40, 10, game.LIGHT_GRAY);
                }
                
                // Floor (polished marble)
                gfx.fillGradient(0, 320, 640, 80, game.MAGENTA, game.BLUE);
                
                // Red carpet with perspective
                gfx.fillPolygon([
                    {x: 280, y: 380},
                    {x: 360, y: 380},
                    {x: 340, y: 220},
                    {x: 300, y: 220}
                ], game.RED);
                
                // Carpet border pattern
                for (let i = 0; i < 10; i++) {
                    const y = 230 + i * 16;
                    gfx.fillRect(303, y, 5, 5, game.YELLOW);
                    gfx.fillRect(332, y, 5, 5, game.YELLOW);
                }
                
                // Throne platform
                gfx.fillRect(280, 190, 80, 12, game.YELLOW);
                gfx.fillRect(285, 202, 70, 10, game.BROWN);
                
                // Throne back (drawn BEFORE king so it appears behind him)
                gfx.fillPolygon([
                    {x: 298, y: 170},
                    {x: 342, y: 170},
                    {x: 338, y: 130},
                    {x: 302, y: 130}
                ], game.YELLOW);
                gfx.drawLine(298, 170, 302, 130, game.GOLD);
                gfx.drawLine(342, 170, 338, 130, game.GOLD);
                gfx.drawLine(302, 130, 338, 130, game.GOLD);
                
                // Throne back decorations
                gfx.fillCircle(310, 140, 8, game.RED);
                gfx.fillCircle(330, 140, 8, game.RED);
                gfx.drawPixel(309, 138, game.WHITE);
                gfx.drawPixel(329, 138, game.WHITE);
                
                // Torches on side walls only — drawn BEFORE king to avoid overlap
                for (let i = 0; i < 2; i++) {
                    const x = 120 + i * 400; // x=120 left wall, x=520 right wall
                    gfx.fillRect(x, 180, 6, 20, game.BROWN);
                    gfx.fillPolygon([
                        {x: x + 3, y: 175},
                        {x: x,     y: 180},
                        {x: x + 6, y: 180}
                    ], game.YELLOW);
                    gfx.drawPixel(x + 2, 172, game.RED);
                    gfx.fillCircleAlpha(x + 3, 177, 5, game.YELLOW, 0.35);
                }
                
                // King — Sierra SCI-style detail (sitting on throne)
                const kingX = 320;
                const kingY = 170;

                // Scepter in right hand
                gfx.fillRect(kingX + 14, kingY - 15, 3, 30, game.GOLD);
                gfx.drawLine(kingX + 15, kingY - 15, kingX + 15, kingY + 14, game.YELLOW);
                gfx.fillCircle(kingX + 15, kingY - 18, 6, game.RED);
                gfx.fillCircle(kingX + 15, kingY - 18, 4, game.LIGHT_RED);
                gfx.drawPixel(kingX + 14, kingY - 20, game.WHITE);
                gfx.fillRect(kingX + 11, kingY - 10, 9, 3, game.GOLD);

                // Grand robe (deep red/purple with folds)
                gfx.fillPolygon([
                    {x: kingX - 16, y: kingY - 8},
                    {x: kingX + 16, y: kingY - 8},
                    {x: kingX + 20, y: kingY + 22},
                    {x: kingX - 20, y: kingY + 22}
                ], game.MAGENTA);
                // Robe folds/shading
                gfx.drawLine(kingX - 4, kingY - 7, kingX - 6, kingY + 21, game.PURPLE);
                gfx.drawLine(kingX + 4, kingY - 7, kingX + 6, kingY + 21, game.PURPLE);
                gfx.drawLine(kingX,     kingY - 7, kingX,     kingY + 21, game.PURPLE);
                // Chest gem/brooch
                gfx.fillCircle(kingX, kingY - 2, 4, game.CYAN);
                gfx.fillCircle(kingX, kingY - 2, 2, game.LIGHT_CYAN);
                gfx.drawPixel(kingX - 1, kingY - 3, game.WHITE);
                // Ermine trim (bottom of robe)
                for (let i = 0; i < 9; i++) {
                    gfx.fillCircle(kingX - 18 + i * 5, kingY + 21, 3, game.WHITE);
                    gfx.drawPixel(kingX - 18 + i * 5, kingY + 21, game.BLACK);
                }
                // Ermine trim (collar)
                gfx.fillRect(kingX - 12, kingY - 9, 24, 5, game.WHITE);
                for (let i = 0; i < 5; i++) {
                    gfx.drawPixel(kingX - 10 + i * 5, kingY - 8, game.BLACK);
                }
                gfx.drawLine(kingX - 12, kingY - 9, kingX + 11, kingY - 9, game.LIGHT_GRAY);

                // Arms on armrests
                gfx.fillRect(kingX - 22, kingY + 1, 11, 14, game.MAGENTA);
                gfx.fillRect(kingX + 11, kingY + 1, 11, 14, game.MAGENTA);
                gfx.drawLine(kingX - 22, kingY + 1, kingX - 12, kingY + 1, game.ORCHID);
                // Royal gauntlet cuffs
                gfx.fillRect(kingX - 22, kingY + 12, 11, 4, game.GOLD);
                gfx.fillRect(kingX + 11, kingY + 12, 11, 4, game.GOLD);
                // Hands on armrests
                gfx.fillRect(kingX - 22, kingY + 14, 10, 6, game.SKIN);
                gfx.fillRect(kingX + 12, kingY + 14, 10, 6, game.SKIN);
                // Drumming fingers (impatient king)
                for (let i = 0; i < 4; i++) {
                    gfx.drawPixel(kingX - 21 + i * 3, kingY + 13, game.SKIN);
                    gfx.drawPixel(kingX + 12 + i * 3, kingY + 13, game.SKIN);
                }

                // Neck
                gfx.fillRect(kingX - 5, kingY - 14, 10, 6, game.SKIN);

                // Long grey beard (royal beard — pointed with two tines)
                gfx.fillPolygon([
                    {x: kingX - 10, y: kingY - 13},
                    {x: kingX + 10, y: kingY - 13},
                    {x: kingX + 8,  y: kingY + 2},
                    {x: kingX + 5,  y: kingY + 10},
                    {x: kingX + 3,  y: kingY + 3},
                    {x: kingX,      y: kingY + 12},
                    {x: kingX - 3,  y: kingY + 3},
                    {x: kingX - 5,  y: kingY + 10},
                    {x: kingX - 8,  y: kingY + 2}
                ], game.WHITE);
                // Beard hair lines
                for (let i = 0; i < 6; i++) {
                    gfx.drawLine(kingX - 8 + i * 3, kingY - 12, kingX - 7 + i * 3, kingY + 5, game.LIGHT_GRAY);
                }
                // Moustache
                gfx.fillRect(kingX - 9, kingY - 15, 18, 4, game.WHITE);
                gfx.drawLine(kingX - 9, kingY - 15, kingX - 2, kingY - 18, game.WHITE);
                gfx.drawLine(kingX + 9, kingY - 15, kingX + 2, kingY - 18, game.WHITE);
                gfx.drawLine(kingX - 9, kingY - 12, kingX - 2, kingY - 14, game.LIGHT_GRAY);

                // Head (round, regal)
                gfx.fillRect(kingX - 9, kingY - 28, 18, 16, game.SKIN);
                gfx.fillRect(kingX - 8, kingY - 30, 16, 4, game.SKIN);
                // Cheeks (flushed — pudding-deprived rage)
                gfx.drawPixel(kingX - 8, kingY - 17, game.PINK);
                gfx.drawPixel(kingX + 8, kingY - 17, game.PINK);
                // Grumpy furrowed eyebrows
                gfx.drawLine(kingX - 9, kingY - 26, kingX - 4, kingY - 28, game.DARK_BROWN);
                gfx.drawLine(kingX + 4, kingY - 28, kingX + 9, kingY - 26, game.DARK_BROWN);
                gfx.drawLine(kingX - 9, kingY - 25, kingX - 4, kingY - 27, game.BLACK);
                gfx.drawLine(kingX + 4, kingY - 27, kingX + 9, kingY - 25, game.BLACK);
                // Eyes (squinting, grumpy)
                gfx.fillRect(kingX - 8, kingY - 25, 4, 3, game.WHITE);
                gfx.fillRect(kingX + 4, kingY - 25, 4, 3, game.WHITE);
                gfx.drawPixel(kingX - 6, kingY - 24, game.BLACK);
                gfx.drawPixel(kingX + 6, kingY - 24, game.BLACK);
                gfx.drawLine(kingX - 8, kingY - 23, kingX - 5, kingY - 23, game.DARK_BROWN);
                gfx.drawLine(kingX + 4, kingY - 23, kingX + 7, kingY - 23, game.DARK_BROWN);
                // Nose (prominent royal nose)
                gfx.fillPolygon([
                    {x: kingX - 3, y: kingY - 22},
                    {x: kingX + 3, y: kingY - 22},
                    {x: kingX + 4, y: kingY - 18},
                    {x: kingX - 4, y: kingY - 18}
                ], game.PERU);
                gfx.drawPixel(kingX - 3, kingY - 18, game.DARK_BROWN);
                gfx.drawPixel(kingX + 3, kingY - 18, game.DARK_BROWN);
                // Grumpy downturned mouth
                gfx.drawLine(kingX - 4, kingY - 16, kingX - 2, kingY - 15, game.DARK_BROWN);
                gfx.drawLine(kingX - 2, kingY - 15, kingX + 2, kingY - 15, game.DARK_BROWN);
                gfx.drawLine(kingX + 2, kingY - 15, kingX + 4, kingY - 16, game.DARK_BROWN);
                // Jowls
                gfx.drawLine(kingX - 9, kingY - 18, kingX - 9, kingY - 14, game.PERU);
                gfx.drawLine(kingX + 9, kingY - 18, kingX + 9, kingY - 14, game.PERU);
                // Ears
                gfx.fillRect(kingX - 12, kingY - 27, 4, 9, game.SKIN);
                gfx.fillRect(kingX + 9,  kingY - 27, 4, 9, game.SKIN);

                // Crown (ornate — 5 points, gemstones)
                gfx.fillRect(kingX - 13, kingY - 31, 26, 6, game.GOLD);
                gfx.drawLine(kingX - 13, kingY - 31, kingX + 12, kingY - 31, game.YELLOW);
                gfx.drawLine(kingX - 13, kingY - 25, kingX + 12, kingY - 25, game.DARK_GRAY);
                // Five crown points
                for (let i = 0; i < 5; i++) {
                    const cx = kingX - 12 + i * 6;
                    gfx.fillPolygon([
                        {x: cx,     y: kingY - 31},
                        {x: cx + 3, y: kingY - 40},
                        {x: cx + 6, y: kingY - 31}
                    ], game.GOLD);
                    gfx.drawLine(cx, kingY - 31, cx + 3, kingY - 40, game.YELLOW);
                    gfx.drawLine(cx + 3, kingY - 40, cx + 6, kingY - 31, game.DARK_GRAY);
                }
                // Crown jewels (alternating ruby/sapphire/emerald)
                const gemColors = [game.RED, game.LIGHT_BLUE, game.LIGHT_GREEN, game.RED, game.CYAN];
                for (let i = 0; i < 5; i++) {
                    gfx.fillCircle(kingX - 11 + i * 6, kingY - 28, 3, gemColors[i]);
                    gfx.drawPixel(kingX - 12 + i * 6, kingY - 30, game.WHITE);
                }
                // Crown band engraving
                gfx.drawLine(kingX - 13, kingY - 28, kingX + 12, kingY - 28, game.DARK_GRAY);
                
                // Throne seat drawn AFTER king — overlaps lower robe to show he is seated
                gfx.fillRect(298, 173, 44, 18, game.YELLOW);
                gfx.drawLine(298, 173, 341, 173, game.GOLD);
                gfx.drawLine(298, 190, 341, 190, game.DARK_GRAY);
                gfx.drawLine(298, 173, 298, 190, game.GOLD);
                gfx.drawLine(341, 173, 341, 190, game.DARK_GRAY);
                // Throne armrests drawn AFTER king — frames his arms as resting on them
                gfx.fillRect(291, 174, 9, 16, game.YELLOW);
                gfx.fillRect(340, 174, 9, 16, game.YELLOW);
                gfx.drawLine(291, 174, 299, 174, game.GOLD);
                gfx.drawLine(340, 174, 348, 174, game.GOLD);
                gfx.drawLine(291, 189, 299, 189, game.DARK_GRAY);
                gfx.drawLine(340, 189, 348, 189, game.DARK_GRAY);
                
                // Large tapestry on wall (showing a dragon)
                gfx.fillRect(420, 160, 120, 100, game.BLUE);
                gfx.fillRect(415, 155, 130, 5, game.BROWN);
                gfx.fillRect(415, 260, 130, 5, game.BROWN);
                
                // Dragon on tapestry
                gfx.fillPolygon([
                    {x: 450, y: 220},
                    {x: 480, y: 210},
                    {x: 510, y: 220}
                ], game.GREEN);
                gfx.fillCircle(455, 200, 12, game.GREEN);
                
            },
            onTalk: (game, noun) => {
                if (noun && noun.includes('king')) {
                    if (game.hasObject('royal_pudding')) {
                        // Win via talk handled by checkWinCondition in main.js
                        game.displayText("King: *inhales deeply* 'Is that... is that VANILLA I smell?!'");
                        game.displayText("He's seen it. He KNOWS. The room fills with emotional tension.");
                    } else {
                        game.displayText("King: 'WHERE. IS. MY. PUDDING?!");
                        game.displayText("Do you understand how LONG I've been without pudding?");
                        game.displayText("I have done twelve decrees, fired four servants, and");
                        game.displayText("am currently threatening a fifth. BRING ME MY PUDDING!'");
                        game.displayText("\n(The King looks briefly at the empty throne-room, then at you.)");
                        game.displayText("'Also... the wizard mentioned a GOLDEN KEY in the courtyard.'")
                    }
                } else {
                    game.displayText("The King drums his fingers in a complex rhythmic pattern.");
                    game.displayText("This appears to be Morse code for 'pudding'. Or possibly just anxiety.");
                }
            },
            onGive: (game, noun) => {
                if (noun && noun.includes('pudding') && game.hasObject('royal_pudding')) {
                    game.displayText("You present the Royal Pudding to the King!");
                    // checkWinCondition in main.js handles the rest
                } else {
                    game.displayText("The King glares. 'Unless that is a pudding, I do not want it.'")
                }
            }
        },
        
        forest_path: {
            description: "A winding forest path. Trees tower overhead, and you hear birds chirping. To the WEST is the castle gate. To the NORTH is a forest clearing. To the EAST the path continues deeper.",
            playerX: 320,
            playerY: 300,
            exits: {
                west: 'castle_gate',
                north: 'forest_clearing',
                east: 'deep_forest'
            },
            examineTargets: {
                'trees,tree,forest': "The forest towers overhead. A hand-painted sign nailed to a trunk reads: 'GNOME TERRITORY AHEAD. You WILL answer a riddle. We are NOT responsible for delays of 2–60 years.'",
                'sign,signpost,path': "A weathered signpost: NORTH → Clearing (fertile soil, probably useful). EAST → Deep Forest (bring your wits and a clue about MOUNTAINS). WEST → Castle Gate.",
                'birds,bird,sound': "Colourful birds flit through the canopy. One dive-bombs your hat and disappears. Adventure is exactly like that, sometimes.",
                'flowers,grass,ground': "Wildflowers dot the path's edges. Several varieties you don't recognise are slowly rearranging themselves when they think you're not looking.",
            },
            draw: (gfx, state, game) => {
                // Sky with gradient (afternoon)
                gfx.fillGradient(0, 0, 640, 180, game.LIGHT_CYAN, game.LIGHT_BLUE);
                
                // Distant trees (background)
                for (let i = 0; i < 12; i++) {
                    gfx.fillPolygon([
                        {x: 30 + i * 55, y: 160},
                        {x: 45 + i * 55, y: 120},
                        {x: 60 + i * 55, y: 160}
                    ], game.GREEN);
                }
                
                // Ground with grass
                gfx.fillRect(0, 260, 640, 140, game.GREEN);
                
                // Dirt path
                gfx.fillPolygon([
                    {x: 250, y: 400},
                    {x: 390, y: 400},
                    {x: 340, y: 250},
                    {x: 300, y: 250}
                ], game.BROWN);
                
                // Path texture (ruts and stones)
                for (let i = 0; i < 8; i++) {
                    const y = 260 + i * 18;
                    gfx.drawLine(305 + i * 2, y, 315 + i * 2, y + 10, game.DARK_GRAY);
                    gfx.drawLine(325 + i * 2, y, 335 + i * 2, y + 10, game.DARK_GRAY);
                }
                
                // Foreground trees (detailed Sierra style)
                // Left tree
                gfx.fillRect(80, 180, 25, 120, game.BROWN);
                // Bark texture
                for (let i = 0; i < 6; i++) {
                    gfx.drawLine(82, 190 + i * 20, 103, 195 + i * 20, game.DARK_GRAY);
                }
                // Leaves
                gfx.fillCircle(92, 170, 35, game.GREEN);
                gfx.fillCircle(75, 185, 28, game.GREEN);
                gfx.fillCircle(110, 185, 28, game.GREEN);
                gfx.fillCircle(92, 145, 25, game.LIGHT_GREEN);
                
                // Right tree
                gfx.fillRect(535, 180, 25, 120, game.BROWN);
                for (let i = 0; i < 6; i++) {
                    gfx.drawLine(537, 190 + i * 20, 558, 195 + i * 20, game.DARK_GRAY);
                }
                gfx.fillCircle(547, 170, 35, game.GREEN);
                gfx.fillCircle(530, 185, 28, game.GREEN);
                gfx.fillCircle(565, 185, 28, game.GREEN);
                gfx.fillCircle(547, 145, 25, game.LIGHT_GREEN);
                
                // Middle distance trees
                for (let i = 0; i < 3; i++) {
                    const x = 200 + i * 120;
                    gfx.fillRect(x, 200, 18, 100, game.BROWN);
                    gfx.fillCircle(x + 9, 195, 30, game.GREEN);
                    gfx.fillCircle(x - 5, 205, 22, game.DARK_GRAY);
                    gfx.fillCircle(x + 23, 205, 22, game.DARK_GRAY);
                }
                
                // Bushes along path
                for (let i = 0; i < 5; i++) {
                    const x = 150 + i * 90;
                    gfx.fillCircle(x, 285, 20, game.DARK_GRAY);
                    gfx.fillCircle(x + 15, 288, 15, game.GREEN);
                }
                
                // Flowers
                for (let i = 0; i < 8; i++) {
                    const x = 120 + i * 60;
                    const y = 275 + (i % 3) * 15;
                    gfx.drawPixel(x, y, game.RED);
                    gfx.drawPixel(x + 25, y + 5, game.YELLOW);
                }
            }
        },
        
        forest_clearing: {
            description: "A peaceful forest clearing with rich, dark soil. Perfect for planting! To the SOUTH is the forest path.",
            playerX: 320,
            playerY: 300,
            exits: {
                south: 'forest_path'
            },
            exitConditions: {
                up: (state) => {
                    if (!state.beanstalkGrown) {
                        return false;
                    }
                    return true;
                }
            },
            examineTargets: {
                'soil,dirt,earth,ground': "Rich, dark soil — you can practically smell the magical potential. If you had a seed of some sort... perhaps a bean... of the enchanted persuasion...",
                'trees,tree': "The tall trees form a natural amphitheater. A really energetic beanstalk could punch right through the canopy and into the clouds above.",
                'flowers,wildflowers': "Wildflowers in every colour carpet the clearing. Several are definitely magical — they rearrange themselves when you're not looking.",
                'beanstalk,stalk,vine': (game) => {
                    if (game.gameState.beanstalkGrown) {
                        game.displayText("The mighty beanstalk twists upward through the canopy and into the clouds.");
                        game.displayText("It smells faintly of Brussels sprouts. You will never tell the King about that.");
                    } else {
                        game.displayText("There's just dark soil here. Maybe you need to PLANT something?");
                    }
                },
                'sky,clouds,sun': "The sun beams down. If you had a very very tall beanstalk, you could CLIMB UP into those clouds.",
            },
            draw: (gfx, state, game) => {
                // Sky - bright and sunny
                gfx.fillGradient(0, 0, 640, 150, game.WHITE, game.LIGHT_CYAN);
                
                // Sun
                gfx.fillCircle(550, 60, 30, game.YELLOW);
                // Sun rays
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const x1 = 550 + Math.cos(angle) * 35;
                    const y1 = 60 + Math.sin(angle) * 35;
                    const x2 = 550 + Math.cos(angle) * 50;
                    const y2 = 60 + Math.sin(angle) * 50;
                    gfx.drawLine(x1, y1, x2, y2, game.YELLOW);
                }
                
                // Trees surrounding clearing
                for (let i = 0; i < 8; i++) {
                    if (i !== 4) { // Leave center open
                        const angle = (i / 8) * Math.PI * 2;
                        const x = 320 + Math.cos(angle) * 220;
                        const y = 250 + Math.sin(angle) * 80;
                        
                        // Tree trunk
                        gfx.fillRect(x - 12, y, 24, 150, game.BROWN);
                        // Foliage
                        gfx.fillCircle(x, y - 10, 45, game.GREEN);
                        gfx.fillCircle(x - 20, y, 35, game.DARK_GRAY);
                        gfx.fillCircle(x + 20, y, 35, game.DARK_GRAY);
                    }
                }
                
                // Grass and flowers in clearing
                gfx.fillCircle(320, 310, 150, game.LIGHT_GREEN);
                gfx.fillCircle(320, 315, 130, game.GREEN);
                
                // Flower patches
                {
                    const flRng = seededRand(0xF10428);
                    const flColors = [game.RED, game.YELLOW, game.LIGHT_MAGENTA, game.WHITE];
                    for (let i = 0; i < 20; i++) {
                        const angle = flRng() * Math.PI * 2;
                        const dist  = 50 + flRng() * 70;
                        const x = 320 + Math.cos(angle) * dist;
                        const y = 310 + Math.sin(angle) * (dist * 0.5);
                        gfx.drawPixel(x, y, flColors[Math.floor(flRng() * flColors.length)]);
                        gfx.drawPixel(x + 1, y, game.LIGHT_GREEN);
                    }
                }
                
                // Rich soil in center (planting spot)
                gfx.fillCircle(320, 320, 40, game.BROWN);
                gfx.fillCircle(320, 318, 35, game.DARK_GRAY);
                
                // Beanstalk if grown (EPIC Sierra AGI style!)
                if (state.beanstalkGrown) {
                    // Massive twisting stalk
                    for (let i = 0; i < 20; i++) {
                        const y = 320 - i * 18;
                        const twist = Math.sin(i * 0.5) * 15;
                        const width = 25 - i * 0.5;
                        
                        gfx.fillRect(310 + twist, y, width, 20, game.GREEN);
                        // Texture lines
                        gfx.drawLine(312 + twist, y, 312 + twist, y + 20, game.LIGHT_GREEN);
                        gfx.drawLine(320 + twist, y, 320 + twist, y + 20, game.DARK_GRAY);
                    }
                    
                    // Large leaves sprouting from stalk
                    for (let i = 0; i < 12; i++) {
                        const y = 300 - i * 30;
                        const side = i % 2 === 0 ? -1 : 1;
                        const twist = Math.sin(i * 0.5) * 15;
                        const x = 320 + twist + (side * 25);
                        
                        // Leaf
                        gfx.fillPolygon([
                            {x: x, y: y},
                            {x: x + (side * 35), y: y - 10},
                            {x: x + (side * 45), y: y},
                            {x: x + (side * 35), y: y + 10}
                        ], i % 3 === 0 ? game.LIGHT_GREEN : game.GREEN);
                        
                        // Leaf vein
                        gfx.drawLine(x, y, x + (side * 40), y, game.DARK_GRAY);
                    }
                    
                    // Tendrils
                    for (let i = 0; i < 8; i++) {
                        const y = 280 - i * 40;
                        const side = i % 2 === 0 ? 1 : -1;
                        const twist = Math.sin(i * 0.5) * 15;
                        
                        for (let j = 0; j < 5; j++) {
                            const x = 320 + twist + (side * (15 + j * 6));
                            const ty = y - j * 3;
                            gfx.drawPixel(x, ty, game.GREEN);
                        }
                    }
                }
            },
            // NOTE: bean planting is handled by magic_bean.onUse (room.onUse is never
            // called by the parser — only obj.onUse is invoked).
            onClimb: (game, noun) => {
                if (noun && (noun.includes('beanstalk') || noun.includes('bean') || noun.includes('stalk'))) {
                    if (game.gameState.beanstalkGrown) {
                        game.enterRoom('cloud_realm');
                    } else {
                        game.displayText("There's nothing to climb here.");
                    }
                }
            }
        },
        
        deep_forest: {
            description: "The deep forest is dark and mysterious. A grumpy-looking GNOME blocks the path. To the WEST is the forest path. To the EAST is... well, you can't go that way right now.",
            playerX: 250,
            playerY: 300,
            exits: {
                west: 'forest_path'
            },
            examineTargets: {
                'mushroom,mushrooms,fungus': "The glowing red mushrooms pulse with dim magical light. Their spores carry a powerfully soporific aroma — notes of sleeping draught and forest damp. A dragon inhaling these spores would sleep very deeply indeed.",
                'gnome': "The gnome stands cross-armed and unmoving, blocking the path east. He appears to have been rehearsing this riddle for approximately forty years and is NOT letting anyone past without answering it.",
                'trees,vines,vine,east': "The gnarled trees form a dense wall to the east. Through them you can hear, faintly: the clinking of coins. And snoring. Extremely large snoring.",
                'sack,bag,cloth': "The gnome's rough-spun bean sack! A faint green glow emanates through the cloth. Almost certainly a magic bean inside. You'd need to earn it by solving that riddle first.",
            },
            draw: (gfx, state, game) => {
                // Dark, ominous sky
                gfx.fillGradient(0, 0, 640, 180, game.DARK_GRAY, game.BLACK);
                
                // Dense forest floor
                gfx.fillRect(0, 260, 640, 140, game.DARK_GRAY);
                
                // Moss and undergrowth
                for (let i = 0; i < 15; i++) {
                    const x = i * 45;
                    gfx.fillCircle(x + 20, 285, 18, game.GREEN);
                }
                
                // Many overlapping dark trees (creating depth)
                for (let layer = 0; layer < 3; layer++) {
                    const treeCount = 8 + layer * 2;
                    const darkness = layer === 0 ? game.BLACK : (layer === 1 ? game.DARK_GRAY : game.BROWN);
                    
                    for (let i = 0; i < treeCount; i++) {
                        const x = (i * (640 / treeCount)) + (layer * 20);
                        const y = 180 + layer * 30;
                        const height = 150 - layer * 30;
                        const width = 28 - layer * 5;
                        
                        gfx.fillRect(x, y, width, height, darkness);
                        
                        // Dark foliage
                        gfx.fillCircle(x + width/2, y - 15, 35 - layer * 5, darkness);
                    }
                }
                
                // Twisted vines
                for (let i = 0; i < 6; i++) {
                    const x = 100 + i * 90;
                    for (let j = 0; j < 10; j++) {
                        const y = 180 + j * 12;
                        const twist = Math.sin(j * 0.8) * 10;
                        gfx.drawPixel(x + twist, y, game.GREEN);
                    }
                }
                
                // Mysterious glowing mushrooms
                for (let i = 0; i < 8; i++) {
                    const x = 50 + i * 75;
                    gfx.fillPolygon([
                        {x: x, y: 295},
                        {x: x + 8, y: 285},
                        {x: x + 16, y: 295}
                    ], game.RED);
                    gfx.fillRect(x + 6, 295, 4, 10, game.BROWN);
                    // Glow
                    gfx.drawPixel(x + 8, 283, game.YELLOW);
                }
                
                // Mysterious fog (drawn before characters — avoids covering them)
                {
                    const fogRng = seededRand(0xD3F09A);
                    for (let i = 0; i < 20; i++) gfx.drawPixel(fogRng() * 640, 260 + fogRng() * 40, game.LIGHT_GRAY);
                }
                
                // Gnome — Sierra SCI-style character (stocky build, big personality)
                if (!state.gnomeHelped) {
                    const gnomeX = 450;
                    const gnomeY = 280;

                    // Shadow under gnome
                    gfx.fillRectAlpha(gnomeX - 14, gnomeY + 29, 28, 5, game.BLACK, 0.3);

                    // Curly-toed boots (gnome-style!)
                    gfx.fillRect(gnomeX - 10, gnomeY + 26, 9, 5, game.DARK_BROWN);
                    gfx.fillRect(gnomeX + 1,  gnomeY + 26, 9, 5, game.DARK_BROWN);
                    // Curled toe tips
                    gfx.fillCircle(gnomeX - 3,  gnomeY + 28, 3, game.DARK_BROWN);
                    gfx.fillCircle(gnomeX + 9,  gnomeY + 28, 3, game.DARK_BROWN);
                    gfx.drawPixel(gnomeX - 1,  gnomeY + 26, game.BROWN);
                    gfx.drawPixel(gnomeX + 11, gnomeY + 26, game.BROWN);

                    // Legs (short, stocky gnome legs)
                    gfx.fillRect(gnomeX - 9, gnomeY + 15, 7, 13, game.BLUE);
                    gfx.fillRect(gnomeX + 2,  gnomeY + 15, 7, 13, game.BLUE);
                    gfx.drawLine(gnomeX - 9, gnomeY + 15, gnomeX - 9, gnomeY + 27, game.INDIGO);
                    gfx.drawLine(gnomeX + 8, gnomeY + 15, gnomeX + 8, gnomeY + 27, game.INDIGO);

                    // Tunic body (red, with yellow trim and buttons)
                    gfx.fillPolygon([
                        {x: gnomeX - 11, y: gnomeY - 8},
                        {x: gnomeX + 11, y: gnomeY - 8},
                        {x: gnomeX + 13, y: gnomeY + 16},
                        {x: gnomeX - 13, y: gnomeY + 16}
                    ], game.RED);
                    // Tunic folds
                    gfx.drawLine(gnomeX,     gnomeY - 7, gnomeX,     gnomeY + 15, game.DARK_GRAY);
                    gfx.drawLine(gnomeX - 5, gnomeY - 7, gnomeX - 6, gnomeY + 15, game.DARK_GRAY);
                    gfx.drawLine(gnomeX + 5, gnomeY - 7, gnomeX + 6, gnomeY + 15, game.DARK_GRAY);
                    // Yellow trim at collar and hem
                    gfx.drawLine(gnomeX - 11, gnomeY - 8,  gnomeX + 10, gnomeY - 8,  game.GOLD);
                    gfx.drawLine(gnomeX - 13, gnomeY + 15, gnomeX + 12, gnomeY + 15, game.GOLD);
                    // Buttons down front
                    for (let i = 0; i < 4; i++) {
                        gfx.fillCircle(gnomeX, gnomeY - 2 + i * 5, 2, game.GOLD);
                        gfx.drawPixel(gnomeX - 1, gnomeY - 3 + i * 5, game.YELLOW);
                    }
                    // Belt
                    gfx.fillRect(gnomeX - 12, gnomeY + 8, 24, 4, game.DARK_BROWN);
                    gfx.fillRect(gnomeX - 3,  gnomeY + 7,  6, 6, game.GOLD);
                    gfx.drawLine(gnomeX - 1, gnomeY + 8, gnomeX + 1, gnomeY + 12, game.DARK_BROWN);

                    // Arms folded in front (grumpy posture)
                    gfx.fillRect(gnomeX - 16, gnomeY - 3, 9,  11, game.RED);
                    gfx.fillRect(gnomeX + 7,  gnomeY - 3, 9,  11, game.RED);
                    // Folded arms detail
                    gfx.fillRect(gnomeX - 14, gnomeY + 6,  23, 5, game.RED);
                    gfx.drawLine(gnomeX - 13, gnomeY + 6,  gnomeX + 8, gnomeY + 6,  game.DARK_GRAY);
                    // Hands (fists)
                    gfx.fillRect(gnomeX - 17, gnomeY + 4,  7, 7, game.SKIN);
                    gfx.fillRect(gnomeX + 10, gnomeY + 4,  7, 7, game.SKIN);
                    for (let i = 0; i < 4; i++) {
                        gfx.drawPixel(gnomeX - 16 + i, gnomeY + 3,  game.SKIN);
                        gfx.drawPixel(gnomeX + 10 + i, gnomeY + 3,  game.SKIN);
                    }

                    // Neck
                    gfx.fillRect(gnomeX - 4, gnomeY - 12, 8, 4, game.SKIN);

                    // Long flowing white beard (gnome-style, very wide)
                    gfx.fillPolygon([
                        {x: gnomeX - 10, y: gnomeY - 14},
                        {x: gnomeX + 10, y: gnomeY - 14},
                        {x: gnomeX + 9,  y: gnomeY + 2},
                        {x: gnomeX + 6,  y: gnomeY + 12},
                        {x: gnomeX + 2,  y: gnomeY + 5},
                        {x: gnomeX - 1,  y: gnomeY + 14},
                        {x: gnomeX - 4,  y: gnomeY + 5},
                        {x: gnomeX - 8,  y: gnomeY + 12},
                        {x: gnomeX - 11, y: gnomeY + 2}
                    ], game.WHITE);
                    // Beard hair strands
                    for (let i = 0; i < 8; i++) {
                        gfx.drawLine(gnomeX - 9 + i * 2, gnomeY - 13, gnomeX - 8 + i * 2, gnomeY + 8, game.LIGHT_GRAY);
                    }
                    gfx.drawLine(gnomeX - 1, gnomeY - 13, gnomeX,     gnomeY + 13, game.WHITE);
                    // Moustache (bushy, drooping)
                    gfx.fillRect(gnomeX - 9, gnomeY - 16, 18, 4, game.WHITE);
                    gfx.fillRect(gnomeX - 11, gnomeY - 15, 5, 5, game.WHITE);
                    gfx.fillRect(gnomeX + 6,  gnomeY - 15, 5, 5, game.WHITE);
                    for (let i = 0; i < 5; i++) gfx.drawLine(gnomeX - 9 + i * 4, gnomeY - 16, gnomeX - 9 + i * 4, gnomeY - 13, game.LIGHT_GRAY);

                    // Head (round, gnome-proportioned — big head)
                    gfx.fillRect(gnomeX - 11, gnomeY - 30, 22, 18, game.SKIN);
                    gfx.fillRect(gnomeX - 10, gnomeY - 33, 20,  5, game.SKIN);
                    // Cheeks (rosy)
                    gfx.fillCircle(gnomeX - 9, gnomeY - 20, 3, game.PINK);
                    gfx.fillCircle(gnomeX + 9, gnomeY - 20, 3, game.PINK);
                    // Grumpy V-shaped eyebrows (very furrowed)
                    gfx.drawLine(gnomeX - 11, gnomeY - 28, gnomeX - 5, gnomeY - 31, game.DARK_BROWN);
                    gfx.drawLine(gnomeX + 4,  gnomeY - 31, gnomeX + 11, gnomeY - 28, game.DARK_BROWN);
                    gfx.drawLine(gnomeX - 10, gnomeY - 27, gnomeX - 5, gnomeY - 30, game.BLACK);
                    gfx.drawLine(gnomeX + 4,  gnomeY - 30, gnomeX + 10, gnomeY - 27, game.BLACK);
                    // Eyes (small, squinting under furrowed brows)
                    gfx.fillRect(gnomeX - 10, gnomeY - 27, 5, 4, game.WHITE);
                    gfx.fillRect(gnomeX + 5,  gnomeY - 27, 5, 4, game.WHITE);
                    gfx.drawPixel(gnomeX - 8,  gnomeY - 26, game.BLACK);
                    gfx.drawPixel(gnomeX + 8,  gnomeY - 26, game.BLACK);
                    // Eye whites highlight
                    gfx.drawPixel(gnomeX - 7,  gnomeY - 27, game.WHITE);
                    gfx.drawPixel(gnomeX + 9,  gnomeY - 27, game.WHITE);
                    // Eyelid shadow (squinting)
                    gfx.drawLine(gnomeX - 10, gnomeY - 27, gnomeX - 6, gnomeY - 27, game.DARK_BROWN);
                    gfx.drawLine(gnomeX + 5,  gnomeY - 27, gnomeX + 9, gnomeY - 27, game.DARK_BROWN);
                    // Big gnome nose (bulbous)
                    gfx.fillCircle(gnomeX, gnomeY - 20, 5, game.PERU);
                    gfx.fillCircle(gnomeX - 3, gnomeY - 20, 3, game.PERU);
                    gfx.fillCircle(gnomeX + 3, gnomeY - 20, 3, game.PERU);
                    gfx.drawPixel(gnomeX - 1, gnomeY - 23, game.SKIN);
                    gfx.drawPixel(gnomeX - 4, gnomeY - 20, game.DARK_BROWN);
                    gfx.drawPixel(gnomeX + 4, gnomeY - 20, game.DARK_BROWN);
                    // Grumpy frown mouth
                    gfx.drawLine(gnomeX - 5, gnomeY - 15, gnomeX - 3, gnomeY - 14, game.DARK_BROWN);
                    gfx.drawLine(gnomeX - 3, gnomeY - 14, gnomeX + 3, gnomeY - 14, game.DARK_BROWN);
                    gfx.drawLine(gnomeX + 3, gnomeY - 14, gnomeX + 5, gnomeY - 15, game.DARK_BROWN);
                    // Ears (pointy gnome ears!)
                    gfx.fillPolygon([
                        {x: gnomeX - 11, y: gnomeY - 27},
                        {x: gnomeX - 17, y: gnomeY - 24},
                        {x: gnomeX - 11, y: gnomeY - 20}
                    ], game.SKIN);
                    gfx.fillPolygon([
                        {x: gnomeX + 11, y: gnomeY - 27},
                        {x: gnomeX + 17, y: gnomeY - 24},
                        {x: gnomeX + 11, y: gnomeY - 20}
                    ], game.SKIN);
                    gfx.drawLine(gnomeX - 11, gnomeY - 27, gnomeX - 17, gnomeY - 24, game.DARK_BROWN);
                    gfx.drawLine(gnomeX + 11, gnomeY - 27, gnomeX + 17, gnomeY - 24, game.DARK_BROWN);
                    // Wrinkle on forehead
                    gfx.drawLine(gnomeX - 4, gnomeY - 32, gnomeX + 4, gnomeY - 32, game.DARK_BROWN);
                    gfx.drawLine(gnomeX - 6, gnomeY - 30, gnomeX + 6, gnomeY - 30, game.PERU);

                    // Tall pointy gnome hat (drooping tip — classic!)
                    gfx.fillPolygon([
                        {x: gnomeX - 14, y: gnomeY - 28},
                        {x: gnomeX - 2,  y: gnomeY - 60},
                        {x: gnomeX + 14, y: gnomeY - 28}
                    ], game.RED);
                    // Hat highlight (left side)
                    gfx.drawLine(gnomeX - 12, gnomeY - 28, gnomeX - 2, gnomeY - 60, game.LIGHT_RED);
                    // Drooping tip of hat
                    gfx.fillPolygon([
                        {x: gnomeX - 2,  y: gnomeY - 60},
                        {x: gnomeX + 8,  y: gnomeY - 55},
                        {x: gnomeX + 10, y: gnomeY - 48}
                    ], game.RED);
                    gfx.fillCircle(gnomeX + 10, gnomeY - 46, 4, game.RED);
                    // Hat pompom
                    gfx.fillCircle(gnomeX + 10, gnomeY - 46, 3, game.WHITE);
                    // Hat brim
                    gfx.fillRect(gnomeX - 17, gnomeY - 28, 34, 5, game.RED);
                    gfx.drawLine(gnomeX - 17, gnomeY - 28, gnomeX + 16, gnomeY - 28, game.LIGHT_RED);
                    gfx.drawLine(gnomeX - 17, gnomeY - 23, gnomeX + 16, gnomeY - 23, game.DARK_GRAY);
                    // Hat band
                    gfx.fillRect(gnomeX - 14, gnomeY - 32, 28, 5, game.DARK_BROWN);
                    gfx.fillCircle(gnomeX,     gnomeY - 30,  4, game.GOLD);
                    gfx.fillCircle(gnomeX,     gnomeY - 30,  2, game.YELLOW);

                    // Bean sack at gnome's feet (colorful tied sack)
                    gfx.fillPolygon([
                        {x: gnomeX + 14, y: gnomeY + 25},
                        {x: gnomeX + 28, y: gnomeY + 22},
                        {x: gnomeX + 30, y: gnomeY + 30},
                        {x: gnomeX + 15, y: gnomeY + 31}
                    ], game.SANDY);
                    gfx.fillRect(gnomeX + 16, gnomeY + 20, 12, 5, game.BROWN);
                    gfx.drawLine(gnomeX + 16, gnomeY + 19, gnomeX + 27, gnomeY + 19, game.DARK_BROWN);
                    // Rope tie on sack
                    gfx.fillRect(gnomeX + 17, gnomeY + 22, 10, 2, game.DARK_BROWN);
                    // Magic bean glowing through sack
                    gfx.drawPixel(gnomeX + 20, gnomeY + 26, game.LIGHT_GREEN);
                    gfx.drawPixel(gnomeX + 23, gnomeY + 28, game.GREEN);
                    gfx.drawPixel(gnomeX + 18, gnomeY + 29, game.LIME);
                }
                
            },
            onTalk: (game, noun) => {
                if (!game.gameState.gnomeHelped) {
                    game.displayText("Gnome: 'Halt! Answer my riddle or you shall NOT pass!");
                    game.displayText("I have been waiting here for FORTY YEARS to ask this.'\n");
                    game.displayText("'What has roots as nobody sees,");
                    game.displayText(" Is taller than trees,");
                    game.displayText(" Up, up, up it goes,");
                    game.displayText(" And yet it never grows?'\n");
                    game.displayText("(Type your answer! Hint: it rhymes with MOUNTAIN)");
                } else {
                    game.displayText("Gnome: 'You solved my riddle! Forty years I've waited and");
                    game.displayText("someone finally got it right on the... what attempt was that?'");
                    game.displayText("'Take the bean. Go. Bring back the pudding. Good luck.'");
                    game.displayText("'Also please don't tell anyone I had to give you hints.'\n");
                }
            }
        },
        
        cloud_realm: {
            description: "You're standing on fluffy clouds! A castle made entirely of cotton candy looms ahead. To the NORTH is the entrance. You can CLIMB DOWN the beanstalk.",
            playerX: 320,
            playerY: 320,
            exits: {
                north: 'dragon_lair',
                down: 'forest_clearing'
            },
            examineTargets: {
                'cloud,clouds,ground': (game) => {
                    game.displayText("The clouds are surprisingly solid — you test them with your foot.");
                    game.displayText("You scoop up a small handful and taste it. Vanilla.");
                    game.displayText("Magic is very, very weird.");
                },
                'castle,cotton,candy,sugar': "The castle is constructed entirely of cotton candy and spun sugar. The architect was either a culinary visionary or extremely hungry. The guards are made of marzipan.",
                'rainbow': "A brilliant rainbow arcs across the sky. You note it hasn't rained recently. Continuity in this kingdom is clearly optional.",
                'beanstalk,stalk,vine': "The beanstalk punches up through the clouds behind you, your only route down. It smells of Brussels sprouts even from up here. The King must never know.",
                'north,entrance,door': "The entrance to what can only be a dragon's mountain lair. Very dramatic. Very final. Very 'bring a plan and a very good lullaby'.",
            },
            draw: (gfx, state, game) => {
                // Sky - very light, ethereal
                gfx.fillGradient(0, 0, 640, 250, game.WHITE, game.LIGHT_CYAN);
                
                // Fluffy clouds as ground (Sierra style with depth)
                for (let layer = 0; layer < 3; layer++) {
                    const count = 6 + layer * 2;
                    const y = 280 + layer * 25;
                    const size = 50 - layer * 10;
                    
                    for (let i = 0; i < count; i++) {
                        const x = (i * (640 / count)) + (layer * 15);
                        gfx.fillCircle(x, y, size, game.WHITE);
                        gfx.fillCircle(x + size * 0.6, y + 5, size * 0.7, game.WHITE);
                        gfx.fillCircle(x - size * 0.6, y + 5, size * 0.7, game.WHITE);
                    }
                }
                
                // More cloud puffs for atmosphere
                for (let i = 0; i < 15; i++) {
                    const x = (i * 50) + (i % 2) * 20;
                    const y = 250 + (i % 3) * 30;
                    const size = 20 + (i % 4) * 10;
                    gfx.fillCircle(x, y, size, game.LIGHT_GRAY);
                }
                
                // Cotton candy castle (Whimsical Sierra style!)
                const castleX = 280;
                const castleY = 120;
                
                // Main castle body (pink cotton candy)
                gfx.fillRect(castleX, castleY, 140, 120, game.LIGHT_MAGENTA);
                
                // Castle windows (darker pink)
                for (let row = 0; row < 3; row++) {
                    for (let col = 0; col < 3; col++) {
                        gfx.fillRect(castleX + 20 + col * 40, castleY + 20 + row * 30, 20, 25, game.MAGENTA);
                    }
                }
                
                // Left tower
                gfx.fillRect(castleX - 40, castleY - 20, 50, 160, game.LIGHT_MAGENTA);
                // Tower top (cone)
                gfx.fillPolygon([
                    {x: castleX - 45, y: castleY - 20},
                    {x: castleX - 15, y: castleY - 60},
                    {x: castleX + 15, y: castleY - 20}
                ], game.MAGENTA);
                // Tower window
                gfx.fillRect(castleX - 25, castleY + 10, 15, 20, game.MAGENTA);
                
                // Right tower
                gfx.fillRect(castleX + 130, castleY - 20, 50, 160, game.LIGHT_MAGENTA);
                // Tower top
                gfx.fillPolygon([
                    {x: castleX + 125, y: castleY - 20},
                    {x: castleX + 155, y: castleY - 60},
                    {x: castleX + 185, y: castleY - 20}
                ], game.MAGENTA);
                // Tower window
                gfx.fillRect(castleX + 140, castleY + 10, 15, 20, game.MAGENTA);
                
                // Center spire
                gfx.fillRect(castleX + 55, castleY - 40, 30, 80, game.LIGHT_MAGENTA);
                gfx.fillPolygon([
                    {x: castleX + 50, y: castleY - 40},
                    {x: castleX + 70, y: castleY - 80},
                    {x: castleX + 90, y: castleY - 40}
                ], game.MAGENTA);
                
                // Flags on towers
                gfx.fillPolygon([
                    {x: castleX - 15, y: castleY - 60},
                    {x: castleX - 15, y: castleY - 70},
                    {x: castleX - 5, y: castleY - 65}
                ], game.YELLOW);
                
                gfx.fillPolygon([
                    {x: castleX + 155, y: castleY - 60},
                    {x: castleX + 155, y: castleY - 70},
                    {x: castleX + 165, y: castleY - 65}
                ], game.YELLOW);
                
                // Castle door/entrance
                gfx.fillRect(castleX + 55, castleY + 80, 30, 40, game.BROWN);
                gfx.fillCircle(castleX + 70, castleY + 80, 15, game.BROWN);
                
                // Candy decorations (colorful dots — seeded to avoid flicker)
                {
                    const ccRng = seededRand(0xC4A501);
                    const ccColors = [game.RED, game.YELLOW, game.LIGHT_CYAN, game.WHITE];
                    for (let i = 0; i < 20; i++) {
                        gfx.drawPixel(
                            castleX + 10 + ccRng() * 120,
                            castleY + 10 + ccRng() * 110,
                            ccColors[Math.floor(ccRng() * ccColors.length)]
                        );
                    }
                }
                
                // Beanstalk top visible
                gfx.fillRect(100, 320, 30, 80, game.GREEN);
                gfx.fillCircle(115, 315, 25, game.LIGHT_GREEN);
                
                // Rainbow in background (Sierra style)
                for (let i = 0; i < 7; i++) {
                    const colors = [game.RED, game.LIGHT_RED, game.YELLOW, game.LIGHT_GREEN, 
                                  game.CYAN, game.LIGHT_BLUE, game.LIGHT_MAGENTA];
                    for (let j = 0; j < 40; j++) {
                        const angle = (j / 40) * Math.PI;
                        const radius = 180 + i * 8;
                        const x = 120 + Math.cos(angle) * radius;
                        const y = 200 + Math.sin(angle) * radius * 0.7;
                        gfx.drawPixel(x, y, colors[i]);
                    }
                }
            }
        },
        
        dragon_lair: {
            description: "The dragon's lair! A massive dragon sleeps on a pile of gold... and there, on a pedestal, is the ROYAL PUDDING! The dragon snores loudly. To the SOUTH is the cloud realm.",
            playerX: 520,
            playerY: 320,
            exits: {
                south: 'cloud_realm'
            },
            examineTargets: {
                'treasure,gold,coins,jewels,gems': (game) => {
                    game.displayText("Mounds of gold coins and glittering jewels. Staggering wealth.");
                    game.displayText("Buried in the pile: a crumpled delivery note.");
                    game.displayText("'DELIVERY CONFIRMATION: Royal Pudding (Special Order) delivered to Dragon Mountain, Cave 3.");
                    game.displayText("Customer signature: Ignatius (wizard). Note: WRONG ADDRESS. Sorry. — Manny's Magical Courier Service.'");
                    game.displayText("So THAT is how it got here.");
                },
                'dragon,beast,creature': (game) => {
                    game.displayText("The dragon is ENORMOUS. Its scales are like iron dinner plates.");
                    game.displayText("It is asleep — its slow, ragged snores shake the stalactites.");
                    game.displayText("But perhaps not DEEPLY enough asleep to safely remove the pudding...");
                    game.displayText("(A lullaby might deepen its slumber considerably.)");
                },
                'stalactites,ceiling,rock,cave': "Sharp rocky stalactites hang from the ceiling. They've been here for a thousand years. You decide not to jump.",
                'pedestal,stand,marble': "An ornate marble pedestal, clearly placed with great theatrical deliberation. Why would a dragon DISPLAY the pudding rather than eat it? Dragons are terribly dramatic.",
                'torch,torches,fire': "Dim cave torches barely push back the darkness. The dragon's snoring keeps nearly extinguishing them. The pudding glows in their unsteady light.",
            },
            onAction: (game, verb, noun, tool) => {
                if (verb === 'take' && (noun?.includes('gold') || noun?.includes('treasure') || noun?.includes('coin') || noun?.includes('jewel') || noun?.includes('gem'))) {
                    game.die("You reach for the gold. The dragon's eye opens. Both eyes open.\n\nIt stops snoring. It looks at you. You look at it.\n\nThe dragon, it turns out, has excellent hearing AND a very short temper.\nYou were, briefly, extra crispy.");
                    return true;
                }
                return false;
            },
            draw: (gfx, state, game) => {
                // Dark, ominous cave atmosphere
                gfx.fillGradient(0, 0, 640, 180, game.RED, game.BLACK);
                
                // Cave walls (rocky)
                gfx.fillPolygon([
                    {x: 0, y: 180},
                    {x: 120, y: 200},
                    {x: 0, y: 400}
                ], game.BROWN);
                
                gfx.fillPolygon([
                    {x: 640, y: 180},
                    {x: 520, y: 200},
                    {x: 640, y: 400}
                ], game.BROWN);
                
                // Cave floor (rough stone)
                gfx.fillRect(0, 300, 640, 100, game.DARK_GRAY);
                
                // Floor cracks and texture
                for (let i = 0; i < 15; i++) {
                    const x = i * 45;
                    gfx.drawLine(x, 310, x + 30, 330, game.BLACK);
                    gfx.drawLine(x + 10, 335, x + 40, 355, game.BLACK);
                }
                
                // Treasure pile (LOTS of gold - Sierra style!)
                const goldX = 150;
                const goldY = 260;
                
                // Gold mound shape
                gfx.fillPolygon([
                    {x: goldX - 60, y: goldY + 60},
                    {x: goldX, y: goldY - 20},
                    {x: goldX + 100, y: goldY + 60}
                ], game.YELLOW);
                
                // Individual gold coins and treasures (seeded — avoids flicker on redraw)
                {
                    const coinRng = seededRand(0xD7A901);
                    for (let i = 0; i < 40; i++) {
                        const x = goldX - 50 + coinRng() * 140;
                        const y = goldY + 20 + coinRng() * 40;
                        gfx.fillCircle(x, y, 4, game.YELLOW);
                        gfx.drawPixel(x - 1, y - 1, game.WHITE);
                    }
                }

                // Jewels in treasure
                {
                    const jewRng = seededRand(0xB4A502);
                    const jewColors = [game.RED, game.CYAN, game.LIGHT_GREEN, game.LIGHT_MAGENTA];
                    for (let i = 0; i < 15; i++) {
                        const x = goldX - 40 + jewRng() * 120;
                        const y = goldY + 15 + jewRng() * 35;
                        gfx.fillPolygon([
                            {x: x,     y: y - 3},
                            {x: x - 3, y: y},
                            {x: x,     y: y + 3},
                            {x: x + 3, y: y}
                        ], jewColors[Math.floor(jewRng() * jewColors.length)]);
                    }
                }
                
                // Gold chalices
                for (let i = 0; i < 3; i++) {
                    const x = goldX - 30 + i * 50;
                    const y = goldY + 10;
                    gfx.fillRect(x, y, 10, 12, game.YELLOW);
                    gfx.fillRect(x - 3, y + 12, 16, 3, game.YELLOW);
                }
                
                // THE DRAGON — Sierra SCI-style (large, sleeping, impressive)
                const dragonX = 200;
                const dragonY = 240;

                // === WINGS (drawn behind body) ===
                // Left wing membrane (spread slightly even while sleeping)
                gfx.fillPolygon([
                    {x: dragonX + 20, y: dragonY + 18},
                    {x: dragonX - 10, y: dragonY - 30},
                    {x: dragonX + 30, y: dragonY - 50},
                    {x: dragonX + 70, y: dragonY - 20},
                    {x: dragonX + 60, y: dragonY + 15}
                ], game.DARK_GRAY);
                // Wing skin (semi-transparent dark green)
                gfx.fillPolygon([
                    {x: dragonX + 22, y: dragonY + 16},
                    {x: dragonX - 5,  y: dragonY - 25},
                    {x: dragonX + 30, y: dragonY - 44},
                    {x: dragonX + 65, y: dragonY - 16},
                    {x: dragonX + 58, y: dragonY + 13}
                ], game.FOREST_GREEN);
                // Wing bone fingers (4 finger-bones fanning out)
                gfx.drawLine(dragonX + 20, dragonY + 18, dragonX - 8,  dragonY - 28, game.BLACK);
                gfx.drawLine(dragonX + 20, dragonY + 18, dragonX + 15, dragonY - 44, game.BLACK);
                gfx.drawLine(dragonX + 20, dragonY + 18, dragonX + 42, dragonY - 42, game.BLACK);
                gfx.drawLine(dragonX + 20, dragonY + 18, dragonX + 65, dragonY - 14, game.BLACK);
                // Wing arm bone
                gfx.drawLine(dragonX + 20, dragonY + 18, dragonX + 5,  dragonY - 5,  game.BLACK);
                gfx.fillCircle(dragonX + 5, dragonY - 5, 4, game.DARK_GRAY);
                // Wing highlight
                for (let i = 0; i < 4; i++) {
                    const wx = dragonX + 10 + i * 15;
                    const wy = dragonY - 35 + i * 10;
                    gfx.drawPixel(wx, wy, game.SEA_GREEN);
                }

                // === MAIN BODY (large sleeping coil) ===
                gfx.fillPolygon([
                    {x: dragonX - 15, y: dragonY + 15},
                    {x: dragonX + 65, y: dragonY + 5},
                    {x: dragonX + 100, y: dragonY + 30},
                    {x: dragonX + 95,  y: dragonY + 65},
                    {x: dragonX + 50,  y: dragonY + 80},
                    {x: dragonX,       y: dragonY + 75},
                    {x: dragonX - 20,  y: dragonY + 60}
                ], game.SEA_GREEN);
                // Body underbelly (lighter color)
                gfx.fillPolygon([
                    {x: dragonX + 5,   y: dragonY + 40},
                    {x: dragonX + 60,  y: dragonY + 30},
                    {x: dragonX + 85,  y: dragonY + 50},
                    {x: dragonX + 80,  y: dragonY + 70},
                    {x: dragonX + 40,  y: dragonY + 75},
                    {x: dragonX + 5,   y: dragonY + 68}
                ], game.LIME);
                // Belly segments (horizontal lines)
                for (let i = 0; i < 5; i++) {
                    const bx  = dragonX + 8  + i * 14;
                    const by  = dragonY + 42 + i * 5;
                    gfx.drawLine(bx, by, bx + 22, by - 3, game.SEA_GREEN);
                }

                // Dragon scale texture (overlapping diamond scales)
                for (let row = 0; row < 4; row++) {
                    for (let col = 0; col < 7; col++) {
                        const sx = dragonX + 5  + col * 13 + (row % 2) * 6;
                        const sy = dragonY + 12 + row * 12;
                        if (sx < dragonX + 100 && sy < dragonY + 68) {
                            gfx.fillPolygon([
                                {x: sx,     y: sy - 5},
                                {x: sx + 6, y: sy},
                                {x: sx,     y: sy + 5},
                                {x: sx - 6, y: sy}
                            ], game.GREEN);
                            gfx.drawLine(sx - 5, sy, sx + 5, sy, game.DARK_GRAY);
                        }
                    }
                }

                // === BACK SPINES along top of body ===
                for (let i = 0; i < 9; i++) {
                    const spX = dragonX + 5  + i * 11;
                    const spY = dragonY + 14 - i * 2;
                    gfx.fillPolygon([
                        {x: spX - 3, y: spY + 4},
                        {x: spX,     y: spY - 8},
                        {x: spX + 3, y: spY + 4}
                    ], game.DARK_GRAY);
                    gfx.drawLine(spX - 2, spY + 4, spX, spY - 7, game.SILVER);
                }

                // === TAIL (thick at base, tapering, curling across treasure) ===
                gfx.fillPolygon([
                    {x: dragonX + 95, y: dragonY + 35},
                    {x: dragonX + 110, y: dragonY + 45},
                    {x: dragonX + 125, y: dragonY + 55},
                    {x: dragonX + 140, y: dragonY + 60},
                    {x: dragonX + 160, y: dragonY + 58},
                    {x: dragonX + 155, y: dragonY + 48},
                    {x: dragonX + 135, y: dragonY + 50},
                    {x: dragonX + 115, y: dragonY + 43},
                    {x: dragonX + 100, y: dragonY + 30}
                ], game.SEA_GREEN);
                // Tail spines
                for (let i = 0; i < 5; i++) {
                    const tx = dragonX + 100 + i * 12;
                    const ty = dragonY + 36  + i * 4;
                    gfx.fillPolygon([
                        {x: tx - 3, y: ty + 3},
                        {x: tx,     y: ty - 7},
                        {x: tx + 3, y: ty + 3}
                    ], game.DARK_GRAY);
                }
                // Tail tip (barbed arrowhead)
                gfx.fillPolygon([
                    {x: dragonX + 160, y: dragonY + 48},
                    {x: dragonX + 170, y: dragonY + 40},
                    {x: dragonX + 175, y: dragonY + 52},
                    {x: dragonX + 162, y: dragonY + 57}
                ], game.GREEN);
                gfx.fillPolygon([
                    {x: dragonX + 170, y: dragonY + 40},
                    {x: dragonX + 182, y: dragonY + 44},
                    {x: dragonX + 175, y: dragonY + 52}
                ], game.DARK_GRAY);

                // === CLAWS visible at body base ===
                for (let c = 0; c < 3; c++) {
                    const cx = dragonX + 15 + c * 22;
                    const cy = dragonY + 75;
                    gfx.fillPolygon([
                        {x: cx - 4, y: cy},
                        {x: cx,     y: cy + 12},
                        {x: cx + 4, y: cy}
                    ], game.DARK_GRAY);
                    gfx.drawLine(cx - 3, cy, cx, cy + 11, game.SILVER);
                }

                // === NECK ===
                gfx.fillPolygon([
                    {x: dragonX - 5,  y: dragonY + 20},
                    {x: dragonX - 20, y: dragonY + 15},
                    {x: dragonX - 35, y: dragonY + 25},
                    {x: dragonX - 30, y: dragonY + 40},
                    {x: dragonX - 10, y: dragonY + 38}
                ], game.SEA_GREEN);
                // Neck scales
                for (let i = 0; i < 4; i++) {
                    gfx.drawLine(dragonX - 28 + i * 6, dragonY + 22, dragonX - 26 + i * 6, dragonY + 36, game.GREEN);
                }
                // Neck spines
                for (let i = 0; i < 3; i++) {
                    const nx = dragonX - 28 + i * 10;
                    const ny = dragonY + 18 - i * 2;
                    gfx.fillPolygon([
                        {x: nx - 2, y: ny + 4},
                        {x: nx,     y: ny - 6},
                        {x: nx + 2, y: ny + 4}
                    ], game.DARK_GRAY);
                }

                // === HEAD (large, reptilian, sleeping) ===
                // Head base shape
                gfx.fillPolygon([
                    {x: dragonX - 30, y: dragonY + 22},
                    {x: dragonX - 10, y: dragonY + 15},
                    {x: dragonX - 5,  y: dragonY + 30},
                    {x: dragonX - 10, y: dragonY + 50},
                    {x: dragonX - 35, y: dragonY + 55},
                    {x: dragonX - 50, y: dragonY + 45},
                    {x: dragonX - 45, y: dragonY + 25}
                ], game.SEA_GREEN);
                // Head top detail
                gfx.fillPolygon([
                    {x: dragonX - 32, y: dragonY + 22},
                    {x: dragonX - 10, y: dragonY + 15},
                    {x: dragonX - 8,  y: dragonY + 28},
                    {x: dragonX - 28, y: dragonY + 30}
                ], game.GREEN);
                // Brow ridge
                gfx.drawLine(dragonX - 45, dragonY + 28, dragonX - 10, dragonY + 22, game.DARK_GRAY);
                // Brow horn / crest
                gfx.fillPolygon([
                    {x: dragonX - 40, y: dragonY + 23},
                    {x: dragonX - 35, y: dragonY + 8},
                    {x: dragonX - 30, y: dragonY + 23}
                ], game.SILVER);
                gfx.fillPolygon([
                    {x: dragonX - 26, y: dragonY + 20},
                    {x: dragonX - 22, y: dragonY + 10},
                    {x: dragonX - 18, y: dragonY + 20}
                ], game.SILVER);
                gfx.drawLine(dragonX - 38, dragonY + 23, dragonX - 35, dragonY + 9, game.LIGHT_GRAY);
                // Closed eye (sleeping — curved lid)
                gfx.fillRect(dragonX - 40, dragonY + 30, 16, 7, game.GREEN);
                gfx.drawLine(dragonX - 40, dragonY + 30, dragonX - 25, dragonY + 30, game.BLACK);
                gfx.drawLine(dragonX - 40, dragonY + 36, dragonX - 25, dragonY + 36, game.DARK_GRAY);
                // Eyelid highlight
                gfx.drawLine(dragonX - 39, dragonY + 31, dragonX - 26, dragonY + 31, game.LIME);
                // Second eye (farther, partially hidden)
                gfx.fillRect(dragonX - 18, dragonY + 26, 10, 5, game.GREEN);
                gfx.drawLine(dragonX - 18, dragonY + 26, dragonX - 9, dragonY + 26, game.BLACK);
                // Ear frill
                gfx.fillPolygon([
                    {x: dragonX - 50, y: dragonY + 30},
                    {x: dragonX - 62, y: dragonY + 22},
                    {x: dragonX - 58, y: dragonY + 40}
                ], game.DARK_GRAY);
                gfx.fillPolygon([
                    {x: dragonX - 50, y: dragonY + 30},
                    {x: dragonX - 60, y: dragonY + 25},
                    {x: dragonX - 57, y: dragonY + 38}
                ], game.SEA_GREEN);
                // Jaw / lower snout
                gfx.fillPolygon([
                    {x: dragonX - 50, y: dragonY + 45},
                    {x: dragonX - 70, y: dragonY + 48},
                    {x: dragonX - 68, y: dragonY + 57},
                    {x: dragonX - 45, y: dragonY + 58},
                    {x: dragonX - 35, y: dragonY + 52}
                ], game.SEA_GREEN);
                // Upper snout (long, extending forward)
                gfx.fillPolygon([
                    {x: dragonX - 45, y: dragonY + 38},
                    {x: dragonX - 68, y: dragonY + 40},
                    {x: dragonX - 72, y: dragonY + 48},
                    {x: dragonX - 50, y: dragonY + 44}
                ], game.GREEN);
                // Scales on snout
                for (let i = 0; i < 3; i++) {
                    gfx.drawLine(dragonX - 67 + i * 8, dragonY + 40, dragonX - 65 + i * 8, dragonY + 47, game.DARK_GRAY);
                }
                // Teeth visible (sleeping, jaw slightly open — snoring)
                for (let i = 0; i < 4; i++) {
                    gfx.fillPolygon([
                        {x: dragonX - 68 + i * 7, y: dragonY + 48},
                        {x: dragonX - 65 + i * 7, y: dragonY + 54},
                        {x: dragonX - 62 + i * 7, y: dragonY + 48}
                    ], game.WHITE);
                    gfx.drawLine(dragonX - 67 + i * 7, dragonY + 48, dragonX - 65 + i * 7, dragonY + 53, game.LIGHT_GRAY);
                }
                // Lower teeth
                for (let i = 0; i < 3; i++) {
                    gfx.fillPolygon([
                        {x: dragonX - 65 + i * 7, y: dragonY + 57},
                        {x: dragonX - 62 + i * 7, y: dragonY + 51},
                        {x: dragonX - 59 + i * 7, y: dragonY + 57}
                    ], game.WHITE);
                }
                // Nostril (large, flared)
                gfx.fillCircle(dragonX - 68, dragonY + 44, 3, game.DARK_GRAY);
                gfx.fillCircle(dragonX - 63, dragonY + 43, 3, game.DARK_GRAY);
                gfx.fillCircle(dragonX - 68, dragonY + 44, 2, game.BLACK);
                gfx.fillCircle(dragonX - 63, dragonY + 43, 2, game.BLACK);
                // Jaw scales
                gfx.drawLine(dragonX - 50, dragonY + 55, dragonX - 36, dragonY + 52, game.DARK_GRAY);

                // === SNORE SMOKE PUFFS (animated-feeling with varying sizes) ===
                for (let i = 0; i < 6; i++) {
                    const sSize = 5 + i * 4;
                    gfx.fillCircle(dragonX - 80  - i * 12, dragonY + 44 - i * 4, sSize, game.LIGHT_GRAY);
                    gfx.fillCircle(dragonX - 82  - i * 12, dragonY + 42 - i * 4, sSize - 2, game.WHITE);
                }
                // Small ember sparks from nostrils (snoring fire-breather)
                gfx.drawPixel(dragonX - 74, dragonY + 41, game.FIRE_ORANGE);
                gfx.drawPixel(dragonX - 76, dragonY + 39, game.YELLOW);
                gfx.drawPixel(dragonX - 73, dragonY + 38, game.ORANGE);
                gfx.drawPixel(dragonX - 78, dragonY + 36, game.FIRE_ORANGE);
                
                // ROYAL PUDDING PEDESTAL — ornate marble column
                const pedestalX = 500;
                const pedestalY = 260;

                // Pedestal base (wide foot)
                gfx.fillRect(pedestalX - 8, pedestalY + 78, 56, 10, game.SILVER);
                gfx.drawLine(pedestalX - 8, pedestalY + 78, pedestalX + 47, pedestalY + 78, game.WHITE);
                gfx.drawLine(pedestalX - 8, pedestalY + 87, pedestalX + 47, pedestalY + 87, game.DARK_GRAY);
                // Pedestal column
                gfx.fillRect(pedestalX + 2, pedestalY + 18, 36, 62, game.SILVER);
                gfx.drawLine(pedestalX + 4,  pedestalY + 18, pedestalX + 4,  pedestalY + 78, game.WHITE);
                gfx.drawLine(pedestalX + 12, pedestalY + 18, pedestalX + 12, pedestalY + 78, game.WHITE);
                gfx.drawLine(pedestalX + 35, pedestalY + 18, pedestalX + 35, pedestalY + 78, game.DARK_GRAY);
                // Column fluting (decorative grooves)
                for (let i = 0; i < 4; i++) {
                    gfx.drawLine(pedestalX + 6 + i * 8, pedestalY + 20, pedestalX + 6 + i * 8, pedestalY + 76, game.LIGHT_GRAY);
                }
                // Pedestal capital (top)
                gfx.fillRect(pedestalX - 3, pedestalY + 12, 46, 8, game.SILVER);
                gfx.drawLine(pedestalX - 3, pedestalY + 12, pedestalX + 42, pedestalY + 12, game.WHITE);
                gfx.drawLine(pedestalX - 3, pedestalY + 19, pedestalX + 42, pedestalY + 19, game.DARK_GRAY);
                // Gold trim rings on pedestal
                gfx.drawLine(pedestalX + 2, pedestalY + 35, pedestalX + 37, pedestalY + 35, game.GOLD);
                gfx.drawLine(pedestalX + 2, pedestalY + 55, pedestalX + 37, pedestalY + 55, game.GOLD);
                // Royal seal medallion on pedestal
                gfx.fillCircle(pedestalX + 20, pedestalY + 45, 8, game.GOLD);
                gfx.fillCircle(pedestalX + 20, pedestalY + 45, 6, game.YELLOW);
                gfx.fillCircle(pedestalX + 20, pedestalY + 45, 3, game.GOLD);
                gfx.drawPixel(pedestalX + 19, pedestalY + 44, game.WHITE);

                // The Royal Pudding (if still there)
                if (game.objects.royal_pudding.location === 'dragon_lair') {
                    // Magical golden glow emanating from pedestal (outer)
                    gfx.fillCircleAlpha(pedestalX + 20, pedestalY + 2, 38, game.YELLOW, 0.18);
                    gfx.fillCircleAlpha(pedestalX + 20, pedestalY + 2, 28, game.YELLOW, 0.22);

                    // Pedestal top plate (ornate gold dish)
                    gfx.fillPolygon([
                        {x: pedestalX,      y: pedestalY + 12},
                        {x: pedestalX + 40, y: pedestalY + 12},
                        {x: pedestalX + 38, y: pedestalY + 20},
                        {x: pedestalX + 2,  y: pedestalY + 20}
                    ], game.GOLD);
                    gfx.drawLine(pedestalX, pedestalY + 12, pedestalX + 39, pedestalY + 12, game.YELLOW);
                    gfx.drawLine(pedestalX + 1, pedestalY + 19, pedestalX + 38, pedestalY + 19, game.DARK_GRAY);

                    // Pudding dome (Sierra-style rich Victorian pudding!)
                    // Pudding main body
                    gfx.fillCircle(pedestalX + 20, pedestalY - 3,  22, game.SIENNA);
                    gfx.fillCircle(pedestalX + 20, pedestalY - 5,  20, game.PERU);
                    // Pudding shading (highlights and shadow)
                    gfx.fillCircle(pedestalX + 14, pedestalY - 10, 10, game.SANDY);
                    gfx.fillCircle(pedestalX + 12, pedestalY - 12,  6, game.PARCHMENT);
                    gfx.fillCircle(pedestalX + 28, pedestalY + 2,   8, game.DARK_BROWN);
                    // Custard sauce dripping down sides
                    for (let i = 0; i < 5; i++) {
                        const dripX = pedestalX + 5 + i * 8;
                        gfx.fillRect(dripX, pedestalY + 12, 4, 8, game.GOLD);
                        gfx.fillCircle(dripX + 2, pedestalY + 20, 3, game.GOLD);
                        gfx.drawPixel(dripX + 1, pedestalY + 11, game.YELLOW);
                    }
                    // Whipped cream swirl on top
                    gfx.fillCircle(pedestalX + 20, pedestalY - 20, 12, game.WHITE);
                    gfx.fillCircle(pedestalX + 20, pedestalY - 22, 10, game.WHITE);
                    gfx.fillCircle(pedestalX + 17, pedestalY - 24,  7, game.WHITE);
                    gfx.fillCircle(pedestalX + 22, pedestalY - 26,  5, game.WHITE);
                    gfx.fillCircle(pedestalX + 19, pedestalY - 28,  4, game.WHITE);
                    gfx.drawLine(pedestalX + 16, pedestalY - 20, pedestalX + 24, pedestalY - 20, game.LIGHT_GRAY);
                    gfx.drawLine(pedestalX + 15, pedestalY - 24, pedestalX + 22, pedestalY - 24, game.LIGHT_GRAY);
                    // Maraschino cherry on top (with stem)
                    gfx.drawLine(pedestalX + 20, pedestalY - 31, pedestalX + 22, pedestalY - 34, game.GREEN);
                    gfx.fillCircle(pedestalX + 22, pedestalY - 36, 5, game.RED);
                    gfx.fillCircle(pedestalX + 21, pedestalY - 38, 3, game.LIGHT_RED);
                    gfx.drawPixel(pedestalX + 20, pedestalY - 39, game.WHITE);
                    // Mint garnish
                    gfx.fillPolygon([
                        {x: pedestalX + 15, y: pedestalY - 32},
                        {x: pedestalX + 10, y: pedestalY - 38},
                        {x: pedestalX + 18, y: pedestalY - 35}
                    ], game.GREEN);
                    // Magical sparkle ring around pudding
                    for (let i = 0; i < 12; i++) {
                        const angle = (i / 12) * Math.PI * 2;
                        const gx = pedestalX + 20 + Math.cos(angle) * 30;
                        const gy = pedestalY  - 5 + Math.sin(angle) * 22;
                        gfx.drawPixel(gx, gy, i % 3 === 0 ? game.YELLOW : (i % 3 === 1 ? game.WHITE : game.GOLD));
                        if (i % 2 === 0) gfx.drawPixel(gx + 1, gy, game.YELLOW);
                    }
                }
                
                // Cave stalactites
                for (let i = 0; i < 8; i++) {
                    const x = 80 + i * 75;
                    const length = 20 + (i % 3) * 15;
                    gfx.fillPolygon([
                        {x: x - 8, y: 180},
                        {x: x + 8, y: 180},
                        {x: x, y: 180 + length}
                    ], game.DARK_GRAY);
                }
                
                // Dim cave lighting (torches on walls)
                gfx.fillRect(50, 220, 8, 20, game.BROWN);
                gfx.fillPolygon([
                    {x: 54, y: 215},
                    {x: 50, y: 220},
                    {x: 58, y: 220}
                ], game.RED);
                
                gfx.fillRect(580, 220, 8, 20, game.BROWN);
                gfx.fillPolygon([
                    {x: 584, y: 215},
                    {x: 580, y: 220},
                    {x: 588, y: 220}
                ], game.RED);
            },
            onTalk: (game, noun) => {
                if (noun && noun.includes('dragon')) {
                    if (!game.gameState.dragonDeepAsleep) {
                        game.die("You clear your throat to address the dragon.\n\nThe dragon opens one eye.\n\nYou remember that waking dragons is widely considered poor life strategy.\nThe dragon's opinion on being woken for conversation is\neven less favourable than its opinion on pudding theft.");
                    } else {
                        game.displayText("The dragon is in a deep, lullaby-assisted slumber.");
                        game.displayText("It mumbles something about mountains and treasure.");
                        game.displayText("You wisely do not reply.");
                    }
                } else {
                    game.displayText("You speak into the cave. The echo sounds back three seconds later.");
                    game.displayText("The dragon sleeps. The pudding waits. What are you doing?");
                }
            }
        }
    },
    
    objects: {
        royal_pudding: {
            name: 'royal pudding',
            description: 'The magnificent Royal Pudding! It shimmers with buttery goodness and smells of vanilla and triumph.',
            location: 'dragon_lair',
            takeable: true,
            aliases: ['pudding'],
            onExamine: (game) => {
                game.displayText("The dome of cream. The crown of cherries. The golden glaze.");
                game.displayText("You feel a powerful emotional response simply looking at it.");
                game.displayText("If you could just... reach out... take it... but the dragon might hear...");
                if (!game.gameState.dragonDeepAsleep) {
                    game.displayText("(The dragon stirs slightly. Maybe deepen its sleep first.)");
                }
            },
            onTake: (game) => {
                if (!game.gameState.dragonDeepAsleep) {
                    game.die("You reach for the Royal Pudding.\n\nThe dragon's eye opens.\nBoth eyes open.\n\nOne great claw descends very quickly.\n\nYou learn, in your final moments, that dragons are extremely\npossessive about creamy desserts. You should have used the lullaby disc.");
                    return;
                }
                game.displayText("\nYou carefully lift the Royal Pudding from its pedestal...");
                game.displayText("The dragon snores in deep, lullaby-assisted contentment.");
                game.displayText("You've got the pudding! NOW RUN BACK TO THE CASTLE!");
                game.addScore(50);
            }
        },
        
        magic_bean: {
            name: 'magic bean',
            description: 'A peculiar bean that tingles with magical energy.',
            location: 'deep_forest',
            takeable: true,
            aliases: ['bean'],
            onExamine: (game) => {
                game.displayText("A single bean, glowing faintly green with contained magical energy.");
                game.displayText("It smells faintly of... Brussels sprouts? How unfortunate.");
                game.displayText("No wonder the King hates vegetables. The wizard has a lot to answer for.");
                if (!game.gameState.wizardHappy) {
                    game.displayText("(The wizard should be very interested in this bean.)");
                }
            },
            onTake: (game) => {
                if (!game.gameState.gnomeHelped) {
                    game.displayText("The gnome blocks your way! You can't take it yet.");
                    game.objects.magic_bean.location = 'deep_forest';
                    const idx = game.inventory.indexOf('magic_bean');
                    if (idx > -1) game.inventory.splice(idx, 1);
                    return;
                }
                game.displayText("You take the magic bean. It glows faintly and hums with possibility.");
                game.addScore(15);
            },
            onUse: (game) => {
                if (game.currentRoom !== 'forest_clearing') {
                    game.displayText("Find some fertile soil to plant this in.");
                    return;
                }
                if (!game.gameState.wizardHappy) {
                    game.displayText("The bean glows feebly. Show it to the wizard first.");
                    return;
                }
                if (game.gameState.beanstalkGrown) {
                    game.displayText("The beanstalk is already growing magnificently!");
                    return;
                }
                game.displayText("You plant the magic bean in the fertile soil...");
                game.displayText("\nThe ground rumbles! The bean sprouts and grows...");
                game.displayText("and GROWS... and GROWS!");
                game.displayText("\nA massive beanstalk now reaches into the clouds!");
                game.displayText("You can CLIMB UP to reach the clouds!");
                game.gameState.beanstalkGrown = true;
                game.removeFromInventory('magic_bean');
                game.rooms.forest_clearing.exits.up = 'cloud_realm';
                game.addScore(30);
            }
        },

        golden_key: {
            name: 'golden key',
            description: 'An ornate golden key with a crown engraved on its handle. It looks important.',
            location: 'courtyard',
            takeable: true,
            aliases: ['key'],
            onExamine: (game) => {
                game.displayText("An ornate golden key, a tiny crown engraved on the handle.");
                game.displayText("The shaft is stamped: 'CASTLE MASTER KEY — DO NOT DUPLICATE'.");
                game.displayText("Someone has clearly duplicated it. (You can tell from the filing marks.)");
                game.displayText("Near the courtyard fountain there seems to be a lock that might fit this...");
            },
            onTake: (game) => {
                game.displayText("You pick up the golden key. Something about it feels important.");
                game.gameState.hasKey = true;
                game.addScore(10);
            },
            onUse: (game, target) => {
                if (game.currentRoom === 'courtyard') {
                    game.rooms.courtyard.onAction(game, 'use', 'music box', 'key');
                } else if (target && (target.includes('box') || target.includes('music') || target.includes('chest') || target.includes('lock'))) {
                    game.displayText("That box isn't here. The music box is near the courtyard fountain.");
                } else {
                    game.displayText("The key shimmers suggestively. It's looking for something to unlock.");
                    game.displayText("(Try using it near the courtyard fountain.)");
                }
            }
        },

        lullaby_disc: {
            name: 'lullaby disc',
            description: 'A silver enchanted disc inscribed with musical notation. It hums gently when held.',
            location: null,
            takeable: true,
            aliases: ['disc', 'disk', 'lullaby', 'silver disc', 'music disc', 'enchanted disc'],
            onExamine: (game) => {
                game.displayText("The disc is inscribed with curling musical notation in silver ink.");
                game.displayText("Margins are annotated: 'Proven effective on: bears (3/3), trolls (1/3),");
                game.displayText("one very confused knight (still unclear). Side effects: prophetic dreams.'");
                game.displayText("'USE in presence of sleeping creature to amplify slumber tenfold.'");
            },
            onTake: (game) => {
                game.displayText("You pick up the lullaby disc. It hums softly and pleasantly.");
                game.displayText("A note is attached: 'INSTRUCTIONS: Hold near sleeping creature. Hum along.'");
                game.addScore(10);
            },
            onUse: (game, target) => {
                if (game.currentRoom !== 'dragon_lair') {
                    game.displayText("You hum along with the disc. It produces a beautiful melody.");
                    game.displayText("A nearby butterfly falls asleep mid-flutter. Oops. Not the right audience.");
                    return;
                }
                if (game.gameState.lullabyUsed) {
                    game.displayText("The dragon is already in a lullaby-deepened slumber.");
                    game.displayText("The pudding is right there. Take it!");
                    return;
                }
                game.displayText("You hold out the lullaby disc and begin to hum.");
                game.displayText("The disc glows a warm silver-blue. A gentle melody fills the cave.");
                game.displayText("The dragon's freight-train snoring softens... to a contented purr.");
                game.displayText("Its muscles relax completely. It smiles very slightly in its sleep.");
                game.displayText("\nThe dragon is now in a deep, magically-enhanced lullaby slumber.");
                game.displayText("The pudding is yours for the TAKING!\n");
                game.gameState.dragonDeepAsleep = true;
                game.gameState.lullabyUsed = true;
                game.addScore(25);
            }
        }    }
};