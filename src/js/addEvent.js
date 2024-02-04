async function getUserId() {
    try {
        // Get token from the cookie
        const cookies = document.cookie.split(';');
        let token = null;
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'token_prm') {
                token = value;
                break;
            }
        }

        if (!token) {
            console.error('Token not found in cookie');
            return null;
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            redirect: 'follow'
        };

        const response = await fetch('http://34.128.102.98/api/auth/id', requestOptions);
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

async function submitEvent() {
    const Url = 'http://34.128.102.98/api/ticket';

    const ticketnum = document.getElementById('ticketnum').value;
    const artisname = document.getElementById('artisname').value;
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;
    const promotorid = await getUserId();

    const userDetails = {
        id: ticketnum,
        artistid: artisname,
        title: title,
        price: parseInt(price, 10),
        location: location,
        date: date,
        description: description,
        promotorid: promotorid,
    };
    try {
        const response = await fetch(Url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        });

        const responseData = await response.json();
        const status = responseData.status;
        const message = responseData.message;
        const success = 'success';

        if (status !== success) {
            console.error('Cannot create event.');
            console.error('Status:', status);
            console.error('Error during event creation:', message);
        } else {
            console.log('Event creation succeeded');
            window.location.href = '/backstage';
        }
    } catch (error) {
        console.error('Error during event creation:', error.message);
    }
}