INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES 
    (1, '2025 Stanley Cup Winner', 1, 1, 67000, 402000,20250623000000);

INSERT INTO images (id, link) VALUES
    (1, 'https://i.imgur.com/xd1NxJz.png'),
    (2, 'https://i.imgur.com/uoovq3E.png'),
    (3, 'https://i.imgur.com/ZXcFHsQ.png'),
    (4, 'https://i.imgur.com/P5jGnut.png'),
    (5, 'https://i.imgur.com/5P74G1K.png'),
    (6, 'https://i.imgur.com/OlriRf4.png'),
    (7, 'https://i.imgur.com/i4BsAX4.png'),
    (8, 'https://i.imgur.com/YenHZ94.png'),
    (9, 'https://i.imgur.com/2K4nYu7.png'),
    (10, 'https://i.imgur.com/4YKWjGB.png'),
    (11, 'https://i.imgur.com/T6BfBmv.png'),
    (12, 'https://i.imgur.com/qfQfA2U.png'),
    (13, 'https://i.imgur.com/AqwgNhq.png'),
    (14, 'https://i.imgur.com/hpEQYkt.png'),
    (15, 'https://i.imgur.com/6VyU0Iu.jpeg'),
    (16, 'https://i.imgur.com/2hodqSo.png'),
    (17, 'https://i.imgur.com/0PLYMpP.png'),
    (18, 'https://i.imgur.com/BBp2VgZ.png'),
    (19, 'https://i.imgur.com/PMQggKr.png'),
    (21, 'https://i.imgur.com/1tvJwv3.png'),
    (22, 'https://i.imgur.com/lROI2Eg.png');

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (1, 0, 'Calgary Flames', 2000, 0, 12000, 6, 96, 15), 
    (1, 1, 'Carolina Hurricanes', 2000, 0, 12000, 6, 96, 5), 
    (1, 2, 'Colorado Avalanche', 5000, 0, 30000, 6, 96, 7), 
    (1, 3, 'Dallas Stars', 7000, 0, 42000, 6, 96, 3), 
    (1, 4, 'Edmonton Oilers', 5000, 0, 30000, 6, 96, 9), 
    (1, 5, 'Florida Panthers', 6000, 0, 36000, 6, 96, 6), 
    (1, 6, 'Los Angeles Kings', 4000, 0, 24000, 6, 96, 19),
    (1, 7, 'Minnesota Wild', 4000, 0, 24000, 6, 96, 10), 
    (1, 8, 'Montreal Canadiens', 1000, 0, 6000, 6, 96, 16), 
    (1, 9, 'New Jersey Devils', 2000, 0, 12000, 6, 96, 11), 
    (1, 10, 'New York Rangers', 2000, 0, 12000, 6, 9, 14), 
    (1, 11, 'Other', 1000, 0, 6000, 6, 96, 20), 
    (1, 12, 'Ottawa Senators', 3000, 0, 18000, 6, 96, 12), 
    (1, 13, 'St. Louis Blues', 1000, 0, 6000, 6, 96, 17), 
    (1, 14, 'Tampa Bay Lightning', 5000, 0, 30000, 6, 96, 8), 
    (1, 15, 'Toronto Maple Leafs', 3000, 0, 18000, 6, 96, 18),
    (1, 16, 'Washington Capitals', 4000, 0, 24000, 6, 96, 2), 
    (1, 17, 'Winnipeg Jets', 3000, 0, 18000, 6, 96, 1), 
    (1, 18, 'Vancouver Canucks', 3000, 0, 18000, 6, 96, 13), 
    (1, 19, 'Vegas Golden Knights', 4000, 0, 24000, 6, 96, 4); 

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (2, '2025 Most NHL Points', 1, 1, 65000, 1365000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (2, 0, 'Conner McDavid', 5000, 0, 105000, 21, 81, 9), 
    (2, 1, 'Leon Draisaitl', 20000, 0, 420000, 21, 81, 9), 
    (2, 2, 'Nathan MacKinnon', 20000, 0, 420000, 21, 81, 7), 
    (2, 3, 'Nikita Kucherov', 15000, 0, 315000, 21, 81, 8), 
    (2, 4, 'Other', 5000, 0, 105000, 21, 81, 20);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (3, '2025 Most NHL Goals', 1, 1, 70000, 1470000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (3, 1, 'Leon Draisaitl', 50000, 0, 1050000, 21, 81, 9), 
    (3, 2, 'Mark Scheifele', 5000, 0, 105000, 21, 81, 1), 
    (3, 3, 'Other', 4000, 0, 84000, 21, 81, 20), 
    (3, 4, 'Kyle Conner', 5000, 0, 105000, 21, 81, 1), 
    (3, 5, 'William Nylander', 6000, 0, 126000, 21, 81, 18);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (4, '2025 Most NHL Assists', 1, 1, 40000, 600000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (4, 1, 'Conner McDavid', 3000, 0, 45000, 15, 86, 9), 
    (4, 2, 'Jack Eichel', 3000, 0, 45000, 15, 86, 4), 
    (4, 3, 'Jesper Bratt', 3000, 0, 45000, 15, 86, 11), 
    (4, 4, 'Mitch Marner', 3000, 0, 45000, 15, 86, 18), 
    (4, 5, 'Nathan MacKinnon', 20000, 0, 300000, 15, 86, 7), 
    (4, 6, 'Nikita Kucherov', 5000, 0, 75000, 15, 86, 8), 
    (4, 7, 'Other', 3000, 0, 45000, 15, 86, 20);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (5, '2025 NHL Top +/-', 1, 1, 40000, 600000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (5, 0, 'Aliaksei Protas', 20000, 0, 300000, 15, 86, 2), 
    (5, 1, 'Artturi Lehkonen', 2500, 0, 37500, 15, 86, 7),
    (5, 2, 'Brayden McNabb', 3500, 0, 52500, 15, 86, 4), 
    (5, 3, 'Dylan Samberg', 3000, 0, 45000, 15, 86, 1), 
    (5, 4, 'Esa Lindell', 2500, 0, 37500, 15, 86, 3), 
    (5, 5, 'Gustav Forsling', 2000, 0, 30000, 15, 86, 6), 
    (5, 6, 'Other', 8000, 0, 120000, 15, 86, 20),
    (5, 7, 'Kirill Marchenko', 2500, 0, 37500, 15, 86, 22), 
    (5, 8, 'Ryan McDonagh', 4000, 0, 60000, 15, 86, 8);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (6, '2025 NHL Top PIM', 1, 1, 20000, 300000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (6, 0, 'A.J. Greer', 2000, 0, 30000, 15, 86, 6), 
    (6, 1, 'Arber Xhakaj', 2000, 0, 30000, 15, 86, 16), 
    (6, 2, 'Brady Tkachuk', 3500, 0, 52500, 15, 86, 12), 
    (6, 3, 'Mark Kastelic', 2000, 0, 30000, 15, 86, 21), 
    (6, 4, 'Mathieu Oliver', 4500, 0, 67500, 15, 86, 22), 
    (6, 5, 'Nikita Zadorov', 5000, 0, 75000, 15, 86, 21), 
    (6, 6, 'Other', 1000, 0, 15000, 15, 86, 20);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (7, '2025 NHL Team Most Points', 1, 1, 25000, 300000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (7, 0, 'Carolina Hurricanes', 1000, 0, 11000, 11, 91, 5), 
    (7, 1, 'Colorado Avalanche', 500, 0, 5500, 11, 91, 7), 
    (7, 2, 'Dallas Stars', 1000, 0, 11000, 11, 91, 3), 
    (7, 3, 'Edmonton Oilers', 500, 0, 5500, 11, 91, 9),
    (7, 4, 'Florida Panthers', 500, 0, 5500, 11, 91, 6), 
    (7, 5, 'Other', 500, 0, 5500, 11, 91, 20),
    (7, 6, 'Tampa Bay Lightning', 500, 0, 5500, 11, 91, 8), 
    (7, 7, 'Vegas Golden Knights', 1000, 0, 11000, 11, 91, 4), 
    (7, 8, 'Washington Capitals', 9500, 0, 104500, 11, 91, 2), 
    (7, 9, 'Winnipeg Jets', 10000, 0, 110000, 11, 91, 1);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (8, '2025 Leafs Playoff Result', 1, 1, 11400, 300000, 20250623000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (8, 0, 'First Round Exit', 10000, 0, 170000, 17, 84, 18),
    (8, 1, 'Fourth Round Exit', 100, 0, 1700, 17, 84, 18),
    (8, 2, 'No Playoffs', 100, 0, 1700, 17, 84, 18),
    (8, 3, 'Second Round Exit', 1000, 0, 17000, 17, 84, 18),
    (8, 4, 'Stanley Cup Winner', 100, 0, 1700, 17, 84, 18),
    (8, 5, 'Third Round Exit', 100, 0, 1700, 17, 84, 18);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (9, '2025 Panthers Playoff Result', 1, 1, 510, 300000, 20250623000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (9, 0, 'First Round Exit', 100, 0, 1700, 17, 84, 6),
    (9, 1, 'Fourth Round Exit', 100, 0, 1700, 17, 84, 6),
    (9, 2, 'No Playoffs', 10, 0, 170, 17, 84, 6),
    (9, 3, 'Second Round Exit', 100, 0, 1700, 17, 84, 6),
    (9, 4, 'Stanley Cup Winner', 100, 0, 1700, 17, 84, 6),
    (9, 5, 'Third Round Exit', 100, 0, 1700, 17, 84, 6);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (10, '2025 NHL Most Wins', 1, 1, 84000, 1260000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (10, 0, 'Carolina Hurricanes', 11000, 0, 165000, 15, 86, 5), 
    (10, 1, 'Colorado Avalanche', 11000, 0, 165000, 15, 86, 7), 
    (10, 2, 'Dallas Stars', 11000, 0, 165000, 15, 86, 3), 
    (10, 3, 'Florida Panthers', 11000, 0, 165000, 15, 86, 6), 
    (10, 4, 'Other', 9000, 0, 135000, 15, 86, 20),
    (10, 5, 'Washington Capitals', 14000, 0, 210000, 15, 86, 2), 
    (10, 6, 'Winnipeg Jets', 17000, 0, 255000, 15, 86, 1);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (11, 'Mitch Marner at Leafs', 1, 1, 1400, 71400, 20251031000000);
INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (11, 0, 'Nope', 700, 0, 35700, 51, 51, 20),
    (11, 1, 'Toronto Maple Leafs', 700, 0, 35700, 51, 51, 18);





INSERT INTO images (id, link) VALUES
    (33, 'https://i.imgur.com/nayTIh2.jpeg'),
    (34, 'https://i.imgur.com/4Rw1ZM7.jpeg'),
    (35, 'https://i.imgur.com/kN3WMUi.jpeg');

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (12, '2025 Fed Rate Cut Count', 3, 1, 10200, 122400, 20260101000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (12, 0, '0', 800, 0, 800, 12, 89, 33), 
    (12, 1, '1 (25 bps)', 1300, 0, 75000, 12, 89, 33), 
    (12, 2, '2 (50 bps)', 2200, 0, 45000, 12, 89, 33), 
    (12, 3, '3 (75 bps)', 2300, 0, 45000, 12, 89, 33), 
    (12, 4, '4 (100 bps)', 1500, 0, 45000, 12, 89, 33), 
    (12, 5, '5 (125 bps)', 600, 0, 45000, 12, 89, 33), 
    (12, 6, '6 (150 bps)', 400, 0, 45000, 12, 89, 33), 
    (12, 7, '7 (175 bps)', 300, 0, 45000, 12, 89, 33), 
    (12, 8, '8+ (200+ bps)', 800, 0, 45000, 12, 89, 33);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (13, 'TikTok Sale Before June 2025', 3, 1, 1020, 52020, 20250601000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (13, 0, 'No', 670, 0, 34170, 51, 51, 34),
    (13, 1, 'Yes', 350, 0, 17850, 51, 51, 34);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (14, '2025 Closing Price of Gold', 3, 1, 10400, 218400, 20260101000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (14, 5, '< $2,500', 1900, 0, 39900, 21, 81, 35), 
    (14, 1, '$2,500 - $2,700', 700, 0, 14700, 21, 81, 35), 
    (14, 2, '$2,700 - $2,900', 800, 0, 16800, 21, 81, 35), 
    (14, 3, '$2,900 - $3,100', 1500, 0, 31500, 21, 81, 35), 
    (14, 4, '$3,100+', 5500, 0, 115500, 21, 81, 35);
