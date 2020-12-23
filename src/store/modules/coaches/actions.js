export default {
  async registerCoach(context, data) {
    // const newCoachId = `c${context.getters.coaches.length + 1}`;
    const userId = context.rootGetters.userId;
    const { firstName, lastName, description, hourlyRate, areas } = data;
    const coachData = {
      id: userId,
      firstName,
      lastName,
      description,
      hourlyRate,
      areas,
    };
    try {
      await fetch(
        `https://vue-http-demo-ab86b.firebaseio.com/coaches/${userId}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(coachData),
        }
      );
      context.commit('registerCoach', {
        ...coachData,
      });
    } catch (error) {
      alert(error);
    }

    // const responseData = await response.json();
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      console.log('caching');
      return;
    }

    try {
      const response = await fetch(
        `https://vue-http-demo-ab86b.firebaseio.com/coaches.json`
      );
      const responseData = await response.json();
      const coaches = Object.values(responseData);

      context.commit('setCoaches', coaches);
      context.commit('setFetchTimestamp');
    } catch (error) {
      throw new Error(error || 'Failed to fetch!');
    }
  },
  async getCoach(_, coachId) {
    const response = await fetch(
      `https://vue-http-demo-ab86b.firebaseio.com/coaches/${coachId}.json`
    );
    const responseData = await response.json();
    return responseData;
  },
};
