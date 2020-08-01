## Criação do form

Faz-se necessário a criação do for com `method="POST" action="/instructors"` o método post na qual srá enviado os dados do front para o back e a action, para "redirecionar os dados" para a página desejada, no caso a página `/instructors`.

## Criação da rota

Na rotaa qual será enviado os dados será uma rota `post` onde será capturado o body, ode está contido as informações enviadas.
```
routes.post("/instructors", function(req, res) {

    return res.send(req.body)
})
```

## Validado os dados

A lógica na validação vai consistir da seguinte maneira. O body que enviamos é composto de uma array e esse array possue as "keys" e os "values", as "keys" são o name dos campos e os "values" são os dados que foram preencidos. Se um dado estiver preenchido o value da key estará vazia dessa forma vamos mandar uma mensagem de erro como "preencha todos os dados", caso esticer tudo ok, "enviado com sucesso".
```
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
```
fs.writeFile("data.json", JSON.stringify(req.body), function(err) {
        if (err) return res.send('Write file err')

        return res.redirect("/instructors")
    })
```