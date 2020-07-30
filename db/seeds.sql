USE employeeDB;

INSERT INTO department (name)
VALUES ("Information tech");

INSERT INTO department (name)
VALUES ("human Resources");

INSERT INTO department (name)
VALUES ("Bussiness");


INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("senioranalyist", 70000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("analyistone", 60000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("analyisttwo", 55000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("intern", 10000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("mark", "Thomas", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Emily", "Lucas", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Anna", "Hawkins", 3, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Hawkins", 4, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("David", "Johnson", 4, 4);