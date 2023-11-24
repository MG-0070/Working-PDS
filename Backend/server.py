import pymongo
import pandas as pd
import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['MONGO_URI'] = "mongodb://localhost:27017"
mongo = pymongo.MongoClient(app.config['MONGO_URI'])
db = mongo["fci"]
collection = db["Users"]


@app.route('/')
def hello():
    return "Hi, PDS!"


@app.route('/home')
def home():
    return "Hey, welcome to home!"


@app.route('/add_user', methods=['POST'])
def add_user():
    if request.method == 'POST':
        user_data = request.get_json()

        result = collection.insert_one(user_data)

        if result.inserted_id:
            return jsonify({"message": "User added successfully", "user_id": str(result.inserted_id)}), 201
        else:
            return jsonify({"message": "Failed to add user"}), 400
    else:
        return jsonify({"message": "Invalid request method"}), 405


@app.route('/get_users', methods=['GET'])
def get_users():
    if request.method == 'GET':
        users = list(collection.find({}))

        user_list = []
        for user in users:
            user_dict = {
                "_id": str(user["_id"]),
                "name": user.get("name", ""),
                "password": user.get("password", ""),
            }
            user_list.append(user_dict)

        return jsonify({"users": user_list}), 200
    else:
        return jsonify({"message": "Invalid request method"}), 405


UPLOAD_FOLDER = 'Backend' 
ALLOWED_EXTENSIONS = {'xlsx', 'xls'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
@app.route("/uploadConfigExcel", methods=["POST"])
def uploadConfigExcel():
    data = {}
    try:
        file = request.files['uploadFile']
        if file and allowed_file(file.filename):
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], 'Data_1.xlsx')
            
            
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            
            if os.path.exists(file_path):
                os.remove(file_path)
            file.save(file_path)
            data['status'] = 1
            df = pd.read_excel('Backend/Data_1.xlsx')  
            print(df)
        else:
            data['status'] = 0
            data['message'] = 'Invalid file. Only .xlsx or .xls files are allowed.'
    except Exception as e:
        print("Error:", e)
        data['status'] = 0
        data['message'] = 'Error uploading file'

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)


@app.teardown_appcontext
def close_mongo_connection(exception=None):
    mongo.close()
