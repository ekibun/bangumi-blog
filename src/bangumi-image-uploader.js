/*
 * @Description: 
 * @Author: ekibun
 * @Date: 2020-05-21 20:53:14
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-22 00:21:02
 */ 
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const parentElement = document.getElementById('fileUpload').parentElement;
const uploaderDOM = document.createElement('div');
parentElement.prepend(uploaderDOM);

function Uploader() {
  const inputRef = useRef();
  useEffect(() => {
    const fileUploadUploader = document.getElementById('fileUploadUploader');
    fileUploadUploader && fileUploadUploader.remove()
    document.getElementById('fileUpload').style.display='none';
    document.getElementById('upload_success').style.display='none';
    const $$ = $
    $ = Object.assign((...args) => {
      if(args[0] === '#fileUpload')
        return {
          fileUploadClearQueue() {
            console.log('clear');
            inputRef.current.value = '';
          },
          async fileUploadStart() {
            const file = inputRef.current.files[0];
            const fd = new FormData();
            fd.append('Filename', file.name);
            fd.append('Filedata', file);
            fd.append('Upload', 'Submit Query');
            const rsp = await fetch(`/blog/upload_photo?folder=/blog/files&sid=${CHOBITS_SID}`, {
              method: 'POST',
              body: fd
            })
            parentElement.innerHTML += await rsp.text();
            inputRef.current.value = '';
          }
        }
      return $$(...args);
    }, $$);
  }, []);
  return (
    <input type='file' accept='image/*' ref={inputRef} form=''/>
  );
}
ReactDOM.render(<Uploader />, uploaderDOM);