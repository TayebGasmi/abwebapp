-- liquibase formatted sql
-- changeset guesmi:admin-account
-- Insert an admin user into the app_user table
INSERT INTO app_user (password,
                      first_name,
                      last_name,
                      profile_picture,
                      email,
                      is_verified,
                      is_completed,
                      created_date,
                      last_modified_date)
VALUES ('$2a$12$ghiNaEsHtx8v9Wx2JPxPAOp213hXFN9.1DejvFxRYXCHoZzXo.qCi', -- 'admin123' bcrypt hashed password
        'Admin',
        'User',
        NULL,
        'admin@admin.com',
        true,
        true,
        NOW(),
        NOW());
-- changeset guesmi:assign-admin-role
-- Assign the admin role to the admin user
INSERT INTO user_role (user_id, role_id)
VALUES ((SELECT id FROM app_user WHERE email = 'admin@admin.com'),
        (SELECT id FROM role WHERE name = 'ADMIN'));




