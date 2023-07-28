

INSERT INTO users ( name, email, password )
Values ("charlie", "Gmail@gmail.com", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
("Sarah", "Hmail@gmail.com", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
("Javier", "seomthing.mail@gmail.com", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.");

INSERT INTO properties (owner_id, title, description, thubnail_photo_url, cover_photo_url,cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES ( 1,"Database", "This is some description text.", "thumbnail", "Look at me I'm a photo.", 300, 2, 2, 3, "Canada", "4321 North Pole lane", "Not British Columbia", "T4H H2L", TRUE),
 ( 2, "Web Application", "This is another description.", "handle", "Check out this image.", 150, 5, 1, 4, "United States", "123 Main Street", "Anytown", "ABC 123", TRUE),
( 3, "Mobile App", "Here's some random description.", "thumbnail", "A cool picture here.", 500, 3, 4, 1, "Australia", "789 High Street", "Sometown", "XYZ 789", TRUE);


INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);


INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES  ( 101, 201, 301, 4, "Great place to stay! The view from the property was breathtaking."),
( 102, 202, 302, 5, "Amazing experience! The property was well-maintained, and the host was very friendly."),
( 104, 204, 304, 2, "Not satisfied. The property had issues with plumbing and cleanliness.");












/*This is the password for everything*/
/*  $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.*/

