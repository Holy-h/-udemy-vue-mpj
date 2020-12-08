export default {
  async registerCoach(context, data) {
    // const newCoachId = `c${context.getters.coaches.length + 1}`;
    const userId = context.rootGetters.userId;
    const coachData = {
      id: userId,
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate
    };

    const response = await fetch(
      `https://vue-http-demo-ab86b.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error
    }

    context.commit('registerCoach', {
      ...coachData
    });
  },
  async loadCoaches(context) {
    try {
      const response = await fetch(
        `https://vue-http-demo-ab86b.firebaseio.com/coaches.json`
      );
      const responseData = await response.json();
      const coaches = Object.values(responseData);
      console.log(responseData);
      context.commit('setCoaches', coaches);
    } catch (error) {
      throw new Error(error || 'Failed to fetch!');
    }

    // if (!response.ok) {
    //   const error = new Error(responseData.message || 'Failed to fetch!');
    //   throw error;
    // }
  },
  async getCoach(_, coachId) {
    const response = await fetch(
      `https://vue-http-demo-ab86b.firebaseio.com/coaches/${coachId}.json`
    );
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  }
};
