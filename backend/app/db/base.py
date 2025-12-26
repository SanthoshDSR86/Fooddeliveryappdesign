from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class BaseMixin:
    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(String, default="2022-01-01 00:00:00")
    updated_at = Column(String, default="2022-01-01 00:00:00")