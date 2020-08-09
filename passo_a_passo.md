# POST

## Criação do form

Faz-se necessário a criação do for com `method="POST" action="/instructors"` o método post na qual srá enviado os dados do front para o back e a action, para "redirecionar os dados" para a página desejada, no caso a página `/instructors`.

## Criação da rota

Na rotaa qual será enviado os dados será uma rota `post` onde será capturado o body, ode está contido as informações enviadas.
```Javascript
routes.post("/instructors", function(req, res) {

    return res.send(req.body)
})
```

## Validado os dados

A lógica na validação vai consistir da seguinte maneira. O body que enviamos é composto de uma array e esse array possue as "keys" e os "values", as "keys" são o name dos campos e os "values" são os dados que foram preencidos. Se um dado estiver preenchido o value da key estará vazia dessa forma vamos mandar uma mensagem de erro como "preencha todos os dados", caso esticer tudo ok, "enviado com sucesso".
```Javascript
routes.post("/instructors", function(req, res) {

    const keys = Object.keys(req.body)

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('preencha todos os dados')
        }
    }
    
    return res.send('Enviado com sucesso')
})
```

## Exportando uma função

Para deixar o código com uma melhor visualização e facilitar a manutenção vamos transferir a função criada anteriorment e as futuras q serão criadas para uma arquivo na  raiz com um nome sugestão instructors (já que é uma academia e estamos trabalhando com os dados dos instrutores).
Neste arquivo vamos trabalhar com a exportação da seginte forma: `exports.post = function[...]` e será importado no arquivo de rotas normamelte `const intructors = require(./instructors)` e aplicado no local onde estava anteriormente  função `instructors.post`  

## Salvando o arquivo em um arquivo JSON

Agora vamos salvar nossos dados enviados pelo req.body utilizando o sile system ou simplesemtne 'fs'. Primeiro passo é importar `const fs = require('fs')` em seguida fazer com que o arquivo seja salvo após ser validado como mostrado anteriormente, para isso será utilizado a função `writeFile([caminho], [arquivo], [callback]`. no nosso caso vamos converter os dados do body para JSON dentro da função e após uma callback onde será passando umamnsagem de ero caso apresent algum erro da seguinte maneira:
```Javascript
fs.writeFile("data.json", JSON.stringify(req.body), function(err) {
        if (err) return res.send('Write file err')

        return res.redirect("/instructors")
    })
```
e para realizar a identação, usamos uma configuração na função do `stringfy`, da seguinte maneira: `JSON.stringify(teachers, null, 2)`. onde `teachers` é a variável e o `2` representa o espaçamento utilizado de dois caracteres.
Além disso, toda vez que for cadastrao um novo instrutor, é sobreescrito o anterior, para musar isso criamos uma variável para armazenar o `req.body` e utilizamos o `push` no na array do arquivo `instructors`. Podemos utilizar um spread no req.body criando variáveis facilitando a manutenção e visualização do código

## Adicionando Id

Para tornar cada instrutor único e facilitar nossa vida, usarermos um id único a cada um. Esse id será criando levano em contado o `lenght` do array instructor, adicionando a este `+1`, da seguinte maneira: `const id = Number(teachers.instructors.length + 1)`.

## Trabalhando com Datas

Para criarmos registros de apartir de quando o instrutor se cadastrou iremos adicionar ao array outra variável, com o nome de create_at utilizando um método: `const create_at = Date.now()`, capturando assim a data atual. E para realizar o tratamento da data captura no req.body do aniverário, usaremos outro método, onde converte a data fornecida no formato utilizado que utliza milisegundos: `birth = Date.parse(birth)`.

## Buscando instrutor por parâmetro 

Inicialmete nós criamos mais uma rota onde será exibida os dados do instrutor.
```Javascript
routes.get("/instructors/:id", function(req, res){
    return res.render('/intructors/show')
})
```
Nessa rota criamos o parâmetro id que cunciona semelhante a uma constante e que será usada para usarmos em nossa callback ara identificar qual id foi requerido para então mostrar os dados do instrutor.
Usando a desestruturação, capturamos o id: `const {id} = req.params`
Próximo passo armazenar na const o `instructor` cuja o `id` for igual ao `instructor.id` enviado no params. Se os mesmo existir, irá exibir a página show onde será enviado os dados do `foundInstructor`(nesse caso com instructor), se não, mostrará uma frase informando que não existe. 
```Javascript
const foundInstructor = teachers.instructors.find(function(instructor){
        return instructor.id == id
    })
    if (!foundInstructor) {
        return res.send('Instrutor não encontrado')
    }
    return res.render('instructors/show',{instructor: foundInstructor})
}
```
Em seguida é importado a callback na rota: `routes.get("/instructors/:id", instructors.show)`

