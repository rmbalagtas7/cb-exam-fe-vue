import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    }

});

export const getAllProducts = async () => {
    try {
        const response = await apiClient.get('/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export const getProductById = async (id) => {
    try {
        const response = await apiClient.get(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export const addNewProduct = async (product) => {
    try {
        const response = await apiClient.post('/product', product);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

export const deleteProductById = async (id) => {
    try {
        const response = await apiClient.delete(`/product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
 
}