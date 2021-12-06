var nombre_ID = document.getElementById('nombre');
var velocidad_ID = document.getElementById('velocidad');
var masa_ID = document.getElementById('masa');
var segundos_ID = document.getElementById('segundos');


let fuerza1_objet = {
    fuerza1_ID: document.getElementById('Fuerza1'),
    angulo1_ID: document.getElementById('Angulo1'),
    fuerza1,
    angulo1
}
let fuerza2_objet = {
    fuerza2_ID: document.getElementById('Fuerza2'),
    angulo2_ID: document.getElementById('Angulo2'),
    fuerza2,
    angulo2
}
let fuerza3_objet = {
    fuerza3_ID: document.getElementById('Fuerza3'),
    angulo3_ID: document.getElementById('Angulo3'),
    fuerza3,
    angulo3
}

function Vx(N,A) {
    var radianes = A * (Math.PI / 180);
    var VectorX = N * Math.cos(radianes);
    return VectorX.toFixed(3);
}
function Vy(N,A) {
    var radianes = A * (Math.PI / 180);
    var VectorY = N * Math.sin(radianes);
    return VectorY.toFixed(3);
}

var fuerza1, fuerza2, fuerza3, angulo1, angulo2, angulo3, fuerzas, angulos, fuerza_final, angulo_final;
let vectores_y = [];
let vectores_x= [];
let fuerza = document.querySelector('inputF');
let angulo = document.querySelector('inputA');
var i = 0;
function datos_fuerza() {
    fuerza1 = parseInt(fuerza1_objet.fuerza1_ID.value);
    fuerza2 = parseInt(fuerza2_objet.fuerza2_ID.value);
    fuerza3 = parseInt(fuerza3_objet.fuerza3_ID.value);
    angulo1 = parseInt(fuerza1_objet.angulo1_ID.value);
    angulo2 = parseInt(fuerza2_objet.angulo2_ID.value);
    angulo3 = parseInt(fuerza3_objet.angulo3_ID.value);
    
    fuerzas = [fuerza1, fuerza2, fuerza3];
    angulos = [angulo1, angulo2, angulo3];
    i = 0
    while (i < 3) {
        var vector_x = Vx(fuerzas[i], angulos[i]);
        vectores_x.push(parseInt(vector_x));
        var vector_y = Vy(fuerzas[i], angulos[i]);
        vectores_y.push(parseInt(vector_y));
        i++;
    }

    var vectorX_suma = 0;
    var vectorY_suma = 0;
    vectores_x.forEach(function(numero) {
        console.log(numero);
        vectorX_suma += numero;
        console.log(vectorX_suma);
        return vectorX_suma;
    });
    vectores_y.forEach(function(numero) {
        vectorY_suma += numero;
        return vectorY_suma;
    });


    fuerza_final = Math.sqrt((Math.pow(vectorX_suma, 2) + Math.pow(vectorY_suma, 2)))+1;
    angulo_final= (vectorY_suma/vectorX_suma) / (Math.PI * 180);

    angulo.textContent =  angulo_final.toFixed(6) + "°";
    fuerza.textContent = fuerza_final.toFixed(3) + "N";
}


let dataset, metros_data, velocidad_data;
var metros = 0;
var Temp = 0;
var tiempo; 
class particula {
    constructor(nombre) {
        this.name = nombre;
        this.distancia = [];
        this.MPS = [];
    }
}
function datos_grafica() {
    masa = parseInt(masa_ID.value);
    if (masa == NaN) {
        masa = 1;
    } else {
        masa = masa;
    }
    tiempo = [1];
    nombre = nombre_ID.value;
    sujeto = new particula(nombre);
    velocidad = parseInt(velocidad_ID.value);
    aceleración = fuerza_final/ masa;
    aceleración = Math.round(aceleración);
    segundos = parseInt(segundos_ID.value);
    sujeto.MPS.push(velocidad)
    sujeto.distancia.push(velocidad)
    i = 2;
    Math.round(aceleración);
    while (i <= segundos) {
        velocidad = velocidad + aceleración;
        console.log(velocidad);
        sujeto.MPS.push(velocidad);
        metros += velocidad;
        sujeto.distancia.push(metros);
        if (i == 2) {
            Temp += 2;
        } else {
            Temp += 1;
        }
        tiempo.push(Temp);
        console.log(i);
        i++;      
    }

    metros_data = sujeto.distancia;
    velocidad_data = sujeto.MPS
    dataset = {
        labels: tiempo,
        datasets: [
            {
                label: "metros",
                fill: false,
                backgroundColor: "Scooter",
                borderColor: "#2648a8",
                data: metros_data
            },{
                label: 'velocidad',
                fill: false,
                backgroundColor: "Scooter",
                borderColor: "Scooter",
                data: velocidad_data,
            }
        ]
    }  
}

const ctx = document.getElementById('canva_metros');
function grafica() {
    const myChart = new Chart(ctx, {
        type: 'line',
        data:
            dataset,
        options: {
            responsive: true,
            plugins: {
                legend: true,
                title: {
                    display: true,
                    text: 'La carrera'
                },
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    // min: 0,
                    // max: 1000,
                    display: true,
                    title: {
                        display: true,
                        text: 'segundos',
                        type: 'linear'
                    }
                },
                y: {
                    // min: 0,
                    // max: 1000,
                    display: true,
                    title: {
                        display: true,
                        text: 'metros',
                        type: 'linear'
                    }
                }
            }
        }
    });
}
function operaciones() {
    datos_grafica();
    grafica();
}

// function MetrosPSP() {
//     i = 0;
//     while (i <= segundos.length-1) {
//         MPSP = metros[i] / segundos[i];
//         metros_Por_segundo.push(MPSP);
//         i++;
//     }        
// }