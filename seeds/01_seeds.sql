
INSERT INTO users ( name, email, password )
VALUES ('Charlie', 'replaceEmail@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Sarah', 'replace@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Helga', 'email.Email@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url,cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'title1', 'someDescription', 'thumbnailphoto', 'cover-photo', 500, 2, 3, 'Canada', '65 west Street', 'Edmonton', 't5c 3b2', true),
 (1, 'title2', 'someDescription', 'handle', 'cover-photo', 1000, 2, 1, 'United States', '93 west Street', 'Edmonton', 't3c 0b2', true),
(1, 'title3', 'someDescription', 'photo', 'cover-photo', 250, 2, 2, 'Canada', '65 west Street', 'Edmonton', 't3c 0b2', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES  (1, 1, 1, 4, 'message-text-here'),
(2, 2, 2, 5, 'message-text-here'),
(3, 3, 3, 2, 'message-text-here');



/*This is the password for everything*/
/*  $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.*/

