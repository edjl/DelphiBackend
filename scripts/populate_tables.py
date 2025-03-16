import random

# Open files
users_file = open('../database/add_users.sql', 'w')
users = open('../database/usernames.txt', "r")
lines = users.read().split('\n')
tuples = []

for id in range(0, 100):
    user = lines[id].strip()
    email = f"{user}@gmail.com"

    total_credits_won = random.randint(10000, 300000)  
    balance = int(total_credits_won * random.uniform(0.1, 0.5))  

    # Properly format SQL values (wrap strings in single quotes)
    user_tuple = f"({id + 1}, '{user}', '{email}', '$2a$10$EGmzezNxXwFzBzuEJDxrGesX9v0/Js3SgzYmkEyWPvJ04PkU7Kjri', 1, {balance}, {random.randint(0, 5)}, {random.randint(0, 40)}, {random.randint(0, 10)}, {random.randint(0, 10000)}, {random.randint(60000, 200000)}, {total_credits_won})"
    
    tuples.append(user_tuple)

# Convert list of tuples to a properly formatted SQL string
values_str = ",\n    ".join(tuples)

# Write to file
users_file.write(f"""INSERT INTO users (id, username, email, password, admin, balance, bankruptcy_count, total_bets, curr_bets, total_credits_playing, total_credits_bet, total_credits_won) VALUES 
    {values_str};""")

# Close files
users_file.close()


#events_file = open('../database/populate_tables.sql', 'w')
#events = open('../database/events.txt', "r")
#lines = events.read()

#events_file.write(f"""INSERT INTO events (id, name, category_id, stage, shares, market_cap, end_date) VALUES {lines}""")
#events_file.close()