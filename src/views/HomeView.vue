<template>
  <div>
    <h1 class="text-3xl font-bold text-center my-6">Performance Review System</h1>

    <!-- Tombol Add Data -->
    <div class="text-center my-4" v-if="!isEditing">
      <button
        @click="addNewReview"
        class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Data
      </button>
    </div>

    <!-- Form untuk Create atau Edit Review -->
    <ReviewForm
      v-if="isEditing"
      :reviewData="editingReview"
      @formSubmitted="refreshData"
    />

    <!-- List untuk menampilkan semua review -->
    <ReviewList
      v-else
      :reviews="reviews"
      @editReview="editReview"
      @deleteReview="deleteReview"
      @generatePDF="generatePDF"
    />
  </div>
</template>

<script>
import ReviewForm from '../components/ReviewForm.vue';
import ReviewList from '../components/ReviewList.vue';
import { getAllReviews, deleteReview, getPDF } from '../services/reviewService';

export default {
  components: { ReviewForm, ReviewList },

  data() {
    return {
      reviews: [],
      isEditing: false,
      editingReview: null,
    };
  },

  methods: {
    async refreshData() {
      try {
        const response = await getAllReviews();
        this.reviews = response.data;
        this.isEditing = false;
        this.editingReview = null;
      } catch (error) {
        console.error(error);
        alert('Failed to fetch reviews.');
      }
    },

    addNewReview() {
      this.isEditing = true;
      this.editingReview = null;
    },

    editReview(review) {
      this.editingReview = review;
      this.isEditing = true;
    },

    async deleteReview(id) {
      try {
        await deleteReview(id);
        this.refreshData();
      } catch (error) {
        console.error(error);
        alert('Failed to delete review.');
      }
    },

    async generatePDF(id) {
      try {
        const response = await getPDF(id);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `review-${id}.pdf`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error(error);
        alert('Failed to generate PDF.');
      }
    },
  },

  mounted() {
    this.refreshData();
  },
};
</script>
