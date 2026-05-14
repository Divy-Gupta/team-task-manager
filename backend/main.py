from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from fastapi.middleware.cors import CORSMiddleware

import models
import schemas

from database import engine, SessionLocal
from auth import create_access_token


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DATABASE CONNECTION

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# HOME ROUTE

@app.get("/")

def home():

    return {
        "message": "Team Task Manager API Running"
    }
    
@app.post("/signup")

def signup(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = bcrypt.hash(user.password)

    new_user = models.User(

        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role

    )

    db.add(new_user)

    db.commit()

    return {
        "message": "User created successfully"
    }

@app.post("/login")

def login(
    data: schemas.LoginData,
    db: Session = Depends(get_db)
):

    user = db.query(models.User).filter(
        models.User.email == data.email
    ).first()

    if not user:

        raise HTTPException(
            status_code=400,
            detail="Invalid Email"
        )

    if not bcrypt.verify(
        data.password,
        user.password
    ):

        raise HTTPException(
            status_code=400,
            detail="Invalid Password"
        )

    token = create_access_token({

        "id": user.id,
        "role": user.role

    })

    return {

        "token": token,
        "role": user.role,
        "user_id": user.id

    }

@app.post("/projects")

def create_project(
    project: schemas.ProjectCreate,
    db: Session = Depends(get_db)
):

    new_project = models.Project(

    title=project.title,
    description=project.description,
    status=project.status,
    created_by=1

)

    db.add(new_project)

    db.commit()

    return {
        "message": "Project created"
    }

@app.get("/projects")

def get_projects(
    db: Session = Depends(get_db)
):

    projects = db.query(models.Project).all()

    return projects

@app.post("/tasks")

def create_task(
    task: schemas.TaskCreate,
    db: Session = Depends(get_db)
):

    new_task = models.Task(

        title=task.title,
        status=task.status,
        assigned_to=task.assigned_to,
        project_id=task.project_id

    )

    db.add(new_task)

    db.commit()

    return {
        "message": "Task created"
    }
    
@app.get("/tasks")

def get_tasks(
    db: Session = Depends(get_db)
):

    tasks = db.query(models.Task).all()

    return tasks


# DELETE PROJECT

@app.delete("/projects/{id}")

def delete_project(
    id:int,
    db:Session=Depends(get_db)
):

    project = db.query(models.Project).filter(
        models.Project.id == id
    ).first()

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    db.delete(project)

    db.commit()

    return {
        "message":"Project Deleted"
    }



# DELETE TASK

@app.delete("/tasks/{id}")

def delete_task(
    id:int,
    db:Session=Depends(get_db)
):

    task = db.query(models.Task).filter(
        models.Task.id == id
    ).first()

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)

    db.commit()

    return {
        "message":"Task Deleted"
    }
    
# UPDATE TASK STATUS

@app.put("/tasks/{id}")

def update_task(

    id:int,
    status:str,
    db:Session=Depends(get_db)

):

    task = db.query(models.Task).filter(
        models.Task.id == id
    ).first()

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.status = status

    db.commit()

    return {
        "message":"Task Updated"
    }