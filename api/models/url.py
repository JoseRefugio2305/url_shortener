from extensions.database import Base
from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship


class Url(Base):
    __tablename__ = "urls"
    id = Column(Integer, primary_key=True, autoincrement=True)
    original_url = Column(String(2048), nullable=False)
    short_url = Column(String(10), unique=True, nullable=False)
    clicks = Column(Integer, default=0)
    createdt_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    last_accessed_at = Column(DateTime(timezone=True), onupdate=func.now())
    ##Llave foranea para relacionar con el usuario
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    # Definimos la relacion
    usersRel = relationship("User", back_populates="urlsRel")

    def __init__(self, original_url, short_url, user_id):
        self.original_url = original_url
        self.short_url = short_url
        self.clicks = 0
        self.user_id = user_id
