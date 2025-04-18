export const Curtain = ({ hidden = false }) => {
  // check if
  //  dependencies are loaded
  //    image is loaded
  return (
    hidden && (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
        id="Curtain"
        style={{
          zIndex: 1001,
        }}
      ></div>
    )
  );
};
