from pydantic import BaseModel


class TaskBase(BaseModel):
    question: str
    answer: str
    lesson_id: int
    module_id: int
    course_id: int
