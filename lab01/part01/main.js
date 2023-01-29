var video=document.getElementById("video");
var playbtn=document.getElementById("playbtn");
var pausebtn=document.getElementById("pausebtn");
var volumeHigh=document.getElementById("volume-high");
var volumeLow=document.getElementById("volume-low");
var volumeRange=document.getElementById("volume-range");
var fastRewind=document.getElementById("fast_rewind");
var fastForward=document.getElementById("fast_forward");
var skipnext=document.getElementById("skip_next");
var skipprevious=document.getElementById("skip_previous");
var speedRange=document.getElementById("speed-range");
var bar=document.getElementById("bar-range");
var duration=document.getElementById("duration");
var currentTime=document.getElementById("current-time");
var fullscreen=document.getElementById("fullscreen");
var fullscreen_exit=document.getElementById("fullscreen_exit");
var videocontainer=document.getElementById("video-container");

pausebtn.style.display="none";
playbtn.onclick=playpause;
pausebtn.onclick=playpause;
video.onclick=playpause;
function playpause(){
    if (video.paused) {
        var intervalID=setInterval(setTime,1000);
        playbtn.style.display="none";
        pausebtn.style.display="inline-block";
        video.play();
      } else {
        clearInterval(intervalID);
        pausebtn.style.display="none";
        playbtn.style.display="inline-block";
        
        video.pause();
      }
}

bar.max=video.duration;
bar.value=0;
bar.onclick=function(){
    video.currentTime=bar.value;
}
duration.innerText="00:00";
function setTime(){
    var time=timeParse(video.currentTime);
    bar.value=video.currentTime;
    duration.innerText=timeParse(video.duration);
    currentTime.innerText=time;
}

volumeLow.style.display="none";
volumeHigh.onclick=changeVolume;
volumeLow.onclick=changeVolume;
function changeVolume(){
    if(!video.muted){
        video.volume=0;
        volumeRange.value=0;
        video.muted=true;
    }else{
        video.muted=false;
        volumeRange.value=1;
        video.volume=1;
    }
    checkVolume();
}
volumeRange.onclick=function(){
    video.volume=volumeRange.value;
    checkVolume();
}
function checkVolume(){
    if(video.volume<.1){
        volumeLow.style.display="inline-block";
        volumeHigh.style.display="none";
    }else{
        volumeHigh.style.display="inline-block";
        volumeLow.style.display="none";
    }
}


console.log(document.getElementById("playbtn"));

function timeParse(mytime){
    var time='';
    if(mytime<60){
        time="00:"
        time+=mytime<10? '0'+parseInt(mytime):parseInt(mytime);
    }else if(mytime>60){
        time=mytime/60<10?'0'+parseInt(mytime/60):parseInt(mytime/60);
        time+=":"
        time+=mytime%60<10?'0'+parseInt(mytime%60):parseInt(mytime%60);
    }
    return time;
}

skipnext.onclick=function(){
    video.currentTime=video.duration;
}
skipprevious.onclick=function(){
    video.currentTime=0;
}
speedRange.onclick=function(){
    video.playbackRate=speedRange.value;
    document.getElementById("speed-value").innerText=speedRange.value+"x";
}
fastForward.onclick=function(){
    video.currentTime+=10;
}
fastRewind.onclick=function(){
    video.currentTime-=10;
}

fullscreen_exit.style.display="none";

fullscreen.onclick=function openFullscreen() {
    if (videocontainer.requestFullscreen) {
      videocontainer.requestFullscreen();
      fullscreen_exit.style.display="inline-block";
      fullscreen.style.display="none";
    }
}

fullscreen_exit.onclick=function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fullscreen_exit.style.display="none";
      fullscreen.style.display="inline-block";
    }
  }