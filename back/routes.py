from flask import Blueprint, jsonify, request
from app import db, bcrypt
from models import User, Reservation, Services, db
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

bp = Blueprint('routes', __name__)
    


# Ruta para crear usuarios

@bp.route('/add_user', methods=['POST'])

def Users():
    name = request.json.get("name", None)
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    phone = request.json.get("phone", None)
    is_admin = request.json.get("is_admin", False)

    if not name or not username or not password or not email:
        return jsonify({'msg': 'Los datos requeridos no son válidos'}), 400

    
    pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'msg': 'El usuario ya existe', 'register': False}), 409


    new_user = User(name=name, username=username, password=pw_hash, email=email, phone=phone, is_admin=is_admin)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=str(new_user.id))

    return jsonify({'msg': 'Usuario registrado correctamente', 'register': True, "token": access_token, 'user': new_user.serialize()}), 201




def create_admin():
    admin = User.query.filter_by(email="admin@admin.com").first()
    if not admin:
        pw_hash = bcrypt.generate_password_hash("administrador").decode('utf-8')
        admin_user = User(
            name="Administrador",
            username="administrador",
            password=pw_hash,
            email="admin@admin.com",
            phone=None,
            is_admin=True
        )
        db.session.add(admin_user)
        db.session.commit()
        print("Usuario admin creado correctamente")
    else:
        print("Usuario ya existe")





@bp.route('/login', methods=['POST'])
def Login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"msg": "Faltan datos", "login": False}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "El usuario no existe", "login": False}), 404

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"msg": "La contraseña no es correcta", "login": False}), 401

    # Convertir user.id explícitamente a string si es necesario
    access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(hours=1))
    return jsonify({"msg": "Usuario logeado correctamente", "login": True, "token": access_token, "user": user.serialize()}), 200


@bp.route('/users', methods=['GET'])
##TODO  PENDIENTE VALIDAR CON JWT QUE SEA SOLO EL ADMIN
def getAllUsers():
    users = User.query.all()
    users=[user.serialize() for user in users]
    if users:
        return jsonify({'user': users}),200
    return jsonify({'msg':'Ningún usuario encontrado'}),404


@bp.route('/add_service', methods=['POST'])
@jwt_required()
def AddService():
    name= request.json.get("name" ,None)
    description= request.json.get("description", None)
    prices = request.json.get("prices", None)

    identidad = get_jwt_identity()
    usuario = User.query.filter_by(id=identidad).first()

    
    if not name or not description or prices is None:
        return jsonify({'msg': 'Los datos requeridos no son válidos'}), 400
    
    if not usuario or not usuario.is_admin:
        return jsonify({"error": "Acceso no autorizado. Solo administradores tienen acceso."}), 403
    
    existing_service = Services.query.filter_by(name=name).first()
    if existing_service:
        return jsonify({"error": "El servicio ya está creado."}), 400
    else:
        new_service = Services(name=name, description=description,prices=prices)
        db.session.add(new_service)
        db.session.commit()
        return jsonify({'msg':'Nuevo servicio creado', 'service':new_service.serialize(), 'success': True})


@bp.route('/delete_service', methods=['DELETE'])
@jwt_required()
def deleteService():
    id= request.json.get("id" ,None)

    identidad = get_jwt_identity()
    usuario = User.query.filter_by(id=identidad).first()

    
    if not id :
        return jsonify({'msg': 'No se ha proporcionado el Id de servicio'}), 400
    
    if not usuario or not usuario.is_admin:
        return jsonify({"error": "Acceso no autorizado."}), 403
    
    service_deleted = Services.query.filter_by(id=id).first()

    if not service_deleted:
        return jsonify({'msg': 'Servicio no encontrado'}),404
    
    isService_reservations = Reservation.query.filter_by(id_services=id).all()
    print(isService_reservations)
    if isService_reservations:
        return jsonify({'msg': "No se puede eliminar el servicio porque ya tiene datos relacionados"})
 
    db.session.delete(service_deleted)
    db.session.commit()
    return jsonify({'msg':'Servicio eliminado', 'service_deleted':service_deleted.serialize(), 'success': True})



@bp.route('/services', methods=['GET'])
##TODO  PENDIENTE VALIDAR CON JWT QUE SEA SOLO EL ADMIN
def getAllServices():
    services = Services.query.all()
    services=[service.serialize() for service in services]
    if services:
        return jsonify({'services': services}),200
    return jsonify({'msg':'Ningún usuario encontrado'}),404

