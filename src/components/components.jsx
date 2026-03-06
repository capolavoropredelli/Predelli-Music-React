import { useNavigate } from "react-router-dom";
import { play } from "../scripts/utils";
import { useMusicContext } from "../contexts/musicContext";
import { api_request } from "../scripts/api";
import { useState } from "react";

export function Playlist({ name }) {
    const navigate = useNavigate();

    function handleClick() {
        console.log(name);
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
                    <button className="tr-play" onClick={playClick}>play</button>
                    <button className="tr-enqueue" onClick={enqueueClick}>enqueue</button>
                    <button className="tr-playnext" onClick={playNextClick}>play next</button>
                    <button className="tr-playlist">playlist</button>
                    <button className="tr-hide">hide</button>
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
