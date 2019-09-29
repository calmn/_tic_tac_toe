var ficha_elegida;
var btnCruz = document.querySelector("#btnCruz");
var btnCirculo = document.querySelector("#btnCirculo");
btnCirculo.addEventListener('click', () => {
    btnCirculo.style.border = '2px solid rgb(218, 148, 148)';
    btnCruz.style.border = 'none';
    ficha_elegida = 'circulo';
})
btnCruz.addEventListener('click', () => {
    btnCruz.style.border = '2px solid rgb(218, 148, 148)';
    btnCirculo.style.border = 'none';
    ficha_elegida = 'cruz';
})
var btnInicia = document.querySelector("#btnInicia");
btnInicia.addEventListener('click', () => {
    console.log(ficha_elegida);
    document.querySelector("#opciones").style.display = 'none';
    document.querySelector("#panel-juego").style.display = 'block';
})

/* Aquí */
const tablero = [
    0,0,0,
    0,0,0,
    0,0,0
]
const ficha_jug = 1;
const ficha_ia = 2;
var btnsTablero = document.querySelectorAll("#tablero button");
btnsTablero.forEach((boton,idx) => {
    boton.addEventListener('click',() => {
        boton.style.backgroundImage = `url('img/${ficha_elegida}.png')`;
        console.log(idx);
        tablero[idx] = ficha_jug;
        validarVictoria(ficha_jug);
    })
})
function validarVictoria(ficha_id) {
    const movsGanadores = [
        {pini : 0, pmed: 1, pfin: 2},
        {pini : 0, pmed: 4, pfin: 8},
        {pini : 0, pmed: 3, pfin: 6},        
        {pini : 1, pmed: 4, pfin: 7},
        {pini : 2, pmed: 4, pfin: 6},
        {pini : 2, pmed: 5, pfin: 8},
        {pini : 3, pmed: 4, pfin: 5},
        {pini : 6, pmed: 7, pfin: 8},
    ]
    movsGanadores.forEach(fila=>{
        if(
            tablero[fila.pini] == ficha_id && tablero[fila.pmed] == ficha_id && tablero[fila.pfin] == ficha_id
        ) 
        {
            console.log("victoria" + ficha_id);
        }
    })
}