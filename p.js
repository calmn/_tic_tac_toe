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
    document.querySelector("#opciones").style.display = 'none';
    document.querySelector("#panel-juego").style.display = 'block';
    elegirJugadorInicia();
})
/* Aquí */
const tablero = [
    0,0,0,
    0,0,0,
    0,0,0
]
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
const ficha_jug = 1;
const ficha_ia = 2;
const btnsTablero = document.querySelectorAll("#tablero button");
function imprimirMensaje(mensaje) {
    var parrafo = document.querySelector("#msj-inicia");
    parrafo.textContent = mensaje;
}
function elegirJugadorInicia() { 
    inicializarEventoBotones();   
    if(Math.floor(Math.random() * 2) == 0) {
        imprimirMensaje("Es tu turno");
    } else {
        imprimirMensaje("Buscando mejor tiro bi bop bi bop...");
        buscarMejorPosicion();
    }
}
function turnosTirados(arreglo) {
    /* Verifica el número de turnos que se han jugado */
    var arre = arreglo.reduce((arre, reg, idx) => {
        if(reg != 0) arre.push(idx);
        return arre;
    },[])
    return (arre === undefined) ? 0 : arre.length;
}
function estaDisponible(posicion) {
    /* Verifica si la posicion recibida está ocupada por una ficha */
    return tablero[posicion] == 0;
}
function obtenerPosicionesDisponibles(arreglo) {
    /* Retorna un arreglo con todas las posiciones libres */
    var arre = arreglo.reduce( (arre,reg,idx) => {
        if(reg === 0) arre.push(idx);
        return arre;
    },[])
    return arre;
}
function inicializarEventoBotones() {
    btnsTablero.forEach((boton,idx) => {
        boton.addEventListener('click',() => {
            if(turnosTirados(tablero) < 9) {
                boton.style.backgroundImage = `url('img/${ficha_elegida}.png')`;
                tablero[idx] = ficha_jug;
                validarVictoria(ficha_jug);
                btnsTablero.forEach(btn => btn.disabled = true)
                setTimeout(buscarMejorPosicion,1000); 
                imprimirMensaje("Buscando mejor tiro bi bop bi bop...");
            }      
        })
    })
}
function validarVictoria(ficha) {
    /* Verificar si uno de los participantes ha hecho un cruce ganador */
    movsGanadores.forEach(fila=>{
        if(tablero[fila.pini] == ficha && tablero[fila.pmed] == ficha && tablero[fila.pfin] == ficha) 
        {
            imprimirMensaje((ficha == ficha_jug) ? "He ganado" : "Haz ganado" );
        }
    })
}
function buscarMejorPosicion() {
    if(turnosTirados(tablero) < 9) {
        var arreglo = (tiroOfensivo().length > 0) ? tiroOfensivo() : tiroDefensivo();
        console.log("Arreglo de tiro defensivo: " + arreglo);        
        if(arreglo.length == 0) arreglo = obtenerPosicionesDisponibles(tablero);
        console.log("Arreglo obtenido de posibles tiros:" + arreglo);
        var x = Math.floor(Math.random() * arreglo.length);        
        tiro = (arreglo.includes(4)) ? 4 : arreglo[x];  //areglar, analizar casos para el uso del centro
        tablero[tiro] = ficha_ia;   
        console.log("Tiro(posición) elegido:" + tiro);
        btnsTablero[tiro].style.backgroundImage = `url('img/${(ficha_elegida === 'circulo') ? 'cruz' : 'circulo'}.png')`;
        validarVictoria(ficha_ia);
        activarBotonesDisponibles();
        imprimirMensaje("Es tu turno");
    }    
}
const posicionesDeTiroGanador = (ficha) => {
    var arreglo = movsGanadores.reduce((arre, reg, idx) => {  
        var tiro;      
        if( tablero[reg.pini] == ficha && tablero[reg.pmed] == ficha && tablero[reg.pfin] != ficha)
            tiro = reg.pfin;
        if( tablero[reg.pini] == ficha && tablero[reg.pmed] != ficha && tablero[reg.pfin] == ficha)  
            tiro = reg.pmed;
        if( tablero[reg.pini] != ficha && tablero[reg.pmed] == ficha && tablero[reg.pfin] == ficha)  
            tiro = reg.pini;
        if(estaDisponible(tiro))
            arre.push(tiro);        
        return arre;
    },[])
    return arreglo;
}
const tiroDefensivo = () => {
    console.log("Defensa");
    return posicionesDeTiroGanador(ficha_jug);
}
const tiroOfensivo = () => {
    console.log("Ofensa");
    return posicionesDeTiroGanador(ficha_ia);
}
function obtenerTirosFicha(ficha) {
    var arreglo = tablero.reduce((arre, reg, idx) => {
        if(tablero[idx] == ficha)
            arre.push(idx);
        return arre;
    },[])
    return arreglo;
}
function activarBotonesDisponibles() {
    tablero.forEach((pos,idx)=>{
        if(pos == 0)   btnsTablero[idx].disabled = false;
    })
}