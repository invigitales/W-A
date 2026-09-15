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