import React from "react";
import InputFeild from "./componet/InputFeild";


type Props = {
  
}

class App extends React.Component<Props> {
  render() {
    // const pt = this.props

    // console.log(InputFeild, pt)

    return (
        <div className="bg-blue-500 min-h-screen container">
          <div className="mb-[2rem] p-2">
            <h1 className="text-center text-white text-[2rem] mb-[2rem] mt-[3rem] ">
              TASKIF
            </h1>
            <InputFeild  />
          </div>
        </div>
    );
  }
}

export default App;
