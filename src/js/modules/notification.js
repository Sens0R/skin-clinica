export function notification() {
  const notification = document.querySelector('[data-notification]');
  if (notification) {
    const closeNotificationBtn = document.querySelector(
      '[data-close-notification-btn]'
    );
    
    notification.style.maxHeight = notification.scrollHeight + 'px';
  
    closeNotificationBtn.addEventListener('click', () => {
      notification.classList.add('closed');
      notification.style.maxHeight = 0 + 'px';
  
    }, {once: true});
  }
}
