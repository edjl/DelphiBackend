
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY, 
    username TEXT UNIQUE NOT NULL, 
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL, 
    admin INTEGER NOT NULL DEFAULT 0 CHECK(admin IN (0, 1)), 
    balance INTEGER NOT NULL DEFAULT 0, 
    bankruptcy_count INTEGER NOT NULL DEFAULT 0, 
    bets_count INTEGER NOT NULL DEFAULT 0, 
    total_credits_bet INTEGER NOT NULL DEFAULT 0, 
    total_credits_won INTEGER NOT NULL DEFAULT 0, 
    premium_account INTEGER NOT NULL DEFAULT 0 CHECK(premium_account IN (0, 1)), 
    profit_multiplier INTEGER NOT NULL DEFAULT 1
);

DROP TABLE IF EXISTS events;
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY, 
    name TEXT UNIQUE NOT NULL, 
    category_id INTEGER NOT NULL, 
        -- 0 is created
        -- 1 is live
        -- 2 is finished
    stage INTEGER NOT NULL DEFAULT 0 CHECK(stage IN (0, 1, 2)),
    shares INTEGER NOT NULL DEFAULT 0, 
    market_cap INTEGER NOT NULL DEFAULT 0, 
    end_date INTEGER NOT NULL, 
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE RESTRICT
);

DROP TABLE IF EXISTS options;
CREATE TABLE IF NOT EXISTS options (
    event_id INTEGER NOT NULL, 
    option_id INTEGER NOT NULL, 
    title TEXT NOT NULL, 
    positive_shares INTEGER NOT NULL DEFAULT 0, 
    negative_shares INTEGER NOT NULL DEFAULT 0, 
    market_cap INTEGER NOT NULL DEFAULT 0, 
    positive_price INTEGER NOT NULL, 
    negative_price INTEGER NOT NULL, 
    image_id INTEGER, 
    PRIMARY KEY (event_id, option_id), 
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE RESTRICT
);

DROP TABLE IF EXISTS images;
CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY, 
    link TEXT NOT NULL
);

DROP TABLE IF EXISTS category;
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY, 
    grouping INTEGER NOT NULL DEFAULT 0, 
    name TEXT UNIQUE NOT NULL
);

DROP TABLE IF EXISTS shares;
CREATE TABLE IF NOT EXISTS shares (
    event_id INTEGER NOT NULL, 
    option_id INTEGER NOT NULL, 
    user_id INTEGER NOT NULL, 
    purchase_date INTEGER NOT NULL,
    shares INTEGER NOT NULL, 
    price INTEGER NOT NULL, 
    PRIMARY KEY (event_id, option_id, user_id, purchase_date), 
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE RESTRICT, 
    FOREIGN KEY (event_id, option_id) REFERENCES options(event_id, option_id) ON DELETE RESTRICT, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
);

DROP TABLE IF EXISTS outcomes;
CREATE TABLE IF NOT EXISTS outcomes (
    bet_title TEXT NOT NULL, 
    user_id INTEGER NOT NULL, 
    purchase_date INTEGER NOT NULL,
    profit INTEGER NOT NULL, 
    multiplier INTEGER NOT NULL, 
    sell_date INTEGER NOT NULL, 
    image_id INTEGER, 
    PRIMARY KEY (bet_title, user_id, purchase_date), 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);





-- Test Values

INSERT INTO users (id, username, email, password, admin, balance, bankruptcy_count, bets_count, total_credits_bet, total_credits_won) 
VALUES (0, 'test_username', 'test.username@email.com', 'pass123', 1, 69420, 2, 10, 5000, 14400);

INSERT INTO category (id, grouping, name) 
VALUES (0, 0, 'Imaginary'), 
    (1, 1, 'NHL');

INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) 
VALUES (0, 'Credits Sinkhole', 0, 1, 1000, 50000, 20250501);

INSERT INTO options (event_id, option_id, title, positive_shares, negative_shares, market_cap, positive_price, negative_price) 
VALUES 
    (0, 1, 'Option 1', 100, 200, 15000, 21, 81),
    (0, 2, 'Option 2', 400, 100, 25000, 56, 46),
    (0, 3, 'Option 3', 100, 100, 10000, 26, 76);

INSERT INTO shares (event_id, option_id, user_id, purchase_date, shares, price) 
VALUES 
    (0, 2, 0, 20240818, 100, 50),
    (0, 1, 0, 20240816, -150, 85);

INSERT INTO outcomes (bet_title, user_id, purchase_date, profit, multiplier, sell_date) 
VALUES ('Credits Sinkhole: Option 1', 0, 20240816, 5400, 280, 20240818);
