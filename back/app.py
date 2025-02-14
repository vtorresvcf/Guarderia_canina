import os
os.environ["FLASK_ENV"] = "development"
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import Config

# Inicialización de extensiones
db = SQLAlchemy()
bcrypt = Bcrypt()
migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    if os.environ.get('FLASK_ENV') == 'development':
        app.config['DEBUG'] = True
    else:
        app.config['DEBUG'] = False

    # Inicializar extensiones
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    

    # Registrar las rutas
    with app.app_context():
        from routes import bp as routes_bp
        app.register_blueprint(routes_bp)

    return app

