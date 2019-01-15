let scrollY = '';
export function toggleFixedBody() {
  if (typeof window === 'object') {
    const scrollElement = document.body;
    if (scrollElement.style.position === 'fixed') {
      scrollElement.style.position = 'initial';
      scrollElement.style.overflowY = 'scroll';
      window.scrollTo(0, scrollY);
    } else {
      scrollY = window.scrollY;
      scrollElement.style.position = 'fixed';
      scrollElement.style.top = `-${scrollY}px`;
      scrollElement.style.overflowY = 'hidden';
      scrollElement.style.width = '100%';
    }
  }
}
