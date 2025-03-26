import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, settask] = useState([]);
  const [newtask, setnewtask] = useState("");
  const [updating, setupdating] = useState(false);
  const [edittitle,setedittitle]=useState(null);
  const [completedtask,setcompletedtask] = useState([]);
  //get the task from the backend
  const gettasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/");
      const data = await res.json();
      console.log(data.tasks);
      settask(data.tasks);
      setcompletedtask(data.completed);
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
      })
      gettasks();
    } catch (error) {
      console.log("error sending update");
    }
  };

  //delete task
  const deletetask = async (id) => {
    try {
      console.log(`id ${id}`)
      await fetch(`http://localhost:3000/deletetask/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      gettasks();
    } catch (error) {
      console.log("Error deleting task");
    }
  };
  //update status
  const updatestatus = async(id,status)=>{
    console.log(`update status ${id} ${status}`)
    try {
      const res=await fetch(`http://localhost:3000/updatestatus/${id}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({completed:status}),
      }
    )
    gettasks();
    } catch (error) {
      console.log("error sending status update");
    }
  }

  return (
    <>
      <div className="bg-slate-500 h-screen w-screen flex justify-center items-center">
        <div className="h-[500px] w-[600px] bg-amber-200  p-2 rounded-2xl">
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
          <div className="bg-amber-100 h-8/9 rounded-2xl p-1 mt-2 flex-row justify-center">
            <h1 className="text font-bold">Your Tasks</h1>
            {task.length > 0 ? (
              task.map((task, index) => (
                <div
                  key={index}
                  className="flex w-full mt-1 mb-1 justify-between"
                >
                  <div className="flex w-full">
                    {(updating===task._id)?(
                    <input
                    className="w-full bg-blue-300 border border-blue-600 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={edittitle}
                    onChange={(e) => setedittitle(e.target.value)}
                    autoFocus
                  />)
                      :(<div className="flex">
                        <p>{index+1}.</p>
                      {task.title}</div>)
                    }
                  </div>
                  <div className="flex space-x-2 justify-center items-center">
                    <button
                      className="bg-amber-500 px-2 rounded-2xl"
                      onClick={() => 
                        (updating!==task._id)?
                        (setupdating(task._id),setedittitle(task.title)):(
                          updatetask(task._id,edittitle),setupdating(false)
                        )
                      }
                    >
                      {(updating===task._id)?"save":"edit"}
                    </button>
                    <button className="bg-rose-400 px-2 rounded-2xl" onClick={()=>deletetask(task._id)}>
                      delete
                    </button>
                    <div className="flex items-center w-full h-full"><input type="checkbox" checked={task.completed} onChange={()=>{updatestatus(task._id,!task.completed)}} className="w-10 h-full"/></div>
                  </div>
                </div>
              ))
            ) : (
              <div>no task available</div>
            )}
            {
              <div className="flex flex-col">
                <div>
                {completedtask.length>0&&<h1 className="font-bold">Completed Tasks</h1>}
                {completedtask.length>0&&completedtask.map((task,index)=>(<div key={index} className="flex justify-between mt-1 mb-1">
                      <p className="line-through">{task.title}</p>
                      <input type="checkbox" className="w-10"checked={task.completed} onChange={()=>{updatestatus(task._id,!task.completed)}}/>
                      </div>))}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
