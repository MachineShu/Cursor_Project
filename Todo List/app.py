from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)

# 初始化数据库
def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS todos
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  task TEXT NOT NULL,
                  created_at TIMESTAMP NOT NULL)''')
    conn.commit()
    conn.close()

# 启动时初始化数据库
init_db()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/todos', methods=['GET'])
def get_todos():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT * FROM todos ORDER BY created_at DESC')
    todos = [{'id': row[0], 'task': row[1], 'created_at': row[2]} 
             for row in c.fetchall()]
    conn.close()
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    task = request.json.get('task')
    if not task:
        return jsonify({'error': '任务不能为空'}), 400
    
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('INSERT INTO todos (task, created_at) VALUES (?, ?)',
              (task, datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
    conn.commit()
    todo_id = c.lastrowid
    conn.close()
    
    return jsonify({
        'id': todo_id,
        'task': task,
        'created_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    })

if __name__ == '__main__':
    app.run(debug=True) 