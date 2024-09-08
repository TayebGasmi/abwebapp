-- liquibase formatted sql
-- changeset guesmi:init-schoolYear
INSERT INTO school_type (name, created_date, last_modified_date)
VALUES ('EU', NOW(), NOW()),
       ('NORMAL', NOW(), NOW())

