//skySphere.mjs

import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js'; // 

// Função para atualizar o céu 
export function setupLights(cena) {
    let luzSol = new THREE.DirectionalLight(0xffff00, 1.0); // Luz direcional para simular o sol
    luzSol.position.set(50, 100, 100); // Posição elevada e inclinada

    // let luzSol = new THREE.PointLight(0xffcc77, 1.5, 500); // Cria luz do sol tipo lampada
    luzSol.castShadow = true; //  Habilita sombras da luz solar
    cena.add(luzSol); // Adiciona a luz à cena
   // Carregar a textura do sol
   let textureLoader = new THREE.TextureLoader();
   let textureSol = textureLoader.load('./assets/sol.jpg'); // Textura do Sol

    // Cria o sol e as suas propieidades
    let geometriaSol = new THREE.SphereGeometry(0.5, 16, 16); // Criamos geometria do sol
    let materialSol = new THREE.MeshBasicMaterial({ map: textureSol, emissive: 0xffff00 });// Criamos material do sol usando MeshBasicMaterial com textura e emissividade
    let sol = new THREE.Mesh(geometriaSol, materialSol); // Criamos mesh do sol
    sol.castShadow = true; // Lança sombras
    // Ajustando resolução do mapa de sombra para a luz do sol
    luzSol.shadow.mapSize.width = 2048; // Valores maiores resultam em sombras mais detalhadas
    luzSol.shadow.mapSize.height = 2048; // Valores maiores resultam em sombras mais detalhadas

    cena.add(sol); // Adiciona o sol à cena
    return {sol, luzSol}; // Retorna sol e luz do sol
}

// Cria esfera para representa a lua e adiciona a cena
export function skySphere(cena) {
    let geometriaLua = new THREE.SphereGeometry(0.5, 32, 32); // Criamos geometria da lua usando SphereGeometry como no sol
    // Carregar a textura da lua
    let textureLoader = new THREE.TextureLoader();// Reutilizamos o loader de texturas definido acima
    let textureLua = textureLoader.load('./assets/lua.jpg'); // Textura da lua

    let materialLua = new THREE.MeshBasicMaterial({ map: textureLua }); //Criamos material da lua usando MeshBasicMaterial como no sol
    let lua = new THREE.Mesh(geometriaLua, materialLua); // Criamos mesh da lua usando Mesh como no sol
    lua.castShadow = true; // Lança sombras
    lua.receiveShadow = true; // Recebe sombras
    lua.position.set(5, 0, 5); // Posiciona a lua
    cena.add(lua); // Adiciona a lua à cena
    return lua; // Retorna a lua
}

