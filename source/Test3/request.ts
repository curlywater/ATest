export default function xhrRequest(url: string): Promise<any> {
  if (global.XMLHttpRequest) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (error) {
        reject(error);
      };
      xhr.send();
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 1000)
    })
  }
}
