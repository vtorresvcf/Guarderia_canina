from app import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'user'  
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), nullable=False)
    username = db.Column(db.String(40), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  
    email = db.Column(db.String(60), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=True)
    is_admin = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    reservation = db.relationship('Reservation', back_populates='user')

    def __repr__(self):
        return f'<User {self.name} {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "email": self.email,
            "phone": self.phone,
            "is_admin": self.is_admin,
            "created_at": self.created_at,
        }

class Services(db.Model):
    __tablename__ = 'services' 
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), unique=True, nullable=False)
    description = db.Column(db.String(200), nullable=False)
    capacity = db.Column(db.Integer, default=30)
    prices = db.Column(db.Numeric(10, 2), nullable=False)

    reservations = db.relationship('Reservation', back_populates='service')

    def __repr__(self):
        return f'<Service {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,  
            "prices": self.prices,
            "capacity": self.capacity
        }

class Reservation(db.Model):
    __tablename__ = 'reservation'  # Cambiado a __tablename__
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    id_services = db.Column(db.Integer, db.ForeignKey("services.id"), nullable=False)
    places = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='reservation')
    service = db.relationship('Services', back_populates='reservations')

    def __repr__(self):
        return f'<Reservation {self.date}>'

    def serialize(self):
        return {
            "id_reserva": self.id,
            "id_user": self.id_user,
            "id_services": self.id_services,
            'date': self.date.strftime("%d-%m-%Y"),
            "created_at": self.created_at,
        }
