console.log("Welcome to spotify");
let songIndex =0;
let audioElement= new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "Let me down slowly", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Rubicorn drill", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Aaya Na Tu", filePath: "song/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Zara Sa", filePath: "song/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Tere Te", filePath: "song/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Mi Amor", filePath: "song/6.mp3", coverPath: "covers/6.jpg"},
]

songItems.forEach((element, i)=>{
    // console.log(element, i);
     element.getElementsByTagName("img")[0].src = songs[i].coverPath;
     element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
//"C:\Users\USER\OneDrive\Desktop\spotify clone\image\1.mp3"
//listen to Events
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();

        document.getElementById((songIndex-1).toString()).classList.remove('fa-play-circle');
        document.getElementById((songIndex-1).toString()).classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle'); 
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id)+1;
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = 'song/'+songIndex+'.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle'); 
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = 'song/'+songIndex+'.mp3';
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    document.getElementById((songIndex-1).toString()).classList.remove('fa-play-circle');
    document.getElementById((songIndex-1).toString()).classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle'); 
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 6
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = 'song/'+songIndex+'.mp3';
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    document.getElementById((songIndex-1).toString()).classList.remove('fa-play-circle');
    document.getElementById((songIndex-1).toString()).classList.add('fa-pause-circle');
    masterPlay.classList.remove('fa-play-circle'); 
    masterPlay.classList.add('fa-pause-circle');
})

