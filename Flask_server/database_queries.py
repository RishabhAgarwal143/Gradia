"""Example uses of SQL Alchemy"""


from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select, text, create_engine
from sqlalchemy.exc import IntegrityError,NoResultFound

from database_setup import Schedule,Task,Subjects
import datetime

engine = create_engine("sqlite:///Flask_server/database/userdata.db")

# Create session
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

def process_and_add_schedule(schedules):
    # schedule_list = []
    print("Entered")
    if("onCreateSchedule" in schedules):
        schedule = schedules['onCreateSchedule']
        print(schedule)
        startTime = datetime.datetime.fromisoformat(schedule["DTSTART"].replace('Z', '+00:00'))
        endTime = datetime.datetime.fromisoformat(schedule["DTEND"].replace('Z', '+00:00'))
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["SUMMARY"], DTSTART=startTime, DTEND=endTime,DESCRIPTION=schedule["DESCRIPTION"], LOCATION=schedule["LOCATION"],subjectsID=schedule["subjectsID"])
        add_to_database(new_schedule)
        return

    counter = 0
    for schedule in schedules:
        # counter+=1
        startTime = datetime.datetime.fromisoformat(schedule["start"].replace('Z', '+00:00'))
        endTime = datetime.datetime.fromisoformat(schedule["end"].replace('Z', '+00:00'))
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["title"], DTSTART=startTime, DTEND=endTime,DESCRIPTION=schedule["description"], LOCATION=schedule["location"],subjectsID=schedule["subject_id"])
        add_to_database(new_schedule)
    print(counter)
    pass

# new_subject = Subjects(id="1", subject_Name="Math", current_Grade=85, target_Grade=90)
# add_to_database(new_subject)
# add_to_database(new_schedule)
