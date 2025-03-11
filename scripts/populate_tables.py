import random

def populate_tables():
    file = open('../database/populate_tables.sql', 'w')
    print("done")
    users = open('../database/usernames.txt', "r")
    lines = users.read().split('\n')
    tuples = []
    for id in range(0,200):
        user = lines[id].replace(" ","")
        email = user + '@gmail.com'
        user = (id, lines[id], email, "1234", 1, random.randint(-10000,10000), random.randint(0,5), random.randint(0,5), random.randint(0,5), random.randint(0,100), random.randint(0,100), random.randint(0,100))
        tuples.append(user)

    file.write(f"""INSERT INTO users (id, username, email, password, admin, balance, bankruptcy_count, total_bets, curr_bets, total_credits_playing, total_credits_bet, total_credits_won) VALUES 
        {tuples[0:200]}""")

    file.write(f"""INSERT INTO category (id, grouping, name) VALUES 
    (0, 0, 'Imaginary'), (1, 1, 'Sports'), (2, 2, 'Politics'), (3, 3, 'Economy'), (4, 4, 'Other')""")
    
    events = open('../database/events.txt', "r")
    lines = events.read().split('\n')

    file.write(f"""INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES {events}""")
    file.close()