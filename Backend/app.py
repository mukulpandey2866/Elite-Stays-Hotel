# from flask import Flask, request, jsonify
# import pymysql

# app = Flask(__name__)

from flask import Flask, session, jsonify, redirect, url_for, request
from flask_cors import CORS
from werkzeug.security import check_password_hash
from flask_sqlalchemy import SQLAlchemy

from flask_bcrypt import Bcrypt
import pymysql
pymysql.install_as_MySQLdb()



# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from your frontend
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@127.0.0.1:3306/hotel_management'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@127.0.0.1:3306/hotel_management'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "your_secret_key"  # Secret key for session management

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)  # Initialize bcrypt after the app is created




# bcrypt = Bcrypt(app)

# from models import User  # Assuming you have a User model in your database
#  import bcrypt  # If you're using bcrypt for password hashing (recommended)
# import pymysql

# app = Flask(__name__)
# app.secret_key = "key"  # For session management (use a secure key)

# app = Flask(__name__)
# app.secret_key = "your_secret_key"
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/database_name'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database and bcrypt
# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)


# # Database connection function
# def get_db_connection():
#     return pymysql.connect(
#         host="localhost",
#         user="root",
#         password="root",
#         database="hotel_management"
#     )


# from flask import Flask, request, jsonify, session
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@127.0.0.1:3306/hotel_management'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['SECRET_KEY'] = 'your_secret_key'

# db = SQLAlchemy(app)
# bcrypt = Bcrypt(app)


# Admin Model
class Admin(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password = db.Column(db.String(120), nullable=False)


# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f"<User {self.name}>"



# Admin Login Route
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Validate username and password
    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    # Check credentials in the database
    admin = Admin.query.filter_by(username=username).first()

    if admin and bcrypt.check_password_hash(admin.password, password):
        session['admin'] = admin.username  # Store admin session
        return jsonify({'message': 'Admin login successful'}), 200
    else:
        return jsonify({'message': 'Invalid admin credentials'}), 401


# General Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    role = data.get("role")  # "admin" or "user"
    email_or_username = data.get("email_or_username")
    password = data.get("password")

    if not role or not email_or_username or not password:
        return jsonify({'message': 'Role, username/email, and password are required'}), 400

    if role == 'admin':
        admin = Admin.query.filter_by(username=email_or_username).first()
        if admin and bcrypt.check_password_hash(admin.password, password):
            session['admin'] = admin.username  # Store admin session
            return jsonify({'message': 'Admin login successful'}), 200
        else:
            return jsonify({'message': 'Invalid admin credentials'}), 401

    elif role == 'user':
        user = User.query.filter_by(email=email_or_username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            session['user'] = user.name  # Store user session
            return jsonify({'message': 'User login successful'}), 200
        else:
            return jsonify({'message': 'Invalid user credentials'}), 401
    else:
        return jsonify({'message': 'Invalid role provided'}), 400


# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "All fields are required!"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email is already registered"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(name=name, email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Signup successful!"}), 200


# Logout Route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop("user", None)
    session.pop("admin", None)
    return jsonify({"message": "Logged out successfully"}), 200


# Check Login Status
@app.route('/check_login', methods=['GET'])
def check_login():
    user = session.get("user")
    admin = session.get("admin")
    if admin:
        return jsonify({"role": "admin", "username": admin}), 200
    elif user:
        return jsonify({"role": "user", "name": user}), 200
    return jsonify({"role": None}), 200


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)


# Feedback model
class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text)
    submitted_at = db.Column(db.DateTime, default=db.func.current_timestamp())


# Test route
@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend is running!"})

# Route to add a guest
@app.route('/guests', methods=['POST'])
def add_guest():
    data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    query = "INSERT INTO guests (name, photo, contact, preferences, booking_history) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(query, (
        data['name'],
        data['photo'],
        data['contact'],
        data['preferences'],
        ",".join(data['booking_history'])
    ))

    connection.commit()
    return jsonify({"message": "Guest added successfully!"})

