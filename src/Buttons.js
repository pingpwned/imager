import React from 'react';

export default class Buttons extends React.Component {
    
    render() {
        return (
            <div className="buttons">
                <button id="saveBtn" className="saveBtn" onClick={this.clickBtnSave} ref="saveBtn" download>Save
                </button>
                <button className="deleteBtn" onClick={this.clickBtnDel}>Delete</button>
                <button className="cancelBtn" onClick={this.clickBtnCan}>Cancel</button>
            </div>
        )
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
            saveBtn.href = url;
        }
    }

    clickBtnDel = () => {
        var isOk = window.confirm("Are you sure you want to delete all changes?");
        var res = document.getElementById("result");
        if (isOk && res) {
            res.remove();
            localStorage.clear();
            this.loadPlaceholderImage();
            this.child.setInitState();
            this.child.setDefaultRangePosition();
        }
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
            this.child.setInitState();
            this.child.setDefaultRangePosition();
        }
    }
}
