import { useModal } from "../../../hooks/useModal";
import { AssignIcon, AttendanceIcon2, UserIcon } from "../../../icons"
import Button from "../../ui/Button"
import { GradientCard } from "../../ui/GradientCard";
import Modal from "../../ui/modal";

const UnitCard = ({ unit, index }) => {
    const { isOpen, openModal, closeModal } = useModal();

    return (
        <>
            <div className="relative border shadow flex flex-col items-center rounded-[20px] w-full mx-auto p-4 bg-white bg-clip-border shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none">
                <div className="relative flex w-full justify-center rounded-xl bg-cover" >
                    <GradientCard height="h-[70px]" index={index}>
                        <p className="text-white text-xl font-semibold">{unit?.name} Unit</p>
                    </GradientCard>
                </div>
                <div className="mb-5 mt-10 flex flex-wrap gap-4">
                    <div className="flex flex-col items-center">
                        <h4 className="text-xl font-bold text-navy-500 dark:text-white">
                            Adela Parkson
                        </h4>
                        <p className="text-sm font-normal text-gray-500">Unit Leader</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h4 className="text-xl font-bold text-navy-500 dark:text-white">
                            Adela Parkson
                        </h4>
                        <p className="text-sm font-normal text-gray-500">Unit Leader</p>
                    </div>
                </div>
                <div className="my-5 flex flex-wrap items-center gap-4">
                    <Button title="Assign Leader, Assistant Leader and Members" onClick={openModal} size="sm" className="rounded shadow" variant="outline-success">Members <span className="font-semibold">{unit?.members_count}</span> <AttendanceIcon2 />  </Button>

                    <Button title="Assign Leader, Assistant Leader and Members" onClick={openModal} size="sm" className="rounded shadow" variant="outline-primary" startIcon={<AssignIcon />}>Assign <UserIcon />  </Button>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
                <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Edit Address
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Update your details to keep your profile up-to-date.
                        </p>
                    </div>
                    <form className="flex flex-col">
                        <div className="px-2 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button size="sm" variant="outline-primary" onClick={closeModal}>
                                Close
                            </Button>
                            <Button size="sm">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default UnitCard