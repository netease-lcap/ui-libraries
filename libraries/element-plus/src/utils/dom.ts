export function setElStyle(style: Record<string, any>, el: HTMLElement) {
  const exclude = [
    'zIndex', 'postion', 'left', 'right', 'top', 'bottom',
  ];

  Object.keys(style).forEach((key) => {
    if (exclude.includes(key)) {
      return;
    }

    el.style[key] = style[key];
  });
}
