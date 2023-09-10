from pydantic import BaseModel


class LessonBase(BaseModel):
    name: str
    course_id: int
    module_id: int
    video_link: str
    text: str
    tasks: list[int]
