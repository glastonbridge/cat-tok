"use client"

import styles from "./page.module.css";
import { useCallback, useEffect, useState } from "react";
import { uploadCat } from "@/app/api/cats";
import { useDropzone } from "react-dropzone";


export default function Uploader() {
  const [catsData, setCatsData] = useState([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      uploadCat(file);
      // user feedback
    });
  },[]);
  const {getRootProps, getInputProps} = useDropzone({onDrop})
  
  return (
    <div className={styles.page}>
      <h1>Upload cats</h1>
      <div className={styles.dropzone}>
        
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </div>
    </div>
  );
}
