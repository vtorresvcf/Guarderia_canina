class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:C0c0123%23@localhost:5432/guarderia'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'clavesecreta'
    JWT_SECRET_KEY = 'clavesecreta'

    DEBUG = True
    FLASK_ENV = "development"