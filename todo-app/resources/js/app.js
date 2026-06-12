const categoryNames = {
    work: 'おしごと',
    personal: 'じぶん',
    home: 'おうち',
};

const starterTasks = [
    { id: 1, title: '朝のストレッチをする', category: 'personal', important: false, completed: true },
    { id: 2, title: '企画書のデザインを仕上げる', category: 'work', important: true, completed: false },
    { id: 3, title: 'お気に入りの本を30分読む', category: 'personal', important: false, completed: false },
    { id: 4, title: 'スーパーで果物を買う', category: 'home', important: false, completed: false },
];

let tasks = JSON.parse(localStorage.getItem('little-todo-tasks') || 'null') ?? starterTasks;
let currentFilter = 'all';
let currentCategory = 'all';

const taskList = document.querySelector('#taskList');
const emptyState = document.querySelector('#emptyState');
const modal = document.querySelector('#taskModal');
const taskForm = document.querySelector('#taskForm');

function saveTasks() {
    localStorage.setItem('little-todo-tasks', JSON.stringify(tasks));
}

function visibleTasks() {
    return tasks.filter((task) => {
        const filterMatch = currentFilter === 'all'
            || (currentFilter === 'important' && task.important)
            || (currentFilter === 'completed' && task.completed);
        const categoryMatch = currentCategory === 'all' || task.category === currentCategory;
        return filterMatch && categoryMatch;
    });
}

function render() {
    const filtered = visibleTasks();
    taskList.innerHTML = filtered.map((task) => `
        <article class="task-card ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <button class="check-button" data-action="toggle" aria-label="${task.completed ? '未完了に戻す' : '完了にする'}">✓</button>
            <div>
                <p class="task-title">${escapeHtml(task.title)}</p>
                <div class="task-meta">
                    <span class="category-pill ${task.category}">${categoryNames[task.category]}</span>
                    <span>${task.completed ? 'できた！' : '今日'}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="icon-button ${task.important ? 'important' : ''}" data-action="important" aria-label="大切なタスク">☆</button>
                <button class="icon-button" data-action="delete" aria-label="削除">×</button>
            </div>
        </article>
    `).join('');

    emptyState.hidden = filtered.length > 0;
    updateProgress();
}

function updateProgress() {
    const completed = tasks.filter((task) => task.completed).length;
    const total = tasks.length;
    const percent = total ? Math.round((completed / total) * 100) : 0;
    document.querySelector('#completedCount').textContent = completed;
    document.querySelector('#totalCount').textContent = total;
    document.querySelector('#allCount').textContent = tasks.filter((task) => !task.completed).length;
    document.querySelector('#progressPercent').textContent = `${percent}%`;
    document.querySelector('#progressBar').style.width = `${percent}%`;
    document.querySelector('#progressMessage').textContent =
        percent === 100 ? 'ぜんぶできたね！' : percent >= 50 ? 'いい調子、そのまま！' : 'ゆっくり始めよう';
}

function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
}

taskList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const id = Number(button.closest('.task-card').dataset.id);
    const action = button.dataset.action;

    if (action === 'delete') tasks = tasks.filter((task) => task.id !== id);
    if (action === 'toggle') tasks = tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
    if (action === 'important') tasks = tasks.map((task) => task.id === id ? { ...task, important: !task.important } : task);
    saveTasks();
    render();
});

document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.dataset.filter;
        document.querySelector('#sectionTitle').textContent = {
            all: '今日やること',
            important: '大切なこと',
            completed: 'できたこと',
        }[currentFilter];
        document.querySelector('.sidebar').classList.remove('open');
        render();
    });
});

document.querySelectorAll('.category-tab').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.category-tab').forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.dataset.category;
        render();
    });
});

document.querySelector('#openTaskModal').addEventListener('click', () => {
    modal.showModal();
    setTimeout(() => document.querySelector('#taskInput').focus(), 50);
});

taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#taskInput').value.trim();
    if (!title) return;
    tasks.unshift({
        id: Date.now(),
        title,
        category: document.querySelector('#categoryInput').value,
        important: document.querySelector('#importantInput').checked,
        completed: false,
    });
    saveTasks();
    taskForm.reset();
    modal.close();
    render();
});

document.querySelector('#mobileMenu').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
});

const today = new Intl.DateTimeFormat('ja-JP', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
}).format(new Date());
document.querySelector('#todayLabel').textContent = today;

render();
