import React, { useState, useEffect } from 'react';
import SectionTitle from "./SectionTitle";
import Slider from "../../Home Components/Slider/Slider";
import TestimonialCard from "./TestimonialCard";
import { cardData } from "../../sharedComponents/interfaces/Home";
import { type TestimonialItem } from "../../sharedComponents/interfaces/Home";
import quotationIcon from "../../../images/homeImages/Qutation.png";

const OurTestimonials: React.FC = () => {
    const DASHBOARD_KEY = "tableData-1-4"; 
    
    const [allTestimonials, setAllTestimonials] = useState<TestimonialItem[]>(() => {
        const savedData = localStorage.getItem(DASHBOARD_KEY);
        return savedData ? JSON.parse(savedData) : cardData;
    });

    useEffect(() => {
        if (!localStorage.getItem(DASHBOARD_KEY)) {
            localStorage.setItem(DASHBOARD_KEY, JSON.stringify(cardData));
            setAllTestimonials(cardData);
        }
    }, []);

    const [activeTab, setActiveTab] = useState<'individual' | 'businesses'>('individual');
    
    // عملية الفلترة
    const filteredData = allTestimonials.filter(item => item.category === activeTab);

    // كود تشخيصي للكونسول
    console.log("Active Tab:", activeTab);
    console.log("Filtered Data:", filteredData);

    return (
        <>
        <section className="Our-Testimonials-Container" >
            <SectionTitle
                ftitle="Our"
                title="Testimonials"
                subTitle="Discover how YourBank has transformed lives..."
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                fbutton="For Individuals"
                sbutton="For Businesses"
            />

            {filteredData.length === 0 ? (
                <div style={{ color: 'white', textAlign: 'center', padding: '50px', fontSize: '20px' }}>
                    <p>لا توجد بيانات للفئة: <strong>{activeTab}</strong></p>
                    <p>الرجاء التأكد من تطابق كلمة (category) في البيانات مع الكلمة الموجودة في الفلتر.</p>
                </div>
            ) : (
                <div>
                    <Slider totalItems={filteredData.length}>
                        {filteredData.map((item) => (
                            <TestimonialCard
                                key={item.id}
                                image={quotationIcon}
                                clientOpinen={item.clientOpinen}
                                clientName={item.clientName}
                            />
                        ))}
                    </Slider>
                </div>
            )}
        </section>
        </>
    );
};

export default OurTestimonials;