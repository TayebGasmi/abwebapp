-- liquibase formatted sql
-- changeset guesmi:admin-account
-- Insert an admin user into the app_user table
INSERT INTO app_user (password,
                      first_name,
                      last_name,
                      profile_picture,
                      email,
                      is_verified,
                      created_date,
                      last_modified_date
                      )
VALUES ('$2a$10$7QxjRT5g1Z1.pMSM0pFZ.eSH8k6dOvU1JYy/hw.pGBFbV7x/YaYuS', -- 'admin123' bcrypt hashed password
        'Admin',
        'User',
        NULL,
        'admin@admin.com',
        true,
        NOW(),
        NOW())
-- changeset guesmi:assign-admin-role
-- Assign the admin role to the admin user
    INSERT INTO user_role (user_id, role_id)
VALUES (
    (SELECT id FROM app_user WHERE email = 'admin@admin.com'),
    (SELECT id FROM role WHERE name = 'ADMIN')
    );




