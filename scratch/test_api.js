
const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyxW3qPkvkItHbe32RLX5GsqYHbSTgRdO87jGSHpCJ2ybC7y3zx3gXuiu4r88lhm-kM/exec';
const GAS_SECRET_KEY = 'MH_SECRET_2026_ELITE';

async function testFetch() {
    try {
        const url = `${GAS_WEBAPP_URL}?action=maestro&key=${GAS_SECRET_KEY}`;
        console.log('Fetching from:', url);
        const response = await fetch(url);
        console.log('Status:', response.status);
        if (!response.ok) {
            console.error('Fetch failed');
            return;
        }
        const data = await response.json();
        console.log('Data received, length:', Array.isArray(data) ? data.length : 'not an array');
        if (data.error) {
            console.error('API Error:', data.error);
        } else {
            console.log('First item:', JSON.stringify(data[0], null, 2));
        }
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

testFetch();
