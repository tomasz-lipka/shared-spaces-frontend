import { Link } from 'react-router-dom';
import Config from '../../Config';

function Breadcrumb({ to, display }) {
    return (
        <div>
            <Link to={to} className='breadcrumb'>{Config.titleSymbol}{Config.blankMsg}{display}{Config.blankMsg}</Link>
        </div>
    );
}

export default Breadcrumb