const song = document.getElementById('song');
const playBtn = document.querySelector('.play');
const backBtn = document.querySelector('.play-back');
const forwardBtn = document.querySelector('.play-forward');
const shuffleBtn = document.querySelector('.play-shuffle');
const repeatBtn = document.querySelector('.play-repeat');
const durationTime = document.querySelector('.duration');
const remainingTime = document.querySelector('.remaining');
const musicName = document.querySelector('.music-name');
const musicImage = document.querySelector('.music-image');
const musicThumb = document.querySelector('.music-thumb');
let rangeBar = document.querySelector('.range');


var isPlay = true;
var isSongRamdom = false;
var isRepeat = false;
indexSong = 0;

displayTimer();
let timer;

// Button set song play and pause
playBtn.addEventListener('click', playPause);
function playPause(){
    if (isPlay) {
        song.play();
        isPlay = false;
        playBtn.innerHTML = `<ion-icon name="pause"></ion-icon>`;
        timer = setInterval(displayTimer, 1000);
        musicThumb.classList.add('is-playing');
    }
    else{
        song.pause();
        isPlay = true;
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        clearInterval();
        musicThumb.classList.remove('is-playing');
    }
}


// Change song
const listSong = ['TanVo.mp3', 'AnhLaiLamEmKhoc.mp3', 'ThayLong.mp3'];
const listSongName = ['Tan vỡ', 'Anh lại làm em khóc', 'Thay lòng'];

backBtn.addEventListener('click',function(){
    changeSong(-1);
});
forwardBtn.addEventListener('click', function(){
    changeSong(1);
});
shuffleBtn.addEventListener('click', function(){
    if (isSongRamdom==true){
        shuffleBtn.classList.remove('selected');
        isSongRamdom = false;
    } else {
        shuffleBtn.classList.add('selected');
        isSongRamdom = true;
    }
})

repeatBtn.addEventListener('click', function(){
    if (isRepeat){
        repeatBtn.classList.remove('selected');
        isRepeat = false;
    } else {
        repeatBtn.classList.add('selected');
        isRepeat = true;
    }
})

song.addEventListener('ended', function(){
    if (isRepeat){
        songPlay(indexSong);
    } else {
        changeSong(1);
    }
})
function songPlay(indexSong){
    isPlay = true;
    song.setAttribute('src', `./music/${listSong[indexSong]}`);
    musicName.textContent = listSongName[indexSong];
    playPause();
}

function changeSong(dir){
    if (isSongRamdom){
        indexSong = Math.floor(Math.random() * listSong.length);
        songPlay(indexSong);
    }
    if (!isSongRamdom){
        if (dir==1){
            // next song
            if (indexSong === listSong.length-1){
                indexSong = 0;
            }else{
                indexSong++;
            }
            songPlay(indexSong);
        }
        if (dir==-1){
            // prev song
            if (indexSong === 0){
                indexSong = listSong.length-1;
            }else{
                indexSong--;
            }
            songPlay(indexSong);
        }
    }
}


// song timer
function formatTimer(time){
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    return `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`;
}
function displayTimer(){
    const {duration, currentTime} = song;
    if (!duration){
        durationTime.textContent = '00:00';
    } else {
        durationTime.textContent = formatTimer(duration);
    }
    remainingTime.textContent = formatTimer(currentTime);
    rangeBar.max = duration;
    rangeBar.value = currentTime;
}

rangeBar.addEventListener('change', function(){
    song.currentTime = rangeBar.value;
});


