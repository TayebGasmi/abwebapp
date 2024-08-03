-- liquibase formatted sql
-- SQL script to insert configuration records with durations in minutes
-- changeset guesmi:config
INSERT INTO config (key, value, description)
VALUES
    ('SESSION_PRICE', '25$', 'The price of a session in dollars'),
    ('SESSION_DURATION', '60', 'The duration of a session in minutes');
