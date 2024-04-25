from database_queries import *
import pandas as pd
import math
import pytz

def get_user_free_time(user, DTSTART : datetime, DTEND: datetime, extra_time_slots = []):
    schedules =  get_schedule_range(user, DTSTART, DTEND)
    schedules.sort(key=lambda x: x.DTSTART)
    for schedule in schedules:
        if(schedule.personalized_task):
            schedules.remove(schedule)
    busySlots = []
    freeSlots = []  
    # for schedule in schedules:
    #     busySlots.append([schedule.DTSTART, schedule.DTEND])
    # busySlots.sort()

    workTime = get_user_info(user).UserWorkTime
   
    currentDayStart = DTSTART
    currentDayEnd = DTEND
    for i in range(0, (DTEND - DTSTART).days + 1):
        
        currday = DTSTART + datetime.timedelta(days=i)
        prevDay = DTSTART + datetime.timedelta(days=i-1)
        workTimeForDay = workTime.get_work_time(currday.weekday())
        workTimeForprevDay = workTime.get_work_time(prevDay.weekday())
        slots_per_day = []
        flag = 0
        if(len(busySlots) > 0 ):
            if(busySlots[-1][-1] > prevDay.replace(hour=workTimeForprevDay[1].hour, minute=workTimeForprevDay[1].minute, second=workTimeForprevDay[1].second)):
                busySlots.append([busySlots[-1][-1], currday.replace(hour=workTimeForDay[0].hour, minute=workTimeForDay[0].minute, second=workTimeForDay[0].second)])    
                print(busySlots[-1])
                flag = 1
        if flag == 0:
            busySlots.append([prevDay.replace(hour=workTimeForprevDay[1].hour, minute=workTimeForprevDay[1].minute, second=workTimeForprevDay[1].second), currday.replace(hour=workTimeForDay[0].hour, minute=workTimeForDay[0].minute, second=workTimeForDay[0].second)])
        for slots in extra_time_slots:
            if slots[0] == currday.date():
                slots_per_day.append([slots[0], slots[1]])
       
        for schedule in schedules:
            if schedule.DTSTART.date() == currday.date():
                 print(schedule.DTSTART, schedule.DTEND, schedule.SUMMARY)
                 slots_per_day.append([schedule.DTSTART, schedule.DTEND])
        slots_per_day.sort()
        for slots in slots_per_day:
            if len(busySlots) > 0 and slots[0] < busySlots[-1][-1]:
                busySlots.append([busySlots[-1][-1], max(slots[1], busySlots[-1][-1])])
            else:
                busySlots.append(slots)
    print("busy slots:")
    for i in range(0, len(busySlots)):
        print(busySlots[i][0].day, busySlots[i][0].hour, busySlots[i][0].minute, "-",  busySlots[i][1].day, busySlots[i][1].hour, busySlots[i][1].minute)
    
    for i in range(0, len(busySlots)):
        if busySlots[i][0] > currentDayStart:
            freeSlots.append([currentDayStart, busySlots[i][0]])
        currentDayStart = busySlots[i][1]
    if busySlots[-1][1] < currentDayEnd:
        freeSlots.append([busySlots[-1][1], currentDayEnd])
    print("free slots:")
    # add the timeslot only if the freeslot is after the current time in UTC
#     local_start_time = newSchedule.DTSTART
    # local_end_time_utc = newSchedule.DTEND

    # start_time_utc = user_timezone.localize(local_start_time).astimezone(pytz.utc)
    # end_time_utc = user_timezone.localize(local_end_time_utc).astimezone(pytz.utc)
    # current time in utc

    user_timezone = pytz.timezone(get_user_info(user).user_timezone)
    utc_time =  user_timezone.localize(datetime.datetime.now()).astimezone(pytz.utc)
    utc_time = utc_time.replace(tzinfo=None)

    # print("CURRENT UTC TIME IS: ", utc_time)
    # convert fromdatetime.datetime(20 24, 4, 24, 11, 0, 0, 474065) format to normal datetime format

    freeSlots = [slot for slot in freeSlots if slot[0] > utc_time]
    print(freeSlots)
                        
    # freeSlots = [datetime.datetime.strptime(slot.strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S') for slot in freeSlots]
    # freeSlots = [slot for slot in freeSlots if slot > utc_time]
    
    # freeSlots = [slot for slot in freeSlots if slot[0] > datetime.datetime.now()]
    for i in range(0, len(freeSlots)):
        print(freeSlots[i][0].day, freeSlots[i][0].hour, freeSlots[i][0].minute, "-",  freeSlots[i][1].day, freeSlots[i][1].hour, freeSlots[i][1].minute)
    return freeSlots



