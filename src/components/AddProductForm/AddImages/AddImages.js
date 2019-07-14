import React, { Component } from 'react'
import Buttons from './Buttons'
import axios from 'axios';

class AddImages extends Component {

    state = {
        // uploading: false,
        images: []
    }

    onChange = async e => {
        const files = Array.from(e.target.files);
        e.target.value = null; // this is a BIG TRICK, reset the input file type to null
        const formData = new FormData();
        formData.append('productImage', files[0]);
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/products/images', formData, {
            headers: {
                'content-type': 'multipart/form-data',
                'x-auth-token': token
            }
        });
        if (response) {
            let responseData = [...this.state.images];
            const imgPath = response.data;
            responseData.push(imgPath);
            this.setState({
                images: responseData
            });
        }
    }

    removeImage = async (index, imgPath) => {
        const response = await axios.delete('http://localhost:5000/api/products/images', {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                imgPath: imgPath
            }
        });
        if (response) {
            let result = [...this.state.images];
            result.splice(index, 1);
            this.setState({
                images: result
            });
        }
    }

    render() {
        const { images } = this.state;

        return (
            <div className='buttons'>
                <Buttons onChange={this.onChange} onDelete={this.removeImage} productImages={images} />
            </div>
        )
    }
}

export default AddImages;