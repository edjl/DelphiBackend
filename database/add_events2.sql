
-- 3 = economics, 2 = politics YYYYMMDD000000
-- stock price x # shares = market cap
-- individual market cap summed up = overall market cap

INSERT INTO images (id, link) VALUES
    -- Liberal
    (136, 'https://imgur.com/T8DziYB'),
    -- Conservative Party
    (137, 'https://imgur.com/wAfBmnx'),
    -- Bloc
    (138, 'https://imgur.com/eDnmARs'),
    -- NDP
    (139, 'https://imgur.com/JtwLXfq'),
    -- Green
    (140, 'https://imgur.com/Up86PWB'),
    -- Peoples
    (141, 'https://imgur.com/0zIWQhK'),
    -- Democrats
    (142, 'https://imgur.com/lVgo32S'),
    -- Republicans
    (143, 'https://imgur.com/D04KPRH'),
    -- Higher    
    (144, 'https://imgur.com/2Cttaza'),
    -- Lower
    (145, 'https://imgur.com/NDoPgvQ'),
    -- Check
    (146, 'https://imgur.com/LBvVzyx'),
    -- X
    (147, 'https://imgur.com/RRXTaC5'),
    -- Mark C
    (148, 'https://imgur.com/U0gkvXU'),
    -- Pierre
    (149, 'https://imgur.com/8c08M48'),
    -- Yves
    (150, 'https://imgur.com/mT5wHbp'),
    -- Jagmeet
    (151, 'https://imgur.com/gj7Kkup'),
    -- Elizabeth
    (152, 'https://imgur.com/zFE34ft'),
    -- Maxime
    (153, 'https://imgur.com/3h8IWl1'),
    -- Percent sign
    (154, 'https://imgur.com/wYnagjr');


