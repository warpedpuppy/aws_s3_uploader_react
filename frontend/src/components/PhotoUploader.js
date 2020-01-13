import React from 'react';
import './PhotoUploader.css';
import UploadService from '../services/uploader-service';

export default class PhotoUploader extends React.Component {

    constructor(props){
        super(props)
        this.img = new Image();
        this.img.onload = this.imgLoadHandler;
        this.imgValue = '';
        this.file = null;
        this.requiredSize = {width: 640, height: 480}
        this.state = {
            photoSizeCheck: false,
            photoMessage: `images must be ${this.requiredSize.width}x${this.requiredSize.height}`
        }
    }
    
    imgLoadHandler = () => {
            URL.revokeObjectURL(this.file)
            if (this.img.width === this.requiredSize.width && this.img.height === this.requiredSize.height) {
                this.setState({
                    photoMessage: "correct size",
                    photoSizeCheck: true
                })
                let str = this.imgValue;
                document.getElementById('loader-label').innerHTML = str.substring(str.lastIndexOf(`\\`) + 1);
            } else {
                this.setState({
                    photoMessage: `wrong size -- must be ${this.requiredSize.width}x${this.requiredSize.height}`,
                    photoSizeCheck: false
                })
                document.getElementById('event_image').value = null;
                document.getElementById('loader-label').innerHTML = "upload a new image";
            }
    }


    onSubmitHandler = (e) => {

        e.preventDefault();
        this.setState({showSpinners: true})
        if (!this.state.photoSizeCheck) return;

        UploadService.initUpload('event_image', this.photoLoadComplete.bind(this))
    }


    photoLoadComplete = (obj) => {
        this.setState({photoMessage: "photo uploaded", photoSizeCheck: true, showSpinners: false})
    }
    

    onChangeHandler = (e) => {
            const { files } = document.getElementById('event_image');
            this.file = files[0];
            var url = URL.createObjectURL(this.file);
            this.img.src = url;
            this.imgValue = e.currentTarget.value;
    }

    render() {
        let spinnerClass = (!this.state.showSpinners) ? 'hide' : 'show';
        let photoMessageClass = (this.state.photoSizeCheck)? 'photo-message-success' : 'photo-message-error';
        return (
            <div>

                <div className="enter-event">
                    <div className="module-body">
                       
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" name="event_image" id="event_image"
                                    onChange={
                                        this.onChangeHandler
                                    }
                                    accept=".jpg, .png, .gif, .jpeg"/>
                                <label className="custom-file-label" id="loader-label" htmlFor="event_image">upload a new image 640x480
                                </label>
                                <div className={photoMessageClass}>{this.state.photoMessage}</div>
                            </div>
                            <div>
                                <button type="submit">submit</button>
                            </div>
                        </form>
                        <img src="" id="preview" />
                    </div>
                </div>
            </div>
        );
    }
}

