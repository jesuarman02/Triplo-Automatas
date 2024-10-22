$("#texto").on('input', () => {
    $("#texto").val($("#texto").val().replace(/[^0-9*\-\/+]/g, ""));
});

const calcular = () => {
    const texto = $("#texto").val().trim();
    if (!texto) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor ingresa una expresión válida',
        });
        return;
    }

    try {
        const partes = texto.match(/([0-9]+|[-+*/])/g); 
        let pasos = "";
        let calculo = parseFloat(partes[0]); 

        for (let i = 1; i < partes.length; i += 2) {
            const operador = partes[i];
            const numero = parseFloat(partes[i + 1]);
            pasos += `${calculo} ${operador} ${numero} = `;
            calculo = eval(`${calculo} ${operador} ${numero}`);
            pasos += `${calculo}<br>`;
        }
        $("#resultado").html(`<strong>Último Resultado:</strong> ${calculo}<br><strong>Pasos:</strong><br>${pasos}`);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Expresión inválida',
        });
    }
};

const limpiar = () => {
    $("#texto").val("");
    $("#resultado").html("");
};

$('#btn_calcular').on('click', calcular);
$('#btn_limpiar').on('click', limpiar);
