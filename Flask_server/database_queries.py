"""Example uses of SQL Alchemy"""
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select, text, create_engine
from sqlalchemy.exc import IntegrityError,NoResultFound
from database_setup import Schedule,Task,Subjects,Task_grade_info,Schedule_grade_info,User
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
        startTime = datetime.datetime.fromisoformat(schedule["DTSTART"].replace('Z', '+00:00'))
        endTime = datetime.datetime.fromisoformat(schedule["DTEND"].replace('Z', '+00:00'))
        if(schedule["ScheduleGradeInfo"]):
            info = schedule["ScheduleGradeInfo"]
            schedule_grade_info = Schedule_grade_info(id=info["id"],current_Grade=info["current_Grade"],task_Weightage=info["task_Weightage"],overall_Percentage=info["overall_Percentage"],extra_info=info["extra_Info"],attended= parse_time(info["attended"]),schedule_id=schedule["id"])
            add_to_database(schedule_grade_info)
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["SUMMARY"], DTSTART=startTime, DTEND=endTime,DESCRIPTION=schedule["DESCRIPTION"], LOCATION=schedule["LOCATION"],userinfoID= schedule["userinfoID"],subjectsID=schedule["subjectsID"],schedule_grade=schedule_grade_info)
        add_to_database(new_schedule)
        return

    for schedule in schedules:
        startTime = datetime.datetime.fromisoformat(schedule["start"].replace('Z', '+00:00'))
        endTime = datetime.datetime.fromisoformat(schedule["end"].replace('Z', '+00:00'))
        schedule_grade_info = None
        if(schedule["ScheduleGradeInfo"]):
            print(schedule)
            info = schedule["ScheduleGradeInfo"]
            schedule_grade_info = Schedule_grade_info(id=info["id"],current_Grade=info["current_Grade"],task_Weightage=info["task_Weightage"],overall_Percentage=info["overall_Percentage"],extra_info=info["extra_Info"],attended= info["attended"],schedule_id=schedule["id"])
            add_to_database(schedule_grade_info)
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["title"], DTSTART=startTime, DTEND=endTime,DESCRIPTION=schedule["description"], LOCATION=schedule["location"],userinfoID= schedule["userinfoID"],subjectsID=schedule["subject_id"],schedule_grade=schedule_grade_info)
        add_to_database(new_schedule)
    pass


def process_delete_schedule(schedules):
    
    schedule = schedules['onDeleteSchedule']
    delete_from_database(Schedule,"id",schedule["id"])
    pass


def parse_time(time_str):
    try:
        # Try parsing with seconds
        time_object = datetime.datetime.strptime(time_str, "%H:%M:%S").time()
    except ValueError:
        # If parsing with seconds fails, try parsing without seconds
        time_object = datetime.datetime.strptime(time_str, "%H:%M").time()
    return time_object


