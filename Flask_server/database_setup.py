"""This quick start is based off of https://docs.sqlalchemy.org/en/20/orm/quickstart.html

While User and Address is a modern example showing Foreign Keys and how to connect tables,
the Simple class should be enough to complete your Prelab"""

from typing import Optional,List
from sqlalchemy.orm import DeclarativeBase,Mapped,mapped_column,relationship
from sqlalchemy import ForeignKey
import datetime

class Base(DeclarativeBase):
    pass


class Schedule(Base):
    """An example using regular Columns and no type annotation. 
        Enough for prelab, no foreign key usage. Similar effect but old convention.
    """
    __tablename__ = "schedule"
    id: Mapped[str] = mapped_column(primary_key=True)
    SUMMARY: Mapped[Optional[str]]
    DTSTART: Mapped[Optional[datetime.datetime]]
    DTEND: Mapped[Optional[datetime.datetime]]
    DESCRIPTION: Mapped[Optional[str]]
    LOCATION: Mapped[Optional[str]]
    subjectsID: Mapped[Optional[str]] = mapped_column(ForeignKey("subjects.id"))

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, SUMMARY={self.SUMMARY!r}, subject={self.subjectsID!r})"


class Task(Base):
    """An example using regular Columns and no type annotation. 
        Enough for prelab, no foreign key usage. Similar effect but old convention.
    """
    __tablename__ = "task"
    id: Mapped[str] = mapped_column(primary_key=True)
    SUMMARY: Mapped[Optional[str]]
    DTSTART: Mapped[Optional[datetime.datetime]]
    DTEND: Mapped[Optional[datetime.datetime]]
    DESCRIPTION: Mapped[Optional[str]]
    LOCATION: Mapped[Optional[str]]
    STATUS: Mapped[Optional[str]]
    PRIORITY: Mapped[Optional[int]]
    COMPLETED: Mapped[Optional[datetime.datetime]]
    subjectsID: Mapped[Optional[str]] = mapped_column(ForeignKey("subjects.id"))

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, SUMMARY={self.SUMMARY!r}, subject={self.subjectsID!r})"


class Subjects(Base):
    __tablename__ = "subjects"
    id: Mapped[str] = mapped_column(primary_key=True)
    subject_Name: Mapped[Optional[str]]
    current_Grade: Mapped[Optional[int]]
    target_Grade: Mapped[Optional[int]]
    schedule_list : Mapped[List["Schedule"]] = relationship()
    task_list : Mapped[List["Task"]] = relationship()

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, subject={self.subject_Name!r}, Current Grade={self.current_Grade!r}  Target Grade={self.target_Grade!r})"


def create_table(engine):
    """Uses all the Base Metadata in this file to create tables"""
    Base.metadata.create_all(engine)
    

if __name__ == "__main__":
    from sqlalchemy import create_engine
    engine = create_engine("sqlite:///Flask_server/database/userdata.db", echo=True)
    create_table(engine)
    
