import React from 'react';
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ParentComponent() {
  const [state, setState] = React.useState(false);
  const [dep] = React.useState(false);
  console.log("Parent Component redered");

  const handler = React.useCallback(
    (event) => {
      console.log("You clicked ", event.currentTarget);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state],
  );
  const statehanddler = () => {
    setState(!state);
  };
  return (
    <>
      <button onClick={statehanddler}>Change State Of Parent Component</button>
      <MyList handler={handler} />
    </>
  );
}

function MyList({ handler }) {
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  React.useEffect(() => {
    console.log("Child Component redered");
  }, []);

  return (
    <>
      {items.map((item, index) => {
        return (
          <div key={index} onClick={handler}>
            {item}
          </div>
        );
      })}
    </>
  );
}

