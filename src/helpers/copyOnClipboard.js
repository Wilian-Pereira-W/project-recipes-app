export default function copyOnClipboard(dependencies) {
  const { setClipboard, setShare } = dependencies;
  const { href } = window.location;
  if (href.includes('in-progress')) {
    const link = href.split('/in-progress');
    setClipboard(link[0]);
  } else {
    setClipboard(href);
  }

  setShare(true);
}
