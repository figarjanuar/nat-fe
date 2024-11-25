<template>
  <div class="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
    <h2 class="text-2xl font-semibold mb-4">{{ isEditMode ? 'Edit Review' : 'Create Review' }}</h2>
      <div class="mb-4">
        <label class="block font-medium">Employee Name</label>
        <input
          v-model="review.employeeName"
          type="text"
          class="w-full px-4 py-2 border rounded-lg"
          placeholder="Employee Name"
          :class="{ 'border-red-500': errors.employeeName }"
        />
        <p v-if="errors.employeeName" class="text-red-500 text-sm mt-1">{{ errors.employeeName }}</p>
      </div>

      <div class="mb-4">
        <label class="block font-medium">Position</label>
        <input
          v-model="review.position"
          type="text"
          class="w-full px-4 py-2 border rounded-lg"
          placeholder="Position"
          :class="{ 'border-red-500': errors.position }"
          required
        />
        <p v-if="errors.position" class="text-red-500 text-sm mt-1">{{ errors.position }}</p>
      </div>

      <div v-for="(criterion, index) in review.criteria" :key="index" class="mb-4">
        <div class="flex space-x-2">
          <input
            v-model="criterion.name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg"
            placeholder="Criterion Name"
            required
          />
          <input
            v-model.number="criterion.score"
            type="number"
            min="1"
            max="5"
            class="w-20 px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <textarea
          v-model="criterion.feedback"
          class="w-full px-4 py-2 mt-2 border rounded-lg"
          placeholder="Feedback"
        ></textarea>
        <button
          type="button"
          @click="removeCriterion(index)"
          class="mt-2 text-red-500 hover:text-red-700"
        >
          Remove Criterion
        </button>
      </div>

      <button
        type="button"
        @click="addCriterion"
        class="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Criterion
      </button>

      <div class="mt-4">
        <label class="block font-medium">General Feedback</label>
        <textarea
          v-model="review.generalFeedback"
          class="w-full px-4 py-2 mt-2 border rounded-lg"
          placeholder="General Feedback"
        ></textarea>
      </div>

      <div class="flex justify-between items-center mt-6">
        <button
          type="button"
          @click="goBack"
          class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Back
        </button>
        <button
          :disabled="isLoading"
          @click="submitForm"
          type="submit"
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {{ isLoading ? 'Submitting...' : isEditMode ? 'Update' : 'Create' }}
        </button>
      </div>
  </div>
</template>

<script>
import { createReview, updateReview } from '../services/reviewService';

export default {
  props: {
    reviewData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      review: this.reviewData || {
        employeeName: '',
        position: '',
        criteria: [{ name: '', score: 1, feedback: '' }],
        generalFeedback: '',
      },
      errors: {
        employeeName: null,
        position: null,
      },
      isEditMode: !!this.reviewData,
      isLoading: false,
    };
  },
  methods: {
    addCriterion() {
      this.review.criteria.push({ name: '', score: 1, feedback: '' });
    },
    removeCriterion(index) {
      this.review.criteria.splice(index, 1);
    },
    validateForm() {
      this.errors.employeeName = this.review.employeeName ? null : 'Employee Name is required.';
      this.errors.position = this.review.position ? null : 'Position is required.';
      return !this.errors.employeeName && !this.errors.position;
    },
    async submitForm() {
      if (!this.validateForm()) {
        alert('Please correct the errors in the form.');
        return;
      }

      try {
        this.isLoading = true;
        if (this.isEditMode) {
          await updateReview(this.reviewData.id, this.review);
          alert('Review updated successfully!');
        } else {
          await createReview(this.review);
          alert('Review created successfully!');
        }
        this.$emit('formSubmitted');
      } catch (error) {
        console.error(error);
        alert('Failed to save review.');
      } finally {
        this.isLoading = false;
      }
    },
    goBack() {
      this.$emit('formSubmitted');
    },
  },
};
</script>
