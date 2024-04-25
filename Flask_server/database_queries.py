"""Example uses of SQL Alchemy"""
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select, text, create_engine
from sqlalchemy.exc import IntegrityError,NoResultFound
from database_setup import Schedule,Task,Subjects,Task_grade_info,Schedule_grade_info,User,UserWorkTime
import datetime
import pytz
from pprint import pp


# engine = create_engine("sqlite:///Flask_server/database/userdata.db")
# Session = sessionmaker(bind=engine)
# session = Session()


def create_session(userinfoId):
    engine = create_engine(f"sqlite:///Flask_server/database/userdata_{userinfoId}.db")
    Session = sessionmaker(bind=engine)
    session = Session()
    return session

def check_if_object_exists(obj,session):
    try:
        session.query(type(obj)).filter_by(id=obj.id).one()
        return True  
    except NoResultFound:
        return False
    
def get_task_by_id(task_id, session):
    try:
        return session.query(Task).filter_by(id=task_id).one()
    except NoResultFound:
        return None

def get_schedule_by_id(event_id, session):
    try:
        return session.query(Schedule).filter_by(id=event_id).one()
    except NoResultFound:
        return None


def clear_personalization(userinfoID):
    # get list of all personalized tasks
    user = get_user_info(userinfoID)
    session = create_session(userinfoID)

    personalized_tasks = session.query(Schedule).filter_by(personalized_task=True).all()
    for task in personalized_tasks:
        # print(task)
        task.delete_from_cloud(user)
        delete_obj(task,session)

    session.close()


def add_to_database(obj,session):
    
    if(check_if_object_exists(obj,session)):
        session.close()
        return
    try:
        session.add(obj)
        session.commit()
    except IntegrityError as e:
        session.rollback()
    finally:
        session.close()


def delete_from_database(obj_class, filter_attr, filter_value,session):
    obj_to_delete = session.query(obj_class).filter(getattr(obj_class, filter_attr) == filter_value).first()
    if obj_to_delete:
        session.delete(obj_to_delete)
        session.commit()
        session.close()
        return True
    session.close()
    return False


def delete_obj(obj,session):
    session.delete(obj)
    session.commit()
    # session.close()
    


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
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["SUMMARY"], DTSTART=startTime, DTEND=endTime,DESCRIPTION=schedule["DESCRIPTION"], LOCATION=schedule["LOCATION"],userinfoID= schedule["userinfoID"],subjectsID=schedule["subjectsID"],schedule_grade=schedule_grade_info,personalized_task=schedule["personalized_task"])
        session = create_session(new_schedule.userinfoID)
        add_to_database(new_schedule,session)
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
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["SUMMARY"], DTSTART=startTime, DTEND=endTime,DESCRIPTION=schedule["DESCRIPTION"], LOCATION=schedule["LOCATION"],userinfoID= schedule["userinfoID"],subjectsID=schedule["subjectsID"],schedule_grade=schedule_grade_info,personalized_task=schedule["personalized_task"])
        session = create_session(new_schedule.userinfoID)
        add_to_database(new_schedule,session)
        return
    
    for schedule in schedules:
        if("id" not in schedule):
            continue
        startTime = datetime.datetime.fromisoformat(schedule["start"].replace('Z', '+00:00'))
        endTime = datetime.datetime.fromisoformat(schedule["end"].replace('Z', '+00:00'))
        schedule_grade_info = None
        if schedule["ScheduleGradeInfo"]:
            info = schedule["ScheduleGradeInfo"]
            schedule_grade_info = Schedule_grade_info(id=info["id"], current_Grade=info["current_Grade"], task_Weightage=info["task_Weightage"], overall_Percentage=info["overall_Percentage"], extra_info=info["extra_Info"], attended=info["attended"], schedule_id=schedule["id"])
            add_to_database(schedule_grade_info)
        new_schedule = Schedule(id=schedule["id"], SUMMARY=schedule["title"], DTSTART=startTime, DTEND=endTime, DESCRIPTION=schedule["description"], LOCATION=schedule["location"], userinfoID=schedule["userinfoID"], subjectsID=schedule["subject_id"], schedule_grade=schedule_grade_info,personalized_task=schedule["personalized_task"])
        session = create_session(new_schedule.userinfoID)
        add_to_database(new_schedule,session)
    pass


