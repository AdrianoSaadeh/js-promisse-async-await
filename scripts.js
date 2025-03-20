const uploadBtn = document.getElementById("upload-btn");

// Adiciona um evento de clique ao botão de upload
uploadBtn.addEventListener("click", () => {
    inputUpload.click(); // Aciona o input de upload de arquivos quando o botão é clicado
});

// Função assíncrona para ler o conteúdo de um arquivo e retorná-lo como uma URL data (base64)
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

// Seleciona elementos do input de tags e da lista de tags
const inpuTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");

// Adiciona um evento de clique para remover tags da lista quando o usuário clica no botão de exclusão
listaTags.addEventListener("click", (evento) => {
    // Verifica se o elemento clicado tem a classe "remove-tag"
    if (evento.target.classList.contains("remove-tag")) {
        // Obtém o elemento pai (li) e remove da lista de tags
        const tagASerRemovida = evento.target.parentElement;
        listaTags.removeChild(tagASerRemovida);
    }
});

// Lista de tags disponíveis para o usuário escolher
const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

// Função assíncrona que verifica se a tag digitada pelo usuário existe na lista de tags disponíveis
async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Retorna true se a tag existir na lista de tags disponíveis, false caso contrário
            resolve(tagsDisponiveis.includes(tagTexto));
        }, 1000); // Simula um pequeno atraso para demonstrar uma busca assíncrona
    });
}

// Adiciona um evento para capturar a tecla "Enter" no input de tags
inpuTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault(); // Impede a quebra de linha no input
        const tagTexto = inpuTags.value.trim(); // Remove espaços extras

        // Verifica se o usuário digitou algo no input
        if (tagTexto !== "") {
            try {
                // Aguarda a verificação se a tag está na lista de disponíveis
                const tagExiste = await verificaTagsDisponiveis(tagTexto);

                if (tagExiste) {
                    // Cria um novo item na lista de tags
                    const tagNova = document.createElement("li");
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;

                    // Adiciona a nova tag na lista
                    listaTags.appendChild(tagNova);

                    // Limpa o input após adicionar a tag
                    inpuTags.value = "";
                } else {
                    // Exibe um alerta caso a tag não seja encontrada na lista disponível
                    alert("Tag não foi encontrada!");
                }
            } catch (error) {
                // Captura erros na verificação da tag
                console.error("Erro ao verificar a existência da tag");
                alert("Erro ao verificar a existência da tag. Verifique o console!");
            }
        }
    }
});

// Seleciona o botão de publicação do projeto
const botaoPublicar = document.querySelector(".botao-publicar");

// Adiciona um evento de clique para processar os dados do projeto ao clicar no botão de publicar
botaoPublicar.addEventListener("click", async (evento) => {
    evento.preventDefault(); // Impede o comportamento padrão do formulário

    // Obtém os valores do nome e descrição do projeto
    const nomeProjeto = document.getElementById("nome").value;
    const descricaoProjeto = document.getElementById("descricao").value;

    // Obtém todas as tags adicionadas pelo usuário
    const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

    // Exibe no console os dados do projeto antes de serem enviados
    console.log(nomeProjeto);
    console.log(descricaoProjeto);
    console.log(tagsProjeto);
});

// Função que simula a publicação do projeto e retorna sucesso ou erro aleatoriamente
async function publicarProjeto(nomeDoProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simula um sucesso ou erro na publicação do projeto de forma aleatória
            const deuCerto = Math.random() > 0.5;
            if (deuCerto) {
                resolve("Projeto publicado com sucesso.");
            } else {
                reject("Erro ao publicar o projeto.");
            }
        }, 2000); // Simula um atraso de 2 segundos na publicação
    });
}
