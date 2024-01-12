import { token } from "./controller/cookies.js";

async function getUserId() {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        const response = await fetch('https://eclipse.herobuxx.me/api/auth/id', requestOptions);
        const data = await response.json();

        if (data.status === "success") {
            return data.data.user_id;
        } else {
            console.error('API Error:', data.message);
            return null;
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        return null;
    }
}