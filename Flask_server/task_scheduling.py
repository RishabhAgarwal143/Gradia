from database_queries import *
import pandas as pd



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
        
                
    # print("BUSY SLOTS:")

    # # busySlots.sort()

    # for slot in busySlots:
    #     print(slot[0].day, "  time : ", slot[0].hour, ":", slot[0].minute, "-",  slot[1].day, "  time : ", slot[1].hour, ":",slot[1].minute)
    for i in range(0, len(busySlots)):
        if busySlots[i][0] > currentDayStart:
            freeSlots.append([currentDayStart, busySlots[i][0]])
        currentDayStart = busySlots[i][1]
    if busySlots[-1][1] < currentDayEnd:
        freeSlots.append([busySlots[-1][1], currentDayEnd])
  

    



    # print("FREE SLOTS:")
  
    # for slot in freeSlots:
    #     print(slot[0].day, slot[0].hour, slot[0].minute, "-",  slot[1].day, slot[1].hour, slot[1].minute)

    return freeSlots

def assign_task(user: User):
    tasks  = assign_priority(user)

    tasks.sort(key=lambda x: x.PRIORITY, reverse=True)
    currday = 0
    while(tasks):
        freeSlots = get_user_free_time(user.userinfoID, (datetime.datetime.now() + datetime.timedelta(days = currday)).replace(hour= 0, minute = 0, second= 0), (datetime.datetime.now() + datetime.timedelta(days = currday)).replace(hour= 23, minute = 59, second= 59))
        # if the user has continuous free time slot of 2hrs, assign the task to that slot
        for task in tasks:
            for slot in freeSlots:
                if slot[1] - slot[0] >= datetime.timedelta(hours=2):
                    newSchedule = Schedule(SUMMARY=task.SUMMARY, DTSTART =  slot[0], DTEND = slot[0] + datetime.timedelta(hours=1),subjectsID=task.subjectsID,userinfoID=user.userinfoID,personalized_task=True)
                    newSchedule.add_to_cloud(user)
                    # add_to_database(newSchedule)
                    # print(newSchedule.DTSTART.day, newSchedule.DTSTART.hour, newSchedule.DTSTART.minute, "-",  newSchedule.DTEND.day, newSchedule.DTEND.hour, newSchedule.DTEND.minute)
                    print(newSchedule)
                    slot[0] += datetime.timedelta(hours=2)
                    if(slot[0] >= slot[1] or slot[1] - slot[0] < datetime.timedelta(hours=1)):
                        freeSlots.remove(slot)     
                    tasks.remove(task)
                    break
        currday += 1

    # assign 1hr to each task and remove the task from the list, then update the free time slots array and repeat until all tasks are assigned
    # to add the task to user's schedule, create a new schedule object with the task's details and add it to the database
    # for task in tasks:
    #     for slot in freeSlots:
    #         if slot[1] - slot[0] >= datetime.timedelta(hours=1):
    #             newSchedule = Schedule(SUMMARY=task.SUMMARY, DTSTART =  slot[0], DTEND = slot[0] + datetime.timedelta(hours=1))
    #             # add_to_database(newSchedule)
    #             # print(newSchedule.DTSTART.day, newSchedule.DTSTART.hour, newSchedule.DTSTART.minute, "-",  newSchedule.DTEND.day, newSchedule.DTEND.hour, newSchedule.DTEND.minute)
    #             print(newSchedule)
    #             slot[0] += datetime.timedelta(hours=2)
    #             break


# get_user_free_time("82cf448d-fc16-409c-82e9-3304d937f840", datetime.datetime(2021, 9, 9, 0, 0, 0), datetime.datetime(2021, 9, 10, 0, 0, 0))
assign_task(get_user_info("82cf448d-fc16-409c-82e9-3304d937f840"))
    