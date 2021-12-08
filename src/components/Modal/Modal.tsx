import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
interface ModalProps {
    isHidden?: boolean;
    title?: string;
    content?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
}

const Modal : React.FC<ModalProps> = ({
    isHidden = false,
    title = "",
    content = "",
    onConfirm = () => {},
    onCancel = () => {},
    onClose = () => {}
}: ModalProps) => {
    const _isHidden = !isHidden ? "hidden" : "";
    return <React.Fragment>
        <div className={`modal-overlay ${_isHidden}`} onClick={onClose}></div>
        <div className={`modal container ${_isHidden}`}>
        <div className="modal-header">
            <h3>{title}</h3>
            <div className="modal-controls">
                <button className="btn" onClick={onClose}><IoMdClose/></button>
            </div>
        </div>
        <div className="modal-body">
            <p>{content}</p>
        </div>
        <div className="modal-footer">
            <button className="btn" onClick={() => {
                onCancel();
                onClose();
            }}>Cancel</button>
            <button className="btn" onClick={() => {
                onConfirm();
                onClose();
            }}>Confirm</button>
        </div>
    </div>
    </React.Fragment>;
}

export default Modal;