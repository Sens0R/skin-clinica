export function notification() {
  const notification = document.querySelector('[data-notification]');
  if (notification) {
    const closeNotificationBtn = document.querySelector(
      '[data-close-notification-btn]'
    );

    notification.style.maxHeight = notification.scrollHeight + 'px';

    closeNotificationBtn.ariaLabel = 'Close notification';
    closeNotificationBtn.addEventListener(
      'click',
      () => {
        notification.classList.add('closed');
        notification.style.maxHeight = 0 + 'px';
        sessionStorage.setItem('notification', 'closed');
      },
      { once: true }
    );
    
    if (sessionStorage.getItem('notification')) closeNotificationBtn.click();
  }
}
