-- liquibase formatted sql

-- changeset guesmi:1722722592227-1
CREATE SEQUENCE IF NOT EXISTS app_user_id_seq INCREMENT BY 1;

-- changeset guesmi:1722722592227-2
CREATE SEQUENCE IF NOT EXISTS config_id_seq INCREMENT BY 1;

-- changeset guesmi:1722722592227-3
CREATE SEQUENCE IF NOT EXISTS payment_id_seq INCREMENT BY 1;

-- changeset guesmi:1722722592227-4
CREATE SEQUENCE IF NOT EXISTS role_id_seq INCREMENT BY 1;

-- changeset guesmi:1722722592227-5
CREATE SEQUENCE IF NOT EXISTS school_type_id_seq INCREMENT BY 1;

-- changeset guesmi:1722722592227-6
CREATE SEQUENCE IF NOT EXISTS school_year_id_seq INCREMENT BY 1;

-- changeset guesmi:1722722592227-7
CREATE SEQUENCE IF NOT EXISTS session_id_seq INCREMENT BY 1;

-- changeset guesmi:1722722592227-8
CREATE SEQUENCE IF NOT EXISTS subject_id_seq INCREMENT BY 1;

-- changeset guesmi:1722722592227-9
CREATE SEQUENCE IF NOT EXISTS verification_code_id_seq INCREMENT BY 1;

