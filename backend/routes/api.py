import json
from typing import Annotated
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.responses import JSONResponse
from utils.db import SessionLocal, Base, engine
from utils.text_compare import compare
from utils.translate import Translate
from schemas import CourseBase, UserBase, WebinarBase, ModuleBase, LessonBase, TaskBase
from models import User, Webinar, Course, Module, Lesson, Task
from sqlalchemy.orm import Session
from sqlalchemy import desc
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from utils.authorization import create_user, verify_password, create_access_token, get_current_user

import time

# app init


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Utils


Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[User, Depends(get_current_user)]

# Website routing

app.mount("/static", StaticFiles(directory="routes/website/static/"), name="static")


@app.get("/", tags=["Website"],
         summary="Landing website")
async def root():
    return FileResponse("routes/website/index.html")


@app.get("/webinar", tags=["Website"],
         summary="Page for webinar")
async def webinar():
    return FileResponse("routes/website/webinar.html")


@app.get("/create-course", tags=["Website"],
         summary="Page for creating course")
async def create_course():
    return FileResponse("routes/website/create-course.html")


@app.get("/add-course", tags=["Website"],
         summary="Page for adding course")
async def add_course():
    return FileResponse("routes/website/add-course.html")


@app.get("/login", tags=["Website"],
         summary="Page for login")
async def login():
    return FileResponse("routes/website/login.html")

@app.get("/student-profile", tags=["Website"],
         summary="Page for profile")
async def profile():
    return FileResponse("routes/website/student-profile.html")

# User


@app.post("/api/login-user/", status_code=status.HTTP_200_OK, tags=["Users"])
async def login_user(user: UserBase, db: db_dependency):
    user_db = db.query(User).filter(User.email == user.email).first()
    if user_db:
        if not verify_password(user.password, user_db.password):
            return JSONResponse(status_code=200, content={"message": "Wrong password"})
        access_token = create_access_token(user_db.id)
        return {
            "access_token": access_token,
            "token_type": "Bearer"
        }
    data = user.model_dump()
    data["courses_enrolled"] = '[]'
    data["photo_url"] = "default_avatar.png"

    data = create_user(data)
    db_user = User(**data)
    db.add(db_user)
    db.commit()

    access_token = create_access_token(db_user.id)
    return {
        "access_token": access_token,
        "token_type": "Bearer"
    }


@app.get("/api/get-user/", status_code=status.HTTP_200_OK, tags=["Users"])
async def get_user(user: user_dependency):
    return user


# Webinar


@app.get("/api/get-past-webinars/", status_code=status.HTTP_200_OK, tags=["Webinar"])
async def get_past_webinar(db: db_dependency):
    time_now = str(time.time())
    webinars = (db.query(Webinar).order_by(desc(Webinar.time_starts)).filter(Webinar.time_starts < time_now)
                .limit(10).all())
    return webinars


@app.get("/api/get-upcoming-webinars/", status_code=status.HTTP_200_OK, tags=["Webinar"])
async def get_upcoming_webinar(db: db_dependency):
    time_now = str(time.time())
    webinars = (db.query(Webinar).order_by(desc(Webinar.time_starts)).filter(Webinar.time_starts > time_now)
                .limit(3).all())
    return webinars


@app.post("/api/post-webinar/", status_code=status.HTTP_201_CREATED, tags=["Webinar"])
async def post_webinar(webinar: WebinarBase, db: db_dependency, user: user_dependency):
    db_webinar = Webinar(**webinar.model_dump())
    db.add(db_webinar)
    db.commit()


@app.delete("/api/delete-webinar/{webinar_id}", status_code=status.HTTP_200_OK, tags=["Webinar"])
async def delete_webinar(webinar_id: str, db: db_dependency, user: user_dependency):
    webinar = db.query(Webinar).filter(Webinar.id == webinar_id).first()
    if webinar is None:
        raise HTTPException(status_code=404, detail="Webinar not found")
    db.query(Webinar).filter(Webinar.id == webinar_id).delete()
    db.commit()


# Courses


