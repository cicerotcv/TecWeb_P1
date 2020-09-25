# TecWeb Projeto 1

## Criação do MySQL

O a criação do banco de dados em MySQL foi criado da seguinte maneira:

``` sql
    CREATE DATABASE my_notes;
    USE my_notes;
    CREATE TABLE Notes (
        id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title CHAR(255),
        content TEXT NOT NULL,
        lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
```

## Acesso

    http://localhost:8080/tec_web_p1/index.html


## Funcionalidade

Para criar uma nota, clique em adicionar (botão (+) na parte superior) e será adicionada uma nota em branco na tela. Essa nota guardará no banco de dados as alterações feitas.

**Implementações:**

`✔ Postar texto, ver, apagar e editar com algum front end para demosntrar as funcionalidades;`<br>
`? Interface bacana;`<br>
`✘ visualizar quem criou;`<br>
`✔ visualizar data;`