# Route to calculate payment
@app.route('/payments', methods=['POST'])
def calculate_payment():
    data = request.json

    room_price = {
        "standard": 100,
        "deluxe": 150,
        "suite": 200
    }.get(data['room_type'], 0)

    if data['season'] == "high":
        room_price *= 1.5

    total_cost = room_price * data['duration']
    return jsonify({"total_cost": round(total_cost, 2)})

@app.route('/analytics', methods=['POST'])
def add_analytics_data():
    data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO report_analytics (date, occupancy_rate, revenue, guest_satisfaction)
        VALUES (%s, %s, %s, %s)
    """
    cursor.execute(query, (
        data['date'],
        data['occupancyRate'],
        data['revenue'],
        data['guestSatisfaction']
    ))

    connection.commit()
    return jsonify({"message": "Analytics data added successfully!"}), 201


@app.route('/analytics', methods=['GET'])
def get_analytics():
    connection = get_db_connection()
    cursor = connection.cursor()

    query = "SELECT * FROM report_analytics ORDER BY date DESC LIMIT 1"  # Get the latest data
    cursor.execute(query)
    analytics_data = cursor.fetchone()

    if analytics_data:
        data = {
            "occupancyRate": analytics_data[2],  # Assuming occupancy_rate is the 3rd column
            "revenue": analytics_data[3],         # Assuming revenue is the 4th column
            "guestSatisfaction": analytics_data[4]  # Assuming guest_satisfaction is the 5th column
        }
        return jsonify(data)
    else:
        return jsonify({"message": "No analytics data found"}), 404



# Function to fetch all reservations from the database
def get_all_reservations_from_db():
    connection = get_db_connection()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM reservations")
    reservations = cursor.fetchall()
    connection.close()
    return reservations

# Route to get all reservations
@app.route('/reservations', methods=['GET'])
def get_reservations():
    reservations = get_all_reservations_from_db()
    return jsonify(reservations)

# Function to save a new reservation to the database
def save_reservation_to_db(reservation_data):
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO reservations (name, photo, room_number, check_in, check_out)
    VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(query, (
        reservation_data['name'],
        reservation_data['photo'],
        reservation_data['room_number'],
        reservation_data['check_in'],
        reservation_data['check_out']
    ))

    connection.commit()
    connection.close()

# Route to add a reservation
@app.route('/reservations', methods=['POST'])
def add_reservation():
    reservation_data = request.get_json()
    save_reservation_to_db(reservation_data)
    return jsonify({"message": "Reservation added successfully!"}), 201

# Function to update an existing reservation in the database
def update_reservation_in_db(id, reservation_data):
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    UPDATE reservations
    SET name = %s, photo = %s, room_number = %s, check_in = %s, check_out = %s
    WHERE id = %s
    """
    cursor.execute(query, (
        reservation_data['name'],
        reservation_data['photo'],
        reservation_data['room_number'],
        reservation_data['check_in'],
        reservation_data['check_out'],
        id
    ))

    connection.commit()
    connection.close()

# Route to update a reservation
@app.route('/reservations/<int:id>', methods=['PUT'])
def update_reservation(id):
    reservation_data = request.get_json()
    update_reservation_in_db(id, reservation_data)
    return jsonify({"message": "Reservation updated successfully!"})

# Function to delete a reservation from the database
def delete_reservation_from_db(id):
    connection = get_db_connection()
    cursor = connection.cursor()

    query = "DELETE FROM reservations WHERE id = %s"
    cursor.execute(query, (id,))

    connection.commit()
    connection.close()

# Route to delete a reservation
@app.route('/reservations/<int:id>', methods=['DELETE'])
def delete_reservation(id):
    delete_reservation_from_db(id)
    return jsonify({"message": "Reservation deleted successfully!"})

if __name__ == '__main__':
    app.run(debug=True)