def process_delete_schedule(schedules):
    
    schedule = schedules['onDeleteSchedule']
    delete_from_database(Schedule,"id",schedule["id"],create_session(schedule["userinfoID"]))
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
        session = create_session(task["userinfoID"])
        if(task["TaskGradeInfo"]):
            info = task["TaskGradeInfo"]
            task_grade_info = Task_grade_info(id=info["id"],current_Grade=info["current_Grade"],task_Weightage=info["task_Weightage"],overall_Percentage=info["overall_Percentage"],extra_info=info["extra_Info"],time_taken= parse_time(info["time_Taken"]),task_id=task["id"])
            add_to_database(task_grade_info,session)
 

        new_Task = Task(id=task["id"], SUMMARY=task["SUMMARY"], DTSTART=startTime, DUE=endTime,DESCRIPTION=task["DESCRIPTION"], LOCATION=task["LOCATION"],STATUS=task["STATUS"],PRIORITY=task["PRIORITY"],userinfoID= task["userinfoID"],COMPLETED=completed,subjectsID=task["subjectsID"],task_grade = task_grade_info)
        session = create_session(new_Task.userinfoID)
        add_to_database(new_Task,session)
    pass


def process_delete_task(tasks):
    
    task = tasks['onDeleteTask']
    delete_from_database(Task,"id",task["id"],create_session(task["userinfoID"]))
    pass


def update_subject_totals(subjectId,session):
    try:
        subject_object = session.query(Subjects).filter_by(id=subjectId).one()
        subject_object.calculate_final_grade(session)
    except NoResultFound:
        return "Not Found"
    pass

def process_update_task(tasks):
    task = tasks['onUpdateTask']
    session = create_session(task["userinfoID"])
    if(task["TaskGradeInfo"]):
        delete_from_database(Task_grade_info,"id",task["TaskGradeInfo"]["id"],session)
        update_subject_totals(task["subjectsID"],session)
    delete_from_database(Task,"id",task["id"],session)
    process_add_task([task])


def process_add_subject(subjects):

    if("onCreateSubjects" in subjects):
        subjects = [subjects['onCreateSubjects']]

    for subject in subjects:
        # pp(subject)
        new_subject = Subjects(id=subject["id"], subject_Name=subject["subject_Name"], current_Grade=subject["current_Grade"], target_Grade=subject["target_Grade"],userinfoID= subject["userinfoID"],subject_Difficulty=subject["subject_Difficulty"])
        session  = create_session(new_subject.userinfoID)
        add_to_database(new_subject,session)
    pass


def process_update_taskGrade(tasks):
    info = tasks['onUpdateTaskGradeInfo']
    
    session = create_session(tasks["userinfoID"])
    delete_from_database(Task_grade_info,"id",info["id"],session)
    task_grade_info = Task_grade_info(id=info["id"],current_Grade=info["current_Grade"],task_Weightage=info["task_Weightage"],overall_Percentage=info["overall_Percentage"],extra_info=info["extra_Info"],time_taken= parse_time(info["time_Taken"]),task_id=info["taskGradeInfoTaskId"])
    add_to_database(task_grade_info,session)
    update_subject_totals(info["Task"]["subjectsID"],session)
    pass


def process_update_subject(subjects):
    
    subject = subjects['onUpdateSubjects']
    
    delete_from_database(Subjects,"id",subject["id"],create_session(subject["userinfoID"]))
    process_add_subject([subject])
    pass

def process_delete_subject(subjects):
    
    subject = subjects['onDeleteSubjects']
    delete_from_database(Subjects,"id",subject["id"],create_session(subject["userinfoID"]))
    pass