## Spread

Após eviar nossos dados para a página show.njk, observamos alguns problemas no momento de apresentar esse dados. Para isso iremos realizar algumas alteração iniciando com a criação de uma variável nova e utilizando o spread (espalhamento), da seguinte forma:
```Javascript
const teacher = {
        ...foundInstructor,
        age: "",
        tipo_de_aula: "",
        area_de_atuacao: "",
        create_at: "",
    }
```
Dessa forma, a variável a ser enviada para a página será `teacher`.
O primeiro problema que iremos resolver é o da `area_de_atuacao` no qual transformaremos a string em array com o método `split()` como está seguir: `foundInstructor.area_de_atuacao.split(',')`.
Em seguida resolver o problema das datas, `birth` e `create_at`.

### birth

Aqui vamos iniciar criando um novo arquivo na raiz e exporanto uma função chamada `age` a quyal será respónsável por informar a idade do nosso instrutor, da seguinte forma:
```Javascript
module.exports = {
    age: function (timestamp) {}
```
Na nossa função, vamos inserir um parâmetro que será dado a entrada o dia do nascimento, sendo o `timestapm`. Para o cálculo vamos precisar inicialmente de duas informações, da data atual e da data de nascimento, para isso vamos criar dois objetos: `const today = new Date` e `const birthdate = new Date(timestamp)`. o `new Date` é um objeto criado onde iremos extrair os dados de ano, mês e dia. Em seguida vamos criar uma variável chamada `age` que receberá o ano atual menos o ano de nascimento: `today.getFullYear() - birthDate.getFullYear()`.
Se o mês de nascimento for maior que o mês atual ou estivermos no mesmo mês e o dia de nascimento for maior que o mês atual, será subtraído `-1` do `age`.
```Javascript
if (month < 0 || month == 0 && (today.getDate - birthDate.getDate) <= 0 ) {
            return age -= 1
        }
```
E finalizando a a função com um `return age` e importando e usando ela no `age: age(foundInstructor.birth),`.

### create_at

Para "converter" o formato da data do `create_at` que está em milisegundos, para data no formato padrão "pt-BR". Para isso serão utilizados os seguintes métodos:
`create_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.create_at)`
Caso esse método não funcione por algum motivo, vamos criar uma função que faça isso pra nós.
No arquivo `utils.js` onde se encntra as demais funções que estamos utilizando, vamos criar mais uma, chamada `dateTeacher` onde vamos introduzir um objeto `new Date()` na qual passarrá nossa data do `create_at`:
`dateTeacher: function(timestamp) { data = new Date(timestamp) }`
Em seguida vamos capturar ano, mês e dia com métodos do `Date()` e retornar a data no formato que queremos:
```Javascript
dateTeacher: function(timestamp) {
        data = new Date(timestamp)

        const dia = data.getDate().toString().padStart(2, "0")
        const mes = (data.getMonth()+1).toString().padStart(2, "0")
        const ano = data.getFullYear()
        
        return `${dia}/${mes}/${ano}`
    }
```
# SHOW

Agora nó iremos mostrar os dados do instrutor em um card semelhante ao que é feito o input dos dados. Para isso iremos criar uma rota e uma função para fazer a validação e entregar os dados do instrutor corretamente e fazer uso do Nunjucks para reaproveitar o código, agilizando e tornando-o menos carregado.

## Criando rota

Para iniciar vamos criar uma rota com método get, onde receberemos um parâmetro `id` para validar o instrutor que será exibido e um função callback em um arquivo externo (instructors.js) para facilitar a leitura e manutenção do nosso código, da seguinte forma: `routes.get("/instructors/:id", instructors.show)`.
Para iniciar a function show iremos exportála da seguinte maneira: `exports.show = function(req, res){}` e então, iniciar de fato a nossa fuction criando um id para guardar a o parâmetro `id` do `req.params` com: `const {id} = req.params`