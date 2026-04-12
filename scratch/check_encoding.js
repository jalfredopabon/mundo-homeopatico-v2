import fs from 'fs';
const filePath = 'c:\\Users\\Alfredo Pabón\\Documents\\Proyectos antigravity\\mundo_homeopatico_v2\\carpeta_temporal_tablas\\vademecum_maestro.csv';
const buffer = fs.readFileSync(filePath);
console.log('First 20 bytes:', buffer.slice(0, 20).toString('hex'));
const line2Start = buffer.indexOf('\n') + 1;
const line2Sample = buffer.slice(line2Start, line2Start + 200);
console.log('Line 2 sample (hex):', line2Sample.toString('hex'));
console.log('Line 2 sample (utf8):', line2Sample.toString('utf8'));
