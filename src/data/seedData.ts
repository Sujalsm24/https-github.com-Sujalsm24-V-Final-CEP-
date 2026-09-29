import type { Lesson, Quiz, Badge, LeaderboardEntry } from '../types/index.ts';

export const ALL_BADGES: Badge[] = [
  { id: 'first_lesson', title: 'First Lesson', description: 'Completed your very first language lesson!', icon: '🏆' },
  { id: 'streak_7', title: '7 Day Streak', description: 'Maintained a 7-day continuous study habit!', icon: '🔥' },
  { id: 'ten_lessons', title: '10 Lessons Master', description: 'Successfully finished 10 comprehensive lessons.', icon: '📚' },
  { id: 'quiz_master', title: 'Quiz Master', description: 'Scored 100% on a language quiz.', icon: '🎯' },
  { id: 'speaking_starter', title: 'Speaking Starter', description: 'Completed your first voice pronunciation drill.', icon: '🗣️' },
  { id: 'polyglot_explorer', title: 'Language Explorer', description: 'Explored lessons in Marathi, Hindi, and English.', icon: '🌟' },
  { id: 'vocab_champ', title: 'Word Wizard', description: 'Learned over 50 vocabulary flashcards.', icon: '⚡' }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'u1', name: 'Tanvi Deshmukh', xp: 2450, streak: 14, selectedLanguage: 'marathi', avatarColor: 'bg-indigo-600' },
  { id: 'u2', name: 'Aarav Sharma', xp: 2200, streak: 9, selectedLanguage: 'hindi', avatarColor: 'bg-emerald-600' },
  { id: 'u3', name: 'Pooja Kadam', xp: 1980, streak: 8, selectedLanguage: 'marathi', avatarColor: 'bg-purple-600' },
  { id: 'u4', name: 'Rohan Mehta', xp: 1750, streak: 6, selectedLanguage: 'english', avatarColor: 'bg-blue-600' },
  { id: 'u5', name: 'Snehal Patil', xp: 1540, streak: 7, selectedLanguage: 'marathi', avatarColor: 'bg-amber-600' },
  { id: 'u6', name: 'Vikram Joshi', xp: 1390, streak: 5, selectedLanguage: 'hindi', avatarColor: 'bg-teal-600' },
  { id: 'u7', name: 'Ananya Roy', xp: 1210, streak: 4, selectedLanguage: 'english', avatarColor: 'bg-rose-600' },
  { id: 'u8', name: 'Omkar Shinde', xp: 980, streak: 3, selectedLanguage: 'marathi', avatarColor: 'bg-violet-600' }
];

