const STORAGE_KEY = 'focus-tasks-v1';
const sampleTasks = [
  { id: '1', title: 'Hoàn thành bài tập JavaScript', description: 'Ôn lại array methods và hoàn thành bài tập chương 3', category: 'Học tập', status: 'done', date: new Date().toISOString() },
  { id: '2', title: 'Tập thể dục 30 phút', description: 'Chạy bộ quanh công viên', category: 'Sức khỏe', status: 'doing', date: new Date().toISOString() },
  { id: '3', title: 'Đọc sách trước khi ngủ', description: 'Đọc 20 trang sách đang dang dở', category: 'Cá nhân', status: 'todo', date: new Date().toISOString() }
];
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || sampleTasks;
let editingId = null;
const $ = (selector) => document.querySelector(selector);
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const statusLabel = { todo: 'Chưa làm', doing: 'Đang làm', done: 'Đã xong' };
const categoryColor = { 'Cá nhân': '#5368f4', 'Học tập': '#f49b56', 'Công việc': '#31b47a', 'Sức khỏe': '#b76de2' };

function renderTasks() {
  const search = $('#searchInput').value.toLowerCase().trim();
  const filter = $('#filterSelect').value;
  const visible = tasks.filter(task => (filter === 'all' || task.status === filter) && (`${task.title} ${task.description} ${task.category}`.toLowerCase().includes(search)));
  $('#taskCount').textContent = `${visible.length} công việc`;
  $('#navCount').textContent = tasks.filter(task => task.status !== 'done').length;
  $('#taskList').innerHTML = visible.length ? visible.map(task => `<article class="task-row"><button class="check ${task.status}" data-action="toggle" data-id="${task.id}" aria-label="Đổi trạng thái">${task.status === 'done' ? '✓' : ''}</button><div><div class="task-name ${task.status}">${escapeHtml(task.title)}</div>${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}</div><span class="tag">${escapeHtml(task.category)}</span><span class="status-text ${task.status}">${statusLabel[task.status]}</span><button class="task-menu" data-action="edit" data-id="${task.id}" aria-label="Sửa hoặc xóa">•••</button></article>`).join('') : '<div class="empty-state"><strong>Chưa tìm thấy công việc</strong><span>Thử thay đổi bộ lọc hoặc thêm một công việc mới nhé.</span></div>';
  updateMetrics(); renderChart();
}
function updateMetrics() {
  const done = tasks.filter(t => t.status === 'done').length; const doing = tasks.filter(t => t.status === 'doing').length;
  const percent = tasks.length ? Math.round(done / tasks.length * 100) : 0;
  $('#todayMetric').textContent = `${done} / ${tasks.length}`; $('#todayCaption').textContent = percent ? `Đã hoàn thành ${percent}%` : 'Chưa có công việc'; $('#ringToday').textContent = `${percent}%`; $('#doingMetric').textContent = doing; $('#weekMetric').textContent = done; $('#weekCaption').textContent = done > 2 ? 'Bạn đang tiến bộ tốt!' : 'Tiếp tục phát huy!';
}
function renderChart() {
  const values = [3, 5, 4, 7, 6, Math.max(2, tasks.length - 1), tasks.filter(t => t.status === 'done').length]; const max = Math.max(...values, 7);
  $('#barChart').innerHTML = values.map((value, i) => `<div class="bar ${i === 6 ? 'today' : ''}" style="height:${Math.max(5, value / max * 100)}%" data-value="${value}"></div>`).join('');
  const counts = {}; tasks.forEach(t => counts[t.category] = (counts[t.category] || 0) + 1); const entries = Object.entries(counts); const total = tasks.length || 1;
  $('#donutTotal').textContent = tasks.length; $('#donut').style.background = entries.length ? `conic-gradient(${entries.map(([, count], i) => `${categoryColor[entries[i][0]] || '#9ba6c8'} ${entries.slice(0, i).reduce((sum, item) => sum + item[1], 0) / total * 100}% ${entries.slice(0, i + 1).reduce((sum, item) => sum + item[1], 0) / total * 100}%`).join(',')})` : '#e9edf3';
  $('#legend').innerHTML = entries.map(([category, count]) => `<div class="legend-item"><i class="legend-dot" style="background:${categoryColor[category] || '#9ba6c8'}"></i>${category}<strong>${count}</strong></div>`).join('') || '<span class="legend-item">Chưa có dữ liệu</span>';
  $('#insightText').textContent = tasks.length ? (tasks.filter(t => t.status === 'done').length >= tasks.length / 2 ? 'Tuyệt vời! Bạn đã hoàn thành hơn một nửa danh sách công việc.' : 'Hãy bắt đầu với một công việc nhỏ để tạo đà cho ngày hôm nay.') : 'Bạn đang làm rất tốt. Hãy bắt đầu thêm công việc để xem thống kê.';
}
function escapeHtml(value) { return value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
function openDialog(task) { editingId = task?.id || null; $('#dialogTitle').textContent = task ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'; $('#taskId').value = task?.id || ''; $('#taskTitle').value = task?.title || ''; $('#taskDescription').value = task?.description || ''; $('#taskCategory').value = task?.category || 'Cá nhân'; $('#taskStatus').value = task?.status || 'todo'; $('#taskDialog').showModal(); $('#taskTitle').focus(); }
$('#addTaskButton').addEventListener('click', () => openDialog()); $('#closeDialog').addEventListener('click', () => $('#taskDialog').close()); $('#cancelDialog').addEventListener('click', () => $('#taskDialog').close());
$('#taskForm').addEventListener('submit', event => { event.preventDefault(); const value = { id: editingId || uid(), title: $('#taskTitle').value.trim(), description: $('#taskDescription').value.trim(), category: $('#taskCategory').value, status: $('#taskStatus').value, date: new Date().toISOString() }; const index = tasks.findIndex(t => t.id === editingId); if (index >= 0) tasks[index] = value; else tasks.unshift(value); save(); renderTasks(); $('#taskDialog').close(); });
$('#taskList').addEventListener('click', event => { const button = event.target.closest('[data-action]'); if (!button) return; const task = tasks.find(t => t.id === button.dataset.id); if (button.dataset.action === 'toggle') { task.status = task.status === 'done' ? 'todo' : 'done'; save(); renderTasks(); return; } if (confirm(`Bạn muốn sửa công việc “${task.title}” hay xóa?\n\nBấm OK để sửa, Cancel để giữ lại.`)) openDialog(task); });
$('#searchInput').addEventListener('input', renderTasks); $('#filterSelect').addEventListener('change', renderTasks);
document.querySelectorAll('.nav-item').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active')); button.classList.add('active'); document.querySelectorAll('.view').forEach(view => view.classList.remove('active-view')); $(`#${button.dataset.view}View`).classList.add('active-view'); }));
$('#seedButton').addEventListener('click', () => { if (confirm('Nạp lại 3 công việc mẫu? Dữ liệu hiện tại sẽ được thay thế.')) { tasks = sampleTasks.map(task => ({ ...task })); save(); renderTasks(); } });
$('#themeButton').addEventListener('click', () => document.body.classList.toggle('dim')); $('#headerDate').textContent = new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());
renderTasks();
