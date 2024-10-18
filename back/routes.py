from app import app, db, bcrypt
from flask import jsonify, request
from flask_bcrypt import generate_password_hash , check_password_hash
from models import User, Services,Reservation
from datetime import datetime


# Ruta para crear usuarios

@app.route('/add_user', methods=['POST'])
##TODO  CREAR UN ADMIN ANTES QUE NADA
def Users():
    name = request.json.get("name", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    phone = request.json.get("phone", None)
    is_admin = request.json.get("is_admin", None)
    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    if not name or not username or not password or not email or phone is None:
        return jsonify({'msg':'Los datos requeridos no son válidos'})
    else:
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'msg':'El usuario ya existe'})
        else:
            new_user = User(name=name, username=username, password=pw_hash, email=email,phone=phone, is_admin=is_admin )
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'msg':'Usuario registrado correctamente', 'user':new_user.serialize()}),201

@app.route('/users', methods=['GET'])
##TODO  PENDIENTE VALIDAR CON JWT QUE SEA SOLO EL ADMIN
def getAllUsers():
    users = User.query.all()
    users=[user.serialize() for user in users]
    if users:
        return jsonify({'user': users}),200
    return jsonify({'msg':'Ningún usuario encontrado'}),404


@app.route('/add_service', methods=['POST'])
##TODO  PENDIENTE VALIDAR CON JWT QUE SEA SOLO EL ADMIN
def AddService():
    name= request.json.get("name" ,None)
    description= request.json.get("description", None)
    prices = request.json.get("prices", None)
    
    if not name or not description or prices is None:
        return jsonify({'msg': 'Los datos requeridos no son válidos'}), 400
    
    existing_service = Services.query.filter_by(name=name).first()
    if existing_service:
        return jsonify({"error": "El servicio ya está creado."}), 400
    else:
        new_service = Services(name=name, description=description,prices=prices)
        db.session.add(new_service)
        db.session.commit()
        return jsonify({'msg':'Nuevo servicio creado', 'service':new_service.serialize()})

@app.route('/services', methods=['GET'])
##TODO  PENDIENTE VALIDAR CON JWT QUE SEA SOLO EL ADMIN
def getAllServices():
    services = Services.query.all()
    services=[service.serialize() for service in services]
    if services:
        return jsonify({'services': services}),200
    return jsonify({'msg':'Ningún usuario encontrado'}),404

@app.route('/add_reservation', methods=['POST'])
def AddReservation():
    #TODO PDTE COGER EL USER DEL JWT
    id_user = request.json.get("id_user")
    id_services = request.json.get("id_services")
    places = request.json.get("places", None)
    date = request.json.get("date", None)

    if not id_user or not id_services or not places or not date:
        return jsonify({'msg': 'Los datos requeridos no son válidos'}), 400


    try:
        date = datetime.strptime(date, "%d-%m-%Y")  
    except ValueError:
        return jsonify({'msg': 'Formato de fecha inválido. Usa DD-MM-YYYY'}), 400

    try:
        places = int(places)
    except ValueError:
        return jsonify({'msg': 'El número de plazas debe ser un entero.'}), 400

    user = User.query.get(id_user)
    if not user:
        return jsonify({'msg': 'Usuario no encontrado.'}), 404
    else:
        service = Services.query.get(id_services)
        if not service:
            return jsonify({'msg': f'Servicio con ID {id_services} no encontrado.'}), 404

        
        total_reserved = Reservation.query.filter(
            Reservation.id_services == service.id,
            Reservation.date == date
        ).with_entities(db.func.sum(Reservation.places)).scalar() or 0

        
        total_capacity = service.capacity

        
        remaining_capacity = total_capacity - total_reserved

        
        if places > remaining_capacity:
            return jsonify({'msg': f'No hay suficientes plazas disponibles para el servicio ID {service.id}. Plazas restantes: {remaining_capacity}'}), 400

        
        existing_reservation = Reservation.query.filter_by(id_user=id_user, id_services=service.id, date=date).first()
        if existing_reservation:
            return jsonify({"error": f"Ya tienes una reserva para el servicio ID {service.id} en ese día."}), 400

        
        new_reservation = Reservation(id_user=id_user, id_services=service.id, places=places, date=date)
        db.session.add(new_reservation)
        service.capacity -= places
        db.session.commit()

        return jsonify({'msg':'Nueva reserva creada', 'service':new_reservation.serialize()})

    


