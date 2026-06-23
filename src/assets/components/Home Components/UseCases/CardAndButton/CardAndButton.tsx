import './CardAndButton.css';
import { type CardProps } from '../../../sharedComponents/interfaces/Home'; // تأكد من مطابقة المسار

const CardAndButton: React.FC<CardProps> = ({ icon, tittle }) => {
    return (
        <div className="ak_cardandbutton">
            <img src={icon} alt={tittle} />
            <p>{tittle}</p>
        </div>
    );
};

export default CardAndButton;