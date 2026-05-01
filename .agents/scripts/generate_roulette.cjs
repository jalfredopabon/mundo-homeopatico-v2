const fs = require('fs');

const pathLeaf = `    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7241 2.80504C20.6545 2.54646 20.4523 2.34461 20.1936 2.27546C19.9349 2.2063 19.6589 2.28033 19.4696 2.46969C19.343 2.59622 19.2121 2.73232 19.0747 2.8752C17.9141 4.08222 16.2886 5.77259 12.8938 6.25756C9.13927 6.79392 6.24988 9.30622 6.24988 13C6.24988 13.826 6.39825 14.6174 6.6698 15.3489C7.5729 14.9264 8.61929 14.5719 9.8181 14.2722C12.8148 13.5231 14.9255 11.6428 16.3923 9.61515C16.6351 9.27955 17.104 9.2043 17.4396 9.44707C17.7752 9.68985 17.8504 10.1587 17.6077 10.4943C16.0012 12.715 13.6186 14.8683 10.1819 15.7274C9.06243 16.0073 8.12638 16.3276 7.34598 16.6887C8.55105 18.532 10.6332 19.75 12.9999 19.75C15.162 19.75 18.0546 18.9402 19.9238 16.3094C21.7942 13.677 22.5032 9.413 20.7241 2.80504Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.6698 15.3489C5.81811 15.7473 5.09387 16.2063 4.4894 16.737C3.22311 17.8487 2.5348 19.2289 2.2602 20.8765C2.19211 21.2851 2.46812 21.6715 2.8767 21.7396C3.28528 21.8077 3.6717 21.5317 3.73979 21.1231C3.9652 19.7707 4.50584 18.7186 5.47903 17.8642C5.97017 17.4331 6.58385 17.0414 7.34598 16.6887C7.07343 16.2718 6.84576 15.8229 6.6698 15.3489Z"></path>`;
const pathDroplet = `    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9223 2.42838C13.2679 0.857205 10.7321 0.857205 9.07766 2.42838C7.79766 3.64397 6.22927 5.31956 4.97628 7.24155C3.72892 9.1549 2.75 11.3797 2.75 13.678C2.75 18.1459 6.25744 22.75 12 22.75C17.7426 22.75 21.25 18.1459 21.25 13.678C21.25 11.3797 20.2711 9.15491 19.0237 7.24155C17.7707 5.31956 16.2023 3.64397 14.9223 2.42838ZM15 13.9999C15 15.6568 13.6569 16.9999 12 16.9999C11.4477 16.9999 11 17.4477 11 17.9999C11 18.5522 11.4477 18.9999 12 18.9999C14.7614 18.9999 17 16.7614 17 13.9999C17 13.4477 16.5523 12.9999 16 12.9999C15.4477 12.9999 15 13.4477 15 13.9999Z"></path>`;
const pathMortar = `    <path d="M4.90847 11.25H19.0876C19.5308 11.2499 19.9512 11.2498 20.2953 11.3071C20.6936 11.3734 21.0851 11.5297 21.3871 11.9053C21.3871 11.9053 21.3871 11.9053 21.3871 11.9053C21.6723 12.2598 21.7603 12.6433 21.7466 13.0381C21.7354 13.3626 21.6517 13.732 21.5686 14.0986C20.9817 16.6933 19.269 19.0394 17.0669 20.394C17.6127 21.4447 16.8448 22.75 15.6716 22.75H8.32449C7.15124 22.75 6.38336 21.4447 6.92912 20.394C4.72709 19.0394 3.0143 16.6932 2.42741 14.0986C2.34436 13.732 2.26067 13.3626 2.2494 13.0381C2.23569 12.6433 2.32374 12.2598 2.6089 11.9053C2.91097 11.5297 3.30245 11.3734 3.7007 11.3071C4.04486 11.2498 4.4652 11.2499 4.90847 11.25Z"></path>
    <path d="M9.62312 7.5625C9.47295 7.76341 9.30636 7.95271 9.12939 8.12968C8.95251 8.30656 8.7633 8.47308 8.5625 8.6232L9.46834 9.52903C9.76123 9.82193 10.2361 9.82193 10.529 9.52903C10.8219 9.23614 10.8219 8.76127 10.529 8.46837L9.62312 7.5625Z"></path>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25391 1.97478L2.25384 1.98243V1.98245C2.25273 2.11107 2.24962 2.47076 2.25497 2.67806C2.26587 3.10003 2.2972 3.68163 2.37971 4.31702C2.46187 4.94972 2.59704 5.65384 2.82215 6.31402C3.04472 6.96674 3.37286 7.62938 3.87236 8.12887C4.75663 9.01314 5.71727 9.42765 6.69728 9.36111C7.39445 9.31377 8.0214 9.02795 8.56377 8.6225L5.9716 6.03033C5.6787 5.73744 5.6787 5.26256 5.9716 4.96967C6.26449 4.67678 6.73936 4.67678 7.03226 4.96967L9.62443 7.56184C10.0299 7.01947 10.3157 6.39252 10.363 5.69536C10.4296 4.71535 10.0151 3.75471 9.1308 2.87044C8.6313 2.37094 7.96866 2.0428 7.31594 1.82023C6.65577 1.59511 5.95164 1.45995 5.31894 1.37779C4.68355 1.29528 4.10195 1.26394 3.67998 1.25305C3.47239 1.24769 3.11241 1.2508 2.98427 1.25191L2.97713 1.25197C2.58416 1.26616 2.2681 1.58181 2.25391 1.97478Z"></path>
    <path d="M19.9091 3.85744C19.2379 3.45302 18.5018 3.23478 17.8314 3.24655C17.1722 3.25812 16.448 3.50713 16.0726 4.18582C15.7763 4.72148 15.8186 5.31862 16.0029 5.82184C16.058 5.97225 16.0833 6.11068 16.0819 6.22111C16.0806 6.32754 16.0557 6.38547 16.0322 6.41864L14.3454 8.79921C14.0514 9.21417 13.9044 9.42165 13.9882 9.58387C14.0721 9.74609 14.3264 9.74609 14.835 9.74609H18.8091C19.0029 9.74609 19.0998 9.74609 19.1754 9.69573C19.251 9.64537 19.2883 9.55591 19.3629 9.377L19.7011 8.56577C19.7178 8.52583 19.7506 8.48094 19.8265 8.4338C19.9078 8.38337 20.0252 8.33994 20.1698 8.31581C20.7015 8.22711 21.2341 7.95432 21.5341 7.41192C21.903 6.74506 21.75 5.99383 21.4405 5.41199C21.1227 4.81438 20.5811 4.26236 19.9091 3.85744Z"></path>`;

