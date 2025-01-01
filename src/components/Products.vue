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

        <div v-if="Object.keys(product).length > 0" class="relative border border-gray-300 rounded p-5 mt-5">
            <button @click="product = {}" class="absolute top-0 right-0 mt-2 mr-2 text-red-800">X</button>
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
                    <th class="px-2 py-2 bg-gray-200 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id" class="even:bg-gray-100">
                    <td class="px-2 py-1">{{ product.type }}</td>
                    <td class="px-2 py-1">{{ product.name }}</td>
                    <td class="px-2 py-1">{{ product.id }}</td>
                    <td class="px-2 py-1">{{ product.price }}</td>
                    <td class="px-2 py-1">
                        <button @click="deleteProduct(product)"
                            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300">
                            Delete
                        </button>
                    </td>
                </tr>
                <tr v-if="products.length === 0">
                    <td colspan="5" class="text-center">No records</td>
                </tr>
            </tbody>
        </table>
        <Alert :visible="showAlert" :message="alertMessage" />


        <!-- modal component -->
        <Modal :showModal="showModal" :mode="type" :productName="productName" :productId="productId" />

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAllProducts, getProductById } from '../services/ApiServices';
import Alert from './Alert.vue';
import Modal from './Modal.vue';


const products = ref([]);
const product = ref({});
const id = ref('');
const showModal = ref(false);
const type = ref('');
const showAlert = ref(false);
const alertMessage = ref('');
const productName = ref('');
const productId = ref('');


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
    console.log("test", showModal.value);
    showModal.value = true;
    type.value = 'add';
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

function deleteProduct(product) {
    try {
        showModal.value = true;
        type.value = 'delete';
        productName.value = product.name;
        productId.value = product.id;
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

function ProductType() {
    // Add logic to filter products by type
}
</script>
