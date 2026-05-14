const API_URL = "https://amused-balance-production.up.railway.app";

// ================= ALERT FUNCTION =================

function showAlert(message) {
  const alertBox = document.createElement("div");

  alertBox.innerText = message;

  alertBox.style.position = "fixed";
  alertBox.style.top = "20px";
  alertBox.style.right = "20px";
  alertBox.style.background = "#111827";
  alertBox.style.color = "white";
  alertBox.style.padding = "15px 25px";
  alertBox.style.borderRadius = "8px";
  alertBox.style.zIndex = "999";
  alertBox.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";

  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

// ================= LOGIN =================

async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user_id", data.user_id);

      showAlert("Login Successful!");

      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      showAlert("Login Failed!");
    }
  } catch (error) {
    console.log(error);

    showAlert("Server Error!");
  }
}

// ================= GET PROJECTS =================

async function getProjects() {
  const container = document.getElementById("projectsContainer");

  if (!container) return;

  try {
    const response = await fetch(`${API_URL}/projects`);

    const data = await response.json();

    document.getElementById("totalProjects").innerText = data.length;
    document.getElementById("activeProjects").innerText = data.filter(
      (project) => project.status == "Active",
    ).length;

    document.getElementById("pendingProjects").innerText = data.filter(
      (project) => project.status == "Pending",
    ).length;

    document.getElementById("completedProjects").innerText = data.filter(
      (project) => project.status == "Completed",
    ).length;

    container.innerHTML = "";

    data.forEach((project) => {
      container.innerHTML += `

            <div class="project-card">

                <h3>${project.title}</h3>

                <p>${project.description}</p>
                <p>Status: ${project.status}</p>

                <div class="project-actions">

                    <span>
                        Project ID:
                        ${project.id}
                    </span>

                    ${
                      localStorage.getItem("role") == "admin"
                        ? `<button
onclick="deleteProject(${project.id})">
Delete
</button>`
                        : ""
                    }


                    </button>

                </div>

            </div>

            `;
    });
  } catch (error) {
    console.log(error);
  }
}

// ================= GET TASKS =================

async function getTasks() {
  const table = document.getElementById("taskTableBody");

  if (!table) return;

  try {
    const response = await fetch(`${API_URL}/tasks`);

    const data = await response.json();

    table.innerHTML = "";

    // DASHBOARD COUNTS

    document.getElementById("totalTasks").innerText = data.length;

    document.getElementById("completedTasks").innerText = data.filter(
      (task) => task.status == "Completed",
    ).length;

    document.getElementById("pendingTasks").innerText = data.filter(
      (task) => task.status == "Pending",
    ).length;

    document.getElementById("overdueTasks").innerText = data.filter(
      (task) => task.status == "Pending",
    ).length;

    // ROLE BASED FILTER

    const role = localStorage.getItem("role");

    const userId = localStorage.getItem("user_id");

    let filteredTasks = data;

    if (role == "member") {
      filteredTasks = data.filter((task) => task.assigned_to == userId);
    }

    // TABLE DATA

    filteredTasks.forEach((task) => {
      table.innerHTML += `

      <tr>

        <td>${task.title}</td>

        <td>${task.assigned_to}</td>

        <td>${task.status}</td>

        <td>${task.project_id}</td>

        <td>

${

localStorage.getItem("role") == "admin"

?

`<button
onclick="deleteTask(${task.id})">
Delete
</button>`

:

`

<select
onchange="updateTaskStatus(
${task.id},
this.value
)">

<option>

${task.status}

</option>

<option>
Pending
</option>

<option>
In Progress
</option>

<option>
Completed
</option>

</select>

`

}

</td>

      </tr>

      `;
    });
  } catch (error) {
    console.log(error);
  }
}

// ================= CREATE TASK =================