def process_add_task(tasks):

    if("onCreateTask" in tasks):
        task = tasks['onCreateTask']
        if(task["DTSTART"]):
            startTime = datetime.datetime.fromisoformat(task["DTSTART"].replace('Z', '+00:00'))
        if(task["DUE"]):
            endTime = datetime.datetime.fromisoformat(task["DUE"].replace('Z', '+00:00'))
        if(task["COMPLETED"]):
            completed = datetime.datetime.fromisoformat(task["COMPLETED"].replace('Z', '+00:00'))
        task_grade_info = None
        if(task["TaskGradeInfo"]):
            info = task["TaskGradeInfo"]
            task_grade_info = Task_grade_info(id=info["id"],current_Grade=info["current_Grade"],task_Weightage=info["task_Weightage"],overall_Percentage=info["overall_Percentage"],extra_info=info["extra_Info"],time_taken= parse_time(info["time_Taken"]),task_id=task["id"])
            add_to_database(task_grade_info)
        new_Task = Task(id=task["id"], SUMMARY=task["SUMMARY"], DTSTART=startTime, DUE=endTime,DESCRIPTION=task["DESCRIPTION"], LOCATION=task["LOCATION"],STATUS=task["STATUS"],PRIORITY=task["PRIORITY"],userinfoID= task["userinfoID"],COMPLETED=completed,subjectsID=task["subjectsID"],task_grade = task_grade_info)
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
        task_grade_info = None
        if(task["TaskGradeInfo"]):
            info = task["TaskGradeInfo"]
            task_grade_info = Task_grade_info(id=info["id"],current_Grade=info["current_Grade"],task_Weightage=info["task_Weightage"],overall_Percentage=info["overall_Percentage"],extra_info=info["extra_Info"],time_taken= parse_time(info["time_Taken"]),task_id=task["id"])
            add_to_database(task_grade_info)

        new_Task = Task(id=task["id"], SUMMARY=task["SUMMARY"], DTSTART=startTime, DUE=endTime,DESCRIPTION=task["DESCRIPTION"], LOCATION=task["LOCATION"],STATUS=task["STATUS"],PRIORITY=task["PRIORITY"],userinfoID= task["userinfoID"],COMPLETED=completed,subjectsID=task["subjectsID"],task_grade = task_grade_info)
        add_to_database(new_Task)
    pass


def process_delete_task(tasks):
    
    task = tasks['onDeleteTask']
    delete_from_database(Task,"id",task["id"])
    pass


def process_add_subject(subjects):

    if("onCreateSubjects" in subjects):
        subject = subjects['onCreateSubjects']
        new_subject = Subjects(id=subject["id"], subject_Name=subject["subject_Name"], current_Grade=subject["current_Grade"], target_Grade=subject["target_Grade"],userinfoID= subject["userinfoID"])
        add_to_database(new_subject)
        return

    for subject in subjects:
        new_subject = Subjects(id=subject["id"], subject_Name=subject["subject_Name"], current_Grade=subject["current_Grade"], target_Grade=subject["target_Grade"],userinfoID= subject["userinfoID"])
        add_to_database(new_subject)
        
    pass


def process_delete_subject(subjects):
    
    subject = subjects['onDeleteSubjects']
    delete_from_database(Subjects,"id",subject["id"])
    pass


def get_schedule_range(userinfo_id, start_date, end_date):
    schedules = session.query(Schedule).\
    filter(Schedule.userinfoID == userinfo_id).\
    filter(Schedule.DTSTART >= start_date, Schedule.DTEND <= end_date).\
    all()
    for schedule in schedules:
        print(schedule)
    return schedules

def get_task_range(userinfo_id, start_date, end_date):
    tasks = session.query(Task).\
    filter(Task.userinfoID == userinfo_id).\
    filter(Task.DTSTART >= start_date, Task.DTEND <= end_date).\
    all()
    for task in tasks:
        print(task)
    return tasks


def add_user_info(userinfoID,accesstoken):
    print("HI")
    user = session.query(User).filter_by(userinfoID=userinfoID).first()
    if(user):
        user.update_access_token(session,accesstoken)
        return
    user = User(userinfoID=userinfoID,access_Token=accesstoken)
    session.add(user)
    session.commit()

def get_subject():
    subject_id = "57426fa8-8596-43d1-8a75-bb3bf3ebb51c"

    subject = session.query(Subjects).filter_by(id=subject_id).first()

    if subject:
        # Get all the schedules associated with the subject
        schedules = subject.schedule_list
        
        # Print the schedules
        for schedule in schedules:
            print(schedule)
            
        print("Tasks")
        tasks = subject.task_list
        
        # Print the schedules
        for task in tasks:
            print(task)
    else:
        print("Subject not found.")
        

# get_subject()``

# new_subject = Subjects(id="1", subject_Name="Math", current_Grade=85, target_Grade=90)
# add_to_database(new_subject)
# add_to_database(new_schedule)
