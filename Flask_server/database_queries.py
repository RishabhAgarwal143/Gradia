"""Example uses of SQL Alchemy"""


from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select, text, create_engine
from sqlalchemy.exc import IntegrityError,NoResultFound

from database_setup import Schedule,Task,Subjects
import datetime

engine = create_engine("sqlite:///Flask_server/database/userdata.db")
Session = sessionmaker(bind=engine)
session = Session()

def check_if_object_exists(obj):
    try:
        # Query the database to find the object
        existing_object = session.query(type(obj)).filter_by(id=obj.id).one()
        return True  
    except NoResultFound:
        return False  # Object does not exist


def add_to_database(obj):
    
    if(check_if_object_exists(obj)):
        return
    
    try:
        session.add(obj)
        session.commit()
    except IntegrityError as e:
        session.rollback()
        print(f"IntegrityError occurred: {e}")
        print("An error occurred while inserting data. Please try again later.")
    finally:
    # Close the session
        session.close()

def delete_from_database(obj_class, filter_attr, filter_value):
    """Delete an object from the database."""
    obj_to_delete = session.query(obj_class).filter(getattr(obj_class, filter_attr) == filter_value).first()
    if obj_to_delete:
        session.delete(obj_to_delete)
        session.commit()
        return True
    return False

def process_add_schedule(schedules):

    if("onCreateSchedule" in schedules):
        schedule = schedules['onCreateSchedule']
        print(schedule)
        startTime = datetime.datetime.fromisoformat(schedule["DTSTART"].replace('Z', '+00:00'))
        endTime = datetime.datetime.fromisoformat(schedule["DTEND"].replace('Z', '+00:00'))
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["SUMMARY"], DTSTART=startTime, DTEND=endTime,DESCRIPTION=schedule["DESCRIPTION"], LOCATION=schedule["LOCATION"],subjectsID=schedule["subjectsID"])
        add_to_database(new_schedule)
        return

    for schedule in schedules:
        startTime = datetime.datetime.fromisoformat(schedule["start"].replace('Z', '+00:00'))
        endTime = datetime.datetime.fromisoformat(schedule["end"].replace('Z', '+00:00'))
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["title"], DTSTART=startTime, DTEND=endTime,DESCRIPTION=schedule["description"], LOCATION=schedule["location"],subjectsID=schedule["subject_id"])
        add_to_database(new_schedule)
    pass

def process_delete_schedule(schedules):
    
    schedule = schedules['onDeleteSchedule']
    print(schedules)
    delete_from_database(Schedule,"id",schedule["id"])
    pass


def process_add_task(tasks):

    if("onCreateTask" in tasks):
        task = tasks['onCreateTask']
        if(task["DTSTART"]):
            startTime = datetime.datetime.fromisoformat(task["DTSTART"].replace('Z', '+00:00'))
        if(task["DUE"]):
            endTime = datetime.datetime.fromisoformat(task["DUE"].replace('Z', '+00:00'))
        if(task["COMPLETED"]):
            completed = datetime.datetime.fromisoformat(task["COMPLETED"].replace('Z', '+00:00'))
        new_Task = Task(id=task["id"], SUMMARY=task["SUMMARY"], DTSTART=startTime, DUE=endTime,DESCRIPTION=task["DESCRIPTION"], LOCATION=task["LOCATION"],STATUS=task["STATUS"],PRIORITY=task["PRIORITY"],COMPLETED=completed,subjectsID=task["subjectsID"])
        add_to_database(new_Task)
        return

    for task in tasks:
        if(task["DTSTART"]):
            startTime = datetime.datetime.fromisoformat(task["DTSTART"].replace('Z', '+00:00'))
        if(task["DUE"]):
            endTime = datetime.datetime.fromisoformat(task["DUE"].replace('Z', '+00:00'))
        completed = None
        if(task["COMPLETED"]):
            completed = datetime.datetime.fromisoformat(task["COMPLETED"].replace('Z', '+00:00'))
        
        new_Task = Task(id=task["id"], SUMMARY=task["SUMMARY"], DTSTART=startTime, DUE=endTime,DESCRIPTION=task["DESCRIPTION"], LOCATION=task["LOCATION"],STATUS=task["STATUS"],PRIORITY=task["PRIORITY"],COMPLETED=completed,subjectsID=task["subjectsID"])
        add_to_database(new_Task)
    pass

def process_delete_task(tasks):
    
    task = tasks['onDeleteTask']
    print(tasks)
    delete_from_database(Task,"id",task["id"])
    pass


def process_add_subject(subjects):

    if("onCreateSubjects" in subjects):
        subject = subjects['onCreateSubjects']
        # print(subject)
        new_subject = Subjects(id=subject["id"], subject_Name=subject["subject_Name"], current_Grade=subject["current_Grade"], target_Grade=subject["target_Grade"])
        add_to_database(new_subject)
        return

    for subject in subjects:
        # print(subject)
        new_subject = Subjects(id=subject["id"], subject_Name=subject["subject_Name"], current_Grade=subject["current_Grade"], target_Grade=subject["target_Grade"])
        add_to_database(new_subject)
        
    pass

def process_delete_subject(subjects):
    
    subject = subjects['onDeleteSubjects']
    delete_from_database(Subjects,"id",subject["id"])
    pass


# new_subject = Subjects(id="1", subject_Name="Math", current_Grade=85, target_Grade=90)
# add_to_database(new_subject)
# add_to_database(new_schedule)
