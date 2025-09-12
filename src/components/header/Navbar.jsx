import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const formattedDateTime = dayjs().format('dddd  [,] MMMM DD YYYY');
  const formattedTime = dayjs().format('hh:mm A ');
  return (
    <div className="flex w-full  items-center z-50 relative  justify-between md:h-[108px] h-[59px] md:items-center p-4">
      <Link to='/' className='hidden md:flex'>
        <img
          src='/images/logo/logo.png'
          alt="menu"
          className="w-[200px] object-contain"
        /></Link>
      <Link to='/' className='md:hidden'>
        <img
          src='/images/logo/gccc.png'
          alt="menu"
          className="flex w-[80px] h-[80px] object-cover"
        />
      </Link>

      <p className="text-[14px] flex items-center gap-2 text-white leading-6 font-normal">
        {formattedTime} |{' '}
        <span className="text-[#86888A]">
          {formattedDateTime}
        </span>{' '}
      </p>
    </div>
  );
};

export default Navbar;
