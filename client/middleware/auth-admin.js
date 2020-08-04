export default function ({ $auth, redirect, $notifier }) {
  const user = $auth.user
  if (user && user.admin) {
    // let the user in
  } else {
    redirect('/')
    $notifier.error('You must be an admin to view that page.')
  }
}
