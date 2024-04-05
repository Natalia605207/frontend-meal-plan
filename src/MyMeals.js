import { FaEdit } from "react-icons/fa";
import { RiDeleteBinFill } from "react-icons/ri";
import avocado from './assets/avocado.png';

export const MyMeals = ({ text, updatingInInput, deleteMeal }) => {
    return(
        <div className='meal-line'>
            <img src={avocado} alt="avocado-icon" className='avocado-icon'/>
            <p className='added-meal'>{text}</p>
            <div className='btn-group'>
            <FaEdit className='btn edit' onClick={updatingInInput} />
            <RiDeleteBinFill className='btn delete' onClick={deleteMeal} />
            </div>
        </div>
    )
}