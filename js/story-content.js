// Story Content - Rooms, Objects, and Puzzles
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
                
                // Guard (Sierra AGI style)
                // Body
                gfx.fillRect(145, 270, 14, 25, game.RED);
                // Legs
                gfx.fillRect(147, 295, 4, 15, game.BROWN);
                gfx.fillRect(155, 295, 4, 15, game.BROWN);
                // Head/helmet
                gfx.fillCircle(152, 263, 7, game.LIGHT_GRAY);
                // Spear
                gfx.drawLine(165, 250, 165, 300, game.BROWN);
                gfx.fillPolygon([
                    {x: 163, y: 245},
                    {x: 167, y: 245},
                    {x: 165, y: 250}
                ], game.LIGHT_GRAY);
                
                // Bushes/shrubs
                gfx.fillCircle(80, 310, 25, game.GREEN);
                gfx.fillCircle(100, 315, 20, game.DARK_GRAY);
                gfx.fillCircle(560, 310, 25, game.GREEN);
                gfx.fillCircle(540, 315, 20, game.DARK_GRAY);
            },
            onTalk: (game, noun) => {
                if (noun && noun.includes('guard')) {
                    game.displayText("Guard: 'His Majesty is most distressed! The Royal Pudding has");
                    game.displayText("vanished! Some say a dragon took it. You must retrieve it,");
                    game.displayText("Sir Graham, or we'll all be eating brussels sprouts for dessert!'");
                } else {
                    game.displayText("The guard looks too worried to chat.");
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
                
                // Concerned servants running about
                const servants = [
                    { x: 160, y: 300, dir: 1 },
                    { x: 400, y: 270, dir: -1 },
                    { x: 520, y: 320, dir: 1 },
                    { x: 250, y: 340, dir: -1 },
                    { x: 80, y: 280, dir: 1 },
                ];
                const frameOffset = Math.floor(Date.now() / 300) % 4;
                for (let s = 0; s < servants.length; s++) {
                    const sv = servants[s];
                    const bob = (frameOffset + s) % 2 === 0 ? 0 : -1;
                    // Scale servants by row (farther = smaller)
                    const scale = 0.6 + (sv.y - 230) / 250;
                    const h = Math.floor(14 * scale);
                    const w = Math.floor(8 * scale);
                    const headR = Math.floor(4 * scale);
                    
                    // Tunic (alternating colors per servant)
                    const tunicColors = [game.BLUE, game.RED, game.BROWN, game.GREEN, game.DARK_GRAY];
                    const tc = tunicColors[s % tunicColors.length];
                    // Body
                    gfx.fillRect(sv.x - w / 2, sv.y - h + bob, w, h, tc);
                    // Apron
                    gfx.fillRect(sv.x - w / 4, sv.y - h + 2 + bob, w / 2, h - 4, game.WHITE);
                    // Head
                    gfx.fillCircle(sv.x, sv.y - h - headR + 1 + bob, headR, game.BROWN);
                    // Legs (alternating step pose)
                    const legOff = ((frameOffset + s) % 2 === 0) ? 2 : -1;
                    gfx.fillRect(sv.x - 3, sv.y + bob, 2, Math.floor(5 * scale), game.BROWN);
                    gfx.fillRect(sv.x + 1 + legOff, sv.y + bob, 2, Math.floor(5 * scale), game.BROWN);
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
                
                // Wizard Ignatius (detailed Sierra AGI style)
                const wizX = 180;
                const wizY = 260;
                
                // Robe
                gfx.fillPolygon([
                    {x: wizX - 12, y: wizY - 15},
                    {x: wizX + 12, y: wizY - 15},
                    {x: wizX + 16, y: wizY + 25},
                    {x: wizX - 16, y: wizY + 25}
                ], game.BLUE);
                
                // Robe stars and moons
                gfx.drawPixel(wizX - 8, wizY - 5, game.YELLOW);
                gfx.drawPixel(wizX + 6, wizY, game.YELLOW);
                gfx.drawPixel(wizX - 4, wizY + 10, game.YELLOW);
                
                // Sleeves/arms
                gfx.fillRect(wizX - 20, wizY - 8, 10, 18, game.BLUE);
                gfx.fillRect(wizX + 10, wizY - 8, 10, 18, game.BLUE);
                
                // Hands
                gfx.fillRect(wizX - 21, wizY + 8, 4, 4, game.BROWN);
                gfx.fillRect(wizX + 17, wizY + 8, 4, 4, game.BROWN);
                
                // Head
                gfx.fillCircle(wizX, wizY - 25, 8, game.BROWN);
                
                // Wizard hat
                gfx.fillPolygon([
                    {x: wizX - 14, y: wizY - 23},
                    {x: wizX - 4, y: wizY - 43},
                    {x: wizX + 6, y: wizY - 23}
                ], game.MAGENTA);
                
                // Hat brim
                gfx.fillRect(wizX - 16, wizY - 23, 22, 3, game.MAGENTA);
                
                // Beard
                gfx.fillPolygon([
                    {x: wizX - 7, y: wizY - 20},
                    {x: wizX + 7, y: wizY - 20},
                    {x: wizX + 5, y: wizY - 12},
                    {x: wizX - 5, y: wizY - 12}
                ], game.WHITE);
                
                // Staff in hand
                gfx.drawLine(wizX - 22, wizY + 10, wizX - 22, wizY - 30, game.BROWN);
                gfx.fillCircle(wizX - 22, wizY - 32, 5, game.LIGHT_CYAN);
                
                // Magic sparkles if wizard is happy
                if (state.wizardHappy) {
                    for (let i = 0; i < 6; i++) {
                        const angle = (i / 6) * Math.PI * 2;
                        const px = wizX - 22 + Math.cos(angle) * 8;
                        const py = wizY - 32 + Math.sin(angle) * 8;
                        gfx.drawPixel(px, py, game.YELLOW);
                    }
                }
                
                // Window showing starry sky
                gfx.fillRect(360, 140, 60, 70, game.BLACK);
                // Stars
                for (let i = 0; i < 12; i++) {
                    gfx.drawPixel(365 + Math.random() * 50, 145 + Math.random() * 60, game.WHITE);
                }
            },
            onTalk: (game, noun) => {
                if (noun && (noun.includes('wizard') || noun.includes('ignatius'))) {
                    if (!game.gameState.wizardHappy) {
                        game.displayText("Wizard: 'Oh dear, oh my! I was trying to conjure a simple");
                        game.displayText("cleaning spell, but I sneezed mid-incantation! The pudding");
                        game.displayText("just... WHOOSHED away! I think it went to Dragon Mountain.");
                        game.displayText("If you bring me a MAGIC BEAN, I can help you!'");
                    } else {
                        game.displayText("Wizard: 'The beanstalk should grow if you plant the bean");
                        game.displayText("in fertile soil. Try the forest clearing!'");
                    }
                } else {
                    game.displayText("The wizard nervously fidgets with his wand.");
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
                
                // Throne
                // Seat
                gfx.fillRect(300, 170, 40, 20, game.YELLOW);
                // Back
                gfx.fillPolygon([
                    {x: 298, y: 170},
                    {x: 342, y: 170},
                    {x: 338, y: 130},
                    {x: 302, y: 130}
                ], game.YELLOW);
                
                // Throne decorations
                gfx.fillCircle(310, 140, 8, game.RED);
                gfx.fillCircle(330, 140, 8, game.RED);
                
                // Armrests
                gfx.fillRect(295, 175, 8, 15, game.YELLOW);
                gfx.fillRect(337, 175, 8, 15, game.YELLOW);
                
                // King sitting on throne
                const kingX = 320;
                const kingY = 170;
                
                // Robe
                gfx.fillPolygon([
                    {x: kingX - 14, y: kingY - 5},
                    {x: kingX + 14, y: kingY - 5},
                    {x: kingX + 16, y: kingY + 20},
                    {x: kingX - 16, y: kingY + 20}
                ], game.MAGENTA);
                
                // Ermine trim
                for (let i = 0; i < 4; i++) {
                    gfx.drawPixel(kingX - 10 + i * 7, kingY + 15, game.WHITE);
                }
                
                // Arms on armrests
                gfx.fillRect(kingX - 20, kingY, 10, 12, game.MAGENTA);
                gfx.fillRect(kingX + 10, kingY, 10, 12, game.MAGENTA);
                
                // Head
                gfx.fillCircle(kingX, kingY - 15, 9, game.BROWN);
                
                // Beard
                gfx.fillPolygon([
                    {x: kingX - 8, y: kingY - 10},
                    {x: kingX + 8, y: kingY - 10},
                    {x: kingX + 6, y: kingY - 2},
                    {x: kingX - 6, y: kingY - 2}
                ], game.WHITE);
                
                // Crown
                gfx.fillRect(kingX - 10, kingY - 24, 20, 5, game.YELLOW);
                for (let i = 0; i < 3; i++) {
                    gfx.fillPolygon([
                        {x: kingX - 8 + i * 8, y: kingY - 24},
                        {x: kingX - 6 + i * 8, y: kingY - 30},
                        {x: kingX - 4 + i * 8, y: kingY - 24}
                    ], game.YELLOW);
                    gfx.drawPixel(kingX - 6 + i * 8, kingY - 31, game.RED);
                }
                
                // Scepter in hand
                gfx.drawLine(kingX + 15, kingY + 8, kingX + 15, kingY - 10, game.YELLOW);
                gfx.fillCircle(kingX + 15, kingY - 12, 4, game.RED);
                
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
                
                // Torches on walls
                for (let i = 0; i < 3; i++) {
                    const x = 120 + i * 200;
                    gfx.fillRect(x, 180, 6, 20, game.BROWN);
                    gfx.fillPolygon([
                        {x: x + 3, y: 175},
                        {x: x, y: 180},
                        {x: x + 6, y: 180}
                    ], game.YELLOW);
                    gfx.drawPixel(x + 2, 172, game.RED);
                }
            },
            onTalk: (game, noun) => {
                if (noun && noun.includes('king')) {
                    game.displayText("King: 'WHERE IS MY PUDDING?! That wizard bumbled again!");
                    game.displayText("No pudding, no dessert, no HAPPINESS! Retrieve it, Graham,");
                    game.displayText("or I shall have to eat... VEGETABLES!'");
                    game.displayText("\n(The King looks horrified at the thought.)");
                } else {
                    game.displayText("The King drums his fingers impatiently.");
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
                for (let i = 0; i < 20; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const dist = 50 + Math.random() * 70;
                    const x = 320 + Math.cos(angle) * dist;
                    const y = 310 + Math.sin(angle) * (dist * 0.5);
                    
                    const colors = [game.RED, game.YELLOW, game.LIGHT_MAGENTA, game.WHITE];
                    gfx.drawPixel(x, y, colors[Math.floor(Math.random() * colors.length)]);
                    gfx.drawPixel(x + 1, y, game.LIGHT_GREEN);
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
            onUse: (game, noun) => {
                if (noun && noun.includes('bean') && game.gameState.hasMagicBean && 
                    game.gameState.wizardHappy && !game.gameState.beanstalkGrown) {
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
                
                // Gnome (detailed Sierra AGI character)
                if (!state.gnomeHelped) {
                    const gnomeX = 450;
                    const gnomeY = 280;
                    
                    // Body (red outfit)
                    gfx.fillPolygon([
                        {x: gnomeX - 10, y: gnomeY - 8},
                        {x: gnomeX + 10, y: gnomeY - 8},
                        {x: gnomeX + 12, y: gnomeY + 15},
                        {x: gnomeX - 12, y: gnomeY + 15}
                    ], game.RED);
                    
                    // Legs
                    gfx.fillRect(gnomeX - 8, gnomeY + 15, 6, 12, game.BLUE);
                    gfx.fillRect(gnomeX + 2, gnomeY + 15, 6, 12, game.BLUE);
                    
                    // Boots
                    gfx.fillRect(gnomeX - 9, gnomeY + 26, 7, 4, game.BROWN);
                    gfx.fillRect(gnomeX + 2, gnomeY + 26, 7, 4, game.BROWN);
                    
                    // Arms folded (grumpy stance)
                    gfx.fillRect(gnomeX - 14, gnomeY - 2, 8, 10, game.RED);
                    gfx.fillRect(gnomeX + 6, gnomeY - 2, 8, 10, game.RED);
                    
                    // Head
                    gfx.fillCircle(gnomeX, gnomeY - 18, 10, game.BROWN);
                    
                    // Long white beard
                    gfx.fillPolygon([
                        {x: gnomeX - 8, y: gnomeY - 13},
                        {x: gnomeX + 8, y: gnomeY - 13},
                        {x: gnomeX + 7, y: gnomeY + 5},
                        {x: gnomeX - 7, y: gnomeY + 5}
                    ], game.WHITE);
                    
                    // Beard texture
                    for (let i = 0; i < 5; i++) {
                        gfx.drawLine(gnomeX - 6 + i * 3, gnomeY - 12, gnomeX - 6 + i * 3, gnomeY + 3, game.LIGHT_GRAY);
                    }
                    
                    // Pointy red hat
                    gfx.fillPolygon([
                        {x: gnomeX - 12, y: gnomeY - 16},
                        {x: gnomeX, y: gnomeY - 35},
                        {x: gnomeX + 12, y: gnomeY - 16}
                    ], game.RED);
                    
                    // Hat tip flop
                    gfx.fillCircle(gnomeX + 2, gnomeY - 35, 4, game.RED);
                    
                    // Grumpy eyes (just visible)
                    gfx.drawPixel(gnomeX - 4, gnomeY - 18, game.BLACK);
                    gfx.drawPixel(gnomeX + 4, gnomeY - 18, game.BLACK);
                    
                    // Nose poking through beard
                    gfx.fillPolygon([
                        {x: gnomeX - 2, y: gnomeY - 14},
                        {x: gnomeX, y: gnomeY - 11},
                        {x: gnomeX + 2, y: gnomeY - 14}
                    ], game.BROWN);
                    
                    // Magic bean in bag at feet
                    gfx.fillRect(gnomeX + 15, gnomeY + 25, 10, 8, game.BROWN);
                    gfx.drawPixel(gnomeX + 18, gnomeY + 27, game.LIGHT_GREEN);
                }
                
                // Mysterious fog
                for (let i = 0; i < 20; i++) {
                    const x = Math.random() * 640;
                    const y = 260 + Math.random() * 40;
                    gfx.drawPixel(x, y, game.LIGHT_GRAY);
                }
            },
            onTalk: (game, noun) => {
                if (!game.gameState.gnomeHelped) {
                    game.displayText("Gnome: 'I won't let you pass unless you answer my riddle!'");
                    game.displayText("'What has roots that nobody sees, is taller than trees,");
                    game.displayText("up, up, up it goes, and yet it never grows?'");
                    game.displayText("\n(Hint: Type your answer)");
                } else {
                    game.displayText("Gnome: 'Thanks for solving my riddle! Take the bean!'");
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
                
                // Candy decorations (colorful dots)
                for (let i = 0; i < 20; i++) {
                    const colors = [game.RED, game.YELLOW, game.LIGHT_CYAN, game.WHITE];
                    const x = castleX + 10 + Math.random() * 120;
                    const y = castleY + 10 + Math.random() * 110;
                    gfx.drawPixel(x, y, colors[Math.floor(Math.random() * colors.length)]);
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
                
                // Individual gold coins and treasures
                for (let i = 0; i < 40; i++) {
                    const x = goldX - 50 + Math.random() * 140;
                    const y = goldY + 20 + Math.random() * 40;
                    gfx.fillCircle(x, y, 4, game.YELLOW);
                    // Coin highlight
                    gfx.drawPixel(x - 1, y - 1, game.WHITE);
                }
                
                // Jewels in treasure
                for (let i = 0; i < 15; i++) {
                    const x = goldX - 40 + Math.random() * 120;
                    const y = goldY + 15 + Math.random() * 35;
                    const colors = [game.RED, game.CYAN, game.LIGHT_GREEN, game.LIGHT_MAGENTA];
                    gfx.fillPolygon([
                        {x: x, y: y - 3},
                        {x: x - 3, y: y},
                        {x: x, y: y + 3},
                        {x: x + 3, y: y}
                    ], colors[Math.floor(Math.random() * colors.length)]);
                }
                
                // Gold chalices
                for (let i = 0; i < 3; i++) {
                    const x = goldX - 30 + i * 50;
                    const y = goldY + 10;
                    gfx.fillRect(x, y, 10, 12, game.YELLOW);
                    gfx.fillRect(x - 3, y + 12, 16, 3, game.YELLOW);
                }
                
                // THE DRAGON (Detailed Sierra AGI style!)
                const dragonX = 200;
                const dragonY = 240;
                
                // Dragon body (sleeping, curled)
                gfx.fillPolygon([
                    {x: dragonX - 20, y: dragonY + 20},
                    {x: dragonX + 60, y: dragonY + 10},
                    {x: dragonX + 90, y: dragonY + 40},
                    {x: dragonX + 40, y: dragonY + 70},
                    {x: dragonX - 10, y: dragonY + 60}
                ], game.GREEN);
                
                // Dragon scales texture
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 4; j++) {
                        gfx.fillCircle(dragonX + i * 12, dragonY + 25 + j * 12, 5, game.DARK_GRAY);
                    }
                }
                
                // Dragon wing (folded)
                gfx.fillPolygon([
                    {x: dragonX + 30, y: dragonY + 15},
                    {x: dragonX + 10, y: dragonY},
                    {x: dragonX + 50, y: dragonY + 30}
                ], game.DARK_GRAY);
                
                // Wing membrane
                gfx.fillPolygon([
                    {x: dragonX + 30, y: dragonY + 15},
                    {x: dragonX + 15, y: dragonY + 5},
                    {x: dragonX + 45, y: dragonY + 25}
                ], game.GREEN);
                
                // Dragon tail (curled around)
                for (let i = 0; i < 8; i++) {
                    const angle = i * 0.4;
                    const x = dragonX + 70 + Math.cos(angle) * (20 + i * 3);
                    const y = dragonY + 50 + Math.sin(angle) * 15;
                    const size = 10 - i * 0.8;
                    gfx.fillCircle(x, y, size, game.GREEN);
                }
                
                // Tail spikes
                for (let i = 1; i < 6; i++) {
                    const angle = i * 0.4;
                    const x = dragonX + 70 + Math.cos(angle) * (20 + i * 3);
                    const y = dragonY + 50 + Math.sin(angle) * 15;
                    gfx.fillPolygon([
                        {x: x - 3, y: y},
                        {x: x, y: y - 6},
                        {x: x + 3, y: y}
                    ], game.DARK_GRAY);
                }
                
                // Dragon head (sleeping)
                gfx.fillCircle(dragonX - 20, dragonY + 35, 20, game.GREEN);
                
                // Snout
                gfx.fillPolygon([
                    {x: dragonX - 30, y: dragonY + 35},
                    {x: dragonX - 50, y: dragonY + 38},
                    {x: dragonX - 45, y: dragonY + 45},
                    {x: dragonX - 28, y: dragonY + 42}
                ], game.GREEN);
                
                // Nostrils
                gfx.fillCircle(dragonX - 43, dragonY + 40, 2, game.BLACK);
                gfx.fillCircle(dragonX - 48, dragonY + 41, 2, game.BLACK);
                
                // Closed eye
                gfx.drawLine(dragonX - 25, dragonY + 32, dragonX - 15, dragonY + 32, game.BLACK);
                
                // Horn
                gfx.fillPolygon([
                    {x: dragonX - 15, y: dragonY + 20},
                    {x: dragonX - 10, y: dragonY + 10},
                    {x: dragonX - 8, y: dragonY + 20}
                ], game.LIGHT_GRAY);
                
                // Smoke puff from nose (snoring)
                for (let i = 0; i < 5; i++) {
                    gfx.fillCircle(dragonX - 55 - i * 8, dragonY + 38 - i * 3, 4 + i, game.LIGHT_GRAY);
                }
                
                // ROYAL PUDDING PEDESTAL
                const pedestalX = 500;
                const pedestalY = 260;
                
                // Ornate pedestal
                gfx.fillRect(pedestalX, pedestalY + 20, 40, 60, game.LIGHT_GRAY);
                gfx.fillRect(pedestalX - 5, pedestalY + 80, 50, 8, game.LIGHT_GRAY);
                gfx.fillRect(pedestalX - 3, pedestalY + 15, 46, 10, game.LIGHT_GRAY);
                
                // Pedestal decorations
                for (let i = 0; i < 3; i++) {
                    gfx.fillRect(pedestalX + 5 + i * 12, pedestalY + 30 + i * 15, 8, 8, game.YELLOW);
                }
                
                // The Royal Pudding (if still there)
                if (game.objects.royal_pudding.location === 'dragon_lair') {
                    // Pudding bowl
                    gfx.fillPolygon([
                        {x: pedestalX + 5, y: pedestalY + 5},
                        {x: pedestalX + 35, y: pedestalY + 5},
                        {x: pedestalX + 32, y: pedestalY + 15},
                        {x: pedestalX + 8, y: pedestalY + 15}
                    ], game.YELLOW);
                    
                    // Pudding itself (glorious!)
                    gfx.fillCircle(pedestalX + 20, pedestalY, 18, game.BROWN);
                    // Pudding shine/glaze
                    gfx.fillCircle(pedestalX + 15, pedestalY - 3, 8, game.YELLOW);
                    // Cream on top
                    gfx.fillCircle(pedestalX + 20, pedestalY - 8, 10, game.WHITE);
                    // Cherry on top
                    gfx.fillCircle(pedestalX + 20, pedestalY - 14, 4, game.RED);
                    
                    // Magical glow around pudding
                    for (let i = 0; i < 8; i++) {
                        const angle = (i / 8) * Math.PI * 2;
                        const x = pedestalX + 20 + Math.cos(angle) * 25;
                        const y = pedestalY - 5 + Math.sin(angle) * 25;
                        gfx.drawPixel(x, y, game.YELLOW);
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
                    game.displayText("The dragon snores contentedly. Best not to wake it!");
                    game.displayText("(Maybe you should just quietly TAKE the pudding...)");
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
            onTake: (game) => {
                game.displayText("\nYou carefully lift the Royal Pudding from its pedestal...");
                game.displayText("The dragon's eye opens slightly, but then closes again.");
                game.displayText("You've got the pudding! Now get back to the castle!");
                game.addScore(50);
            }
        },
        
        magic_bean: {
            name: 'magic bean',
            description: 'A peculiar bean that tingles with magical energy.',
            location: 'deep_forest',
            takeable: true,
            aliases: ['bean'],
            onTake: (game) => {
                if (!game.gameState.gnomeHelped) {
                    game.displayText("The gnome blocks your way! You can't take it yet.");
                    game.objects.magic_bean.location = 'deep_forest';
                    const idx = game.inventory.indexOf('magic_bean');
                    if (idx > -1) game.inventory.splice(idx, 1);
                    return;
                }
                game.displayText("You take the magic bean. It glows faintly.");
                game.addScore(15);
            }
        },
        
        golden_key: {
            name: 'golden key',
            description: 'An ornate golden key with a crown engraved on its handle. It looks important.',
            location: 'courtyard',
            takeable: true,
            aliases: ['key'],
            onTake: (game) => {
                game.displayText("You pick up the golden key. Surely this will come in handy!");
                game.gameState.hasKey = true;
                game.addScore(10);
            }
        }
    }
};