-- E1
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (15, 'June 2025 CAN Unemployment', 3, 1, 12000, 192000, 20250708000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (15, 0, '< 4.0%', 1900, 0, 40000, 16, 81, 154), 
    (15, 1, '4.0% - 4.1%', 700, 0, 24700, 16, 81, 154), 
    (15, 2, '4.2% - 4.3%', 800, 0, 16800, 16, 81, 154), 
    (15, 3, '4.4% - 4.5%', 900, 0, 42500, 16, 81, 154),
    (15, 4, '4.6% - 4.7%', 800, 0, 15500, 16, 81, 154),
    (15, 5, '4.8% - 4.9%', 5700, 0, 15700, 16, 81, 154), 
    (15, 6, '> 5.0%', 1200, 0, 36800, 16, 81, 154);

-- E2
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (16, 'June 2025 CAN YoY Inflation', 3, 1, 11810, 236200, 20250708000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (16, 0, '< 2.40%', 1900, 0, 74000, 20, 81, 154), 
    (16, 1, '2.40% - 2.70%', 700, 0, 44700, 20, 81, 154), 
    (16, 2, '2.71% - 3.00%', 800, 0, 29800, 20, 81, 154), 
    (16, 3, '3.01% - 3.30%', 900, 0, 59500, 20, 81, 154),
    (16, 4, '3.31% - 3.60%', 800, 0, 12500, 20, 81, 154),
    (16, 5, '> 3.60%', 5700, 0, 15700, 20, 81, 154);

-- E3
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (17, 'S&P 500 Price at 6,000 USD', 3, 1, 1410, 42300, 20260531000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (17, 0, 'Higher', 900, 0, 26600, 30, 81, 144), 
    (17, 1, 'Lower', 510, 0, 15700, 30, 81, 145);

-- E4
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (18, '2025 CAN GDP Growth', 3, 1, 4800, 57600, 20260114000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (18, 0, '< -5.0%', 480, 0, 4000, 12, 68, 154), 
    (18, 1, '-5.0% - 3.0%', 700, 0, 2700, 12, 68, 154), 
    (18, 2, '-2.9% - 0.0%', 800, 0, 16800, 12, 68, 154), 
    (18, 3, '0.1% - 3.0%', 390, 0, 4500, 12, 68, 154),
    (18, 4, '3.1% - 5.0%', 430, 0, 15800, 12, 68, 154),
    (18, 5, '5.1% - 7.0%', 800, 0, 11700, 12, 68, 154), 
    (18, 6, '> 7.0%', 1200, 0, 2100, 12, 68, 154);

-- E5
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (19, 'June 2025 CAN-USA Trade Deal', 3, 1, 1690, 23660, 20250701000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (19, 0, 'Yes By June 2025', 1200, 0, 18060, 14, 48, 146), 
    (19, 1, 'No By June 2025', 490, 0, 5600, 14, 48, 147);


-- E6
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (20, '2025 USA GDP Growth', 3, 1, 4800, 57600, 20260114000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (20, 0, '< -5.0%', 480, 0, 4000, 12, 68, 154), 
    (20, 1, '-5.0% - 3.0%', 700, 0, 2700, 12, 68, 154), 
    (20, 2, '-2.9% - 0.0%', 800, 0, 16800, 12, 68, 154), 
    (20, 3, '0.1% - 3.0%', 390, 0, 4500, 12, 68, 154),
    (20, 4, '3.1% - 5.0%', 430, 0, 15800, 12, 68, 154),
    (20, 5, '5.1% - 7.0%', 800, 0, 11700, 12, 68, 154), 
    (20, 6, '> 7.0%', 1200, 0, 2100, 12, 68, 154);

-- E7
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (21, 'June 2025 CAN Real PCE', 3, 1, 6480, 90720, 20250708000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (21, 0, '< 0.2%', 970, 0, 16620, 14, 68, 154), 
    (21, 1, '0.2% - 0.3%', 1700, 0, 27000, 14, 68, 154), 
    (21, 2, '0.4% - 0.5%', 200, 0, 16800, 14, 68, 154), 
    (21, 3, '0.6% - 0.7%', 3190, 0, 14500, 14, 68, 154),
    (21, 4, '> 0.7%', 420, 0, 15800, 14, 68, 154);

-- P1
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (22, 'USA February 2029 President', 2, 1, 15000, 406000, 20290201000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (22, 0, 'Democrats', 6000, 0, 180600, 33, 48, 142), 
    (22, 1, 'Republicans', 6000, 0, 215400, 33, 48, 143),
    (22, 2, 'Other', 3000, 0, 10000, 33, 48, 20);

-- P2
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (23, 'President Impeachment', 2, 1, 12000, 396000, 20290131000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (23, 0, 'Yes by January 2029', 6000, 0, 180600, 33, 48, 146), 
    (23, 1, 'No by January 2029', 6000, 0, 215400, 33, 48, 147);

-- P3
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (24, 'CAN Election Seat Plurality', 2, 1, 8660, 299160, 20251022000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (24, 0, 'Liberal Party', 2400, 0, 140000, 26, 68, 136), 
    (24, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, 137), 
    (24, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, 138), 
    (24, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, 139),
    (24, 4, 'Green Party', 800, 0, 38000, 26, 68, 140),
    (24, 5, 'Peoples Party', 420, 0, 15000, 26, 68, 141),
    (24, 6, 'Other', 750, 0, 23160, 26, 68, 20);

-- P4
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (25, 'CAN Election Popular Vote', 2, 1, 8660, 159160, 20251022000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (25, 0, 'Liberal Party', 2400, 0, 40000, 26, 68, 136), 
    (25, 1, 'Conservative Party', 1700, 0, 17000, 26, 68, 137), 
    (25, 2, 'Bloc Québécois', 1100, 0, 1000, 26, 68, 138), 
    (25, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, 139),
    (25, 4, 'Green Party', 800, 0, 18000, 26, 68, 140),
    (25, 5, 'Peoples Party', 420, 0, 15000, 26, 68, 141),
    (25, 6, 'Other', 750, 0, 23160, 26, 68, 20);

-- P5
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (27, 'ON Election Seat Plurality', 2, 1, 7660, 189160, 20290709000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (27, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, 136), 
    (27, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, 137), 
    (27, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, 138), 
    (27, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, 139),
    (27, 4, 'Green Party', 800, 0, 38000, 26, 68, 140),
    (27, 5, 'Peoples Party', 420, 0, 5000, 26, 68, 141),
    (27, 6, 'Other', 750, 0, 23160, 26, 68, 20);
    
-- P6
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (28, 'BC Election Seat Plurality', 2, 1, 6660, 249160, 20280823000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (28, 0, 'Liberal Party', 1400, 0, 70000, 26, 68, 136), 
    (28, 1, 'Conservative Party', 1700, 0, 47000, 26, 68, 137), 
    (28, 2, 'Bloc Québécois', 100, 0, 11000, 26, 68, 138), 
    (28, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, 139),
    (28, 4, 'Green Party', 800, 0, 38000, 26, 68, 140),
    (28, 5, 'Peoples Party', 420, 0, 15000, 26, 68, 141),
    (28, 6, 'Other', 750, 0, 23160, 26, 68, 20);

-- P7
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (29, 'AB Election Seat Plurality', 2, 1, 7000, 196000, 20271020000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (29, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, 136), 
    (29, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, 137), 
    (29, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, 138), 
    (29, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, 139),
    (29, 4, 'Green Party', 140, 0, 38000, 26, 68, 140),
    (29, 5, 'Peoples Party', 420, 0, 15000, 26, 68, 141),
    (29, 6, 'Other', 750, 0, 20000, 26, 68, 20);


-- P8
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (30, 'ON Election Popular vote', 2, 1, 7660, 190160, 20290709000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (30, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, 136), 
    (30, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, 137), 
    (30, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, 138), 
    (30, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, 139),
    (30, 4, 'Green Party', 800, 0, 30000, 26, 68, 140),
    (30, 5, 'Peoples Party', 420, 0, 15000, 26, 68, 141),
    (30, 6, 'Other', 750, 0, 22160, 26, 68, 20);

-- P9
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (31, 'BC 2027 Election Popular vote', 2, 1, 6660, 279160, 20280823000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (31, 0, 'Liberal Party', 1400, 0, 80000, 26, 68, 136), 
    (31, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, 137), 
    (31, 2, 'Bloc Québécois', 100, 0, 11000, 26, 68, 138), 
    (31, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, 139),
    (31, 4, 'Green Party', 800, 0, 38000, 26, 68, 140),
    (31, 5, 'Peoples Party', 420, 0, 15000, 26, 68, 141),
    (31, 6, 'Other', 750, 0, 23160, 26, 68, 20);

-- P10
INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES
    (32, 'AB 2027 Election Popular Vote', 2, 1, 7000, 199160, 20271020000000);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price, image_id) 
VALUES 
    (32, 0, 'Liberal Party', 1400, 0, 40000, 26, 68, 136), 
    (32, 1, 'Conservative Party', 1700, 0, 27000, 26, 68, 137), 
    (32, 2, 'Bloc Québécois', 1100, 0, 11000, 26, 68, 138), 
    (32, 3, 'New Democratic Party', 1490, 0, 45000, 26, 68, 139),
    (32, 4, 'Green Party', 140, 0, 38000, 26, 68, 140),
    (32, 5, 'Peoples Party', 420, 0, 15000, 26, 68, 141),
    (32, 6, 'Other', 750, 0, 23160, 26, 68, 20);
