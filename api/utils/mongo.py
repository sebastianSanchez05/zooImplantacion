from pymongo import MongoClient # type: ignore
import certifi # type: ignore
import os

ca = certifi.where()

def conexion():
    client = MongoClient(os.getenv("MONGO_URI"), tlsCAFile=ca)
    try:
        # Confirmar la conexión a la base de datos
        client.admin.command('ping')
        print("Conexión a MongoDB exitosa!")
        db = client['zoo_db']
        return db
    except Exception as e:
        print(f"Ha fallado la conexión a MongoDB: {e}")
        return None
