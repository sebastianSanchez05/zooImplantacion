from bson import ObjectId # type: ignore

class Animal:
    def __init__(self, nombre, especie, edad, origen, nombre_cientifico, wiki_url, _id=None):
        self.nombre = nombre
        self.especie = especie
        self.edad = edad
        self.origen = origen
        self.nombre_cientifico = nombre_cientifico
        self.wiki_url = wiki_url
        self._id = _id

    def hacerColeccion(self):
        animal_dict = {
            "nombre": self.nombre,
            "especie": self.especie,
            "edad": self.edad,
            "origen": self.origen,
            "nombre_cientifico": self.nombre_cientifico,
            "wiki_url": self.wiki_url
        }
        if self._id:
            animal_dict["_id"] = self._id
        return animal_dict

    @staticmethod
    def from_dict(data):
        _id = data.get('_id')
        if isinstance(_id, ObjectId):
            _id = str(_id)  # Convertir ObjectId a cadena
        return Animal(
            nombre=data['nombre'],
            especie=data['especie'],
            edad=data['edad'],
            origen=data['origen'],
            nombre_cientifico=data['nombre_cientifico'],
            wiki_url=data['wiki_url'],
            _id=_id
        )
