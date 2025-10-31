import Animated from "@/components/common/Animated";
import Button from "@/components/ui/Button";

const MembersFilterPanel = () => {

    return (
        <Animated animation={'fade-up'}>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg px-6 space-y-5 py-5">

                <div className="flex flex-wrap gap-3 border-t dark:bg-gray-800 pt-5 border-gray-200 dark:border-gray-700">
                    <Button
                        variant="primary"
                        className="flex-1"
                    >
                        Update Selected
                    </Button>

                </div>
            </div>
        </Animated>
    )
}

export default MembersFilterPanel