export const MARATHI_LESSONS: Lesson[] = [
  {
    id: 'mr-1',
    title: 'Introduction to Marathi',
    marathiTitle: 'मराठी भाषेची ओळख',
    language: 'marathi',
    category: 'Foundations',
    level: 'beginner',
    order: 1,
    durationMinutes: 10,
    description: 'Learn about the rich history of the Marathi language, the Devanagari script, and basic speech tones.',
    vocabulary: [
      { id: 'v1', word: 'नमस्कार', transliteration: 'Namaskar', meaning: 'Hello / Greetings', exampleSentence: 'सर्वांना नमस्कार.', exampleTranslation: 'Greetings to everyone.' },
      { id: 'v2', word: 'महाराष्ट्र', transliteration: 'Maharashtra', meaning: 'Maharashtra state', exampleSentence: 'महाराष्ट्र ही संतांची भूमी आहे.', exampleTranslation: 'Maharashtra is the land of saints.' },
      { id: 'v3', word: 'भाषा', transliteration: 'Bhasha', meaning: 'Language', exampleSentence: 'मराठी माझी मातृभाषा आहे.', exampleTranslation: 'Marathi is my mother tongue.' },
      { id: 'v4', word: 'मित्र', transliteration: 'Mitra', meaning: 'Friend', exampleSentence: 'हा माझा मित्र आहे.', exampleTranslation: 'He is my friend.' },
      { id: 'v5', word: 'स्वागत', transliteration: 'Swagat', meaning: 'Welcome', exampleSentence: 'आपले स्वागत आहे.', exampleTranslation: 'You are welcome.' }
    ],
    flashcards: [
      { id: 'fc1', front: 'नमस्कार', transliteration: 'Namaskar', back: 'Hello / Respectful Greetings', hint: 'Universal Marathi greeting' },
      { id: 'fc2', front: 'स्वागत', transliteration: 'Swagat', back: 'Welcome', hint: 'Welcoming someone home' },
      { id: 'fc3', front: 'मातृभाषा', transliteration: 'Matrubhasha', back: 'Mother Tongue', hint: 'Native speech' },
      { id: 'fc4', front: 'मित्र', transliteration: 'Mitra', back: 'Friend', hint: 'Companion' }
    ],
    speakingPhrases: [
      { id: 'sp1', phrase: 'नमस्कार', transliteration: 'Namaskar', meaning: 'Hello' },
      { id: 'sp2', phrase: 'आपले स्वागत आहे', transliteration: 'Aaple swagat aahe', meaning: 'You are welcome' }
    ]
  },
  {
    id: 'mr-2',
    title: 'Marathi Vowels – स्वर',
    marathiTitle: 'मराठी स्वर',
    language: 'marathi',
    category: 'Alphabet',
    level: 'beginner',
    order: 2,
    durationMinutes: 15,
    description: 'Master the 12 classic Marathi vowels (Swar) with accurate pronunciation and foundational example words.',
    characters: [
      { char: 'अ', transliteration: 'A', exampleWord: 'अननस (Ananas)', exampleMeaning: 'Pineapple', pronunciationHint: 'Short "u" as in "cup"' },
      { char: 'आ', transliteration: 'Aa', exampleWord: 'आई (Aai)', exampleMeaning: 'Mother', pronunciationHint: 'Long "aa" as in "father"' },
      { char: 'इ', transliteration: 'I', exampleWord: 'इमारत (Imaarat)', exampleMeaning: 'Building', pronunciationHint: 'Short "i" as in "bit"' },
      { char: 'ई', transliteration: 'Ee', exampleWord: 'ईडलिंबू (Eedlimbu)', exampleMeaning: 'Wild Lemon', pronunciationHint: 'Long "ee" as in "meet"' },
      { char: 'उ', transliteration: 'U', exampleWord: 'उखळ (Ukhal)', exampleMeaning: 'Mortar', pronunciationHint: 'Short "u" as in "put"' },
      { char: 'ऊ', transliteration: 'Oo', exampleWord: 'ऊस (Oos)', exampleMeaning: 'Sugarcane', pronunciationHint: 'Long "oo" as in "boot"' },
      { char: 'ऋ', transliteration: 'Ru', exampleWord: 'ऋषी (Rushi)', exampleMeaning: 'Sage / Hermit', pronunciationHint: '"ri/ru" sound' },
      { char: 'ए', transliteration: 'E', exampleWord: 'एक (Ek)', exampleMeaning: 'One', pronunciationHint: 'Pure "e" as in "gate"' },
      { char: 'ऐ', transliteration: 'Ai', exampleWord: 'ऐरण (Airan)', exampleMeaning: 'Anvil', pronunciationHint: '"ai" diphthong as in "aisle"' },
      { char: 'ओ', transliteration: 'O', exampleWord: 'ओठ (Oth)', exampleMeaning: 'Lip', pronunciationHint: '"o" as in "boat"' },
      { char: 'औ', transliteration: 'Au', exampleWord: 'औषध (Aushadh)', exampleMeaning: 'Medicine', pronunciationHint: '"au" sound as in "cow"' },
      { char: 'अं', transliteration: 'Am', exampleWord: 'अंगठी (Angathi)', exampleMeaning: 'Ring', pronunciationHint: 'Nasal anusvara sound' },
      { char: 'अः', transliteration: 'Ah', exampleWord: 'पुनः (Punah)', exampleMeaning: 'Again', pronunciationHint: 'Aspiration visarga sound' }
    ],
    vocabulary: [
      { id: 'v201', word: 'अननस', transliteration: 'Ananas', meaning: 'Pineapple' },
      { id: 'v202', word: 'आई', transliteration: 'Aai', meaning: 'Mother' },
      { id: 'v203', word: 'इमारत', transliteration: 'Imaarat', meaning: 'Building' },
      { id: 'v204', word: 'ऊस', transliteration: 'Oos', meaning: 'Sugarcane' },
      { id: 'v205', word: 'औषध', transliteration: 'Aushadh', meaning: 'Medicine' }
    ],
    matchPairs: [
      { id: 'm1', left: 'आई', right: 'Mother' },
      { id: 'm2', left: 'ऊस', right: 'Sugarcane' },
      { id: 'm3', left: 'औषध', right: 'Medicine' },
      { id: 'm4', left: 'अननस', right: 'Pineapple' }
    ],
    fillInBlanks: [
      { id: 'fb1', sentence: 'माझी ____ खूप प्रेमळ आहे.', missingWord: 'आई', options: ['आई', 'ऊस', 'ओठ', 'इमारत'], translation: 'My mother is very loving.' },
      { id: 'fb2', sentence: 'डॉक्टरांनी मला ____ दिले.', missingWord: 'औषध', options: ['औषध', 'अननस', 'एक', 'अंगठी'], translation: 'The doctor gave me medicine.' }
    ]
  },
  {
    id: 'mr-3',
    title: 'Marathi Consonants – व्यंजन',
    marathiTitle: 'मराठी व्यंजने',
    language: 'marathi',
    category: 'Alphabet',
    level: 'beginner',
    order: 3,
    durationMinutes: 15,
    description: 'Learn the core consonants from क to ज्ञ, classified by vocal articulation points.',
    characters: [
      { char: 'क', transliteration: 'Ka', exampleWord: 'कमळ (Kamal)', exampleMeaning: 'Lotus', pronunciationHint: 'Velar unvoiced' },
      { char: 'ख', transliteration: 'Kha', exampleWord: 'खडू (Khadu)', exampleMeaning: 'Chalk', pronunciationHint: 'Aspirated Ka' },
      { char: 'ग', transliteration: 'Ga', exampleWord: 'गणपती (Ganpati)', exampleMeaning: 'Lord Ganesha', pronunciationHint: 'Velar voiced' },
      { char: 'घ', transliteration: 'Gha', exampleWord: 'घर (Ghar)', exampleMeaning: 'House', pronunciationHint: 'Aspirated Ga' },
      { char: 'च', transliteration: 'Cha', exampleWord: 'चमचा (Chamcha)', exampleMeaning: 'Spoon', pronunciationHint: 'Palatal' },
      { char: 'छ', transliteration: 'Chha', exampleWord: 'छत्री (Chhatri)', exampleMeaning: 'Umbrella', pronunciationHint: 'Aspirated Cha' },
      { char: 'ज', transliteration: 'Ja', exampleWord: 'जहाज (Jahaj)', exampleMeaning: 'Ship', pronunciationHint: 'Palatal voiced' },
      { char: 'झ', transliteration: 'Jha', exampleWord: 'झेंडा (Jhenda)', exampleMeaning: 'Flag', pronunciationHint: 'Aspirated Ja' },
      { char: 'ट', transliteration: 'Ta', exampleWord: 'टोमॅटो (Tomato)', exampleMeaning: 'Tomato', pronunciationHint: 'Retroflex' },
      { char: 'ड', transliteration: 'Da', exampleWord: 'डबा (Daba)', exampleMeaning: 'Tiffin Box', pronunciationHint: 'Retroflex voiced' },
      { char: 'त', transliteration: 'Ta (dental)', exampleWord: 'तलाव (Talav)', exampleMeaning: 'Lake', pronunciationHint: 'Dental soft T' },
      { char: 'द', transliteration: 'Da (dental)', exampleWord: 'दवाखाना (Davakhana)', exampleMeaning: 'Clinic', pronunciationHint: 'Dental soft D' },
      { char: 'प', transliteration: 'Pa', exampleWord: 'पतंग (Patang)', exampleMeaning: 'Kite', pronunciationHint: 'Labial unvoiced' },
      { char: 'म', transliteration: 'Ma', exampleWord: 'मासा (Masa)', exampleMeaning: 'Fish', pronunciationHint: 'Labial nasal' },
      { char: 'ळ', transliteration: 'La (retroflex)', exampleWord: 'बाळ (Baal)', exampleMeaning: 'Child', pronunciationHint: 'Unique Marathi retroflex lateral' }
    ],
    vocabulary: [
      { id: 'v301', word: 'कमळ', transliteration: 'Kamal', meaning: 'Lotus' },
      { id: 'v302', word: 'घर', transliteration: 'Ghar', meaning: 'House' },
      { id: 'v303', word: 'छत्री', transliteration: 'Chhatri', meaning: 'Umbrella' },
      { id: 'v304', word: 'बाळ', transliteration: 'Baal', meaning: 'Child' },
      { id: 'v305', word: 'पाणी', transliteration: 'Paani', meaning: 'Water' }
    ]
  },
  {
    id: 'mr-4',
    title: 'Barakhadi – बाराखडी',
    marathiTitle: 'मराठी बाराखडी',
    language: 'marathi',
    category: 'Grammar',
    level: 'beginner',
    order: 4,
    durationMinutes: 12,
    description: 'Understand how vowels combine with consonants (Matras) to produce 12 standard syllables.',
    barakhadi: [
      {
        consonant: 'क',
        vowelCombinations: [
          { symbol: '', char: 'क', transliteration: 'Ka' },
          { symbol: 'ा', char: 'का', transliteration: 'Kaa' },
          { symbol: 'ि', char: 'कि', transliteration: 'Ki' },
          { symbol: 'ी', char: 'की', transliteration: 'Kee' },
          { symbol: 'ु', char: 'कु', transliteration: 'Ku' },
          { symbol: 'ू', char: 'कू', transliteration: 'Koo' },
          { symbol: 'े', char: 'के', transliteration: 'Ke' },
          { symbol: 'ै', char: 'कै', transliteration: 'Kai' },
          { symbol: 'ो', char: 'को', transliteration: 'Ko' },
          { symbol: 'ौ', char: 'कौ', transliteration: 'Kau' },
          { symbol: 'ं', char: 'कं', transliteration: 'Kam' },
          { symbol: 'ः', char: 'कः', transliteration: 'Kah' }
        ]
      },
      {
        consonant: 'म',
        vowelCombinations: [
          { symbol: '', char: 'म', transliteration: 'Ma' },
          { symbol: 'ा', char: 'मा', transliteration: 'Maa' },
          { symbol: 'ि', char: 'मि', transliteration: 'Mi' },
          { symbol: 'ी', char: 'मी', transliteration: 'Mee' },
          { symbol: 'ु', char: 'मु', transliteration: 'Mu' },
          { symbol: 'ू', char: 'मू', transliteration: 'Moo' },
          { symbol: 'े', char: 'मे', transliteration: 'Me' },
          { symbol: 'ै', char: 'मै', transliteration: 'Mai' },
          { symbol: 'ो', char: 'मो', transliteration: 'Mo' },
          { symbol: 'ौ', char: 'मौ', transliteration: 'Mau' },
          { symbol: 'ं', char: 'मं', transliteration: 'Mam' },
          { symbol: 'ः', char: 'मः', transliteration: 'Mah' }
        ]
      }
    ],
    vocabulary: [
      { id: 'v401', word: 'काका', transliteration: 'Kaka', meaning: 'Uncle' },
      { id: 'v402', word: 'किडा', transliteration: 'Kida', meaning: 'Insect' },
      { id: 'v403', word: 'कीडा', transliteration: 'Kida', meaning: 'Worm' },
      { id: 'v404', word: 'कुत्रा', transliteration: 'Kutra', meaning: 'Dog' },
      { id: 'v405', word: 'केळे', transliteration: 'Kele', meaning: 'Banana' }
    ]
  },
  {
    id: 'mr-5',
    title: 'Numbers – अंक (1 to 20)',
    marathiTitle: 'मराठी अंक १ ते २०',
    language: 'marathi',
    category: 'Vocabulary',
    level: 'beginner',
    order: 5,
    durationMinutes: 10,
    description: 'Learn to count and read Devanagari numerals from 1 to 20.',
    vocabulary: [
      { id: 'num1', word: '१ - एक', transliteration: 'Ek', meaning: 'One (1)' },
      { id: 'num2', word: '२ - दोन', transliteration: 'Don', meaning: 'Two (2)' },
      { id: 'num3', word: '३ - तीन', transliteration: 'Teen', meaning: 'Three (3)' },
      { id: 'num4', word: '४ - चार', transliteration: 'Chaar', meaning: 'Four (4)' },
      { id: 'num5', word: '५ - पाच', transliteration: 'Paach', meaning: 'Five (5)' },
      { id: 'num6', word: '६ - सहा', transliteration: 'Saha', meaning: 'Six (6)' },
      { id: 'num7', word: '७ - सात', transliteration: 'Saat', meaning: 'Seven (7)' },
      { id: 'num8', word: '८ - आठ', transliteration: 'Aath', meaning: 'Eight (8)' },
      { id: 'num9', word: '९ - नऊ', transliteration: 'Nau', meaning: 'Nine (9)' },
      { id: 'num10', word: '१० - दहा', transliteration: 'Daha', meaning: 'Ten (10)' },
      { id: 'num11', word: '१५ - पंधरा', transliteration: 'Pandhra', meaning: 'Fifteen (15)' },
      { id: 'num12', word: '२० - वीस', transliteration: 'Vees', meaning: 'Twenty (20)' }
    ],
    matchPairs: [
      { id: 'mp1', left: 'दोन', right: 'Two (2)' },
      { id: 'mp2', left: 'पाच', right: 'Five (5)' },
      { id: 'mp3', left: 'दहा', right: 'Ten (10)' },
      { id: 'mp4', left: 'वीस', right: 'Twenty (20)' }
    ]
  },
  {
    id: 'mr-6',
    title: 'Colors – रंग',
    marathiTitle: 'रंग आणि त्यांची नावे',
    language: 'marathi',
    category: 'Vocabulary',
    level: 'beginner',
    order: 6,
    durationMinutes: 10,
    description: 'Names of all fundamental colors in Marathi with practical context.',
    vocabulary: [
      { id: 'col1', word: 'लाल', transliteration: 'Laal', meaning: 'Red', exampleSentence: 'टोमॅटो लाल आहे.', exampleTranslation: 'Tomato is red.' },
      { id: 'col2', word: 'निळा', transliteration: 'Nila', meaning: 'Blue', exampleSentence: 'आकाश निळे आहे.', exampleTranslation: 'Sky is blue.' },
      { id: 'col3', word: 'हिरवा', transliteration: 'Hirva', meaning: 'Green', exampleSentence: 'पान हिरवे आहे.', exampleTranslation: 'Leaf is green.' },
      { id: 'col4', word: 'पिवळा', transliteration: 'Pivla', meaning: 'Yellow', exampleSentence: 'सूर्यफूल पिवळे आहे.', exampleTranslation: 'Sunflower is yellow.' },
      { id: 'col5', word: 'पांढरा', transliteration: 'Pandhra', meaning: 'White', exampleSentence: 'दूध पांढरे आहे.', exampleTranslation: 'Milk is white.' },
      { id: 'col6', word: 'काळा', transliteration: 'Kala', meaning: 'Black', exampleSentence: 'कावळा काळा आहे.', exampleTranslation: 'Crow is black.' },
      { id: 'col7', word: 'केशरी', transliteration: 'Keshari', meaning: 'Saffron / Orange' }
    ]
  },
  {
    id: 'mr-7',
    title: 'Family Members – नातेवाईक',
    marathiTitle: 'कुटुंब आणि नातेवाईक',
    language: 'marathi',
    category: 'Conversation',
    level: 'beginner',
    order: 7,
    durationMinutes: 12,
    description: 'Terms for relationships and immediate/extended family in Marathi culture.',
    vocabulary: [
      { id: 'f1', word: 'आई', transliteration: 'Aai', meaning: 'Mother' },
      { id: 'f2', word: 'वडील / बाबा', transliteration: 'Vadil / Baba', meaning: 'Father' },
      { id: 'f3', word: 'भाऊ', transliteration: 'Bhau', meaning: 'Brother' },
      { id: 'f4', word: 'बहीण', transliteration: 'Bahin', meaning: 'Sister' },
      { id: 'f5', word: 'आजोबा', transliteration: 'Ajoba', meaning: 'Grandfather' },
      { id: 'f6', word: 'आजी', transliteration: 'Aaji', meaning: 'Grandmother' },
      { id: 'f7', word: 'काका', transliteration: 'Kaka', meaning: 'Paternal Uncle' },
      { id: 'f8', word: 'मामा', transliteration: 'Mama', meaning: 'Maternal Uncle' }
    ]
  },
  {
    id: 'mr-8',
    title: 'Common Objects – रोजच्या वस्तू',
    marathiTitle: 'दैनंदिन वापरातील वस्तू',
    language: 'marathi',
    category: 'Vocabulary',
    level: 'beginner',
    order: 8,
    durationMinutes: 10,
    description: 'Learn words for items you see and use everyday at home, school, and work.',
    vocabulary: [
      { id: 'o1', word: 'पाणी', transliteration: 'Paani', meaning: 'Water' },
      { id: 'o2', word: 'पुस्तक', transliteration: 'Pustak', meaning: 'Book' },
      { id: 'o3', word: 'घर', transliteration: 'Ghar', meaning: 'House' },
      { id: 'o4', word: 'शाळा', transliteration: 'Shaala', meaning: 'School' },
      { id: 'o5', word: 'खुर्ची', transliteration: 'Khurchi', meaning: 'Chair' },
      { id: 'o6', word: 'टेबल', transliteration: 'Table', meaning: 'Table' },
      { id: 'o7', word: 'दरवाजा', transliteration: 'Darwaja', meaning: 'Door' },
      { id: 'o8', word: 'खिडकी', transliteration: 'Khidki', meaning: 'Window' }
    ]
  },
  {
    id: 'mr-9',
    title: 'Greetings & Politeness – शिष्टाचार',
    marathiTitle: 'अभिवादन आणि नम्र शब्द',
    language: 'marathi',
    category: 'Conversation',
    level: 'beginner',
    order: 9,
    durationMinutes: 10,
    description: 'Polite words used in morning, evening, thankfulness, and seeking pardon.',
    vocabulary: [
      { id: 'g1', word: 'शुभ सकाळ', transliteration: 'Shubh Sakal', meaning: 'Good Morning' },
      { id: 'g2', word: 'शुभ रात्री', transliteration: 'Shubh Raatri', meaning: 'Good Night' },
      { id: 'g3', word: 'धन्यवाद', transliteration: 'Dhanyawaad', meaning: 'Thank You' },
      { id: 'g4', word: 'कृपया', transliteration: 'Krupaya', meaning: 'Please' },
      { id: 'g5', word: 'क्षमस्व', transliteration: 'Kshamaswa', meaning: 'Excuse me / Sorry' },
      { id: 'g6', word: 'पुन्हा भेटू', transliteration: 'Punha bhetu', meaning: 'See you again' }
    ],
    speakingPhrases: [
      { id: 'sg1', phrase: 'शुभ सकाळ', transliteration: 'Shubh Sakal', meaning: 'Good Morning' },
      { id: 'sg2', phrase: 'खूप खूप धन्यवाद', transliteration: 'Khoop khoop dhanyawaad', meaning: 'Thank you very much' }
    ]
  },
  {
    id: 'mr-10',
    title: 'Basic Sentences – साधी वाक्ये',
    marathiTitle: 'दैनंदिन साधी वाक्ये',
    language: 'marathi',
    category: 'Conversation',
    level: 'beginner',
    order: 10,
    durationMinutes: 12,
    description: 'Forming your first sentences: Introducing yourself and asking simple questions.',
    vocabulary: [
      { id: 'bs1', word: 'माझे नाव...', transliteration: 'Maajhe naav...', meaning: 'My name is...' },
      { id: 'bs2', word: 'तुम्ही कसे आहात?', transliteration: 'Tumhi kase aahaat?', meaning: 'How are you? (Polite)' },
      { id: 'bs3', word: 'मी मजेत आहे.', transliteration: 'Mee majet aahe.', meaning: 'I am doing fine.' },
      { id: 'bs4', word: 'हे काय आहे?', transliteration: 'He kaay aahe?', meaning: 'What is this?' },
      { id: 'bs5', word: 'मला समजत नाही.', transliteration: 'Mala samajat naahi.', meaning: 'I do not understand.' }
    ],
    fillInBlanks: [
      { id: 'fbs1', sentence: 'माझे नाव राहुल ____.', missingWord: 'आहे', options: ['आहे', 'नाही', 'का', 'हो'], translation: 'My name is Rahul.' },
      { id: 'fbs2', sentence: 'तुम्ही कसे ____?', missingWord: 'आहात', options: ['आहात', 'आहे', 'होतो', 'गेले'], translation: 'How are you?' }
    ]
  },
  {
    id: 'mr-11',
    title: 'Grammar Basics: Gender – लिंग विचार',
    marathiTitle: 'व्याकरण: लिंग विचार',
    language: 'marathi',
    category: 'Grammar',
    level: 'intermediate',
    order: 11,
    durationMinutes: 15,
    description: 'Marathi uniquely features 3 grammatical genders: Masculine (तो), Feminine (ती), and Neuter (ते).',
    vocabulary: [
      { id: 'gnd1', word: 'तो मुलगा', transliteration: 'To mulga', meaning: 'That boy (Masculine)' },
      { id: 'gnd2', word: 'ती मुलगी', transliteration: 'Ti mulgi', meaning: 'That girl (Feminine)' },
      { id: 'gnd3', word: 'ते मूल / ते पुस्तक', transliteration: 'Te mool / Te pustak', meaning: 'That child / That book (Neuter)' },
      { id: 'gnd4', word: 'पुल्लिंग', transliteration: 'Pullinga', meaning: 'Masculine gender' },
      { id: 'gnd5', word: 'स्त्रीलिंग', transliteration: 'Streelinga', meaning: 'Feminine gender' },
      { id: 'gnd6', word: 'नपुंसकलिंग', transliteration: 'Napunsaklinga', meaning: 'Neuter gender' }
    ]
  },
  {
    id: 'mr-12',
    title: 'Pronouns – सर्वनाम',
    marathiTitle: 'मराठी सर्वनामे',
    language: 'marathi',
    category: 'Grammar',
    level: 'intermediate',
    order: 12,
    durationMinutes: 12,
    description: 'First, second, and third person pronouns with honorific distinctions.',
    vocabulary: [
      { id: 'pn1', word: 'मी', transliteration: 'Mee', meaning: 'I' },
      { id: 'pn2', word: 'आम्ही', transliteration: 'Aamhi', meaning: 'We (exclusive)' },
      { id: 'pn3', word: 'तू', transliteration: 'Too', meaning: 'You (informal / singular)' },
      { id: 'pn4', word: 'तुम्ही', transliteration: 'Tumhi', meaning: 'You (formal / plural)' },
      { id: 'pn5', word: 'तो / ती / ते', transliteration: 'To / Ti / Te', meaning: 'He / She / It or They' },
      { id: 'pn6', word: 'आपण', transliteration: 'Aapan', meaning: 'We (inclusive) or You (most respectful)' }
    ]
  },
  {
    id: 'mr-13',
    title: 'Verbs & Action Words – क्रियापदे',
    marathiTitle: 'महत्त्वाची क्रियापदे',
    language: 'marathi',
    category: 'Grammar',
    level: 'intermediate',
    order: 13,
    durationMinutes: 14,
    description: 'Essential action verbs in root infinitive form ending in -णे.',
    vocabulary: [
      { id: 'vb1', word: 'जाणे', transliteration: 'Jaane', meaning: 'To go' },
      { id: 'vb2', word: 'येणे', transliteration: 'Yene', meaning: 'To come' },
      { id: 'vb3', word: 'खाणे', transliteration: 'Khaane', meaning: 'To eat' },
      { id: 'vb4', word: 'पिणे', transliteration: 'Pine', meaning: 'To drink' },
      { id: 'vb5', word: 'बोलणे', transliteration: 'Bolne', meaning: 'To speak' },
      { id: 'vb6', word: 'वाचणे', transliteration: 'Vaachne', meaning: 'To read' },
      { id: 'vb7', word: 'लिहिणे', transliteration: 'Lihine', meaning: 'To write' }
    ]
  },
  {
    id: 'mr-14',
    title: 'Tenses – काळ आणि त्याचे प्रकार',
    marathiTitle: 'वर्तमान, भूत आणि भविष्यकाळ',
    language: 'marathi',
    category: 'Grammar',
    level: 'intermediate',
    order: 14,
    durationMinutes: 15,
    description: 'Conjugating Marathi verbs in Present (वर्तमानकाळ), Past (भूतकाळ), and Future (भविष्यकाळ).',
    vocabulary: [
      { id: 't1', word: 'मी आंबा खातो', transliteration: 'Mee aamba khaato', meaning: 'I eat mango (Present)' },
      { id: 't2', word: 'मी आंबा खाल्ला', transliteration: 'Mee aamba khaalla', meaning: 'I ate mango (Past)' },
      { id: 't3', word: 'मी आंबा खाईन', transliteration: 'Mee aamba khaaeen', meaning: 'I will eat mango (Future)' },
      { id: 't4', word: 'काळ', transliteration: 'Kaal', meaning: 'Tense / Time' }
    ]
  },
  {
    id: 'mr-15',
    title: 'Sentence Formation – वाक्यरचना',
    marathiTitle: 'मराठी वाक्यरचना (SOV)',
    language: 'marathi',
    category: 'Grammar',
    level: 'intermediate',
    order: 15,
    durationMinutes: 14,
    description: 'Marathi follows the Subject-Object-Verb (कर्ता + कर्म + क्रियापद) order.',
    vocabulary: [
      { id: 'sf1', word: 'मी पाणी पितो.', transliteration: 'Mee paani peeto.', meaning: 'I drink water (I + Water + Drink).' },
      { id: 'sf2', word: 'आई जेवण बनवते.', transliteration: 'Aai jevan banavate.', meaning: 'Mother makes meal.' },
      { id: 'sf3', word: 'राहुल शाळेत जातो.', transliteration: 'Rahul shaalet jaato.', meaning: 'Rahul goes to school.' }
    ]
  },
  {
    id: 'mr-16',
    title: 'Daily Conversations – दैनंदिन संवाद',
    marathiTitle: 'घरात व कार्यालयात संवाद',
    language: 'marathi',
    category: 'Conversation',
    level: 'intermediate',
    order: 16,
    durationMinutes: 15,
    description: 'Real conversation practice for meeting colleagues, discussing the weather, and schedules.',
    vocabulary: [
      { id: 'dc1', word: 'आज खूप ऊन आहे.', transliteration: 'Aaj khoop oon aahe.', meaning: 'It is very sunny/hot today.' },
      { id: 'dc2', word: 'तुम्ही काय करता?', transliteration: 'Tumhi kaay kartaa?', meaning: 'What do you do?' },
      { id: 'dc3', word: 'चला, चहा घेऊया.', transliteration: 'Chala, chahaa gheuya.', meaning: 'Come, let us have tea.' }
    ]
  },
  {
    id: 'mr-17',
    title: 'Shopping & Market Conversations – बाजारात खरेदी',
    marathiTitle: 'भाजी मार्केट आणि दुकानातील संवाद',
    language: 'marathi',
    category: 'Conversation',
    level: 'intermediate',
    order: 17,
    durationMinutes: 14,
    description: 'Bargaining, asking prices, measuring in kilos, and paying via UPI in local Maharashtra markets.',
    vocabulary: [
      { id: 'mk1', word: 'याची किंमत काय आहे?', transliteration: 'Yaachi kimmat kaay aahe?', meaning: 'What is the price of this?' },
      { id: 'mk2', word: 'काही कमी करा ना!', transliteration: 'Kaahi kami karaa naa!', meaning: 'Please give some discount!' },
      { id: 'mk3', word: 'मला एक किलो द्या.', transliteration: 'Mala ek kilo dyaa.', meaning: 'Give me one kilogram.' },
      { id: 'mk4', word: 'ऑनलाइन पेमेंट चालेल का?', transliteration: 'Online payment chaalel kaa?', meaning: 'Does online payment work?' }
    ]
  },
  {
    id: 'mr-18',
    title: 'Travel & Directions – प्रवास आणि दिशा',
    marathiTitle: 'रिक्षा, बस व रेल्वे प्रवास',
    language: 'marathi',
    category: 'Conversation',
    level: 'intermediate',
    order: 18,
    durationMinutes: 15,
    description: 'Navigating Mumbai/Pune local trains, auto-rickshaws, and asking for directions.',
    vocabulary: [
      { id: 'tr1', word: 'स्टेशन कुठे आहे?', transliteration: 'Station kuthe aahe?', meaning: 'Where is the station?' },
      { id: 'tr2', word: 'पुढील स्थानक कोणते?', transliteration: 'Pudhil sthanak konte?', meaning: 'Which is the next station?' },
      { id: 'tr3', word: 'डावीकडे वळा', transliteration: 'Daaveekade valaa', meaning: 'Turn left' },
      { id: 'tr4', word: 'उजवीकडे वळा', transliteration: 'Ujveekade valaa', meaning: 'Turn right' },
      { id: 'tr5', word: 'सरळ जा', transliteration: 'Saral jaa', meaning: 'Go straight' }
    ]
  },
  {
    id: 'mr-19',
    title: 'Advanced Grammar: Vibhakti – विभक्ती प्रत्यय',
    marathiTitle: 'कारकार्थ आणि विभक्ती',
    language: 'marathi',
    category: 'Grammar',
    level: 'advanced',
    order: 19,
    durationMinutes: 16,
    description: 'Master case-markers: चा/ची/चे (possession), ला/ना (to/for), ने (by/with), त (in/inside).',
    vocabulary: [
      { id: 'vbk1', word: 'रामाचा भाऊ', transliteration: 'Ramacha bhau', meaning: 'Rama\'s brother (Genitive)' },
      { id: 'vbk2', word: 'घरात', transliteration: 'Gharat', meaning: 'Inside the house (Locative)' },
      { id: 'vbk3', word: 'हाताने', transliteration: 'Haataane', meaning: 'With the hand (Instrumental)' },
      { id: 'vbk4', word: 'मित्राला', transliteration: 'Mitraala', meaning: 'To the friend (Dative)' }
    ]
  },
  {
    id: 'mr-20',
    title: 'Reading Practice: Literature & Abhang – वाचन सराव',
    marathiTitle: 'संत साहित्य व बोधकथा',
    language: 'marathi',
    category: 'Literature',
    level: 'advanced',
    order: 20,
    durationMinutes: 18,
    description: 'Read inspirational verses by Sant Tukaram, Sant Dnyaneshwar, and moral tales.',
    vocabulary: [
      { id: 'lit1', word: 'वृक्षवल्ली आम्हा सोयरी वनचरे', transliteration: 'Vrukshavalli aamha soyari vanchare', meaning: 'Trees and forest animals are our kin.' },
      { id: 'lit2', word: 'पसायदान', transliteration: 'Pasaaydaan', meaning: 'Universal prayer for world benevolence' },
      { id: 'lit3', word: 'संस्कृती', transliteration: 'Sanskrooti', meaning: 'Culture and heritage' }
    ]
  },
  {
    id: 'mr-21',
    title: 'Proverbs & Idioms – म्हणी व वाक्प्रचार',
    marathiTitle: 'प्रसिद्ध मराठी म्हणी',
    language: 'marathi',
    category: 'Literature',
    level: 'advanced',
    order: 21,
    durationMinutes: 15,
    description: 'Timeless Marathi proverbs that bring natural native flair to your speech.',
    vocabulary: [
      { id: 'prv1', word: 'अति तिथे माती', transliteration: 'Ati tithe maati', meaning: 'Excess of anything results in ruin' },
      { id: 'prv2', word: 'नाचता येईना अंगण वाकडे', transliteration: 'Naachta yeeina angan vaakde', meaning: 'Blaming tools/setting for one\'s own lack of skill' },
      { id: 'prv3', word: 'काखेत कळसा गावाला वळसा', transliteration: 'Kaakhet kalasa gaavaala valsa', meaning: 'Searching the world for what is right with you' }
    ]
  },
  {
    id: 'mr-22',
    title: 'Real-Life Conversations & Interviews – सखोल संवाद',
    marathiTitle: 'गंभीर चर्चा आणि संवाद',
    language: 'marathi',
    category: 'Conversation',
    level: 'advanced',
    order: 22,
    durationMinutes: 20,
    description: 'Participate fluently in job discussions, Ganeshotsav festival planning, and public speaking.',
    vocabulary: [
      { id: 'rl1', word: 'उत्सव आणि परंपरा', transliteration: 'Utsav aani parampara', meaning: 'Festivals and tradition' },
      { id: 'rl2', word: 'माझे मत असे आहे...', transliteration: 'Maajhe mat ase aahe...', meaning: 'In my humble opinion...' },
      { id: 'rl3', word: 'नियोजन आणि विकास', transliteration: 'Niyojan aani vikaas', meaning: 'Planning and progress' }
    ]
  }
];

