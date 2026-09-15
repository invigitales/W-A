// =========================================
// CUENTA REGRESIVA
// =========================================

function iniciarCuentaRegresiva() {

    const spanDays = document.querySelector('#days');
    const spanHours = document.querySelector('#hours');
    const spanMinutes = document.querySelector('#minutes');
    const spanSeconds = document.querySelector('#seconds');


    // =========================================
    // FECHA OBJETIVO
    // 5 DE DICIEMBRE DE 2026
    // Hora: 00:00:00
    // Zona horaria: El Salvador (UTC-6)
    // =========================================

    const fechaObjetivo = new Date('2026-12-05T00:00:00-06:00');


    function actualizarCuentaRegresiva() {

        const ahora = new Date().getTime();

        const diferencia = fechaObjetivo.getTime() - ahora;


        // Si ya pasó la fecha

        if (diferencia <= 0) {

            spanDays.textContent = '00';
            spanHours.textContent = '00';
            spanMinutes.textContent = '00';
            spanSeconds.textContent = '00';

            return;
        }


        // =========================================
        // CONVERSIONES DE TIEMPO
        // =========================================

        const segundos = 1000;

        const minutos = segundos * 60;

        const horas = minutos * 60;

        const dias = horas * 24;


        // =========================================
        // CÁLCULO
        // =========================================

        const diasRestantes = Math.floor(diferencia / dias);

        const horasRestantes =
            Math.floor((diferencia % dias) / horas);

        const minutosRestantes =
            Math.floor((diferencia % horas) / minutos);

        const segundosRestantes =
            Math.floor((diferencia % minutos) / segundos);


        // =========================================
        // MOSTRAR RESULTADOS
        // =========================================

        spanDays.textContent =
            diasRestantes.toString().padStart(2, '0');

        spanHours.textContent =
            horasRestantes.toString().padStart(2, '0');

        spanMinutes.textContent =
            minutosRestantes.toString().padStart(2, '0');

        spanSeconds.textContent =
            segundosRestantes.toString().padStart(2, '0');
    }


    // Actualizar inmediatamente

    actualizarCuentaRegresiva();


    // Actualizar cada segundo

    setInterval(actualizarCuentaRegresiva, 1000);
}


// =========================================
// INICIAR CUANDO CARGUE LA PÁGINA
// =========================================

if (document.readyState === 'loading') {

    document.addEventListener(
        'DOMContentLoaded',
        iniciarCuentaRegresiva
    );

} else {

    iniciarCuentaRegresiva();


}




/* =========================================
   REPRODUCTOR DE MÚSICA
   ========================================= */

function iniciarReproductor() {

    const audio = document.getElementById('miAudio');
    const botonPlay = document.getElementById('botonPlay');
    const iconoPlay = document.getElementById('iconoPlay');

    const progreso = document.querySelector('.progreso-musica');
    const tiempoActual = document.getElementById('tiempoActual');
    const tiempoTotal = document.getElementById('tiempoTotal');

    if (!audio || !botonPlay) return;

    let reproduciendo = false;

    function formatoTiempo(segundos) {

        if (!isFinite(segundos)) {
            return '0:00';
        }

        const minutos = Math.floor(segundos / 60);
        const segundosRestantes = Math.floor(segundos % 60);

        return minutos + ':' + segundosRestantes.toString().padStart(2, '0');
    }

    botonPlay.addEventListener('click', function () {

        if (reproduciendo) {

            audio.pause();

            iconoPlay.textContent = '▶';

            reproduciendo = false;

        } else {

            audio.play()
                .then(function () {

                    iconoPlay.textContent = '❚❚';

                    reproduciendo = true;

                })
                .catch(function (error) {

                    console.error('No se pudo reproducir el audio:', error);

                });

        }

    });

    audio.addEventListener('loadedmetadata', function () {

        tiempoTotal.textContent = formatoTiempo(audio.duration);

    });

    audio.addEventListener('timeupdate', function () {

        if (audio.duration) {

            const porcentaje =
                (audio.currentTime / audio.duration) * 100;

            progreso.style.width = porcentaje + '%';

            tiempoActual.textContent =
                formatoTiempo(audio.currentTime);

        }

    });

    audio.addEventListener('ended', function () {

        iconoPlay.textContent = '▶';

        reproduciendo = false;

    });

}

if (document.readyState === 'loading') {

    document.addEventListener(
        'DOMContentLoaded',
        iniciarReproductor
    );

} else {

    iniciarReproductor();

}