import React, { Component } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import UpdateFeild from "./UpdateFeild";
// import { cloneDeep } from "lodash";

type Props = {};

interface IState {
  todo: string;
  valTodo: any;
  todo1?: object;
  numbers: number;
}

class InputFeild extends Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todo: "",
      valTodo: ["todo1"],
      todo1: {},
      numbers: 0,
    };
  }

  setTodo(e: any): void {
    this.setState({ todo: e.target.value });
  }

  saveTodo(e: any) {
    let todo1: any = this.state["todo1"];
    let numbers: number = this.state.numbers;
    let j = ++numbers;
    todo1["v" + j] = this.state.todo;
    this.setState({ todo1, todo: "", numbers });
  }

  onOpen(val: string): void {
    if ((val = "edit")) {
    }
  }

  render() {
    const st: any = this.state;
    let TodoList: any = [];

    for (let j = 0; j < st.numbers; j++) {
      let todo1: any = this.state["todo1"],
        number: number = j + 1;
      TodoList.push(
        <div className="flex justify-center align-center w-full " key={j}>
          <div className="bg-yellow-500 mt-[3rem] w-[70%] p-[20px_30px] rounded-xl shadow-lg decoration-pink-600">
            <span className="w-full">{todo1["v" + number]}</span>
            <div className=" float-right flex">
              <span className="ml-3">
                <LuPencilLine size={20} onClick={() => this.onOpen("edit")} />
              </span>
              <span className="ml-3">
                <FaTrashAlt size={20} />
              </span>
              <span className="ml-3">
                <MdOutlineFileDownloadDone size={20} />
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <UpdateFeild todo1={this.state.todo1} numbers={this.state.numbers} />;
        <form className="flex align-center justify-center w-full">
          <input
            type="input"
            value={st.todo}
            placeholder="Enter a task"
            onChange={(e) => this.setTodo(e)}
            className="flex relative align-center transition b-0 p-[20px_30px] rounded-[50px] border shadow-lg drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] outline-0"
          />
          <button
            type="button"
            onClick={(e) => this.saveTodo(e)}
            className="absolute w-[50px] h-[50px] m-[9px] rounded-[50px]  ml-[11rem] border-0 text-[15px] bg-[#2f74c0] text-white transition-all shadow-lg drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] "
          >
            Go
          </button>
        </form>
        {TodoList}
      </div>
    );
  }
}

// Type-checks! No type assertions needed!

export default InputFeild;
