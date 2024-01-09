// addOns.mjs

import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js'; // 


export function addOns() {
    // ... Podemos criar funções ou configurações extras aqui
}

// Função para verificar eclipse
export function verificarEclipse(sol, lua, luzSol) {
    if (Math.abs(lua.position.x - sol.position.x) < 1 && Math.abs(lua.position.z - sol.position.z) < 1) { // Verifica distância entre sol e lua
        luzSol.intensity = 0.2; // Diminui intensidade da luz do sol em caso de eclipse
    } else {
        luzSol.intensity = 1.5; // Retorna intensidade normal da luz do sol caso não haja eclipse
    }
}

// Função para atualizar o céu 
export function atualizarCeu(cena, sol) {
    let corCeu = new THREE.Color(); // Cria instância de cor
    let intensidade = Math.max(0, Math.min(1, (sol.position.y + 5) / 15)); // Calculamos intensidade da cor do céu baseado na posição do sol
    corCeu.setHSL(0.6, 1, 0.6 * intensidade); // Definimos a cor do céu com base na intensidade
    cena.background = corCeu; // Atualizamos o background da cena
    return corCeu; // Retornamos a cor atualizada
}

// Função para atualizar a posição e orientação da câmera da lua
export function updateLuaCamera(lua,cameraLua,plano, isCameraLuaActive) { // Recebe como parâmetro a lua, câmera da lua, plano e flag de ativação da câmera
    if (isCameraLuaActive && lua) {
        // Atualiza a posição da câmera 
        cameraLua.position.set(lua.position.x, lua.position.y + 0.5, lua.position.z); // Posiciona a câmera acima da lua
        cameraLua.lookAt(plano.position); // A câmera da lua esta fixa, sempre olhar para a terra
    }
}

