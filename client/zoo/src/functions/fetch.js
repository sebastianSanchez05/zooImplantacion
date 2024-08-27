export const fetchData = async (method, url, data = null) => {
    try {
        const options = {
            method: method, 
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (method !== 'GET' && data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error en fetch:', error);
        return null; 
    }
}
