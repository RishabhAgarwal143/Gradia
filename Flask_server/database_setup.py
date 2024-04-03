"""This quick start is based off of https://docs.sqlalchemy.org/en/20/orm/quickstart.html

While User and Address is a modern example showing Foreign Keys and how to connect tables,
the Simple class should be enough to complete your Prelab"""

from typing import Optional,List
from sqlalchemy.orm import DeclarativeBase,Mapped,mapped_column,relationship
from sqlalchemy import ForeignKey
import datetime

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "user"

    userinfoID : Mapped[str]= mapped_column(primary_key=True)
    access_Token : Mapped[str]
    schedule_list : Mapped[List["Schedule"]] = relationship()
    task_list : Mapped[List["Task"]] = relationship()
    subjects_list : Mapped[List["Subjects"]] = relationship()
    
    def __repr__(self) -> str:
        return super().__repr__()
    
    def update_access_token(self,session, new_access_token):
        # Query the user by userinfoID
            self.access_Token = new_access_token
            session.commit()

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
    userinfoID: Mapped[str] = mapped_column(ForeignKey("user.userinfoID"))
    subjectsID: Mapped[Optional[str]] = mapped_column(ForeignKey("subjects.id"))
    schedule_grade: Mapped[Optional["Schedule_grade_info"]] = relationship()
    
    def __repr__(self) -> str:
        return super().__repr__()
    # def __repr__(self) -> str:
    #     return f"Schedule(id={self.id!r}, SUMMARY={self.SUMMARY!r}, subject={self.subjectsID!r})"


class Task(Base):
    """An example using regular Columns and no type annotation. 
        Enough for prelab, no foreign key usage. Similar effect but old convention.
    """
    __tablename__ = "task"
    id: Mapped[str] = mapped_column(primary_key=True)
    SUMMARY: Mapped[Optional[str]]
    DTSTART: Mapped[Optional[datetime.datetime]]
    DUE: Mapped[Optional[datetime.datetime]]
    DESCRIPTION: Mapped[Optional[str]]
    LOCATION: Mapped[Optional[str]]
    STATUS: Mapped[Optional[str]]
    PRIORITY: Mapped[Optional[int]]
    COMPLETED: Mapped[Optional[datetime.datetime]]
    userinfoID: Mapped[str] = mapped_column(ForeignKey("user.userinfoID"))
    subjectsID: Mapped[Optional[str]] = mapped_column(ForeignKey("subjects.id"))
    task_grade: Mapped[Optional["Task_grade_info"]] = relationship()
    
    def __repr__(self) -> str:
        return f"Task(id={self.id!r}, SUMMARY={self.SUMMARY!r}, subject={self.subjectsID!r})"


class Subjects(Base):
    __tablename__ = "subjects"
    id: Mapped[str] = mapped_column(primary_key=True)
    subject_Name: Mapped[Optional[str]]
    current_Grade: Mapped[Optional[int]]
    target_Grade: Mapped[Optional[int]]
    userinfoID: Mapped[str] = mapped_column(ForeignKey("user.userinfoID"))
    schedule_list : Mapped[List["Schedule"]] = relationship()
    task_list : Mapped[List["Task"]] = relationship()

    def __repr__(self) -> str:
        return f"Subjects(id={self.id!r}, subject={self.subject_Name!r}, Current Grade={self.current_Grade!r}  Target Grade={self.target_Grade!r})"


class Task_grade_info(Base):
    __tablename__ = "task_grade"
    id: Mapped[str] = mapped_column(primary_key=True)
    current_Grade: Mapped[Optional[int]]
    task_Weightage: Mapped[Optional[int]]
    overall_Percentage: Mapped[Optional[int]]
    extra_info: Mapped[Optional[str]]
    time_taken: Mapped[Optional[datetime.time]]
    task_id: Mapped[Optional[str]] = mapped_column(ForeignKey("task.id"))
    
class Schedule_grade_info(Base):
    __tablename__ = "schedule_grade"
    id: Mapped[str] = mapped_column(primary_key=True)
    current_Grade: Mapped[Optional[int]]
    task_Weightage: Mapped[Optional[int]]
    overall_Percentage: Mapped[Optional[int]]
    extra_info: Mapped[Optional[str]]
    attended: Mapped[Optional[bool]]
    schedule_id: Mapped[Optional[str]] = mapped_column(ForeignKey("schedule.id"))

def create_table(engine):
    """Uses all the Base Metadata in this file to create tables"""
    Base.metadata.create_all(engine)
    

if __name__ == "__main__":
    from sqlalchemy import create_engine
    engine = create_engine("sqlite:///Flask_server/database/userdata.db", echo=True)
    create_table(engine)
    
