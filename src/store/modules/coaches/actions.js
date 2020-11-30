export default {
  registerCoach(context, data) {
    // const newCoachId = `c${context.getters.coaches.length + 1}`;
    const newCoachId = context.rootGetters.userId;
    console.log(newCoachId);
    const formData = { ...data };
    const newCoachData = {
      id: newCoachId,
      firstName: formData.first,
      lastName: formData.last,
      areas: formData.areas,
      description: formData.desc,
      hourlyRate: formData.rate
    };
    context.commit('registerCoach', newCoachData);
  }
};