# def assign_task(userinfoID, extra_time_slots = [], flag=False):
#     tasks  = assign_priority(userinfoID)
#     tasks.sort(key=lambda x: x.PRIORITY, reverse=True)
#     print(" I have reached here")
#     currday = 0
#     # task_list_to_return = []
#     # utc_timezone = pytz.utc
#     while(tasks):
#         print(currday)
#         session = create_session(userinfoID)
#         user = session.query(User).filter_by(userinfoID=userinfoID).first()
#         user_timezone = pytz.timezone(user.user_timezone)
#         freeSlots = get_user_free_time(userinfoID, (datetime.datetime.now().replace(hour=0, minute=0, second=0) + datetime.timedelta(days = currday)), (datetime.datetime.now() + datetime.timedelta(days = currday)).replace(hour= 23, minute = 59, second= 59),  extra_time_slots)
#         task_list = []
#         time_estimated  = calculate_time_ratio(user, tasks[0].get_subject(session))
#         time_step = []
#         while(time_estimated > 3):
#             time_step.append(time_estimated -3)
#             time_estimated -= 3
#         time_step.append(time_estimated)
#         print(time_step)
#         for time in time_step:
#             print("length" ,len(freeSlots))
#             for i in range(0, len(freeSlots)):
#                 if freeSlots[i][1] - freeSlots[i][0] >= datetime.timedelta(hours = time):
#                     print("here in assigning task:")
#                     newSchedule = Schedule(SUMMARY=tasks[0].SUMMARY, DTSTART =  freeSlots[i][0], DTEND = freeSlots[i][0] + datetime.timedelta(hours=time),subjectsID=tasks[0].subjectsID,userinfoID=user.userinfoID,personalized_task=True)
#                     if not flag:
#                         newSchedule.add_to_cloud(user)
#                         session.add(newSchedule)
#                         session.commit()
#                     else:
#                         task_list.append(newSchedule)
#                         print(newSchedule.DTSTART, newSchedule.DTEND, newSchedule.SUMMARY)
#                     # print(newSchedule)
#                     freeSlots[i][0] += datetime.timedelta(hours=time)
#                     print(freeSlots[i])
#                     if(freeSlots[i][0] >= freeSlots[i][1] or freeSlots[i][1] - freeSlots[i][0] < datetime.timedelta(hours = 1)):
#                         print("here deleting: ", freeSlots[i])
#                         freeSlots.remove(freeSlots[i])
#                     else:
#                         print("here not deleting: ", freeSlots[i])
#                         i -= 1
                    
#                     tasks.pop(0)
                        
#         currday += 1
    
