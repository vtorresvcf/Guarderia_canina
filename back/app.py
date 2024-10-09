from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Crear la aplicación Flask
app = Flask(__name__)

# Configuración de la base de datos PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql://postgres:C0c0123#@localhost:5432/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar la base de datos y migraciones
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Importar modelos y rutas
from models import *
from routes import *

if __name__ == '__main__':
    app.run(debug=True)
