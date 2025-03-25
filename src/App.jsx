import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, settask] = useState([]);
  const [newtask, setnewtask] = useState("");
  //get the task from the backend
  const gettasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/");
      const data = await res.json();
      console.log(data.tasks);
      const t=data.tasks;
      settask(data.tasks);
    } catch (error) {
      console.log("error fetching the data");
    }
  };
  useEffect(() => {
    gettasks();
  }, []);

  //add the task to the backend
  const addtask = async()=>{
    try {
      const res=await fetch("http://localhost:3000/addtask",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({title:newtask,description:"lolo"}),
      })
      console.log(JSON.stringify({title:newtask}));
      setnewtask('');
      gettasks();
      console.log("send task to the server");
    } catch (error) {
      console.log("error adding the task");
    }
  }

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
          <div className="bg-amber-100 h-8/9 rounded-2xl p-1 mt-2 flex justify-center">
            <h1 className="text font-bold">Your Tasks</h1>
            {
              task.length>0?task.map((task,index)=>(
                  <div key={index} className="flex">
                    <div>{task.title}</div>
                  </div>
              )):<div>
                no task available
                </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
