import React from 'react';
import ForIndividuals from "../ForIndividuals/ForIndividuals";
import Tittle from "../Tittle/Tittle";
import './UseCase.css';

// الاستيراد الصحيح بناءً على هيكلة ملف البيانات الذي قمنا بتعديله
import { productData,
    businessData, 
    product, 
    productbusiness 
} from "../../../sharedComponents/interfaces/Home";

const UseCase: React.FC = () => {
    return (
        <section className='ak_use'>
            <Tittle
                tittle="Use Cases"
                description="At YourBank, we cater to the diverse needs of individuals and businesses alike, offering a wide range of financial solutions"
            />
            
            {/* القسم الأول: الأفراد */}
            <ForIndividuals
                tittle="For Individuals"
                description="For individuals, our mortgage services pave the way to homeownership, and our flexible personal loans provide vital support during various life milestones. We also prioritize retirement planning, ensuring a financially secure future for our customers"
                data={productData}
                datas={product}
            />
            
            {/* القسم الثاني: الأعمال (مع خاصية التبديل) */}
            <ForIndividuals
                revers={true}
                tittle="For Business"
                description="For businesses, we empower growth with working capital solutions that optimize cash flow, and our tailored financing options fuel business expansion. Whatever your financial aspirations, YourBank is committed to providing the right tools and support to achieve them"
                data={businessData}
                datas={productbusiness}
            />
        </section>
    );
};

export default UseCase;