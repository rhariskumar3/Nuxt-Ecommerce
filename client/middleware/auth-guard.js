export default function ({ $auth, route, redirect, $notifier }) {
  if (!$auth.loggedIn) {
    const REDIRECT_URL = '/auth?redirect=' + route.path
    redirect(REDIRECT_URL)
    $notifier.error('You must be logged in to view that page.')
  }
}
