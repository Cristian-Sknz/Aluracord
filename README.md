<h1 align="left">Aluracord - Imersão React</h1>

<div>
  <img align="left" width="165px" alt="Ram (UwU)" src="https://i.imgur.com/2MGyWda.gif">
  <h2>Sobre</h2>
  Este projeto foi criado durante a imersão React da Alura, foram 5 dias de imersão. Apesar de ter conhecimento do conteúdo apresentado na imersão, decidi participar para continuar praticando e aprimorar o meu conhecimento em React. Está imersão da Alura possibilitou com que diversos desenvolvedores, tanto iniciantes quando experientes na area se reunissem criando um grande variação de projetos.
</div>

<h2>Ferramentas</h2>
Foram utilizadas varias ferramentas e bibliotecas para criar este projeto, as principais são:
<ul>
  <li>React</li>
  <li>NextJS</li>
  <li>Typescript</li>
  <li>Styled-Components</li>
  <li>Supabase-js</li>
</ul>

<h2>Desenvolvimento</h2>

### Supabase
#### Crie sua conta na Supabase
Para poder abrir este projeto em modo de desenvolvimento, você irá precisar criar uma conta na [Supabase](https://supabase.com/).

![image](https://user-images.githubusercontent.com/61399406/152068244-a6ed2388-f83c-4f74-a570-525d57260cfd.png)

#### Crie seu projeto
Você precisará criar um projeto no Supabase

![image](https://user-images.githubusercontent.com/61399406/152067970-18cb939b-587d-4de8-9ea3-ebf5135d9cc6.png)

#### Variaveis de ambiente
Você terá que trocar as variaveis de ambiente em `.env` pela as suas recebidas no Supabase.

![image](https://user-images.githubusercontent.com/61399406/152069807-5d23e2d3-33b3-4a40-865c-02aa022b225b.png)
![image](https://user-images.githubusercontent.com/61399406/152069897-7757336f-e972-4072-8bbb-7438700107dd.png)
> Adicione também uma chave aleatória em `APPLICATION_SECRET`, foi implementado um sistema de autenticação simples e este código é necessario para gerar o JWT

#### Crie as tabelas no banco de dados
Você terá que criar duas tabelas no banco de dados, uma para usuários e outra para mensagens.
> Os nomes das tabelas devem ser 'users' e 'messages'

![image](https://user-images.githubusercontent.com/61399406/152069399-e3032dd9-915e-46c1-b8fb-ca8040e0ff1c.png)

##### Messages
```kotlin
messages {
  id: int8;
  author: int8;
  date?: timestamptz;
  message: text;
  message_type: varchar;
  reply?: int8;
  edited?: boolean;
};

users {
  id: int8;
  name?: varchar;
  username: varchar;
  bio?: text;
  location?: varchar;
  createdAt: timestampz;
  publicRepos: int8;
  followers: int8;
  following: int8;
  joinedAt?: timestampz;
};
```
### Pronto, agora você pode desenvolver!
Você precisará apenas de uma IDE com suporte á Typescript, recomendo utilizar o Visual Studio Code.


