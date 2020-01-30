import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import DownloadIcon from './assets/download.svg';
import CancelIcon from './assets/back-arrow.svg';
import DeleteIcon from './assets/delete-button.svg';
export default class Controlls extends Component {

  constructor(props) {
    super(props);
    this.state = this.getInitState();
    this.concStyles.bind(this);
  }

  render() {
    return (
      <div className="section_wrap controlls">
          <div className="controll_wrap">
            <label htmlFor="brightness">Brightness</label>
            <input id="brightness" ref="brightness" type="range" min="0" max="200" 
            defaultValue={this.state.brightness} step="0.5" onChange={this.onChBrightness} />
          </div>

          <div className="controll_wrap">
            <label htmlFor="contrast">Contrast</label>
              <input id="contrast" ref="contrast" type="range" min="0" max="200" 
              defaultValue={this.state.contrast} step="0.5" onChange={this.onChContrast} />
          </div>

          <div className="controll_wrap">
            <label htmlFor="saturate">Saturate</label>
              <input id="saturate" ref="saturate" type="range" min="0" max="200" 
              defaultValue={this.state.saturate} step="0.1" onChange={this.onChSaturate} />
          </div>

          <div className="controll_wrap">
            <label htmlFor="grayscale">Grayscale</label>
              <input id="grayscale" ref="grayscale" type="range" min="0" max="100" 
              defaultValue={this.state.grayscale} step="0.1" onChange={this.onChGrayscale} />
          </div>

          <div className="controll_wrap">
            <label htmlFor="blur">Blur</label>
            <input id="blur" ref="blur" type="range" min="0" max="15" 
            defaultValue={this.state.blur} step="0.5" onChange={this.onChBlur} />
          </div>

          <div className="controll_wrap">
              <label htmlFor="hueRotate">Hue Rotate</label>
              <input id="hueRotate" ref="hueRotate" type="range" min="0" max="360" 
              defaultValue={this.state.hueRotate} step="1" onChange={this.onChHueRotate} />
          </div>

          <div className="controll_wrap">
              <label htmlFor="opacity">Opacity</label>
              <input id="opacity" ref="opacity" type="range" min="0" max="100" 
              defaultValue={this.state.opacity} step="1" onChange={this.onChOpacity} />
          </div>

          <div className="controll_wrap">
              <label htmlFor="invert">Invert</label>
              <input id="invert" ref="invert" type="range" min="0" max="100" 
              defaultValue={this.state.invert} step="1" onChange={this.onChInvert} />
          </div>

          <div className="controll_wrap">
              <label htmlFor="sepia">Sepia</label>
              <input id="sepia" ref="sepia" type="range" min="0" max="100" 
              defaultValue={this.state.sepia} step="0.1" onChange={this.onChSepia} />
          </div>
          <div className="controll_wrap">
              <label htmlFor="rotate">Rotate</label>
              <input id="rotate" ref="rotate" type="range" min="0" max="360" 
              defaultValue={this.state.rotate} step="1" onChange={this.onRotate} />
          </div>
          
          <div className="buttons">
                <a id="saveBtn" className="saveBtn" onClick={this.clickBtnSave} ref="saveBtn" download="imager-">
                  <img src={DownloadIcon} className="donwloadIcon icon" />
                </a>
                <button className="deleteBtn" onClick={this.clickBtnDel} >
                  <img src={DeleteIcon} className="deleteIcon icon" />
                </button>
                <button className="cancelBtn" onClick={this.clickBtnCan} >
                  <img src={CancelIcon} className="cancelIcon icon" />
                </button>
            </div>
      </div>
    )
  }

  loadPlaceholderImage = () => {
    this.props.parentMethod();
  }
  
  getInitState = () => {
    const vars = {
      filterStyle: "",
      brightness: "100",
      grayscale: "0",
      blur: "0",
      contrast: "100",
      invert: "0",
      opacity: "100",
      saturate: "100",
      sepia: "0",
      hueRotate: "0",
      rotate: "0"
    };
    return vars;
  }

  setInitState = () => {
    this.setState(this.getInitState());
  }

  componentDidMount() {
    if(localStorage.filterStyle) {
      this.setState({
        filterStyle: localStorage.filterStyle
      });
    }
    this.setRangePosition();
  }

  componentDidUpdate() {
    this.setStyles(this.state.filterStyle);
  }

  setStyles = (val) => {
    var cvs = document.getElementById("canvas");
    if(localStorage) {
      cvs.style.filter = val;
    }
  }

