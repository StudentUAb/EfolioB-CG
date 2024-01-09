// main.js

// Importações
import { initScene, initCamera, initRenderer, animate} from './rendering.mjs';
import { uiControls, addKeyboardListeners } from './uiControls.mjs';
import { terrainGeneration, originalVertices } from './terrainGeneration.mjs';
import { terrainCustomization } from './terrainCustomization.mjs';
import { setupLights, skySphere } from './skySphere.mjs';
import { addOns } from './addOns.mjs';
import { createStars } from './rendering.mjs';

// main.js
//console.log(animatingSun);
//let originalVertices;

// Função init () - Inicializa a cena, a câmera e o renderizador
function init() {
    let cena = initScene(); // Inicializa a cena
    let camera = initCamera(); // Inicializa a câmera
    let renderer = initRenderer(); // Inicializa o renderizador
    //console.log("Renderer no init:", renderer); // No main.js após initRenderer()

    let plano = terrainGeneration(cena); // Gera o terreno
    terrainCustomization(); // Customiza o terreno
    let {sol, luzSol} = setupLights(cena); // Configura a luz do sol
    let lua = skySphere(cena); // Configura a lua
    createStars(cena); // Adiciona estrelas à cena
    uiControls(luzSol, sol, cena, camera, plano, originalVertices); // Configura os controles da UI
    addOns(); // Adiciona elementos extras
    
    animate(cena, camera, sol, luzSol, lua, plano, renderer); // Anima a cena
    addKeyboardListeners(cena, plano, originalVertices); // Adiciona listeners de teclado
}


// Chamada inicial
init();
