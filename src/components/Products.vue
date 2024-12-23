<template>
    <div class="flex flex-col gap-2 m-5">
        <div class="flex gap-2">
            <button @click="fetchAllProducts"
                class="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">All
                Products</button>
            <button @click="ProductType"
                class="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">Product
                Type</button>
            <button @click="addProduct"
                class="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">Add
                Product</button>
        </div>

        <div class="flex gap-2 ml-auto">
            <input type="text" placeholder="Search Products" v-model="id"
                class="px-5 py-2 border border-gray-300 rounded">
            <button @click="searchProduct"
                class="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">Product
                Details</button>
        </div>

        <div v-if="Object.keys(product).length > 0">
            <h2 class="text-xl font-bold mb-2">Product details</h2>
            <ul class="list-none p-0 border border-gray-300 rounded w-72">
                <li class="px-5 py-2 border-b border-gray-300 flex justify-between"><strong>Type:</strong> {{
                    product.type }}</li>
                <li class="px-5 py-2 border-b border-gray-300 flex justify-between"><strong>Name:</strong> {{
                    product.name }}</li>
                <li class="px-5 py-2 border-b border-gray-300 flex justify-between"><strong>ID:</strong> {{ product.id
                    }}</li>
                <li class="px-5 py-2 flex justify-between"><strong>Price:</strong> {{ product.price }}</li>
            </ul>
        </div>

        <table class="border-collapse w-full mx-auto text-left">
            <thead>
                <tr>
                    <th class="px-2 py-1 bg-gray-200 text-left">Type</th>
                    <th class="px-2 py-1 bg-gray-200 text-left">Name</th>
                    <th class="px-2 py-1 bg-gray-200 text-left">ID</th>
                    <th class="px-2 py-1 bg-gray-200 text-left">Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id" class="even:bg-gray-100">
                    <td class="px-2 py-1">{{ product.type }}</td>
                    <td class="px-2 py-1">{{ product.name }}</td>
                    <td class="px-2 py-1">{{ product.id }}</td>
                    <td class="px-2 py-1">{{ product.price }}</td>
                </tr>
                <tr v-if="products.length === 0">
                    <td colspan="4" class="text-center">No records</td>
                </tr>
            </tbody>
        </table>
        <Alert :visible="showAlert" :message="alertMessage" />


        <div class="flex gap-2 ml-auto">
            <input type="text" placeholder="Product ID" v-model="id" class="px-5 py-2 border border-gray-300 rounded">
            <button @click="deleteProduct"
                class="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">Delete
                product</button>
        </div>

        <!-- modal component -->
        <div v-if="showModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div class="bg-white p-5 rounded w-72 relative">
                <h2>Add New Product</h2>
                <form @submit.prevent="saveProduct">
                    <div class="mb-4 flex flex-col">
                        <label for="type" class="mb-1 font-bold">Type:</label>
                        <input v-model="newProduct.type" type="text" id="type" required
                            class="px-5 py-2 border border-gray-300 rounded">
                    </div>

                    <div class="mb-4 flex flex-col">
                        <label for="name" class="mb-1 font-bold">Name:</label>
                        <input v-model="newProduct.name" type="text" id="name" required
                            class="px-5 py-2 border border-gray-300 rounded">
                    </div>

                    <div class="mb-4 flex flex-col">
                        <label for="price" class="mb-1 font-bold">Price:</label>
                        <input v-model="newProduct.price" type="number" id="price" required
                            class="px-5 py-2 border border-gray-300 rounded">
                    </div>

                    <div class="flex justify-end gap-2">
                        <button type="submit"
                            class="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">Save</button>
                        <button type="button" @click="showModal = false"
                            class="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300">Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAllProducts, addNewProduct, deleteProductById, getProductById } from '../services/ApiServices';
import Alert from './Alert.vue';
const products = ref([]);
const product = ref({});
const id = ref('');
const showModal = ref(false);
const showAlert = ref(false);
const alertMessage = ref('');


const newProduct = ref({
    type: '',
    name: '',
    price: ''
});

async function fetchAllProducts() {
    try {
        const response = await getAllProducts();
        products.value = response; // Adjust this line based on the actual structure of the response
        console.log(products.value);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function addProduct() {
    showModal.value = true;
}

async function saveProduct() {
    const response = await addNewProduct(newProduct.value);
    products.value.push(response);
    console.log('Adding product:', newProduct.value);
    // Add logic to add the product
    showModal.value = false;
    newProduct.value = {
        type: '',
        name: '',
        price: ''
    };

    showAlert.value = true;
    alertMessage.value = response.message;

    setTimeout(() => {
        showAlert.value = false;
    }, 3000);
}

async function searchProduct() {
    try {
        const response = await getProductById(id.value);
        product.value = response;
        if (response) {
            console.log(response);
        } else {
            console.log(response.data);
        }
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

async function deleteProduct() {
    try {
        const response = await deleteProductById(id.value);
        console.log(response);

        showAlert.value = true;
        alertMessage.value = response.message;

        setTimeout(() => {
            showAlert.value = false;
        }, 3000);
        // Add logic to delete the product
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

function ProductType() {
    // Add logic to filter products by type
}
</script>
