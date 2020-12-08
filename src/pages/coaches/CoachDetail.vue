<template>
  <section>
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
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null
    };
  },
  computed: {
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    contactLink() {
      return {
        name: 'contactCoach',
        params: {
          id: this.id
        }
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
    }
  },
  methods: {
    async getCoach() {
      try {
        this.selectedCoach = await this.$store.dispatch(
          'coaches/getCoach',
          this.id
        );
        console.log(this.selectedCoach);
      } catch (error) {
        alert(error);
      }
    },
    async loadCoaches() {
      this.isLoading = true;

      try {
        await this.$store.dispatch('coaches/loadCoaches');
      } catch (error) {
        console.log(error.message);
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    }
  },
  created() {
    this.loadCoaches();
  },
  mounted() {
    this.selectedCoach = this.$store.getters['coaches/coaches'].find(
      coach => coach.id === this.id
    );
    console.log(this.selectedCoach);
    console.log(this.$route.path);
  }
};
</script>
