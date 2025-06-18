from database import engine

from models import Base
import models.user, models.place, models.booking

Base.metadata.create_all(bind=engine)

print("Tabelas criadas com sucesso!")
