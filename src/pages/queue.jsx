import { useState } from "react";
import { useMusicContext } from '../contexts/musicContext';
import { Track } from "../components/components";

function Queue() {
    const { queue, removeFromQueue } = useMusicContext();

    return (
        <>
            <h1>Queue</h1>
            <div id="tr-container">
                {(queue.length > 0) ?
                    (queue.map(t => <Track key={t.id} id={t.id} title={t.title} author={t.author} isQueue={true} />))
                    :
                    ("There are no tracks in the queue (" + queue.length + ")")
                }
            </div>
        </>
    )
}

export default Queue;