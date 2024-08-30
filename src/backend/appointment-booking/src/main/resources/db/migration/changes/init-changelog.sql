-- liquibase formatted sql

-- changeset tayeb:create-app-user-sequence
CREATE SEQUENCE IF NOT EXISTS app_user_id_seq START WITH 1 INCREMENT BY 1;

-- changeset tayeb:create-config-sequence
CREATE SEQUENCE IF NOT EXISTS config_id_seq START WITH 1 INCREMENT BY 1;

CREATE SEQUENCE IF NOT EXISTS payment_id_seq START WITH 1 INCREMENT BY 1;

-- changeset tayeb:create-role-sequence
CREATE SEQUENCE IF NOT EXISTS role_id_seq START WITH 1 INCREMENT BY 1;

-- changeset tayeb:create-school-type-sequence
CREATE SEQUENCE IF NOT EXISTS school_type_id_seq START WITH 1 INCREMENT BY 1;

-- changeset tayeb:create-school-year-sequence
CREATE SEQUENCE IF NOT EXISTS school_year_id_seq START WITH 1 INCREMENT BY 1;

-- changeset tayeb:create-session-sequence
CREATE SEQUENCE IF NOT EXISTS session_id_seq START WITH 1 INCREMENT BY 1;

-- changeset tayeb:create-subject-sequence
CREATE SEQUENCE IF NOT EXISTS subject_id_seq START WITH 1 INCREMENT BY 1;

-- changeset tayeb:create-verification-code-sequence
CREATE SEQUENCE IF NOT EXISTS verification_code_id_seq START WITH 1 INCREMENT BY 1;

-- changeset tayeb:create-app-user-table
CREATE TABLE app_user
(
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    email              VARCHAR(255)                            NOT NULL,
    first_name         VARCHAR(255),
    is_completed       BOOLEAN,
    is_verified        BOOLEAN,
    last_name          VARCHAR(255),
    password           VARCHAR(255),
    profile_picture    VARCHAR(255),
    CONSTRAINT app_user_pkey PRIMARY KEY (id)
);

-- changeset tayeb:create-config-table
CREATE TABLE config
(
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    description        VARCHAR(255),
    key                VARCHAR(255),
    value              VARCHAR(255),
    value_type         VARCHAR(255),
    CONSTRAINT config_pkey PRIMARY KEY (id)
);

-- changeset tayeb:create-payment-table
CREATE TABLE payment
(
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    admin_share        numeric(19, 2)                          NOT NULL,
    is_teacher_paid    BOOLEAN                                 NOT NULL,
    teacher_share      numeric(19, 2)                          NOT NULL,
    total              numeric(19, 2)                          NOT NULL,
    session_id         BIGINT,
    CONSTRAINT payment_pkey PRIMARY KEY (id)
);

-- changeset tayeb:create-role-table
CREATE TABLE role
(
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    name               VARCHAR(255)                            NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (id)
);

-- changeset tayeb:create-school-type-table
CREATE TABLE school_type
(
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    description        VARCHAR(255),
    name               VARCHAR(255),
    CONSTRAINT school_type_pkey PRIMARY KEY (id)
);

-- changeset tayeb:create-school-year-table
CREATE TABLE school_year
(
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    description        VARCHAR(255),
    name               VARCHAR(255),
    CONSTRAINT school_year_pkey PRIMARY KEY (id)
);

-- changeset tayeb:create-session-table
CREATE TABLE session
(
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    description        VARCHAR(255)                            NOT NULL,
    duration           BIGINT                                  NOT NULL,
    end_date_time      TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    meeting_link       VARCHAR(255)                            NOT NULL,
    price              numeric(19, 2)                          NOT NULL,
    start_date_time    TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    status             VARCHAR(255)                            NOT NULL,
    title              VARCHAR(255)                            NOT NULL,
    student_id         BIGINT                                  NOT NULL,
    subject_id         BIGINT,
    teacher_id         BIGINT                                  NOT NULL,
    CONSTRAINT session_pkey PRIMARY KEY (id)
);

-- changeset tayeb:create-student-table
CREATE TABLE student
(
    id             BIGINT NOT NULL,
    school_type_id BIGINT,
    school_year_id BIGINT,
    CONSTRAINT student_pkey PRIMARY KEY (id)
);

-- changeset tayeb:create-subject-table
CREATE TABLE subject
(
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    description        VARCHAR(255),
    name               VARCHAR(255),
    CONSTRAINT subject_pkey PRIMARY KEY (id)
);

-- changeset tayeb:create-subject-school-types-table
CREATE TABLE subject_school_types
(
    subjects_id     BIGINT NOT NULL,
    school_types_id BIGINT NOT NULL,
    CONSTRAINT subject_school_types_pkey PRIMARY KEY (subjects_id, school_types_id)
);

