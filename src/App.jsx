import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, settask] = useState([]);
  const [newtask, setnewtask] = useState("");
  const [updating, setupdating] = useState(false);
  const [edittitle,setedittitle]=useState(null);
  //get the task from the backend
  const gettasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/");
      const data = await res.json();
      console.log(data.tasks);
      const t = data.tasks;
      settask(data.tasks);
    } catch (error) {
      console.log("error fetching the data");
    }
  };
  useEffect(() => {
    gettasks();
  }, []);

  //add the task to the backend
  const addtask = async () => {
    try {
      const res = await fetch("http://localhost:3000/addtask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newtask, description: "lolo" }),
      });
      console.log(JSON.stringify({ title: newtask }));
      setnewtask("");
      gettasks();
      console.log("send task to the server");
    } catch (error) {
      console.log("error adding the task");
    }
  };

  //update task
  const updatetask = async (id,updatedtitle) => {
    try {
      console.log(`sending ${id} ${updatedtitle}`)
      const res = await fetch(`http://localhost:3000/updatetask/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title:updatedtitle}),
      });
    } catch (error) {
      console.log("error sending update");
    }
  };

  return (
    <>
      <div className="bg-slate-500 h-screen w-screen flex justify-center items-center">
        <div className="h-[500px] w-[600px] bg-amber-200  p-2 rounded-2xl">
          <div className="flex mt-2">
            <input
              className="bg-amber-50 p-1 text-center w-3/4 h-[40px] rounded-xl"
              type="text"
              placeholder="Add Task"
              onChange={(e) => {
                setnewtask(e.target.value);
              }}
            />
            <button
              className="bg-amber-700 px-4 w-1/s4 rounded-2xl"
              onClick={addtask}
            >
              Add
            </button>
          </div>
          <div className="bg-amber-100 h-8/9 rounded-2xl p-1 mt-2 flex-row justify-center">
            <h1 className="text font-bold">Your Tasks</h1>
            {task.length > 0 ? (
              task.map((task, index) => (
                <div
                  key={index}
                  className="flex w-full mt-1 mb-1 justify-between"
                >
                  <div className="flex">
                    {(updating===task._id)?(
                    <input
                    type="text"
                    value={edittitle}
                    onChange={(e)=>(setedittitle(e.target.value))}
                    />)
                      :(<div>
                      <h1 className="font-bold">Title:</h1>
                      {task.title}</div>)
                    }
                  </div>
                  <div className="flex space-x-2 justify-center items-center">
                    <h1 className="flex">
                      Done
                      <input type="checkbox" className="w-10" />
                    </h1>
                    <button
                      className="bg-amber-500 px-2 rounded-2xl"
                      onClick={() => 
                        (updating!==task._id)?
                        (setupdating(task._id),setedittitle(task.title)):(
                          updatetask(task._id,edittitle)
                        )
                      }
                    >
                      {(updating===task._id)?"save":"edit"}
                    </button>
                    <button className="bg-rose-400 px-2 rounded-2xl">
                      delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>no task available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
