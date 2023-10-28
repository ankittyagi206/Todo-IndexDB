/**
 * Todo:
 * - CRUD Functionality
 * - Use indexDB for the CRUD OPERATIONS
 */

/**
 *
 * Variables
 *
 */

const addBtn = document.getElementById("add-data");
const inputBox = document.getElementById("input-box");
let taskList = document.getElementById("task-list");
const temporaryData = [];
/**
 *
 * Events
 *
 */

/**
 *
 * Add Task
 *
 */
inputBox.addEventListener("change", (e) => {
  if ((e.key = "Enter" && e.target.value)) {
    const payload = {
      id: Date.now(),
      task: e.target.value,
      isCompleted: false,
    };

    addTask(payload)
      .then((res) => {
        if (res === "task Added") {
          renderData();
          inputBox.value = "";
        }
      })
      .catch((err) => {
        console.log("task Error: " + err);
      });
  }
});

const addTask = (payload) => {
  return new Promise((resolve, reject) => {
    if (Object.keys(payload).length > 0) {
      if (db) {
        let dbTransaction = db.transaction("tasks", "readwrite");
        let taskStore = dbTransaction.objectStore("tasks");
        taskStore.add(payload);
        resolve("task Added");
      }
    } else {
      reject(new Error("Task not found"));
    }
  });
};

function deleteTask(id) {
  // open a database transaction and delete the task, finding it by the name we retrieved above
  let dbTransaction = db.transaction("tasks", "readwrite");
  let taskStore = dbTransaction.objectStore("tasks");
  let request = taskStore.delete(id);

  // report that the data item has been deleted
  dbTransaction.oncomplete = () => {
    console.log("Task deleted successfully");
    renderData();
  };
}

setTimeout(() => {
  renderData();
}, 100);
/**
 *
 * To Render the TaskList on the UI
 *
 */
const renderData = () => {
  taskList.innerHTML = "";
  dataRetrievalIndexDB()
    .then((res) => {
      if (res?.length > 0) {
        res.forEach(({ task, id, isCompleted }) => {
          let htmlList = document.createElement("li");
          let cancel = document.createElement("button");

          cancel.textContent = "x";
          cancel.addEventListener("click", () => {
            deleteTask(id);
          });
          htmlList.textContent = task;

          htmlList.appendChild(cancel);
          taskList.appendChild(htmlList);
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 * Data Retrieval From IndexDB
 */
const dataRetrievalIndexDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      let dbTransaction = db.transaction("tasks", "readonly");
      let getTasks = dbTransaction.objectStore("tasks");
      let sendReq = getTasks.getAll();
      sendReq.onsuccess = (e) => {
        resolve(e.target.result);
      };
    } else {
      reject(new Error("Failed to get tasks"));
    }
  });
};
