const getQueryParams = (url) => {
  let qParams = {};
  // create a binding tag to use a property called search
  let anchor = document.createElement('a');
  // assign the href URL of the anchor tag
  anchor.href = url;
  // search property returns URL query string
  let qStrings = anchor.search.substring(1);
  let params = qStrings.split('&');
  for (let i = 0; i < params.length; i++) {
    let pair = params[i].split('=');
      qParams[pair[0]] = decodeURIComponent(pair[1]);
    }
    return qParams;
};
let params = getQueryParams(location.href);
let viewer = document.getElementById('viewer');
viewer.src = 'glb/' + params.glb + '.glb';

// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
  } else {
    progressBar.classList.remove('hide');
    if (event.detail.totalProgress === 0) {
      event.target.querySelector('.center-pre-prompt').classList.add('hide');
    }
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);