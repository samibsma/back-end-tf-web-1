CREAT TABLE Usuario (
id serial PRIMARY KEY,
Email VARCHAR,
Senha VARCHAR,
Nome VARCHAR
);
CREAT TABLE Cardapio (
id serial PRIMARY KEY,
Dia_da_semana DATE,
Itens_Cafe_Da_Manha VARCHAR,
Intens _Almoco VARCHAR,
Itens_jantar VARCHAR
.);
CREAT TABLE Feedback (
Nota FLOAT,
fk_Cardapio_id INTEGER
);
ALTE TABLE Feedback ADD CONSTRAINT FK_Feedback_1
FOREIGN KEY (fk_Cardapio_id)
REFERENCES Cardapio (id)
ON DELETE CASCADE;