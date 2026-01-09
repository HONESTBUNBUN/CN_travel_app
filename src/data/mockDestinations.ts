import type { Destination } from "@/types";
import { DESTINATION_IMAGES, getUnsplashUrl } from "./destinationImages";

/**
 * 30+ China Destinations for First-Time Visitors
 * Content generated with regional diversity and personalization
 * Images from curated Unsplash mapping with fallback chain
 */

export const mockDestinations: Destination[] = [
  // ============================================
  // NORTH CHINA
  // ============================================
  {
    id: "beijing",
    name: "Beijing",
    slug: "beijing",
    tags: ["Ancient", "Cultural", "Urban"],
    shortDescription: "China's capital blends imperial history with modern dynamism",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES.beijing.primary),

    whyPeopleLike: "Beijing is the gateway to understanding China's imperial past. The Forbidden City, Temple of Heaven, and Summer Palace showcase architecture and culture from dynasties spanning centuries. The Great Wall is an easy day trip away.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "Spring (April-May) and Fall (September-October) offer mild weather and manageable crowds. Summer is hot and humid; winter is cold but less crowded.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("temples")) {
        reasons.push("You selected Temples - Beijing has stunning temple architecture like the Temple of Heaven.");
      }
      if (inputs.interests?.includes("ancient-cities")) {
        reasons.push("Ancient cities interest you - the Forbidden City is China's most iconic imperial complex.");
      }
      if (inputs.tripLength && inputs.tripLength >= 7) {
        reasons.push(`With ${inputs.tripLength} days, you have time to explore Beijing's major sites without rushing.`);
      }
      if (inputs.pace === "balanced" || inputs.pace === "fast") {
        reasons.push("Beijing's excellent metro system matches your preferred travel pace.");
      }
      return reasons.join(" ") || "Beijing is essential for first-time visitors to understand China's history and culture.";
    },

    goodToKnow: [
      "Air quality can vary - check AQI before visiting",
      "Great Wall day trips take 8-10 hours including transport",
      "Major sites require advance tickets during peak season",
    ],

    matchingInterests: ["temples", "ancient-cities", "city-skylines", "tea-culture"],
    suitablePace: ["balanced", "fast"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "North",
  },

  {
    id: "xian",
    name: "Xi'an",
    slug: "xian",
    tags: ["Ancient", "Historical", "Terracotta"],
    shortDescription: "Ancient capital home to the famous Terracotta Warriors",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['xian'].primary),

    whyPeopleLike: "Xi'an served as China's capital for 13 dynasties and is most famous for the incredible Terracotta Army. The ancient city walls, Muslim Quarter, and rich culinary scene make it a must-visit historical destination.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "March-May and September-November are ideal. Summers are very hot (35°C+), winters are cold and dry. Spring brings blooming flowers on the city walls.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("ancient-cities")) {
        reasons.push("You want ancient cities - Xi'an was China's capital for over 1,000 years with remarkably preserved city walls.");
      }
      if (inputs.interests?.includes("street-food") || inputs.interests?.includes("regional-cuisine")) {
        reasons.push("The Muslim Quarter offers some of China's best street food and unique Northwestern cuisine.");
      }
      if (inputs.tripLength && inputs.tripLength >= 8) {
        reasons.push("Your trip length allows a comfortable 2-3 days to explore the Terracotta Warriors and old city.");
      }
      return reasons.join(" ") || "Xi'an offers a deep dive into China's ancient imperial history.";
    },

    goodToKnow: [
      "Terracotta Warriors museum is 1 hour from city center",
      "City walls are best explored by bicycle (rentals available)",
      "Muslim Quarter gets very crowded on weekends",
    ],

    matchingInterests: ["ancient-cities", "street-food", "regional-cuisine", "temples"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "North",
  },

  {
    id: "pingyao",
    name: "Pingyao",
    slug: "pingyao",
    tags: ["Ancient", "UNESCO", "Authentic"],
    shortDescription: "Best-preserved ancient walled city from the Ming Dynasty",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['pingyao'].primary),

    whyPeopleLike: "Pingyao is a UNESCO World Heritage Site that feels like stepping back in time. Unlike modern Chinese cities, this Ming Dynasty town has preserved its original layout, architecture, and atmosphere for over 600 years.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "April-May and September-October are perfect. Winter is very cold (sub-zero temperatures), summer is hot. Chinese New Year is spectacular but very crowded.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("ancient-cities")) {
        reasons.push("You love ancient cities - Pingyao is the most authentic preserved ancient town in China.");
      }
      if (inputs.pace === "slow") {
        reasons.push("Your slow pace is perfect for wandering Pingyao's lantern-lit alleyways and courtyards.");
      }
      if (inputs.planningEffort === "high") {
        reasons.push("As a less touristy destination, Pingyao rewards travelers who enjoy discovering hidden gems.");
      }
      return reasons.join(" ") || "Pingyao offers an authentic glimpse into China's merchant culture and ancient architecture.";
    },

    goodToKnow: [
      "Between Beijing and Xi'an - perfect stopover city",
      "Most guesthouses are converted courtyard homes",
      "English signage is limited - bring translation app",
    ],

    matchingInterests: ["ancient-cities", "classical-gardens", "tea-culture"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 1,
    weatherSensitive: true,
    region: "North",
  },

  {
    id: "datong",
    name: "Datong",
    slug: "datong",
    tags: ["Buddhist", "Caves", "Historical"],
    shortDescription: "Ancient Buddhist grottoes and the hanging monastery",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['datong'].primary),

    whyPeopleLike: "Datong houses the spectacular Yungang Grottoes, 51,000 Buddhist statues carved into cliffsides over 1,500 years ago. The gravity-defying Hanging Monastery is one of China's most unique architectural wonders.",

    bestTimeToVisit: {
      seasons: ["spring", "summer", "fall"],
      explanation: "May-October is best. Winter is extremely cold (-15°C). Summer can be warm but is the most comfortable season for this northern city.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("temples")) {
        reasons.push("You're interested in temples - the Yungang Grottoes are among China's most impressive Buddhist sites.");
      }
      if (inputs.interests?.includes("mountains")) {
        reasons.push("The Hanging Monastery clings to a cliff face in the Hengshan Mountains.");
      }
      if (inputs.planningEffort === "high") {
        reasons.push("Datong is off the main tourist trail, offering a more authentic experience.");
      }
      return reasons.join(" ") || "Datong showcases ancient Buddhist art and daring architecture in a less-visited northern city.";
    },

    goodToKnow: [
      "Best reached by high-speed train from Beijing (3.5 hours)",
      "Hanging Monastery has height restrictions and may close in bad weather",
      "City center was recently rebuilt - grottoes are the main draw",
    ],

    matchingInterests: ["temples", "mountains", "ancient-cities"],
    suitablePace: ["balanced", "fast"],
    minimumDays: 1,
    weatherSensitive: true,
    region: "North",
  },

  {
    id: "harbin",
    name: "Harbin",
    slug: "harbin",
    tags: ["Winter", "Ice Festival", "Russian"],
    shortDescription: "The Ice City with spectacular winter festival and Russian heritage",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['harbin'].primary),

    whyPeopleLike: "Harbin's International Ice and Snow Sculpture Festival (January-February) features massive illuminated ice palaces and sculptures. The city's Russian architectural heritage creates a unique cultural blend unlike anywhere else in China.",

    bestTimeToVisit: {
      seasons: ["winter"],
      explanation: "January-February for the Ice Festival. Expect temperatures of -15°C to -30°C. Summer (June-August) is mild and pleasant but the city is less special without ice sculptures.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.weatherFlexibility === "flexible") {
        reasons.push("You're flexible with weather - Harbin's winter wonderland requires embracing extreme cold.");
      }
      if (inputs.interests?.includes("city-skylines")) {
        reasons.push("The ice palace replicas of world landmarks offer unique photo opportunities.");
      }
      if (inputs.pace === "balanced") {
        reasons.push("2-3 days is perfect to experience the festival and Russian heritage.");
      }
      return reasons.join(" ") || "Harbin offers a completely unique winter experience found nowhere else in China.";
    },

    goodToKnow: [
      "Bring serious cold weather gear (thermal underwear essential)",
      "Ice Festival runs roughly January 5 - February 25",
      "Phone batteries drain quickly in extreme cold",
    ],

    matchingInterests: ["city-skylines", "regional-cuisine"],
    suitablePace: ["balanced", "fast"],
    minimumDays: 2,
    weatherSensitive: true,
    region: "North",
  },

  // ============================================
  // EAST CHINA
  // ============================================
  {
    id: "shanghai",
    name: "Shanghai",
    slug: "shanghai",
    tags: ["Modern", "Urban", "Skyline"],
    shortDescription: "China's most cosmopolitan city with stunning architecture",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['shanghai'].primary),

    whyPeopleLike: "Shanghai offers a glimpse of modern China with its futuristic skyline, French Concession charm, and vibrant food scene. The Bund waterfront perfectly contrasts colonial European buildings with Pudong's sci-fi towers.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "March-May and September-November are ideal. Avoid July-August (hot and humid) and Chinese New Year (crowded). Spring brings pleasant temperatures and blooming magnolias.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("city-skylines")) {
        reasons.push("You want city skylines - Shanghai's Bund and Pudong skyline are world-class.");
      }
      if (inputs.interests?.includes("night-markets")) {
        reasons.push("Night markets interest you - Shanghai has vibrant food streets and markets.");
      }
      if (inputs.pace === "fast") {
        reasons.push("Shanghai's efficient metro and fast pace match your travel style perfectly.");
      }
      if (inputs.interests?.includes("high-speed-trains")) {
        reasons.push("Shanghai is a major high-speed rail hub connecting to Hangzhou, Suzhou, and beyond.");
      }
      return reasons.join(" ") || "Shanghai is perfect for experiencing modern China's energy and sophistication.";
    },

    goodToKnow: [
      "Very walkable city with excellent metro system",
      "Higher prices than other Chinese cities",
      "English more widely spoken than elsewhere in China",
    ],

    matchingInterests: ["city-skylines", "night-markets", "street-food", "high-speed-trains"],
    suitablePace: ["balanced", "fast"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "East",
  },

  {
    id: "suzhou",
    name: "Suzhou",
    slug: "suzhou",
    tags: ["Gardens", "Canals", "Classical"],
    shortDescription: "The Venice of the East with exquisite classical gardens",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['suzhou'].primary),

    whyPeopleLike: "Suzhou is famous for its UNESCO-listed classical gardens - masterpieces of landscape design from Ming and Qing dynasties. Ancient canal towns, silk workshops, and traditional architecture make it a peaceful contrast to nearby Shanghai.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "April-May and September-October are perfect for garden visits. Cherry blossoms bloom in spring. Summer is hot and humid; winter is chilly but gardens are less crowded.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("classical-gardens")) {
        reasons.push("You selected classical gardens - Suzhou is THE destination for China's finest garden art.");
      }
      if (inputs.interests?.includes("tea-culture")) {
        reasons.push("Traditional teahouses in classical gardens offer authentic tea ceremonies.");
      }
      if (inputs.pace === "slow") {
        reasons.push("Your slow pace is ideal for contemplating Suzhou's carefully designed garden landscapes.");
      }
      if (inputs.tripLength && inputs.tripLength >= 7) {
        reasons.push("Just 30 minutes from Shanghai by train, Suzhou makes a perfect day trip or overnight stay.");
      }
      return reasons.join(" ") || "Suzhou offers refined classical Chinese aesthetics and tranquil garden experiences.";
    },

    goodToKnow: [
      "At least 3-4 gardens needed to appreciate the art form",
      "Water towns (Tongli, Zhouzhuang) can be touristy",
      "30 minutes from Shanghai by high-speed train",
    ],

    matchingInterests: ["classical-gardens", "tea-culture", "ancient-cities"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 1,
    weatherSensitive: false,
    region: "East",
  },

  {
    id: "hangzhou",
    name: "Hangzhou",
    slug: "hangzhou",
    tags: ["Scenic", "Tea", "Lake"],
    shortDescription: "Stunning West Lake and legendary Longjing tea plantations",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['hangzhou'].primary),

    whyPeopleLike: "Hangzhou's West Lake is China's most celebrated scenic area, inspiring poets for centuries. The city combines natural beauty with cultural sites, and produces China's most famous green tea - Longjing (Dragon Well).",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "April-May (spring blossoms) and September-October are ideal. Summer is very hot and humid. Winter is less crowded but chilly. Tea picking season is March-April.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("tea-culture")) {
        reasons.push("Tea culture interests you - Hangzhou's Longjing tea villages offer authentic tea experiences.");
      }
      if (inputs.interests?.includes("national-parks")) {
        reasons.push("West Lake's scenic areas provide beautiful nature walks and pagoda views.");
      }
      if (inputs.pace === "slow" || inputs.pace === "balanced") {
        reasons.push("Walking or cycling around West Lake matches your preferred travel pace perfectly.");
      }
      if (inputs.tripLength && inputs.tripLength >= 10) {
        reasons.push("Just 1 hour from Shanghai, Hangzhou adds natural beauty to an urban itinerary.");
      }
      return reasons.join(" ") || "Hangzhou combines natural scenery with tea culture in China's most poetic city.";
    },

    goodToKnow: [
      "Rent a bike to circle West Lake (2-3 hours)",
      "Many historic sites ring the lake shores",
      "1 hour from Shanghai by high-speed train",
    ],

    matchingInterests: ["tea-culture", "national-parks", "classical-gardens", "temples"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 1,
    weatherSensitive: false,
    region: "East",
  },

  {
    id: "huangshan",
    name: "Huangshan (Yellow Mountain)",
    slug: "huangshan",
    tags: ["Mountains", "Scenic", "Nature"],
    shortDescription: "Mystical granite peaks rising through seas of clouds",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['huangshan'].primary),

    whyPeopleLike: "Yellow Mountain is China's most famous mountain, inspiring countless paintings and poems. Ancient twisted pines cling to granite peaks that emerge from ethereal cloud seas - it's a landscape that seems otherworldly.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "April-May and September-October offer the best chance of seeing the famous cloud seas and comfortable temperatures. Summer is crowded. Winter is magical but cold with some trails closed.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("mountains")) {
        reasons.push("Mountains are your interest - Huangshan is China's most celebrated peak and a photographer's dream.");
      }
      if (inputs.interests?.includes("national-parks")) {
        reasons.push("The UNESCO World Heritage area features granite formations found nowhere else.");
      }
      if (inputs.weatherFlexibility === "flexible") {
        reasons.push("Cloud seas are weather-dependent - your flexibility increases chances of perfect conditions.");
      }
      if (inputs.pace === "slow") {
        reasons.push("Staying overnight on the mountain lets you catch sunrise - perfect for your relaxed pace.");
      }
      return reasons.join(" ") || "Huangshan offers China's most iconic mountain scenery with mystical cloud-wrapped peaks.";
    },

    goodToKnow: [
      "Cable cars available but hiking is rewarding",
      "Stay overnight on the mountain for sunrise (book ahead)",
      "Can be very crowded during holidays",
    ],

    matchingInterests: ["mountains", "national-parks"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: true,
    region: "East",
  },

  {
    id: "nanjing",
    name: "Nanjing",
    slug: "nanjing",
    tags: ["Historical", "Cultural", "Ancient"],
    shortDescription: "Former capital with profound historical significance",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['nanjing'].primary),

    whyPeopleLike: "Nanjing served as China's capital for six dynasties and played crucial roles in modern history. The city offers deep historical experiences from Sun Yat-sen Mausoleum to ancient city walls and the moving Nanjing Massacre Memorial.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "March-May (plum blossoms, cherry blossoms) and September-November are ideal. Summer is extremely hot and humid. Winter is cold but manageable.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("ancient-cities")) {
        reasons.push("Ancient cities interest you - Nanjing has some of the best-preserved Ming city walls.");
      }
      if (inputs.planningEffort === "high") {
        reasons.push("Nanjing rewards travelers who dig deeper into modern Chinese history and culture.");
      }
      if (inputs.tripLength && inputs.tripLength >= 12) {
        reasons.push("Between Shanghai and Beijing, Nanjing makes an excellent stopover city.");
      }
      return reasons.join(" ") || "Nanjing offers profound historical depth and is less touristy than Beijing or Shanghai.";
    },

    goodToKnow: [
      "Nanjing Massacre Memorial is emotionally heavy but important",
      "City is very green with tree-lined boulevards",
      "Good metro system and walkable districts",
    ],

    matchingInterests: ["ancient-cities", "temples"],
    suitablePace: ["balanced", "fast"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "East",
  },

  // ============================================
  // SOUTH CHINA
  // ============================================
  {
    id: "guilin",
    name: "Guilin & Yangshuo",
    slug: "guilin",
    tags: ["Nature", "Scenic", "Mountains"],
    shortDescription: "Otherworldly karst mountains and Li River landscapes",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['guilin'].primary),

    whyPeopleLike: "Guilin's karst limestone peaks rising from misty rivers create China's most iconic landscape, immortalized in countless paintings. A Li River cruise reveals scenery that appears on the 20 yuan note.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "April-May and September-October offer clear skies and comfortable temperatures. Summer brings rain but lush greenery. Winter is misty and less crowded.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("mountains")) {
        reasons.push("Mountains are your interest - Guilin's karst peaks are uniquely dramatic and scenic.");
      }
      if (inputs.interests?.includes("national-parks")) {
        reasons.push("You want nature - the Li River and surrounding countryside offer stunning scenery.");
      }
      if (inputs.pace === "slow") {
        reasons.push("Your slow pace matches Guilin's relaxed countryside vibe perfectly.");
      }
      if (inputs.weatherFlexibility === "flexible") {
        reasons.push("The Li River cruise is best in clear weather, which your flexibility helps accommodate.");
      }
      return reasons.join(" ") || "Guilin offers a peaceful contrast to China's urban centers with iconic natural beauty.";
    },

    goodToKnow: [
      "Li River cruise is best in clear weather - book based on forecast",
      "Yangshuo village is more relaxed than Guilin city",
      "2-3 days needed to experience both Guilin and Yangshuo",
    ],

    matchingInterests: ["mountains", "national-parks"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: true,
    region: "South",
  },

  {
    id: "hongkong",
    name: "Hong Kong",
    slug: "hongkong",
    tags: ["Urban", "Food", "Modern"],
    shortDescription: "East-meets-West metropolis with world-class dining and skyline",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['hongkong'].primary),

    whyPeopleLike: "Hong Kong blends Chinese and British influences into a unique culture. Victoria Harbor's skyline, dim sum culture, and efficient transport make it an accessible gateway. Day hikes and outlying islands offer nature escapes.",

    bestTimeToVisit: {
      seasons: ["fall", "winter"],
      explanation: "October-December is ideal with comfortable temperatures and low humidity. March-May is also good. Summer is very hot and humid with typhoon risk.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("city-skylines")) {
        reasons.push("You want city skylines - Victoria Harbor's view is one of the world's most iconic.");
      }
      if (inputs.interests?.includes("street-food") || inputs.interests?.includes("regional-cuisine")) {
        reasons.push("Hong Kong is a paradise for food lovers with world-renowned dim sum and street food.");
      }
      if (inputs.pace === "fast") {
        reasons.push("Hong Kong's efficient MTR and compact districts suit fast-paced exploration.");
      }
      if (inputs.isFirstTimer) {
        reasons.push("English is widely spoken and signage is bilingual, making it very accessible for first-timers.");
      }
      return reasons.join(" ") || "Hong Kong offers an accessible introduction to Chinese culture with international flair.";
    },

    goodToKnow: [
      "Separate visa from mainland China (visa-free for many nationalities)",
      "Very expensive compared to mainland cities",
      "Hiking trails accessible by public transport",
    ],

    matchingInterests: ["city-skylines", "street-food", "regional-cuisine", "night-markets"],
    suitablePace: ["balanced", "fast"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "South",
  },

  {
    id: "guangzhou",
    name: "Guangzhou",
    slug: "guangzhou",
    tags: ["Food", "Modern", "Cantonese"],
    shortDescription: "Cantonese culinary capital and trading hub",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['guangzhou'].primary),

    whyPeopleLike: "Guangzhou is the birthplace of dim sum and Cantonese cuisine. As a major trading city for centuries, it blends traditional culture with modern commerce. The food scene alone is worth the visit.",

    bestTimeToVisit: {
      seasons: ["fall", "winter"],
      explanation: "October-December offers comfortable weather. Spring is humid. Summer is very hot and rainy. Winter is mild compared to northern China.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("street-food") || inputs.interests?.includes("regional-cuisine")) {
        reasons.push("Food interests you - Guangzhou is the authentic home of Cantonese cuisine and dim sum culture.");
      }
      if (inputs.interests?.includes("night-markets")) {
        reasons.push("Night food streets and markets are central to Guangzhou's dining culture.");
      }
      if (inputs.pace === "balanced") {
        reasons.push("2-3 days lets you explore food culture, temples, and the Pearl River.");
      }
      return reasons.join(" ") || "Guangzhou offers authentic Cantonese culture and some of China's best food experiences.";
    },

    goodToKnow: [
      "English less common than in Hong Kong or Shanghai",
      "Canton Tower offers great city views",
      "Close to Hong Kong and Macau for multi-city trips",
    ],

    matchingInterests: ["street-food", "regional-cuisine", "night-markets", "city-skylines"],
    suitablePace: ["balanced", "fast"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "South",
  },

  {
    id: "xiamen",
    name: "Xiamen",
    slug: "xiamen",
    tags: ["Coastal", "Island", "Relaxed"],
    shortDescription: "Charming coastal city with colonial island architecture",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['xiamen'].primary),

    whyPeopleLike: "Xiamen is a laid-back coastal city with pleasant weather year-round. Gulangyu Island, a car-free UNESCO site with colonial architecture and beaches, is the main draw. The city offers a relaxed vibe rare in Chinese cities.",

    bestTimeToVisit: {
      seasons: ["spring", "fall", "winter"],
      explanation: "March-May and September-November are ideal. Winter is mild. Summer is hot and humid with typhoon risk. Spring and fall offer beach-friendly weather.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.pace === "slow") {
        reasons.push("Your slow pace suits Xiamen's relaxed coastal atmosphere and car-free Gulangyu Island.");
      }
      if (inputs.interests?.includes("regional-cuisine")) {
        reasons.push("Xiamen and Fujian cuisine offer unique flavors different from other regions.");
      }
      if (inputs.weatherFlexibility === "comfort-focused") {
        reasons.push("Xiamen has China's most comfortable weather - mild winters and sea breezes in summer.");
      }
      return reasons.join(" ") || "Xiamen provides a relaxed coastal escape with unique island charm.";
    },

    goodToKnow: [
      "Gulangyu Island requires ferry (pedestrian only on island)",
      "Known for seafood and Taiwanese-influenced cuisine",
      "Less international tourism than major cities",
    ],

    matchingInterests: ["regional-cuisine", "tea-culture"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "South",
  },

  {
    id: "shenzhen",
    name: "Shenzhen",
    slug: "shenzhen",
    tags: ["Modern", "Tech", "Urban"],
    shortDescription: "China's innovation hub transformed from fishing village to megacity",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['shenzhen'].primary),

    whyPeopleLike: "Shenzhen went from fishing village to tech megacity in 40 years. It's China's Silicon Valley with modern architecture, theme parks, and proximity to Hong Kong. The city represents modern China's rapid transformation.",

    bestTimeToVisit: {
      seasons: ["fall", "winter"],
      explanation: "October-December is ideal. Spring is pleasant. Summer is very hot and humid. Winter is mild with comfortable temperatures.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("city-skylines")) {
        reasons.push("Modern skylines interest you - Shenzhen's skyline is one of China's most futuristic.");
      }
      if (inputs.pace === "fast") {
        reasons.push("Shenzhen's fast-paced innovation culture and efficient transport match your style.");
      }
      if (inputs.tripLength && inputs.tripLength >= 10) {
        reasons.push("Easy to combine with Hong Kong (metro connects across border).");
      }
      return reasons.join(" ") || "Shenzhen showcases modern China's technological prowess and urban development.";
    },

    goodToKnow: [
      "Metro connects directly to Hong Kong",
      "Tech and maker spaces welcome visitors",
      "Very young city - little traditional culture",
    ],

    matchingInterests: ["city-skylines", "high-speed-trains"],
    suitablePace: ["fast"],
    minimumDays: 1,
    weatherSensitive: false,
    region: "South",
  },

  // ============================================
  // WEST CHINA
  // ============================================
  {
    id: "chengdu",
    name: "Chengdu",
    slug: "chengdu",
    tags: ["Pandas", "Food", "Sichuan"],
    shortDescription: "Laid-back Sichuan capital famous for pandas and spicy cuisine",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['chengdu'].primary),

    whyPeopleLike: "Chengdu is the panda capital of the world and birthplace of fiery Sichuan cuisine. The city has a relaxed, teahouse culture despite being a major metropolis. It's the gateway to western China and Tibetan areas.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "March-June and September-November are ideal. Summer is hot and rainy. Winter is cool and misty. Spring is best for seeing baby pandas.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("pandas")) {
        reasons.push("You want to see pandas - Chengdu's breeding center is the best place in the world to see giant pandas.");
      }
      if (inputs.interests?.includes("street-food") || inputs.interests?.includes("regional-cuisine")) {
        reasons.push("Sichuan food interests you - Chengdu is the authentic home of hotpot and spicy cuisine.");
      }
      if (inputs.interests?.includes("tea-culture")) {
        reasons.push("Chengdu's traditional teahouse culture is alive in parks and old quarters.");
      }
      if (inputs.pace === "slow" || inputs.pace === "balanced") {
        reasons.push("Chengdu's laid-back vibe matches your preferred travel pace.");
      }
      return reasons.join(" ") || "Chengdu combines adorable pandas, incredible food, and relaxed culture.";
    },

    goodToKnow: [
      "Visit panda base in the morning when pandas are most active",
      "Sichuan food is very spicy - order 'bu la' (not spicy) if needed",
      "Gateway to Jiuzhaigou and Leshan Buddha day trips",
    ],

    matchingInterests: ["pandas", "street-food", "regional-cuisine", "tea-culture"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "West",
  },

  {
    id: "chongqing",
    name: "Chongqing",
    slug: "chongqing",
    tags: ["Urban", "Food", "Mountain City"],
    shortDescription: "Cyberpunk mountain megacity and hotpot capital",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['chongqing'].primary),

    whyPeopleLike: "Chongqing is built on mountains where rivers meet, creating a multi-level cityscape. It's the hotpot capital of China and starting point for Yangtze River cruises. The hilly terrain creates unique urban landscapes.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "March-May and September-November are comfortable. Summer is extremely hot and humid (one of China's 'furnace cities'). Winter is mild and misty.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("city-skylines")) {
        reasons.push("You want unique skylines - Chongqing's vertical mountain city creates sci-fi urban landscapes.");
      }
      if (inputs.interests?.includes("street-food") || inputs.interests?.includes("regional-cuisine")) {
        reasons.push("Food interests you - Chongqing hotpot is spicier and more intense than anywhere else.");
      }
      if (inputs.pace === "fast") {
        reasons.push("Chongqing's fast-paced energy and excellent metro suit quick exploration.");
      }
      return reasons.join(" ") || "Chongqing offers unique mountain city landscapes and intense culinary experiences.";
    },

    goodToKnow: [
      "Very hilly - lots of stairs and escalators",
      "Starting point for Yangtze River cruises",
      "Known for foggy weather year-round",
    ],

    matchingInterests: ["city-skylines", "street-food", "regional-cuisine", "night-markets"],
    suitablePace: ["balanced", "fast"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "West",
  },

  {
    id: "lijiang",
    name: "Lijiang",
    slug: "lijiang",
    tags: ["Ancient", "Naxi Culture", "Scenic"],
    shortDescription: "UNESCO old town with Naxi minority culture and mountain backdrop",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['lijiang'].primary),

    whyPeopleLike: "Lijiang's UNESCO-listed old town features cobblestone streets, canals, and traditional Naxi architecture. Snow-capped Jade Dragon Snow Mountain provides a dramatic backdrop. The town offers authentic minority culture experiences.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "April-May and September-October are ideal. Summer is rainy (June-August). Winter is cold but clear with snow on the mountains. Spring flowers are spectacular.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("ancient-cities")) {
        reasons.push("Ancient cities interest you - Lijiang's old town is a beautifully preserved Naxi settlement.");
      }
      if (inputs.interests?.includes("mountains")) {
        reasons.push("You want mountains - Jade Dragon Snow Mountain towers over the town at 5,596m.");
      }
      if (inputs.pace === "slow") {
        reasons.push("Your slow pace suits wandering Lijiang's lanes and absorbing minority culture.");
      }
      if (inputs.planningEffort === "high") {
        reasons.push("Lijiang rewards travelers who venture beyond the main square to find authentic neighborhoods.");
      }
      return reasons.join(" ") || "Lijiang combines ancient town charm with dramatic mountain scenery and unique Naxi culture.";
    },

    goodToKnow: [
      "Old town can be very touristy - explore outskirts for authenticity",
      "High altitude (2,400m) - take it easy on arrival",
      "Gateway to Tiger Leaping Gorge hikes",
    ],

    matchingInterests: ["ancient-cities", "mountains", "national-parks", "tea-culture"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "West",
  },

  {
    id: "dali",
    name: "Dali",
    slug: "dali",
    tags: ["Ancient", "Lake", "Bai Culture"],
    shortDescription: "Lakeside ancient town with Bai minority culture and mountain views",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['dali'].primary),

    whyPeopleLike: "Dali combines an ancient walled city, serene Erhai Lake, and Cangshan Mountain backdrop. The Bai minority culture, marble crafts, and tie-dye traditions make it distinctly different from Han Chinese cities. It's more relaxed than nearby Lijiang.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "March-May (flower season) and September-November are perfect. Summer is rainy. Winter is mild compared to northern China. Spring brings spectacular wildflowers.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("ancient-cities")) {
        reasons.push("You like ancient cities - Dali's old town has well-preserved gates and walls with local character.");
      }
      if (inputs.pace === "slow") {
        reasons.push("Your slow pace is perfect for cycling around Erhai Lake and exploring Bai villages.");
      }
      if (inputs.interests?.includes("mountains")) {
        reasons.push("Cangshan Mountain offers cable car rides and hiking with panoramic lake views.");
      }
      return reasons.join(" ") || "Dali offers relaxed ancient town vibes with beautiful lake and mountain scenery.";
    },

    goodToKnow: [
      "Less touristy than Lijiang, more authentic feel",
      "Rent electric scooter or bike to circle Erhai Lake",
      "Between Lijiang and Shangri-La - good stopover",
    ],

    matchingInterests: ["ancient-cities", "mountains", "national-parks"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: false,
    region: "West",
  },

  {
    id: "shangri-la",
    name: "Shangri-La",
    slug: "shangri-la",
    tags: ["Tibetan", "Mountains", "Cultural"],
    shortDescription: "Tibetan culture and alpine landscapes at 3,200m altitude",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['shangri-la'].primary),

    whyPeopleLike: "Shangri-La (formerly Zhongdian) brings Tibetan Buddhism culture within easier reach. Songzanlin Monastery is a mini-Potala Palace, and the old town preserves Tibetan architecture. High altitude brings dramatic landscapes and yak herds.",

    bestTimeToVisit: {
      seasons: ["spring", "summer", "fall"],
      explanation: "May-October is best. Summer (June-August) brings wildflowers despite some rain. Winter is very cold with snow. Avoid late October-March unless you enjoy extreme cold.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("temples")) {
        reasons.push("Temples interest you - Songzanlin Monastery is one of the largest Tibetan Buddhist monasteries.");
      }
      if (inputs.interests?.includes("mountains")) {
        reasons.push("You want mountains - dramatic alpine scenery surrounds the town at 3,200m elevation.");
      }
      if (inputs.weatherFlexibility === "flexible") {
        reasons.push("High altitude weather is unpredictable - your flexibility helps handle changing conditions.");
      }
      if (inputs.planningEffort === "high") {
        reasons.push("Reaching Shangri-La requires more effort but rewards with authentic Tibetan culture.");
      }
      return reasons.join(" ") || "Shangri-La offers accessible Tibetan culture and dramatic high-altitude landscapes.";
    },

    goodToKnow: [
      "High altitude (3,200m) - acclimatize slowly, drink water",
      "Bring warm clothes even in summer",
      "Flight or long bus from Lijiang/Dali",
    ],

    matchingInterests: ["temples", "mountains", "tea-culture"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: true,
    region: "West",
  },

  {
    id: "zhangjiajie",
    name: "Zhangjiajie",
    slug: "zhangjiajie",
    tags: ["Nature", "Avatar Mountains", "UNESCO"],
    shortDescription: "Surreal sandstone pillars that inspired Avatar's floating mountains",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['zhangjiajie'].primary),

    whyPeopleLike: "Zhangjiajie's towering sandstone pillars create one of Earth's most otherworldly landscapes. The 'Avatar Hallelujah Mountain' and glass skywalk offer spectacular views. It's a UNESCO World Heritage site unlike anywhere else.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "April-May and September-October offer clear weather and comfortable temps. Summer is rainy and crowded. Winter can be magical with snow but cold. Misty weather adds mystery.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("mountains")) {
        reasons.push("Mountains interest you - Zhangjiajie's sandstone pillars are unlike any other mountains in China.");
      }
      if (inputs.interests?.includes("national-parks")) {
        reasons.push("You want nature - the UNESCO park offers dramatic landscapes and diverse ecosystems.");
      }
      if (inputs.tripLength && inputs.tripLength >= 10) {
        reasons.push("2-3 days needed to explore the park properly - your trip length allows this.");
      }
      if (inputs.weatherFlexibility === "flexible") {
        reasons.push("Weather can change quickly - mist adds atmosphere but clear days offer best views.");
      }
      return reasons.join(" ") || "Zhangjiajie offers jaw-dropping natural scenery that looks like a fantasy world.";
    },

    goodToKnow: [
      "Large park - cable cars and lifts available",
      "Can be very crowded during Chinese holidays",
      "2-3 days needed to see main areas",
    ],

    matchingInterests: ["mountains", "national-parks"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: true,
    region: "West",
  },

  {
    id: "jiuzhaigou",
    name: "Jiuzhaigou Valley",
    slug: "jiuzhaigou",
    tags: ["Nature", "UNESCO", "Lakes"],
    shortDescription: "Fairy-tale valley with turquoise lakes and Tibetan villages",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['jiuzhaigou'].primary),

    whyPeopleLike: "Jiuzhaigou is called a 'fairyland on earth' for its crystal-clear turquoise and emerald lakes, multi-tiered waterfalls, and colorful forests. The valley is dotted with Tibetan villages, adding cultural depth to natural beauty.",

    bestTimeToVisit: {
      seasons: ["fall"],
      explanation: "October is peak season when fall colors are spectacular. Summer (June-August) is green but crowded. Winter offers fewer crowds and frozen waterfalls but cold. Spring has variable weather.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("national-parks")) {
        reasons.push("National parks interest you - Jiuzhaigou is China's most beautiful nature reserve.");
      }
      if (inputs.interests?.includes("mountains")) {
        reasons.push("Set in a Tibetan plateau valley with mountain backdrops and alpine scenery.");
      }
      if (inputs.weatherFlexibility === "flexible") {
        reasons.push("Weather varies by season - each brings unique beauty if you're flexible.");
      }
      if (inputs.tripLength && inputs.tripLength >= 12) {
        reasons.push("Remote location requires 2-3 days including travel - your trip length allows this detour.");
      }
      return reasons.join(" ") || "Jiuzhaigou offers China's most stunning lakes and pristine natural scenery.";
    },

    goodToKnow: [
      "Remote - fly to Jiuzhaigou or long bus from Chengdu",
      "High altitude (2,000-3,100m) - take it easy",
      "Advanced booking required (daily visitor limits)",
    ],

    matchingInterests: ["national-parks", "mountains"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: true,
    region: "West",
  },

  {
    id: "tiger-leaping-gorge",
    name: "Tiger Leaping Gorge",
    slug: "tiger-leaping-gorge",
    tags: ["Hiking", "Mountains", "Adventure"],
    shortDescription: "One of the world's deepest gorges with spectacular trekking",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['tiger-leaping-gorge'].primary),

    whyPeopleLike: "Tiger Leaping Gorge is one of the world's deepest river canyons, with 3,000-meter cliffs rising above the roaring Jinsha River. The high trail offers one of China's most spectacular and accessible multi-day hikes.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "April-May and September-October are ideal for hiking. Summer is rainy (June-August). Winter is cold with possible snow. Spring brings wildflowers along the trail.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("mountains")) {
        reasons.push("Mountains interest you - the gorge is carved between 5,596m Jade Dragon and 5,396m Haba peaks.");
      }
      if (inputs.interests?.includes("national-parks")) {
        reasons.push("The dramatic canyon landscape and Jinsha River offer incredible natural scenery.");
      }
      if (inputs.pace === "slow") {
        reasons.push("The 2-day high trail trek matches your preference for taking time to absorb experiences.");
      }
      if (inputs.planningEffort === "high") {
        reasons.push("Hiking the gorge requires some planning but is very rewarding for adventurous travelers.");
      }
      return reasons.join(" ") || "Tiger Leaping Gorge offers world-class hiking with dramatic mountain and river scenery.";
    },

    goodToKnow: [
      "High trail is moderate difficulty (2 days, guesthouses available)",
      "Between Lijiang and Shangri-La - easy to combine",
      "Not a guided tour - independent hiking recommended",
    ],

    matchingInterests: ["mountains", "national-parks"],
    suitablePace: ["slow", "balanced"],
    minimumDays: 2,
    weatherSensitive: true,
    region: "West",
  },

  {
    id: "zhangye-danxia",
    name: "Zhangye Danxia",
    slug: "zhangye-danxia",
    tags: ["Nature", "Rainbow Mountains", "Unique"],
    shortDescription: "Rainbow-striped mountains in otherworldly colors",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['zhangye-danxia'].primary),

    whyPeopleLike: "Zhangye Danxia Geopark features multi-colored rock formations striped in reds, yellows, and oranges. These 'Rainbow Mountains' were formed over millions of years and look like they've been painted. It's one of China's most unique landscapes.",

    bestTimeToVisit: {
      seasons: ["summer", "fall"],
      explanation: "June-September is best when colors are most vibrant (especially after rain). Spring is dusty. Winter is very cold. Sunrise and sunset offer the best light.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("mountains")) {
        reasons.push("Mountains interest you - these colorful geological formations are completely unique in China.");
      }
      if (inputs.interests?.includes("national-parks")) {
        reasons.push("This UNESCO Geopark offers landscapes unlike anywhere else on Earth.");
      }
      if (inputs.planningEffort === "high") {
        reasons.push("Remote location in Gansu province - requires effort to reach but offers unforgettable scenery.");
      }
      return reasons.join(" ") || "Zhangye Danxia offers surreal rainbow-colored mountains found nowhere else.";
    },

    goodToKnow: [
      "Remote location - fly to Zhangye or take train from Xi'an/Lanzhou",
      "Visit at sunrise or sunset for best colors",
      "Shuttle buses required within the park",
    ],

    matchingInterests: ["mountains", "national-parks"],
    suitablePace: ["balanced", "fast"],
    minimumDays: 1,
    weatherSensitive: true,
    region: "West",
  },

  // ============================================
  // CENTRAL CHINA
  // ============================================
  {
    id: "wuhan",
    name: "Wuhan",
    slug: "wuhan",
    tags: ["Urban", "Historical", "Yangtze"],
    shortDescription: "Central China hub with Yellow Crane Tower and Yangtze River views",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['wuhan'].primary),

    whyPeopleLike: "Wuhan sits at the junction of the Yangtze and Han rivers in central China. The historic Yellow Crane Tower, cherry blossoms in spring, and vibrant food scene make it an underrated stopover between east and west China.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "March-April (cherry blossoms) and September-October are ideal. Summer is extremely hot and humid (one of China's 'furnace cities'). Winter is cold and damp.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("high-speed-trains")) {
        reasons.push("Wuhan is a major high-speed rail hub connecting east, west, north, and south China.");
      }
      if (inputs.interests?.includes("street-food")) {
        reasons.push("Hot dry noodles (re gan mian) are Wuhan's signature breakfast dish.");
      }
      if (inputs.tripLength && inputs.tripLength >= 14) {
        reasons.push("As a central hub, Wuhan makes a convenient stopover on longer China trips.");
      }
      return reasons.join(" ") || "Wuhan offers an authentic central China experience with historical sites and river views.";
    },

    goodToKnow: [
      "Cherry blossom season (late March) is very crowded",
      "Major high-speed rail junction - easy connections",
      "Less touristy than coastal cities",
    ],

    matchingInterests: ["high-speed-trains", "street-food", "city-skylines"],
    suitablePace: ["fast"],
    minimumDays: 1,
    weatherSensitive: false,
    region: "Central",
  },

  {
    id: "changsha",
    name: "Changsha",
    slug: "changsha",
    tags: ["Cultural", "Food", "Modern"],
    shortDescription: "Hunan capital with spicy food and Mao Zedong heritage",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['changsha'].primary),

    whyPeopleLike: "Changsha is the capital of Hunan province, birthplace of Mao Zedong and home to fiery Hunan cuisine. The city blends revolutionary history with modern development and serves as a gateway to Zhangjiajie.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "March-May and September-November are comfortable. Summer is very hot and humid with heavy rain. Winter is cold and damp.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("street-food") || inputs.interests?.includes("regional-cuisine")) {
        reasons.push("Hunan cuisine rivals Sichuan for spiciness with unique smoky flavors.");
      }
      if (inputs.tripLength && inputs.tripLength >= 12) {
        reasons.push("Good stopover between Zhangjiajie and eastern cities.");
      }
      return reasons.join(" ") || "Changsha offers spicy food, revolutionary history, and a gateway to Zhangjiajie.";
    },

    goodToKnow: [
      "Gateway to Zhangjiajie (4-hour bus or train)",
      "Hunan cuisine is very spicy",
      "Less international tourism than major cities",
    ],

    matchingInterests: ["street-food", "regional-cuisine"],
    suitablePace: ["balanced", "fast"],
    minimumDays: 1,
    weatherSensitive: false,
    region: "Central",
  },

  {
    id: "luoyang",
    name: "Luoyang",
    slug: "luoyang",
    tags: ["Buddhist", "Historical", "Grottoes"],
    shortDescription: "Ancient capital home to magnificent Longmen Grottoes",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['luoyang'].primary),

    whyPeopleLike: "Luoyang was China's capital for 13 dynasties. The Longmen Grottoes contain 100,000 Buddhist statues carved into limestone cliffs over 400 years. In spring, Luoyang's peony festival attracts visitors from across China.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "April (peony festival) and September-October are ideal. Summer is very hot. Winter is cold. The peony festival in mid-April is spectacular but crowded.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("temples")) {
        reasons.push("Temples interest you - Longmen Grottoes are one of China's four great Buddhist cave sites.");
      }
      if (inputs.interests?.includes("ancient-cities")) {
        reasons.push("Ancient cities appeal to you - Luoyang has over 3,000 years of history as a capital.");
      }
      if (inputs.tripLength && inputs.tripLength >= 10) {
        reasons.push("Located between Xi'an and Zhengzhou - easy stopover on cross-country trips.");
      }
      return reasons.join(" ") || "Luoyang offers profound Buddhist art and ancient capital history.";
    },

    goodToKnow: [
      "Longmen Grottoes are 30 minutes from city center",
      "Peony festival (April) brings huge crowds",
      "Between Xi'an and eastern cities - good stopover",
    ],

    matchingInterests: ["temples", "ancient-cities"],
    suitablePace: ["balanced"],
    minimumDays: 1,
    weatherSensitive: false,
    region: "Central",
  },

  {
    id: "kaifeng",
    name: "Kaifeng",
    slug: "kaifeng",
    tags: ["Ancient", "Night Market", "Historical"],
    shortDescription: "Song Dynasty capital with legendary night market",
    heroImage: getUnsplashUrl(DESTINATION_IMAGES['kaifeng'].primary),

    whyPeopleLike: "Kaifeng was China's capital during the Northern Song Dynasty and is famous for its night market - one of China's oldest and most atmospheric. The city preserves Song Dynasty culture and architecture, featured in the famous 'Along the River' painting.",

    bestTimeToVisit: {
      seasons: ["spring", "fall"],
      explanation: "March-May and September-November are ideal. Summer is very hot. Winter is cold. Spring brings cherry blossoms at the parks.",
    },

    whyThisFits: (inputs) => {
      const reasons = [];
      if (inputs.interests?.includes("night-markets")) {
        reasons.push("You love night markets - Kaifeng's night market is legendary and authentically local.");
      }
      if (inputs.interests?.includes("street-food")) {
        reasons.push("Street food interests you - the night market offers unique Song Dynasty-style snacks.");
      }
      if (inputs.interests?.includes("ancient-cities")) {
        reasons.push("Ancient cities appeal to you - Kaifeng preserves Song Dynasty culture and layout.");
      }
      return reasons.join(" ") || "Kaifeng offers ancient capital history and one of China's best night markets.";
    },

    goodToKnow: [
      "Night market is the main attraction - visit in evening",
      "1 hour from Zhengzhou by train",
      "Less developed tourism - more authentic experience",
    ],

    matchingInterests: ["night-markets", "street-food", "ancient-cities"],
    suitablePace: ["balanced"],
    minimumDays: 1,
    weatherSensitive: false,
    region: "Central",
  },
];
