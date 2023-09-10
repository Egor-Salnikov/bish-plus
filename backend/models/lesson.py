from sqlalchemy import Column, Integer, String, Text
from utils.db import Base


class Lesson(Base):
    __tablename__ = 'lesson_info'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    course_id = Column(Integer)
    module_id = Column(Integer)
    video_link = Column(Text)
    text = Column(Text)
    tasks = Column(Text)
