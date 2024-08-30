-- liquibase formatted sql
-- changeset guesmi:init-roles
INSERT INTO role (name, created_date, last_modified_date, id)
VALUES ('ADMIN', NOW(), NOW(), 1),
       ('STUDENT', NOW(), NOW(), 2),
       ('TEACHER', NOW(), NOW(), 3);

