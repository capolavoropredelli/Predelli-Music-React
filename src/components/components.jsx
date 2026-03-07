import { useNavigate } from "react-router-dom";
import { play } from "../scripts/utils";
import { useMusicContext } from "../contexts/musicContext";
import { api_request } from "../scripts/api";
import { useState } from "react";

export function Playlist({ name }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/playlist/" + name);
    }

    return (
        <div className="pl-object" onClick={handleClick}>
            <div className="pl-icon"></div>
            <p className="pl-name">{name}</p>
        </div>
    )
}

export function Track({ pl, id, title, author, isQueue = false }) {
    const { addToQueue, isInQueue, removeFromQueue, upQueue, downQueue, playNext, setCurrentPlaylist } = useMusicContext();

    function playClick() {
        setCurrentPlaylist(pl);
        const track = {
            id: id,
            title: title,
            author: author
        }
        playNext(track);
        play(id);
    }

    function enqueueClick() {
        if (!isInQueue(id)) {
            const track = {
                id: id,
                title: title,
                author: author
            };
            addToQueue(track);
        }
    }

    function playNextClick() {
        if (!isInQueue(id)) {
            const track = {
                id: id,
                title: title,
                author: author
            };
            playNext(track);
        }
    }

    function dequeueClick() {
        if (isInQueue(id)) {
            removeFromQueue(id);
        }
    }

    function upClick() {
        if (isInQueue(id)) {
            upQueue(id);
        }
    }

    function downClick() {
        if (isInQueue(id)) {
            downQueue(id);
        }
    }

    return (
        <div className="tr-object" >
            <div className="tr-icon"></div>
            <div className="tr-info">
                <div className="tr-title">{title}</div>
                <div className="tr-author">{author}</div>
            </div>
            <div className="tr-actions">
                {(!isQueue) ? (<>
                    <button className="tr-play" onClick={playClick}></button>
                    <button className="tr-enqueue" onClick={enqueueClick}></button>
                    <button className="tr-playnext" onClick={playNextClick}></button>
                    <button className="tr-playlist"></button>
                    <button className="tr-hide"></button>
                </>) : (<>
                    <button className="tr-dequeue" onClick={dequeueClick}>dequeue</button>
                    <button className="tr-up" onClick={upClick}>up</button>
                    <button className="tr-down" onClick={downClick}>down</button>
                </>)}
            </div>
        </div>
    )
}

export function Result({ title, author, url, navigate }) {

    const [status, setStatus] = useState("");
    const { updating, setUpdating } = useMusicContext();

    async function downloadClick() {
        let filename = title + " - " + author;

        setStatus("downloading...");
        const request = await api_request("yt_download", "POST", navigate, { url, filename });
        setStatus("downloaded");

        setStatus("updating your library...");
        setUpdating(true);
        while (updating == true) {

        }
        setStatus("track added to your library");
    }

    return (
        <>
            <p>{status}</p>
            <div className="tr-object" >
                <div className="tr-icon"></div>
                <div className="tr-info">
                    <div className="tr-title">{title}</div>
                    <div className="tr-author">{author}</div>
                </div>
                <div className="tr-actions">
                    <button className="tr-download" {...(status != "") ? "disabled" : ""} onClick={downloadClick}>download</button>
                </div>
            </div>
        </>
    )
}

export function SearchBar({ setTracks, tracks }) {

    function search(e) {
        let text_searched = e.target.value;
        let newTracks = []
        let title, author;
        tracks.forEach(t => {
            title = t.title;
            author = t.author;

            title = title.toLowerCase();
            author = author.toLowerCase();
            text_searched = text_searched.toLowerCase();

            if (title.includes(text_searched) || author.includes(text_searched)) {
                newTracks.push(t);
            }
        })
        setTracks(newTracks);
    }

    return (
        <input type="text" name="search-bar" id="search-bar" placeholder="search" onKeyUp={(e) => search(e)} />
    )

}