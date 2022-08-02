export function headerHeight() {
  let headerHeight = 0;
  const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (entry.contentBoxSize) {
        headerHeight = entry.contentBoxSize[0].blockSize;
        main.style.marginTop = `${headerHeight}px`;
      }
    }
  });

  const main = document.querySelector('main');
  resizeObserver.observe(document.querySelector('.header'));
}

