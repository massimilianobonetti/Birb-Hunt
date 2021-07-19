/**
 * Whether the sounds can be played
 * @type {boolean} that indicates whether the sounds can be played
 */
var addSounds = false;
/**
 * Background sound
 * @type {Audio} background sound
 */
var backgroundMusic = null;

/**
 * It plays a background music
 */
function playBackgroundMusic() {
    playSound("mixkit-valley-sunset-127", ".mp3", true);
}

/**
 * It plays the sound that indicates that the bird was captured
 */
function playBirdCapturedSound() {
    playSound("birdCaptured", ".wav", false);
}

/**
 * It plays the sound that indicatest that the game is over
 */
function playGameOverSound() {
    playSound("mixkit-game-level-completed-2059", ".wav", false);
}

/**
 * It plays the sound that indicatest that the game is over
 */
function playFailedSound() {
    playSound("mixkit-funny-fail-low-tone-2876", ".wav", false);
}

/**
 * It plays the sound of a bird
 */
function playBirdSound() {
    playSound("mixkit-little-bird-calling-chirp-23", ".wav", false);
}

/**
 * It plays the sound only if the addSounds variable is true. In that case it plays the sound
 * in the given filename with the given file extension. If it is a background sound then
 * the sound can loop.
 * @param filename name of the file of the sound
 * @param fileExtension extension of the file of the sound
 * @param isBackground whether the sound is a background sound
 */
function playSound(filename, fileExtension, isBackground) {
    if(addSounds) {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        const baseDir = window.location.href.replace(page, '');
        const audioDir = baseDir+"sounds/";

        if(isBackground) {
            if(backgroundMusic==null) {
                backgroundMusic = new Audio(audioDir+filename+fileExtension);
                backgroundMusic.loop=true;
            }
            backgroundMusic.play();
        } else {
            var audio = new Audio(audioDir+filename+fileExtension);
            audio.loop=false;
            audio.play();
        }
    }
}

/**
 * It pauses the background sound
 */
function stopSounds() {
    if(backgroundMusic!=null) {
        backgroundMusic.pause();
    }
}