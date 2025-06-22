# back-end-python/init_db.py
from db_manager import DBManager

if __name__ == "__main__":
    db = DBManager()
    db.init_db()