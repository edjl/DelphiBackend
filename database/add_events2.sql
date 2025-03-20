
-- 3 = economics, 2 = politics YYYYMMDD000000
-- stock price x # shares = market cap
-- individual market cap summed up = overall market cap

-- E1
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (15, 'June 2025 Canadian Unemployment Rate', 3, 1, 12000, 192000, 20250630000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (15, 0, '< 4.0%', 1900, 0, 40000, 16, 81, __), 
    (15, 1, '4.0% - 4.1%', 700, 0, 24700, 16, 81, __), 
    (15, 2, '4.2% - 4.3%', 800, 0, 16800, 16, 81, __), 
    (15, 3, '4.4% - 4.5%', 900, 0, 42500, 16, 81, __),
    (15, 4, '4.6% - 4.7%', 800, 0, 15500, 16, 81, __),
    (15, 5, '4.8% - 4.9%', 5700, 0, 15700, 16, 81, __), 
    (15, 6, '> 5.0%', 1200, 0, 36800, 16, 81, __);

-- E2
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (16, 'June 2024-June 2025 Inflation Rate', 3, 1, 11810, 236200, 20250630000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (16, 0, '< 2.40%', 1900, 0, 74000, 20, 81, __), 
    (16, 1, '2.40% - 2.70%', 700, 0, 44700, 20, 81, __), 
    (16, 2, '2.71% - 3.00%', 800, 0, 29800, 20, 81, __), 
    (16, 3, '3.01% - 3.30%', 900, 0, 59500, 20, 81, __),
    (16, 4, '3.31% - 3.60%', 800, 0, 12500, 20, 81, __),
    (16, 5, '> 3.60%', 5700, 0, 15700, 20, 81, __);

-- E3
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (17, 'Will the S&P be higher or lower in 12 months', 3, 1, 1410, 42300, 20260531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (17, 0, 'Higher', 900, 0, 26600, 30, 81, __), 
    (17, 1, 'Lower', 510, 0, 15700, 30, 81, __);

-- E4
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (18, '2025 Canadian GDP Growth Rate', 3, 1, 4800, 57600, 20251231000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (18, 0, '< -5.0%', 480, 0, 4000, 12, 68, __), 
    (18, 1, '-5.0% - 3.0%', 700, 0, 2700, 12, 68, __), 
    (18, 2, '-2.9% - 0.0%', 800, 0, 16800, 12, 68, __), 
    (18, 3, '0.1% - 3.0%', 390, 0, 4500, 12, 68, __),
    (18, 4, '3.1% - 5.0%', 430, 0, 15800, 12, 68, __),
    (18, 5, '5.1% - 7.0%', 800, 0, 11700, 12, 68, __), 
    (18, 6, '> 7.0%', 1200, 0, 2100, 12, 68, __);

-- E5
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (19, 'Will new trade deal signed between Canada and USA by June 2025', 3, 1, 1690, 23660, 20250501000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (19, 0, 'Yes', 1200, 0, 18060, 14, 48, __), 
    (19, 1, 'No', 490, 0, 5600, 14, 48, __);


-- E7
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (20, '2025 USA GDP Growth Rate', 3, 1, 4800, 57600, 20251231000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (20, 0, '< -5.0%', 480, 0, 4000, 12, 68, __), 
    (20, 1, '-5.0% - 3.0%', 700, 0, 2700, 12, 68, __), 
    (20, 2, '-2.9% - 0.0%', 800, 0, 16800, 12, 68, __), 
    (20, 3, '0.1% - 3.0%', 390, 0, 4500, 12, 68, __),
    (20, 4, '3.1% - 5.0%', 430, 0, 15800, 12, 68, __),
    (20, 5, '5.1% - 7.0%', 800, 0, 11700, 12, 68, __), 
    (20, 6, '> 7.0%', 1200, 0, 2100, 12, 68, __);

-- E8
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (21, 'June 2025 Real Personal Consumption Expenditures (PCE) change Canada', 3, 1, 6480, 90720, 20250531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (21, 0, '< 0.2%', 970, 0, 16620, 14, 68, __), 
    (21, 1, '0.2% - 0.3%', 1700, 0, 27000, 14, 68, __), 
    (21, 2, '0.4% - 0.5%', 200, 0, 16800, 14, 68, __), 
    (21, 3, '0.6% - 0.7%', 3190, 0, 14500, 14, 68, __),
    (21, 4, '> 0.7%', 420, 0, 15800, 14, 68, __);

-- P1
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (22, 'USA Federal Election Winning Party', 2, 1, 12000, 396000, 20281107000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (22, 0, 'Democrats', 6000, 0, 180600, 33, 48, __), 
    (22, 1, 'Republicans', 6000, 0, 215400, 33, 48, __);

-- P2
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (23, 'Will Trump be impeached before the end of his term', 2, 1, 12000, 396000, 20281107000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (23, 0, 'Yes', 6000, 0, 180600, 33, 48, __), 
    (23, 1, 'No', 6000, 0, 215400, 33, 48, __);

-- P3
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (24, 'Canadian Federal Election party with most seats', 2, 1, 7660, 199160, 20250531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (24, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, __), 
    (24, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, __), 
    (24, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, __), 
    (24, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, __),
    (24, 4, 'Green Party', 800, 0, 38000, 26, 68, __),
    (24, 5, 'Peoples Party', 420, 0, 15000, 26, 68, __),
    (24, 6, 'Other', 750, 0, 23160, 26, 68, __);

-- P4
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (25, 'Canadian Federal Election Popular vote', 2, 1, 7660, 199160, 20250531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (25, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, __), 
    (25, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, __), 
    (25, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, __), 
    (25, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, __),
    (25, 4, 'Green Party', 800, 0, 38000, 26, 68, __),
    (25, 5, 'Peoples Party', 420, 0, 15000, 26, 68, __),
    (25, 6, 'Other', 750, 0, 23160, 26, 68, __);

-- P5
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (26, 'Canadian Prime Minister Election Results 2025', 2, 1, 7660, 199160, 20250531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (26, 0, 'Mark Carney', 1400, 0, 40000, 26, 68, __), 
    (26, 1, 'Pierre Poilievre', 1700, 0, 27000, 26, 68, __), 
    (26, 2, 'Yves-François Blanchet', 1100, 0, 11000, 26, 68, __), 
    (26, 3, 'Jagmeet Singh', 1490, 0, 45000, 26, 68, __),
    (26, 4, 'Elizabeth May', 800, 0, 38000, 26, 68, __),
    (26, 5, 'Maxime Bernier', 420, 0, 15000, 26, 68, __),
    (26, 6, 'Other', 750, 0, 23160, 26, 68, __);

-- P6
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (27, 'Ontario Provincial Election party with most seats', 2, 1, 7660, 199160, 20250531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (27, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, __), 
    (27, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, __), 
    (27, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, __), 
    (27, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, __),
    (27, 4, 'Green Party', 800, 0, 38000, 26, 68, __),
    (27, 5, 'Peoples Party', 420, 0, 15000, 26, 68, __),
    (27, 6, 'Other', 750, 0, 23160, 26, 68, __);
    
-- P7
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (28, 'British Columbia Provincial Election party with most seats', 2, 1, 7660, 199160, 20250531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (28, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, __), 
    (28, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, __), 
    (28, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, __), 
    (28, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, __),
    (28, 4, 'Green Party', 800, 0, 38000, 26, 68, __),
    (28, 5, 'Peoples Party', 420, 0, 15000, 26, 68, __),
    (28, 6, 'Other', 750, 0, 23160, 26, 68, __);

-- P8
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (29, 'Alberta Provincial Election party with most seats', 2, 1, 7660, 199160, 20250531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (29, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, __), 
    (29, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, __), 
    (29, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, __), 
    (29, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, __),
    (29, 4, 'Green Party', 800, 0, 38000, 26, 68, __),
    (29, 5, 'Peoples Party', 420, 0, 15000, 26, 68, __),
    (29, 6, 'Other', 750, 0, 23160, 26, 68, __);


-- P9
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (30, 'Ontario Provincial Election Popular vote', 2, 1, 7660, 199160, 20250531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (30, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, __), 
    (30, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, __), 
    (30, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, __), 
    (30, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, __),
    (30, 4, 'Green Party', 800, 0, 38000, 26, 68, __),
    (30, 5, 'Peoples Party', 420, 0, 15000, 26, 68, __),
    (30, 6, 'Other', 750, 0, 23160, 26, 68, __);

-- P10
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (31, 'British Columbia Provincial Election Popular vote', 2, 1, 7660, 199160, 20250531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (31, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, __), 
    (31, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, __), 
    (31, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, __), 
    (31, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, __),
    (31, 4, 'Green Party', 800, 0, 38000, 26, 68, __),
    (31, 5, 'Peoples Party', 420, 0, 15000, 26, 68, __),
    (31, 6, 'Other', 750, 0, 23160, 26, 68, __);

-- P11
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (32, 'Alberta Provincial Election Popular vote', 2, 1, 7660, 199160, 20250531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (32, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, __), 
    (32, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, __), 
    (32, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, __), 
    (32, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, __),
    (32, 4, 'Green Party', 800, 0, 38000, 26, 68, __),
    (32, 5, 'Peoples Party', 420, 0, 15000, 26, 68, __),
    (32, 6, 'Other', 750, 0, 23160, 26, 68, __);
