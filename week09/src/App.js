import React from "react"

const Couter=()=>{
  const [count,setCount]=React.useState(0);

  const onIncrease=()=>{
    setCount((prevCount)=>prevCount+1);
  };

  return(
    <div>
      <h1>{count}</h1>
      <div onClick={onIncrease}>Click Me </div>
    </div>
  );
};

const App=()=>{
  return(
    <>
      <Couter/>
    </>
  );
};

export default App;