# Route to get all staff members
@app.route('/staff', methods=['GET'])
def get_staff():
    connection = get_db_connection()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM staff")
    staff_members = cursor.fetchall()
    connection.close()
    return jsonify(staff_members)

# Route to add a new staff member
@app.route('/staff', methods=['POST'])
def add_staff():
    data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO staff (name, photo, age, salary, gender, work_type)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (
        data['name'],
        data['photo'],
        data['age'],
        data['salary'],
        data['gender'],
        data['workType']
    ))
    connection.commit()
    connection.close()

    return jsonify(data), 201


# Route to update staff member
@app.route('/staff/<int:id>', methods=['PUT'])
def update_staff(id):
    data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    UPDATE staff
    SET name = %s, photo = %s, age = %s, salary = %s, gender = %s, work_type = %s
    WHERE id = %s
    """
    cursor.execute(query, (
        data['name'],
        data['photo'],
        data['age'],
        data['salary'],
        data['gender'],
        data['workType'],
        id
    ))
    connection.commit()
    connection.close()

    return jsonify(data)

# Route to delete staff member
@app.route('/staff/<int:id>', methods=['DELETE'])
def delete_staff(id):
    connection = get_db_connection()
    cursor = connection.cursor()

    query = "DELETE FROM staff WHERE id = %s"
    cursor.execute(query, (id,))
    connection.commit()
    connection.close()

    return jsonify({"message": "Staff member deleted successfully!"})

@app.route('/rooms', methods=['GET'])
def get_rooms():
    connection = get_db_connection()
    cursor = connection.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT * FROM rooms")
    rooms = cursor.fetchall()
    connection.close()
    return jsonify(rooms)

@app.route('/rooms', methods=['POST'])
def add_room():
    data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO rooms (name, description, room_number, price, availability, image)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (
        data['name'],
        data['description'],
        data['roomNumber'],
        data['price'],
        data['availability'],
        data['image']
    ))
    connection.commit()
    connection.close()

    return jsonify(data), 201


@app.route('/rooms/<int:id>', methods=['PUT'])
def update_room(id):
    data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    UPDATE rooms
    SET name = %s, description = %s, room_number = %s, price = %s, availability = %s, image = %s
    WHERE id = %s
    """
    cursor.execute(query, (
        data['name'],
        data['description'],
        data['roomNumber'],
        data['price'],
        data['availability'],
        data['image'],
        id
    ))
    connection.commit()
    connection.close()

    return jsonify(data)


@app.route('/rooms/<int:id>', methods=['DELETE'])
def delete_room(id):
    connection = get_db_connection()
    cursor = connection.cursor()

    query = "DELETE FROM rooms WHERE id = %s"
    cursor.execute(query, (id,))
    connection.commit()
    connection.close()

    return jsonify({"message": "Room deleted successfully!"})

# # Route to handle login
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.json
#     username = data.get("username")
#     password = data.get("password")

#     # Check if username and password are provided
#     if not username or not password:
#         return jsonify({'message': 'Username and password are required'}), 400

#     # Check if the admin exists in the database
#     connection = get_db_connection()
#     cursor = connection.cursor()
#     cursor.execute("SELECT * FROM admin WHERE username = %s AND password = %s", (username, password))
#     admin = cursor.fetchone()

#     if admin:
#         return jsonify({'message': 'Login successful'}), 200
#     else:
#         return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/checkin', methods=['POST'])
def checkin():
    data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO checkin_data (name, room, date)
    VALUES (%s, %s, %s)
    """
    cursor.execute(query, (data['name'], data['room'], data['date']))
    connection.commit()
    connection.close()

    return jsonify({"message": "Check-in data saved successfully!"}), 201

@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO checkout_data (name, room, date)
    VALUES (%s, %s, %s)
    """
    cursor.execute(query, (data['name'], data['room'], data['date']))
    connection.commit()
    connection.close()

    return jsonify({"message": "Checkout data saved successfully!"}), 201


