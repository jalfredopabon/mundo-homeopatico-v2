// Usando fetch nativo

const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyf4h6EDfhx1OIF4EhlnjIOMKfh3vfyQ_F2xpQL-508-uBlWQvj6tN1BilRFrBHEIq9/exec';
const SECRET_KEY = 'MH_SECRET_2026_ELITE';

async function auditTable(action) {
    console.log(`\n--- Auditando tabla: ${action} ---`);
    try {
        const url = `${GAS_WEBAPP_URL}?action=${action}&key=${SECRET_KEY}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const data = await res.json();
        
        console.log(`Total registros recibidos: ${data.length}`);
        if (data.length > 0) {
            console.log('Estructura del primer registro (llaves originales):');
            console.log(Object.keys(data[0]));
            
            // Analizar campos vacíos o nulos de muestra
            const sample = data.slice(0, 3);
            console.log('\nMuestra de los primeros 3 registros:');
            console.log(JSON.stringify(sample, null, 2));
        } else {
            console.log('La tabla está vacía.');
        }
    } catch (e) {
        console.error(`Error al auditar ${action}:`, e.message);
    }
}

async function run() {
    await auditTable('navegacion');
    await auditTable('lista_precios');
}

run();
