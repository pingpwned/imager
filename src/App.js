import React, { Component } from 'react';

import Controlls from './Controlls';
import Dragzone from './Dragzone';

export default class App extends Component {
    state = {
      imgSrc: "",
      imgName: "",
      imgLoaded: false
    };
  render() {
    return (
      <div className="main__container">
        <div id="upload_zone">
          <input id="file" ref="file" type="file" onChange={this._onChange}/>
          <div className="dragAndDrop">
          </div>
        </div>
        <section className="controls_dragzone container main">
          <Dragzone upload={this._onChange} imgLoaded={this.state.imgLoaded}/>
          <Controlls ref={instance => { this.child = instance; }} parentMethod={this.loadPlaceholderImage} clearState={this.clearState} />
        </section>
        <footer>Made by <a href="//pingpwned.xyz">pingpwned.xyz</a></footer>
      </div>
    );
  }

  componentDidMount() {
    if (!localStorage.imgName) {
      this.loadPlaceholderImage();
    } else if (localStorage.imgName === null || localStorage.imgName === "") {
      localStorage.clear();
      this.loadPlaceholderImage();
    } else {
      this.loadImage();
    }
  }

  loadPlaceholderImage = () => {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = require("./assets/photo.png");
    img.onload = function(){
      canvas.setAttribute("width", img.width);
      canvas.setAttribute("height", img.height);
        ctx.drawImage(img,0,0);
    }
  }

  loadImage = () => {
    const canvas  = document.getElementById('canvas');
    const img     = new Image();
    const data    = localStorage.getItem("data");
    const imgName    = localStorage.getItem("imgName");

    if (data && data !== "")
    {
      let ctx     = canvas.getContext('2d');
      img.onload = function()
      {
        // scale canvas to image
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
      img.src = localStorage.data;
    }
    this.setState({
      imgLoaded: true,
      imgSrc: localStorage.data,
      imgName
    })
  }

  _onChange = (e) => {
    if (e.target.files.length > 0) {
      var canvas = document.getElementById('canvas');
      var file = e.target.files[0];
      var imgName = e.target.files[0].name;
      localStorage.setItem("imgName", imgName);
      this.loadCanvas(canvas, file);
    }
  }

  loadCanvas = (canvas, file) => {
    var reader  = new FileReader();
    var ctx = canvas.getContext('2d');
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
          // scale canvas to image
          canvas.width = img.width;
          canvas.height = img.height;
          // draw image
          ctx.drawImage(img, 0, 0
              , canvas.width, canvas.height
          );
          // Get canvas data URL
          try{
            var data = canvas.toDataURL("image/jpeg", 0.7);
            localStorage.setItem("data", data);
            localStorage.setItem("test", "loadcanvas");
          }catch(e){
            console.warn(e);
          }
      }
      img.src = reader.result;
    }
    reader.readAsDataURL(file)
    this.setState({
      imgLoaded: true,
      imgSrc: localStorage.data,
      imgName: file.name
    })
    // this.setState({
    //   imgSrc: localStorage.data
    // });
  }

  dataURItoBlob = (dataURI) => {
    // convert base64 to raw binary data held in a string
       var byteString = atob(dataURI.split(',')[1]);

       // separate out the mime component
       var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

       // write the bytes of the string to an ArrayBuffer
       var ab = new ArrayBuffer(byteString.length);
       var ia = new Uint8Array(ab);
       for (var i = 0; i < byteString.length; i++) {
           ia[i] = byteString.charCodeAt(i);
       }

       // write the ArrayBuffer to a blob, and you're done
       var bb = new Blob([ab], {type: mimeString});
       return bb;
  }
  clearState = () => {
    this.setState({
      imgSrc: "",
      imgName: "",
      imgLoaded: false
    })
  }
}
