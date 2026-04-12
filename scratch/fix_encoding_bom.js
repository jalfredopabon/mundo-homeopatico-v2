import fs from 'fs';
const filePath = 'c:\\Users\\Alfredo Pabón\\Documents\\Proyectos antigravity\\mundo_homeopatico_v2\\carpeta_temporal_tablas\\vademecum_maestro.csv';
const content = fs.readFileSync(filePath, 'utf8');

// UTF-8 BOM is \ufeff
const BOM = '\ufeff';

// Check if it already has a BOM
if (content.startsWith(BOM)) {
    console.log('File already has a BOM. No changes needed.');
} else {
    fs.writeFileSync(filePath, BOM + content, 'utf8');
    console.log('UTF-8 BOM added successfully to ' + filePath);
}
