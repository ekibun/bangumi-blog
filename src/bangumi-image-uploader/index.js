/*
 * @Description:
 * @Author: ekibun
 * @Date: 2020-05-21 20:53:14
 * @LastEditors: ekibun
 * @LastEditTime: 2020-05-22 19:24:18
 */
import $ from 'jquery';
import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.less';

const parentElement = $('#fileUpload').parent();
$('#fileUploadUploader').remove();
parentElement.find('div').hide();
const uploaderDOM = $('<div />');
parentElement.prepend(uploaderDOM);

function Uploader() {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);
  return (
    <>
      <input type="file" accept="image/*" ref={inputRef} form="" />
      <div>
        <a
          onClick={async () => {
            const file = inputRef.current.files[0];
            if (!file || uploading) return;
            setUploading(true);
            const fd = new FormData();
            fd.append('Filename', file.name);
            fd.append('Filedata', file);
            fd.append('Upload', 'Submit Query');
            // eslint-disable-next-line no-undef
            const rsp = await fetch(`/blog/upload_photo?folder=/blog/files&sid=${CHOBITS_SID}`, {
              method: 'POST',
              body: fd,
            });
            $(parentElement).append(await rsp.text());
            inputRef.current.value = '';
            setUploading(false);
          }}
          className={`l ${styles.linkbtn}`}
        >
          { uploading ? <img src="/img/loading_s.gif" height="10" width="10" alt="loading" /> : undefined }
          上传图片
        </a>
        {' | '}
        <a
          className={styles.linkbtn}
          onClick={() => {
            inputRef.current.value = '';
          }}
        >
          清空队列
        </a>
      </div>
    </>
  );
}
ReactDOM.render(<Uploader />, uploaderDOM.get(0));
