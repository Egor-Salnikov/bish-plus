from pydantic import BaseModel


class ModuleBase(BaseModel):
    name: str
    course_id: int
    lessons: list[int]
