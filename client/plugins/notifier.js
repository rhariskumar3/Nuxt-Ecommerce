export default ({ app, store }, inject) => {
  inject('notifier', {
    success(text) {
      app.$toast.success(text)
    },
    error(text) {
      app.$toast.error(text)
    },
    info(text) {
      app.$toast.info(text)
    },
    show(text) {
      app.$toast.show(text)
    },
  })
}
