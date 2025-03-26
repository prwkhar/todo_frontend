import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, settask] = useState([]);
  const [newtask, setnewtask] = useState("");
  const [newdesc, setnewdesc] = useState("");
  const [viewdesc, setnewviewdesc] = useState("");
  const [updating, setupdating] = useState(false);
  const [edittitle, setedittitle] = useState(null);
  const [completedtask, setcompletedtask] = useState([]);
  const [showdesc, setshowdesc] = useState(false);
  const [loading, setLoading] = useState(false);

  const gettasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/`);
      const data = await res.json();
      settask(data.tasks);
      setcompletedtask(data.completed);
    } catch (error) {
      console.log("error fetching the data");
    }
    setLoading(false);
  };

  useEffect(() => {
    gettasks();
  }, []);

  const addtask = async () => {
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_SERVER}/addtask`, {
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
    setLoading(false);
  };

  const updatetask = async (id, updatedtitle) => {
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_SERVER}/updatetask/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updatedtitle }),
      });
      gettasks();
    } catch (error) {
      console.log("error sending update");
    }
    setLoading(false);
  };

  const deletetask = async (id) => {
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_SERVER}/deletetask/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      gettasks();
    } catch (error) {
      console.log("Error deleting task");
    }
    setLoading(false);
  };

  const updatestatus = async (id, status) => {
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_SERVER}/updatestatus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: status }),
      });
      gettasks();
    } catch (error) {
      console.log("error sending status update");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="bg-slate-500 h-screen w-screen flex justify-center items-center">
        <div className="h-[500px] w-[600px] bg-amber-200 p-2 rounded-2xl fixed">
          {loading && <div className="text-center text-red-500">Loading...</div>}
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
                className="bg-amber-700 px-4 w-1/5 rounded-2xl hover:bg-amber-600 hover:scale-105 transition-transform"
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
                placeholder="Add Description"
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
                  </div>
                  <div className="flex space-x-2 justify-center items-center">
                    <button
                      className="bg-amber-500 px-2 rounded-2xl hover:scale-105 transition-transform"
                      onClick={() =>
                        updating !== task._id
                          ? (setupdating(task._id), setedittitle(task.title))
                          : (updatetask(task._id, edittitle), setupdating(false))
                      }
                    >
                      {updating === task._id ? "save" : "edit"}
                    </button>
                    <button
                      className="bg-rose-400 px-2 rounded-2xl hover:scale-105 transition-transform"
                      onClick={() => deletetask(task._id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No tasks available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
