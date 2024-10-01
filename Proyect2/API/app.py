from flask import Flask, jsonify, request
from flasgger import Swagger
import os
import json
from flask_cors import CORS  # Import CORS
from models.task import Task  # Import the Task class

app = Flask(__name__)
CORS(app)
swagger = Swagger(app, template_file=os.path.join(
    os.path.dirname(__file__), 'swagger.yml'))

# Path to the JSON file
TASKS_FILE = 'tasks.json'
ALLOWED_STATUSES = ['to-do', 'in-progress', 'done']

# Function to load tasks from the JSON file


def load_tasks():
    if os.path.exists(TASKS_FILE):
        try:
            with open(TASKS_FILE, 'r') as f:
                # Returning tasks and None for error
                return [Task(**task) for task in json.load(f)], None
        except json.JSONDecodeError:
            # Return empty list and error message
            return [], "Invalid JSON format in tasks file."
        except Exception as e:
            return [], str(e)  # Return empty list and specific error message
    return [], None  # Return empty list and no error if file doesn't exist

# Function to save tasks to the JSON file


def save_tasks(tasks):
    try:
        with open(TASKS_FILE, 'w') as f:
            json.dump([task.to_dict() for task in tasks], f, indent=4)
    except Exception as e:
        return str(e)  # Return an error message if something goes wrong
    return None


# Initialize task list and task ID counter
tasks, error_message = load_tasks()
if error_message:
    print(f"Error loading tasks: {error_message}")
task_id_counter = max((task.id for task in tasks), default=0) + 1


@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify([task.to_dict() for task in tasks]), 200


@app.route('/tasks', methods=['POST'])
def create_task():
    global task_id_counter
    data = request.json

    # Input validation
    if 'title' not in data or not data['title']:
        return jsonify({"error": "Title is required and cannot be empty."}), 400

    status = data.get('status', 'To Do')
    if status not in ALLOWED_STATUSES:
        return jsonify({"error": f"Status must be one of the following: {', '.join(ALLOWED_STATUSES)}."}), 400

    new_task = Task(task_id_counter, data['title'], data.get(
        'description', ''), status)
    tasks.append(new_task)

    # Save the updated tasks to the JSON file
    error_message = save_tasks(tasks)
    if error_message:
        return jsonify({"error": f"Error saving task: {error_message}"}), 500

    task_id_counter += 1
    return jsonify(new_task.to_dict()), 201


@app.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = next((t for t in tasks if t.id == id), None)
    if task is None:
        return jsonify({"error": "Task not found"}), 404
    return jsonify(task.to_dict()), 200


@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = next((t for t in tasks if t.id == id), None)
    if task is None:
        return jsonify({"error": "Task not found"}), 404

    data = request.json

    # Input validation
    if 'title' in data and not data['title']:
        return jsonify({"error": "Title cannot be empty."}), 400

    status = data.get('status', task.status)
    if status not in ALLOWED_STATUSES:
        return jsonify({"error": f"Status must be one of the following: {', '.join(ALLOWED_STATUSES)}."}), 400

    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.status = status

    # Save the updated tasks to the JSON file
    error_message = save_tasks(tasks)
    if error_message:
        return jsonify({"error": f"Error saving task: {error_message}"}), 500

    return jsonify(task.to_dict()), 200


@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    global tasks
    tasks = [task for task in tasks if task.id != id]

    # Save the updated tasks to the JSON file
    error_message = save_tasks(tasks)
    if error_message:
        return jsonify({"error": f"Error saving tasks: {error_message}"}), 500

    return '', 204


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
