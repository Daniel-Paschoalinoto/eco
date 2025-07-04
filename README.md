## ECO - Fragmento do Amanha - versão 0.4.9

**ECO - Fragmento do Amanhã** está em desenvolvimento 😊  
É meu projeto de férias, criado para compor meu [portfólio](https://daniel-paschoalinoto.github.io/portfolio/).  
Tem sugestões ou idéias?

Fale comigo!  
danielpaschoalinoto@gmail.com.

## Updates

Versão 0.4.9 - 04/07/2025

- Repositório será publicado oficialmente.
- Organizei minha mess.
- [installer.iss](./build/installer.iss), foi atualizado para refletir nova arquitetura.
- Fiz a padronização dos paths em [/src/utils/paths.js](./src/utils/paths.js).
- Fiz a inclusão do diretório [/frontEnd/](./frontEnd/) para utiliza-lo no GH-Pages.
- No instalador, o link criado no meu iniciar pede admin.
- As imagens do jogo agora são personalizadas no intalador.
- ECO.ico tem todas as resoluções necessárias.

## Tecnologias utilizadas

- [Inno-Setup](https://jrsoftware.org/isinfo.php) para empacotamento e criação do instalador.
- [Node.js](https://nodejs.org/pt) como RunTime.
- [Windows-Terminal](https://github.com/microsoft/terminal) como interface de execução.

## Para Jogadores

- Sugiro que acesse [o site oficial](https://daniel-paschoalinoto.github.io/eco-fragmento-do-amanha/), tem um vídeo demonstrando a instalação.

## Para Devs

- O projeto é apenas para Windows 10 e 11.
- Sinta-se a vontade para fuçar e caso queira entender algo ou colabora é só me contatar.
- Fiz questão de manter o `runWithWT.js`, pois me ajudou a debuggar sem perder a imersão e manter a criatividade.

#### Build

- Clone o repositório.
- Instale o [Inno-Setup](./build/innosetup-6.4.3.exe).
- Inicie o Inno e carregue o [installer.iss](./build/installer.iss).
- Compile o projeto. O executável (.exe) será gerado no mesmo diretório do script.

## Licença

Este projeto (ECO - Fragmento do Amanhã) está licenciado sob a Licença Creative Commons Atribuição-NãoComercial-SemDerivações 4.0 Internacional.

[![CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

**Termos da Licença:**

Sob os termos da licença CC BY-NC-ND 4.0, é **obrigatório** o reconhecimento da autoria original. Especificamente:

**Você tem permissão para:**

* **Compartilhar:** Reproduzir e redistribuir o material em qualquer meio ou formato, desde que respeitados os termos desta licença.

**Você não tem permissão para:**

* **Uso Comercial:** Utilizar o material para fins comerciais, incluindo, mas não se limitando a venda, licenciamento ou qualquer outra forma de obtenção de lucro.
* **Obras Derivadas:** Modificar, transformar ou criar obras derivadas do material. Isso inclui adaptações, remixes ou qualquer alteração na obra original.
* **Não Atribuição:** Deixar de dar crédito adequado ao autor original (Daniel Paschoalinoto).

**A atribuição deve ser feita de maneira razoável e deve incluir:**

* A identificação do autor original (Daniel Paschoalinoto).
* Uma menção ao título da obra (ECO - Fragmento do Amanhã).
* A indicação da licença utilizada (CC BY-NC-ND 4.0).

Para informações legais completas, consulte: [https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode) (disponível em diversos idiomas, incluindo português: [https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.pt](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.pt))

Você também pode encontrar o texto completo da licença no arquivo [LICENSE](./LICENSE) deste repositório.