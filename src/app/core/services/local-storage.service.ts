class LocalStorageService {
  get(path) {
    try {
      return JSON.parse(localStorage.getItem(path));
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  save(path, data) {
    try {
      localStorage.setItem(path, JSON.stringify(data));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  remove(path) {
    try {
      localStorage.removeItem(path);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

export default LocalStorageService;
