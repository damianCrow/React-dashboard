function* toastSaga() {

  const MaxToasts = 3;
  const ToastDisplayTime = 4000;

  let pendingToasts = [];
  let activeToasts = [];

  function* displayToast(toast) {
    if ( activeToasts >= MaxToasts ) {
      throw new Error("can't display more than " + MaxToasts + " at the same time");
    }
    activeToasts = [...activeToasts,toast];
    yield put(events.toastDisplayed(toast));
    yield call(delay,ToastDisplayTime);
    yield put(events.toastHidden(toast));
    activeToasts = _.without(activeToasts,toast);
  }

  function* toastRequestsWatcher() {
    const event = yield take(Names.TOAST_DISPLAY_REQUESTED);
    const newToast = event.data.toastData;
    pendingToasts = [...pendingToasts,newToast];
  }

  function* toastScheduler() {
    const [firstToast,...remainingToasts] = pendingToasts;
    pendingToasts = remainingToasts;
    yield fork(displayToast,firstToast);
    // Add little delay so that 2 concurrent 2 toast requests aren't display at the same time
    yield call(delay,300);
  }

  yield [
    call(toastRequestsWatcher),
    call(toastScheduler)
  ]
}
