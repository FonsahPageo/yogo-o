from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
import bcrypt
import threading
import time

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

# Create a MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="yogo-o"
)

# create users table
cursor = db.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Number VARCHAR(16) NOT NULL,
        PIN VARCHAR(100) NOT NULL,
        UnHashedPIN VARCHAR(100) NOT NULL
    )
""")
cursor.close()

@app.route('/createuser', methods=['POST'])
def create_user():
    user_data = request.json
    username = user_data['username']
    mobile_number = user_data['mobileNumber']
    pinCode = user_data['pinCode']
    
    hashed_pin = bcrypt.hashpw(pinCode.encode(), bcrypt.gensalt())
    
    cursor = db.cursor()
    query = "INSERT INTO Users (Name, Number, PIN, UnhashedPIN) VALUES (%s, %s, %s, %s)"
    values = (username, mobile_number, hashed_pin, pinCode)
    cursor.execute(query, values)
    db.commit()
    
    cursor.close()
    db.close()
        
    return jsonify({'message': 'User created successfully'}), 201

# create payments table in yogo-o database
cursor = db.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Number VARCHAR(16) NOT NULL,
        Amount DECIMAL(10, 2) NOT NULL,
        PaymentTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")
cursor.close()

@app.route('/payments', methods=['POST'])
def process_payments():
    payment_data = request.json
    name = payment_data['name']
    momoNumber = payment_data['momoNumber']
    amount = payment_data['amount']
    pin = payment_data['pin']
    
    if not momoNumber or not amount:
        return jsonify({'error': 'Invalid payment details'}), 400
    
    cursor = db.cursor()
    query = "SELECT PIN FROM Users WHERE Name = %s"
    cursor.execute(query, (name,))
    result = cursor.fetchone()
    
    if not result:
        return jsonify({'error': 'User not found'}), 404
    
    stored_pin = result[0]
    
    if not bcrypt.checkpw(pin.encode(), stored_pin.encode()):
        return jsonify({'error': 'Invalid PIN'}), 401
    
    query =  "INSERT INTO payments (Name, Number, Amount) VALUES (%s, %s, %s)"
    values = (name, momoNumber, amount)
    cursor.execute(query, values)
    db.commit()
    
    cursor.close()
    
    processing_thread = threading.Thread(target=process_payment, args=(name, momoNumber, amount, pin))
    processing_thread.start()
        
    return jsonify({'message': 'Payment successful'}), 201

def process_payment(name, momo_number, amount):
    import time
    time.sleep(10)
    print(f"Payment processed for {name}")

@app.route('/transactions', methods=['GET'])
def get_payments():
    cursor = db.cursor()
    query = "SELECT * FROM payments"
    cursor.execute(query)
    result = cursor.fetchall()
    
    payments = []
    for row in result:
        payment = {
            'id': row[0],
            'Name': row[1],
            'Mobile_number': row[2],
            'Amount': row[3],
            'Timestamp': row[4].isoformat()
        }
        payments.append(payment)
    cursor.close()
    
    return jsonify({'payments': payments}), 200

if __name__ == '__main__':
    app.run(debug=True)