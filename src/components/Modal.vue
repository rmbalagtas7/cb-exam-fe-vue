<template>
  <div v-if="showModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div class="bg-white p-5 rounded w-72 relative">
      <h2 class="text-lg font-bold mb-4">{{ mode === 'add' ? 'Add Product' : 'Delete Product' }}</h2>
      <form v-if="mode === 'add'" @submit.prevent="saveProduct">
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
          <button type="button" @click="closeModal"
            class="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300">Cancel</button>
        </div>
      </form>

      <!-- Delete Mode -->
      <div v-if="mode === 'delete'">
        <p class="mb-4">Are you sure you want to delete this product: <strong>{{ productName }}</strong>?</p>
        <div class="flex justify-end gap-2">
          <button @click="confirmDelete"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300">
            Yes, Delete
          </button>
          <button @click="closeModal"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition duration-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { addNewProduct, deleteProductById } from '../services/ApiServices';
import Alert from './Alert.vue';

const products = ref([]);
const showAlert = ref(false);
const alertMessage = ref('');

const newProduct = ref({
  type: '',
  name: '',
  price: ''
});

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    default: ''
  },
  productId: {
    type: String,
    default: ''
  }
});

async function saveProduct() {
  const response = await addNewProduct(newProduct.value);
  products.value.push(response);
  console.log('Adding product:', newProduct.value);
  // Add logic to add the product
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

async function confirmDelete() {
    try {
        const response = await deleteProductById(props.productId);
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

function closeModal() {
  console.log(props.showModal);

}

</script>