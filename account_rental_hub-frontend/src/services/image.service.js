import axios from 'axios';

const API_URL = "http://localhost:8080/api/uploadImage"

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if(response.data != null) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            console.error('Error uploading image:', error.response.status, error.response.data);
            return null;
        } else {
            console.error('Error uploading image:', error.message);
        }
    }
};


const ImageService = {
    uploadImage
}

export default ImageService;