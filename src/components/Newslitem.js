import React, { Component } from "react";

export default class Newslitem extends Component {
  render() {
    let { title, description, imageUrl, newsurl, author, date, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0'
            }}
          >
          <span
            className="badge rounded-pill bg-danger"
            
          >
            {source}
          </span>
          </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p class="card-text">
              <small className="text-body-secondary">
                <strong>
                  BY {!author ? "UNKNOWN" : author} ON{" "}
                  {new Date(date).toGMTString()}
                </strong>
              </small>
            </p>
            <a href={newsurl} target="_blanck" className="btn btn-sm btn-dark">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}
