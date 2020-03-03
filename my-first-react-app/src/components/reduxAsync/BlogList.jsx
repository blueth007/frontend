import React, { Component } from "react";
import { connect } from "react-redux";

import { getDataAsync } from "./action";

class BlogList extends Component {
  componentDidMount() {
    // getData().then(data=>{
    //     console.log(data.slice(90) );
    // });
    setTimeout(()=>this.props.getDataAsync(),5000)
  }
  render() {
    console.log(this.props);
    const { isLoading, bloglist } = this.props;
    return (
      <ul>
        {isLoading ? (
          bloglist.map(it => <BlogItem key={it.id} {...it} />)
        ) : (
            bloglist.length===1?<div>loading failed</div>:<div>Loading......</div>
        )}
      </ul>
    );
  }
}

function BlogItem({ title, body }) {
  return (
    <li>
      <h4>{title}</h4>
      <p>{body}</p>
    </li>
  );
}

const mapStateToProps = state => ({
  bloglist: state.reducerBlogList,
  isLoading: state.statusBlog.isLoading
});

export default connect(mapStateToProps, { getDataAsync })(BlogList);
