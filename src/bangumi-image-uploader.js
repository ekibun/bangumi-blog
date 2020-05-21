/*
 * @Description: 
 * @Author: ekibun
 * @Date: 2020-05-21 20:53:14
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-22 01:00:32
 */ 
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const parentElement = document.getElementById('fileUpload').parentElement;
const uploaderDOM = document.createElement('div');
const fileUploadUploader = document.getElementById('fileUploadUploader');
fileUploadUploader && fileUploadUploader.remove()
parentElement.querySelectorAll('div').forEach((p) => p.style.display = 'none')
parentElement.prepend(uploaderDOM);

function Uploader() {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false)
  return (
    <>
      <input type='file' accept='image/*' ref={inputRef} form=''/>
      <div><a onClick={async ()=>{
        const file = inputRef.current.files[0];
        if(!file || uploading) return
        setUploading(true)
        const fd = new FormData();
        fd.append('Filename', file.name);
        fd.append('Filedata', file);
        fd.append('Upload', 'Submit Query');
        const rsp = await fetch(`/blog/upload_photo?folder=/blog/files&sid=${CHOBITS_SID}`, {
          method: 'POST',
          body: fd
        })
        $(parentElement).append(await rsp.text());
        inputRef.current.value = '';
        setUploading(false)
      }} className='l'>上传图片{ uploading? '中...' : '' }</a> | <a onClick={()=>{
        inputRef.current.value = '';
      }}>清空队列</a></div>
    </>
  );
}
ReactDOM.render(<Uploader />, uploaderDOM);