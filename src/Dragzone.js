import React, { Component } from 'react';

export default class Dragzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgLoaded: false
    }
  }
  componentDidMount() {
    this.setState({
      imgLoaded: this.props.imgLoaded
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({imgLoaded: nextProps.imgLoaded})
  }
  render() {
    return (
      <div className="image_source dragzone"
        onDragOver={this.initDnD}
        onDrop={this.handleDrop.bind(this)}
        onDragLeave={this.handleDragLeave}
        onClick={this.dragzoneClick}>
        {!this.state.imgLoaded ? 
          <h3 className="help__text">Easy Drag & Drop</h3>
        : null}
        <canvas id="canvas" />
        <canvas id="result" />
      </div>
    )
  }

  initDnD = (e) => {
    e.preventDefault();
    e.currentTarget.children[0].classList.add("onDragOver");
  }

  handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.children[0].classList.remove("onDragOver");
    e.currentTarget.children[0].classList.remove("placeholder");
    e.currentTarget.children[0].classList.add("userImageUploaded");
    var o = {
      target: {
        files: [
          e.dataTransfer.files[0]
        ]
      }
    };
    this.props.upload(o);
  }

  dragzoneClick = (e) => {
    e.preventDefault();
    document.getElementById("file").click();
  }

  handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.children[0].classList.remove("onDragOver");
  }
}
