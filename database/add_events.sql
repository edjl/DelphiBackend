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
    (20, 'https://i.imgur.com/ziTIhZy.png'),
    (21, 'https://i.imgur.com/1tvJwv3.png'),
    (22, 'https://i.imgur.com/lROI2Eg.png');

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (1, 1, 'Winnipeg Jets', 3000, 0, 18000, 6, 96, 1), 
    (1, 2, 'Washington Capitals', 4000, 0, 24000, 6, 96, 2), 
    (1, 3, 'Dallas Stars', 7000, 0, 42000, 6, 96, 3), 
    (1, 4, 'Vegas Golden Knights', 4000, 0, 24000, 6, 96, 4), 
    (1, 5, 'Carolina Hurricanes', 2000, 0, 12000, 6, 96, 5), 
    (1, 6, 'Florida Panthers', 6000, 0, 36000, 6, 96, 6), 
    (1, 7, 'Colorado Avalanche', 5000, 0, 30000, 6, 96, 7), 
    (1, 8, 'Tampa Bay Lightning', 5000, 0, 30000, 6, 96, 8), 
    (1, 9, 'Edmonton Oilers', 5000, 0, 30000, 6, 96, 9), 
    (1, 10, 'Minnesota Wild', 4000, 0, 24000, 6, 96, 10), 
    (1, 11, 'New Jersey Devils', 2000, 0, 12000, 6, 96, 11), 
    (1, 12, 'Ottawa Senators', 3000, 0, 18000, 6, 96, 12), 
    (1, 13, 'Vancouver Canucks', 3000, 0, 18000, 6, 96, 13), 
    (1, 14, 'New York Rangers', 2000, 0, 12000, 6, 9, 14), 
    (1, 15, 'Calgary Flames', 2000, 0, 12000, 6, 96, 15), 
    (1, 16, 'Montreal Canadiens', 1000, 0, 6000, 6, 96, 16), 
    (1, 17, 'St. Louis Blues', 1000, 0, 6000, 6, 96, 17), 
    (1, 18, 'Toronto Maple Leafs', 3000, 0, 18000, 6, 96, 18),
    (1, 19, 'Los Angeles Kings', 4000, 0, 24000, 6, 96, 19),
    (1, 20, 'Other', 1000, 0, 6000, 6, 96, 20); 

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (2, '2025 Most NHL Points', 1, 1, 65000, 1365000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (2, 1, 'Nathan MacKinnon', 20000, 0, 420000, 21, 81, 7), 
    (2, 2, 'Leon Draisaitl', 20000, 0, 420000, 21, 81, 9), 
    (2, 3, 'Nikita Kucherov', 15000, 0, 315000, 21, 81, 8), 
    (2, 4, 'Conner McDavid', 5000, 0, 105000, 21, 81, 9), 
    (2, 5, 'Other', 5000, 0, 105000, 21, 81, 20);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (3, '2025 Most NHL Goals', 1, 1, 70000, 1470000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (3, 1, 'Leon Draisaitl', 50000, 0, 1050000, 21, 81, 9), 
    (3, 2, 'William Nylander', 6000, 0, 126000, 21, 81, 18), 
    (3, 3, 'Kyle Conner', 5000, 0, 105000, 21, 81, 1), 
    (3, 4, 'Mark Scheifele', 5000, 0, 105000, 21, 81, 1), 
    (3, 5, 'Other', 4000, 0, 84000, 21, 81, 20);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (4, '2025 Most NHL Assists', 1, 1, 40000, 600000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (4, 1, 'Nathan MacKinnon', 20000, 0, 300000, 15, 86, 7), 
    (4, 2, 'Nikita Kucherov', 5000, 0, 75000, 15, 86, 8), 
    (4, 3, 'Conner McDavid', 3000, 0, 45000, 15, 86, 9), 
    (4, 4, 'Jesper Bratt', 3000, 0, 45000, 15, 86, 11), 
    (4, 5, 'Mitch Marner', 3000, 0, 45000, 15, 86, 18), 
    (4, 6, 'Jack Eichel', 3000, 0, 45000, 15, 86, 4), 
    (4, 7, 'Other', 3000, 0, 45000, 15, 86, 20);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (5, '2025 NHL Top +/-', 1, 1, 40000, 600000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (5, 1, 'Aliaksei Protas', 20000, 0, 300000, 15, 86, 2), 
    (5, 2, 'Ryan McDonagh', 4000, 0, 60000, 15, 86, 8), 
    (5, 3, 'Brayden McNabb', 3500, 0, 52500, 15, 86, 4), 
    (5, 4, 'Dylan Samberg', 3000, 0, 45000, 15, 86, 1), 
    (5, 5, 'Artturi Lehkonen', 2500, 0, 37500, 15, 86, 7), 
    (5, 6, 'Kirill Marchenko', 2500, 0, 37500, 15, 86, 22), 
    (5, 7, 'Esa Lindell', 2500, 0, 37500, 15, 86, 3), 
    (5, 8, 'Gustav Forsling', 2000, 0, 30000, 15, 86, 6), 
    (5, 9, 'Other', 8000, 0, 120000, 15, 86, 20);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (6, '2025 NHL Top PIM', 1, 1, 20000, 300000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (6, 1, 'Nikita Zadorov', 5000, 0, 75000, 15, 86, 21), 
    (6, 2, 'Mathieu Oliver', 4500, 0, 67500, 15, 86, 22), 
    (6, 3, 'Brady Tkachuk', 3500, 0, 52500, 15, 86, 12), 
    (6, 4, 'Mark Kastelic', 2000, 0, 30000, 15, 86, 21), 
    (6, 5, 'Arber Xhakaj', 2000, 0, 30000, 15, 86, 16), 
    (6, 6, 'A.J. Greer', 2000, 0, 30000, 15, 86, 6), 
    (6, 7, 'Other', 1000, 0, 15000, 15, 86, 20);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (7, '2025 NHL Team Most Points', 1, 1, 25000, 300000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (7, 1, 'Winnipeg Jets', 10000, 0, 110000, 11, 91, 1), 
    (7, 2, 'Washington Capitals', 9500, 0, 104500, 11, 91, 2), 
    (7, 3, 'Dallas Stars', 1000, 0, 11000, 11, 91, 3), 
    (7, 4, 'Vegas Golden Knights', 1000, 0, 11000, 11, 91, 4), 
    (7, 5, 'Carolina Hurricanes', 1000, 0, 11000, 11, 91, 5), 
    (7, 6, 'Florida Panthers', 500, 0, 5500, 11, 91, 6), 
    (7, 7, 'Colorado Avalanche', 500, 0, 5500, 11, 91, 7), 
    (7, 8, 'Tampa Bay Lightning', 500, 0, 5500, 11, 91, 8), 
    (7, 9, 'Edmonton Oilers', 500, 0, 5500, 11, 91, 9),
    (7, 10, 'Other', 500, 0, 5500, 11, 91, 20);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (8, '2025 Leafs Playoff Result', 1, 1, 11400, 300000, 20250623000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (8, 0, 'No Playoffs', 100, 0, 1700, 17, 84, 18),
    (8, 1, 'First Round Exit', 10000, 0, 170000, 17, 84, 18),
    (8, 2, 'Second Round Exit', 1000, 0, 17000, 17, 84, 18),
    (8, 3, 'Third Round Exit', 100, 0, 1700, 17, 84, 18),
    (8, 4, 'Fourth Round Exit', 100, 0, 1700, 17, 84, 18),
    (8, 5, 'Stanley Cup Winner', 100, 0, 1700, 17, 84, 18);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (9, '2025 Panthers Playoff Result', 1, 1, 510, 300000, 20250623000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (9, 0, 'No Playoffs', 10, 0, 170, 17, 84, 6),
    (9, 1, 'First Round Exit', 100, 0, 1700, 17, 84, 6),
    (9, 2, 'Second Round Exit', 100, 0, 1700, 17, 84, 6),
    (9, 3, 'Third Round Exit', 100, 0, 1700, 17, 84, 6),
    (9, 4, 'Fourth Round Exit', 100, 0, 1700, 17, 84, 6),
    (9, 5, 'Stanley Cup Winner', 100, 0, 1700, 17, 84, 6);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (10, '2025 NHL Most Wins', 1, 1, 84000, 1260000, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (10, 1, 'Winnipeg Jets', 17000, 0, 255000, 15, 86, 1), 
    (10, 2, 'Washington Capitals', 14000, 0, 210000, 15, 86, 2), 
    (10, 3, 'Dallas Stars', 11000, 0, 165000, 15, 86, 3), 
    (10, 4, 'Other', 9000, 0, 135000, 15, 86, 20), 
    (10, 5, 'Carolina Hurricanes', 11000, 0, 165000, 15, 86, 5), 
    (10, 6, 'Florida Panthers', 11000, 0, 165000, 15, 86, 6), 
    (10, 7, 'Colorado Avalanche', 11000, 0, 165000, 15, 86, 7);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (11, '2026 Marner at Leafs', 1, 1, 84000, 1260000, 20251031000000);
INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (11, 1, 'Toronto Maple Leafs', 700, 0, 35700, 51, 51, 18), 
    (11, 2, 'Nope', 700, 0, 35700, 51, 51, 20);





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
    (13, 'TikTok Sale Before May 2025', 3, 1, 1020, 52020, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (13, 0, 'Yes', 350, 0, 17850, 51, 51, 34), 
    (13, 1, 'No', 670, 0, 34170, 51, 51, 34);

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (14, '2025 Closing Price of Gold', 3, 1, 10400, 218400, 20260101000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (14, 0, '< $2,500', 1900, 0, 39900, 21, 81, 35), 
    (14, 1, '$2,500 - $2,700', 700, 0, 14700, 21, 81, 35), 
    (14, 2, '$2,700 - $2,900', 800, 0, 16800, 21, 81, 35), 
    (14, 3, '$2,900 - $3,100', 1500, 0, 31500, 21, 81, 35), 
    (14, 4, '3,100+', 5500, 0, 115500, 21, 81, 35);
