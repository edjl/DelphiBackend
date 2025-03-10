from execute_sql import execute
import random
import sqlite3

# connection = sqlite3.connect("../database/delphi_db_setup_schema.sql")
# conn = connection.cursor()

def populate_table(table_name, tuple_structure, tuples):
    execute(f"""INSERT INTO {table_name} {tuple_structure} VALUES 
        {tuples}""")
    
users = open('../database/usernames.txt', "r")
lines = users.read().split('\n')
tuples = []
for id in range(0,200):
    user = lines[id].replace(" ","")
    email = user + '@gmail.com'
    # print(email)
    user = (id, lines[id], email, "1234", 1, random.randint(-10000,10000), random.randint(0,5), random.randint(0,5), random.randint(0,5), random.randint(0,100), random.randint(0,100), random.randint(0,100))
    tuples.append(user)

populate_table("users", "(id, username, email, password, admin, balance, bankruptcy_count, total_bets, curr_bets, total_credits_playing, total_credits_bet, total_credits_won)", tuples[0:199])

populate_table("category", "(id, grouping, name)", ((0, 0, 'Imaginary'), (1, 1, 'Sports'), (2, 2, 'Politics'), (3, 3, 'Economy'), (4, 4, 'Other')))



populate_table("events", "(id, name, category_id, stage, shares, market_cap, end_date)")