@app.route('/bookings', methods=['POST'])
def create_booking():
    data = request.json
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO bookings (name, email, room_type, check_in_date, check_out_date)
    VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(query, (
        data['name'],
        data['email'],
        data['roomType'],
        data['checkInDate'],
        data['checkOutDate']
    ))
    connection.commit()
    connection.close()

    return jsonify({"message": "Booking data saved successfully!"}), 201


@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.json
    name = data['name']
    email = data['email']
    rating = data['rating']
    review = data['review']
    
    # Insert feedback data into the database
    connection = get_db_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO feedback (name, email, rating, review)
    VALUES (%s, %s, %s, %s)
    """
    cursor.execute(query, (name, email, rating, review))
    connection.commit()
    connection.close()

    return jsonify({"message": "Feedback submitted successfully!"}), 201


# from flask import Flask, session, jsonify, redirect, url_for, request
# from werkzeug.security import check_password_hash
# from models import User  # Assuming you have a User model in your database
#  import bcrypt  # If you're using bcrypt for password hashing (recommended)

# app = Flask(__name__)
# app.secret_key = "key"  # For session management (use a secure key)

# Simulated user authentication route (for testing with hardcoded users)
users_db = {
    "user@example.com": {
        "password": "password123",
        "name": "John Doe",
    }
}

# # Simulated user authentication route (for testing)
# @app.route("/login", methods=["POST"])
# def login():
#     email = request.json.get("email")
#     password = request.json.get("password")
    
#     user = users_db.get(email)
#     if user and user["password"] == password:
#         session["user"] = user["name"]  # Store user data in session
#         return jsonify({"message": "Logged in successfully!"}), 200
#     return jsonify({"message": "Invalid credentials"}), 401

# # Check login status
# @app.route("/check_login", methods=["GET"])
# def check_login():
#     user = session.get("user")
#     if user:
#         return jsonify({"user": user}), 200
#     return jsonify({"user": None}), 200

# # Logout route
# @app.route("/logout", methods=["POST"])
# def logout():
#     session.pop("user", None)  # Remove user from session
#     return jsonify({"message": "Logged out successfully!"}), 200

# if __name__ == "__main__":
#     app.run(debug=True)


# from flask import Flask, request, jsonify
# from flask_sqlalchemy import SQLAlchemy

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/your_database'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)

# Define the Booking model
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    room_type = db.Column(db.String(50), nullable=False)
    check_in_date = db.Column(db.String(20), nullable=False)
    check_out_date = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"<Booking {self.name} {self.email} {self.room_type}>"

# Booking route to save booking data to the database
@app.route("/booking", methods=["POST"])
def create_booking():
    booking_data = request.json

    # Extract booking data from the request
    name = booking_data.get("name")
    email = booking_data.get("email")
    room_type = booking_data.get("roomType")
    check_in_date = booking_data.get("checkInDate")
    check_out_date = booking_data.get("checkOutDate")

    # Validate input data
    if not all([name, email, room_type, check_in_date, check_out_date]):
        return jsonify({"message": "All fields are required"}), 400

    # Create a new Booking object
    new_booking = Booking(
        name=name,
        email=email,
        room_type=room_type,
        check_in_date=check_in_date,
        check_out_date=check_out_date
    )

    # Save the booking to the database
    try:
        db.session.add(new_booking)
        db.session.commit()
        return jsonify({"message": "Booking successfully saved!"}), 200
    except Exception as e:
        db.session.rollback()  # Rollback the transaction in case of error
        return jsonify({"message": "Error occurred while saving the booking", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)



db = SQLAlchemy(app)

# Define the Payment model directly in app.py
class Payment(db.Model):
    __tablename__ = 'payments'
    
    id = db.Column(db.Integer, primary_key=True)
    room_type = db.Column(db.String(50))
    num_rooms = db.Column(db.Integer)
    service_type = db.Column(db.String(50))
    total_amount = db.Column(db.Float)
    card_holder = db.Column(db.String(100))
    card_number = db.Column(db.String(16))  # You should store a tokenized card number in real scenarios
    expiry_date = db.Column(db.String(5))  # Format: MM/YY
    cvv = db.Column(db.String(3))  # This should never be stored in plaintext in a real-world app

    def __init__(self, room_type, num_rooms, service_type, total_amount, card_holder, card_number, expiry_date, cvv):
        self.room_type = room_type
        self.num_rooms = num_rooms
        self.service_type = service_type
        self.total_amount = total_amount
        self.card_holder = card_holder
        self.card_number = card_number
        self.expiry_date = expiry_date
        self.cvv = cvv

# Create tables in the database (run this once to create the 'payments' table)
with app.app_context():
    db.create_all()

# Example route for saving payment details
@app.route('/payment', methods=['POST'])
def create_payment():
    data = request.json

    # Extract payment data from the request body
    room_type = data.get('room_type')
    num_rooms = data.get('num_rooms')
    service_type = data.get('service_type')
    total_amount = data.get('total_amount')
    card_holder = data.get('card_holder')
    card_number = data.get('card_number')
    expiry_date = data.get('expiry_date')
    cvv = data.get('cvv')

    # Validate data (you can add more validation logic as needed)
    if not all([room_type, num_rooms, service_type, total_amount, card_holder, card_number, expiry_date, cvv]):
        return jsonify({'message': 'All fields are required'}), 400

    # Create a new payment record
    payment = Payment(
        room_type=room_type,
        num_rooms=num_rooms,
        service_type=service_type,
        total_amount=total_amount,
        card_holder=card_holder,
        card_number=card_number,
        expiry_date=expiry_date,
        cvv=cvv
    )

    # Save the payment record to the database
    db.session.add(payment)
    db.session.commit()

    return jsonify({'message': 'Payment information saved successfully!'}), 201

# Run the app
if __name__ == "__main__":
    app.run(debug=True)


from datetime import datetime

# Initialize the database
db = SQLAlchemy()

# Define ServiceRequest model
class ServiceRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    room_number = db.Column(db.String(50), nullable=False)
    service_type = db.Column(db.String(100), nullable=False)
    service_details = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.String(50), default=datetime.utcnow, nullable=False)

    def __repr__(self):
        return f"<ServiceRequest {self.id}>"

@app.route('/submit_service_request', methods=['POST'])
def submit_service_request():
    data = request.get_json()  # Get the JSON data from the frontend

    room_number = data.get('roomNumber')
    service_type = data.get('serviceType')
    service_details = data.get('serviceDetails')
    timestamp = data.get('timestamp')

    # Validation
    if not room_number or not service_type or not service_details:
        return jsonify({"status": "error", "message": "All fields are required"}), 400

    # Save the service request to the database
    new_service_request = ServiceRequest(
        room_number=room_number,
        service_type=service_type,
        service_details=service_details,
        timestamp=timestamp
    )

    try:
        db.session.add(new_service_request)
        db.session.commit()  # Commit the transaction
        return jsonify({"status": "success", "message": "Service request submitted successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": f"An error occurred: {str(e)}"}), 500


@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Check if all fields are provided
    if not name or not email or not password:
        return jsonify({"success": False, "message": "All fields are required!"}), 400

    # Check if user already exists
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"success": False, "message": "User already exists!"}), 400

    # Hash the password before storing
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = User(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": True, "message": "User created successfully!"}), 201

# @app.route("/login", methods=["POST"])
# def login():
#     data = request.get_json()
#     email = data.get("email")
#     password = data.get("password")

#     # Check if email and password are provided
#     if not email or not password:
#         return jsonify({"success": False, "message": "Both email and password are required!"}), 400

#     user = User.query.filter_by(email=email).first()

#     if user and bcrypt.check_password_hash(user.password, password):
#         return jsonify({"success": True, "message": "Login successful!"}), 200
#     else:
#         return jsonify({"success": False, "message": "Invalid email or password!"}), 401

# if __name__ == "__main__":
#     app.run(debug=True)

