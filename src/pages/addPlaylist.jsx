import { useEffect, useState } from "react";
import { SearchBar } from "../components/components"
import { useMusicContext } from "../contexts/musicContext"
import { Track } from "../components/components";

function AddPlaylist() {
    const name = "music";
    const { library, loading, setLoading } = useMusicContext();
    const [tracks, setTracks] = useState([]);
    const [slected, setSelected] = useState([]);


    useEffect(() => {
        if (library.get(name) == undefined) {
            setLoading(true);
        }
        else {
            const t = library.get(name);
            setTracks(t);
        }
    }, [loading]);


    function newPlaylist() { }

    return (
        <>
            <h1>New playlist</h1>
            <form onSubmit={newPlaylist}>
                <input type="text" name="name" id="pl-name" />
                <input type="submit" value="add" id="pl-sub" />

                <SearchBar setTracks={setTracks} tracks={library.get(name)} />
                <div id='tr-container'>
                    {loading == false ? tracks.map(t => <Track key={t.id} id={t.id} title={t.title} author={t.author} pl={name} />) : "<p>loading...</p>"}
                </div>

            </form>
        </>
    )
}

export default AddPlaylist