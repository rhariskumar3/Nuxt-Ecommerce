export default function({ store, redirect, route }) {
  // if (isAdminRoute(route)) {
  //   if (
  //     store.state.user &&
  //     store.state.ADMINS.includes(store.state.user.email)
  //   ) {
  //     return ''
  //   } else redirect('/admin/account/signin')
  // } else if (isUserRouters(route)) {
  //   if (store.state.user) {
  //     return ''
  //   } else redirect('/account/signin')
  // } else return ''
}

// eslint-disable-next-line no-unused-vars
function isAdminRoute(route) {
  if (route.matched.some((record) => record.path.includes('admin'))) return true
}

// eslint-disable-next-line no-unused-vars
function isUserRouters(route) {
  const userRoutes = ['/account', '/cart']
  if (route.matched.some((record) => userRoutes.includes(record.path)))
    return true
}
