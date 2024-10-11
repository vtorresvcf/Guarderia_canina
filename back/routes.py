from app import app, db
from flask import jsonify, request
from models import User

# Ruta para crear usuarios

@app.route('/create_users', methods=['POST'])
def Users():
    name = request.json.get("name", None)
    new_user = User(name=name)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'msg':'Usuario registrado correctamente', 'user':new_user.serialize()}),201

@app.route('/users', methods=['GET'])
def getAllUsers():
    users = User.query.all()
    users=[user.serialize() for user in users]
    if users:
        return jsonify({'user': users}),200
    return jsonify({'msg':'Ningún usuario encontrado'}),404

