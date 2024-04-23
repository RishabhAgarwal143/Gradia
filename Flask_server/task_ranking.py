import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from database_queries import *
def train_model(user):
    # Get task data
    priorities = get_task_data(user)
    
    # Convert data into DataFrame
    df = pd.DataFrame.from_dict(priorities, orient='index', columns=['time_remaining', 'task_weightage', 'grade_difference', 'task_difficulty'])
    
    # Split data into features (X) and target (y)
    X = df.drop(columns=['priority'])
    y = df['priority']
    
    # Split data into training and validation sets
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Choose model (Random Forest Regressor)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    
    # Train the model
    model.fit(X_train, y_train)
    
    # Evaluate the model
    val_predictions = model.predict(X_val)
    for task, priority in zip(df.index, val_predictions):
        # Assign priority to the task (you may need to adjust this based on your data model)
         # Assuming you have a function to retrieve a task by its ID
        task.PRIORITY = priority
    
    # mse = mean_squared_error(y_val, val_predictions)
    # print("Mean Squared Error:", mse)
    
    # return model

# Example usage:
trained_model = train_model(get_user_info('82cf448d-fc16-409c-82e9-3304d937f840'))

