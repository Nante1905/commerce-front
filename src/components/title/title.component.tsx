import "./title.component.scss";

const Title = (props: any) => {
  return (
    <div className="title-container">
      {" "}
      <div className="title-text">
        {props.text}
        <div className="border"></div>
      </div>
    </div>
  );
};

export default Title;