@bp.route('/add_reservation', methods=['POST'])
@jwt_required()
def AddReservation():
    # Recupera el ID del usuario desde el token
    id_user = get_jwt_identity()

    # Asegúrate de convertir a entero si es necesario
    try:
        id_user = int(id_user)
    except ValueError:
        return jsonify({'msg': 'Identidad del usuario inválida.', "reservation": False}), 400

    id_services = request.json.get("id_services")
    places = request.json.get("places")
    dateStart = request.json.get("dateStart")
    endDate = request.json.get("endDate")

    if not id_services or not places or not dateStart or not endDate:
        return jsonify({'msg': 'Los datos requeridos no son válidos', "reservation": False}), 400

    try:
        dateStart = datetime.strptime(dateStart, "%d-%m-%Y")
        endDate = datetime.strptime(endDate, "%d-%m-%Y")
        if endDate < dateStart:
            return jsonify({'msg': 'La fecha de fin no puede ser anterior a la fecha de inicio.', "reservation": False}), 400
    except ValueError:
        return jsonify({'msg': 'Formato de fecha inválido. Usa DD-MM-YYYY', "reservation": False}), 400

    try:
        places = int(places)
    except ValueError:
        return jsonify({'msg': 'El número de plazas debe ser un entero.', "reservation": False}), 400

    # Consulta al usuario por su ID
    user = User.query.get(id_user)
    if not user:
        return jsonify({'msg': 'Usuario no encontrado.', "reservation": False}), 404

    # Consulta el servicio
    service = Services.query.get(id_services)
    if not service:
        return jsonify({'msg': f'Servicio con ID {id_services} no encontrado.', "reservation": False}), 404

    # Verifica la capacidad restante
    total_reserved = Reservation.query.filter(
        Reservation.id_services == service.id,
        Reservation.dateStart == dateStart,
        Reservation.endDate == endDate,
    ).with_entities(db.func.sum(Reservation.places)).scalar() or 0

    remaining_capacity = service.capacity - total_reserved
    if places > remaining_capacity:
        return jsonify({'msg': f'No hay suficientes plazas disponibles. Plazas restantes: {remaining_capacity}', "reservation": False}), 400

    # Verifica si ya existe una reserva para este usuario y servicio en ese rango de fechas
    existing_reservation = Reservation.query.filter_by(
        id_user=id_user, id_services=service.id, dateStart=dateStart, endDate=endDate
    ).first()
    if existing_reservation:
        # Formatear las fechas al formato deseado
        formatted_start_date = datetime.strftime(dateStart, "%d-%m-%Y")
        formatted_end_date = datetime.strftime(endDate, "%d-%m-%Y")

        # Construir el mensaje dependiendo si las fechas son iguales o no
        if dateStart == endDate:
            msg = f"Ya tienes una reserva para el día {formatted_start_date}."
        else:
            msg = f"Ya tienes una reserva para los días {formatted_start_date} - {formatted_end_date}."
        return jsonify({"msg": msg, "reservation": False}), 400

    # Cálculo del precio total (asumiendo que el servicio tiene un campo `price` por día)
    delta_days = (endDate - dateStart).days

    # Si las fechas son iguales, entonces delta_days debe ser al menos 1
    if delta_days == 0:
        delta_days = 1

    if delta_days < 0:
        return jsonify({"msg": "La fecha de finalización no puede ser antes de la fecha de inicio.", "reservation": False}), 400

    # Precio total = precio por día * cantidad de días * cantidad de plazas
    totalPrice = service.prices * delta_days * places

    # Crea una nueva reserva
    new_reservation = Reservation(
        id_user=id_user, id_services=service.id, places=places, dateStart=dateStart, endDate=endDate, totalPrice=totalPrice
    )
    db.session.add(new_reservation)
    db.session.commit()

    # Actualiza la capacidad del servicio
    service.capacity -= places
    db.session.commit()

    return jsonify({'msg': 'Nueva reserva creada', 'service': new_reservation.serialize(), "reservation": True}), 201



@bp.route('/getReservationsUser', methods=['GET'])
@jwt_required()
def getUserReservations():

    # Recupera el ID del usuario desde el token
    id_user = get_jwt_identity()

    reservas = Reservation.query.filter_by(id_user=id_user).all()
    if reservas:
        # Serializar las reservas y añadir price y description del servicio asociado
        reservations = []
        for reserva in reservas:
            reservation_data = reserva.serialize()  # serializa la reserva
            
            # Añadir el precio y la descripción del servicio asociado a la reserva
            service = reserva.service  # Accede al servicio relacionado
           
            if service:
                # Añadir el precio y la descripción del servicio
                reservation_data['serviceDescription'] = service.description  # Añadir descripción
            else:
                reservation_data['serviceDescription'] = None

            reservations.append(reservation_data)

        return jsonify({'reservations': reservations}), 200

    return jsonify({'msg': 'No hay reservas para este usuario.'}), 404

