import HTMLReactParser from "html-react-parser";

// Function to render multiple items
export const arrayToHtml = (arr: unknown) => {
  const array = Array.isArray(arr) ? arr : [];

  return array.map((item, index) => (
    <div id={`Additional-${index}`} key={index}>
      {item?.html && HTMLReactParser(item.html)}
    </div>
  ));
};

// Function to render a single item by index
export const renderSingleItem = (arr: unknown, index: number) => {
  const array = Array.isArray(arr) ? arr : [];

  // Check if the index is valid
  if (index < 0 || index >= array.length) {
    return <div>Error: Invalid index</div>;
  }

  const item = array[index];

  return (
    <div id={`Additional-${index}`} key={index}>
      {item?.html && HTMLReactParser(item.html)}
    </div>
  );
};
