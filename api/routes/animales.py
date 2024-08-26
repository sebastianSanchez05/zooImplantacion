""" from flask import Blueprint, jsonify, request
from bson import ObjectId  # Necesario para trabajar con ObjectId de MongoDB

# Crear el Blueprint
animales_bp = Blueprint('animales', __name__)

def init_animal_routes(mongo):

    @animales_bp.route('/animales', methods=['GET'])
    def get_animales():
        animales = mongo.db.animales.find()
        data = [{'_id': str(animal['_id']), 'nombre': animal['nombre'], 'especie': animal['especie']} for animal in animales]
        return jsonify(data)

    @animales_bp.route('/animales', methods=['POST'])
    def add_animal():
        nombre = request.json['nombre']
        especie = request.json['especie']
        animal_id = mongo.db.animales.insert_one({'nombre': nombre, 'especie': especie}).inserted_id
        return jsonify({'_id': str(animal_id), 'nombre': nombre, 'especie': especie})

    @animales_bp.route('/animales/<id>', methods=['PUT'])
    def update_animal(id):
        nombre = request.json['nombre']
        especie = request.json['especie']
        mongo.db.animales.update_one({'_id': ObjectId(id)}, {'$set': {'nombre': nombre, 'especie': especie}})
        return jsonify({'_id': id, 'nombre': nombre, 'especie': especie})

    @animales_bp.route('/animales/<id>', methods=['DELETE'])
    def delete_animal(id):
        mongo.db.animales.delete_one({'_id': ObjectId(id)})
        return jsonify({'message': 'Animal eliminado'})

    # Retornar el blueprint al final
    return animales_bp
 """
from flask import Blueprint, jsonify

animales_bp = Blueprint('animales', __name__)

def init_animal_routes(mongo):
    @animales_bp.route('/animales', methods=['GET'])
    def get_animales():
        # Verifica que 'mongo' no es None
        if mongo is None:
            return jsonify({"error": "La conexión a la base de datos no está inicializada"}), 500

        animales = mongo.db.animales.find()
        data = [{'_id': str(animal['_id']), 'nombre': animal['nombre'], 'especie': animal['especie']} for animal in animales]
        return jsonify(data)

    return animales_bp
