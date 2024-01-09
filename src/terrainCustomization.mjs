// terrainCustomization.mjs

import { noise, plano } from './terrainGeneration.mjs'; // Importa noise e plano do módulo terrainGeneration.mjs

// Função para customizar o terreno
export function terrainCustomization() {
    noise.seed(Math.random()); // Randomiza a semente do ruído
    let fatorDeformacao = parseFloat(document.getElementById('controleDeformacao').value); // Valor do controle de deformação
    let amplitude = parseFloat(document.getElementById('amplitudeControl').value); // Valor do controle de amplitude

    plano.geometry.vertices.forEach((vertice, i) => { // Percorre os vértices do plano
        vertice.z = noise.simplex2(vertice.x / 10 * fatorDeformacao, vertice.y / 10 * fatorDeformacao) * amplitude; // Aplica deformação com ruído
    });

    plano.geometry.verticesNeedUpdate = true; // Atualiza vértices
    plano.geometry.computeVertexNormals(); // Recalcula normais dos vértices
}
