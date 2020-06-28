export default function ({ store, redirect, route }) {
  if (route.name === 'admin' && store.state.auth) redirect('/admin/dashboard')
  if (isAdminRoute(route)) {
    if (!store.state.auth) {
      redirect('/admin')
    } else return ''
  } else if (isUserRouters(route)) {
    if (!store.state.user) {
      redirect('/account')
    } else return ''
  } else return ''
}

// eslint-disable-next-line no-unused-vars
function isAdminRoute(route) {
  if (route.matched.some((record) => record.path.includes('admin/')))
    return true
}

// eslint-disable-next-line no-unused-vars
function isUserRouters(route) {
  const userRoutes = ['/account', '/cart']
  if (route.matched.some((record) => userRoutes.includes(record.path)))
    return true
}
