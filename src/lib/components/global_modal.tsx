import Modal from "./modal";

function NotReady({
    onModal,
    toggleModal
}: {
    onModal: boolean,
    toggleModal: () => void
}) {
    return (
        <Modal
            open={onModal}
            onClose={toggleModal}
        >
            <div className="flex justify-center items-center w-full h-full">
                <div className="text-h2-sb-24">준비 중인 기능입니다.</div>
            </div>
        </Modal>
    )
}

const GlobalModal = {
    NotReady
}

export default GlobalModal;