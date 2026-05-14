from pydantic import BaseModel


# USER

class UserCreate(BaseModel):

    name: str

    email: str

    password: str

    role: str


class LoginData(BaseModel):

    email: str

    password: str


# PROJECT

class ProjectCreate(BaseModel):

    title: str

    description: str
    
    status: str


# TASK

class TaskCreate(BaseModel):

    title: str

    status: str

    assigned_to: int

    project_id: int