import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const layout = [
  { i: "a", x: 0, y: 0, w: 3, h: 1, static: true },
  { i: "b", x: 3, y: 0, w: 2, h: 1, static: false },
  { i: "c", x: 5, y: 0, w: 2, h: 1 },
  { i: "d", x: 7, y: 0, w: 2, h: 1 },
  { i: "e", x: 9, y: 0, w: 2, h: 1 }
];

export const MyGrid = () => {
  return (
      <GridLayout layout={layout} cols={12} rowHeight={300} width={1000}>
        <div key="a" className="card-static" >aaaaaa aaaa</div>
        <div key="b" className="card" >bbbb</div>
        <div key="c">c</div>
        <div key="d">ddddd</div>
        <div key="e">e</div>
      </GridLayout>
  );
};
