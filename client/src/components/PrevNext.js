function PrevNext(props) {
  return (
    <>
      <div className="pages-next">
        {props.count > 1 && (
          <span
            className="btn btn-outline-success mx-1"
            onClick={() => {
              props.uppPagesCount(props.count - 1);
            }}
          >
            Prev
          </span>
        )}
      </div>
      <div className="pages-prev">
        {props.count < 10 && (
          <span
            className="btn btn-outline-success mx-1"
            onClick={() => {
              props.uppPagesCount(props.count + 1);
            }}
          >
            Next
          </span>
        )}
      </div>
    </>
  );
}

export default PrevNext;
