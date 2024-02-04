async function displayTickets(orders) {
    const { user_id } = await getUserId(); // Get the user_id

    const tableBody = document.getElementById('order2confirm');
    tableBody.innerHTML = '';

    orders.forEach(order => {
        console.log('Order Status:', order.status);

        // Check if the user_id matches the promotorid and the status is "true" before displaying the order
        if (order.promotorid === user_id && order.status === "false") {
            console.log('Displaying Order:', order);
        
            const data = document.createElement('tr');
            data.className = "bg-white border-b dark:bg-stone-800 dark:border-stone-700";
            data.innerHTML = `
                <th scope="row" class="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white">
                <a href="detail.html?id=${order.id}">
                ${order.id}
                </a>
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white">
                <a href="detail.html?id=${order.id}">
                ${order.artistid}
                </a>
                </th>
                <th scope="row" class="px-6 py-4 font-medium text-stone-900 whitespace-nowrap dark:text-white">
                <a href="detail.html?id=${order.id}">
                ${order.title}
                </a>
                </th>
            `;
            tableBody.appendChild(data);
        }
    });
}

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
            return { token: null, user_id: null };
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
            return { token, user_id: data.data.user_id };
        } else {
            console.error('API Error:', data.message);
            return { token: null, user_id: null };
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        return { token: null, user_id: null };
    }
}

async function getTickets() {
    const { token, user_id } = await getUserId();

    if (!token || !user_id) {
        console.error('Unable to get token or user ID');
        return;
    }

    var requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
        redirect: 'follow'
    };

    fetch(`http://34.128.102.98/api/ticket`, requestOptions)
        .then(response => {
            console.log('Raw Response:', response);
            return response.json();
        })
        .then(data => {
            console.log('Parsed JSON Data:', data);
            displayTickets(data.data);
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
}


window.onload = getTickets;
