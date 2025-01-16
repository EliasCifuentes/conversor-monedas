const valor = document.getElementById("monto"); // Input de cantidad
const tipo = document.getElementById("seleccionar"); // Select de tipo de moneda
const respuesta = document.getElementById("respuesta"); // Párrafo para mostrar resultado

// Función para obtener datos de la API
const getApi = async (url) => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
    }
};

// Función para renderizar el resultado
const renderDom = (data) => {
    let conversion = 0;
    let resultado = 0;

    const cantidad = parseFloat(valor.value); // Valor ingresado en el input

    if (isNaN(cantidad) || cantidad <= 0) {
        respuesta.textContent = "Por favor, ingrese una cantidad válida.";
        return;
    }

    // Verificar el tipo de moneda seleccionada
    if (tipo.value === "dolar") {
        conversion = data.dolar.valor; // Valor del dólar desde la API
    } else if (tipo.value === "uf") {
        conversion = data.uf.valor; // Valor de la UF desde la API
    } else {
        respuesta.textContent = "Seleccione una moneda válida.";
        return;
    }

    // Realizar la conversión
    resultado = (cantidad / conversion).toFixed(2);
    respuesta.textContent = `El resultado es: ${resultado} (${tipo.value.toUpperCase()})`;
};

// Función principal
const main = async () => {
    const api = await getApi("https://mindicador.cl/api");
    if (api) {
        renderDom(api);
    }
};

// Llamada al evento
document.getElementById("buscar").addEventListener("click", main);


