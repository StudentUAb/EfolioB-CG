// terrainGeration.mjs

import { Noise } from 'https://cdn.skypack.dev/noisejs';
let noise = new Noise(Math.random());
import { terrainCustomization } from './terrainCustomization.mjs';

export let isCameraLuaActive = false; // Controle par
export let distanciaSol = 12; // Definindo distanciaSol

// Exporta aniamação do sol
export let animatingSun = true; // Controle para animação do sol

// Função para animar o sol
export function uiControls(luzSol, sol, cena, camera, plano, originalVertices) {
    // Adiciona listeners para os controles de deformação e amplitude do terreno
    document.getElementById('controleDeformacao').addEventListener('input', function() {
        terrainCustomization(); // Chame a função de atualização de terreno
    });
    // Adiciona listener para atualizar o valor exibido no controle de deformação
    document.getElementById('amplitudeControl').addEventListener('input', function() {
        terrainCustomization(); // Chame a função de atualização de terreno
    });

    // Listener para a órbita do sol
    document.getElementById('orbitaSolControl').addEventListener('input', function() {
        distanciaSol = parseFloat(this.value); // Atualiza a distância do sol com o valor do controle
       // console.log(distanciaSol)
       // console.log(this.value)
        // A atualização da órbita do sol é manipulada na função de animação
    });
    
    // Adiciona listener para atualizar o valor exibido no cor do teerreno
    document.getElementById('colorControl').addEventListener('input', function() {
        plano.material.color.set(this.value); // Atualiza a cor do terreno diretamente
        document.getElementById('colorDisplay').style.backgroundColor = this.value; // Atualiza a cor exibida no controle
    });

    // Listener para a altura do sol
    document.getElementById('alturaSolControl').addEventListener('input', function() {
        sol.position.y = parseFloat(this.value); // Atualiza a altura do sol
        luzSol.position.y = parseFloat(this.value); // Atualiza a altura do sol e da luz solar
    });

    // Listener para a densidade da neblina
document.getElementById('fogDensityControl').addEventListener('input', function() {
    if (cena && cena.fog) {
        cena.fog.density = parseFloat(this.value); // Use o valor atual do slider
    } else {
       // console.error("Não é possível alterar a densidade da neblina porque cena ou fog está indefinido");
    }
});

    // Listener para a visão da câmera
    document.getElementById('cameraViewControl').addEventListener('input', function() {
        camera.position.z = parseFloat(this.value); // Atualiza a posição da câmera com o valor do slider
    });

}

// Reset a densidade da neblina e posição da câmera ao recarregar a página (ou seja, ao redefinir)
export function addKeyboardListeners(cena, plano, originalVertices) {
    window.addEventListener('keydown', function(e) {
        if (e.key === 'a' || e.key === 'A') {
            noise.seed(Math.random()); // Reinicia o seed do ruído
            terrainCustomization(); // Recria o terreno com novo ruído
        } else if (e.key === 'r' || e.key === 'R') {
            // console.log("Pre-reset:");
            // console.log("Cena:", cena);
            // console.log("Cena Fog:", cena ? cena.fog : "cena is undefined");
            // console.log("Original Vertices:", originalVertices);

            // Reset terreno ao original
            if (originalVertices && plano && plano.geometry) {
                for (var i = 0; i < originalVertices.length; i++) {// Reset dos vertices do terreno ao original
                    plano.geometry.vertices[i].copy(originalVertices[i]); // Copia os vertices originais de volta para o geometry do terreno
                }
                plano.geometry.verticesNeedUpdate = true; // Atualiza os vertices
                plano.geometry.computeVertexNormals(); // Recalcula as normais dos vertices
            }
            
            // Reset controles de terreno 
            let fogDensityControl = document.getElementById('fogDensityControl'); // Controle de densidade da neblina
            if (fogDensityControl) { // Verifica se foi encontrado
                fogDensityControl.value = 0.002; // Reset a o valor do slider
                if (cena && cena.fog) {
                    cena.fog.density = 0.002; // Reset a densidade da neblina para 0.002
                } else {
                    console.error("Não é possível redefinir a densidade da neblina porque cena ou fog está indefinido");
                }
            } else {
                console.error("fogDensityControl não encontrado");
            }
            
        } else if (e.key === 's' || e.key === 'S') {
            if (animatingSun){
               
              animatingSun = !animatingSun; // Inverte o valor de animatingSun
              
              //console.log('Sun animation stopped');
            } else {
             
             animatingSun = !animatingSun; // Inverte o valor de animatingSun
             //console.log('Sun animation started');
            }  
         
        }
        else if (e.key === 'c' || e.key === 'C') {
            isCameraLuaActive = !isCameraLuaActive; // Alterna entre câmera principal e câmera da lua
        }
    });
}
