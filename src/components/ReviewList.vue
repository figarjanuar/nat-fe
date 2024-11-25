<template>
  <div class="max-w-4xl mx-auto p-4">
    <h2 class="text-2xl font-semibold mb-4">All Reviews</h2>
    <table class="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr>
          <th class="px-4 py-2 border">ID</th>
          <th class="px-4 py-2 border">Name</th>
          <th class="px-4 py-2 border">Position</th>
          <th class="px-4 py-2 border">Score</th>
          <th class="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="review in reviews" :key="review.id">
          <td class="px-4 py-2 border">{{ review.id }}</td>
          <td class="px-4 py-2 border">{{ review.employeeName }}</td>
          <td class="px-4 py-2 border">{{ review.position }}</td>
          <td class="px-4 py-2 border">{{ review.totalScore }}</td>
          <td class="px-4 py-2 border">
            <button
              @click="$emit('editReview', review)"
              class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              @click="$emit('deleteReview', review.id)"
              class="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
            <button
              @click="$emit('generatePDF', review.id)"
              class="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Generate PDF
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
};
</script>
