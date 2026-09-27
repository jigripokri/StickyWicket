/** Option lists for Kaveer's Monster Party creator. Kept tiny and emoji-first
 *  so a 5-year-old can pick by picture alone. */

export interface Tile {
  id: string;
  label: string;
  emoji: string;
  /** How it's described to the image model. */
  prompt: string;
}

export interface ColorTile {
  id: string;
  label: string;
  prompt: string;
  css: string;
}

export const CREATURES: Tile[] = [
  { id: "monster", label: "Monster", emoji: "👾", prompt: "fluffy round monster" },
  { id: "unicorn", label: "Unicorn", emoji: "🦄", prompt: "unicorn with a sparkly horn" },
  { id: "princess", label: "Princess", emoji: "👸", prompt: "princess in a sparkly gown" },
  { id: "dragon", label: "Dragon", emoji: "🐉", prompt: "baby dragon" },
  { id: "dino", label: "Dinosaur", emoji: "🦖", prompt: "baby dinosaur" },
  { id: "robot", label: "Robot", emoji: "🤖", prompt: "friendly robot" },
  { id: "fairy", label: "Fairy", emoji: "🧚", prompt: "fairy with glittery wings" },
  { id: "kitty", label: "Kitty", emoji: "🐱", prompt: "kitten" },
  { id: "puppy", label: "Puppy", emoji: "🐶", prompt: "puppy" },
  { id: "superhero", label: "Superhero", emoji: "🦸", prompt: "kid superhero" },
  { id: "mermaid", label: "Mermaid", emoji: "🧜‍♀️", prompt: "mermaid" },
  { id: "me", label: "Me!", emoji: "📸", prompt: "birthday party superstar" },
];

export const COLORS: ColorTile[] = [
  { id: "red", label: "Red", prompt: "bright red", css: "#FF5A5F" },
  { id: "orange", label: "Orange", prompt: "bright orange", css: "#FF9F1C" },
  { id: "yellow", label: "Yellow", prompt: "sunny yellow", css: "#FFD93D" },
  { id: "green", label: "Green", prompt: "lime green", css: "#6BCB77" },
  { id: "blue", label: "Blue", prompt: "sky blue", css: "#4D96FF" },
  { id: "purple", label: "Purple", prompt: "purple", css: "#B57EDC" },
  { id: "pink", label: "Pink", prompt: "bubblegum pink", css: "#FF8FCF" },
  { id: "teal", label: "Teal", prompt: "turquoise", css: "#2EC4B6" },
  {
    id: "rainbow",
    label: "Rainbow",
    prompt: "rainbow striped",
    css: "linear-gradient(135deg,#FF5A5F,#FFD93D,#6BCB77,#4D96FF,#B57EDC)",
  },
];

export const HAIR_STYLES: Tile[] = [
  { id: "spiky", label: "Spiky", emoji: "⚡", prompt: "spiky" },
  { id: "curly", label: "Curly", emoji: "🌀", prompt: "big curly" },
  { id: "long", label: "Long", emoji: "💇", prompt: "long flowing" },
  { id: "pigtails", label: "Pigtails", emoji: "🎀", prompt: "pigtails" },
  { id: "mohawk", label: "Mohawk", emoji: "🦔", prompt: "tall mohawk" },
  { id: "fluffy", label: "Fluffy", emoji: "☁️", prompt: "huge fluffy cloud-like" },
  { id: "braids", label: "Braids", emoji: "🧶", prompt: "braided" },
  { id: "none", label: "No hair", emoji: "🥚", prompt: "no hair" },
];

export const EXTRAS: Tile[] = [
  { id: "glasses", label: "Glasses", emoji: "👓", prompt: "big round glasses" },
  { id: "sunglasses", label: "Sunglasses", emoji: "🕶️", prompt: "cool sunglasses" },
  { id: "crown", label: "Crown", emoji: "👑", prompt: "a golden crown" },
  { id: "partyhat", label: "Party hat", emoji: "🥳", prompt: "a striped party hat" },
  { id: "bow", label: "Bow", emoji: "🎀", prompt: "a big bow" },
  { id: "wings", label: "Wings", emoji: "🦋", prompt: "butterfly wings" },
  { id: "cape", label: "Cape", emoji: "🦸", prompt: "a superhero cape" },
  { id: "balloon", label: "Balloon", emoji: "🎈", prompt: "a bunch of balloons" },
  { id: "cake", label: "Cake", emoji: "🎂", prompt: "a birthday cake with 5 candles" },
  { id: "wand", label: "Magic wand", emoji: "🪄", prompt: "a sparkling magic wand" },
  { id: "guitar", label: "Guitar", emoji: "🎸", prompt: "an electric guitar" },
  { id: "rocket", label: "Rocket", emoji: "🚀", prompt: "a toy rocket" },
];

export const MAX_EXTRAS = 3;

export const QUICK_MESSAGES = [
  "Happy Birthday Kaveer! 🎂",
  "You are my best friend! 💛",
  "Have the best day ever! 🎉",
  "Let's play together! 🎈",
  "You are 5! Hooray! 🖐️",
];

export const GENERATING_LINES = [
  "Mixing the colors... 🎨",
  "Fluffing the hair... 💇",
  "Adding sparkles... ✨",
  "Teaching it to smile... 😁",
  "Blowing up balloons... 🎈",
  "Almost ready... 🥁",
];

export interface MonsterMeta {
  id: number;
  name: string;
  message: string;
  creature: string;
  createdAt: string;
}
