export default {
  async contactCoach(context, formData) {
    const { coachId, email, message } = formData;
    const id = new Date().toISOString();
    const newRequest = {
      id,
      coachId,
      message,
      userEmail: email
    };

    try {
      const response = await fetch(
        `https://vue-http-demo-ab86b.firebaseio.com/requests.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest)
        }
      );
      return response;
      // context.commit('addRequest', newRequest);
    } catch (error) {
      throw new Error(error);
    }
  },
  async loadRequests(context) {
    const userId = context.rootGetters.userId;

    try {
      const requests = await fetch(
        `https://vue-http-demo-ab86b.firebaseio.com/requests.json`
      );
      const requestsData = await requests.json();
      console.log(Object.values(requestsData));
      const receivedRequests = Object.values(requestsData).filter(
        request => request.coachId === userId
      );
      context.commit('setRequests', receivedRequests);
    } catch (error) {
      throw new Error(error);
    }
  }
};
