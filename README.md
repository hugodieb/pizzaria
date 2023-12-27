# Pizzafun

Projeto simples de um sistema de pizzaria para controle de pedido.
Para subir o projeto vç deve ter instalados na sua máquina repositório git,
banco postgres, node, yarn e para subir pelo container, vç deve instalar o docker
e o docker compose. 

## Subir aplicação pelo docker

1- No exemplo que vamos seguir, irei abrir um terminal ubuntu/linux

2- Criar um diretório para o seu projeto ex.: mkdir estudo

3- git clone https://github.com/hugodieb/pizzaria.git

4- Criar um diretorio dkdata/backend/.env e dkdata/frontend/.env dentro da pasta raiz do projeto "pizzaria"

5- No dkdata/backend/.env colocar essas variáveis. Criar um usuário postgres com senha postgres e nome do banco postgres mas, fique a vontade para mudar só não esquece de atualizar no DATABASE_URL.

      ```
      DATABASE_URL="postgres://postgres:postgres@172.17.0.1:5432/pizzafun?schema=public"

      // Gerado md5hashgenerator.com
      JWT_SECRET="cc09b1c19501434f3369ec86e051c30e"

      ```
6- Repetir agora para dkdata/frontend/.env colocando esse valores dentro. Esses valores também podem e devem ser mudados para deploy em produção.

      ```
      BASE_URL="http://localhost:8000"

      NAME_TOKEN="@pizzafun.token"

      ```
7- No terminal dentro da pasta pizzaria, dar o comando source dev.sh, este comando tem 
comandos automaticos para criar e buildar imagens docker além de subir os containers que iremos precisar para rodar a aplicação pelo docker.

8- No terminal dar ocomando dkbuild. Este processo vai demorar um pouco a primeira vez que rodar pois ele vai criar uma imagem baseada em linux ubuntu, vai instalar tudo que precisamos para subir um container com esta imagem. Aproveite o tempo para dar uma olhada dentro do arquivo Dockerfile pois é deste arquivo que estou falando onde tem tudo para nossa imagem que será criada.

9- Se o docker foi bem instalado e testado antes e tambem o docker-compose, voçe deve dar o comando no terminal dkrunApi. Isso vai subir um container rodando nossa imagem docker que vç acabou de criar no item 8. Nesse container sua aplicação backend está rodando na porta 8000 do container e o frontend está rodando na porta 3000 do container. Estas portas foram configuradas quando vç deu o comando dkrunApi(dê uma olhada neste comando dentro do arquivo dev.sh)

10- Para ver o docker rodando, dê o comando docker ps e terá um container chamado pizzafun rodando expondo as respectivas portas 8000 backend e 3000 frontend.

11- Até aqui seu sistema é para estar rodando, basta abrir seu browser e digitar localhost:3000 e sua página do sistem sera aberta direcionando vç para a página de login e ou cadastro....como é seu primeiro acesso, vá para cadastro e crie um usuário tipo teste@teste.com e senha 123456, pronto vç vai receber uma mensagem de usuário criado com sucesso, depois volte para tela de login e entre com estes dados que acabou de criar.

## Orquestrando com o nginx...

1- Vamos subir um container rodando uma imagem nginx para orquestar nossas urls.

2- Ainda dentro da pasta pizzaria, rode o comando dknginxcompose. Este comando vai criar um container docker rodando na porta 80 onde ele ficar observando as requisições que estão chegando até ele e conforme o que cheja, ele redireciona para o lugar certo...é fantástico....

-3 Se tiver tudo certo ao dar o comando docker ps, deverá aparecer o container rodando com nome pizzafun_nginx na porta 80.

4- Se vç observar dentro da pasta docker/nginx/default_local, vai observar que o nome dado para o server name foi "pizzafun.com.br", isso significa que o nginx só vai redirecionar as coisas quando chegar nele esse dominio que falei aqui porém não temos esse domínio mas....podemos enganá-lo um pouquinho mascarando o nosso localhost com o nome do nosso domínio....claro que na vida real em produção isso não acontece mas em desenvolvimento é show para nossos testes.

5- Pois bem, vamos lá...abra outro terminal e digite sudo nano /etc/hosts. Na posição logo abaixo a "127.0.0.1 localhost" digite "127.0.0.1  pizzafun.com.br". Control + O e Control + x. Pronto isso vai simular nosso domínio na internet e nosso nginx vai faser a coisa certa.

6- Agora não precisa mais digitar no browser localhost:3000, apenas digite pizzafun.com.br e vç será redirecionado para sua página do pizzafun como se fosse na vida real..show \o/.

## E agora?

- Agora estuda tudo isso aí para entender bem tudo o que foi feito, os containers, banco, nextjs, apiRest...

## Me siga aqui no git e deixe seus comentários ou peguntas....Valeuuuuuu!

