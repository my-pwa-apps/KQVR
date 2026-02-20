# King's Quest VR: The Magical Mishap

A Sierra-style adventure game with VR support! Experience classic point-and-click (or rather, type-and-click) adventure gaming in both traditional 2D and immersive VR modes.

## 🎮 Story

You are Sir Graham, a brave knight with an unusual quest: The court wizard's spell went awry and accidentally teleported the kingdom's Royal Pudding to a dragon's lair! The King is VERY upset about his dessert, and you must retrieve it before dinner time!

Navigate through enchanted forests, solve puzzles, outwit a grumpy gnome, climb a magical beanstalk, and face a sleeping dragon—all to save the kingdom's most important treasure: the Royal Pudding!

## ✨ Features

- **Classic Sierra AGI-style graphics** - Authentic 16-color EGA palette and pixel art aesthetic
- **Text parser adventure gameplay** - Type commands like LOOK, GET, USE, TALK, GO NORTH, etc.
- **VR Support** - Experience the game in immersive VR using WebXR
- **Original story** - An all-new King's Quest adventure with Sierra-style humor
- **Puzzle solving** - Riddles, item combinations, and classic adventure game logic
- **Score system** - Earn points for solving puzzles (150 points possible)
- **Multiple rooms** - Explore castle, forest, cloud realm, and dragon's lair

## 🎯 Game Commands

### Movement
- `NORTH`, `SOUTH`, `EAST`, `WEST`, `UP`, `DOWN` (or `N`, `S`, `E`, `W`, `U`, `D`)
- `GO [direction]`

### Actions
- `LOOK` or `L` - Look at current room
- `EXAMINE [object]` or `X [object]` - Examine something closely
- `GET [object]` or `TAKE [object]` - Pick up an item
- `DROP [object]` - Drop an item from inventory
- `USE [object]` - Use an item
- `TALK [person]` - Talk to someone
- `GIVE [object]` - Give an item to someone
- `CLIMB [object]` - Climb something
- `INVENTORY` or `I` - Check what you're carrying
- `HELP` - Show command list

## 🚀 How to Run

### Option 1: Simple HTTP Server (Recommended)

1. Install Node.js if you haven't already
2. Navigate to the game directory:
   ```powershell
   cd "c:\Users\bartm\OneDrive - Microsoft\Documents\Git Repos\KQVR"
   ```

3. Install dependencies:
   ```powershell
   npm install
   ```

4. Start the server:
   ```powershell
   npm start
   ```

5. The game will open in your browser automatically at `http://localhost:8080`

### Option 2: Using Python

If you have Python installed:

```powershell
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Then open `http://localhost:8080` in your browser.

### Option 3: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🥽 VR Mode

To experience the game in VR:

1. You need a WebXR-compatible VR headset (Oculus Quest, HTC Vive, etc.)
2. Open the game in a WebXR-compatible browser (Chrome, Edge, or Firefox Reality)
3. Click the "Enter VR Mode" button
4. Put on your headset and enjoy!

**Note:** VR mode provides an immersive 3D environment where you can look around the rooms. Text input still requires a keyboard, so VR works best with a wireless keyboard or voice typing.

## 🎪 Walkthrough (Spoilers!)

<details>
<summary>Click to reveal walkthrough</summary>

1. Start at castle gate, talk to guard
2. Go NORTH to courtyard
3. Go WEST to wizard's tower, talk to wizard
4. Go EAST back to courtyard, go SOUTH to castle gate
5. Go EAST to forest path
6. Go EAST to deep forest
7. Talk to gnome, answer riddle: "MOUNTAIN"
8. Take magic bean
9. Go WEST to forest path, go NORTH to forest clearing
10. Go WEST back to courtyard, go WEST to wizard's tower
11. Give bean to wizard
12. Go back to forest clearing: EAST, SOUTH, EAST, NORTH
13. Use magic bean in clearing
14. Climb beanstalk (or GO UP)
15. Go NORTH to dragon lair
16. Take royal pudding (quietly!)
17. Return to throne room: SOUTH, DOWN, SOUTH, WEST, NORTH, NORTH
18. WIN!

</details>

## 🎨 Sierra-Style Easter Eggs

Try typing these classic adventure game commands:
- `XYZZY`
- `PLUGH`
- `HINT`

## 🛠️ Technical Details

- Built with vanilla JavaScript
- Three.js for 3D rendering and VR support
- WebXR API for VR integration
- Classic canvas-based 2D rendering for retro aesthetic
- Text parser using command/noun parsing
- State-based room system

## 📝 Credits

Inspired by Sierra On-Line's classic King's Quest series (1984-1998), created by Roberta Williams.

This is a fan tribute created with love for the classic adventure game genre.

## 🎮 Tips for Playing

1. **Read everything carefully** - Room descriptions contain important clues
2. **Talk to everyone** - NPCs provide hints and advance the story
3. **Examine everything** - You might discover hidden details
4. **Try different command combinations** - Adventure games reward experimentation
5. **Save... oh wait, you can't die!** - Unlike the original Sierra games, this one is forgiving!

## 🐛 Known Issues

- VR mode requires a WebXR-compatible device and browser
- Text input in VR mode requires a physical or virtual keyboard
- Some browsers may not support all WebXR features

## 📄 License

MIT License - Feel free to modify and expand this game!

---

**Remember:** This is a Sierra game, so expect:
- Puns and wordplay
- Slightly absurd situations
- Characters with personality
- A sense of humor about itself

Have fun, and may your pudding remain un-teleported! 🍮✨
