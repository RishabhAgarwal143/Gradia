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
        session.query(type(obj)).filter_by(id=obj.id).one()
        return True  
    except NoResultFound:
        return False


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
    obj_to_delete = session.query(obj_class).filter(getattr(obj_class, filter_attr) == filter_value).first()
    if obj_to_delete:
        session.delete(obj_to_delete)
        session.commit()
        return True
    return False


def delete_obj(obj):
    session.delete(obj)
    session.commit()


def process_add_schedule(schedules):
    """
    Process and add schedules to the database.

    Args:
        schedules (list): A list of schedules to be processed and added.

    Returns:
        None
    """

    if("onCreateSchedule" in schedules):
        schedule = schedules['onCreateSchedule']
        startTime = datetime.datetime.fromisoformat(schedule["DTSTART"].replace('Z', '+00:00'))
        endTime = datetime.datetime.fromisoformat(schedule["DTEND"].replace('Z', '+00:00'))
        schedule_grade_info = None

        if(schedule["ScheduleGradeInfo"]):
            info = schedule["ScheduleGradeInfo"]
            schedule_grade_info = Schedule_grade_info(id=info["id"],current_Grade=info["current_Grade"],task_Weightage=info["task_Weightage"],overall_Percentage=info["overall_Percentage"],extra_info=info["extra_Info"],attended= parse_time(info["attended"]),schedule_id=schedule["id"])
            add_to_database(schedule_grade_info)
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["SUMMARY"], DTSTART=startTime, DTEND=endTime,DESCRIPTION=schedule["DESCRIPTION"], LOCATION=schedule["LOCATION"],userinfoID= schedule["userinfoID"],subjectsID=schedule["subjectsID"],schedule_grade=schedule_grade_info)
        add_to_database(new_schedule)
        return

    if("onUpdateSchedule" in schedules):
        schedule = schedules['onUpdateSchedule']
        startTime = datetime.datetime.fromisoformat(schedule["DTSTART"].replace('Z', '+00:00'))
        endTime = datetime.datetime.fromisoformat(schedule["DTEND"].replace('Z', '+00:00'))
        schedule_grade_info = None

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
        if schedule["ScheduleGradeInfo"]:
            info = schedule["ScheduleGradeInfo"]
            schedule_grade_info = Schedule_grade_info(id=info["id"], current_Grade=info["current_Grade"], task_Weightage=info["task_Weightage"], overall_Percentage=info["overall_Percentage"], extra_info=info["extra_Info"], attended=info["attended"], schedule_id=schedule["id"])
            add_to_database(schedule_grade_info)
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["title"], DTSTART=startTime, DTEND=endTime, DESCRIPTION=schedule["description"], LOCATION=schedule["location"], userinfoID=schedule["userinfoID"], subjectsID=schedule["subject_id"], schedule_grade=schedule_grade_info)
        add_to_database(new_schedule)
    pass


def process_delete_schedule(schedules):
    
    schedule = schedules['onDeleteSchedule']
    delete_from_database(Schedule,"id",schedule["id"])
    pass


def parse_time(time_str):
    if(not time_str):
        return None
    try:
        time_object = datetime.datetime.strptime(time_str, "%H:%M:%S").time()
    except ValueError:
        time_object = datetime.datetime.strptime(time_str, "%H:%M").time()
    return time_object


def process_add_task(tasks):

    if("onCreateTask" in tasks):
        tasks = [tasks['onCreateTask']]

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


def update_subject_totals(subjectId):
    try:
        subject_object = session.query(Subjects).filter_by(id=subjectId).one()
        subject_object.calculate_final_grade(session)
    except NoResultFound:
        return "Not Found"
    pass

def process_update_task(tasks):
    task = tasks['onUpdateTask']
    if(task["TaskGradeInfo"]):
        delete_from_database(Task_grade_info,"id",task["TaskGradeInfo"]["id"])
        update_subject_totals(task["subjectsID"])
    delete_from_database(Task,"id",task["id"])
    process_add_task([task])


def process_add_subject(subjects):

    if("onCreateSubjects" in subjects):
        subjects = [subjects['onCreateSubjects']]

    for subject in subjects:
        new_subject = Subjects(id=subject["id"], subject_Name=subject["subject_Name"], current_Grade=subject["current_Grade"], target_Grade=subject["target_Grade"],userinfoID= subject["userinfoID"],subject_Difficulty=subject["subject_Difficulty"])
        add_to_database(new_subject)
        
    pass


def process_update_taskGrade(tasks):
    info = tasks['onUpdateTaskGradeInfo']
    delete_from_database(Task_grade_info,"id",info["id"])
    task_grade_info = Task_grade_info(id=info["id"],current_Grade=info["current_Grade"],task_Weightage=info["task_Weightage"],overall_Percentage=info["overall_Percentage"],extra_info=info["extra_Info"],time_taken= parse_time(info["time_Taken"]),task_id=info["taskGradeInfoTaskId"])
    add_to_database(task_grade_info)
    update_subject_totals(info["Task"]["subjectsID"])
    
    pass


