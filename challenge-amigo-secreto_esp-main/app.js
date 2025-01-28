const amigos = []; 

// Elementos DOM
const listaAmigos = document.getElementById("listaAmigos");
const botonSorteo = document.querySelector(".button-draw");

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    // Verificar si el nombre está vacío
    if (!nombre) {
        mostrarMensaje("Por favor, ingresa un nombre válido.", "alert-warning");
        return;
    }

    // Verificar si el nombre contiene solo letras y espacios
    const nombreValido = /^[A-Za-z\s]+$/;
    if (!nombreValido.test(nombre)) {
        mostrarMensaje("El nombre solo puede contener letras y espacios.", "alert-warning");
        input.value = "";
        return;
    }

    // Verificar si el nombre ya existe
    if (amigos.includes(nombre)) {
        mostrarMensaje("Este nombre ya está en la lista.", "alert-warning");
        input.value = "";
        return;
    }

    amigos.push(nombre);
    input.value = "";
    actualizarListaAmigos();
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarListaAmigos();
}

function sortearAmigo() {
    if (amigos.length < 2 || amigos.length % 2 !== 0) {
        mostrarMensaje("El número de amigos debe ser par y mayor o igual a 2 para realizar el sorteo.", "alert-danger");
        return;
    }

    const resultado = realizarSorteo([...amigos]);
    mostrarResultado(resultado);
    botonSorteo.textContent = "Limpiar lista";
    botonSorteo.onclick = limpiarLista;
}

function limpiarLista() {
    amigos.length = 0;
    actualizarListaAmigos();
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    mostrarMensaje("Lista limpiada. Ingresa nuevos amigos para iniciar un nuevo sorteo.", "alert-success");
    botonSorteo.textContent = "Sortear amigo";
    botonSorteo.onclick = sortearAmigo;
}

function realizarSorteo(amigos) {
    const resultado = [];

    while (amigos.length > 0) {
        const giverIndex = Math.floor(Math.random() * amigos.length);
        const giver = amigos.splice(giverIndex, 1)[0];

        const receiverIndex = Math.floor(Math.random() * amigos.length);
        const receiver = amigos.splice(receiverIndex, 1)[0];

        resultado.push(`${giver} ---> ${receiver}`);
    }

    return resultado;
}

function actualizarListaAmigos() {
    listaAmigos.innerHTML = "";

    amigos.forEach((amigo, index) => {
        const li = document.createElement("li");
        li.classList.add("name-item");
        li.textContent = amigo;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "×";
        botonEliminar.classList.add("button-remove");
        botonEliminar.onclick = () => eliminarAmigo(index);

        li.appendChild(botonEliminar);
        listaAmigos.appendChild(li);
    });
}

function mostrarResultado(resultado) {
    const resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";

    resultado.forEach((linea) => {
        const li = document.createElement("li");
        li.classList.add("result-item");
        li.textContent = linea;
        resultadoLista.appendChild(li);
    });
}

function mostrarMensaje(mensaje, clase) {
    const alert = document.createElement("div");
    alert.textContent = mensaje;
    alert.className = `alert-message ${clase}`;

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Agregar un evento para que el enter funcione como clic en el botón
const inputAmigo = document.getElementById("amigo");
inputAmigo.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        agregarAmigo(); // Llama a la función de agregar amigo cuando se presiona Enter
    }
});
