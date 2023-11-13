import React, { Component } from "react";
import classNames from "classnames";

type Props = {
  todo1: any;
  numbers: number;
  open?: boolean;
};

interface IsState {
  // open: boolean;
}

class UpdateFeild extends Component<Props, IsState> {
  constructor(porps: any) {
    super(porps);

    this.state = {
      open: this.props.open,
    };
  }

  onOpen(): void {
    this.setState({ open: true });
  }

  onClose(): void {
    this.setState({ open: false });
  }

  
  render() {
    console.log()

    console.log(this)
    const st: any = this.state;

    return (
      // overlay: 90% opacity of the bg, `inset-0` to stretch over the entire screen
      <div
        ref={(ref) => (st.open = ref)}
        className={classNames(
          "fixed inset-0 z-10 p-8 text-white bg-gray-600/90",
          `${st.open ? "block" : "hidden"}` // control visibility via `open` attribute (or render conditionally)
        )}
      >
        <div
          className="bg-red-500 flex justify-center item-center "
          onClick={() => this.onClose()}
        >
          test
        </div>
      </div>
    );
  }
}

export default UpdateFeild;