@app.get("/api/get-popular-courses/", status_code=status.HTTP_200_OK, tags=["Course"])
async def get_popular_posts(db: db_dependency):
    courses = db.query(Course).order_by(desc(Course.views)).limit(30).all()
    res = []
    for course in courses:
        obj = course.__dict__
        author = db.query(User).filter(User.id == course.author_id).first()
        if author is None:
            continue
        obj["author"] = author.__dict__

        modules = []
        for module_id in json.loads(obj["modules"]):
            module = db.query(Module).filter(Module.id == module_id).first()
            if module is not None:
                lessons = []
                for lesson_id in module.lessons:
                    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
                    if lesson is not None:
                        data = lesson.__dict__
                        task_ids = json.loads(lesson.tasks)
                        tasks_content = []
                        for task_id in task_ids:
                            task = db.query(Task).filter(Task.id == task_id).first()
                            if task is not None:
                                tasks_content.append(task.__dict__)
                        data["tasks_content"] = tasks_content
                        lessons.append(data)
                module_inner_obj = {
                    "module_id": module_id,
                    "module_name": module.name,
                    "lessons": lessons
                }
                modules.append(module_inner_obj)
        obj["module_names"] = modules
        res.append(obj)
    return courses


@app.get("/api/add-view-to-course/{course_id}", status_code=status.HTTP_200_OK, tags=["Course"])
async def add_view_to_course(course_id: int, db: db_dependency, user: user_dependency):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    db.query(Course).filter(Course.id == course_id).update({Course.views: Course.views + 1})
    db.commit()


@app.post("/api/post-course/", status_code=status.HTTP_201_CREATED, tags=["Course"])
async def post_course(course: CourseBase, db: db_dependency, user: user_dependency):
    data = course.model_dump()
    data["lessons_counter"] = 0
    data["modules"] = json.dumps(course.modules)
    db_course = Course(**data)
    db.add(db_course)
    db.commit()


@app.delete("/api/delete-course/{course_id}", status_code=status.HTTP_200_OK, tags=["Course"])
async def delete_course(course_id: str, db: db_dependency, user: user_dependency):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    db.query(Course).filter(Course.id == course_id).delete()
    db.commit()


# Modules
# modules by course_id with names of lessons
# lesson_id

@app.post("/api/post-module", status_code=status.HTTP_201_CREATED, tags=["Modules"])
async def post_module(module: ModuleBase, db: db_dependency, user: user_dependency):
    data = module.model_dump()
    data["lessons"] = json.dumps(module.lessons)
    db_module = Module(**data)
    db.add(db_module)
    db.commit()
    course = db.query(Course).filter(Course.id == db_module.course_id).first()
    new_arr = []
    if course is not None and course.modules is not None and len(course.modules) > 0:
        new_arr = json.loads(course.modules)
    new_arr += [db_module.id]
    new_arr = json.dumps(new_arr)
    db.query(Course).filter(Course.id == db_module.course_id).update({Course.modules: new_arr})
    db.commit()


@app.get("/api/get-modules/{course_id}", status_code=status.HTTP_200_OK, tags=["Modules"])
async def get_modules(course_id: int, db: db_dependency, user: user_dependency):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    res = []
    for mid in json.loads(course.modules):
        module = db.query(Module).filter(Module.id == mid).first()
        if module is not None:
            res.append(module)

    return res


# Lessons


@app.post("/api/post-lesson", status_code=status.HTTP_201_CREATED, tags=["Lessons"])
async def post_lesson(lesson: LessonBase, db: db_dependency, user: user_dependency):
    data = lesson.model_dump()
    data["tasks"] = json.dumps(lesson.tasks)
    db_lesson = Lesson(**data)
    db.add(db_lesson)
    db.commit()

    module = db.query(Module).filter(Module.id == lesson.module_id).first()
    new_arr = []
    if not (module.lessons is None or len(module.lessons) == 0):
        new_arr = json.loads(module.lessons)
    new_arr += [db_lesson.id]
    new_arr = json.dumps(new_arr)
    db.query(Module).filter(Module.id == db_lesson.module_id).update({Module.lessons: new_arr})
    db.commit()

    (db.query(Course).filter(Course.id == db_lesson.course_id)
     .update({Course.lessons_counter: Course.lessons_counter + 1}))
    db.commit()


