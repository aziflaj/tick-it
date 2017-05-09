export function showLoading() {
  const loading = document.getElementById('loading');
  loading.style.display = 'block';
}

export function hideLoading() {
  const loading = document.getElementById('loading');
  loading.style.display = 'none';
}

export function updateObject(object1, object2) {
  const keys = Object.keys(object2);
  for (let key of keys) {
    object1[key] = object2[key];
  }

  return object1;
}
