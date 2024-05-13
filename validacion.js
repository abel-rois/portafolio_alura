const formulario = document.getElementById('formularioContacto');
const errorNombre = document.getElementById('errorNombre');
const errorEmail = document.getElementById('errorEmail');
const errorAsunto = document.getElementById('errorAsunto');
const errorMensaje = document.getElementById('errorMensaje');

formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    let valido = true;

    // Validación de nombre
    if (nombre === '' || nombre.length > 50) {
        errorNombre.textContent = 'El nombre es obligatorio y no debe tener más de 50 caracteres.';
        errorNombre.classList.add('error');
        valido = false;
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error');
    }

    // Validación de email
    if (email === '' || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errorEmail.textContent = 'El correo electrónico es obligatorio y debe tener un formato válido.';
        errorEmail.classList.add('error');
        valido = false;
    } else {
        errorEmail.textContent = '';
        errorEmail.classList.remove('error');
    }

    // Validación de asunto
    if (asunto === '') {
        errorAsunto.textContent = 'El asunto es obligatorio.';
        errorAsunto.classList.add('error');
        valido = false;
    } else {
        errorAsunto.textContent = '';
        errorAsunto.classList.remove('error');
    }

    // Validación de mensaje
    if (mensaje === '' || mensaje.length > 300) {
        errorMensaje.textContent = 'El mensaje es obligatorio y no debe tener más de 300 caracteres.';
        errorMensaje.classList.add('error');
        valido = false;
    } else {
        errorMensaje.textContent = '';
        errorMensaje.classList.remove('error');
    }


    // Enviar datos al servidor
    fetch('enviar.php', {
        method: 'POST',
        body: JSON.stringify({
            nombre: nombre,
            email: email,
            asunto: asunto,
            mensaje: mensaje
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        if (data.exito) {
            // Mensaje de éxito y limpiar formulario
            alert('Mensaje enviado correctamente.');
            formulario.reset();
            errorNombre.textContent = '';
            errorNombre.classList.remove('error');
            errorEmail.textContent = '';
            errorEmail.classList.remove('error');
            errorAsunto.textContent = '';
            errorAsunto.classList.remove('error');
            errorMensaje.textContent = '';
            errorMensaje.classList.remove('error');
        } else {
            alert('Error al enviar el mensaje.');
        }
    })
    .catch(error => console.error('Error:', error));
});
