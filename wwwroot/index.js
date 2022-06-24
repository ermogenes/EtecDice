const facesAtual = () => {
    const seletorFaces = document.getElementById("faces");
    return seletorFaces.value;
}

const atualizaFaces = () => {
    const exibeFacesAtual = document.getElementById("numero-faces-atual");

    const faces = facesAtual();
    const texto = `d${faces}`;

    exibeFacesAtual.innerHTML = texto;

    const dadoAtual = document.getElementById("dado-atual");
    dadoAtual.innerHTML = texto;

    atualizaLancamento("…");
};

const iniciar = () => {
    const seletorFaces = document.getElementById("faces");
    seletorFaces.addEventListener("change", atualizaFaces);
    seletorFaces.value = 6;

    const faces = facesAtual();

    document.getElementById("lancar").addEventListener("click", lancar);
};

const atualizaLancamento = (novoValor) => {
    const resultado = document.getElementById("resultado");

    resultado.classList.remove("roll-in-top");
    resultado.innerHTML = novoValor;
    void resultado.offsetWidth; // trigger a DOM reflow
    resultado.classList.add("roll-in-top");
};

const lancar = async (event) => {
    event.preventDefault();

    atualizaFaces();

    const faces = facesAtual();
    const resposta = await fetch(`/dado/d${faces}`);

    if (!resposta.ok) {
        atualizaLancamento("!");
        return;
    }

    const retornoApi = await resposta.json();

    atualizaLancamento(retornoApi.rolagem);
};

document.addEventListener("DOMContentLoaded", iniciar);