from sqlalchemy import Column, Integer, String
from backend.app.db.base import Base
from backend.app.db.base import BaseMixin

class User(Base, BaseMixin):
    __tablename__ = "users"
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)