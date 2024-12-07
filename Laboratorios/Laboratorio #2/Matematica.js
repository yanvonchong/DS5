var num1 = 10;
var num2 = 5;

var suma = num1 + num2;
var resta = num1 - num2;
var multiplicacion = num1 * num2;
var division = num1 / num2;

console.log("Suma: " + suma);             
console.log("Resta: " + resta);           
console.log("Multiplicación: " + multiplicacion); 
console.log("División: " + division);     

let name2 = "YAN";
let lastname = "VON CHONG";
const dato = name2 + " " + lastname;
console.log(dato);

const miObjeto = {
    numero: 22,
    texto: "Te Extraño Ace",
    esVerdadero: true,
    objetoVacio: {}
};

console.log(miObjeto);

function sumaMultiplos3y5(numero) {
    let suma = 0;
    for (let i = 1; i < numero; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            suma += i;
        }
    }
    return suma;
}

