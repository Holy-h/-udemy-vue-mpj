export default {
  requests(state) {
    return state.requests;
  },
  hasRequests(_, getters) {
    console.log(getters.requests);
    return getters.requests && getters.requests.length > 0;
  }
};