def get_schedule_range(userinfo_id, start_date, end_date):
    session = create_session(userinfo_id)
    schedules = session.query(Schedule).\
    filter(Schedule.userinfoID == userinfo_id).\
    filter(Schedule.DTEND >= start_date, Schedule.DTSTART <= end_date).\
    all()
    # session.close()
    
    return schedules

def get_task_from_id(userinfo_id, task_id):
    session = create_session(userinfo_id)
    task = session.query(Task).filter_by(id=task_id).first()
    # session.close()
    return task

def get_task_range(userinfo_id, start_date, due_date):
    session = create_session(userinfo_id)
    tasks = session.query(Task).\
    filter(Task.userinfoID == userinfo_id).\
    filter(Task.DUE <= due_date, Task.DUE >= start_date).\
    all()
    # for task in tasks:
    #     print(task)
    # session.close()
    # session.close()
    return tasks


def add_user_info(userinfoID,accesstoken):

    session = create_session(userinfoID)
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
    session.close()

def personalise_user_schedule(userinfo,Force_refresh = False):
    # print(userinfo)
    temp = userinfo["Last_updated"]
    
    if(not temp):
        Last_modified =  datetime.datetime.now(datetime.timezone.utc)
        Force_refresh = True
    else:
        Last_modified = datetime.datetime.fromisoformat(temp.replace('Z', '+00:00'))
    modified_plus_24_hours = Last_modified + datetime.timedelta(hours=12)
    if((modified_plus_24_hours <= datetime.datetime.now(datetime.timezone.utc)) or Force_refresh):
        session = create_session(userinfo["id"])
        user = session.query(User).filter_by(userinfoID=userinfo["id"]).first()
        user.Last_modified = datetime.datetime.now(datetime.timezone.utc)
        user.update_last_modified(session)
        clear_personalization(user.userinfoID)
        from task_scheduling import assign_task
        assign_task(user.userinfoID)
        


    

def User_Calendar(userinfo,Force_refresh = False):

    temp = userinfo["Last_updated"]
    if(not temp):
        Last_modified =  datetime.datetime.now(datetime.timezone.utc)
        Force_refresh = True
    else:
        Last_modified = datetime.datetime.fromisoformat(temp.replace('Z', '+00:00'))
    modified_plus_24_hours = Last_modified + datetime.timedelta(hours=12)
    if((modified_plus_24_hours <= datetime.datetime.now(datetime.timezone.utc)) or Force_refresh):
        session = create_session(userinfo["id"])
        user = session.query(User).filter_by(userinfoID=userinfo["id"]).first()
        user.Last_modified = datetime.datetime.now(datetime.timezone.utc)
        user.update_last_modified(session)
        for calendar in userinfo["SubscribedCalendars"]["items"]:
            print(calendar["Calendar_URL"])
            from Reading_Calendar import Subscribing_to_Calendar
            Subscribing_to_Calendar(calendar["Calendar_URL"],user.access_Token,user.userinfoID,calendar["Calendar_Name"])



def get_user_info(userinfoID):
    session = create_session(userinfoID)
    user = session.query(User).filter_by(userinfoID=userinfoID).first()
    # user.get_UserWorkTime(session)
    # session.close()
    
    return user


