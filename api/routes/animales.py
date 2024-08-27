from flask import Blueprint, request, jsonify # type: ignore
from bson import ObjectId # type: ignore
from utils.mongo import conexion
from models.animales import Animal

animales = Blueprint('animales', __name__)

@animales.route('/animales', methods=['GET'])
def traer_animales():
    db = conexion()
    if db is None:
        return jsonify({"message": "No se pudo conectar a la base de datos"}), 500

    # Acceder a la colección de animales
    coleccion = db['animal']
    animales = coleccion.find() 

    # Convertir los documentos en instancias de Animal
    resultado = [Animal.from_dict(animal).hacerColeccion() for animal in animales]

    return jsonify(resultado)

@animales.route('/animales/<string:id>', methods=['GET'])
def traer_animal(id):
    db = conexion()
    if db is None:
        return jsonify({"message": "No se pudo conectar a la base de datos"}), 500

    # Convertir el ID de cadena a ObjectId
    try:
        animal_id = ObjectId(id)
    except Exception as e:
        return jsonify({"message": "ID inválido"}), 400
    
    # Buscar el animal por ID
    animal = db['animal'].find_one({'_id': animal_id})

    if animal is None:
        return jsonify({"message": "Animal no encontrado"}), 404

    instancia = Animal.from_dict(animal)

    return jsonify(instancia.hacerColeccion()), 200

@animales.route('/animales', methods=['POST'])
def crear_animal():
    db = conexion()
    if db is None:
        return jsonify({"message": "No se pudo conectar a la base de datos"}), 500
    
    req = request.get_json()
    
    # Validaciones
    campos_requeridos = ["nombre", "especie", "edad", "origen", "nombre_cientifico"]
    for campos in campos_requeridos:
        if campos not in req:
            return jsonify({"message": f"El campo '{campos}' es obligatorio"}), 400
        
    # Crear animal
    nuevo_animal = Animal(
        nombre=req["nombre"],
        especie=req["especie"],
        edad=req["edad"],
        origen=req["origen"],
        nombre_cientifico=req["nombre_cientifico"]
    )
    
    instancia = nuevo_animal.hacerColeccion()
    
    # Insertar el animal en la colección de MongoDB
    coleccion = db['animal']
    resultado = coleccion.insert_one(instancia)

    return jsonify({ 'message': 'Animal creado'}), 201

@animales.route('/animales/<id>', methods=['PUT'])
def editar_animal(id):
    db = conexion()
    if db is None:
        return jsonify({"message": "No se pudo conectar a la base de datos"}), 500
    
    req = request.get_json()
    
    # Validaciones
    campos_requeridos = ["nombre", "especie", "edad", "origen", "nombre_cientifico"]
    for campo in campos_requeridos:
        if campo not in req:
            return jsonify({"message": f"El campo '{campo}' es obligatorio"}), 400
        
    # Crear animal
    animal_modificar = {
        'nombre': req["nombre"],
        'especie': req["especie"],
        'edad': req["edad"],
        'origen': req["origen"],
        'nombre_cientifico': req["nombre_cientifico"]
    }

    coleccion = db['animal']
    resultado = coleccion.update_one(
        {"_id": ObjectId(id)},  # Filtro por ID
        {"$set": animal_modificar}   # Actualización
    )

    if resultado.matched_count == 0:
        return jsonify({"message": "Animal no encontrado"}), 404

    return jsonify({ 'message': 'Animal acutalizado' })

@animales.route('/animales/<id>', methods=['DELETE'])
def eliminar_animal(id):
    db = conexion()
    if db is None:
        return jsonify({"message": "No se pudo conectar a la base de datos"}), 500
    
    # Convertir el Id a ObjectId
    try:
        animal_id = ObjectId(id)
    except Exception as e:
        return jsonify({"message": "ID inválido"}), 400

    # Eliminar el animal por ID y verificar
    resultado = db['animal'].delete_one({'_id': animal_id})
    if resultado.deleted_count == 0:
        return jsonify({"message": "Animal no encontrado"}), 400

    return jsonify({ 'message': 'Se ha eliminado el animal' }), 200
