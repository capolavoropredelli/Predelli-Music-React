import { useState, useEffect } from 'react';
import { redirect, useNavigate } from "react-router-dom";
import { api_request } from '../scripts/api';
import { Playlist } from '../components/components';
import { useMusicContext } from '../contexts/musicContext';
import '../style/home.css';

function Home() {
    const { library, loading, load_library } = useMusicContext();
    const playlists = [...library.keys()];
    const navigate = useNavigate();

    function addClick() {
        navigate("/add_playlist");
    }

    const loadFunction = async () => {
        await load_library();
    }

    return (
        <>
            <h1>Home</h1>
            <div id="pl-container" onLoad={loadFunction}>
                {(loading == false) ?
                    (<> {playlists.map(pl => <Playlist name={pl} key={pl} />)}
                        <div className="pl-object">
                            <div id='pl-add' onClick={addClick}></div>
                        </div></>)
                    : (<p>loading...</p>)}
            </div>
        </>
    )
}

export default Home