from flask import Flask
from utils.mongo import init_db
from routes.animales import init_animal_routes
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()

def create_app():
    app = Flask(__name__)

    # Configuración de MongoDB desde la variable de entorno
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")

    # Inicializar la base de datos
    mongo = init_db(app)

    # Inicializar rutas
    animales_bp = init_animal_routes(mongo)
    app.register_blueprint(animales_bp)

    return app