def process_update_subject(subjects):
    
    subject = subjects['onUpdateSubjects']
    delete_from_database(Subjects,"id",subject["id"])
    process_add_subject([subject])
    pass

def process_delete_subject(subjects):
    
    subject = subjects['onDeleteSubjects']
    delete_from_database(Subjects,"id",subject["id"])
    pass


def get_schedule_range(userinfo_id, start_date, end_date):
    schedules = session.query(Schedule).\
    filter(Schedule.userinfoID == userinfo_id).\
    filter(Schedule.DTEND >= start_date, Schedule.DTSTART <= end_date).\
    all()
    for schedule in schedules:
        pass
        # print(schedule)
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

    user = session.query(User).filter_by(userinfoID=userinfoID).first()
    if(user):
        user.update_access_token(session,accesstoken)
        user.get_timezone(session)
        user.get_UserWorkTime(session)
        return
    user = User(userinfoID=userinfoID,access_Token=accesstoken)
    session.add(user)
    user.get_timezone(session)
    user.get_UserWorkTime(session)
    session.commit()


def get_subject(subject_id):
    # subject_id = "57426fa8-8596-43d1-8a75-bb3bf3ebb51c"

    subject = session.query(Subjects).filter_by(id=subject_id).first()

    if subject:
        # Get all the schedules associated with the subject
        schedules = subject.schedule_list
        # Print the schedules
        for schedule in schedules:
            print(schedule)
        print("Tasks")
        tasks = subject.task_list
        # Print the tasks
        for task in tasks:
            print(task)
    else:
        print("Subject not found.")
        

def get_user_info(userinfoID):
    
    user = session.query(User).filter_by(userinfoID=userinfoID).first()
    # user.get_UserWorkTime(session)
    return user
# def rank_tasks(user : User):
#     # Get all the tasks

#     # Rank the tasks
#     rank = []
#     for subject in user.subjects_list:
#         for task in subject.task_list:
#             if task.STATUS == "COMPLETED":
#                 continue
#             # get the deadline of the task
#             deadline = task.DUE
#             # get the current time
#             current_time = datetime.datetime.now()
#             # calculate the difference in time
#             time_remaining = (deadline - current_time).total_seconds() / 3600
#             print(time_remaining)
#             if task.task_grade == None:
#                 task.PRIORITY = int(1 / int(time_remaining))
#                 rank.append(task)
#                 continue
#             # get the time taken to complete the task
            
#             # calculate the weightage of the task
#             weightage = task.task_grade.task_Weightage
#             # calculate the current grade of the user
#             current_grade = task.task_grade.current_Grade
#             # get the subject of the task
#             target_grade = subject.target_Grade
#             # calculate the overall percentage of the task
#             overall_percentage = task.task_grade.overall_Percentage

#             # calculate the rank of the task
#             task.PRIORITY  = (1/(time_remaining)) * weightage * (target_grade - current_grade)
#             rank.append(task)
#     # sort the tasks based on the rank

def assign_priority(user: User):
    tasks = []
    for subject in user.subjects_list:
        for task in subject.task_list:

            # print(task.STATUS)
            if task.STATUS == "COMPLETED" or not(task.task_grade):
                continue
            # priorities[task] = {3600/(task.DUE - datetime.datetime.now()).total_seconds() , task.task_grade.task_Weightage, subject.target_Grade - subject.current_Grade, task.task_grade.difficulty}
            subject.calculate_final_grade(session)
            # calculate the number of days left for the task by subtracting the current time from the deadline
            time_remaining = (task.DUE - datetime.datetime.now()).days
            if time_remaining < 0:
                task.STATUS = "OVERDUE"
                continue
            elif time_remaining == 0:
                time_remaining = 1

            task_weightage = task.task_grade.task_Weightage/ 100
          
            grade_left = (93 - subject.current_Grade)/100
            

            task.PRIORITY = 0.7 * (1/time_remaining) + 0.2 * (task_weightage) + 0.1 * (grade_left)
            
            tasks.append(task)
    tasks.sort(key=lambda x: x.PRIORITY, reverse=True)
    for task in tasks:
        print(task.SUMMARY, task.DUE,  task.PRIORITY)
    return tasks

# get_schedule_range("82cf448d-fc16-409c-82e9-3304d937f840", datetime.datetime(2021, 9, 9, 0, 0, 0), datetime.datetime(2021, 9, 10, 0, 0, 0))
assign_priority(get_user_info("82cf448d-fc16-409c-82e9-3304d937f840"))