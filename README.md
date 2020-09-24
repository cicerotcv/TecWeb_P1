# TecWeb Projeto 1

## Criação do MySQL

O a criação do banco de dados em MySQL foi feita da seguinte maneira:

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
