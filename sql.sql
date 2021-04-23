-- link tutorial: https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/#whatisarestfulapi


-- instalar curl
-- crear la base de datos: "api"
-- ejecutar el archivo: "sql.sql" en la base de datos "api"
-- configurar el archivo: "config.json" de acuerdo a sus datos en su cuenta local de postgres


--> Setting up an Express.js server
-----------------------------------
-- mkdir node-api-postgres
-- cd node-api-postgres
-- npm init -y
-- npm i express pg  //instalar express

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);

INSERT INTO users (name, email) VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');
  
-------------------------------------------
-- PROCEDIMIENTOS ALMACENADOS
-------------------------------------------
-- select * from users;

CREATE 	OR REPLACE FUNCTION getUsers() RETURNS TABLE(id_out integer, name_out varchar(30), email_out varchar(30))AS $$ 

BEGIN
	return query (select id,name,email from users order by id asc);

END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM getUsers();
----------------------------------
CREATE 	OR REPLACE FUNCTION getUserById(id_in integer) RETURNS TABLE(id_out integer, name_out varchar(30), email_out varchar(30))AS $$ 

BEGIN
	return query (select id,name,email from users where id = id_in);
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM getUserById(2);
-------------------------------------
CREATE OR REPLACE PROCEDURE createUser(name_in varchar(30), email_in varchar(30))
LANGUAGE SQL
AS $$
	INSERT INTO users (name, email) VALUES (name_in, email_in);
$$;

-- CALL createUser('test','test@test');
-------------------------------------
CREATE OR REPLACE PROCEDURE updateUser(name_in varchar(30), email_in varchar(30), id_in integer)
LANGUAGE SQL
AS $$
	UPDATE users SET name = name_in, email = email_in WHERE id = id_in
$$;

-- CALL updateUser('guason','guason@guason',2);
---------------------------------------------------------
CREATE OR REPLACE PROCEDURE deleteUser(id_in integer)
LANGUAGE SQL
AS $$
	DELETE FROM users WHERE id = id_in;
$$;

-- CALL deleteUser(2);