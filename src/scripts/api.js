const API_URL = /*"http://localhost:8000"*/ "https://apimusic.predelli.site"

function get_template_form(meth, form_data) {
    return {
        method: meth,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(form_data)
    }
}

export async function api_request(route, method, navigate, body = {}, retry = true) {
    const API_ROUTE = API_URL + "/" + route;
    try {
        const response = await fetch(API_ROUTE, get_template_form(method, body));
        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.detail.data == "AUTH_ERROR") {
                if (retry == true) {
                    const refreshed = await refresh_tokens(navigate);
                    if (refreshed == true) {
                        return api_request(route, method, navigate, form_data, false)
                    }
                } else {
                    navigate("/login");
                }
            }
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error.message);
    }
}

async function refresh_tokens(navigate) {
    const API_ROUTE = API_URL + "/refresh";

    try {
        const response = await fetch(API_ROUTE, {
            method: "POST",
            credentials: "include"
        });

        if (!response.ok) {
            navigate("/login");
            return false;
        }

        return true;

    } catch (error) {
        console.error(error.message);
        return false;
    }
}

