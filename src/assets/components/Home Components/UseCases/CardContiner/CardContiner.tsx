import { type CardProps } from '../../../sharedComponents/interfaces/Home'; 
import './CardContiner.css';

const CardContiner: React.FC<CardProps> = ({ icon, tittle }) => {
    return (
        <div className='ak_cardcontiner border'>
            <div className='ak-outer-circle bg-icon'>
                <div className='ak-inner-circle bg-icon'>
                    <img src={icon} alt={tittle} />
                </div>
            </div>
            <p>{tittle}</p>
        </div>
    );
};

export default CardContiner;