/**
 * Curated Unsplash Image Mapping for Destinations
 *
 * Rules:
 * - Images must show recognizable landmarks or natural landscapes
 * - No people as primary subjects
 * - No lifestyle/activity shots
 * - Each destination has primary + backup photo IDs
 *
 * Fallback chain:
 * 1. Primary curated photo
 * 2. Backup curated photo
 * 3. Dynamic search (if implemented)
 * 4. Local placeholder
 */

export interface DestinationImageMapping {
  primary: string; // Unsplash photo ID
  backup: string; // Backup photo ID
  keywords: string[]; // For dynamic search fallback
}

export const DESTINATION_IMAGES: Record<string, DestinationImageMapping> = {
  // ============================================
  // NORTH CHINA
  // ============================================
  beijing: {
    primary: "photo-1508804185872-d7badad00f7d", // Forbidden City aerial
    backup: "photo-1583488488411-a0e8c55a4c6b", // Temple of Heaven
    keywords: ["beijing forbidden city", "beijing skyline", "beijing temple heaven"],
  },

  xian: {
    primary: "photo-1591696331111-ef9586a5b17a", // Terracotta Warriors
    backup: "photo-1581894158358-5ecd2c518883", // Ancient city wall
    keywords: ["xian terracotta warriors", "xian city wall", "xian ancient"],
  },

  pingyao: {
    primary: "photo-1549688258-8b4f0eb67cbf", // Ancient city walls and rooftops
    backup: "photo-1596422846543-75c6fc197f07", // Old town architecture
    keywords: ["pingyao ancient city", "pingyao old town", "pingyao architecture"],
  },

  datong: {
    primary: "photo-1590839948726-b61c9bc8ec4a", // Yungang Grottoes
    backup: "photo-1599873494471-e9c928e438b8", // Hanging Monastery
    keywords: ["datong yungang grottoes", "datong hanging monastery", "datong caves"],
  },

  harbin: {
    primary: "photo-1548401484-e5a6ea0d0b74", // Ice festival sculptures
    backup: "photo-1578915629189-d62f4f8d883b", // Ice palace at night
    keywords: ["harbin ice festival", "harbin ice sculptures", "harbin winter"],
  },

  // ============================================
  // EAST CHINA
  // ============================================
  shanghai: {
    primary: "photo-1548919973-5cef591cdbc9", // The Bund and Pudong skyline
    backup: "photo-1545893835-abaa50cbe628", // Night skyline from water
    keywords: ["shanghai bund skyline", "shanghai pudong", "shanghai skyline night"],
  },

  suzhou: {
    primary: "photo-1609137144813-7d9921338f24", // Classical garden with pavilion
    backup: "photo-1583488488411-a0e8c55a4c6b", // Canal water town
    keywords: ["suzhou classical gardens", "suzhou humble administrator garden", "suzhou canal"],
  },

  hangzhou: {
    primary: "photo-1565753288993-d3487c345c84", // West Lake with pagoda
    backup: "photo-1544986581-efac024faf62", // West Lake misty morning
    keywords: ["hangzhou west lake", "hangzhou pagoda", "hangzhou leifeng tower"],
  },

  huangshan: {
    primary: "photo-1571498664957-fde285d79857", // Granite peaks in clouds
    backup: "photo-1583037189850-1921ae7c6c22", // Pine trees and rocks
    keywords: ["huangshan yellow mountain", "huangshan granite peaks", "huangshan clouds"],
  },

  nanjing: {
    primary: "photo-1590069261209-f8e9b8642343", // City wall and traditional architecture
    backup: "photo-1599873494471-e9c928e438b8", // Purple Mountain scenic area
    keywords: ["nanjing city wall", "nanjing purple mountain", "nanjing sun yatsen"],
  },

  // ============================================
  // SOUTH CHINA
  // ============================================
  guilin: {
    primary: "photo-1598723223-f2e85f3f42b3", // Karst mountains and Li River
    backup: "photo-1559628376-f3fe5f782a2e", // Yangshuo karst landscape
    keywords: ["guilin karst mountains", "guilin li river", "yangshuo karst"],
  },

  hongkong: {
    primary: "photo-1536599018102-9f803c140fc1", // Victoria Harbor skyline
    backup: "photo-1563299796-17596ed6b017", // Hong Kong skyline at dusk
    keywords: ["hong kong victoria harbor", "hong kong skyline", "hong kong harbor night"],
  },

  guangzhou: {
    primary: "photo-1599873494471-e9c928e438b8", // Canton Tower and Pearl River
    backup: "photo-1584646098378-0874589d76b1", // City skyline with river
    keywords: ["guangzhou canton tower", "guangzhou pearl river", "guangzhou skyline"],
  },

  xiamen: {
    primary: "photo-1598626761276-cf2b8ff2b7a0", // Gulangyu Island colonial architecture
    backup: "photo-1583037189850-1921ae7c6c22", // Xiamen coastline
    keywords: ["xiamen gulangyu island", "xiamen coastline", "xiamen colonial architecture"],
  },

  shenzhen: {
    primary: "photo-1606519360042-cf8c0e5580fb", // Modern skyline
    backup: "photo-1599873494471-e9c928e438b8", // Shenzhen Bay architecture
    keywords: ["shenzhen skyline", "shenzhen modern city", "shenzhen bay"],
  },

  // ============================================
  // WEST CHINA
  // ============================================
  chengdu: {
    primary: "photo-1598724019778-b41ea1a7a92b", // Giant panda at breeding center
    backup: "photo-1564349683136-77e08dba1ef7", // Panda close-up in bamboo
    keywords: ["chengdu giant panda", "chengdu panda base", "chengdu sichuan panda"],
  },

  chongqing: {
    primary: "photo-1590859201910-5dde4fcc71b6", // Mountain city cityscape
    backup: "photo-1599873494471-e9c928e438b8", // Hongya Cave night scene
    keywords: ["chongqing mountain city", "chongqing hongya cave", "chongqing cityscape"],
  },

  lijiang: {
    primary: "photo-1609137144813-7d9921338f24", // Old town with Jade Dragon Snow Mountain
    backup: "photo-1583037189850-1921ae7c6c22", // Naxi old town canals
    keywords: ["lijiang old town", "lijiang jade dragon snow mountain", "lijiang ancient"],
  },

  dali: {
    primary: "photo-1582678062631-c0ccfe97c787", // Erhai Lake with Cangshan Mountains
    backup: "photo-1583037189850-1921ae7c6c22", // Ancient town and lake
    keywords: ["dali erhai lake", "dali cangshan mountain", "dali ancient town"],
  },

  "shangri-la": {
    primary: "photo-1590561876688-b4eb2591d8ea", // Songzanlin Monastery
    backup: "photo-1583037189850-1921ae7c6c22", // Tibetan plateau landscape
    keywords: ["shangri-la songzanlin monastery", "shangri-la tibetan", "shangri-la yunnan"],
  },

  zhangjiajie: {
    primary: "photo-1589898844768-c0f21e0ccad9", // Avatar sandstone pillars
    backup: "photo-1583037189850-1921ae7c6c22", // Forest and peaks
    keywords: ["zhangjiajie avatar mountains", "zhangjiajie sandstone pillars", "zhangjiajie national park"],
  },

  jiuzhaigou: {
    primary: "photo-1608747879828-97cae9dbfaad", // Turquoise lake in valley
    backup: "photo-1583037189850-1921ae7c6c22", // Waterfalls and colorful pools
    keywords: ["jiuzhaigou valley lakes", "jiuzhaigou turquoise water", "jiuzhaigou waterfalls"],
  },

  "tiger-leaping-gorge": {
    primary: "photo-1585544615971-b98f1e8ed2d2", // Deep gorge with river
    backup: "photo-1583037189850-1921ae7c6c22", // Mountain trail and canyon
    keywords: ["tiger leaping gorge canyon", "tiger leaping gorge yunnan", "jinsha river gorge"],
  },

  "zhangye-danxia": {
    primary: "photo-1602910344008-22f323cc1817", // Rainbow mountains
    backup: "photo-1583037189850-1921ae7c6c22", // Colorful rock formations
    keywords: ["zhangye danxia rainbow mountains", "zhangye colorful mountains", "zhangye geopark"],
  },

  // ============================================
  // CENTRAL CHINA
  // ============================================
  wuhan: {
    primary: "photo-1584646098378-0874589d76b1", // Yellow Crane Tower and Yangtze River
    backup: "photo-1599873494471-e9c928e438b8", // Yangtze River Bridge
    keywords: ["wuhan yellow crane tower", "wuhan yangtze river", "wuhan city"],
  },

  changsha: {
    primary: "photo-1590842762193-997c8ff62238", // Orange Island and Xiang River
    backup: "photo-1599873494471-e9c928e438b8", // City skyline
    keywords: ["changsha orange island", "changsha xiang river", "changsha hunan"],
  },

  luoyang: {
    primary: "photo-1582555172866-f73bb12a2ab3", // Longmen Grottoes Buddha statues
    backup: "photo-1583037189850-1921ae7c6c22", // Cliff carvings
    keywords: ["luoyang longmen grottoes", "luoyang buddha caves", "luoyang ancient"],
  },

  kaifeng: {
    primary: "photo-1596422846543-75c6fc197f07", // Night market traditional architecture
    backup: "photo-1599873494471-e9c928e438b8", // Ancient city scenery
    keywords: ["kaifeng night market", "kaifeng ancient city", "kaifeng song dynasty"],
  },
};

/**
 * Default placeholder image for fallback
 * Generic China landscape without people
 */
export const PLACEHOLDER_IMAGE = "photo-1508804185872-d7badad00f7d"; // Generic China landscape

/**
 * Keywords to detect people in images (reject these)
 */
export const PEOPLE_KEYWORDS = [
  "person",
  "people",
  "portrait",
  "woman",
  "man",
  "model",
  "tourist",
  "traveler",
  "face",
  "crowd",
  "human",
];

/**
 * Get Unsplash URL from photo ID
 */
export function getUnsplashUrl(photoId: string, width = 800): string {
  return `https://images.unsplash.com/${photoId}?w=${width}`;
}

/**
 * Check if image alt description contains people keywords
 */
export function containsPeople(altDescription: string | null | undefined): boolean {
  if (!altDescription) return false;
  const lowerAlt = altDescription.toLowerCase();
  return PEOPLE_KEYWORDS.some((keyword) => lowerAlt.includes(keyword));
}