export const HINDI_LESSONS: Lesson[] = [
  {
    id: 'hi-1',
    title: 'Hindi Vowels – वर्णमाला व स्वर',
    marathiTitle: 'हिंदी स्वर',
    language: 'hindi',
    category: 'Alphabet',
    level: 'beginner',
    order: 1,
    durationMinutes: 12,
    description: 'Learn the primary Hindi vowels with clear audio transliteration and standard vocabulary.',
    characters: [
      { char: 'अ', transliteration: 'A', exampleWord: 'अनार (Anaar)', exampleMeaning: 'Pomegranate', pronunciationHint: 'Short "u" as in "cut"' },
      { char: 'आ', transliteration: 'Aa', exampleWord: 'आम (Aam)', exampleMeaning: 'Mango', pronunciationHint: 'Long "aa" as in "calm"' },
      { char: 'इ', transliteration: 'I', exampleWord: 'इमली (Imli)', exampleMeaning: 'Tamarind', pronunciationHint: 'Short "i" as in "sit"' },
      { char: 'ई', transliteration: 'Ee', exampleWord: 'ईख (Eekh)', exampleMeaning: 'Sugarcane', pronunciationHint: 'Long "ee" as in "feed"' },
      { char: 'उ', transliteration: 'U', exampleWord: 'उल्लू (Ullu)', exampleMeaning: 'Owl', pronunciationHint: 'Short "u" as in "put"' },
      { char: 'ऊ', transliteration: 'Oo', exampleWord: 'ऊन (Oon)', exampleMeaning: 'Wool', pronunciationHint: 'Long "oo" as in "moon"' },
      { char: 'ए', transliteration: 'E', exampleWord: 'एक (Ek)', exampleMeaning: 'One', pronunciationHint: '"e" as in "lake"' },
      { char: 'ऐ', transliteration: 'Ai', exampleWord: 'ऐनक (Ainak)', exampleMeaning: 'Spectacles', pronunciationHint: '"ai" as in "eye"' },
      { char: 'ओ', transliteration: 'O', exampleWord: 'ओखली (Okhli)', exampleMeaning: 'Mortar', pronunciationHint: '"o" as in "rope"' },
      { char: 'औ', transliteration: 'Au', exampleWord: 'औरत (Aurat)', exampleMeaning: 'Woman', pronunciationHint: '"au" as in "now"' }
    ],
    vocabulary: [
      { id: 'hv1', word: 'आम', transliteration: 'Aam', meaning: 'Mango' },
      { id: 'hv2', word: 'अनार', transliteration: 'Anaar', meaning: 'Pomegranate' },
      { id: 'hv3', word: 'एक', transliteration: 'Ek', meaning: 'One' },
      { id: 'hv4', word: 'औरत', transliteration: 'Aurat', meaning: 'Woman' }
    ]
  },
  {
    id: 'hi-2',
    title: 'Hindi Consonants – व्यंजन',
    marathiTitle: 'हिंदी व्यंजन',
    language: 'hindi',
    category: 'Alphabet',
    level: 'beginner',
    order: 2,
    durationMinutes: 15,
    description: 'Learn foundational Hindi consonants with vocalization tips and common words.',
    characters: [
      { char: 'क', transliteration: 'Ka', exampleWord: 'कबूतर (Kabootar)', exampleMeaning: 'Pigeon', pronunciationHint: 'Velar unaspirated' },
      { char: 'ख', transliteration: 'Kha', exampleWord: 'खरगोश (Khargosh)', exampleMeaning: 'Rabbit', pronunciationHint: 'Velar aspirated' },
      { char: 'ग', transliteration: 'Ga', exampleWord: 'गमला (Gamla)', exampleMeaning: 'Flower pot', pronunciationHint: 'Velar voiced' },
      { char: 'घ', transliteration: 'Gha', exampleWord: 'घर (Ghar)', exampleMeaning: 'House', pronunciationHint: 'Velar voiced aspirated' },
      { char: 'च', transliteration: 'Cha', exampleWord: 'चम्मच (Chammach)', exampleMeaning: 'Spoon', pronunciationHint: 'Palatal' },
      { char: 'छ', transliteration: 'Chha', exampleWord: 'छतरी (Chhatri)', exampleMeaning: 'Umbrella', pronunciationHint: 'Palatal aspirated' },
      { char: 'प', transliteration: 'Pa', exampleWord: 'पतंग (Patang)', exampleMeaning: 'Kite', pronunciationHint: 'Bilabial' }
    ],
    vocabulary: [
      { id: 'hv21', word: 'घर', transliteration: 'Ghar', meaning: 'House' },
      { id: 'hv22', word: 'किताब', transliteration: 'Kitaab', meaning: 'Book' },
      { id: 'hv23', word: 'पानी', transliteration: 'Paani', meaning: 'Water' }
    ]
  },
  {
    id: 'hi-3',
    title: 'Hindi Numbers 1 to 20 – गिनती',
    marathiTitle: 'हिंदी गिनती १ से २०',
    language: 'hindi',
    category: 'Vocabulary',
    level: 'beginner',
    order: 3,
    durationMinutes: 10,
    description: 'Learn to count from 1 to 20 in Hindi.',
    vocabulary: [
      { id: 'hn1', word: '१ - एक', transliteration: 'Ek', meaning: 'One' },
      { id: 'hn2', word: '२ - दो', transliteration: 'Do', meaning: 'Two' },
      { id: 'hn3', word: '३ - तीन', transliteration: 'Teen', meaning: 'Three' },
      { id: 'hn4', word: '४ - चार', transliteration: 'Chaar', meaning: 'Four' },
      { id: 'hn5', word: '५ - पाँच', transliteration: 'Paanch', meaning: 'Five' },
      { id: 'hn6', word: '१० - दस', transliteration: 'Dus', meaning: 'Ten' },
      { id: 'hn7', word: '२० - बीस', transliteration: 'Bees', meaning: 'Twenty' }
    ]
  },
  {
    id: 'hi-4',
    title: 'Colors – रंग',
    marathiTitle: 'हिंदी में रंगों के नाम',
    language: 'hindi',
    category: 'Vocabulary',
    level: 'beginner',
    order: 4,
    durationMinutes: 10,
    description: 'Common color names in Hindi.',
    vocabulary: [
      { id: 'hc1', word: 'लाल', transliteration: 'Laal', meaning: 'Red' },
      { id: 'hc2', word: 'नीला', transliteration: 'Neela', meaning: 'Blue' },
      { id: 'hc3', word: 'हरा', transliteration: 'Hara', meaning: 'Green' },
      { id: 'hc4', word: 'पीला', transliteration: 'Peela', meaning: 'Yellow' },
      { id: 'hc5', word: 'सफ़ेद', transliteration: 'Safed', meaning: 'White' },
      { id: 'hc6', word: 'काला', transliteration: 'Kaala', meaning: 'Black' }
    ]
  },
  {
    id: 'hi-5',
    title: 'Family & Relations – रिश्ते',
    marathiTitle: 'परिवार और रिश्ते',
    language: 'hindi',
    category: 'Conversation',
    level: 'beginner',
    order: 5,
    durationMinutes: 12,
    description: 'Names of family members in Hindi.',
    vocabulary: [
      { id: 'hr1', word: 'माताजी / माँ', transliteration: 'Mataji / Maa', meaning: 'Mother' },
      { id: 'hr2', word: 'पिताजी / पापा', transliteration: 'Pitaji / Papa', meaning: 'Father' },
      { id: 'hr3', word: 'भाई', transliteration: 'Bhai', meaning: 'Brother' },
      { id: 'hr4', word: 'बहन', transliteration: 'Bahan', meaning: 'Sister' },
      { id: 'hr5', word: 'दादाजी', transliteration: 'Dadaji', meaning: 'Paternal Grandfather' },
      { id: 'hr6', word: 'दादीजी', transliteration: 'Dadiji', meaning: 'Paternal Grandmother' }
    ]
  },
  {
    id: 'hi-6',
    title: 'Daily Objects – घरेलू वस्तुएं',
    marathiTitle: 'दैनिक वस्तुएं',
    language: 'hindi',
    category: 'Vocabulary',
    level: 'beginner',
    order: 6,
    durationMinutes: 10,
    description: 'Everyday household objects.',
    vocabulary: [
      { id: 'hdo1', word: 'पानी', transliteration: 'Paani', meaning: 'Water' },
      { id: 'hdo2', word: 'किताब', transliteration: 'Kitaab', meaning: 'Book' },
      { id: 'hdo3', word: 'मेज', transliteration: 'Mez', meaning: 'Table' },
      { id: 'hdo4', word: 'कुर्सी', transliteration: 'Kursi', meaning: 'Chair' },
      { id: 'hdo5', word: 'दरवाज़ा', transliteration: 'Darwaza', meaning: 'Door' }
    ]
  },
  {
    id: 'hi-7',
    title: 'Essential Greetings – अभिवादन',
    marathiTitle: 'नमस्ते और अभिवादन',
    language: 'hindi',
    category: 'Conversation',
    level: 'beginner',
    order: 7,
    durationMinutes: 10,
    description: 'Polite words and everyday Hindi greetings.',
    vocabulary: [
      { id: 'hg1', word: 'नमस्ते', transliteration: 'Namaste', meaning: 'Hello / Greetings' },
      { id: 'hg2', word: 'सुप्रभात', transliteration: 'Suprabhat', meaning: 'Good Morning' },
      { id: 'hg3', word: 'शुभ रात्रि', transliteration: 'Shubh Raatri', meaning: 'Good Night' },
      { id: 'hg4', word: 'धन्यवाद / शुक्रिया', transliteration: 'Dhanyawaad / Shukriya', meaning: 'Thank You' },
      { id: 'hg5', word: 'फिर मिलेंगे', transliteration: 'Phir milenge', meaning: 'See you again' }
    ],
    speakingPhrases: [
      { id: 'hsp1', phrase: 'नमस्ते, आप कैसे हैं?', transliteration: 'Namaste, aap kaise hain?', meaning: 'Hello, how are you?' }
    ]
  },
  {
    id: 'hi-8',
    title: 'Basic Daily Sentences – आम बोलचाल',
    marathiTitle: 'साधारण दैनिक वाक्य',
    language: 'hindi',
    category: 'Conversation',
    level: 'beginner',
    order: 8,
    durationMinutes: 12,
    description: 'Simple sentences for introducing yourself.',
    vocabulary: [
      { id: 'hbs1', word: 'मेरा नाम ... है।', transliteration: 'Mera naam ... hai.', meaning: 'My name is ...' },
      { id: 'hbs2', word: 'आप कैसे हैं?', transliteration: 'Aap kaise hain?', meaning: 'How are you? (Respectful)' },
      { id: 'hbs3', word: 'मैं ठीक हूँ।', transliteration: 'Main theek hoon.', meaning: 'I am fine.' },
      { id: 'hbs4', word: 'यह क्या है?', transliteration: 'Yeh kya hai?', meaning: 'What is this?' }
    ]
  },
  {
    id: 'hi-9',
    title: 'Pronouns & Respect – सर्वनाम और आदर',
    marathiTitle: 'हिंदी सर्वनाम',
    language: 'hindi',
    category: 'Grammar',
    level: 'intermediate',
    order: 9,
    durationMinutes: 14,
    description: 'Understanding मैं, हम, तुम, and respectful आप.',
    vocabulary: [
      { id: 'hpn1', word: 'मैं', transliteration: 'Main', meaning: 'I' },
      { id: 'hpn2', word: 'हम', transliteration: 'Hum', meaning: 'We' },
      { id: 'hpn3', word: 'तुम', transliteration: 'Tum', meaning: 'You (Informal)' },
      { id: 'hpn4', word: 'आप', transliteration: 'Aap', meaning: 'You (Polite / Respectful)' },
      { id: 'hpn5', word: 'वह', transliteration: 'Vah', meaning: 'He / She / That' }
    ]
  },
  {
    id: 'hi-10',
    title: 'Common Verbs – मुख्य क्रियाएं',
    marathiTitle: 'क्रियापद हिंदी में',
    language: 'hindi',
    category: 'Grammar',
    level: 'intermediate',
    order: 10,
    durationMinutes: 14,
    description: 'Verbs ending in -ना: आना, जाना, खाना, पीना, देखना.',
    vocabulary: [
      { id: 'hvb1', word: 'आना', transliteration: 'Aana', meaning: 'To come' },
      { id: 'hvb2', word: 'जाना', transliteration: 'Jaana', meaning: 'To go' },
      { id: 'hvb3', word: 'खाना', transliteration: 'Khaana', meaning: 'To eat' },
      { id: 'hvb4', word: 'पीना', transliteration: 'Peena', meaning: 'To drink' },
      { id: 'hvb5', word: 'बोलना', transliteration: 'Bolna', meaning: 'To speak' }
    ]
  },
  {
    id: 'hi-11',
    title: 'Tenses & Grammar – काल और व्याकरण',
    marathiTitle: 'हिंदी काल',
    language: 'hindi',
    category: 'Grammar',
    level: 'intermediate',
    order: 11,
    durationMinutes: 15,
    description: 'Past, Present, and Future verbs in Hindi with gender concord.',
    vocabulary: [
      { id: 'ht1', word: 'मैं जाता हूँ', transliteration: 'Main jaata hoon', meaning: 'I go (Present - male)' },
      { id: 'ht2', word: 'मैं जाती हूँ', transliteration: 'Main jaati hoon', meaning: 'I go (Present - female)' },
      { id: 'ht3', word: 'मैं गया था', transliteration: 'Main gaya tha', meaning: 'I had gone (Past)' },
      { id: 'ht4', word: 'मैं जाऊँगा', transliteration: 'Main jaoonga', meaning: 'I will go (Future)' }
    ]
  },
  {
    id: 'hi-12',
    title: 'Market & Bargaining – बाज़ार और खरीदारी',
    marathiTitle: 'दुकान और बाज़ार',
    language: 'hindi',
    category: 'Conversation',
    level: 'intermediate',
    order: 12,
    durationMinutes: 15,
    description: 'Conversations with shopkeepers, vegetable sellers, and vendors.',
    vocabulary: [
      { id: 'hmk1', word: 'यह कितने का है?', transliteration: 'Yeh kitne ka hai?', meaning: 'How much is this for?' },
      { id: 'hmk2', word: 'थोड़ा दाम कम कीजिए।', transliteration: 'Thoda daam kam kijiye.', meaning: 'Please reduce the price a bit.' },
      { id: 'hmk3', word: 'सब्ज़ी ताज़ा है क्या?', transliteration: 'Sabzi taaza hai kya?', meaning: 'Are the vegetables fresh?' }
    ]
  },
  {
    id: 'hi-13',
    title: 'Restaurant & Dining – खान-पान',
    marathiTitle: 'होटल और खानपान',
    language: 'hindi',
    category: 'Conversation',
    level: 'intermediate',
    order: 13,
    durationMinutes: 14,
    description: 'Ordering food, specifying spices, and asking for the bill in Hindi.',
    vocabulary: [
      { id: 'hfd1', word: 'कृपया मेनू दिखाइए।', transliteration: 'Kripaya menu dikhaiye.', meaning: 'Please show the menu.' },
      { id: 'hfd2', word: 'कम तीखा बनाइएगा।', transliteration: 'Kam teekha banaiyega.', meaning: 'Make it less spicy.' },
      { id: 'hfd3', word: 'बिल ले आइए।', transliteration: 'Bill le aaiye.', meaning: 'Please bring the bill.' }
    ]
  },
  {
    id: 'hi-14',
    title: 'Travel & Directions – यात्रा और रास्ते',
    marathiTitle: 'दिशाएं और यात्रा',
    language: 'hindi',
    category: 'Conversation',
    level: 'intermediate',
    order: 14,
    durationMinutes: 14,
    description: 'Asking for directions and taking public transport in Indian cities.',
    vocabulary: [
      { id: 'htr1', word: 'रेलवे स्टेशन कहाँ है?', transliteration: 'Railway station kahan hai?', meaning: 'Where is the railway station?' },
      { id: 'htr2', word: 'सीधे जाइए और फिर दाएँ मुड़िए।', transliteration: 'Seedhe jaiye aur phir daayen mudiye.', meaning: 'Go straight and then turn right.' },
      { id: 'htr3', word: 'बाएँ मुड़िए।', transliteration: 'Baayen mudiye.', meaning: 'Turn left.' }
    ]
  },
  {
    id: 'hi-15',
    title: 'Idioms & Popular Sayings – मुहावरे',
    marathiTitle: 'हिंदी मुहावरे',
    language: 'hindi',
    category: 'Literature',
    level: 'advanced',
    order: 15,
    durationMinutes: 16,
    description: 'Famous Hindi idioms used in everyday and literary conversations.',
    vocabulary: [
      { id: 'hid1', word: 'ईद का चाँद होना', transliteration: 'Eid ka chaand hona', meaning: 'To be seen after a very long time' },
      { id: 'hid2', word: 'दाल में कुछ काला है', transliteration: 'Daal mein kuch kaala hai', meaning: 'Something is fishy / suspicious' },
      { id: 'hid3', word: 'नाच न जाने आँगन टेढ़ा', transliteration: 'Naach na jaane aangan tedha', meaning: 'Blaming conditions when unable to perform' }
    ]
  },
  {
    id: 'hi-16',
    title: 'Workplace & Professional Hindi – दफ़्तर की बातचीत',
    marathiTitle: 'कार्यालयीन हिंदी',
    language: 'hindi',
    category: 'Conversation',
    level: 'advanced',
    order: 16,
    durationMinutes: 18,
    description: 'Professional terminology and formal etiquette for Indian workplaces.',
    vocabulary: [
      { id: 'hwp1', word: 'बैठक / मीटिंग', transliteration: 'Baithak / Meeting', meaning: 'Meeting' },
      { id: 'hwp2', word: 'प्रस्तुति', transliteration: 'Prastuti', meaning: 'Presentation' },
      { id: 'hwp3', word: 'हम इस पर विचार करेंगे।', transliteration: 'Hum is par vichaar karenge.', meaning: 'We will consider this matter.' }
    ]
  }
];

