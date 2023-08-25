import React, { Component } from 'react'


export default class Spinner extends Component {
  render() {
    return (
      <div className=' my-3 text-center'>
        <img src="/images/loadingSpinner.gif" alt="loading" />
      </div>
    )
  }
}
