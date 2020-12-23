export default {
  registerCoach(state, newCoachData) {
    state.coaches.push(newCoachData);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