export const ENGLISH_LESSONS: Lesson[] = [
  {
    id: 'en-1',
    title: 'English Alphabet & Phonics',
    marathiTitle: 'इंग्रजी वर्णमाला आणि उच्चार',
    language: 'english',
    category: 'Foundations',
    level: 'beginner',
    order: 1,
    durationMinutes: 12,
    description: 'Master English phonics, vowel sounds (A, E, I, O, U), and letter blends.',
    characters: [
      { char: 'A', transliteration: 'ए', exampleWord: 'Apple (सफरचंद)', exampleMeaning: 'A sweet red or green fruit', pronunciationHint: 'Short "a" sound' },
      { char: 'B', transliteration: 'बी', exampleWord: 'Book (पुस्तक)', exampleMeaning: 'Pages bound together for reading', pronunciationHint: 'Voiced bilabial' },
      { char: 'C', transliteration: 'सी', exampleWord: 'Cat (मांजर)', exampleMeaning: 'Domestic feline animal', pronunciationHint: 'Hard "k" sound before a/o/u' },
      { char: 'D', transliteration: 'डी', exampleWord: 'Door (दरवाजा)', exampleMeaning: 'Movable barrier for room entrance', pronunciationHint: 'Alveolar voiced' }
    ],
    vocabulary: [
      { id: 'ev1', word: 'Apple', transliteration: 'सफरचंद', meaning: 'A fruit', exampleSentence: 'An apple a day keeps the doctor away.' },
      { id: 'ev2', word: 'Book', transliteration: 'पुस्तक', meaning: 'Reading material', exampleSentence: 'I read a good book.' },
      { id: 'ev3', word: 'Friend', transliteration: 'मित्र', meaning: 'A companion', exampleSentence: 'He is my best friend.' }
    ]
  },
  {
    id: 'en-2',
    title: 'Numbers & Counting (1 to 20)',
    marathiTitle: 'संख्या आणि मोजणी',
    language: 'english',
    category: 'Vocabulary',
    level: 'beginner',
    order: 2,
    durationMinutes: 10,
    description: 'Learn cardinal numbers and practical counting in English.',
    vocabulary: [
      { id: 'en_num1', word: 'One', transliteration: 'एक', meaning: '1' },
      { id: 'en_num2', word: 'Two', transliteration: 'दोन', meaning: '2' },
      { id: 'en_num3', word: 'Three', transliteration: 'तीन', meaning: '3' },
      { id: 'en_num4', word: 'Four', transliteration: 'चार', meaning: '4' },
      { id: 'en_num5', word: 'Five', transliteration: 'पाच', meaning: '5' },
      { id: 'en_num6', word: 'Ten', transliteration: 'दहा', meaning: '10' },
      { id: 'en_num7', word: 'Twenty', transliteration: 'वीस', meaning: '20' }
    ]
  },
  {
    id: 'en-3',
    title: 'Daily Greetings & Introductions',
    marathiTitle: 'दैनिक अभिवादन आणि ओळख',
    language: 'english',
    category: 'Conversation',
    level: 'beginner',
    order: 3,
    durationMinutes: 12,
    description: 'How to introduce yourself confidently in English with polite manners.',
    vocabulary: [
      { id: 'eg1', word: 'Good morning', transliteration: 'शुभ सकाळ', meaning: 'Morning greeting' },
      { id: 'eg2', word: 'Nice to meet you', transliteration: 'तुम्हाला भेटून आनंद झाला', meaning: 'Polite greeting upon meeting' },
      { id: 'eg3', word: 'Thank you very much', transliteration: 'खूप खूप धन्यवाद', meaning: 'Expressing gratitude' },
      { id: 'eg4', word: 'Please have a seat', transliteration: 'कृपया बसा', meaning: 'Offering a chair' }
    ],
    speakingPhrases: [
      { id: 'esp1', phrase: 'Hello, my name is Alex and it is nice to meet you.', transliteration: 'हॅलो, माय नेम इज ॲलेक्स...', meaning: 'Standard friendly greeting' }
    ]
  },
  {
    id: 'en-4',
    title: 'Colors, Shapes & Visuals',
    marathiTitle: 'रंग आणि आकार',
    language: 'english',
    category: 'Vocabulary',
    level: 'beginner',
    order: 4,
    durationMinutes: 10,
    description: 'Colors and geometric shapes in English.',
    vocabulary: [
      { id: 'ec1', word: 'Red', transliteration: 'लाल', meaning: 'Color of blood or ruby' },
      { id: 'ec2', word: 'Blue', transliteration: 'निळा', meaning: 'Color of sky or sea' },
      { id: 'ec3', word: 'Green', transliteration: 'हिरवा', meaning: 'Color of grass or leaves' },
      { id: 'ec4', word: 'Circle', transliteration: 'वर्तुळ', meaning: 'Round plane figure' },
      { id: 'ec5', word: 'Square', transliteration: 'चौरस', meaning: 'Four equal straight sides' }
    ]
  },
  {
    id: 'en-5',
    title: 'House & Daily Objects',
    marathiTitle: 'घरातील दैनंदिन वस्तू',
    language: 'english',
    category: 'Vocabulary',
    level: 'beginner',
    order: 5,
    durationMinutes: 10,
    description: 'Common rooms, furniture, and kitchen items.',
    vocabulary: [
      { id: 'eh1', word: 'Kitchen', transliteration: 'स्वयंपाकघर', meaning: 'Room where food is prepared' },
      { id: 'eh2', word: 'Table', transliteration: 'मेज / टेबल', meaning: 'Flat elevated surface' },
      { id: 'eh3', word: 'Window', transliteration: 'खिडकी', meaning: 'Opening for light and air' },
      { id: 'eh4', word: 'Water bottle', transliteration: 'पाण्याची बाटली', meaning: 'Container for water' }
    ]
  },
  {
    id: 'en-6',
    title: 'Common Action Verbs',
    marathiTitle: 'मुख्य क्रियापदे',
    language: 'english',
    category: 'Grammar',
    level: 'intermediate',
    order: 6,
    durationMinutes: 12,
    description: 'Everyday verbs: eat, drink, walk, listen, read, write, and think.',
    vocabulary: [
      { id: 'evb1', word: 'Speak', transliteration: 'बोलणे', meaning: 'Say something to express thoughts' },
      { id: 'evb2', word: 'Listen', transliteration: 'ऐकणे', meaning: 'Give attention to sound' },
      { id: 'evb3', word: 'Understand', transliteration: 'समजणे', meaning: 'Perceive the intended meaning' },
      { id: 'evb4', word: 'Practice', transliteration: 'सराव करणे', meaning: 'Perform an activity repeatedly' }
    ]
  },
  {
    id: 'en-7',
    title: 'Question Words (The 5 Ws & H)',
    marathiTitle: 'प्रश्न विचारणे (Who, What, Where...)',
    language: 'english',
    category: 'Grammar',
    level: 'intermediate',
    order: 7,
    durationMinutes: 14,
    description: 'Asking Who, What, Where, When, Why, and How in correct order.',
    vocabulary: [
      { id: 'eq1', word: 'What is your plan?', transliteration: 'तुझी योजना काय आहे?', meaning: 'Asking about intentions' },
      { id: 'eq2', word: 'Where do you live?', transliteration: 'तुम्ही कुठे राहता?', meaning: 'Asking location' },
      { id: 'eq3', word: 'Why are you learning English?', transliteration: 'तुम्ही इंग्रजी का शिकत आहात?', meaning: 'Asking purpose' }
    ]
  },
  {
    id: 'en-8',
    title: 'Time, Days & Calendar',
    marathiTitle: 'वेळ, वार आणि महिने',
    language: 'english',
    category: 'Vocabulary',
    level: 'intermediate',
    order: 8,
    durationMinutes: 12,
    description: 'Days of the week, months, telling time, and scheduling appointments.',
    vocabulary: [
      { id: 'et1', word: 'Today', transliteration: 'आज', meaning: 'On this present day' },
      { id: 'et2', word: 'Tomorrow', transliteration: 'उद्या', meaning: 'On the day after today' },
      { id: 'et3', word: 'Yesterday', transliteration: 'काल', meaning: 'On the day before today' },
      { id: 'et4', word: 'What time is it?', transliteration: 'किती वाजले आहेत?', meaning: 'Inquiring the current hour' }
    ]
  },
  {
    id: 'en-9',
    title: 'Dining Out & Ordering Food',
    marathiTitle: 'हॉटेलमध्ये ऑर्डर देणे',
    language: 'english',
    category: 'Conversation',
    level: 'intermediate',
    order: 9,
    durationMinutes: 14,
    description: 'Asking for recommendations, placing dietary restrictions, and paying.',
    vocabulary: [
      { id: 'edo1', word: 'Could we get the menu, please?', transliteration: 'कृपया मेनू मिळेल का?', meaning: 'Requesting the menu' },
      { id: 'edo2', word: 'I would like to order vegetarian food.', transliteration: 'मला शाकाहारी जेवण हवे आहे.', meaning: 'Specifying veg preference' },
      { id: 'edo3', word: 'Can we have the bill, please?', transliteration: 'कृपया बिल मिळेल का?', meaning: 'Asking for check' }
    ]
  },
  {
    id: 'en-10',
    title: 'Shopping & Inquiries',
    marathiTitle: 'खरेदी आणि चौकशी',
    language: 'english',
    category: 'Conversation',
    level: 'intermediate',
    order: 10,
    durationMinutes: 14,
    description: 'Asking for sizes, colors, return policies, and warranties.',
    vocabulary: [
      { id: 'esh1', word: 'Do you have this in a larger size?', transliteration: 'हे मोठ्या आकारात मिळेल का?', meaning: 'Checking sizing' },
      { id: 'esh2', word: 'How much does this cost?', transliteration: 'याची किंमत किती आहे?', meaning: 'Price check' },
      { id: 'esh3', word: 'Can I pay by card?', transliteration: 'मी कार्डने पैसे देऊ शकतो का?', meaning: 'Payment inquiry' }
    ]
  },
  {
    id: 'en-11',
    title: 'At the Workplace & Professional Emails',
    marathiTitle: 'कार्यालयीन ईमेल आणि संवाद',
    language: 'english',
    category: 'Conversation',
    level: 'advanced',
    order: 11,
    durationMinutes: 16,
    description: 'Drafting clear emails, scheduling meetings, and presenting status updates.',
    vocabulary: [
      { id: 'ewp1', word: 'Please find attached the report.', transliteration: 'कृपया जोडलेला अहवाल तपासा.', meaning: 'Standard email attachment sentence' },
      { id: 'ewp2', word: 'Let us schedule a quick sync.', transliteration: 'आपण एक बैठक आयोजित करूया.', meaning: 'Organizing a short catchup' },
      { id: 'ewp3', word: 'Thank you for your prompt response.', transliteration: 'त्वरित उत्तरासाठी धन्यवाद.', meaning: 'Formal polite thank you' }
    ]
  },
  {
    id: 'en-12',
    title: 'Expressing Feelings & Opinions',
    marathiTitle: 'भावना आणि मते व्यक्त करणे',
    language: 'english',
    category: 'Conversation',
    level: 'advanced',
    order: 12,
    durationMinutes: 15,
    description: 'Polite disagreement, constructive praise, and conveying emotions accurately.',
    vocabulary: [
      { id: 'eop1', word: 'In my perspective...', transliteration: 'माझ्या दृष्टिकोनातून...', meaning: 'Introducing personal thought' },
      { id: 'eop2', word: 'I appreciate your hard work.', transliteration: 'मी तुमच्या कष्टाचे कौतुक करतो.', meaning: 'Giving recognition' },
      { id: 'eop3', word: 'I respectfully disagree with that point.', transliteration: 'माझे या मुद्द्यावर नम्रपणे वेगळे मत आहे.', meaning: 'Polite disagreement' }
    ]
  },
  {
    id: 'en-13',
    title: 'Travel, Airports & Transit',
    marathiTitle: 'प्रवास आणि विमानतळ',
    language: 'english',
    category: 'Conversation',
    level: 'advanced',
    order: 13,
    durationMinutes: 15,
    description: 'Checking in luggage, immigration questions, and public train announcements.',
    vocabulary: [
      { id: 'etr1', word: 'Where is boarding gate number 12?', transliteration: 'बोर्डिंग गेट नंबर १२ कुठे आहे?', meaning: 'Airport gate query' },
      { id: 'etr2', word: 'Is there a direct bus to the city center?', transliteration: 'शहरात जाण्यासाठी थेट बस आहे का?', meaning: 'Public transit query' }
    ]
  },
  {
    id: 'en-14',
    title: 'Emergencies & Doctor Visits',
    marathiTitle: 'आरोग्य आणि आपत्कालीन मदत',
    language: 'english',
    category: 'Conversation',
    level: 'advanced',
    order: 14,
    durationMinutes: 15,
    description: 'Describing medical symptoms, asking for an ambulance, and pharmacy words.',
    vocabulary: [
      { id: 'emd1', word: 'I have a severe headache and fever.', transliteration: 'मला तीव्र डोकेदुखी आणि ताप आहे.', meaning: 'Symptom description' },
      { id: 'emd2', word: 'Please call an ambulance immediately.', transliteration: 'कृपया तातडीने रुग्णवाहिका बोलवा.', meaning: 'Urgent medical assistance' }
    ]
  },
  {
    id: 'en-15',
    title: 'Idioms & Conversational Fluency',
    marathiTitle: 'इंग्रजी वाक्प्रचार (Idioms)',
    language: 'english',
    category: 'Literature',
    level: 'advanced',
    order: 15,
    durationMinutes: 16,
    description: 'Common native English idioms: "Bite the bullet", "Break the ice", "Hit the nail on the head".',
    vocabulary: [
      { id: 'eid1', word: 'Break the ice', transliteration: 'संभाषण सुरू करणे', meaning: 'Make people feel relaxed and comfortable' },
      { id: 'eid2', word: 'Hit the nail on the head', transliteration: 'अगदी अचूक बोलणे', meaning: 'State something exactly right' },
      { id: 'eid3', word: 'Piece of cake', transliteration: 'खूप सोपे काम', meaning: 'Something very easy to accomplish' }
    ]
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-mr-1',
    title: 'Marathi Vocabulary Essentials',
    language: 'marathi',
    category: 'Vocabulary',
    difficulty: 'Easy',
    description: 'Test your understanding of basic Marathi everyday terms like water, house, mother, and book.',
    rewardXp: 50,
    questions: [
      {
        id: 'q1',
        question: 'What is the Marathi word for "Water"?',
        options: ['पाणी', 'घर', 'पुस्तक', 'शाळा'],
        correctAnswerIndex: 0,
        explanation: '"पाणी" (Paani) means water. "घर" means house, "पुस्तक" means book, and "शाळा" means school.'
      },
      {
        id: 'q2',
        question: 'What does "आई" (Aai) mean in Marathi?',
        options: ['Mother', 'Father', 'Sister', 'Grandmother'],
        correctAnswerIndex: 0,
        explanation: '"आई" is the deeply cherished Marathi word for Mother.'
      },
      {
        id: 'q3',
        question: 'How do you say "Good Morning" in Marathi?',
        options: ['शुभ सकाळ', 'शुभ रात्री', 'पुन्हा भेटू', 'नमस्कार'],
        correctAnswerIndex: 0,
        explanation: '"शुभ सकाळ" (Shubh Sakal) means Good Morning. "शुभ रात्री" means Good Night.'
      },
      {
        id: 'q4',
        question: 'Which of the following numbers is "दहा" (Daha)?',
        options: ['5', '7', '10', '20'],
        correctAnswerIndex: 2,
        explanation: '"दहा" is Devanagari numeral १० (Ten).'
      },
      {
        id: 'q5',
        question: 'What is the color "हिरवा" (Hirva)?',
        options: ['Red', 'Green', 'Blue', 'Yellow'],
        correctAnswerIndex: 1,
        explanation: '"हिरवा" means green. Red is "लाल", blue is "निळा", and yellow is "पिवळा".'
      }
    ]
  },
  {
    id: 'quiz-mr-2',
    title: 'Marathi Grammar & Gender (लिंग)',
    language: 'marathi',
    category: 'Grammar',
    difficulty: 'Medium',
    description: 'Challenge your knowledge of Marathi masculine, feminine, and neuter nouns.',
    rewardXp: 75,
    questions: [
      {
        id: 'q21',
        question: 'What pronoun is used for Neuter nouns like "पुस्तक" (book)?',
        options: ['तो', 'ती', 'ते', 'आम्ही'],
        correctAnswerIndex: 2,
        explanation: 'In Marathi, neuter gender takes "ते" (Te). For example, "ते पुस्तक" (that book).'
      },
      {
        id: 'q22',
        question: 'Complete the sentence: "माझे नाव राहुल ____."',
        options: ['आहे', 'होतो', 'नाही', 'असेल'],
        correctAnswerIndex: 0,
        explanation: '"आहे" (Aahe) means "is". So: "माझे नाव राहुल आहे" (My name is Rahul).'
      },
      {
        id: 'q23',
        question: 'Which honorific pronoun is used to address an elder or teacher with respect?',
        options: ['तू', 'तुम्ही / आपण', 'तो', 'ती'],
        correctAnswerIndex: 1,
        explanation: '"तुम्ही" or "आपण" is used for respectful, formal address in Marathi.'
      },
      {
        id: 'q24',
        question: 'What is the root infinitive ending for Marathi verbs?',
        options: ['-णे (उदा. खाणे, जाणे)', '-ता', '-ला', '-णार'],
        correctAnswerIndex: 0,
        explanation: 'Standard Marathi verb infinitives end in -णे (e.g. खाणे, पिणे, जाणे, बोलणे).'
      },
      {
        id: 'q25',
        question: 'What does the proverb "अति तिथे माती" mean?',
        options: ['Patience brings gold', 'Excess of anything leads to ruin', 'Work is worship', 'Slow and steady wins'],
        correctAnswerIndex: 1,
        explanation: '"अति तिथे माती" implies that doing anything in excess produces unwanted outcomes.'
      }
    ]
  },
  {
    id: 'quiz-mr-3',
    title: 'Marathi Market & Travel Conversations',
    language: 'marathi',
    category: 'Conversation',
    difficulty: 'Medium',
    description: 'Test practical phrases for taking rickshaws, bargaining, and asking directions.',
    rewardXp: 75,
    questions: [
      {
        id: 'q31',
        question: 'How do you ask "Where is the station?" in Marathi?',
        options: ['स्टेशन कुठे आहे?', 'स्टेशन कधी येणार?', 'स्टेशन काय आहे?', 'स्टेशन किती वाजता आहे?'],
        correctAnswerIndex: 0,
        explanation: '"कुठे" (Kuthe) means "Where". Hence "स्टेशन कुठे आहे?" is the correct sentence.'
      },
      {
        id: 'q32',
        question: 'What does "डावीकडे वळा" mean?',
        options: ['Turn right', 'Turn left', 'Go straight', 'Stop here'],
        correctAnswerIndex: 1,
        explanation: '"डावीकडे" means "to the left". "उजवीकडे" means "to the right".'
      },
      {
        id: 'q33',
        question: 'What phrase would you use to ask for the bill at a dining table?',
        options: ['बिल द्या', 'पाणी द्या', 'मेनू दाखवा', 'कमी करा'],
        correctAnswerIndex: 0,
        explanation: '"बिल द्या" means "Please give the bill".'
      },
      {
        id: 'q34',
        question: 'What does "खूप खूप धन्यवाद" express?',
        options: ['Hearty apologies', 'Great thanks / gratitude', 'Farewell forever', 'Welcome'],
        correctAnswerIndex: 1,
        explanation: '"खूप खूप धन्यवाद" means "Thank you very much".'
      }
    ]
  },
  {
    id: 'quiz-hi-1',
    title: 'Hindi Foundations & Greetings',
    language: 'hindi',
    category: 'Foundations',
    difficulty: 'Easy',
    description: 'Everyday greetings, polite phrases, and basic Hindi vocabulary.',
    rewardXp: 50,
    questions: [
      {
        id: 'hq1',
        question: 'What is the most common universal greeting in Hindi?',
        options: ['नमस्ते', 'धन्यवाद', 'शुभकामनाएं', 'अलविदा'],
        correctAnswerIndex: 0,
        explanation: '"नमस्ते" (Namaste) is the standard and timeless Hindi greeting with folded hands.'
      },
      {
        id: 'hq2',
        question: 'How do you say "Thank you" in Hindi?',
        options: ['धन्यवाद / शुक्रिया', 'नमस्ते', 'स्वागत', 'कृपा'],
        correctAnswerIndex: 0,
        explanation: '"धन्यवाद" (Dhanyawaad) and "शुक्रिया" (Shukriya) both signify thank you.'
      },
      {
        id: 'hq3',
        question: 'What is the Hindi word for "House"?',
        options: ['घर', 'पानी', 'किताब', 'गाड़ी'],
        correctAnswerIndex: 0,
        explanation: '"घर" (Ghar) means house or home in Hindi.'
      },
      {
        id: 'hq4',
        question: 'What does "आप कैसे हैं?" mean?',
        options: ['Where are you going?', 'How are you?', 'What is your name?', 'Who are you?'],
        correctAnswerIndex: 1,
        explanation: '"आप कैसे हैं?" means "How are you?" in polite Hindi.'
      }
    ]
  },
  {
    id: 'quiz-hi-2',
    title: 'Hindi Grammar & Action Verbs',
    language: 'hindi',
    category: 'Grammar',
    difficulty: 'Medium',
    description: 'Check your mastery of Hindi tenses, pronoun agreement, and verb conjugations.',
    rewardXp: 75,
    questions: [
      {
        id: 'hq21',
        question: 'How does a female speaker say "I go" in Hindi?',
        options: ['मैं जाता हूँ', 'मैं जाती हूँ', 'मैं गया था', 'मैं जाएँगे'],
        correctAnswerIndex: 1,
        explanation: 'Feminine first-person takes "-ती हूँ", so: "मैं जाती हूँ" (Main jaati hoon).'
      },
      {
        id: 'hq22',
        question: 'What does the idiom "दाल में कुछ काला है" mean?',
        options: ['The lentils are burnt', 'Something is suspicious or hidden', 'Food is very tasty', 'Money is lost'],
        correctAnswerIndex: 1,
        explanation: '"दाल में कुछ काला है" signifies that something is fishy or suspicious.'
      },
      {
        id: 'hq23',
        question: 'Which word means "Tomorrow" as well as "Yesterday" depending on tense?',
        options: ['कल', 'आज', 'परसों', 'अब'],
        correctAnswerIndex: 0,
        explanation: '"कल" (Kal) means both yesterday (past) and tomorrow (future) based on the verb tense!'
      }
    ]
  },
  {
    id: 'quiz-en-1',
    title: 'English Conversational Basics',
    language: 'english',
    category: 'Conversation',
    difficulty: 'Easy',
    description: 'Test your understanding of common conversational phrases and question structures.',
    rewardXp: 50,
    questions: [
      {
        id: 'eq11',
        question: 'Which is the most appropriate response to "How do you do?"',
        options: ['I am doing fine, how do you do?', 'No problem at all', 'Good night', 'See you yesterday'],
        correctAnswerIndex: 0,
        explanation: '"How do you do?" is a formal greeting answered by acknowledging and reflecting the polite greeting.'
      },
      {
        id: 'eq12',
        question: 'What does the idiom "A piece of cake" mean?',
        options: ['A slice of dessert', 'An easy task', 'A heavy burden', 'A birthday party'],
        correctAnswerIndex: 1,
        explanation: '"A piece of cake" colloquially means something very straightforward and easy to do.'
      },
      {
        id: 'eq13',
        question: 'Which question word is used to inquire about time?',
        options: ['When', 'Where', 'Who', 'Why'],
        correctAnswerIndex: 0,
        explanation: '"When" asks about time or occasion (e.g. When is the train arriving?).'
      }
    ]
  }
];

