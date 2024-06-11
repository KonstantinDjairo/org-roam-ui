import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

export const MyGrid = (props) => {
  const layout = props.layout
  const divs = layout.map((l) =>
    <div key={l.i} className="card">
      {l.key}
    </div>
  );

  return (
    <GridLayout layout={layout} cols={18} rowHeight={300} width={1000}>
      {divs}
    </GridLayout>
  );
};
