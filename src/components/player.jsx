import '../style/player.css'
import { play } from "../scripts/utils";
import { useMusicContext } from '../contexts/musicContext';

function Player() {
    const { queue, library, removeFromQueue, currentPlaylist, currentTrack, played, removeFromPlayed, addToPlayed, playNext } = useMusicContext();


    function playNextSong() {
        console.log("playing next...")

        // moving current song from queue to played
        const current = queue[0];
        removeFromQueue(current.id);
        addToPlayed(current);

        let nextId;
        if (queue.length > 1) {
            nextId = queue[1].id;
        } else {
            const next = getRandomTrack();
            nextId = next.id;
            playNext(next);
        }
        play(nextId);
        console.log("next played...")
    }

    function test() {
        console.log("testing...");
    }

    function getRandomTrack() {
        const playlist = library.get(currentPlaylist);
        const dim = playlist.length;
        const random = Math.round(Math.random() * dim);
        const next = playlist[random];
        return next;
    }

    function playPrev() {
        const dim = played.length;
        if (dim > 0) {
            let prevId;
            let prev = played[dim - 1];
            playNext(prev);
            prevId = prev.id;
            removeFromPlayed(prevId);
            play(prevId);
        }

    }

    return (
        <>

            <div id="play-container">
                <button id="prev" onClick={playPrev}></button>
                <audio id='player' controls onEnded={playNextSong}></audio>
                <button id="next" onClick={playNextSong}></button>
            </div>

        </>
    )
}
/**
 * <button onClick={handleSkip}>skip</button>
 */

export default Player