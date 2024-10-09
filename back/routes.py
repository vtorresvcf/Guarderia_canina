from app import app, db
from flask import jsonify, request
from models import User

# Ruta para obtener y crear usuarios
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        data = request.json
        new_user = User(name=data['name'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created!'}), 201

    users = User.query.all()
    return jsonify([{'id': user.id, 'name': user.name} for user in users])