#     if flag:
#         return task_list
#     return 0
def assign_task(userinfoID, extra_time_slots=[], flag=False):
    tasks = assign_priority(userinfoID)
    tasks.sort(key=lambda x: x.PRIORITY, reverse=True)
    currday = 0
    task_list = []

    while tasks:
        session = create_session(userinfoID)
        user = session.query(User).filter_by(userinfoID=userinfoID).first()
        user_timezone = pytz.timezone(user.user_timezone)
        # curr_time = datetime.datetime.now(user_timezone)
        # start_date = curr_time + datetime.timedelta(days=currday)
        # end_date = start_date.replace(hour=23, minute=59, second=59)
        freeSlots = get_user_free_time(userinfoID, (datetime.datetime.now().replace(hour=0, minute=0, second=0) + datetime.timedelta(days = currday)), (datetime.datetime.now() + datetime.timedelta(days = currday)).replace(hour= 23, minute = 59, second= 59),  extra_time_slots)
        time_estimated = calculate_time_ratio(user, tasks[0].get_subject(session))
        time_step = []
        while time_estimated > 3:
            time_step.append(3)
            time_estimated -= 3
        time_step.append(time_estimated)
        while tasks:
            if not freeSlots:
                print("broke here")
                break
            for time in time_step:
                for i in range(len(freeSlots)):
                    if freeSlots[i][1] - freeSlots[i][0] >= datetime.timedelta(hours=time) and freeSlots[i][1] > freeSlots[i][0]:
                        newSchedule = Schedule(
                            SUMMARY=tasks[0].SUMMARY,
                            DTSTART=freeSlots[i][0],
                            DTEND=freeSlots[i][0] + datetime.timedelta(hours=time),
                            subjectsID=tasks[0].subjectsID,
                            userinfoID=user.userinfoID,
                            personalized_task=True
                        )
                        if not flag:
                            newSchedule.add_to_cloud(user)
                            session.add(newSchedule)
                            session.commit()
                        else:
                            print("added task",newSchedule.DTSTART, newSchedule.DTEND, newSchedule.SUMMARY)
                            task_list.append(newSchedule)
                        freeSlots[i][0] += datetime.timedelta(hours=time + 1)
                        if freeSlots[i][1] - freeSlots[i][0] < datetime.timedelta(hours=1):
                            freeSlots.pop(i)
                        else:
                            # freeSlots[i][0] = freeSlots[i][0] + datetime.timedelta(hours=1)
                            i-=1
                        tasks.pop(0)
                        break
        currday += 1
    
    if flag:
        return task_list
    return 0


# get_user_free_time("82cf448d-fc16-409c-82e9-3304d937f840", datetime.datetime(2021, 9, 9, 0, 0, 0), datetime.datetime(2021, 9, 10, 0, 0, 0))
# assign_task(get_user_info("82cf448d-fc16-409c-82e9-3304d937f840"))
# def assign_time(task: Task, session):
#     if(task.STATUS == "COMPLETED"):
#         return
#     subject = task.get_subject(session)
#     time_remaining = due_date - datetime.datetime.now()
#     due_date = task.DUE
#     difficulty = subject.subject_difficulty
#     current_grade = task.task_grade.current_Grade
#     target

def calculate_time_ratio(user: User, subject: Subjects):
    # get the user's ratio of difficulty to weightage for the subject and get the average time taken for that ratio
    # if the priority is greater than the average priority, assign the task to the user
    avg_time_per_weightage = 0
    for subject in user.subjects_list:
        for task in subject.task_list:
            if task.STATUS == "COMPLETED" and task.task_grade:
                task_time = task.task_grade.time_taken
                if(task_time == None):
                    # set it to 1 hour
                    task_time = 1
                avg_time_per_weightage += task_time/(task.task_grade.task_Weightage if task.task_grade.task_Weightage != 0 else 1) 
    avg_time_per_weightage /= len(user.subjects_list)
    if(avg_time_per_weightage == 0):
        avg_time_per_weightage = 1
    return math.ceil(avg_time_per_weightage)


    # get the user's ratio of difficulty to weightage for the subject and get the average time taken for that ratio
    # if the priority is greater than the average priority, assign the task to the user


# Example usage


    
        
if __name__ == "__main__":
    # get_user_free_time("82cf448d-fc16-409c-82e9-3304d937f840", (datetime.datetime.now().replace(hour=0, minute=0, second=0) + datetime.timedelta(days = 0)), (datetime.datetime.now() + datetime.timedelta(days = 0)).replace(hour= 23, minute = 59, second= 59))
    assign_task("82cf448d-fc16-409c-82e9-3304d937f840", flag = True)
    # print_busy_and_free_slots("82cf448d-fc16-409c-82e9-3304d937f840", datetime.datetime(2024, 4, 24, 9, 0), datetime.datetime(2024, 4, 25, 17, 0))