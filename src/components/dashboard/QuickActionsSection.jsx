import { useModal } from "@/hooks/useModal";
import { QUICK_ACTION_LINKS } from "@/utils/constant";
import { Link } from "react-router-dom";
import Modal from "@/components/ui/modal/Modal";


const QuickActionLink = ({ to, src, alt, external }) => {
    const { isOpen, openModal, closeModal } = useModal();
    return (
        <>
            <Link
                onClick={!external ? openModal : false}
                to={to}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="transition-transform hover:scale-105"
            >
                <img
                    src={src}
                    alt={alt}
                    className="h-20 w-100 rounded border dark:border-gray-700 object-contain p-1 shadow"
                    loading="lazy"
                />
            </Link>
            <Modal isOpen={isOpen} onClose={closeModal} maxWidth='max-w-3xl'>
                <img src="/images/contribution2.jpg" className="rounded shadow" alt="contribution" />
            </Modal>
        </>
    );
}


const QuickActionsSection = () => (
    <section className="col-span-12 my-5" aria-label="Quick Actions">
        <div className="flex flex-wrap justify-center gap-5 sm:flex-nowrap">
            {QUICK_ACTION_LINKS.map((link) => (
                <QuickActionLink key={link.alt} {...link} />
            ))}
        </div>
    </section>
);

export default QuickActionsSection