export const DEMO_TRANSLATIONS: Record<string, string> = {
  // English to Marathi
  'hello': 'नमस्कार (Namaskar)',
  'good morning': 'शुभ सकाळ (Shubh Sakal)',
  'good night': 'शुभ रात्री (Shubh Raatri)',
  'how are you?': 'तुम्ही कसे आहात? (Tumhi kase aahaat?)',
  'how are you': 'तुम्ही कसे आहात? (Tumhi kase aahaat?)',
  'i am fine': 'मी मजेत आहे (Mee majet aahe)',
  'my name is': 'माझे नाव ... आहे (Maajhe naav ... aahe)',
  'what is your name?': 'तुमचे नाव काय आहे? (Tumche naav kaay aahe?)',
  'where are you going?': 'तुम्ही कुठे जात आहात? (Tumhi kuthe jaat aahaat?)',
  'where are you going': 'तुम्ही कुठे जात आहात? (Tumhi kuthe jaat aahaat?)',
  'thank you': 'धन्यवाद (Dhanyawaad)',
  'thank you very much': 'खूप खूप धन्यवाद (Khoop khoop dhanyawaad)',
  'water': 'पाणी (Paani)',
  'house': 'घर (Ghar)',
  'book': 'पुस्तक (Pustak)',
  'school': 'शाळा (Shaala)',
  'welcome': 'आपले स्वागत आहे (Aaple swagat aahe)',
  'please help me': 'कृपया मला मदत करा (Krupaya mala madat kara)',
  'how much is this?': 'याची किंमत काय आहे? (Yaachi kimmat kaay aahe?)',
  'see you again': 'पुन्हा भेटू (Punha bhetu)',

  // Marathi to English
  'नमस्कार': 'Hello / Greetings (Namaskar)',
  'शुभ सकाळ': 'Good Morning (Shubh Sakal)',
  'शुभ रात्री': 'Good Night (Shubh Raatri)',
  'तुम्ही कसे आहात?': 'How are you? (Polite)',
  'मी मजेत आहे': 'I am fine / doing well',
  'माझे नाव': 'My name is',
  'धन्यवाद': 'Thank you (Dhanyawaad)',
  'पाणी': 'Water (Paani)',
  'घर': 'House / Home (Ghar)',
  'पुस्तक': 'Book (Pustak)',
  'तुम्ही कुठे जात आहात?': 'Where are you going?',

  // Hindi to Marathi
  'नमस्ते': 'नमस्कार (Namaskar)',
  'आप कैसे हैं?': 'तुम्ही कसे आहात? (Tumhi kase aahaat?)',
  'मैं ठीक हूँ': 'मी मजेत आहे (Mee majet aahe)',
  'शुक्रिया': 'धन्यवाद (Dhanyawaad)',
  'यह कितने का है?': 'याची किंमत काय आहे? (Yaachi kimmat kaay aahe?)',

  // Marathi to Hindi
  'तुम्ही कसे आहात (हिंदीत)?': 'आप कैसे हैं? (Aap kaise hain?)',
  'मी मजेत आहे.': 'मैं ठीक हूँ। (Main theek hoon.)',
  'याची किंमत काय आहे?': 'यह कितने का है? (Yeh kitne ka hai?)'
};