@app.route('/reservations', methods=['GET'])
##TODO  PENDIENTE VALIDAR CON JWT QUE SEA SOLO EL ADMIN
def getAllReservations():
    reserv = Reservation.query.all()
    reservations=[res.serialize() for res in reserv]
    if reservations:
        return jsonify({'services': reservations}),200
    return jsonify({'msg':'Ningún usuario encontrado'}),404

@app.route('/reservation_date/<int:date>', methods=['GET'])



@app.route('/delete_reservation/<int:id_reserva>', methods=['DELETE'])
# TODO pasar la id del usuario con el JWT y comprobar
def deleteReservation(id_reserva):
    reservation_to_delete = Reservation.query.filter_by(id=id_reserva).first()
    service_id=reservation_to_delete.id_services
    places = reservation_to_delete.places

    if reservation_to_delete:
        db.session.delete(reservation_to_delete) 
        service_update = Services.query.get(service_id)
        service_update.capacity += places
        db.session.commit() 
        return jsonify({'msg': 'Reserva eliminada correctamente.'}), 200
    else:
        return jsonify({'msg': 'No hay ninguna reserva con ese dato.'}), 404  



##TODO PENDIENTE MODIFICAR RESERVA COMPLETA O UN SERVICIO
@app.route('/update_reservation/<int:id_reserva>', methods=['PUT'])
# TODO pasar la id del usuario con el JWT y comprobar
def updateReservation(id_reserva):
    id_user = request.json.get("id_user")
    new_id_service = request.json.get('id_service')
    new_places = request.json.get('places')
    date = request.json.get('date')
    reservation_to_update = Reservation.query.filter_by(id=id_reserva).first()

    if not id_user or not new_id_service or not new_places or not date:
        print(request.json())
        return jsonify({'msg': 'Los datos requeridos no son válidos'}), 400

    try:
        date = datetime.strptime(date, "%d-%m-%Y")  
    except ValueError:
        return jsonify({'msg': 'Formato de fecha inválido. Usa DD-MM-YYYY'}), 400

    try:
        new_places = int(new_places)
    except ValueError:
        return jsonify({'msg': 'El número de plazas debe ser un entero.'}), 400

    user = User.query.get(id_user)
    if not user:
        return jsonify({'msg': 'Usuario no encontrado.'}), 404
    
    service = Services.query.get(new_id_service)
    if not service:
        return jsonify({'msg': f'Servicio con ID {new_id_service} no encontrado.'}), 404
    
    if not reservation_to_update:
        return jsonify({'msg': 'Reserva no encontrada.'}), 404

    # Recuperar la reserva original para obtener los datos necesarios
    original_service_id = reservation_to_update.id_services
    original_places = reservation_to_update.places
    original_date = reservation_to_update.date

    # Calcular el total reservado para el servicio y la fecha original
    total_reserved_original = Reservation.query.filter(
        Reservation.id_services == original_service_id,
        Reservation.date == original_date
    ).with_entities(db.func.sum(Reservation.places)).scalar() or 0

    # Recuperar la capacidad total del servicio original
    original_service = Services.query.get(original_service_id)
    total_capacity_original = original_service.capacity

    # Calcular la capacidad restante
    remaining_capacity_original = total_capacity_original - total_reserved_original + original_places

    # Si la reserva está cambiando de servicio, comprobar la nueva capacidad
    if new_id_service != original_service_id:
        total_reserved_new = Reservation.query.filter(
            Reservation.id_services == new_id_service,
            Reservation.date == date
        ).with_entities(db.func.sum(Reservation.places)).scalar() or 0

        total_capacity_new = service.capacity
        remaining_capacity_new = total_capacity_new - total_reserved_new

        # Verificar si hay suficiente capacidad en el nuevo servicio
        if new_places > remaining_capacity_new:
            return jsonify({'msg': f'No hay suficientes plazas disponibles para el servicio ID {new_id_service}. Plazas restantes: {remaining_capacity_new}'}), 400

    # Actualizar la reserva existente
    reservation_to_update.id_user = id_user
    reservation_to_update.id_services = new_id_service
    reservation_to_update.places = new_places
    reservation_to_update.date = date

    # Actualizar la capacidad de los servicios
    original_service.capacity = remaining_capacity_original  # Sumar la capacidad del servicio original
    service.capacity -= new_places  # Restar las nuevas plazas

    # Guardar los cambios en la base de datos
    db.session.commit()

    return jsonify({'msg': 'Reserva actualizada correctamente.', 'reservation': reservation_to_update.serialize()}), 200
