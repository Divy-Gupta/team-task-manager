from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

# USER TABLE

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    email = Column(String, unique=True)

    password = Column(String)

    role = Column(String)


# PROJECT TABLE

class Project(Base):

    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    description = Column(String)

    status = Column(String)

    created_by = Column(Integer, ForeignKey("users.id"))

    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    description = Column(String)

    created_by = Column(Integer, ForeignKey("users.id"))


# TASK TABLE

class Task(Base):

    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    status = Column(String)

    assigned_to = Column(Integer, ForeignKey("users.id"))

    project_id = Column(Integer, ForeignKey("projects.id"))