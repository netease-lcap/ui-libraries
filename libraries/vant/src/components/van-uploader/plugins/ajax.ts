function getError(url: string, options: any, xhr: XMLHttpRequest) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `Fail to post ${url} ${xhr.status}`;
  }

  const err = new Error(msg) as any;
  err.status = xhr.status;
  err.method = 'post';
  err.url = url;
  return { err, errorMsg: xhr.response.error || xhr.response };
}

function getBody(xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response;
  if (!text) return text;

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export default function upload(options: any): XMLHttpRequest {
  if (typeof XMLHttpRequest === 'undefined') return null as any;

  const xhr = new XMLHttpRequest();
  const { url } = options;

  if (xhr.upload) {
    xhr.upload.onprogress = function onprogress(e) {
      if (e.total > 0) {
        (e as any).percent = (e.loaded / e.total) * 100;
      }
      options.onProgress(e);
    };
  }

  const formData = new FormData();

  if (options.data) {
    Object.keys(options.data).forEach((key) => {
      formData.append(key, options.data[key]);
    });
  }

  // const files = options.file.length ? Array.from(options.file) : [options.file];
  // files.forEach((file) => formData.append(options.name, file, file.name));
  // console.log(options)
  formData.append(options.name, options.file);

  xhr.onerror = function onerror(e) {
    options.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return options.onError(getError(url, options, xhr));
    }

    options.onSuccess(getBody(xhr));
  };

  xhr.onloadstart = function onloadstart() {
    options.onStart();
  };

  xhr.open('post', url, true);

  if (options.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = options.headers || {};

  Object.keys(headers).forEach((key) => {
    if (headers[key] !== null) {
      xhr.setRequestHeader(key, headers[key]);
    }
  });
  xhr.send(formData);
  return xhr;
}
