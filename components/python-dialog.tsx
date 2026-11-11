"use client";

import { useEffect, useRef } from "react";
import { X } from "@/components/icons";
import { PythonWorkbench } from "@/components/python-workbench";

export function PythonDialog({
  initialCode,
  title,
  subtitle,
  onClose,
}: {
  initialCode: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="runner-dialog"
      aria-labelledby="runner-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onMouseDown={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="runner-panel">
        <header className="runner-head">
          <div>
            <span className="eyebrow">Live Python / Browser</span>
            <h2 id="runner-title">{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="关闭代码运行器"
          >
            <X />
          </button>
        </header>
        <PythonWorkbench initialCode={initialCode} compact />
      </div>
    </dialog>
  );
}
