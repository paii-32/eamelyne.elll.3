const songs = [
    {
        title: "About you",
        artist: "The 1975",
        src: "Music/SpotiDownloader.com - About You - The 1975.mp3",
        cover: "Pictures/Lirik-lagu-About-You-The-1975.jpg"
    },
    {
        title: "Blue",
        artist: "Yung Kai",
        src: "Music/spotifydown.com - blue.mp3",
        cover: "Pictures/Blue.jpg"
    },
    {
        title: "Cinta luar biasa",
        artist: "Andmesh",
        src: "Music/spotifydown.com - Cinta Luar Biasa.mp3",
        cover: "c:/Users/Rifqia/OneDrive/Pictures/cinta luar biasa cover gambar.jpg"
    },
    {
        title: "Kasih putih",
        artist: "Glenn fredly",
        src: "Music/SpotiDownloader.com - Kasih Putih - Yovie Widianto.mp3",
        cover: "Pictures/Kasih putih.jpg"
    },
    {
        title: "Rahasia hati",
        artist: "Nidji",
        src: "Music/spotifydown.com - Rahasia Hati.mp3",
        cover: "Pictures/Rahasia hati nidji.jpg"
    },
    {
        title: "Season",
        artist: "Wave to earth",
        src: "Downloads/v4.www-y2mate.blog - wave to earth - seasons (320 KBps).mp3",
        cover: "Pictures/wave to earth.jpg"
    }
];

let currentSong = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const playlist = document.getElementById('playlist');

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
}

function playSong() {
    audio.play();
    playBtn.textContent = "pause";
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "play";
}

playBtn.addEventListener('click', () => {
    if (audio.paused) playSong();
    else pauseSong();
});

nextBtn.addEventListener('click', () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
});

prevBtn.addEventListener('click', () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
});

songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${song.title}`;
    li.addEventListener("click", () => {
        currentSong = index;
        loadSong(currentSong);
        playSong();
    });
    playlist.appendChild(li);
});

loadSong(currentSong);
