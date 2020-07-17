export const state = () => ({
  snackbars: [],
})

export const mutations = {
  showMessage(state, snackbar) {
    snackbar.showing = true
    snackbar.color = snackbar.color || 'success'
    snackbar.timeout = snackbar.timeout || 2000
    state.snackbars = state.snackbars.concat(snackbar)
  },
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    commit('showMessage', snackbar)
  },
}
