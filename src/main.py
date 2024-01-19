from flask import Flask, request, jsonify
import mysql.connector, bcrypt, threading, time, requests, uuid, bcrypt
from flask_cors import CORS
from datetime import datetime
from decimal import Decimal

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

# Create a MySQL connection
db = mysql.connector.connect(
    host="localhost", user="root", password="", database="yogo-o"
)

# create Users table
cursor = db.cursor()
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS Users (
        User_id VARCHAR(10) PRIMARY KEY,
        Username VARCHAR(255) NOT NULL,
        Email VARCHAR(255) NOT NULL,
        PhoneNumber INT(100) NOT NULL,
        Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PIN VARCHAR(100) NOT NULL,
        UnHashedPIN VARCHAR(100) NOT NULL
    )
"""
)
cursor.close()

# create wallets table
cursor = db.cursor()
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS Wallets (
        Wallet_id INT AUTO_INCREMENT PRIMARY KEY,
        User_id VARCHAR(10),
        Username VARCHAR(255) NOT NULL,
        PhoneNumber INT(100) NOT NULL,
        Balance DECIMAL(10, 2) DEFAULT 0,
        FOREIGN KEY (User_id) REFERENCES Users(User_id)
    )
"""
)
cursor.close()


@app.route("/createuser", methods=["POST"])
def create_user():
    user_data = request.json
    username = user_data["username"]
    email = user_data["email"]
    mobile_number = user_data["mobileNumber"]
    pinCode = user_data["pinCode"]
    hashed_pin = bcrypt.hashpw(pinCode.encode(), bcrypt.gensalt())
    user_id = str(uuid.uuid4())
    cursor = db.cursor(dictionary=True)

    try:
        # Insert the user into the Users table
        user_query = "INSERT INTO Users (User_id, Username, Email, PhoneNumber, PIN, UnhashedPIN) VALUES (%s, %s, %s, %s, %s, %s)"
        user_values = (user_id, username, email, mobile_number, hashed_pin, pinCode)
        cursor.execute(user_query, user_values)
        db.commit()

        # Retrieve the user_id from the Users table
        cursor.execute(
            "SELECT User_id, Username, PhoneNumber FROM Users ORDER BY created_at DESC LIMIT 1"
        )
        result = cursor.fetchone()

        if result:
            user_id = result["User_id"]
            wallet_query = "INSERT INTO Wallets (User_id, Username, PhoneNumber) VALUES (%s, %s, %s)"
            wallet_values = (user_id, username, mobile_number)
            cursor.execute(wallet_query, wallet_values)
            db.commit()

            wallet_id = cursor.lastrowid
            initial_balance = 50000.0
            update_balance_query = (
                "UPDATE Wallets SET Balance = %s WHERE Wallet_id = %s"
            )
            update_balance_values = (initial_balance, wallet_id)
            cursor.execute(update_balance_query, update_balance_values)
            db.commit()
            return jsonify({"message": "User and wallet created successfully"}), 201
        else:
            return jsonify({"message": "No user found"}), 404

    except Exception as e:
        error_message = str(e)
        return jsonify({"error": error_message}), 500

    finally:
        cursor.close()


# create payments table in yogo-o database
cursor = db.cursor()
cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS payments (
        User_id VARCHAR(10),
        Name VARCHAR(255) NOT NULL,
        Number VARCHAR(16) NOT NULL,
        Amount DECIMAL(10, 2) NOT NULL,
        Payment_Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (User_id) REFERENCES Users(User_id)
    )
"""
)
cursor.close()


# process payments
@app.route("/payments", methods=["POST"])
def process_payments():
    payment_data = request.json
    name = payment_data["name"]
    momoNumber = payment_data["momoNumber"]
    amount = payment_data["amount"]
    pin = payment_data["pin"]

    if not momoNumber or not amount:
        return jsonify({"error": "Invalid payment details"}), 400

    cursor = db.cursor()
    query = "SELECT User_id, PIN FROM Users WHERE Username = %s"
    cursor.execute(query, (name,))
    result = cursor.fetchone()

    if not result:
        return jsonify({"error": "User not found"}), 404

    user_id, stored_pin = result

    if not bcrypt.checkpw(pin.encode(), stored_pin.encode()):
        return jsonify({"error": "Invalid PIN"}), 401

    # check user's acount balance
    query = "SELECT Balance FROM Wallets WHERE User_id = %s"
    cursor.execute(query, (user_id,))
    balance_result = cursor.fetchone()

    if not balance_result:
        return jsonify({"error": "User balance not found"}), 404

    balance = balance_result[0]

    if balance < Decimal(amount):
        return jsonify({"error": "Insufficient balance"}), 400

    # Subtract amount from balance
    new_balance = balance - Decimal(amount)

    # Update balance in the Wallets table
    update_balance_query = "UPDATE Wallets SET Balance = %s WHERE User_id = %s"
    update_balance_values = (new_balance, user_id)
    cursor.execute(update_balance_query, update_balance_values)
    db.commit()

    query = (
        "INSERT INTO payments (User_id, Name, Number, Amount) VALUES (%s, %s, %s, %s)"
    )
    values = (user_id, name, momoNumber, amount)
    cursor.execute(query, values)
    db.commit()
    cursor.close()

    return jsonify({"message": "Payment successful"}), 201


@app.route("/updatebalance", methods=["POST"])
def update_balance():
    data = request.json
    user_id = data["user_id"]
    new_balance = data["new_balance"]

    cursor = db.cursor()
    update_balance_query = "UPDATE Wallets SET account_balance = %s WHERE User_id = %s"
    update_balance_values = (new_balance, user_id)
    cursor.execute(update_balance_query, update_balance_values)
    db.commit()

    cursor.close()

    return jsonify({"message": "Account balance updated successfully"}), 200


@app.route("/transactions", methods=["GET"])
def get_payments():
    cursor = db.cursor()
    query = "SELECT * FROM payments"
    cursor.execute(query)
    result = cursor.fetchall()

    payments = []
    for row in result:
        payment_time = row[4]
        payment_time = payment_time.strftime("%d-%m-%Y at %H:%M")
        payment = {
            "id": row[0],
            "Name": row[1],
            "Number": row[2],
            "Amount": row[3],
            "PaymentTime": payment_time,
        }
        payments.append(payment)
    cursor.close()

    return jsonify({"payments": payments}), 200


if __name__ == "__main__":
    app.run(debug=True)