@bp.route('/getAllAdmin', methods=['GET'])
@jwt_required()
def getAllReservations():

    identidad = get_jwt_identity()
    usuario = User.query.filter_by(id=identidad).first()

    # Verifica si el usuario es administrador
    if not usuario or not usuario.is_admin:
        return jsonify({"error": "Acceso no autorizado. Solo administradores pueden ver las reservas."}), 403

    # Si el usuario es administrador, obtiene todas las reservas
    reservas = Reservation.query.all()
    users = User.query.all()
    services = Services.query.all()
    serialized_reservations = [reserva.serialize() for reserva in reservas]
    serialized_users = [user.serialize() for user in users]
    serialized_services = [service.serialize() for service in services]
    return jsonify({"reservations": serialized_reservations, "users":serialized_users, "services":serialized_services}), 200



@bp.route('/delete_reservation/<int:id_reserva>', methods=['DELETE'])
@jwt_required()
def deleteReservation(id_reserva):
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({'msg': 'No estás autorizado'}), 401

    reservation_to_delete = Reservation.query.filter_by(id=id_reserva).first()

    if not reservation_to_delete:
        return jsonify({'msg': 'No hay ninguna reserva con ese dato.'}), 404

    if int(reservation_to_delete.id_user) != int(user_id):
        return jsonify({'msg': 'No estás autorizado para eliminar esta reserva.'}), 403

    try:
        # Recuperar datos relacionados con la reserva
        service_id = reservation_to_delete.id_services
        places = reservation_to_delete.places

        # Eliminar la reserva
        db.session.delete(reservation_to_delete)

        # Actualizar la capacidad del servicio
        service_update = Services.query.get(service_id)
        if service_update:
            # Recálculo de la capacidad
            total_reserved = Reservation.query.filter(
                Reservation.id_services == service_id,
                Reservation.dateStart == reservation_to_delete.dateStart,
                Reservation.endDate == reservation_to_delete.endDate
            ).with_entities(db.func.sum(Reservation.places)).scalar() or 0

            total_capacity = service_update.capacity
            remaining_capacity = total_capacity - total_reserved + places

            service_update.capacity = remaining_capacity  # Actualizamos la capacidad

        # Confirmar los cambios en la base de datos
        db.session.commit()
        return jsonify({'msg': 'Reserva eliminada correctamente.', 'success': True}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'msg': f'Error al eliminar la reserva: {str(e)}'}), 500

@bp.route('/update_reservation/<int:id_reserva>', methods=['PUT'])
@jwt_required()
def updateReservation(id_reserva):
    id_user = get_jwt_identity()
    new_id_service = request.json.get('id_services')
    new_places = request.json.get('places')
    new_dateStart = request.json.get('dateStart')
    new_endDate = request.json.get('endDate')
    reservation_to_update = Reservation.query.filter_by(id=id_reserva).first()

    if not id_user:
        return jsonify({'msg': 'ID de usuario no proporcionado.'}), 400
    if not new_id_service:
        return jsonify({'msg': 'ID del servicio no proporcionado.'}), 400
    if not new_places:
        return jsonify({'msg': 'Número de plazas no proporcionado.'}), 400
    if not new_dateStart:
        return jsonify({'msg': 'Fecha de inicio no proporcionada.'}), 400
    if not new_endDate:
        return jsonify({'msg': 'Fecha de fin no proporcionada.'}), 400

    try:
        new_dateStart = datetime.strptime(new_dateStart, "%d-%m-%Y")
        new_endDate = datetime.strptime(new_endDate, "%d-%m-%Y")  
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
    original_dateStart = reservation_to_update.dateStart
    original_endDate = reservation_to_update.endDate

    # Recálculo de la capacidad del servicio original
    original_service = Services.query.get(original_service_id)
    total_reserved_original = Reservation.query.filter(
        Reservation.id_services == original_service_id,
        Reservation.dateStart == original_dateStart,
        Reservation.endDate == original_endDate
    ).with_entities(db.func.sum(Reservation.places)).scalar() or 0

    total_capacity_original = original_service.capacity
    remaining_capacity_original = total_capacity_original - total_reserved_original + original_places

    # Si la reserva está cambiando de servicio, comprobar la nueva capacidad
    if new_id_service != original_service_id:
        total_reserved_new = Reservation.query.filter(
            Reservation.id_services == new_id_service,
            Reservation.dateStart == new_dateStart,
            Reservation.endDate == new_endDate
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
    reservation_to_update.dateStart= new_dateStart
    reservation_to_update.endDate= new_endDate

    # Actualizar la capacidad de los servicios
    original_service.capacity = remaining_capacity_original  # Ajustamos la capacidad original
    service.capacity -= new_places  # Restamos las plazas del nuevo servicio

    # Guardar los cambios en la base de datos
    db.session.commit()

    return jsonify({'msg': 'Reserva actualizada correctamente.', 'updated': True, 'reservation': reservation_to_update.serialize()}), 200