def assign_priority(userinfoID):
    # session = create_session(userinfoID)
    tasks = []
    session = create_session(userinfoID)
    user = session.query(User).filter_by(userinfoID=userinfoID).first()

    for subject in user.subjects_list:
        print(subject.subject_Name)
        completed_grade = 0
        completed_tasks = [task for task in subject.task_list if task.STATUS == "COMPLETED" and task.task_grade]
        unchecked_tasks = [task for task in subject.task_list if task.STATUS != "COMPLETED" and task.STATUS != "OVERDUE" and task.STATUS != "CANCELLED"]
        completed_grade = sum(task.task_grade.task_Weightage or 0 for task in completed_tasks)
        print(completed_grade)
        if completed_grade > 0  and (subject.current_Grade/ completed_grade) < 1:

            subject.subject_Difficulty = 1 - (subject.current_Grade/ completed_grade)
            print("subject difficulty: ",subject.subject_Difficulty, subject.current_Grade, completed_grade)
        else:
            subject.subject_Difficulty = 0.5
        for task in unchecked_tasks:
            # if(task.PRIORITY != 9 and task.PRIORITY != None and task.PRIORITY != 0):
            #     tasks.append(task)
            #     continue
            subject.calculate_final_grade(session)
            time_remaining = (task.DUE - datetime.datetime.now()).days
            if time_remaining < 0:
                task.STATUS = "OVERDUE"
                continue
            elif time_remaining == 0:
                time_remaining = 1

            if task.STATUS == "COMPLETED":
                continue
            elif not task.task_grade:
                task.PRIORITY = 0.8 * (1/time_remaining) + 0.2 * (subject.subject_Difficulty) 
                tasks.append(task)
                continue
            task_weightage = task.task_grade.task_Weightage/ 100
            target_grade = subject.target_Grade if subject.target_Grade else 100
            print(subject.subject_Name,target_grade)
            grade_left = (target_grade - subject.current_Grade)/100
            print("grade left", grade_left)
            if(grade_left < 0):
                task.PRIORITY = 0.8 * (1/time_remaining) + 0.2 * (subject.subject_Difficulty)
                tasks.append(task)
                continue
            task.PRIORITY = 0.5 * (1/time_remaining) + 0.2 * (task_weightage) + 0.1 * (grade_left) + 0.2 * (subject.subject_Difficulty)
            # print("PRIORITY" ,0.1 * (grade_left))
            tasks.append(task)
    tasks.sort(key=lambda x: x.PRIORITY, reverse=True)
    for task in tasks:
        print(task.SUMMARY, task.DUE,  task.PRIORITY)
    session.close()
    return tasks
# def assign_priority(userinfoID):
#     session = create_session(userinfoID)
    
#     # Query all subjects with their task lists and task grades
#     user = session.query(User).filter_by(userinfoID=userinfoID).options(
#     joinedload(User.subjects_list).joinedload(Subject.task_list).joinedload(Task.task_grade)
# ).first()
    
#     tasks = []
    
#     for subject in user.subjects_lists:
#         completed_grade = sum(task.task_grade.task_Weightage or 0 for task in subject.task_list if task.STATUS == "COMPLETED")
        
#         if completed_grade > 0:
#             subject.subject_Difficulty = 1 - (subject.current_Grade / completed_grade)
#         else:
#             subject.subject_Difficulty = 0.5
        
#         subject.calculate_final_grade(session)
        
#         for task in subject.task_list:
#             time_remaining = (task.DUE - datetime.datetime.now()).days
#             if time_remaining < 0:
#                 task.STATUS = "OVERDUE"
#                 continue
#             elif time_remaining == 0:
#                 time_remaining = 1
            
#             if task.STATUS == "COMPLETED":
#                 continue
            
#             priority = 0.8 * (1 / time_remaining) + 0.2 * (subject.subject_Difficulty)
            
#             if task.task_grade:
#                 task_weightage = task.task_grade.task_Weightage / 100
#                 target_grade = subject.target_Grade or 93
#                 grade_left = (target_grade - subject.current_Grade) / 100
                
#                 priority += 0.2 * task_weightage + 0.1 * grade_left
            
#             task.PRIORITY = priority
#             tasks.append(task)
    
#     tasks.sort(key=lambda x: x.PRIORITY, reverse=True)
    
#     for task in tasks:
#         print(task.SUMMARY, task.DUE, task.PRIORITY)
    
#     session.close()
#     return tasks
# get_schedule_range("82cf448d-fc16-409c-82e9-3304d937f840", datetime.datetime(2021, 9, 9, 0, 0, 0), datetime.datetime(2021, 9, 10, 0, 0, 0))
# assign_priority(get_user_info("82cf448d-fc16-409c-82e9-3304d937f840"))
# clear_personalization("82cf448d-fc16-409c-82e9-3304d937f840")