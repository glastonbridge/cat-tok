"use client"

import styles from "./page.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { uploadCat } from "@/app/api/cats";
import { FileRejection, useDropzone } from "react-dropzone";
import { UiStateContext } from "../ui-state-context";
import Link from "next/link";


export default function Uploader() {
  // Use global errors for things like network access that imply
  // an overall service degradation. Use local errors to help users
  // figure out things that they need to address in the context
  // they are working in.
  const {setErrorMessage, setBusy} = useContext(UiStateContext);
  const [uploaderError, setUploaderError] = useState<string|null>();
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setUploadComplete(false);
    if (rejectedFiles.length) {
      setUploaderError(`Problem with this cat: ${rejectedFiles[0].errors[0].message}`);
    } else {
      setUploaderError("");
    }
    acceptedFiles.forEach((file) => {
      setBusy(true);
      uploadCat(file)
      .then(res => {
        if (!res.ok) {
          // TODO: not very clear...
          setUploaderError(`Response from API: status ${res.status}`);
          return;
        }
        setUploadComplete(true);
      })
      .catch(() => {
        setErrorMessage("Network error");
      })
      .finally(() => setBusy(false))
    });
  },[]);
  const {getRootProps, getInputProps} = useDropzone({
    onDrop, 
    maxFiles:1, 
    maxSize: 5242880,
    accept: {
      "image/jpeg": [".jpg", ".JPG", ".jpeg", ".JPEG"],
      "image/png": [".png",".PNG"],
    }
  })
  
  return (
    <div className={styles.page}>
      <h1>Upload cats</h1>
      {uploaderError && 
      <div className={styles.error}>
        There was a problem: {uploaderError}
      </div>
      }
      {uploadComplete && 
      <div className={styles.complete}>
        Upload complete!
        <Link href="/">View now!</Link>
      </div>
      }
      <div  className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag and drop your cat image here, or click to select files on  your computer</p>
      </div>
    
    </div>
  );
}
