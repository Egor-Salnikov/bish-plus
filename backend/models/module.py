from sqlalchemy import Column, Integer, String, Text
from utils.db import Base


class Module(Base):
    __tablename__ = 'module_info'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    course_id = Column(Integer)
    lessons = Column(Text)
