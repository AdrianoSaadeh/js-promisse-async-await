const uploadBtn = document.getElementById("upload-btn");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        // Cria um novo leitor de arquivo
        const leitor = new FileReader();

        // Define o que acontece quando a leitura é completada com sucesso
        leitor.onload = () => {
            // Resolve a Promise com um objeto contendo a URL e o nome do arquivo
            resolve({
                url: leitor.result,
                nome: arquivo.name
            });
        };

        // Define o que acontece em caso de erro na leitura do arquivo
        leitor.onerror = () => {
            // Rejeita a Promise com uma mensagem de erro personalizada
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        };

        // Inicia a leitura do arquivo como uma URL data (base64)
        leitor.readAsDataURL(arquivo);
    });
}

// Seleciona elementos HTML da página
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");
const inputUpload = document.getElementById("image-upload");

// Adiciona um ouvinte de evento para o input de upload de arquivo
inputUpload.addEventListener("change", async (evento) => {
    // Obtém o arquivo selecionado pelo usuário
    const arquivo = evento.target.files[0];

    // Verifica se um arquivo foi selecionado
    if (arquivo) {
        try {
            // Aguarda a leitura do conteúdo do arquivo
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);

            // Atualiza a imagem principal com a URL do arquivo
            imagemPrincipal.src = conteudoDoArquivo.url;

            // Atualiza o nome da imagem na página
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            // Em caso de erro na leitura do arquivo, exibe uma mensagem de erro no console
            console.error("Erro na leitura do arquivo:", erro);
        }
    }
});

const inpuTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

inpuTags.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inpuTags.value.trim();
        if (tagTexto !== "") {
            const tagNova = document.createElement("li");
            tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
            listaTags.appendChild(tagNova);
            inpuTags.value = "";
        }
    }
});

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const tagASerRemovida = evento.target.parentElement;
        listaTags.removeChild(tagASerRemovida);
    }
});

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000)
    })
};