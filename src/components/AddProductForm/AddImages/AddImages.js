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
        const response = await axios.post('http://localhost:5000/api/products/images', formData, {
            header: {
                'content-type': 'multipart/form-data'
            }
        });
        if (response) {
            let responseData = [...this.state.images];
            responseData.push(response.data);
            this.setState({
                images: responseData
            });
            // console.log(this.state.images);
        }
    }

    removeImage = async index => {
        let result = [...this.state.images];
        result.splice(index, 1);
        await this.setState({
            images: result
        })
        console.log(this.state.images);
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