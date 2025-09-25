import { useState } from "react"
import Button from "../../ui/Button"
import DatePicker from "react-multi-date-picker"
import { Calendar } from "react-multi-date-picker"
import Animated from "../../common/Animated"

const AttendanceFilter = () => {
    const [value, setValue] = useState([])
    function handleChange(value) {
        setValue(value)
    }
    return (
        <>
            <Animated animation="fade-up" duration={1} easing="ease-out">
                <DatePicker
                    multiple
                    value={value}
                    onChange={handleChange}
                    format="MMMM DD YYYY"
                    sort
                />
                <form className="border max-w-3xl mb-5 border-gray-100 p-5 grid gap-4 bg-white shadow rounded">
                    <h2 className="text-lg font-semibold text-gray-600">Filter Attendance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    </div>
                    <Button type="submit" className="max-w-[120px]" variant="primary" size='md'>Filter</Button>
                </form>
            </Animated>

        </>
    )
}

export default AttendanceFilter