  setRangePosition = () => {
    var arr = Object.keys( this.getInitState() ); // arr of names
      for (var i = 0; i < arr.length; i++) {
        if( localStorage.getItem(arr[i]) ) {
          this.setState({
            [arr[i]]: localStorage.getItem([arr[i]])
          });
        } else if(arr[i] === "hueRotate") {
            this.setState({
              hueRotate: localStorage.getItem("hue-rotate")
            });
        }
      }
  }
setDefaultRangePosition = () => {
  var keys = Object.keys( this.getInitState() ); // arr of names
  var values = Object.values( this.getInitState() ); // arr of names
  Object.keys(this.refs)
    .forEach(key => {
      for (var i = 0; i < keys.length; i++) {
        if(keys[i] === key) {
          ReactDOM.findDOMNode(this.refs[key]).value = values[i];
        }
      }
      });
}
rotateImg = (cvs, value) => {
  console.log(cvs, value); 
}
  concStyles = (value, reference) => {
    var cvs         = document.getElementById("canvas"),
        ctx         = cvs.getContext('2d'),
        filters   = ctx.filter || "",
        filterArr = filters.split(" "),
        filterStyle = [],
        delIndex    = filterArr.indexOf("none");
    if (delIndex !== -1)
      filterArr.splice(delIndex, 1);
    if (filterArr.length === 0) { // no styles
      ctx.filter = value;
      filterStyle.push(value);
      filterStyle = filterStyle.join(" ");
    } else if ( filterArr.findIndex(item => item.includes(reference)) > -1 ) {
      var index = filterArr.findIndex(item => item.includes(reference));
      filterArr[index] = value;
      filterStyle = filterArr.join(" "); // @param string
      ctx.filter = filterStyle;
    } else {
      filterArr.push(value);
      filterStyle = filterArr.join(" "); // @param string
      ctx.filter = filterStyle;
    }
    if (reference === "rotate") {
      ctx.rotate(parseInt(value) * (Math.PI / 180));
    }
    if (reference === "hue-rotate") {
      this.setState({
        hueRotate: value.match(/\d+(\.\d+)?/)[0]
      });
    } else {
      this.setState({
        [reference]: value.match(/\d+(\.\d+)?/)[0]
      });
    }
    this.setState({
      filterStyle: filterStyle
    });
    localStorage.setItem(reference, value.match(/\d+(\.\d+)?/)[0]);
    localStorage.setItem("filterStyle", filterStyle);
  }

  onChBrightness = (e) => {
    this.concStyles("brightness("+this.refs.brightness.value+"%)", "brightness");
  }
  onChGrayscale = (e) => {
    this.concStyles("grayscale("+this.refs.grayscale.value+"%)", "grayscale");
  }
  onChBlur = (e) => {
    this.concStyles("blur("+this.refs.blur.value+"px)", "blur");
  }
  onChContrast = (e) => {
    this.concStyles("contrast("+this.refs.contrast.value+"%)", "contrast");
  }
  onChInvert = (e) => {
    this.concStyles("invert("+this.refs.invert.value+"%)", "invert");
  }
  onChOpacity = (e) => {
    this.concStyles("opacity("+this.refs.opacity.value+"%)", "opacity");
  }
  onChSaturate = (e) => {
    this.concStyles("saturate("+this.refs.saturate.value+"%)", "saturate");
  }
  onChSepia = (e) => {
    this.concStyles("sepia("+this.refs.sepia.value+"%)", "sepia");
  }
  onChHueRotate = (e) => {
    this.concStyles("hue-rotate("+this.refs.hueRotate.value+"deg)", "hue-rotate");
  }
  onRotate = (e) => {
    this.concStyles(this.refs.rotate.value, "rotate");
  }

  /* SAVE, CANCEL, DELETE */

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
  clickBtnSave = (e) => {
    var saveBtn = document.getElementById("saveBtn");
    var canvas = document.getElementById("canvas");
    var canvas2 = document.getElementById("result");
    if(canvas && canvas2) {
      var ctx2 = canvas2.getContext("2d");
      canvas2.setAttribute("width", canvas.width);
      canvas2.setAttribute("height", canvas.height)
      ctx2.filter = localStorage.filterStyle;
      ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height);
      var data = canvas2.toDataURL("image/jpeg", 1.0);
      var blob = this.dataURItoBlob(data);
      var url = window.URL.createObjectURL(blob);
      saveBtn.download += this.state.imgName;
      saveBtn.href = url;
    }
  }
  clickBtnDel = () => {
    var isOk = window.confirm("Are you sure you want to delete all changes?");
    var res = document.getElementById("result");
    if (isOk && res) {
      localStorage.clear();
      this.loadPlaceholderImage();
      this.setInitState();
      this.setDefaultRangePosition();
    }
    this.props.clearState()
  }

  clickBtnCan = () => {
    var isOk = window.confirm("Are you sure you want to delete all changes?");
    if (isOk) {
      var myItem = localStorage.getItem("data");
      localStorage.clear();
      localStorage.setItem("data", myItem);
      var canvas = document.getElementById("canvas");
      var result = document.getElementById("result");
      if(canvas && result) {
        const cContext = canvas.getContext('2d');
        const rContext = result.getContext('2d');
        rContext.clearRect(0, 0, canvas.width, canvas.height);
        cContext.filter = "none";
      }
      this.setInitState();
      this.setDefaultRangePosition();
    }
  }
}
