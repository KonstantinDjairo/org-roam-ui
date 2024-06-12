import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
//import _ from "lodash";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface gridRow {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
interface gridState {
  items: gridRow[];
  newCounter: number;
}

/**
 * This layout demonstrates how to use a grid with a dynamic number of elements.
 */
export default function AddRemoveLayout (props) {
  const [ state, setState ] = useState<gridState>({ items: [], newCounter: 0 });

  const createElement = (el) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.i;
    return (
      <div key={i} data-grid={el} className="card">
        <span className="text">{i}</span>
        <span
          className="remove"
          style={removeStyle}
          onClick={() => onRemoveItem(i)}
        >
          x
        </span>
      </div>
    );
  }

  const onAddItem = () => {
    /*eslint no-console: 0*/
    console.log("adding", "n" + state.newCounter);
    console.log(state.newCounter,state.items)
    setState({
      // Add a new item. It must have a unique key!
      items: state.items.concat({
        i: "n" + state.newCounter,
        x: (state.items.length * 2) % (props.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  const onBreakpointChange = (breakpoint, cols) => {
    setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  const onLayoutChange = (layout) => {
    console.log("PROPS:",props)
    //this.props.onLayoutChange(layout);
    setState({ layout: layout });
  }

  const onRemoveItem = (i) => {
    console.log("removing", i);
    console.log(state.newCounter,state.items);
    setState({ items: state.items.filter((item) => item.i !== i),
               newCounter: state.newCounter - 1 });
    //setState({ items: _.reject(state.items, { i: i }) });
  }

    return (
      <div>
        <button onClick={onAddItem}>Add Item</button>
        <ResponsiveReactGridLayout
          onLayoutChange={onLayoutChange}
          onBreakpointChange={onBreakpointChange}
          {...props}
        >
          {state.items.map(el => createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
}

