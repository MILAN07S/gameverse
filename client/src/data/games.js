const games = [
    {
        id: 1,
        name: "Grand Theft Auto V",
        company: "Rockstar Games",
        genre: "Action-Adventure",
        releaseYear: 2013,
        image: "/images/gta5.jpg",
        description:
            "Set in the fictional city of Los Santos, Grand Theft Auto V follows three criminals whose lives become connected through a series of dangerous heists. Players can freely explore a huge open world, switch between characters, complete story missions, drive vehicles, participate in activities, and experience a massive multiplayer world through GTA Online.",
        previews: [
            "/images/a.jpg",
            "/images/aa.jpg",
            "/images/aaa.jpg"
        ],

        preview: [
            "Los Santos open-world exploration",
            "Story missions and heists",
            "GTA Online multiplayer"
        ],
        stats: {
            units: "205M+ copies sold",
            revenue: "$8.7B+ lifetime revenue",
            profit: "+$6.0B estimated",
        },

        info: {
            developer: "Rockstar Games",
            publisher: "Rockstar Games",
            releaseDate: "17 May 2013",
            platforms: "PC · PlayStation · Xbox",
            mode: "Single-player · Multiplayer",
        },

        rating: {
            score: 4.8,
            reviews: 126,
        },

        requirements: {
            minimum: {
                os: "Windows 10",
                processor: "Intel Core i5",
                memory: "8 GB RAM",
                graphics: "NVIDIA GTX 1060",
                storage: "110 GB",
            },

            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i7",
                memory: "16 GB RAM",
                graphics: "NVIDIA RTX 2060",
                storage: "110 GB",
            },
        },
    },

    {
        id: 2,
        name: "Red Dead Redemption 2",
        company: "Rockstar Games",
        genre: "Action-Adventure",
        releaseYear: 2018,
        image: "/images/rdr2.jpg",
        description:
            "Red Dead Redemption 2 follows Arthur Morgan and the Van der Linde gang during the final years of the American frontier. The game combines a deeply detailed open world with cinematic storytelling, gunfights, horseback travel, hunting, exploration, and character-driven missions across towns, forests, mountains, and wilderness.",
        previews: [
            "/images/b.jpg",
            "/images/bb.jpg",
            "/images/bbb.jpg"
        ],
        preview: [
            "Explore the American frontier",
            "Horseback travel and exploration",
            "Story missions and shootouts"
        ],
        stats: {
            units: "79M+ copies sold",
            revenue: "$3.0B+ estimated",
            profit: "+$1.8B estimated",
        },
        info: {
            developer: "Rockstar Games",
            publisher: "Rockstar Games",
            releaseDate: "26 October 2018",
            platforms: "PC · PlayStation · Xbox",
            mode: "Single-player · Multiplayer",
        },

        rating: {
            score: 4.9,
            reviews: 184,
        },

        requirements: {
            minimum: {
                os: "Windows 10",
                processor: "Intel Core i5-2500K",
                memory: "8 GB RAM",
                graphics: "NVIDIA GTX 770",
                storage: "150 GB",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i7-4770K",
                memory: "12 GB RAM",
                graphics: "NVIDIA GTX 1060",
                storage: "150 GB",
            },
        },
    },

    {
        id: 3,
        name: "God of War Ragnarök",
        company: "Santa Monica Studio",
        genre: "Action-Adventure",
        releaseYear: 2022,
        image: "/images/godofwar.jpg",
        description:
            "God of War Ragnarök continues the journey of Kratos and Atreus as they travel through the Norse realms while preparing for the coming Ragnarök. The adventure combines powerful combat, exploration, puzzles, cinematic storytelling, and emotional character moments across a beautifully designed mythological world.",
        previews: [
            "/images/c.jpg",
            "/images/cc.jpg",
            "/images/ccc.jpg"
        ],

        preview: [
            "Explore the Nine Realms",
            "Combat with Kratos and Atreus",
            "Norse mythology adventures"
        ],
        stats: {
            units: "15M+ copies sold",
            revenue: "$900M+ estimated",
            profit: "+$500M estimated",
        }, info: {
            developer: "Santa Monica Studio",
            publisher: "Sony Interactive Entertainment",
            releaseDate: "9 November 2022",
            platforms: "PC · PlayStation",
            mode: "Single-player",
        },

        rating: {
            score: 4.8,
            reviews: 143,
        },

        requirements: {
            minimum: {
                os: "Windows 10",
                processor: "Intel Core i5-4670K",
                memory: "8 GB RAM",
                graphics: "NVIDIA GTX 1060",
                storage: "190 GB",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i7-4770K",
                memory: "16 GB RAM",
                graphics: "NVIDIA RTX 2060",
                storage: "190 GB",
            },
        },
    },

    {
        id: 4,
        name: "Cyberpunk 2077",
        company: "CD Projekt Red",
        genre: "Action RPG",
        releaseYear: 2020,
        image: "/images/cyberpunk.jpg",
        description:
            "Cyberpunk 2077 takes place in Night City, a massive futuristic metropolis controlled by corporations, gangs, and powerful individuals. Players take the role of V and can customize abilities, weapons, cyberware, and choices while following a story filled with missions, characters, combat, exploration, and branching decisions.",
        previews: [
            "/images/d.jpg",
            "/images/dd.jpg",
            "/images/ddd.jpg"
        ],
        preview: [
            "Explore Night City",
            "Cyberware and weapon combat",
            "Story-driven missions"
        ],
        stats: {
            units: "35M+ copies sold",
            revenue: "$1.2B+ estimated",
            profit: "+$700M estimated",
        }, info: {
            developer: "CD Projekt Red",
            publisher: "CD Projekt",
            releaseDate: "10 December 2020",
            platforms: "PC · PlayStation · Xbox",
            mode: "Single-player",
        },

        rating: {
            score: 4.6,
            reviews: 167,
        },

        requirements: {
            minimum: {
                os: "Windows 10",
                processor: "Intel Core i7-6700",
                memory: "12 GB RAM",
                graphics: "NVIDIA GTX 1060",
                storage: "70 GB SSD",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i7-12700",
                memory: "16 GB RAM",
                graphics: "NVIDIA RTX 2060",
                storage: "70 GB SSD",
            },
        },
    },

    {
        id: 5,
        name: "The Witcher 3",
        company: "CD Projekt Red",
        genre: "Action RPG",
        releaseYear: 2015,
        image: "/images/witcher3.jpg",
        description:
            "The Witcher 3: Wild Hunt follows Geralt of Rivia as he searches for Ciri while becoming involved in wars, political conflicts, monsters, and personal stories. Its enormous open world contains villages, cities, forests, islands, dangerous creatures, treasure hunts, and hundreds of quests shaped by player choices.",
        previews: [
            "/images/e.jpg",
            "/images/ee.jpg",
            "/images/eee.jpg"
        ],
        preview: [
            "Explore the Continent",
            "Monster hunting contracts",
            "Story choices and quests"
        ],
        stats: {
            units: "60M+ copies sold",
            revenue: "$1.0B+ estimated",
            profit: "+$600M estimated",
        }, info: {
            developer: "CD Projekt Red",
            publisher: "CD Projekt",
            releaseDate: "19 May 2015",
            platforms: "PC · PlayStation · Xbox · Nintendo Switch",
            mode: "Single-player",
        },

        rating: {
            score: 4.9,
            reviews: 205,
        },

        requirements: {
            minimum: {
                os: "Windows 10",
                processor: "Intel Core i5-2500K",
                memory: "8 GB RAM",
                graphics: "NVIDIA GTX 660",
                storage: "50 GB",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i7-3770",
                memory: "8 GB RAM",
                graphics: "NVIDIA GTX 770",
                storage: "50 GB",
            },
        },
    },

    {
        id: 6,
        name: "Minecraft",
        company: "Mojang Studios",
        genre: "Sandbox",
        releaseYear: 2011,
        image: "/images/minecraft.jpg",
        description:
            "Minecraft is a sandbox adventure where players can explore randomly generated worlds, gather resources, craft equipment, build structures, fight enemies, and create almost anything they can imagine. Its flexible gameplay supports survival, creative building, exploration, multiplayer adventures, and enormous player-created worlds.",
        previews: [
            "/images/f.jpg",
            "/images/ff.jpg",
            "/images/fff.jpg"
        ],
        preview: [
            "Explore procedurally generated worlds",
            "Build and craft structures",
            "Survival and multiplayer gameplay"
        ],
        stats: {
            units: "300M+ copies sold",
            revenue: "$4.0B+ estimated",
            profit: "+$2.5B estimated",
        }, info: {
            developer: "Mojang Studios",
            publisher: "Xbox Game Studios",
            releaseDate: "18 November 2011",
            platforms: "PC · PlayStation · Xbox · Switch · Mobile",
            mode: "Single-player · Multiplayer",
        },

        rating: {
            score: 4.8,
            reviews: 231,
        },

        requirements: {
            minimum: {
                os: "Windows 10",
                processor: "Intel Core i3",
                memory: "4 GB RAM",
                graphics: "Intel HD Graphics 4000",
                storage: "2 GB",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i5",
                memory: "8 GB RAM",
                graphics: "NVIDIA GTX 1050",
                storage: "4 GB",
            },
        },
    },

    {
        id: 7,
        name: "Crimson Desert",
        company: "Pearl Abyss",
        genre: "Action RPG",
        releaseYear: 2026,
        image: "/images/cd.jpg",
        description:
            "Crimson Desert is a large-scale action-adventure RPG set across the war-torn continent of Pywel. Players follow Kliff and the Greymanes while exploring a vast fantasy world filled with cities, wilderness, dangerous enemies, large-scale battles, and cinematic encounters.",
        previews: [
            "/images/z.jpg",
            "/images/zz.jpg",
            "/images/zzz.jpg"
        ],
        preview: [
            "Explore the continent of Pywel",
            "Large-scale fantasy combat",
            "Cinematic open-world adventures"
        ],
        stats: {
            units: "New release",
            revenue: "Performance tracking",
            profit: "Not yet established",
        }, info: {
            developer: "Pearl Abyss",
            publisher: "Pearl Abyss",
            releaseDate: "19 March 2025",
            platforms: "PC · PlayStation · Xbox",
            mode: "Single-player",
        },

        rating: {
            score: 4.7,
            reviews: 98,
        },

        requirements: {
            minimum: {
                os: "Windows 10/11",
                processor: "Intel Core i5-8400",
                memory: "16 GB RAM",
                graphics: "NVIDIA GTX 1060",
                storage: "100 GB",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i7-10700",
                memory: "32 GB RAM",
                graphics: "NVIDIA RTX 2070",
                storage: "100 GB SSD",
            },
        },
    },

    {
        id: 8,
        name: "Need for Speed Most Wanted",
        company: "Electronic Arts",
        genre: "Racing",
        releaseYear: 2005,
        image: "/images/needforspeed.jpg",
        description:
            "Need for Speed Most Wanted combines high-speed street racing with intense police pursuits. Players build their reputation by winning races, upgrading cars, defeating blacklist rivals, and escaping increasingly aggressive police forces across the fictional city of Rockport.",
        previews: [
            "/images/g.jpg",
            "/images/gg.jpg",
            "/images/ggg.jpg"
        ],
        preview: [
            "High-speed street racing",
            "Police pursuit chases",
            "Car customization and upgrades"
        ],
        stats: {
            units: "Millions of copies",
            revenue: "Commercial success",
            profit: "Estimated positive",
        }, info: {
            developer: "EA Canada",
            publisher: "Electronic Arts",
            releaseDate: "15 November 2005",
            platforms: "PC · PlayStation · Xbox",
            mode: "Single-player · Multiplayer",
        },

        rating: {
            score: 4.7,
            reviews: 156,
        },

        requirements: {
            minimum: {
                os: "Windows XP",
                processor: "Intel Pentium 4",
                memory: "512 MB RAM",
                graphics: "DirectX 9 compatible",
                storage: "3 GB",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i3",
                memory: "4 GB RAM",
                graphics: "NVIDIA GTX 750",
                storage: "5 GB",
            },
        },
    },

    {
        id: 9,
        name: "Ghost of Tsushima",
        company: "Sucker Punch Productions",
        genre: "Action-Adventure",
        releaseYear: 2020,
        image: "/images/ghostof.jpg",
        description:
            "Ghost of Tsushima follows samurai warrior Jin Sakai during the Mongol invasion of Tsushima Island. Players explore a beautiful open world, master sword combat, use stealth techniques, discover hidden locations, complete character stories, and fight to protect the island from invading forces.",
        previews: [
            "/images/h.jpg",
            "/images/hh.jpg",
            "/images/hhh.jpg"
        ], preview: [
            "Explore Tsushima Island",
            "Samurai sword combat",
            "Stealth and exploration"
        ],
        stats: {
            units: "13M+ copies sold",
            revenue: "$500M+ estimated",
            profit: "+$300M estimated",
        }, info: {
            developer: "Sucker Punch Productions",
            publisher: "Sony Interactive Entertainment",
            releaseDate: "17 July 2020",
            platforms: "PC · PlayStation",
            mode: "Single-player · Multiplayer",
        },

        rating: {
            score: 4.8,
            reviews: 137,
        },

        requirements: {
            minimum: {
                os: "Windows 10",
                processor: "Intel Core i3-7100",
                memory: "8 GB RAM",
                graphics: "NVIDIA GTX 960",
                storage: "75 GB SSD",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i5-8600",
                memory: "16 GB RAM",
                graphics: "NVIDIA RTX 2060",
                storage: "75 GB SSD",
            },
        },
    },

    {
        id: 10,
        name: "Far Cry 6",
        company: "Ubisoft",
        genre: "Action",
        releaseYear: 2021,
        image: "/images/farcry6.jpg",
        description:
            "Far Cry 6 takes place on the fictional Caribbean island of Yara, where players join a guerrilla revolution against the country's authoritarian ruler. The open world includes cities, jungles, beaches, military bases, vehicles, weapons, companions, and a wide variety of combat missions.",
        previews: [
            "/images/i.jpg",
            "/images/ii.jpg",
            "/images/iii.jpg"
        ], preview: [
            "Explore the island of Yara",
            "Guerrilla combat and weapons",
            "Vehicles and military bases"
        ],
        stats: {
            units: "Millions of copies",
            revenue: "$500M+ estimated",
            profit: "+$250M estimated",
        }, info: {
            developer: "Ubisoft Toronto",
            publisher: "Ubisoft",
            releaseDate: "7 October 2021",
            platforms: "PC · PlayStation · Xbox",
            mode: "Single-player · Multiplayer",
        },

        rating: {
            score: 4.5,
            reviews: 119,
        },

        requirements: {
            minimum: {
                os: "Windows 10",
                processor: "Intel Core i5-4460",
                memory: "8 GB RAM",
                graphics: "NVIDIA GTX 960",
                storage: "60 GB",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i7-7700",
                memory: "16 GB RAM",
                graphics: "NVIDIA RTX 2060",
                storage: "60 GB SSD",
            },
        },
    },

    {
        id: 11,
        name: "Assassin's Creed Valhalla",
        company: "Ubisoft",
        genre: "Action RPG",
        releaseYear: 2020,
        image: "/images/acv.jpg",
        description:
            "Assassin's Creed Valhalla follows Viking warrior Eivor during the Viking expansion into England. Players build settlements, raid enemy locations, form alliances, explore a large historical world, and combine brutal Viking combat with stealth and assassination techniques.",
        previews: [
            "/images/j.jpg",
            "/images/jj.jpg",
            "/images/jjj.jpg"
        ], preview: [
            "Explore medieval England",
            "Viking raids and battles",
            "Build and expand your settlement"
        ],
        stats: {
            units: "20M+ players",
            revenue: "$1.0B+ estimated",
            profit: "+$500M estimated",
        }, info: {
            developer: "Ubisoft Montreal",
            publisher: "Ubisoft",
            releaseDate: "10 November 2020",
            platforms: "PC · PlayStation · Xbox",
            mode: "Single-player",
        },

        rating: {
            score: 4.6,
            reviews: 128,
        },

        requirements: {
            minimum: {
                os: "Windows 10",
                processor: "Intel Core i5-4460",
                memory: "8 GB RAM",
                graphics: "NVIDIA GTX 960",
                storage: "160 GB",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i7-6700",
                memory: "16 GB RAM",
                graphics: "NVIDIA GTX 1080",
                storage: "160 GB SSD",
            },
        },
    },

    {
        id: 12,
        name: "Marvel's Spider-Man 2",
        company: "Insomniac Games",
        genre: "Action-Adventure",
        releaseYear: 2023,
        image: "/images/spiderman.jpg",
        description:
            "Marvel's Spider-Man 2 follows Peter Parker and Miles Morales as they protect an expanded New York City from powerful new threats. Players can switch between both Spider-Men, swing through the city, fight enemies, use unique abilities, and experience a cinematic superhero story.",
        previews: [
            "/images/k.jpg",
            "/images/kk.jpg",
            "/images/kkk.jpg"
        ], preview: [
            "Swing through New York City",
            "Play as Peter and Miles",
            "Fight powerful supervillains"
        ],
        stats: {
            units: "11M+ copies sold",
            revenue: "$500M+ estimated",
            profit: "+$250M estimated",
        }, info: {
            developer: "Insomniac Games",
            publisher: "Sony Interactive Entertainment",
            releaseDate: "20 October 2023",
            platforms: "PC · PlayStation 5",
            mode: "Single-player",
        },

        rating: {
            score: 4.8,
            reviews: 151,
        },

        requirements: {
            minimum: {
                os: "Windows 10",
                processor: "Intel Core i3-8100",
                memory: "16 GB RAM",
                graphics: "NVIDIA GTX 1650",
                storage: "140 GB SSD",
            },
            recommended: {
                os: "Windows 10/11",
                processor: "Intel Core i5-11600K",
                memory: "16 GB RAM",
                graphics: "NVIDIA RTX 3070",
                storage: "140 GB SSD",
            },
        },
    },

    {
        id: 13,
        name: "Hogwarts Legacy",
        company: "Avalanche Software",
        genre: "Action RPG",
        releaseYear: 2023,
        image: "/images/hogwarts.jpg",
        description:
            "Hogwarts Legacy allows players to experience life as a student at Hogwarts School of Witchcraft and Wizardry during the 1800s. Players attend classes, learn spells, explore Hogwarts and surrounding areas, discover magical creatures, solve mysteries, and battle dangerous enemies.",
        preview: [
            "Explore Hogwarts",
            "Learn spells and magic",
            "Discover the wizarding world"
        ],
        stats: {
            units: "30M+ copies sold",
            revenue: "$1.0B+ estimated",
            profit: "+$600M estimated",
        },
    },

    {
        id: 14,
        name: "Elden Ring",
        company: "FromSoftware",
        genre: "Action RPG",
        releaseYear: 2022,
        image: "/images/elderring.jpg",
        description:
            "Elden Ring is a dark fantasy action RPG set in the vast Lands Between. Players create their own character, explore mysterious regions, discover hidden locations, fight challenging enemies and bosses, collect powerful equipment, and uncover a complex world shaped by ancient mythology.",
        preview: [
            "Explore the Lands Between",
            "Fight challenging bosses",
            "Discover hidden locations"
        ],
        stats: {
            units: "30M+ copies sold",
            revenue: "$1.0B+ estimated",
            profit: "+$600M estimated",
        },
    },

    {
        id: 15,
        name: "Fortnite",
        company: "Epic Games",
        genre: "Battle Royale",
        releaseYear: 2017,
        image: "/images/fortnight.jpg",
        description:
            "Fortnite is a constantly evolving multiplayer game featuring battle royale matches, building mechanics, creative experiences, seasonal events, and collaborations. Players compete against others, collect equipment, explore changing environments, and fight to become the last player or team standing.",
        preview: [
            "Battle Royale matches",
            "Build and fight",
            "Seasonal events and updates"
        ],
        stats: {
            units: "500M+ registered players",
            revenue: "$26B+ estimated",
            profit: "+$10B estimated",
        },
    },

    {
        id: 16,
        name: "Uncharted 4: A Thief's End",
        company: "Naughty Dog",
        genre: "Action-Adventure",
        releaseYear: 2016,
        image: "/images/uncharted.jpg",
        description:
            "Uncharted 4: A Thief's End follows Nathan Drake on what becomes his final major treasure-hunting adventure. Players travel across different locations, solve environmental puzzles, climb dangerous landscapes, engage in firefights, and uncover the secrets of a legendary pirate treasure.",
        preview: [
            "Treasure hunting adventures",
            "Climbing and exploration",
            "Cinematic action sequences"
        ],
        stats: {
            units: "18M+ copies sold",
            revenue: "$700M+ estimated",
            profit: "+$400M estimated",
        },
    },

    {
        id: 17,
        name: "Tomb Raider",
        company: "Crystal Dynamics",
        genre: "Action-Adventure",
        releaseYear: 2013,
        image: "/images/tombraider.jpg",
        description:
            "Tomb Raider follows Lara Croft during her first major expedition, which leaves her stranded on a mysterious island. Lara must survive hostile enemies, explore ancient ruins, solve environmental puzzles, hunt for resources, and gradually become the skilled adventurer she is destined to be.",
        preview: [
            "Explore the mysterious island",
            "Survival and combat",
            "Ancient ruins and puzzles"
        ],
        stats: {
            units: "14M+ copies sold",
            revenue: "$500M+ estimated",
            profit: "+$300M estimated",
        },
    },

    {
        id: 18,
        name: "Black Myth: Wukong",
        company: "Game Science",
        genre: "Action RPG",
        releaseYear: 2024,
        image: "/images/blackmyth.jpg",
        description:
            "Black Myth: Wukong is an action RPG inspired by the classic Chinese novel Journey to the West. Players take the role of the Destined One and journey through a visually impressive world filled with mythical creatures, powerful bosses, magical abilities, and challenging combat encounters.",
        preview: [
            "Explore a mythical Chinese world",
            "Fight powerful bosses",
            "Use magical transformations"
        ],
        stats: {
            units: "25M+ copies sold",
            revenue: "$1.0B+ estimated",
            profit: "+$500M estimated",
        },
    },

    {
        id: 19,
        name: "Resident Evil Village",
        company: "Capcom",
        genre: "Survival Horror",
        releaseYear: 2021,
        image: "/images/re.jpg",
        description:
            "Resident Evil Village follows Ethan Winters as he searches for his missing daughter in a mysterious European village. The game combines survival horror, exploration, puzzles, resource management, and intense combat while introducing disturbing enemies and a collection of interconnected locations.",
        preview: [
            "Explore the mysterious village",
            "Survival horror combat",
            "Solve puzzles and uncover secrets"
        ],
        stats: {
            units: "11M+ copies sold",
            revenue: "$500M+ estimated",
            profit: "+$250M estimated",
        },
    },

    {
        id: 20,
        name: "The Last of Us Part II",
        company: "Naughty Dog",
        genre: "Action-Adventure",
        releaseYear: 2020,
        image: "/images/lou.jpg",
        description:
            "The Last of Us Part II is a dramatic post-apocalyptic adventure centered on Ellie and the consequences of violence, revenge, and difficult personal choices. Players explore ruined environments, use stealth and weapons, scavenge for resources, and experience a cinematic story filled with emotional character moments.",
        preview: [
            "Explore the post-apocalyptic world",
            "Stealth and survival combat",
            "Story-driven exploration"
        ],
        stats: {
            units: "10M+ copies sold",
            revenue: "$500M+ estimated",
            profit: "+$250M estimated",
        },
    },

    {
        id: 21,
        name: "Forza Horizon 6",
        company: "Xbox Game Studios",
        genre: "Racing",
        releaseYear: 2026,
        image: "/images/forza.jpg",
        description:
            "Forza Horizon 6 is an open-world racing experience featuring a large collection of cars, fast-paced races, exploration, customization, and dynamic driving events. Players can compete across diverse environments while building their collection and progressing through a wide variety of racing challenges.",
        preview: [
            "Open-world driving",
            "High-performance racing",
            "Car customization and events"
        ],
        stats: {
            units: "New release",
            revenue: "Performance tracking",
            profit: "Not yet established",
        },
    },

    {
        id: 22,
        name: "Days Gone",
        company: "Bend Studio",
        genre: "Action-Adventure",
        releaseYear: 2019,
        image: "/images/daysgone.jpg",
        description:
            "Days Gone follows Deacon St. John, a drifter and bounty hunter surviving in a post-apocalyptic Oregon overrun by dangerous Freakers. Players travel through forests, abandoned settlements, and hostile territories on Deacon's motorcycle while fighting enemies, searching for supplies, and uncovering the story of his past.",
        preview: [
            "Explore post-apocalyptic Oregon",
            "Survive against Freaker hordes",
            "Travel and upgrade your motorcycle"
        ],
        stats: {
            units: "9M+ players",
            revenue: "$300M+ estimated",
            profit: "+$150M estimated",
        },
    },
];

export default games;