from sqlalchemy import Column, Integer, String, Text
from utils.db import Base


class Task(Base):
    __tablename__ = 'task_info'

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text)
    answer = Column(String(255))
    lesson_id = Column(Integer)
    module_id = Column(Integer)
    course_id = Column(Integer)
