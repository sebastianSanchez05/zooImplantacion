from flask import Flask # type: ignore
from dotenv import load_dotenv # type: ignore
from flask_cors import CORS # type: ignore

from routes.animales import animales

load_dotenv()
def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Registro de blueprints
    app.register_blueprint(animales, url_prefix='/api')

    return app

