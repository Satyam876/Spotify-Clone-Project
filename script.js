console.log('Welcome to Spotify');

// INITIALIZE VARIABLES

let songIndex = 0;
let audioElement = new Audio('/SONGS/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let masterSongName = document.getElementById('masterSongName');
let masterSongCover = document.getElementById('crr-img');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('song-item'));
let songPlay = document.getElementsByClassName('songPlay');

let songs = [
    {songName : "The Night We Met",filepath : "/SONGS/1.mp3",coverpath : "/COVER/1.jpg"},
    {songName : "Naadaan Parindey",filepath : "/SONGS/2.mp3",coverpath : "/COVER/2.jpg"},
    {songName : "Blinding Lights",filepath : "/SONGS/3.mp3",coverpath : "/COVER/3.jpg"},
    {songName : "Teri Yaad",filepath : "/SONGS/4.mp3",coverpath : "/COVER/4.jpg"},
    {songName : "Choo Lo",filepath : "/SONGS/5.mp3",coverpath : "/COVER/5.jpg"},
    {songName : "O Bedardeya",filepath : "/SONGS/6.mp3",coverpath : "/COVER/6.jpg"}
]


songItems.forEach((element,i) =>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})


// HANDLE PLAY/PAUSE CLICK

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})



// LISTEN TO EVENTS

audioElement.addEventListener('timeupdate',()=>{
    // Update Seeker
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `/SONGS/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        masterSongCover.src = songs[songIndex-1].coverpath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementsByID('next').addEventListener('click' ,()=>{
    if(songIndex >= 5){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `/SONGS/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongCover.src = songs[songIndex].coverpath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementsByID('previous').addEventListener('click' ,()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `/SONGS/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    masterSongCover.src = songs[songIndex].coverpath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

songPlay.addEventListener('click',()=>{
    if(audioElement.paused){
        audioElement.play();
        songPlay.classList.remove('fa-circle-play');
        songPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        songPlay.classList.remove('fa-circle-pause');
        songPlay.classList.add('fa-circle-play');
    }
})