import { z } from 'zod';

const smartFormat = (val) => {
    if (typeof val === 'number') {
        if (val > 0 && val <= 1) {
            return `${Math.round(val * 100)}%`;
        }
    }
    return String(val);
};

const CatalogNavigationSchema = z.object({
    nivel_1: z.string().optional().default(''),
    nivel_2: z.string().optional().default(''),
    nivel_3: z.string().optional().default(''),
    nivel_4: z.string().optional().default(''),
    titulo_mostrar: z.union([z.string(), z.number()]).optional().default('').transform(smartFormat),
    descripcion: z.string().optional().default(''),
    titulo_presentacion: z.union([z.string(), z.number()]).optional().default('Presentación').transform(smartFormat),
    titulo_precio_farmacia: z.union([z.string(), z.number()]).optional().default('Precio farmacia').transform(smartFormat),
    titulo_precio_publico: z.union([z.string(), z.number()]).optional().default('Precio público').transform(smartFormat),
    tabla_id: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
});

const CatalogProductSchema = z.object({
    tabla_id: z.union([z.string(), z.number()]).transform(val => String(val)),
    producto: z.union([z.string(), z.number()]).transform(val => String(val)),
    presentacion: z.union([z.string(), z.number()]).optional().default('').transform(val => String(val)),
    requiere_elaboracion: z.string().optional().default(''),
    descripcion_producto: z.string().optional().default(''),
    badges: z.string().optional().default(''),
    precio_farmacia: z.union([z.string(), z.number()]).transform(val => String(val)),
    precio_publico: z.union([z.string(), z.number()]).transform(val => String(val)),
    estado: z.string().optional().default('activo'),
});

function normalizeKeys(obj) {
    if (Array.isArray(obj)) return obj.map(normalizeKeys);
    if (obj !== null && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
            let normalizedKey = key.toLowerCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, '_');
            
            if (normalizedKey === 'tablas_id') normalizedKey = 'tabla_id';
            if (normalizedKey === 'productos') normalizedKey = 'producto';
            
            acc[normalizedKey] = obj[key];
            return acc;
        }, {});
    }
    return obj;
}

async function runTest() {
    const GAS_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyf4h6EDfhx1OIF4EhlnjIOMKfh3vfyQ_F2xpQL-508-uBlWQvj6tN1BilRFrBHEIq9/exec';
    const SECRET_KEY = 'MH_SECRET_2026_ELITE';

    const resNav = await fetch(`${GAS_WEBAPP_URL}?action=navegacion&key=${SECRET_KEY}`);
    const rawNav = await resNav.json();
    const navigationData = z.array(CatalogNavigationSchema.passthrough()).parse(normalizeKeys(rawNav));

    const resProd = await fetch(`${GAS_WEBAPP_URL}?action=lista_precios&key=${SECRET_KEY}`);
    const rawProd = await resProd.json();
    const productsData = z.array(CatalogProductSchema.passthrough()).parse(normalizeKeys(rawProd));

    const productsByTable = productsData.reduce((acc, p) => {
        const status = (p.estado || '').toLowerCase();
        if (status !== 'activo') return acc;
        if (!acc[p.tabla_id]) acc[p.tabla_id] = [];
        acc[p.tabla_id].push(p);
        return acc;
    }, {});

    const gelesNav = navigationData.find(n => n.titulo_mostrar.toLowerCase().includes('geles'));
    console.log("Navegacion Geles tabla_id:", gelesNav ? `'${gelesNav.tabla_id}'` : "Not found");
    
    if (gelesNav) {
        const matches = productsByTable[gelesNav.tabla_id] || [];
        console.log(`Productos encontrados para '${gelesNav.tabla_id}': ${matches.length}`);
        
        // Find if there are products with a similar tabla_id
        const allIds = Object.keys(productsByTable);
        const similarIds = allIds.filter(id => id.toLowerCase().includes('gele'));
        console.log("IDs similares en productos:", similarIds.map(id => `'${id}'`));
    }
}

runTest().catch(console.error);
