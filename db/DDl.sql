CREATE TABLE Usuario (
    id serial PRIMARY KEY,
    Email VARCHAR(255),
    Senha VARCHAR(255),
    Nome VARCHAR(255)
);

CREATE TABLE Cardapio (
    id serial PRIMARY KEY,
    Dia_da_semana DATE,
    Itens_Cafe_Da_Manha VARCHAR(255),
    Intens_Almoco VARCHAR(255),
    Itens_jantar VARCHAR(255)
);

CREATE TABLE Feedback (
    Nota FLOAT,
    fk_Cardapio_id INTEGER
);

ALTER TABLE Feedback ADD CONSTRAINT FK_Feedback_1
    FOREIGN KEY (fk_Cardapio_id) 
    REFERENCES Cardapio (id) 
    ON DELETE CASCADE;