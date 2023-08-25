import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, publishedAt, source } = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{display: 'flex', justifyContent: 'flex-end', position:'absolute', right:'0' }}>
            <span className="badge rounded-pill bg-danger" >{source}</span>
          </div>
          <img src={imageUrl ? imageUrl : "../../images/img_not_available.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(publishedAt).toUTCString()} </small></p>
            <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-primary">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}
