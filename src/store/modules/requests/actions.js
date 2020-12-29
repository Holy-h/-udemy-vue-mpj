export default {
  async contactCoach(context, formData) {
    const { coachId, email, message } = formData;

    const created = new Date().toISOString();
    const newRequest = {
      message,
      userEmail: email,
      created,
    };

    try {
      const response = await fetch(
        `https://vue-http-demo-ab86b.firebaseio.com/requests/${coachId}.json`,
        {
          method: 'POST',
          body: JSON.stringify(newRequest),
        }
      );
      const responseData = await response.json();

      newRequest.id = responseData.name;
      newRequest.coachId = coachId;
      context.commit('addRequest', newRequest);
    } catch (error) {
      throw new Error(error || 'Failed to send request.');
    }
  },
  async fetchRequests(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    console.log(token);
    try {
      const response = await fetch(
        `https://vue-http-demo-ab86b.firebaseio.com/requests/${userId}.json?auth=${token}`
      );
      const responseData = await response.json();

      if (!response.ok) {
        console.log(responseData);
        const error = new Error(
          responseData.error || '문의사항을 불러오지 못했습니다.'
        );
        throw error;
      }

      if (responseData) {
        const requests = Object.keys(responseData).map(id => {
          return {
            id,
            ...responseData[id],
          };
        });
        context.commit('setRequests', requests);
      }
    } catch (error) {
      throw new Error(error);
    }
  },
};
