from flask import Flask # type: ignore
from dotenv import load_dotenv # type: ignore
import os

from routes.animales import animales

load_dotenv()
def create_app():
    app = Flask(__name__)

    # Registro de blueprints
    app.register_blueprint(animales, url_prefix='/api')

    return app