async function createTask(title, status, assigned_to, project_id) {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        status,
        assigned_to,
        project_id,
      }),
    });

    const data = await response.json();

    console.log(data);

    showAlert("Task Created!");

    modal.style.display = "none";

    getTasks();
  } catch (error) {
    console.log(error);

    showAlert("Task Creation Failed!");
  }
}

// ================= CREATE PROJECT =================

async function createProject(title, description, status) {
  try {
    const response = await fetch(`${API_URL}/projects`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title,
        description,
        status,
      }),
    });

    const data = await response.json();

    showAlert("Project Created!");

    projectModal.style.display = "none";

    getProjects();
  } catch (error) {
    console.log(error);

    showAlert("Project Creation Failed!");
  }
}

// ================= DELETE PROJECT =================

async function deleteProject(id) {
  try {
    await fetch(`${API_URL}/projects/${id}`, {
      method: "DELETE",
    });

    showAlert("Project Deleted!");

    getProjects();
  } catch (error) {
    console.log(error);
  }
}

// ================= DELETE TASK =================

async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    });

    showAlert("Task Deleted!");

    getTasks();
  } catch (error) {
    console.log(error);
  }
}

async function updateTaskStatus(
    id,
    status
){

    try{

        await fetch(

        `${API_URL}/tasks/${id}?status=${status}`,

        {
            method:"PUT"
        }

        );

        showAlert("Task Updated!");

        await getTasks();

    }catch(error){

        console.log(error);

    }

}
// ================= LOGOUT =================

function logoutUser() {
  localStorage.removeItem("token");

  showAlert("Logged Out!");

  setTimeout(() => {
    location.reload();
  }, 1000);
}

// ================= LOGIN FORM =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    await loginUser(email, password);
  });
}

// ================= TASK FORM =================

const taskForm = document.getElementById("taskForm");

if (taskForm) {
  taskForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("taskTitle").value;

    const status = document.getElementById("taskStatus").value;

    const assigned_to = document.getElementById("assignedTo").value;

    const project_id = document.getElementById("projectId").value;

    await createTask(title, status, assigned_to, project_id);
  });
}

// ================= PROJECT FORM =================

const projectForm = document.getElementById("projectForm");

if (projectForm) {
  projectForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("projectTitle").value;

    const description = document.getElementById("projectDescription").value;

    const status = document.getElementById("projectStatus").value;

    await createProject(title, description, status);
  });
}

// ================= TASK MODAL =================

const modal = document.getElementById("taskModal");

const btn = document.getElementById("createTaskBtn");

const closeBtn = document.querySelector(".close");

if (btn) {
  btn.onclick = () => {
    modal.style.display = "block";
  };
}

if (closeBtn) {
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };
}

// ================= PROJECT MODAL =================

const projectModal = document.getElementById("projectModal");

const projectBtn = document.getElementById("createProjectBtn");

const closeProject = document.querySelector(".closeProject");

if (projectBtn) {
  projectBtn.onclick = () => {
    projectModal.style.display = "block";
  };
}

if (closeProject) {
  closeProject.onclick = () => {
    projectModal.style.display = "none";
  };
}

// ================= WINDOW CLICK =================

window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }

  if (e.target == projectModal) {
    projectModal.style.display = "none";
  }
};

// ================= SIGNUP =================

async function signupUser(name, email, password, role) {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });

    const data = await response.json();

    console.log(data);

    showAlert("Account Created Successfully!");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (error) {
    console.log(error);

    showAlert("Signup Failed!");
  }
}

// ================= SIGNUP FORM =================

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;

    const email = document.getElementById("signupEmail").value;

    const password = document.getElementById("signupPassword").value;

    const role = document.getElementById("role").value;

    await signupUser(name, email, password, role);
  });
}

getProjects();
getTasks();


const loggedUser =
document.getElementById("loggedUser");

if(loggedUser){

    const role =
    localStorage.getItem("role");

    const userId =
    localStorage.getItem("user_id");

    loggedUser.innerHTML = `

    (${role} - ID: ${userId})

    `;

}
