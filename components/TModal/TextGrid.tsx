import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { SelectId, SelectIdProps } from './SelectId'

//import { WidthProvider, Responsive } from "react-grid-layout";
//import _ from "lodash";
//const ResponsiveReactGridLayout = WidthProvider(Responsive);

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

export default function TextGrid (props) {
  const options = props.options;
  const [ layout, setLayout ] = useState<Layout>([]);
  const [ counter, setCounter ] = useState(0);

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
    console.log("adding", "n" + counter);
    console.log(counter,layout)
    setLayout(
      // Add a new item. It must have a unique key!
      (layout as Array).concat({
        i: "n" + counter,
        x: (layout.length * 2) % (props.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      setCounter(counter + 1)
    );
  }

  const onLayoutChange = (layout) => {
    console.log("PROPS:",props)
    //this.props.onLayoutChange(layout);
    setLayout(layout);
  }

  const onRemoveItem = (i) => {
    console.log("removing", i);
    console.log(counter,layout);
    setLayout((layout as Array).filter((item) => item.i !== i));
    setCounter(counter - 1);
    //setLayout({ items: _.reject(layout.items, { i: i }) });
  }

  return (
    <div>
      <SelectId options={options} />
      <button onClick={onAddItem}>Add Item</button>
      <GridLayout
        layout={layout}
        cols={12}
        rowHeight={300}
        width={1000}
        containerPadding={[20,20]}
        compactType={null}
        isDroppable={true}
        onLayoutChange={onLayoutChange}
        {...props}
      >
        {layout.map(el => createElement(el))}
      </GridLayout>
    </div>
  );
};
