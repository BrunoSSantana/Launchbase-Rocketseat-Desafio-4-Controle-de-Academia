## Criação do form

Faz-se necessário a criação do for com `method="POST" action="/instructors"` o método post na qual srá enviado os dados do front para o back e a action, para "redirecionar os dados" para a página desejada, no caso a página `/instructors`.

## Criação da rota

Na rotaa qual será enviado os dados será uma rota `post` onde será capturado o body, ode está contido as informações enviadas.
```
routes.post("/instructors", function(req, res) {

    return res.send(req.body)
})
```