from flask_pymongo import PyMongo

def init_db(app):
    # No sobrescribas app.config["MONGO_URI"], ya que se configura en app.py
    mongo = PyMongo(app)
    return mongo
