// 获取所有待办事项
async function fetchTodos() {
    try {
        const response = await fetch('/api/todos');
        const todos = await response.json();
        displayTodos(todos);
    } catch (error) {
        console.error('获取待办事项失败:', error);
    }
}

// 显示待办事项
function displayTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="todo-text">${todo.task}</div>
            <div class="todo-date">${todo.created_at}</div>
        `;
        todoList.appendChild(li);
    });
}

// 添加新的待办事项
async function addTodo() {
    const input = document.getElementById('todoInput');
    const task = input.value.trim();
    
    if (!task) {
        alert('请输入待办事项内容！');
        return;
    }
    
    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task })
        });
        
        if (response.ok) {
            input.value = '';
            fetchTodos(); // 重新加载待办事项列表
        } else {
            const error = await response.json();
            alert(error.error || '添加待办事项失败');
        }
    } catch (error) {
        console.error('添加待办事项失败:', error);
    }
}

// 页面加载时获取待办事项
document.addEventListener('DOMContentLoaded', fetchTodos); 