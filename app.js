const menu = document.getElementById('menu');
//document.getElementaById hace referencia a un objeto especificado con un ID que se encuentra en otro documento
const indicador = document.getElementById('indicador');
const secciones = document.querySelectorAll('.seccion');
//document.querySelector es para salectores
//los selectores es una cadena que contiene uno o mas elementos css separados por una coma
let tamañoIndicador = menu.querySelector('a').offsetWidth;
indicador.style.width = tamañoIndicador + 'px';

let indexSeccionActiva;

// Observer
const observer = new IntersectionObserver((entradas, observer) => {
	entradas.forEach(entrada => {
		//if evaluara la condicion, es decir va a posicionar el indicador (nav.indicador)
		if(entrada.isIntersecting){
			// Obtener cual es la seccion que esta entrando en pantalla
			// console.log(`La entrada ${entrada.target.id} esta intersectando`);

			// Crear arreglo con las secciones y luego obtener el index del la seccion que esta en pantall
			indexSeccionActiva = [...secciones].indexOf(entrada.target);
			//Indicador va a cambiar su tamaño dependiendo del texto en el nombre de la seccion
			indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
		}
	});
}, {
	//La coma que es del document.querySelector en INDICADOR
	rootMargin: '-80px 0px 0px 0px',
	threshold: 0.2
});

// Agregamos un observador para el hero
observer.observe(document.getElementById('hero'));

// Asignar un observador a cada seccion
secciones.forEach(seccion => observer.observe(seccion));

// Evento para cuando la pantalla cambie de tamaño
const onResize = () => {
	// Calcular el nuevo tamaño que deberia tener el indicador
	tamañoIndicador = menu.querySelector('a').offsetWidth;

	// Cambiar el tamaño del indicador
	indicador.style.width = `${tamañoIndicador}px`;

	// Volver a posicionar el indicador
	indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
}

window.addEventListener('resize', onResize);