import { Link, useLocation } from "react-router-dom";

export default function ImageView(props) {
  const imgUrl = useLocation().state.imgUrl;
  return (
    <div>
      <h1>
        <Link to="/">&#60;&#60; Back</Link>
      </h1>
      <img src={imgUrl} alt="" />
    </div>
  );
}
