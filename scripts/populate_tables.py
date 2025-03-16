import random

users_file = open('../database/add_users.sql', 'w')
users = open('../database/usernames.txt', "r")
lines = users.read().split('\n')
tuples = []
for id in range(0,100):
    user = lines[id].replace(" ","")
    email = user + '@gmail.com'
    user = (id+1, lines[id], email, "$2a$10$EGmzezNxXwFzBzuEJDxrGesX9v0/Js3SgzYmkEyWPvJ04PkU7Kjri", 1, random.randint(10000,50000), random.randint(0,5), random.randint(0,40), random.randint(0,10), random.randint(0,10000), random.randint(60000, 200000), random.randint(10000,300000))
    tuples.append(user)

users_file.write(f"""INSERT INTO users (id, username, email, password, admin, balance, bankruptcy_count, total_bets, curr_bets, total_credits_playing, total_credits_bet, total_credits_won) VALUES 
    {tuples[0:100]}""")
users_file.close()

#events_file = open('../database/populate_tables.sql', 'w')
#events = open('../database/events.txt', "r")
#lines = events.read()

#events_file.write(f"""INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES {lines}""")
#events_file.close()