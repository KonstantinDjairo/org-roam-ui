//import GridLayout from "react-grid-layout";
import AddRemoveLayout from './AddRemove.tsx'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export const TextGrid = (props) => {
  const layout = []  //props.layout
  const divs = layout.map((l) =>
    <div key={l.i} className="card">
      {l.i}
    </div>
  );

  return (
    <AddRemoveLayout
      layout={layout}
      //cols={18}
      rowHeight={300}
      width={1000}
      containerPadding={[20,20]}
      //allowOverlap={true}
      //preventCollision={true}
      compactType={null}
      isDroppable={true}
    onLayoutChange={function() {}}
    //props={null}
      //for Firefox
      //onDragStart={e => e.dataTransfer.setData('text/plain', '')}
    >
      //{divs}
    </AddRemoveLayout>
  );
};