function makeIcon(pathContent) {
    return `        <div class="icon">\n          <svg viewBox="0 0 24 24" fill="currentColor">\n${pathContent}\n          </svg>\n        </div>`;
}

// Para efecto ruleta "spin down": el contenedor sube, vemos los elementos que están más ABAJO.
// Iniciamos en translateY(0) (index 0) y vamos hasta -392px (index 7).
// Por tanto, el último elemento (índice 7) es donde se frena y debe ser el deseado.
const col1Paths = [pathDroplet, pathMortar, pathLeaf, pathDroplet, pathMortar, pathLeaf, pathDroplet, pathLeaf];
const col3Paths = [pathLeaf, pathDroplet, pathMortar, pathLeaf, pathDroplet, pathMortar, pathDroplet, pathMortar];

// Para efecto ruleta "spin up": el contenedor baja, vemos los elementos que están más ARRIBA.
// Iniciamos en translateY(-392px) (viendo el último) y terminamos en 0 (viendo el primero).
// Entonces el PRIMER icono (index 0) debe ser el deseado.
const col2Paths = [pathDroplet, pathLeaf, pathMortar, pathDroplet, pathLeaf, pathMortar, pathLeaf, pathMortar];

const col1Html = `    <!-- COLUMNA 1: HOJA (leaf) -->\n    <div class="container">\n      <div class="carousel">\n${col1Paths.map(makeIcon).join('\n')}\n      </div>\n    </div>`;
const col2Html = `    <!-- COLUMNA 2: GOTA (droplet) -->\n    <div class="container">\n      <div class="carousel">\n${col2Paths.map(makeIcon).join('\n')}\n      </div>\n    </div>`;
const col3Html = `    <!-- COLUMNA 3: MORTERO (mortar) -->\n    <div class="container">\n      <div class="carousel">\n${col3Paths.map(makeIcon).join('\n')}\n      </div>\n    </div>`;

const newLoaderHtml = `<div class="loader">\n${col1Html}\n${col2Html}\n${col3Html}\n  </div>`;

let content = fs.readFileSync('carpeta_temporal_tablas/pantalla_carga/limpio.html', 'utf8');

// Reemplazar loader HTML
content = content.replace(/<div class="loader">[\\s\\S]*?<\\/div>\\s*<\\/body>/, newLoaderHtml + '\\n</body>');

// Reemplazar CSS keyframes
const newCss = `
  /* roll-down: desliza hacia arriba para revelar items inferiores */
  @keyframes roll-down {
    0%   { transform: translateY(0);    filter: blur(0);  }
    20%  { transform: translateY(20px); filter: blur(0); } /* Preparación / Tensión */
    60%  { transform: translateY(-392px); filter: blur(4px); } /* Giro veloz de 7 slots */
    85%  { transform: translateY(-392px); filter: blur(0);  } /* Frena exacto */
    100% { transform: translateY(-392px); filter: blur(0);  }
  }

  /* roll-up: desliza hacia abajo para revelar items superiores */
  @keyframes roll-up {
    0%   { transform: translateY(-392px); filter: blur(0);  }
    20%  { transform: translateY(-412px); filter: blur(0); } /* Preparación / Tensión */
    60%  { transform: translateY(0);      filter: blur(4px); } /* Giro veloz de 7 slots */
    85%  { transform: translateY(0);      filter: blur(0);  } /* Frena exacto */
    100% { transform: translateY(0);      filter: blur(0);  }
  }
</style>`;

content = content.replace(/@keyframes roll-down[\\s\\S]*?<\\/style>/, newCss);

fs.writeFileSync('carpeta_temporal_tablas/pantalla_carga/limpio.html', content);
console.log('Roulette generated!');
