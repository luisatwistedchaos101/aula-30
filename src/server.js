const express = require("express");
const fsp = require("fs/promises");
const path = require("path");


const servidor = express();

servidor.use(express.json());



servidor.put("/dados", async (req, res) => {
  try {
    const { nome } = req.query;
if (!nome){
  return res
  .status(404)
  .json({ erro: "Nome na consulta não encontrado" })
}
    let { conteudo } = req.body;
    if (!conteudo || typeof conteudo !== "string" || conteudo.trim() === "") {
      return res.status(400).json({ erro: "Conteúdo inválido: deve ser uma string não vazia." });
    }
    const caminhoArquivo = path.join("/dado/:nome", async(_req, res, ("/.txt")))

    let dadosExistentes;
    try {
      dadosExistentes = await fsp.readFile(caminhoArquivo, "utf8");
    } catch (erro) {
      if (erro.code === "ENOENT") {
        // Arquivo não existe; cria o arquivo
        await fsp.writeFile(caminhoArquivo, conteudo);
        return res.status(201).json({ mensagem: "Arquivo criado com sucesso." });
      } else {
        throw erro;
      }
    }
    servidor.get("/dado/:nome", async (_req, res) => {
      try {
        const { nome } = req.params;
       
        if (!nome) {
          return res.status(404).json({ message: "Nome no route params é necessário."})
        }
       

        if (!caminhoArquivo.endsWith(".txt")) {
          return res
          .status(400)
          .json({ message: "O arquivo precisa ser um arquivo de texto."})
        }

        const caminhoDiretorio = path.join(_dirname, "textos");

        const arquivos = await fsp.readdir(caminhoDiretorio);

        const arquivosTexto = arquivos.filter(arquivo => arquivo.endsWith(".txt"))


        res.status(200).json({ arquivosDisponiveis: arquivos });
      } catch (erro) {
        if (erro.code === "ENOENT") {
          // Arquivo não encontrado
          res.status(404).json({ erro: "Arquivo não encontrado" });
        } else if (erro.code === "EACCES") {
          // Permissão negada
          res.status(403).json({ erro: "Permissão negada ao tentar acessar o arquivo" });
        } else {
          // Outros erros
          console.error("Erro ao ler o arquivo:", erro.message);
          res
            .status(500)
            .json({ erro: "Erro ao ler o arquivo", detalhes: erro.message });
        }
      }
    });
    
    // Adiciona o novo conteúdo ao final do arquivo
    await fsp.writeFile(caminhoArquivo, `${dadosExistentes}\n${conteudo}`);

    res.json({ mensagem: "Conteúdo adicionado com sucesso." });
  } catch (erro) {
    if (erro.code === "EACCES") {
      // Permissão negada
      res.status(403).json({ erro: "Permissão negada ao tentar escrever no arquivo" });
    } else {
      console.error("Erro ao escrever no arquivo:", erro.message);
      res
        .status(500)
        .json({ erro: "Erro ao processar o arquivo", detalhes: erro.message });
    }
  }
});
servidor.post("/dados", async(req, res) => {
//nome do arquivo = body request
const nome = req.body.fsp
//couteudo = body request
// encontrar caminho da pasta onde o couteudo vai ser criado

//nome do arquivo = criar o arquivo() fsp()

//nome do arquivo = inserir o couteudo 

//retorna a reposta

})
servidor.listen(3000, () => console.log("Servidor está rodando... 🔥"));
