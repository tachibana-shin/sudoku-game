export default {
  state: {
    taskNow: null
  },
  mutations: {
    setPlaygroundChallengesTaskNow: (state, date) => state.taskNow = date
  }
};