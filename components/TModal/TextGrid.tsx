import GridLayout from "react-grid-layout";
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const layout = [
  { i: "a", x: 0, y: 0, w: 5, h: 1, static: true },
  { i: "b", x: 5, y: 0, w: 3, h: 1, static: false },
  { i: "c", x: 8, y: 0, w: 3, h: 1 },
  { i: "d", x: 11, y: 0, w: 3, h: 1 },
  { i: "e", x: 14, y: 0, w: 3, h: 1 }
];

export const MyGrid = () => {
  return (
      <GridLayout layout={layout} cols={18} rowHeight={300} width={1000}>
        <div key="a" className="card" >aaaaaa aaaa</div>
        <div key="b" className="card" >bbbb</div>
        <div key="c">c</div>
        <div key="d">ddddd</div>
        <div key="e">e</div>
      </GridLayout>
  );
};
