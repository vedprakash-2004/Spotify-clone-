let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');

let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlays = Array.from(document.getElementsByClassName('songItemPlay'));

let songs = [
    { songName: "O Devi maiya ke Mahima", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Ya Devi sarbhute su", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Jakra tu takla ", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Maliya ke betwa ", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Ujral ghar maiya ", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" }
];

// UI set
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// master play
masterPlay.onclick = () => {
    if(audioElement.paused){
        audioElement.play();
        masterPlay.classList.replace("fa-circle-play","fa-circle-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace("fa-circle-pause","fa-circle-play");
        gif.style.opacity = 0;
    }
};

// progress
audioElement.ontimeupdate = () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
};

myProgressBar.oninput = () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration)/100;
};

// reset
const makeAllPlays = () => {
    songItemPlays.forEach((el) => {
        el.classList.remove('fa-circle-pause');
        el.classList.add('fa-circle-play');
    });
};

// click song
songItemPlays.forEach((el) => {
    el.addEventListener('click', (e) => {

        makeAllPlays(); // sab reset

        let index = parseInt(e.target.id);
        songIndex = index;

        // current icon ON
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        audioElement.src = songs[index].filePath;
        masterSongName.innerText = songs[index].songName;

        audioElement.currentTime = 0;
        audioElement.play();

        gif.style.opacity = 1;

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

// next
document.getElementById("next").onclick = () => {

    makeAllPlays(); // reset icons

    songIndex = (songIndex + 1) % songs.length;

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();

    // correct icon ON
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
};

// previous
document.getElementById("previous").onclick = () => {

    makeAllPlays(); // reset icons

    songIndex = (songIndex - 1 + songs.length) % songs.length;

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;

    audioElement.currentTime = 0;
    audioElement.play();

    // correct icon ON
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
};
songItems.forEach((element, i) => {

    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

    let audio = new Audio(songs[i].filePath);

    audio.addEventListener('loadedmetadata', () => {
        let duration = audio.duration;

        let minutes = Math.floor(duration / 60);
        let seconds = Math.floor(duration % 60);

        if (seconds < 10) seconds = "0" + seconds;

        element.getElementsByClassName("timestamp")[0].childNodes[0].nodeValue =
            minutes + ":" + seconds + " ";
    });
});

audioElement.addEventListener('ended', () => {

    // next song pe jao
    songIndex = (songIndex + 1) % songs.length;

    // icon reset
    makeAllPlays();

    // new song load
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;

    // correct icon ON
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');

    // play
    audioElement.currentTime = 0;
    audioElement.play();
});