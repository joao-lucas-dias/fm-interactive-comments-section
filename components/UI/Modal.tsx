import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";
import shared_classes from "../../styles/shared.module.css";

interface ModalProps {
	isOpen: boolean;
	type: string;
	onClose?: () => void;
	onConfirmDelete: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirmDelete }) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const [isBrowser, setIsBrowser] = useState<boolean>(false);

	useEffect(() => {
		setIsBrowser(true);
	}, []);

	const handleCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === event.currentTarget) {
			onClose!();
		}
	};

	const modalContent = (
		<div
			id="modal-background"
			className={classes.background}
			onClick={onClose && handleCloseModal}
		>
			<div
				id="modal-content"
				ref={modalRef}
				className={classes.container}
				style={{ padding: "1.5em", borderRadius: "10px" }}
			>
				<p className={classes.header}>Delete comment</p>
				<p className={`${shared_classes.text} ${classes.text}`}>
					Are you sure you want to delete this comment? This will remove the comment and
					can&apos;t be undone.
				</p>
				<div className={classes.actions}>
					<button onClick={onClose} className={classes.cancel}>
						No, cancel
					</button>
					<button onClick={onConfirmDelete} className={classes.delete}>
						Yes, delete
					</button>
				</div>
			</div>
		</div>
	);

	return isBrowser && isOpen
		? ReactDOM.createPortal(modalContent, document.getElementById("modal-root")!)
		: null;
};

export default Modal;
