import { useDispatch } from 'react-redux'
import { uiOpenModal } from '../../actions/uiActions';

const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch(uiOpenModal());
    }

    return (
        <button
            className='btn btn-primary fab'
            onClick={handleClickNew}
        >
            <i className='fa fa-plus'></i>
        </button>
    )
}

export default AddNewFab;