"""This quick start is based off of https://docs.sqlalchemy.org/en/20/orm/quickstart.html

While User and Address is a modern example showing Foreign Keys and how to connect tables,
the Simple class should be enough to complete your Prelab"""

from sqlalchemy import create_engine
from typing import Optional,List
from sqlalchemy.orm import DeclarativeBase,Mapped,mapped_column,relationship
from sqlalchemy.orm import sessionmaker
from sqlalchemy import ForeignKey
import datetime

import requests
import os
import jwt
import pytz


def is_cognito_token_expired(access_token):
    try:
        decoded_token = jwt.decode(access_token, algorithms=["RS256"], options={"verify_signature": False})
        expiration_time = datetime.datetime.fromtimestamp(decoded_token["exp"])
        current_time = datetime.datetime.now()
        if current_time > expiration_time:
            print("Invalid access token.")
            return True  # Token has expired
        else:
            print("Valid Token")
            return False  # Token is still valid
    except jwt.ExpiredSignatureError:
        return True
    except jwt.InvalidTokenError:
        print("Invalid access token.")
        return True

def create_session(userinfoId):
    engine = create_engine(f"sqlite:///Flask_server/database/userdata_{userinfoId}.db")
    Session = sessionmaker(bind=engine)
    session = Session()
    return session

def aws_string(str):
    if(not str):
        return "null"
    return r"\"%s\"" % str

def aws_bool(bool):
    if(bool == None):
        return "null"
    return str(bool).lower()

def aws_datetime(dt):
    if(not dt):
        return "null"
    return r"\"%s\"" % dt.strftime("%Y-%m-%dT%H:%M:%S.000Z")

def parse_time(time_str):
    if(not time_str):
        return None
    try:
        time_object = datetime.datetime.strptime(time_str, "%H:%M:%S").time()
    except ValueError:
        time_object = datetime.datetime.strptime(time_str, "%H:%M").time()
    return time_object


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "user"

    userinfoID : Mapped[str]= mapped_column(primary_key=True)
    access_Token : Mapped[str]
    user_timezone : Mapped[Optional[str]]
    Last_modified : Mapped[Optional[datetime.datetime]]
    UserWorkTime : Mapped[Optional["UserWorkTime"]] = relationship()
    schedule_list : Mapped[List["Schedule"]] = relationship()
    task_list : Mapped[List["Task"]] = relationship()
    subjects_list : Mapped[List["Subjects"]] = relationship()
    
    def __repr__(self) -> str:
        return super().__repr__()
    
    def update_access_token(self,session, new_access_token):
        # Query the user by userinfoID
            self.access_Token = new_access_token
            session.commit()
            
    def get_timezone(self,session):
        if(not self.user_timezone):
            headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.access_Token}'
            }
            url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
            init_payload = "{\"query\":\"query ListSchedules {\\r\\n    getUserinfo(id: \\\"%s\\\") {\\r\\n        Timezone\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" %self.userinfoID

            response = requests.request("POST", url, headers=headers, data=init_payload)
            # print(response.text)
            json_response = response.json()
            print(json_response)
            self.user_timezone = json_response['data']['getUserinfo']['Timezone']
            session.commit()

        return self.user_timezone

    def get_UserWorkTime(self,session):
        
        if(not self.UserWorkTime):
            headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.access_Token}'
            }
            url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
            payload = "{\"query\":\"query GetUserinfo {\\r\\n    getUserinfo(id: \\\"%s\\\") {\\r\\n        UserWorkTim {\\r\\n            id\\r\\n            Monday_start\\r\\n            Monday_end\\r\\n            Tuesday_start\\r\\n            Tuesday_end\\r\\n            Wednesday_start\\r\\n            Wednesday_end\\r\\n            Thurday_start\\r\\n            Thurday_end\\r\\n            Friday_start\\r\\n            Friday_end\\r\\n            Saturday_start\\r\\n            Saturday_end\\r\\n            Sunday_start\\r\\n            Sunday_end\\r\\n            createdAt\\r\\n            updatedAt\\r\\n        }\\r\\n    }\\r\\n}\",\"variables\":{}}" % self.userinfoID
            response = requests.request("POST", url, headers=headers, data=payload)
            json_response = response.json()
            info = json_response['data']['getUserinfo']['UserWorkTim']
            self.UserWorkTime = UserWorkTime(id=info["id"],Monday_start=parse_time(info["Monday_start"]),Monday_end=parse_time(info["Monday_end"]),
                                             Tuesday_start=parse_time(info["Tuesday_start"]),Tuesday_end=parse_time(info["Monday_end"]),
                                             Wednesday_start=parse_time(info["Wednesday_start"]),Wednesday_end=parse_time(info["Monday_end"]),
                                             Thurday_start=parse_time(info["Thurday_start"]),Thurday_end=parse_time(info["Monday_end"]),
                                             Friday_start=parse_time(info["Friday_start"]),Friday_end=parse_time(info["Monday_end"]),
                                             Saturday_start=parse_time(info["Saturday_start"]),Saturday_end=parse_time(info["Monday_end"]),
                                             Sunday_start=parse_time(info["Sunday_start"]),Sunday_end=parse_time(info["Monday_end"]))
            session.add(self.UserWorkTime)
            session.commit()
            
        return self.UserWorkTime
    
    def update_last_modified(self,session):
        
        headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {self.access_Token}'
        }
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        payload = "{\"query\":\"mutation UpdateUserinfo {\\r\\n    updateUserinfo(input: { id: \\\"%s\\\", Last_updated: %s }) {\\r\\n        id\\r\\n    }\\r\\n}\\r\\n\",\"variables\":{}}" %(self.userinfoID,aws_datetime(self.Last_modified))
        response = requests.request("POST", url, headers=headers, data=payload)
        # print(response.text)
        json_response = response.json()
        print(json_response)

            


class UserWorkTime(Base):
    __tablename__ = "userworktime"
    
    id: Mapped[str] = mapped_column(primary_key=True)
    Monday_start : Mapped[Optional[datetime.time]]
    Monday_end : Mapped[Optional[datetime.time]]
    Tuesday_start : Mapped[Optional[datetime.time]]
    Tuesday_end : Mapped[Optional[datetime.time]]
    Wednesday_start : Mapped[Optional[datetime.time]]
    Wednesday_end : Mapped[Optional[datetime.time]]
    Thurday_start : Mapped[Optional[datetime.time]]
    Thurday_end : Mapped[Optional[datetime.time]]
    Friday_start : Mapped[Optional[datetime.time]]
    Friday_end : Mapped[Optional[datetime.time]]
    Saturday_start : Mapped[Optional[datetime.time]]
    Saturday_end : Mapped[Optional[datetime.time]]
    Sunday_start : Mapped[Optional[datetime.time]]
    Sunday_end : Mapped[Optional[datetime.time]] 
    userinfoID: Mapped[str] = mapped_column(ForeignKey("user.userinfoID"))


    def __repr__(self) -> str:
        return super().__repr__()
    def get_work_time(self,day):
        if(day == 0):
            return [self.Monday_start,self.Monday_end]
        elif(day == 1):
            return [self.Tuesday_start,self.Tuesday_end]
        elif(day == 2):
            return [self.Wednesday_start,self.Wednesday_end]
        elif(day == 3):
            return [self.Thurday_start,self.Thurday_end]
        elif(day == 4):
            return [self.Friday_start,self.Friday_end]
        elif(day == 5):
            return [self.Saturday_start,self.Saturday_end]
        elif(day == 6):
            return [self.Sunday_start,self.Sunday_end]
        else:
            return None

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
    personalized_task: Mapped[bool] = mapped_column(default=False)
    userinfoID: Mapped[str] = mapped_column(ForeignKey("user.userinfoID"))
    subjectsID: Mapped[Optional[str]] = mapped_column(ForeignKey("subjects.id"))
    schedule_grade: Mapped[Optional["Schedule_grade_info"]] = relationship()
    def __repr__(self):
        
        return (f"Schedule(id={self.id!r},SUMMARY={self.SUMMARY!r}, DTSTART={self.DTSTART!r}, DTEND={self.DTEND!r}, DESCRIPTION={self.DESCRIPTION!r},LOCATION={self.LOCATION!r})")

    def dict_representation(self) -> dict:
        temp_d = {}
        temp_d["id"] = self.id
        temp_d["SUMMARY"] = self.SUMMARY
        if(self.DTSTART):
            temp_d["DTSTART"] = self.DTSTART.strftime('%Y-%m-%d %H:%M:%S')
        temp_d["DTEND"] = self.DTEND.strftime('%Y-%m-%d %H:%M:%S')
        temp_d["LOCATION"] = self.LOCATION
        temp_d["DESCRIPTION"] = self.DESCRIPTION
        temp_d["userinfoID"] = self.userinfoID
        temp_d["subjectsID"] = self.subjectsID
        temp_d["personalized_task"] = aws_bool(self.personalized_task)
        if(self.schedule_grade):
            temp_d["scheduleScheduleGradeInfoId"] = self.schedule_grade.id
        
        return temp_d
        

    def start_time_userTimezone(self,session):
        user = session.query(User).filter(User.userinfoID == self.userinfoID).first()
        if(not user.user_timezone):
            user.get_timezone(session)
        new_timezone = pytz.timezone(user.user_timezone)
        dt_new_timezone = self.DTSTART.astimezone(new_timezone)
        return dt_new_timezone
    
    def end_time_userTimezone(self,session):
        user = session.query(User).filter(User.userinfoID == self.userinfoID).first()
        if(not user.user_timezone):
            user.get_timezone(session)
        new_timezone = pytz.timezone(user.user_timezone)
        dt_new_timezone = self.DTEND.astimezone(new_timezone)
        return dt_new_timezone


    def add_to_cloud(self,user: User):
        payload = "{\"query\":\"mutation CreateSchedule {\\r\\n    createSchedule(\\r\\n        input: {\\r\\n            "\
                    "SUMMARY: %s\\r\\n            "\
                    "DTSTART: %s\\r\\n            "\
                    "DTEND: %s\\r\\n            "\
                    "DESCRIPTION: %s\\r\\n            "\
                    "LOCATION: %s\\r\\n            "\
                    "userinfoID: \\\"%s\\\"\\r\\n            "\
                    "personalized_task: %s\\r\\n            "\
                    "subjectsID: %s\\r\\n        }\\r\\n    ) "\
                    "{\\r\\n        id\\r\\n        SUMMARY\\r\\n    "\
                    "}\\r\\n}\\r\\n\",\"variables\":{}}" % (aws_string(self.SUMMARY),aws_datetime(self.DTSTART),aws_datetime(self.DTEND),aws_string(self.DESCRIPTION),aws_string(self.LOCATION),user.userinfoID,aws_bool(self.personalized_task),aws_string(self.subjectsID))
                    
        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % user.access_Token
        }
        response = requests.request("POST", url, headers=headers, data=payload)
        json_response = response.json()
        self.id = json_response["data"]["createSchedule"]["id"]
        print(json_response)

    
    def delete_from_cloud(self, user: User):
        
        payload = "{\"query\":\"\\r\\nmutation MyMutation {\\r\\n  \
                    deleteSchedule(input: {id: \\\"%s\\\"}) {\\r\\n    \
                    id\\r\\n  }\\r\\n}\",\"variables\":{}}" % self.id

        url = "https://aznxtxav2jgblkepnsmp6pydfi.appsync-api.us-east-2.amazonaws.com/graphql"
        headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer %s' % user.access_Token
        }
        response = requests.request("POST", url, headers=headers, data=payload)
        return response.text

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
    difficulty: Mapped[Optional[int]]
    def __repr__(self) -> str:
        return f"Task(id={self.id!r}, SUMMARY={self.SUMMARY!r}, subject={self.subjectsID!r})"

    def dict_representation(self) -> dict:
        temp_d = {}
        temp_d["id"] = self.id
        temp_d["SUMMARY"] = self.SUMMARY
        if(self.DTSTART):
            temp_d["DTSTART"] = self.DTSTART.strftime('%Y-%m-%d %H:%M:%S')
        temp_d["DUE"] = self.DUE.strftime('%Y-%m-%d %H:%M:%S')
        temp_d["LOCATION"] = self.LOCATION
        temp_d["DESCRIPTION"] = self.DESCRIPTION
        temp_d["STATUS"] = self.STATUS
        temp_d["PRIORITY"] = self.PRIORITY
        temp_d["userinfoID"] = self.userinfoID
        temp_d["subjectsID"] = self.subjectsID
        if(self.task_grade):
            temp_d["taskTaskGradeInfoId"] = self.task_grade.id
        
        return temp_d

    def start_time_userTimezone(self,session):
        user = session.query(User).filter(User.userinfoID == self.userinfoID).first()
        if(not user.user_timezone):
            user.get_timezone(session)
        new_timezone = pytz.timezone(user.user_timezone)
        dt_new_timezone = self.DTSTART.astimezone(new_timezone)
        return dt_new_timezone
    
    def end_time_userTimezone(self,session):
        user = session.query(User).filter(User.userinfoID == self.userinfoID).first()
        if(not user.user_timezone):
            user.get_timezone(session)
        new_timezone = pytz.timezone(user.user_timezone)
        dt_new_timezone = self.DUE.astimezone(new_timezone)
        return dt_new_timezone
    def get_subject(self,session):
        return session.query(Subjects).filter(Subjects.id == self.subjectsID).first()

class Subjects(Base):
    __tablename__ = "subjects"
    id: Mapped[str] = mapped_column(primary_key=True)
    subject_Name: Mapped[Optional[str]]
    current_Grade: Mapped[Optional[int]]
    target_Grade: Mapped[Optional[int]]
    subject_Difficulty: Mapped[Optional[int]]
    userinfoID: Mapped[str] = mapped_column(ForeignKey("user.userinfoID"))
    schedule_list : Mapped[List["Schedule"]] = relationship()
    task_list : Mapped[List["Task"]] = relationship()

    def __repr__(self) -> str:
        return f"Subjects(id={self.id!r}, subject={self.subject_Name!r}, Current Grade={self.current_Grade!r}  Target Grade={self.target_Grade!r})"


    def calculate_final_grade(self,session):

        self.current_Grade = 0
        for schedule in self.schedule_list:
            if(schedule.schedule_grade):
                schedule.schedule_grade.calculate_grades(session)
                if(schedule.schedule_grade.overall_Percentage):
                    self.current_Grade += schedule.schedule_grade.overall_Percentage
        
        for task in self.task_list:
            if(task.task_grade):
                task.task_grade.calculate_grades(session)
                if(task.task_grade.overall_Percentage):
                    self.current_Grade += task.task_grade.overall_Percentage
        
        session.commit()
                

class Task_grade_info(Base):
    __tablename__ = "task_grade"
    id: Mapped[str] = mapped_column(primary_key=True)
    current_Grade: Mapped[int] = mapped_column(default=0)
    task_Weightage: Mapped[int] = mapped_column(default=0)
    overall_Percentage: Mapped[int] = mapped_column(default=0)
    extra_info: Mapped[Optional[str]]
    time_taken: Mapped[Optional[datetime.time]]
    task_id: Mapped[Optional[str]] = mapped_column(ForeignKey("task.id"))
    
    def calculate_grades(self,session):
        if(self.current_Grade and self.task_Weightage):
            self.overall_Percentage = (self.current_Grade * self.task_Weightage) / 100
            session.commit()
        
    
class Schedule_grade_info(Base):
    __tablename__ = "schedule_grade"
    id: Mapped[str] = mapped_column(primary_key=True)
    current_Grade: Mapped[Optional[int]]
    task_Weightage: Mapped[Optional[int]]
    overall_Percentage: Mapped[Optional[int]]
    extra_info: Mapped[Optional[str]]
    attended: Mapped[Optional[bool]]
    schedule_id: Mapped[Optional[str]] = mapped_column(ForeignKey("schedule.id"))
    
    def calculate_grades(self,session):
        if(self.current_Grade and self.task_Weightage):
            self.overall_Percentage = (self.current_Grade * self.task_Weightage) / 100
            session.commit()


def create_table(userinfoId):
    """Uses all the Base Metadata in this file to create tables"""
    file_path = f"./Flask_server/database/userdata_{userinfoId}.db"
    if os.path.exists(file_path):
        session = create_session(userinfoId)
        user = session.query(User).filter_by(userinfoID=userinfoId).first()
        if(is_cognito_token_expired(user.access_Token)):
            session.query(Schedule).delete()
            session.query(Task).delete()
            session.query(Subjects).delete()
            session.query(UserWorkTime).delete()
            session.query(Task_grade_info).delete()
            session.query(Schedule_grade_info).delete()
            session.query(User).delete()
            session.commit()
        session.close()
        pass
    
    engine = create_engine(f"sqlite:///Flask_server/database/userdata_{userinfoId}.db")
    Base.metadata.create_all(engine)
    # engine.dispose()

if __name__ == "__main__":
    create_table("")
    
