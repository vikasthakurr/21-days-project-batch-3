let tasks = []; //initial tasks
let currentView = "list";
let timerInterval = null;
let timeLeft = 25 * 60; // 25 minutes in seconds
let initialTime = 25 * 60;
let focusedTaskId = null;
let currentChart = null;

//dom access
const taskForm = document.getElementById("taskForm");
const taskContainer = document.getElementById("task");
const subTaskList = document.getElementById("subTaskList");
const viewButtons = document.querySelectorAll(".nav-btn[data-view");
const viewSections = document.querySelectorAll(".view-section");

//init function
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  setupEventListeners();
  setupTheme();
  renderApp();
});

//main logic
function loadTasks() {
  //retrieve from local storage
  const data = localStorage.getItem("taskmate_data");
  if (data) {
    tasks = JSON.parse(data); //string to array
  }
}

function saveTasks() {
  localStorage.setItem("tasksmate_data", JSON.stringify(tasks));
  renderApp();
}

function renderApp() {
  //stat update
  updateSidebarCount();
  viewSections.forEach((ele) => ele.classList.remove("active"));
  const activeSection = document.getElementById(`view-${currentView}`);
  if (activeSection) activeSection.classList.add("active");

  viewButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === currentView);
  });

  //condition render
  if (currentView === "list") renderListView();
  if (currentView === "board") renderKanbanBoard();
  if (currentView === "timer") updateTimerUI();
  if (currentView === "analytics") renderCharts();

  if (window.lucide) lucide.createIcons();
}
