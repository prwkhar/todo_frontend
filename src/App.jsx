import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react"
import "./App.css";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

function App() {
  <Analytics/>
  //task to fetch all the tasks
  const [task, settask] = useState([]);

  //new task for updation of task
  const [newtask, setnewtask] = useState("");

  //new desc for updation of desc
  const [newdesc, setnewdesc] = useState("");

  //view desc if to render the view desc column
  const [viewdesc, setnewviewdesc] = useState("");

  //updating tells the state when the task is being edited
  const [updating, setupdating] = useState(false);

  //edittitle make changes to the title
  const [edittitle, setedittitle] = useState(null);

  //store the task whose status is completed
  const [completedtask, setcompletedtask] = useState([]);

  //to show the desc of the task
  const [showdesc, setshowdesc] = useState(false);

  //for loading screen while fetching the data from backend
  const [loading,setloading] = useState(false);

  //get the task from the backend
  const gettasks = async () => {
    setloading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/`);
      const data = await res.json();
      settask(data.tasks);
      setcompletedtask(data.completed);
    } catch (error) {
      console.log("error fetching the data");
    }
    setloading(false);
  };

  //use effect hook to load all the task
  useEffect(() => {
    setloading(true);
    gettasks();
    setloading(false);
  }, []);

  //add the task to the backend
  const addtask = async () => {
    setloading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/addtask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newtask, description: newdesc }),
      });
      setnewdesc("");
      setnewtask("");
      gettasks();
    } catch (error) {
      console.log("error adding the task");
    }
    setloading(false);
  };

  //update task
  const updatetask = async (id, updatedtitle) => {
    setloading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/updatetask/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updatedtitle }),
      });
      gettasks();
    } catch (error) {
      console.log("error sending update");
    }
    setloading(false);
  };

  //delete task
  const deletetask = async (id) => {
    setloading(true);
    try {
      await fetch(`${import.meta.env.VITE_SERVER}/deletetask/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      gettasks();
    } catch (error) {
      console.log("Error deleting task");
    }
    setloading(false);
  };


  //update status
  const updatestatus = async (id, status) => {
    setloading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/updatestatus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: status }),
      });
      gettasks();
    } catch (error) {
      console.log("error sending status update");
    }
    setloading(false);
  };


  return (
    <>
      <div className="bg-slate-500 h-screen w-screen flex justify-center items-center">
        <div className="h-[500px] w-[600px] bg-amber-200  p-2 rounded-2xl fixed">
          <div className="h-1/6">
            <div className="flex mt-2">
              <input
                className="bg-amber-50 p-1 text-center w-4/5 h-[40px] rounded-xl"
                type="text"
                value={newtask}
                placeholder="Add Task"
                onChange={(e) => {
                  setnewtask(e.target.value);
                }}
              />
              <button
                className="bg-amber-700 px-4 w-1/5 rounded-2xl hover:bg-amber-600"
                onClick={addtask}
              >
                Add
              </button>
            </div>
            <div>
              <input
                className="bg-amber-50 p-1 text-center mt-1 w-full h-[40px] rounded-xl"
                type="text"
                value={newdesc}
                placeholder="Add Descirption"
                onChange={(e) => {
                  setnewdesc(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="bg-amber-100 h-4/5 rounded-2xl p-1 mt-2 flex-row justify-center overflow-auto">
            <h1 className="text font-bold">Your Tasks</h1>
            {task.length > 0 ? (
              task.map((task, index) => (
                <div
                  key={index}
                  className="flex w-full mt-1 mb-1 justify-between"
                >
                  <div className="flex w-full">
                    {updating === task._id ? (
                      <input
                        className="w-full bg-blue-300 border border-blue-600 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        value={edittitle}
                        onChange={(e) => setedittitle(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => {
                          setnewviewdesc(task.description);
                          setshowdesc(true);
                        }}
                        className="flex hover:bg-green-500 cursor-pointer relative group"
                      >
                        <p>{index + 1}.</p>
                        {task.title}
                        <span className="absolute left-1/2 -top-6 transform -translate-x-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded-xl ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Show Description
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-2 justify-center items-center">
                    <button
                      className="bg-amber-500 px-2 rounded-2xl"
                      onClick={() =>
                        updating !== task._id
                          ? (setupdating(task._id), setedittitle(task.title))
                          : (updatetask(task._id, edittitle),
                            setupdating(false))
                      }
                    >
                      {updating === task._id ? "save" : "edit"}
                    </button>
                    <button
                      className="bg-rose-400 px-2 rounded-2xl"
                      onClick={() => deletetask(task._id)}
                    >
                      delete
                    </button>
                    <div className="flex items-center w-full h-full">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {
                          updatestatus(task._id, !task.completed);
                        }}
                        className="w-10 h-full"
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>no task available</div>
            )}
            {
              <div className="flex flex-col">
                <div>
                  {completedtask.length > 0 && (
                    <h1 className="font-bold">Completed Tasks</h1>
                  )}
                  {completedtask.length > 0 &&
                    completedtask.map((task, index) => (
                      <div
                        key={index}
                        className="flex justify-between mt-1 mb-1"
                      >
                        <p className="line-through">{task.title}</p>
                        <div className="w-5 flex">
                          <input
                            type="checkbox"
                            className="w-10"
                            checked={task.completed}
                            onChange={() => {
                              updatestatus(task._id, !task.completed);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            }
          </div>
        </div>
        {showdesc && (
          <div className="fixed top-0 left-0 bg-white/30 w-full h-full flex justify-center items-center">
            <div className="bg-amber-200 p-4 rounded-2xl w-96 shadow-lg">
              <h2 className="font-bold">Description</h2>
              <p>{viewdesc}</p>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded mt-2"
                onClick={() => setshowdesc(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-xl shadow-lg text-xl font-bold">
                Loading...
              </div>
            </div>
          )}
      </div>
    </>
  );
}

export default App;
