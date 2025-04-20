-- Password: 'password'

INSERT INTO users (login, email, password, role, is_locked)
VALUES ('admin', 'admin@example.com', '$2a$10$paWcoAGkFwu.rAeNNcfPv.FfRelOjwSuYw/iacp3HCbLpkuJN86iO', 'ADMINISTRATOR', false);

INSERT INTO users (login, email, password, role, is_locked)
VALUES ('user1', 'user1@example.com', '$2a$10$paWcoAGkFwu.rAeNNcfPv.FfRelOjwSuYw/iacp3HCbLpkuJN86iO', 'OFFICE_WORKER', false);

INSERT INTO users (login, email, password, role, is_locked)
VALUES ('user2', 'user2@example.com', '$2a$10$paWcoAGkFwu.rAeNNcfPv.FfRelOjwSuYw/iacp3HCbLpkuJN86iO', 'OFFICE_WORKER', false);

INSERT INTO users (login, email, password, role, is_locked)
VALUES ('user3', 'user3@example.com', '$2a$10$paWcoAGkFwu.rAeNNcfPv.FfRelOjwSuYw/iacp3HCbLpkuJN86iO', 'OFFICE_WORKER', false);

INSERT INTO assets (name, path, mime_type)
VALUES ('office-plan.png', 'office-plan.png', 'image/png');