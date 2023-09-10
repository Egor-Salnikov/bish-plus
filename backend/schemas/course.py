from pydantic import BaseModel


class CourseBase(BaseModel):
    name: str
    description: str
    author_id: int
    photo_url: str
    modules: list[int]
    views: int