-- changeset guesmi:1722722592227-10
CREATE TABLE app_user
(
    is_verified        BOOLEAN,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    email              VARCHAR(255)                            NOT NULL,
    first_name         VARCHAR(255),
    last_name          VARCHAR(255),
    password           VARCHAR(255),
    profile_picture    VARCHAR(255),
    CONSTRAINT app_user_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-11
CREATE TABLE config
(
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    description        VARCHAR(255),
    key                VARCHAR(255),
    value              VARCHAR(255),
    CONSTRAINT config_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-12
CREATE TABLE payment
(
    admin_share        numeric(19, 2)                          NOT NULL,
    is_teacher_paid    BOOLEAN                                 NOT NULL,
    teacher_share      numeric(19, 2)                          NOT NULL,
    total              numeric(19, 2)                          NOT NULL,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    session_id         BIGINT,
    CONSTRAINT payment_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-13
CREATE TABLE role
(
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    name               VARCHAR(255)                            NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-14
CREATE TABLE school_type
(
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    description        VARCHAR(255),
    name               VARCHAR(255),
    CONSTRAINT school_type_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-15
CREATE TABLE school_year
(
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    description        VARCHAR(255),
    name               VARCHAR(255),
    CONSTRAINT school_year_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-16
CREATE TABLE session
(
    price              numeric(19, 2)                          NOT NULL,
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    duration           BIGINT                                  NOT NULL,
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    start_time         TIMESTAMP WITHOUT TIME ZONE             NOT NULL,
    student_id         BIGINT                                  NOT NULL,
    teacher_id         BIGINT                                  NOT NULL,
    description        VARCHAR(255)                            NOT NULL,
    meeting_link       VARCHAR(255)                            NOT NULL,
    status             VARCHAR(255)                            NOT NULL,
    title              VARCHAR(255)                            NOT NULL,
    CONSTRAINT session_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-17
CREATE TABLE student
(
    id             BIGINT NOT NULL,
    school_type_id BIGINT,
    school_year_id BIGINT NOT NULL,
    CONSTRAINT student_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-18
CREATE TABLE subject
(
    created_date       TIMESTAMP WITHOUT TIME ZONE,
    id                 BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    last_modified_date TIMESTAMP WITHOUT TIME ZONE,
    description        VARCHAR(255),
    name               VARCHAR(255),
    CONSTRAINT subject_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-19
CREATE TABLE subject_school_types
(
    school_types_id BIGINT NOT NULL,
    subjects_id     BIGINT NOT NULL,
    CONSTRAINT subject_school_types_pkey PRIMARY KEY (school_types_id, subjects_id)
);

-- changeset guesmi:1722722592227-20
CREATE TABLE subject_school_years
(
    school_years_id BIGINT NOT NULL,
    subjects_id     BIGINT NOT NULL,
    CONSTRAINT subject_school_years_pkey PRIMARY KEY (school_years_id, subjects_id)
);

-- changeset guesmi:1722722592227-21
CREATE TABLE subject_teachers
(
    subject_id  BIGINT NOT NULL,
    teachers_id BIGINT NOT NULL,
    CONSTRAINT subject_teachers_pkey PRIMARY KEY (subject_id, teachers_id)
);

-- changeset guesmi:1722722592227-22
CREATE TABLE teacher
(
    pay_rate numeric(19, 2) NOT NULL,
    id       BIGINT         NOT NULL,
    CONSTRAINT teacher_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-23
CREATE TABLE user_role
(
    role_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT user_role_pkey PRIMARY KEY (role_id, user_id)
);

-- changeset guesmi:1722722592227-24
CREATE TABLE verification_code
(
    created_at TIMESTAMP WITHOUT TIME ZONE             NOT NULL,
    expires_at TIMESTAMP WITHOUT TIME ZONE             NOT NULL,
    id         BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id    BIGINT,
    code       VARCHAR(255)                            NOT NULL,
    CONSTRAINT verification_code_pkey PRIMARY KEY (id)
);

-- changeset guesmi:1722722592227-25
ALTER TABLE app_user
    ADD CONSTRAINT app_user_email_key UNIQUE (email);

-- changeset guesmi:1722722592227-26
ALTER TABLE payment
    ADD CONSTRAINT payment_session_id_key UNIQUE (session_id);

-- changeset guesmi:1722722592227-27
ALTER TABLE role
    ADD CONSTRAINT role_name_key UNIQUE (name);

-- changeset guesmi:1722722592227-28
ALTER TABLE verification_code
    ADD CONSTRAINT verification_code_user_id_key UNIQUE (user_id);

-- changeset guesmi:1722722592227-29
ALTER TABLE subject_teachers
    ADD CONSTRAINT fk39ki9keu3ttg49xncj4dv2222 FOREIGN KEY (subject_id) REFERENCES subject (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-30
ALTER TABLE subject_school_types
    ADD CONSTRAINT fk3j7ewqju4pipg8d21ll675hoi FOREIGN KEY (school_types_id) REFERENCES school_type (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-31
ALTER TABLE verification_code
    ADD CONSTRAINT fk5x3trr4v4hkkm8me8a3irxgdc FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-32
ALTER TABLE subject_school_types
    ADD CONSTRAINT fk9c4i54hvv47yll5np6ccf72m1 FOREIGN KEY (subjects_id) REFERENCES subject (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-33
ALTER TABLE teacher
    ADD CONSTRAINT fka02skk7g6b5hud3t5rv19i7v1 FOREIGN KEY (id) REFERENCES app_user (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-34
ALTER TABLE user_role
    ADD CONSTRAINT fka68196081fvovjhkek5m97n3y FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-35
ALTER TABLE session
    ADD CONSTRAINT fkc58t0jaw2hy0utcp0ibau3xv4 FOREIGN KEY (teacher_id) REFERENCES teacher (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-36
ALTER TABLE student
    ADD CONSTRAINT fkdxyfgq28bsehj1a5q2j7obxh7 FOREIGN KEY (school_year_id) REFERENCES school_year (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-37
ALTER TABLE student
    ADD CONSTRAINT fkf3h8khcoy05roep7red9e3rpi FOREIGN KEY (id) REFERENCES app_user (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-38
ALTER TABLE user_role
    ADD CONSTRAINT fkg7fr1r7o0fkk41nfhnjdyqn7b FOREIGN KEY (user_id) REFERENCES app_user (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-39
ALTER TABLE subject_school_years
    ADD CONSTRAINT fkhyff4m9j44cqey53pgl4mj0ja FOREIGN KEY (school_years_id) REFERENCES school_year (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-40
ALTER TABLE payment
    ADD CONSTRAINT fkikhatxlx2rafmi8n9igbsb3x0 FOREIGN KEY (session_id) REFERENCES session (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-41
ALTER TABLE student
    ADD CONSTRAINT fkkggcexy026twnyi88ribl6fpl FOREIGN KEY (school_type_id) REFERENCES school_type (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-42
ALTER TABLE session
    ADD CONSTRAINT fklfnw60b48fdgrw9akicyyv8lw FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-43
ALTER TABLE subject_school_years
    ADD CONSTRAINT fkonak4pyglbusod0kbrvak4us2 FOREIGN KEY (subjects_id) REFERENCES subject (id) ON DELETE NO ACTION;

-- changeset guesmi:1722722592227-44
ALTER TABLE subject_teachers
    ADD CONSTRAINT fkpcodt35y5hb3tpa5ie4crpp3q FOREIGN KEY (teachers_id) REFERENCES teacher (id) ON DELETE NO ACTION;

