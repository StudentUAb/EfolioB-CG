// rendering.mjs

// Importar a biblioteca THREE.js e as funções necessárias
import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';
import { atualizarCeu, verificarEclipse } from './addOns.mjs';
import { animatingSun } from './uiControls.mjs';
import { updateLuaCamera } from './addOns.mjs';
import {isCameraLuaActive} from './uiControls.mjs';
import {distanciaSol} from './uiControls.mjs';

// Variáveis globais
let cena, camera, renderer, cameraLua, stars;
let anguloSol = 0;
let anguloLua = 0;

// Função de animação - Anima a cena
export function initScene() {
    cena = new THREE.Scene(); // Inicializa a cena
    cena.fog = new THREE.FogExp2(0x9dbcd4, 0.002); // Adiciona neblina
    cena.add(new THREE.AmbientLight(0x000055)); // Adiciona luz ambiente
    // Adicionando luz hemisférica
    var hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.1); // cor da luz do céu, cor da luz do solo, intensidade
    cena.add(hemisphereLight);

    return cena; // Retorna a cena
}

// Função de inicialização da cena  
export function initCamera() {
    camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000); // Inicializa a câmera
    camera.position.z = 30; // Posiciona a câmera no eixo z
    // Inicializar a câmera da lua
    cameraLua = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100); // Inicializa a câmera da lua
    return camera; // Retorna a câmera
}

// Função de inicialização do renderizador
export function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true }); // Inicializa o renderizador
    renderer.setSize(window.innerWidth, window.innerHeight); // Define o tamanho do renderizador
    renderer.shadowMap.enabled = true; // Habilita o mapeamento de sombras
    // Adicionando linha para suavizar as sombras
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Suaviza as sombras
    document.body.appendChild(renderer.domElement); // Adiciona o renderizador ao HTML
    return renderer; // Retorna o renderizador
}

// Função para criar estrelas
export function createStars(cena) { // Recebe a cena como parâmetro
    let geometry = new THREE.Geometry(); // Cria geometria para as estrelas

    for (let i = 0; i < 1000; i++) { // Loop para gerar 1000 estrelas
        let star = new THREE.Vector3(); // Cria um vetor para cada estrela
        star.x = THREE.Math.randFloatSpread(200); // Gera coordenada x aleatória entre -200 e 200
        star.y = THREE.Math.randFloatSpread(200); // Gera coordenada y aleatória entre -200 e 200
        star.z = THREE.Math.randFloatSpread(200); // Gera coordenada z aleatória entre -200 e 200

        geometry.vertices.push(star); // Adiciona a estrela à geometria
    }

    let material = new THREE.PointsMaterial({ color: 0x888888 }); // Cria material para as estrelas
    stars = new THREE.Points(geometry, material); // Criamos aqui objeto de pontos com a geometria e material

    cena.add(stars);
}

// Renderiza a cena e a câmera a cada frame
export function animate(cena, camera, sol, luzSol, lua, plano, renderer) { // recebe os parâmetros necessários
   // console.log("Renderer em animate:", renderer); // No início da função animate()
 
    // Verifica se todas as variáveis necessárias estão definidas
    if (animatingSun) { // Verifica se animatingSun está definido
        anguloSol -= 0.03; // Atualiza velocidade de rotação do sol
        let solX = Math.cos(anguloSol) * distanciaSol; // Calcula a posição x do sol
        let solZ = Math.sin(anguloSol) * distanciaSol; // Calcula a posição z do sol

        // Atualiza posições do sol e da luz solar
        if (sol.position && luzSol.position) { // Verifica se as posições estão definidas
            sol.position.set(solX, sol.position.y, solZ); // Atualiza a posição do sol
            luzSol.position.set(solX, sol.position.y, solZ); // Atualiza a posição da luz do sol
        }

        // Atualizações para a animação da lua
        anguloLua += 0.02; // Atualiza velocidade de rotação da lua
        if (lua.position && plano.position) { // Verifica se as posições estão definidas
            lua.position.x = 12 * Math.cos(anguloLua) + plano.position.x; // Atualiza a posição x da lua
            lua.position.z = 12 * Math.sin(anguloLua) + plano.position.z; // Atualiza a posição z da lua
        } 

        // Atualiza a posição da luz da lua
        updateLuaCamera(lua, cameraLua, plano, isCameraLuaActive); // Atualiza a posição da câmera da lua
        verificarEclipse(sol, lua, luzSol); // Verifica se há eclipse
        console.log(luzSol.intensity); // Log da intensidade da luz solar

        // Durante o eclipse, torna as estrelas visíveis
        if (luzSol.intensity <= 0.2) {
            stars.visible = true; // Torna as estrelas visíveis durante o eclipse
        } else {
            stars.visible = false; // Esconde as estrelas quando não há eclipse
        }

        atualizarCeu(cena, sol); // Atualiza o céu

        // Renderiza usando a câmera ativa
        let activeCamera = isCameraLuaActive ? cameraLua : camera; // Define a câmera ativa
        renderer.render(cena, activeCamera); // Renderiza a cena usando a câmera ativa
    }

    // Chamada recursiva com todas as variáveis
    requestAnimationFrame(() => animate(cena, camera, sol, luzSol, lua, plano, renderer)); // Chama a função animate() recursivamente
}

// function renderizar(cena, camera, sol, luzSol, lua, plano, renderer) {
//     cena=cena;
//     camera=camera;
//     sol=sol;
//     luzSol=luzSol;
//     lua=lua;
//     plano=plano;
//     renderer=renderer;
// }