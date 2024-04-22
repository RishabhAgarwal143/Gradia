from database_queries import *
import pandas as pd
import math


def get_user_free_time(user, DTSTART : datetime, DTEND: datetime):
    schedules =  get_schedule_range(user, DTSTART, DTEND)
    schedules.sort(key=lambda x: x.DTSTART)
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
        flag = 0
        if(len(busySlots) > 0 ):
            if(busySlots[-1][-1] > prevDay.replace(hour=workTimeForprevDay[1].hour, minute=workTimeForprevDay[1].minute, second=workTimeForprevDay[1].second)):
                busySlots.append([busySlots[-1][-1], currday.replace(hour=workTimeForDay[0].hour, minute=workTimeForDay[0].minute, second=workTimeForDay[0].second)])    
                print(busySlots[-1])
                flag = 1
        if flag == 0:
            busySlots.append([prevDay.replace(hour=workTimeForprevDay[1].hour, minute=workTimeForprevDay[1].minute, second=workTimeForprevDay[1].second), currday.replace(hour=workTimeForDay[0].hour, minute=workTimeForDay[0].minute, second=workTimeForDay[0].second)])
       
        for schedule in schedules:
            if schedule.DTSTART.day == currday.day:
                busySlots.append([schedule.DTSTART, schedule.DTEND])
        
                
    for i in range(0, len(busySlots)):
        if busySlots[i][0] > currentDayStart:
            freeSlots.append([currentDayStart, busySlots[i][0]])
        currentDayStart = busySlots[i][1]
    if busySlots[-1][1] < currentDayEnd:
        freeSlots.append([busySlots[-1][1], currentDayEnd])
  

    return freeSlots

def assign_task(user: User, session):
    tasks  = assign_priority(user)
    tasks.sort(key=lambda x: x.PRIORITY, reverse=True)
    # avg_priority = sum([task.PRIORITY for task in tasks])/len(tasks)
    # max_priority = max([task.PRIORITY for task in tasks])
    currday = 0
    while(tasks):
        freeSlots = get_user_free_time(user.userinfoID, (datetime.datetime.now() + datetime.timedelta(days = currday)).replace(hour= 0, minute = 0, second= 0), (datetime.datetime.now() + datetime.timedelta(days = currday)).replace(hour= 23, minute = 59, second= 59))
        # if the user has continuous free time slot of 2hrs, assign the task to that slot
        for task in tasks:
            time_estimated  = calculate_time_ratio(user, task.get_subject(session))
            time_step = []
           
            while(time_estimated > 3):
                time_step.append(time_estimated -3)
                time_estimated -= 3
            time_step.append(time_estimated)
            for time in time_step:
                for slot in freeSlots:
                    if slot[1] - slot[0] >= time:
                        newSchedule = Schedule(SUMMARY=task.SUMMARY, DTSTART =  slot[0], DTEND = slot[0] + datetime.timedelta(hours=time + 1),subjectsID=task.subjectsID,userinfoID=user.userinfoID,personalized_task=True)
                        newSchedule.add_to_cloud(user)
                        # add_to_database(newSchedule)
                        # print(newSchedule.DTSTART.day, newSchedule.DTSTART.hour, newSchedule.DTSTART.minute, "-",  newSchedule.DTEND.day, newSchedule.DTEND.hour, newSchedule.DTEND.minute)
                        print(newSchedule)
                        slot[0] += datetime.timedelta(hours=time + 1)
                        if(slot[0] >= slot[1] or slot[1] - slot[0] < time):
                            freeSlots.remove(slot)     
                        tasks.remove(task)
                        break
    currday += 1


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
                avg_time_per_weightage += task_time/task.task_grade.task_Weightage
    avg_time_per_weightage /= len(user.subjects_list)
    if(avg_time_per_weightage == 0):
        avg_time_per_weightage = 1
    return math.ceil(avg_time_per_weightage)


    # get the user's ratio of difficulty to weightage for the subject and get the average time taken for that ratio
    # if the priority is greater than the average priority, assign the task to the user


    
        

