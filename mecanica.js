var nombre_ID = document.getElementById('nombre');
var velocidad_ID = document.getElementById('velocidad');
var masa_ID = document.getElementById('masa');
var segundos_ID = document.getElementById('segundos');
var fricción_ID = document.getElementById('fricción');


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
var vectorX_suma = 0;
var vectorY_suma = 0;

let fuerza = document.querySelector('inputF');
let angulo = document.querySelector('inputA');
var i = 0;
function datos_fuerza() {
    fuerza1 = parseFloat(fuerza1_objet.fuerza1_ID.value);
    fuerza2 = parseFloat(fuerza2_objet.fuerza2_ID.value);
    fuerza3 = parseFloat(fuerza3_objet.fuerza3_ID.value);
    angulo1 = parseFloat(fuerza1_objet.angulo1_ID.value);
    angulo2 = parseFloat(fuerza2_objet.angulo2_ID.value);
    angulo3 = parseFloat(fuerza3_objet.angulo3_ID.value);
    
    fuerzas = [fuerza1, fuerza2, fuerza3];
    angulos = [angulo1, angulo2, angulo3];
    i = 0
    while (i < 3) {
        var vector_x = Vx(fuerzas[i], angulos[i]);
        vectores_x.push(parseFloat(vector_x));
        var vector_y = Vy(fuerzas[i], angulos[i]);
        vectores_y.push(parseFloat(vector_y));
        i++;
    }
    vectorX_suma = 0;
    vectorY_suma = 0;
    
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


    fuerza_final = Math.sqrt((Math.pow(vectorX_suma, 2) + Math.pow(vectorY_suma, 2)));
    angulo_final= Math.atan(vectorY_suma / vectorX_suma) * (180/Math.PI);

    angulo.textContent =  angulo_final.toFixed(6) + "°";
    fuerza.textContent = fuerza_final.toFixed(3) + "N";
}


let dataset, metros_data, velocidad_data, peso, fricción;
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
    fricción = parseInt(fricción_ID.value);
    masa = parseInt(masa_ID.value);
    if (masa == NaN) {
        masa = 1;
    } else {
        masa = masa;
    }
    peso = masa * 9.8;

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
        velocidad = (velocidad * 2)- fricción;
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

// var metros = [];
// var segundos = [];

// var suma_metros = 0;
// var suma_segundos = 0;
// metros.forEach(function(numero) {
//     suma_metros += numero;
//     return suma_metros;
// });
// segundos.forEach(function(numero) {
//     suma_segundos += numero;
//     return suma_segundos;
// });
// var promedio_metros = suma_metros / suma_segundos;
// console.log(segundos + " = " + suma_segundos + "s " + "y " + metros + " = " + suma_metros + "m"+ " y " + suma_metros + "m / " + suma_segundos + "s es igual a " + promedio_metros + "msP");


// var metros = [5, 10, 7.5, 5, 5, 0, -3, 0];
// var segundos = [1, 2, 3, 4,5,6, 7, 8];

// function metros_segundos(m, s) {
//     var metros_por_segundo = m / s;
//     return metros_por_segundo;
// }
// var metros_por_segundo_array = [];

// function newFunction() {
//     i = 0;
//     while (i <= 7) {
//         var metros_por_segundo = metros_segundos(metros[i], segundos[i]);
//         metros_por_segundo_array.push(metros_por_segundo);
//         i++;
//     }
//     dataset = {
//         labels: segundos,
//         datasets: [
//             {
//                 label: "metros por segundo",
//                 fill: false,
//                 backgroundColor: "Scooter",
//                 borderColor: "#2648a8",
//                 data: metros_por_segundo_array
//             },
//         ]
//     };
//     grafica();
// }
    