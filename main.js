// its necessary to write let or var keyword for naming. it was throwing error for that.
now_playing = document.querySelector(".now-playing");
track_art = document.querySelector(".track-art");
track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

playpause_btn = document.querySelector(".playpause-track");
next_btn = document.querySelector(".next-track");
prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
curr_time = document.querySelector(".current-time");
total_duration = document.querySelector(".total-duration");

track_index = 0;
isPlaying = false;
let updateTimer;

curr_track = document.createElement("audio");

let track_list = [{
        name: "Ready for it",
        artist: "Taylor Swift",
        image: "/Songs/Ready For It.jpg",
        path: "/Songs/1. Ready for it.mp3",
    },
    {
        name: "Bad Blood",
        artist: "Taylor Swift",
        image: "/Songs/Bad Blood 1.webp",
        path: "/Songs/2. Bad Blood.mp3",
    },
    {
        name: "I forgot that you existed",
        artist: "Taylor Swift",
        image: "/Songs/I Forgot That You Existed.png",
        path: "/Songs/3. I Forgot That You Existed.mp3",
    },
    {
        name: "Love Story",
        artist: "Taylor Swift",
        image: "/Songs/PNG PICTURES/Love Story.png",
        path: "/Songs/4. Love Story.mp3",
    },
    {
        name: "All to well",
        artist: "Taylor Swift",
        image: "/Songs/All To Well.png",
        path: "/Songs/5. All to well.mp3",
    },
    {
        name: "Betty",
        artist: "Taylor Swift",
        image: "/Songs/Betty 1.webp",
        path: "/Songs/6. Betty.mp3",
    },
    {
        name: "You belong to me",
        artist: "Taylor Swift",
        image: "/Songs/You Belong With Me 1.webp",
        path: "/Songs/7. You belong with me.mp3",
    },
    {
        name: "Shake it off",
        artist: "Taylor Swift",
        image: "/Songs/Shake It Off.jpg",
        path: "/Songs/8. Shake it Off.mp3",
    },
    {
        name: "Paper Rings",
        artist: "Taylor Swift",
        image: "/Songs/Paper Rings.jpg",
        path: "/Songs/9. Paper Rings.mp3",
    },
    {
        name: "New Years Day",
        artist: "Taylor Swift",
        image: "/Songs/New Years Day.png",
        path: "/Songs/10. New Years Day.mp3",
    },
];

function loadTrack(track_index) {
    //Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    //Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    //Update details of the track
    track_art.src = " " + track_list[track_index].image + " ";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    //Set an interval of a 1000 milliseconds
    //for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);

    //Move to the next track if the current finishes playing
    //using the'ended' event
    curr_track.addEventListener("ended", nextTrack);

    random_bg_color();
}

i = 0

function random_bg_color() {
    let colors = ["red", "blue", " orange", "pink", "yellow", "green", "aqua", "coral", "crimson"]
    document.body.style.background = colors[i]
    i = i + 1
    if (i == colors.length) {
        i = 0
    }
}

//Function to reset all the values to their default.
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    //Switch between playing and pausing
    //depending on the current state.
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    //Play the loaded track
    curr_track.play();
    isPlaying = true;

    //Replace icon with the pause icon
    playpause_btn.innerHTMl = '<i class="fa fa-pause-circle"></i>';
}

function pauseTrack() {
    //Pause the loaded track.
    curr_track.pause();
    isPlaying = false;

    //Replace icon with the play icon
    playpause_btn.innerHTMl = '<i class="fa-solid fa-pause"></i>';
}

function nextTrack() {
    //Go back to the first track if the
    //current one isis the last in the track list
    if (track_index < track_list.length - 1) { track_index += 1; } else track_index = 0;

    //Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    //Go back to the last track if the
    //current one is the first in the tracklist
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;

    //Load and play the new track
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    //Calculate the seek position
    //by the percentage of the seek slider
    //and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);

    //Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}

function setVolume() {
    //Set the volume according to the
    //percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    //Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        //Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        //Add a  zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        //Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

//Load the first song
loadTrack(track_index);