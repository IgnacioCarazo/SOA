from datetime import datetime


class Task:
    def __init__(self, task_id, title, description='', status='To Do'):
        self.id = task_id
        self.title = title
        self.description = description
        self.status = status

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
        }
