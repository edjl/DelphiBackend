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
    (20, 'https://i.imgur.com/ziTIhZy.png');

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
    (2, 'NHL Most Regular Season Points', 1, 1, 65000, 1365000, 20250418000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (2, 1, 'Nathan MacKinnon', 20000, 0, 420000, 21, 81, 7), 
    (2, 2, 'Leon Draisaitl', 20000, 0, 420000, 21, 81, 9), 
    (2, 3, 'Nikita Kucherov', 15000, 0, 315000, 21, 81, 8), 
    (2, 4, 'Conner McDavid', 5000, 0, 105000, 21, 81, 9), 
    (2, 5, 'Other', 5000, 0, 105000, 21, 81, 20);