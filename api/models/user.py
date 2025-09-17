from extensions.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(120), nullable=False)
    # Definimos la relacion
    urlsRel = relationship("Url", back_populates="usersRel")

    def __init__(self, email, password):
        self.email = email
        self.password = password
