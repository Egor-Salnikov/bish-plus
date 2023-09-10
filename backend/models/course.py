from sqlalchemy import Column, Boolean, Integer, String, Text
from utils.db import Base


class Course(Base):
    __tablename__ = 'course_info'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    description = Column(Text)
    author_id = Column(Integer)
    photo_url = Column(String(1000))
    modules = Column(Text)
    views = Column(Integer)
    lessons_counter = Column(Integer)
