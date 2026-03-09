import { useEffect, useState } from "react";
import { SearchBar } from "../components/components"
import { useMusicContext } from "../contexts/musicContext"
import { TrackPlaylist } from "../components/components";
import { api_request } from "../scripts/api";
import { useNavigate } from "react-router-dom";

function AddPlaylist() {
    const name = "music";
    const navigate = useNavigate();
    const { library, loading, setLoading } = useMusicContext();
    const [tracks, setTracks] = useState([]);
    const [selected, setSelected] = useState([]);


    useEffect(() => {
        if (library.get(name) == undefined) {
            setLoading(true);
        }
        else {
            const t = library.get(name);
            setTracks(t);
        }
    }, [loading]);

    useEffect(() => {
        console.log(selected);
    }, [selected])

    function select(id) {
        if (!isSelected(id)) {
            setSelected(prev => [...prev, id]);
        } else {
            setSelected(prev => prev.filter(ids => ids != id));
        }
    }

    function isSelected(id) {
        return selected.some(ids => ids == id)
    }

    async function createPlaylist(e) {
        e.preventDefault();

        console.log("getting form info");
        const name = document.getElementById("pl-name").value;
        const body = {
            name: name,
            tracks: selected
        }
        console.log("form info: ", body);

        console.log("api request... ");
        const result = await api_request("playlist", "POST", navigate, body);
        console.log("playlist created");

    }

    return (
        <>
            <h1>New playlist</h1>
            <form name="pl-form" onSubmit={(e) => createPlaylist(e)}>
                <input type="text" name="name" id="pl-name" required />
                <input type="submit" value="add" id="pl-sub" />

                <SearchBar setTracks={setTracks} tracks={library.get(name)} />
                <div id='tr-container'>
                    {loading == false ? tracks.map(t => <TrackPlaylist onClick={select} key={t.id} id={t.id} title={t.title} author={t.author} isSelected={isSelected(t.id)} />) : "loading..."}
                </div>

            </form>
        </>
    )
}

export default AddPlaylist