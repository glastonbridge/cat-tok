"use client"

import { createContext, useState } from "react";
import styles from "./ui-state-context.module.css";

interface UiState {
  isBusy: boolean;
  errorMessage: string|null;
  setBusy(busyState: boolean): void;
  setErrorMessage(errorState: string|null): void;
}

const BusyOverlay = () => (
  <div className={styles.overlay}>
    <div className={styles.busy}>
      busy...
    </div>
  </div>
)

interface ErrorOverlayProps {
  message:string;
  dismiss: () => void
}
const ErrorOverlay = ({message, dismiss}: ErrorOverlayProps) => (
  <div className={styles.overlay} onClick={dismiss} >
    <div className={styles.error}>
      {message} (tap to dismiss)
    </div>
  </div>
)


export const UiStateContext = createContext<UiState>({
  isBusy: false, 
  errorMessage: null,
  setBusy: (_value) => {},
  setErrorMessage: (_value) => {}
});

interface UiStateWrapperProps {
  children: React.ReactNode;
}

// Note this is a very naive implementation, and does not manage timeouts etc
export function UiStateWrapper({children} : UiStateWrapperProps) {
  const [isBusy, setBusy] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string|null>(null);
  const contextState: UiState = {
    isBusy, setBusy, errorMessage, setErrorMessage
  }
  return (
    <UiStateContext.Provider value={contextState}>
      {children}
      {isBusy && <BusyOverlay />}
      {errorMessage != null && <ErrorOverlay 
      message={errorMessage} 
      dismiss={() => {setErrorMessage(null)}} />}
    </UiStateContext.Provider>
  )
}
