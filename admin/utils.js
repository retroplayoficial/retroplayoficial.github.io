// ======================================
// RetroPlay Utils v1.0
// ======================================

function formatarConsole(consoleNome){

    const nomes = {

        snes: "Super Nintendo",

        megadrive: "Mega Drive",

        n64: "Nintendo 64",

        gba: "Game Boy Advance"

    };

    return nomes[consoleNome] || consoleNome;

}

function copiarTexto(texto){

    navigator.clipboard.writeText(texto);

    alert("Copiado: " + texto);

}

function confirmar(mensagem){

    return confirm(mensagem);

}

function gerarData(){

    const hoje = new Date();

    return hoje.toLocaleDateString("pt-BR");

}