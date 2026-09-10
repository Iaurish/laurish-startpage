const THEMES = {
    default: {
        bg: "img/background1.jpg",
        accent: "rgb(71, 89, 167)",
        music: "", 
        welcomeText: "welcome home.",
        welcomeHover: "お帰りなさい",
        waifus: {
            folder: "img/", 
            name: [
                "sakuya izayoi", "monika", "aubrey", "remilia and flandre scarlet", 
                "jill stingray", "asuka langley soryu", "patchouli knowledge", 
                "hatsune miku", "megumin and kazuma", "ruka sarashina"
            ],
            file: [
                "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", 
                "5.jpeg", "6.jpeg", "7.jpeg", 
                "8.jpeg", "9.jpeg", "10.jpeg"
            ]
        }
    },
    eosd: {
        bg: "img/scarletdevil.jpg",
        accent: "#8a0303",
        music: "audio/eosd.mp3", 
        welcomeText: "looks like it's going to be a long night",
        welcomeHover: "永い夜になりそうね",
        waifus: {
            folder: "img/eosd/",
            name: [
                "reimu hakurei", "marisa kirisame", "rumia", "cirno", 
                "hong meiling", "patchouli knowledge", "sakuya izayoi", 
                "remilia scarlet", "flandre scarlet"
            ],
            file: [
                "reimu.jpeg", "marisa.jpeg", "rumia.jpeg", "cirno.jpeg", 
                "meiling.jpeg", "patchouli.jpeg", "sakuya.jpeg", 
                "remilia.jpeg", "flandre.jpeg"
            ] 
        }
    }
};

// change theme here
const ACTIVE_THEME = 'eosd'; 
// ==========================================

function applyTheme() {
    const theme = THEMES[ACTIVE_THEME];

    document.documentElement.style.setProperty('--bg-image', `url('${theme.bg}?v=1.1')`);
    document.documentElement.style.setProperty('--accent-color', theme.accent);
    
    const topContainer = document.querySelector('.container-top');
    if (topContainer) {
        topContainer.setAttribute('data-text', theme.welcomeText);
        topContainer.setAttribute('data-hover', theme.welcomeHover);
    }
    
    const audioEl = document.getElementById('bg-music');
    if (theme.music && audioEl) {
        audioEl.src = theme.music;
    }
}

let musicPlaying = false;
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-toggle');
    
    if (!audio.src || audio.src.endsWith(window.location.host + "/")) {
        alert("No music track set for this theme!");
        return;
    }

    if (musicPlaying) {
        audio.pause();
        btn.style.color = ""; 
        musicPlaying = false;
    } else {
        audio.play();
        btn.style.color = THEMES[ACTIVE_THEME].accent; 
        musicPlaying = true;
    }
}

applyTheme();