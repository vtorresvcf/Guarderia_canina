from app import db

# Modelo de usuario

class User(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f'<User {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }