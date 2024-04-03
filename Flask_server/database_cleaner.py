import threading
import jwt
import time
from datetime import datetime
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from database_setup import User,Schedule,Task,Subjects,Task_grade_info,Schedule_grade_info  # Assuming your User class is defined in a module called your_module
from database_queries import delete_from_database

# Configure your SQLAlchemy engine and session
engine = create_engine("sqlite:///Flask_server/database/userdata.db")
Session = sessionmaker(bind=engine)

def is_cognito_token_expired(access_token):
    try:
        decoded_token = jwt.decode(access_token, algorithms=["RS256"], options={"verify_signature": False})
        expiration_time = datetime.fromtimestamp(decoded_token["exp"])
        current_time = datetime.now()
        if current_time > expiration_time:
            return True  # Token has expired
        else:
            print("Valid Token")
            return False  # Token is still valid
    except jwt.ExpiredSignatureError:
        return True
    except jwt.InvalidTokenError:
        print("Invalid access token.")
        return True

def print_user_data(user):
    print("User's schedules:")
    for schedule in user.schedule_list:
        
        if(schedule.schedule_grade):
            delete_from_database(Schedule_grade_info,"id",schedule.schedule_grade.id)
        delete_from_database(Schedule,"id",schedule.id)

    print("User's tasks:")
    for task in user.task_list:
        if(task.task_grade):
            delete_from_database(Task_grade_info,"id",task.task_grade.id)
        delete_from_database(Task,"id",task.id)

    print("User's subjects:")
    for subject in user.subjects_list:
        delete_from_database(Subjects,"id",subject.id)


def check_database():
    engine = create_engine("sqlite:///Flask_server/database/userdata.db")
    Session = sessionmaker(bind=engine)
    session = Session()

    while True:
        for user in session.query(User).all():
            if is_cognito_token_expired(user.access_Token):
                print_user_data(user)

        session.close()
        session = Session()

        time.sleep(60)

# check_database()