-- changeset tayeb:create-subject-school-years-table
CREATE TABLE subject_school_years
(
    subjects_id     BIGINT NOT NULL,
    school_years_id BIGINT NOT NULL,
    CONSTRAINT subject_school_years_pkey PRIMARY KEY (subjects_id, school_years_id)
);

-- changeset tayeb:create-teacher-table
CREATE TABLE teacher
(
    pay_rate numeric(19, 2) NOT NULL,
    id       BIGINT         NOT NULL,
    CONSTRAINT teacher_pkey PRIMARY KEY (id)
);
-- changeset tayeb:create-teacher-subjects-table
CREATE TABLE teacher_subjects
(
    teacher_id  BIGINT NOT NULL,
    subjects_id BIGINT NOT NULL,
    CONSTRAINT teacher_subjects_pkey PRIMARY KEY (teacher_id, subjects_id)
);

-- changeset tayeb:create-user-role-table
CREATE TABLE user_role
(
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    CONSTRAINT user_role_pkey PRIMARY KEY (user_id, role_id)
);

-- changeset tayeb:create-verification-code-table
CREATE TABLE verification_code
(
    id         BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    code       VARCHAR(255)                            NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    user_id    BIGINT,
    CONSTRAINT verification_code_pkey PRIMARY KEY (id)
);

-- changeset tayeb:unique-email-app-user
ALTER TABLE app_user
    ADD CONSTRAINT uk_app_user_email UNIQUE (email);

-- changeset tayeb:unique-role-name
ALTER TABLE role
    ADD CONSTRAINT uk_role_name UNIQUE (name);

-- changeset tayeb:unique-payment-session-id
ALTER TABLE payment
    ADD CONSTRAINT uk_payment_session_id UNIQUE (session_id);

-- changeset tayeb:unique-verification-code-user-id
ALTER TABLE verification_code
    ADD CONSTRAINT uk_verification_code_user_id UNIQUE (user_id);

-- changeset tayeb:fk-subject-school-type
ALTER TABLE subject_school_types
    ADD CONSTRAINT fk_subject_school_type FOREIGN KEY (school_types_id) REFERENCES school_type (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-teacher-subject
ALTER TABLE teacher_subjects
    ADD CONSTRAINT fk_teacher_subject FOREIGN KEY (subjects_id) REFERENCES subject (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-verification-code-user
ALTER TABLE verification_code
    ADD CONSTRAINT fk_verification_code_user FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-subject-school-type-subject
ALTER TABLE subject_school_types
    ADD CONSTRAINT fk_subject_school_type_subject FOREIGN KEY (subjects_id) REFERENCES subject (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-teacher-app-user
ALTER TABLE teacher
    ADD CONSTRAINT fk_teacher_app_user FOREIGN KEY (id) REFERENCES app_user (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-user-role-role
ALTER TABLE user_role
    ADD CONSTRAINT fk_user_role_role FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-session-teacher
ALTER TABLE session
    ADD CONSTRAINT fk_session_teacher FOREIGN KEY (teacher_id) REFERENCES teacher (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-student-school-year
ALTER TABLE student
    ADD CONSTRAINT fk_student_school_year FOREIGN KEY (school_year_id) REFERENCES school_year (id) ON DELETE NO ACTION;
-- changeset tayeb:fk-session-subject
ALTER TABLE session
    ADD CONSTRAINT fk_session_subject FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE NO ACTION;;

-- changeset tayeb:fk-student-app-user
ALTER TABLE student
    ADD CONSTRAINT fk_student_app_user FOREIGN KEY (id) REFERENCES app_user (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-user-role-user
ALTER TABLE user_role
    ADD CONSTRAINT fk_user_role_user FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-subject-school-years-school-year
ALTER TABLE subject_school_years
    ADD CONSTRAINT fk_subject_school_years_school_year FOREIGN KEY (school_years_id) REFERENCES school_year (id) ON DELETE NO ACTION;
-- changeset tayeb:fk-payment-session
ALTER TABLE payment
    ADD CONSTRAINT fk_payment_session FOREIGN KEY (session_id) REFERENCES session (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-teacher-subjects-teacher
ALTER TABLE teacher_subjects
    ADD CONSTRAINT fk_teacher_subjects_teacher FOREIGN KEY (teacher_id) REFERENCES teacher (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-student-school-type
ALTER TABLE student
    ADD CONSTRAINT fk_student_school_type FOREIGN KEY (school_type_id) REFERENCES school_type (id) ON DELETE NO ACTION;
-- changeset tayeb:fk-session-student
ALTER TABLE session
    ADD CONSTRAINT fk_session_student FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE NO ACTION;

-- changeset tayeb:fk-subject-school-years-subject
ALTER TABLE subject_school_years
    ADD CONSTRAINT fk_subject_school_years_subject FOREIGN KEY (subjects_id) REFERENCES subject (id) ON DELETE NO ACTION;

