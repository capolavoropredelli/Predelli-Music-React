import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api_request } from "../scripts/api";
import { Track } from "../components/components";
import { useMusicContext } from "../contexts/musicContext";
import '../style/playlist.css';


function Playlist() {
    const { name } = useParams();
    const { library, loading } = useMusicContext();
    const tracks = library.get(name);


    return (
        <>
            <h1>{name}</h1>
            <div id='tr-container'>
                {loading == false ? tracks.map(t => <Track key={t.id} id={t.id} title={t.title} author={t.author} pl={name} />) : "loading..."}
            </div>
        </>
    )
}

export default Playlist