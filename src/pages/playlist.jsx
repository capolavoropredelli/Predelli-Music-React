import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api_request } from "../scripts/api";
import { Track, SearchBar } from "../components/components";
import { useMusicContext } from "../contexts/musicContext";
import '../style/playlist.css';


function Playlist() {
    const { name } = useParams();
    const { library, loading, setLoading } = useMusicContext();
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        if (library.get(name) == undefined) {
            setLoading(true);
        }
        else {
            const t = library.get(name);
            console.log(t);
            setTracks(t);
            console.log(tracks);
        }

    }, [loading])


    return (
        <>
            <h1>{name}</h1>
            <div id='tr-container'>
                {loading == false ? tracks.map(t => <Track key={t.id} id={t.id} title={t.title} author={t.author} pl={name} />) : "<p>loading...</p>"}
            </div>
        </>
    )
}

export default Playlist