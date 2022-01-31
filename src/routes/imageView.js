import {Link, useLocation} from 'react-router-dom';


export default function ImageView(props) {
    const imgUrl = useLocation().state.imgUrl;
    return (
      <div>
        <h2><Link to="/">back</Link></h2>
        <img src={imgUrl} alt="" />
      </div>
    );
  }