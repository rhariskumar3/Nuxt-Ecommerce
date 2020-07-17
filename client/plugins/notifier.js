export default ({ app, store }, inject) => {
  inject('notifier', {
    showMessage({ text = '', color = 'info' }) {
      store.commit('snackbar/showMessage', { text, color })
    },
  })
}