@app.get("/api/get-lessons-by-module/{module_id}", status_code=status.HTTP_200_OK, tags=["Lessons"])
async def get_lessons(module_id: int, db: db_dependency):
    module = db.query(Module).filter(Module.id == module_id).first()
    if module is None:
        raise HTTPException(status_code=404, detail="Course not found")
    res = []
    for lid in json.loads(module.lessons):
        lesson = db.query(Lesson).filter(Lesson.id == lid).first()
        data = lesson.__dict__
        if lesson is not None:
            task_ids = json.loads(lesson.tasks)
            tasks_content = []
            for task_id in task_ids:
                task = db.query(Task).filter(Task.id == task_id).first()
                if task is not None:
                    tasks_content.append(task.__dict__)
            data["tasks_content"] = tasks_content
            res.append(data)

    return res


@app.get("/api/get-lesson/{lesson_id}", status_code=status.HTTP_200_OK, tags=["Lessons"])
async def get_lesson(lesson_id, db: db_dependency):
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
    data = lesson.__dict__
    task_ids = json.loads(lesson.tasks)
    tasks_content = []
    for task_id in task_ids:
        task = db.query(Task).filter(Task.id == task_id).first()
        if task is not None:
            tasks_content.append(task.__dict__)
    data["tasks_content"] = tasks_content
    return data


# Search
@app.get("/api/search/{keyword}", status_code=status.HTTP_200_OK, tags=["Search"])
async def search(keyword: str, db: db_dependency, user: user_dependency):
    keyword = f"%{keyword}%"
    courses = db.query(Course).filter(Course.name.like(keyword)).limit(10).all()
    res = []
    for course in courses:
        obj = course.__dict__
        author = db.query(User).filter(User.id == course.author_id).first()
        if author is None:
            continue
        obj["author"] = author.__dict__

        modules = []
        for module_id in json.loads(obj["modules"]):
            module = db.query(Module).filter(Module.id == module_id).first()
            if module is not None:
                lessons = []
                for lesson_id in module.lessons:
                    lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
                    if lesson is not None:
                        lessons.append(lesson.__dict__)
                module_inner_obj = {
                    "module_id": module_id,
                    "module_name": module.name,
                    "lessons": lessons
                }
                modules.append(module_inner_obj)
        obj["module_names"] = modules
        res.append(obj)
    return courses


# Tasks


@app.post("/api/post-task/", status_code=status.HTTP_201_CREATED, tags=["Tasks"])
async def post_task(task: TaskBase, db: db_dependency, user: user_dependency):
    task_db = Task(**task.model_dump())
    db.add(task_db)
    db.commit()

    lesson = db.query(Lesson).filter(Lesson.id == task_db.lesson_id).first()
    new_arr = []
    if lesson.tasks is not None and len(lesson.tasks) > 0:
        new_arr = json.loads(lesson.tasks)
    new_arr += [task_db.id]
    new_arr = json.dumps(new_arr)
    db.query(Lesson).filter(Lesson.id == task_db.lesson_id).update({Lesson.tasks: new_arr})
    db.commit()


# Check tasks


@app.get("/api/get-matching/{right_answer}/{given_answer}", status_code=status.HTTP_200_OK, tags=["Search"])
async def get_matching(right_answer: str, given_answer: str):
    return JSONResponse(status_code=status.HTTP_200_OK, content={"matching": compare(right_answer, given_answer)})


@app.get("/api/translate/{direction}/{quote}/", status_code=status.HTTP_200_OK, tags=["Search"],
         summary="source_lang and target_lang should be 2-letter code ('tat', 'ru'), source_lang can be 'auto'")
async def translate_quote(direction: str, quote: str):
    tr = Translate()
    if direction == 'tat2rus':
        res = tr.tat2rus(quote)
    else:
        res = tr.rus2tat(quote)
    return JSONResponse(status_code=status.HTTP_200_OK, content={"translate": res})
