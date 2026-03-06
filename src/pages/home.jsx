import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { api_request } from '../scripts/api';
import { Playlist } from '../components/components';
import { useMusicContext } from '../contexts/musicContext';
import '../style/home.css';

function Home() {
    const { library, loading } = useMusicContext();
    const playlists = [...library.keys()];

    return (
        <>
            <h1>Home</h1>
            <div id="pl-container">
                {(loading == false) ?
                    (<> {playlists.map(pl => <Playlist name={pl} key={pl} />)}
                        <div className="pl-object">
                            <div id='pl-add'></div>
                        </div></>)
                    : (<p>loading...</p>)}
            </div>
        </>
    )
}

export default Home