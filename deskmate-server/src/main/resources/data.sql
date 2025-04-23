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

INSERT INTO buildings (name) VALUES ('A1');

INSERT INTO floors (building_id, plan, name)
VALUES (1, 1, 'F1');

INSERT INTO seats (x, y)
VALUES (0, 0), (10, 10), (50, 30), (20, 30), (100, 60);

INSERT INTO seat_floor_links (floor_id, seat_id)
VALUES (1, 1), (1, 2), (1, 3), (1, 4), (1, 5);