# models/animal.py (opcional)
from pydantic import BaseModel

class Animal(BaseModel):
    nombre: str
    especie: str
