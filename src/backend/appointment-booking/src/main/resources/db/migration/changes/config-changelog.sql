-- liquibase formatted sql
-- SQL script to insert configuration records with durations in minutes
-- changeset guesmi:config
INSERT INTO config (key, value, description, value_type)
VALUES ('SESSION_PRICE', '25', 'The price of a session in dollars', 'BIG_DECIMAL'),
       ('SESSION_DURATION', '60', 'The duration of a session in minutes', 'LONG'),
       ('TEACHER_SHARE', '25', 'The teacher amount per session', 'LONG'),
       ('ADMIN_SHARE', '5', 'The admin amount per session', 'LONG');

