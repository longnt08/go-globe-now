from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson import ObjectId

# Tạo một Blueprint mới
user_routes = Blueprint('user_routes', __name__)

# Kết nối đến MongoDB Atlas
client = MongoClient("mongodb+srv://thanhlong:LTWNhom3@goglobenow.vroew.mongodb.net/")
db = client.people  # Chọn cơ sở dữ liệu 'people'
users_collection = db.users  # Chọn collection 'users'

@user_routes.route('/', methods=['GET'])
def get_users():
    print("Route /api/users được gọi")  # Debug
    users = list(users_collection.find({}))
    for user in users:
        user['_id'] = str(user['_id'])  # Chuyển đổi ObjectId thành chuỗi
        for key, value in user.items():
            if isinstance(value, bytes):
                user[key] = value.decode('utf-8')
    print(f"Users: {users}")  # Debug
    return jsonify(users), 200


@user_routes.route('/users/<user_id>', methods=['PUT'])
def update_user(user_id):
    # Kiểm tra xem người dùng có tồn tại không
    user = users_collection.find_one({"_id": ObjectId(user_id)})  # Sử dụng ObjectId để tìm
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    # Lấy dữ liệu từ yêu cầu
    data = request.get_json()

    # Cập nhật thông tin người dùng
    if 'name' in data:
        users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"name": data['name']}})
    if 'email' in data:
        users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"email": data['email']}})

    # Lấy thông tin người dùng đã cập nhật
    updated_user = users_collection.find_one({"_id": ObjectId(user_id)})
    return jsonify({"message": "User updated", "user": updated_user}), 200

@user_routes.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()  # Nhận dữ liệu từ yêu cầu
    new_user = {
        "name": data['name'],
        "email": data['email'],
    }
    users_collection.insert_one(new_user)  # Thêm người dùng mới vào collection
    new_user['_id'] = str(new_user['_id'])  # Chuyển đổi ObjectId thành chuỗi để trả về
    return jsonify({"message": "User added", "user": new_user}), 201


