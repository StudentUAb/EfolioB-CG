// terrainCustomization.mjs

// Importa funções
import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js'; // Importa biblioteca ThreeJs
import { Noise } from 'https://cdn.skypack.dev/noisejs'; // Importa biblioteca NoiseJs para gerar ruído

// Exportamos plano e originalVertices para que eles possam ser usados em outros módulos e NoiseJs
export let plano, originalVertices; // Variáveis globais
export const noise = new Noise(Math.random()); // Instância de NoiseJs com seed aleatório

// Função para gerar terreno aleatório
export function terrainGeneration(cena) {
    // Cria um plano com geometria e material definidos acima
    // MeshPhongMaterial simula superfícies brilhantes como metal
    // let geometriaPlano = new THREE.PlaneGeometry(20, 10, 100, 100); // Geometria plana com 500x500 quadrados com 200x200 fica mais rapido a geraçao do terreno, mas assim fica mais nitido
    // // Cria o mesh com geometria e material definidos acima
    // let materialPlano = new THREE.MeshPhysicalMaterial({ // Utilizamos MeshPhysicalMaterial para melhor realismo do terreno
    //     color: 0x33ff33, // Cor do terreno
    //    // specular: 0x773300, // Cor do brilho
    //     side: THREE.DoubleSide, // Renderiza ambos lados do plano
    //     flatShading: true, // Sombreamento plano para contornos mais definidos
    //    // shininess: 3 // Brilho do terreno
    // });

    // Utilizamos  MeshPhongMaterial, MeshLamberMaterial, 
    // para testar superficies com mais brilho ou mate simulando metal, 
    // é so ALTERAR a funçao anterior e colcar uma destas, exemplos abaixo:

    // // MeshPhongMaterial para um terreno mais brilhante
    // let geometriaPlano = new THREE.PlaneGeometry(20, 10, 100, 100);
    // let materialPlano = new THREE.MeshPhongMaterial({
    //     color: 0x33ff33,
    //     specular: 0x773300,
    //     side: THREE.DoubleSide,
    //     flatShading: true,
    //     shininess: 3 // Brilho
    // });

    // MeshLamberMaterial para um terreno mais mate
        let geometriaPlano = new THREE.PlaneGeometry(20, 10, 200, 200);
        let materialPlano = new THREE.MeshLambertMaterial({
            color: 0x33ff33,
            side: THREE.DoubleSide,
            flatShading: true,
        });

    // Adiciona ruído ao terreno
    plano = new THREE.Mesh(geometriaPlano, materialPlano); // Cria o mesh com geometria e material definidos acima
    plano.receiveShadow = true; // recebe sombras
    //plano.castShadow = true; // projeta sombras
    plano.rotation.x = -Math.PI / 3.5; // inclina o terreno
    cena.add(plano); // Adiciona o plano à cena

    // Atualiza a variável exportada originalVertices
    originalVertices = plano.geometry.vertices.map(v => v.clone()); // Clona os vértices originais
    //console.log("Original Vertices no terreno:", originalVertices);

    return plano; // Retorna o mesh do plano para ser usado em outros módulos
}
