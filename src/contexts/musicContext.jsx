import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api_request } from "../scripts/api";

const MusicContext = createContext();


export const useMusicContext = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
    const navigate = useNavigate();



    const [loading, setLoading] = useState(true);
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [queue, setQueue] = useState([]);
    const [played, setPlayed] = useState([]);
    const [library, setLibrary] = useState(new Map());
    const [updating, setUpdating] = useState(false);


    useEffect(() => {
        if (!loading) return;

        const fetch_library = async () => {


            const scan = await api_request("scan", "POST", navigate);
            const playlists = await api_request("playlists", "POST", navigate);
            const map = new Map();

            const tracksArray = await Promise.all(
                playlists.map(pl =>
                    api_request("tracks", "POST", navigate, pl.name)
                )
            );

            playlists.forEach((pl, i) => {
                map.set(pl.name, tracksArray[i]);
            });


            setLibrary(map);
            setLoading(false);
        }
        if (loading) { fetch_library(); }
        else {
            const storedLibrary = JSON.parse(sessionStorage.getItem("library"));
            if (storedLibrary) setLibrary(new Map(storedLibrary));
        }

    }, [loading])

    useEffect(() => {
        const scan_again = async () => {
            const scan = await api_request("scan", "POST", navigate);
            setUpdating(false);
        }

        if (updating == true) {
            scan_again();
        }
    }, [updating])


    useEffect(() => {
        sessionStorage.setItem("library", JSON.stringify([...library.entries()]));
    }, [library])


    const addToQueue = ((track) => {
        setQueue(prev => [...prev, track])
    })

    const removeFromQueue = ((trackId) => {
        setQueue(prev => prev.filter(track => track.id != trackId));
    })

    const isInQueue = ((trackId) => {
        return queue.some(track => track.id == trackId);
    })

    const playNext = ((track) => {
        setQueue(prev => [...prev.slice(0, 1), track, ...prev.slice(1)])
    })

    const upQueue = (trackId) => {
        setQueue(prev => {
            const newQueue = [...prev];

            for (let i = 1; i < newQueue.length; i++) {
                if (newQueue[i].id == trackId) {
                    [newQueue[i - 1], newQueue[i]] =
                        [newQueue[i], newQueue[i - 1]];
                    break;
                }
            }

            return newQueue;
        });
    };

    const downQueue = (trackId) => {
        setQueue(prev => {
            const newQueue = [...prev];

            for (let i = 0; i < newQueue.length - 1; i++) {
                if (newQueue[i].id == trackId) {
                    [newQueue[i], newQueue[i + 1]] =
                        [newQueue[i + 1], newQueue[i]];
                    break;
                }
            }

            return newQueue;
        });
    };


    const addToPlayed = (track) => {
        setPlayed(prev => [...prev, track]);
    }

    const removeFromPlayed = (trackId) => {
        setPlayed(prev => prev.filter(track => track.id != trackId));
    }

    const value = {
        queue,
        library,
        loading,
        played,
        currentPlaylist,
        currentTrack,
        setCurrentPlaylist,
        setCurrentTrack,
        addToQueue,
        removeFromQueue,
        isInQueue,
        upQueue,
        downQueue,
        playNext,
        addToPlayed,
        removeFromPlayed,
        updating,
        setUpdating,
        setLoading
    };


    /* debug */
    useEffect(() => {
        console.log("Palyed: ", played);
        console.log("Queue: ", queue);
    }, [played, queue])

    return <MusicContext.Provider value={value}>
        {children}
    </MusicContext.Provider>
}