import Animated from "@/components/common/Animated"


const INITIAL_FILTERS = {
    week_ending: [],
    date_of_visit: [],
    assigned_to_member: null,
    follow_up_status: null,
};

const FirstTimerFilterPanel = ({ initialFilters = INITIAL_FILTERS,
    onApply,
    onReset,
    loading = false }) => {
    return (
        <Animated
            animation="fade-up"
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm w-full overflow-hidden"
        > Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi et dolorem accusantium quidem tenetur aperiam cum corporis nemo magnam deleniti officia doloremque, aliquid earum in sed similique optio voluptatem voluptate? Harum, voluptatem eligendi totam sapiente molestiae ipsum vero saepe assumenda. Quas perspiciatis cum reprehenderit numquam explicabo saepe magnam, repellendus quo, earum consequatur tenetur doloremque facilis quasi inventore aliquam id maxime reiciendis aperiam deleniti perferendis enim quaerat cupiditate? Blanditiis debitis id voluptatem consequatur dicta, laudantium deleniti iure at nesciunt eligendi dolores, quidem voluptas? Dolor, incidunt soluta laboriosam asperiores deserunt laudantium voluptatem quae at illum minima ad molestiae temporibus dolorum culpa quod! </Animated>
    )
}

export default FirstTimerFilterPanel