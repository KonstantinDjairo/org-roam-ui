import React, { useState } from "react";
import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { SelectId, SelectIdProps } from './SelectId'

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

  const onAddItem = (id) => {
    /*eslint no-console: 0*/
    console.log("adding", id);
    console.log(layout)
    setLayout(
      // Add a new item. It must have a unique key!
      (layout as Array).concat({
        i: id,
        x: (layout.length * 2) % (props.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
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

  const [selectedItems, setSelectedItems] = useState<typeof optionArray>([])
  const onSelectedItemsChange = (changes,selectedItems) => {
    console.debug("SELECTED-OLD:", selectedItems)
    console.debug("SELECTED-NEW:", changes.selectedItems)
    const selectedIds = changes.selectedItems.map((item) => item.value)
    const layoutIds = layout.map((l) => l.i)
    console.debug("S-ids",selectedIds)
    console.debug("L-ids",layoutIds)
    var id
    for (id of selectedIds) {
      if (!layoutIds.includes(id))
      {console.debug("NOT-INCLUDED:",id)
        onAddItem(id)
      }
    }
    if (changes.selectedItems) {
      setSelectedItems(changes.selectedItems)
      //          setFilter({ ...filter, [listName]: changes.selectedItems.map((item) => item.value) })
    }
  }

  const onRestart = () => {
    setSelectedItems([])
    setLayout([])
  }

  return (
    <div>
      <button onClick={onRestart}>Очистить</button>
      <SelectId options={options}
                selectedItems={selectedItems}
                onSelectedItemsChange={onSelectedItemsChange} />
      <GridLayout
        layout={layout}
        cols={12}
        rowHeight={300}
        width={1000}
        containerPadding={[20,20]}
        //compactType={null}
        isDroppable={true}
        onLayoutChange={onLayoutChange}
        {...props}
      >
        {layout.map(el => createElement(el))}
      </GridLayout>
    </div>
  );
};
