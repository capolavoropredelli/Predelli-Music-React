import { useState } from "react";
import { Result } from "../components/components";
import { api_request } from "../scripts/api";
import { useNavigate } from "react-router-dom";


function Download() {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        let query = document.forms["search-form"]["search-bar"].value;

        const yt_query = await api_request("yt_query", "POST", navigate, query);
        const yt_results = yt_query.items;

        setResults(yt_results);


    }

    return (
        <>
            <form method="get" name="search-form" onSubmit={e => handleSubmit(e)}>
                <input type="text" placeholder="search" name="search-bar" id="search-bar" />
                <input type="submit" value="search" name="search-btn" id="search-btn" />
            </form>
            <div className="res-container">
                {results.map(res => <Result key={res.id.videoId} url={res.id.videoId} title={res.snippet.title} author={res.snippet.channelTitle} navigate={navigate} />)}
            </div>
        </>
    )
}

export default Download;