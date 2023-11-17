import React, { Component } from "react";
import { FaTrashAlt } from "react-icons/fa";
import classNames from "classnames";
import { LuPencilLine } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { cloneDeep } from "lodash";
import { ajaxGet, ajaxInsert } from "../helper/func";
import axios from "axios";

type Props = {};

interface IState {
  todo: string;
  todo1?: object;
  rowEnd: number;
  numbersID: number;
  numbersVla: object;
  OnModalEdit: boolean;
  OnModalDelete: boolean;
  bet_data: any;
  NumberTasks: number;
}

class InputFeild extends Component<Props, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      todo: "",
      todo1: {},
      rowEnd: 0,
      numbersVla: {},
      OnModalEdit: false,
      OnModalDelete: false,
      numbersID: 0,
      bet_data: [],
      NumberTasks: 0,
    };
  }
  componentDidMount(): void {
    this.fetchDropList();
  }

  async fetchDropList() {
    const { todo1, numbersVla }: any = this.state;
    let rowEnd: number = 0;
    ajaxGet().then((res) => {
      res.forEach((item: { id: number; note_name: string }, j: number) => {
        let num = j + 1;
        todo1["v" + num] = item.note_name;
        numbersVla["v" + num] = num;
        rowEnd = num;
      });
      this.setState({ todo1, numbersVla, rowEnd, bet_data: res });
    });
  }

  setTodo(e: any): void {
    this.setState({ todo: e.target.value });
  }

  saveTodo(e: any) {
    const st = this.state;
    if (st.todo.length) {
      let todo1: any = st["todo1"],
        rowEnd: number = st.rowEnd,
        numbersVla: any = st.numbersVla,
        j = ++rowEnd;
      todo1["v" + j] = st.todo;
      numbersVla["v" + j] = j;
      ajaxInsert(st.todo).then((res) => {
      this.setState({ todo1, todo: "", rowEnd, bet_data: res.code });
      });
    } else {
      alert("please input value");
    }
  }

  async Todo1Val(e: any, checked: boolean, type: string) {
    const st: any = this.state;
    let todo1: any = {};
    let numbersVla: any = {};
    todo1 = cloneDeep(st.todo1);
    numbersVla = cloneDeep(st.numbersVla);

    if (type === "update_1") {
      todo1["v" + st.numbersID] = e.target.value;
      this.setState({
        todo1,
        OnModalEdit: checked,
      });
    } else if (type === "delete" || "update") {
      let typeOfApi = type === "update" ? "update" : "delete";
      numbersVla["v" + st.numbersID] =
        type === "update" ? numbersVla["v" + st.numbersID] : "";
      todo1["v" + st.numbersID] =
        type === "update" ? todo1["v" + st.numbersID] : "";

      await axios.get(
        `http://127.0.0.1:8000/api/${typeOfApi}/${st.NumberTasks},${
          todo1["v" + st.numbersID]
        }`
      );
      this.setState({
        todo1,
        numbersVla,
        OnModalEdit: checked,
        OnModalDelete: checked,
      });
    }
  }

  OnModalRefOpen(
    chcek: boolean,
    type: string,
    num: number,
    NumberTasks: number
  ) {
    if (type === "edit") {
      this.setState({ OnModalEdit: chcek, numbersID: num, NumberTasks });
    } else {
      this.setState({ OnModalDelete: chcek, numbersID: num, NumberTasks });
    }
  }

  OnModalRefClose(chcek: boolean, type: string) {
    if (type === "edit") {
      this.setState({ OnModalEdit: chcek });
    } else {
      this.setState({ OnModalDelete: chcek });
    }
  }

  render() {
    const st: any = this.state;
    let TodoList: any = [];
    console.log(st);

    for (let j = 0; j < st.rowEnd; j++) {
      const { todo1, bet_data }: any = this.state;
      let number: number = j + 1;

      let NumberTasks = bet_data.map((item: any) => item.id);

      TodoList.push(
        <div
          className={classNames(
            "flex justify-center align-center w-full",
            `${st.numbersVla["v" + number] ? "block" : "hidden"}`
          )}
          key={j}
        >
          <div className="bg-yellow-500 mt-[3rem] w-[70%] p-[20px_30px] rounded-xl shadow-lg decoration-pink-600">
            <span className="w-full">{todo1["v" + number]}</span>
            <div className=" float-right flex ">
              <span className="ml-[1rem]">
                <LuPencilLine
                  size={20}
                  onClick={() =>
                    this.OnModalRefOpen(true, "edit", number, NumberTasks[j])
                  }
                />
              </span>
              <span className="ml-[1rem]">
                <FaTrashAlt
                  size={20}
                  onClick={() =>
                    this.OnModalRefOpen(true, "delete", number, NumberTasks[j])
                  }
                />
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
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

        <React.Fragment>
          <div
            className={classNames(
              "fixed inset-0 z-10 p-8 text-white bg-gray-600/90 flex justify-center items-center",
              `${st.OnModalEdit ? "block" : "hidden"}`
            )}
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Update Note
                  </h3>
                  <IoClose
                    fontSize={24}
                    className="text-black"
                    onClick={() => this.OnModalRefClose(false, "edit")}
                  />
                </div>
                <div className="p-4 md:p-5 space-y-4 flex ">
                  <textarea
                    className="outline outline-1  outline-offset-2 rounded-lg text-black  p-2 w-full"
                    onChange={(e) => this.Todo1Val(e, true, "update_1")}
                    value={st.todo1["v" + st.numbersID]}
                  ></textarea>
                </div>
                <div>
                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      onClick={(e) => this.Todo1Val(e, false, "update")}
                      type="button"
                      className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => this.OnModalRefClose(false, "edit")}
                      data-modal-hide="default-modal"
                      type="button"
                      className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>

        <React.Fragment>
          <div
            className={classNames(
              "fixed inset-0 z-10 p-8 text-white bg-gray-600/90 flex justify-center items-center",
              `${st.OnModalDelete ? "block" : "hidden"}`
            )}
          >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Delete Note
                  </h3>
                  <IoClose
                    fontSize={24}
                    className="text-black"
                    onClick={() => this.OnModalRefClose(false, "delete")}
                  />
                </div>
                <div className="p-4 md:p-5 space-y-4  ">
                  <div className="flex justify-center item-center">
                    <button
                      onClick={(e) => this.Todo1Val(e, false, "delete")}
                      type="button"
                      className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => this.OnModalRefClose(false, "delete")}
                      data-modal-hide="default-modal"
                      type="button"
                      className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

// Type-checks! No type assertions needed!

export default InputFeild;
