from sqlalchemy import Column, Integer, String, Text
from utils.db import Base


class Webinar(Base):
    __tablename__ = 'webinar_info'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    description = Column(Text)
    time_starts = Column(String(255))
    preview_image_url = Column(Text)
    video_url = Column(Text)
    author_name = Column(String(255))

