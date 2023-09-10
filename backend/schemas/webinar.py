from pydantic import BaseModel


class WebinarBase(BaseModel):
    name: str
    description: str
    time_starts: str
    preview_image_url: str
    video_url: str
    author_name: str
