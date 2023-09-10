from sqlalchemy import Column, Integer, String, Text
from utils.db import Base


class User(Base):
    __tablename__ = 'user_info'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50))
    email = Column(String(255), unique=True)
    password = Column(String(255))
    photo_url = Column(String(1000))
    courses_enrolled = Column(Text)
    role = Column(String(255))
