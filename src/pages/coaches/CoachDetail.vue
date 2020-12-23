<template>
  <div>
    <base-dialog
      :show="!!error"
      title="뭔가 잘못되었나봐요"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section v-if="!isLoading">
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view> </router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      isLoading: false,
      error: null,
      selectedCoach: {
        firstName: '',
        lastName: '',
        hourlyRate: null,
        areas: [],
        description: '',
      },
    };
  },
  computed: {
    fullName() {
      console.log(this.selectedCoach);
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    contactLink() {
      return {
        name: 'contactCoach',
        params: {
          id: this.id,
        },
      };
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  methods: {
    async getCoach() {
      this.isLoading = true;

      try {
        this.selectedCoach = await this.$store.dispatch(
          'coaches/getCoach',
          this.id
        );
      } catch (error) {
        this.error = error.message;
      }
      this.isLoading = false;
    },
    // async loadCoaches() {
    //   this.isLoading = true;
    //   try {
    //     await this.$store.dispatch('coaches/loadCoaches');
    //   } catch (error) {
    //     console.log(error.message);
    //     this.error = error.message || 'Something went wrong!';
    //   }
    //   this.isLoading = false;
    // },
    handleError() {
      this.error = null;
    },
  },
  created() {
    this.getCoach();
    // this.loadCoaches();
    // this.selectedCoach = this.$store.getters['coaches/coaches'].find(
    //   coach => coach.id === this.id
    // );
  },
  mounted() {
    // console.log(this.$store.getters['coaches/coaches']);
    // console.log(this.selectedCoach);
    // console.log(this.$route.path);
  },
};
</script>
