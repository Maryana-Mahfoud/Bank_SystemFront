// 1. استيراد الصور (تأكد من مطابقة المسارات لمشروعك)
import CheckIcon from "../../../images/homeImages/CheckIcon.png";
import AbstractDesign from "../../../images/homeImages/AbstractDesign.webp";
import Transactions from "../../../images/homeImages/Transactions.webp";

import CheckingIcon from "../../../images/homeImages/CheckingAccount.png";
import SavingIcon from "../../../images/homeImages/SavingAccount.png";
import LoansIcon from "../../../images/homeImages/LoansandMortgages.png";
import CheckBusinessIcon from "../../../images/homeImages/check.png";
import SaveBusinessIcon from "../../../images/homeImages/save.png";
import LoansBusinessIcon from "../../../images/homeImages/loans.png";
import TextureLeft from '../../../images/homeImages/TextureLeft.png';
import type { ReactNode } from "react";
import managingFinanceIcon from '../../../images/homeImages/ManagingPersonalFinances.png';
import savingFutureIcon from '../../../images/homeImages/SavingforTheFuture.png';
import homeOwnershipIcon from '../../../images/homeImages/Homeownership.png';
import educationFundingIcon from '../../../images/homeImages/EducationFunding.png';

import startupsIcon from '../../../images/homeImages/StartupsandEntrepreneurs.png';
import cashFlowIcon from '../../../images/homeImages/CashFlowManagement.png';
import businessExpansionIcon from '../../../images/homeImages/BusinessExpansion.png';
import paymentSolutionsIcon from '../../../images/homeImages/PaymentSolutions.png';

import retirementIcon from '../../../images/homeImages/78.png';
import debtConsolidationIcon from '../../../images/homeImages/63.png';
import financialBurdensIcon from '../../../images/homeImages/91.png';
import cashFlowBizIcon from '../../../images/homeImages/65.png';
import driveExpansionIcon from '../../../images/homeImages/70.png';
import payrollProcessingIcon from '../../../images/homeImages/45.png';

// 2. الواجهات (Interfaces)
export interface HomeHeroData {
    icon: string;
    iconText: string;
    title: string;
    description: string;
    buttonText: string;
    images: string[];
}

export interface HeaderData {
    titleOne: string;
    titleTwo: string;
    description: string;
    individualBtn: string;
    businessesBtn: string;
}

export interface Product {
    id: number;
    category: "individual" | "businesses";
    icon: string;
    title: string;
    description: string;
}

// 3. البيانات (Data Objects)
export const homeHeroData: HomeHeroData = {
    icon: CheckIcon, 
    iconText: "No LLC Required, No Credit Check.",
    title: `Welcome to YourBank<br>Empowering Your <span>Financial Journey</span>`,
    description: "At YourBank, our mission is to provide comprehensive banking solutions that empower individuals and businesses to achieve their financial goals. We are committed to delivering personalized and innovative services that prioritize our customers' needs.",
    buttonText: "Open Account",
    images: [AbstractDesign, Transactions] 
};

export const OurProductsHeaderData: HeaderData = {
    titleOne: "Our",
    titleTwo: "Products",
    description: "Discover a range of comprehensive and customizable banking products at YourBank, designed to suit your unique financial needs and aspirations",
    individualBtn: "For Individuals",
    businessesBtn: "For Businesses"
};

export const OurProductsData: Product[] = [
    { id: 1, category: "individual", icon: CheckingIcon, title: "Checking Accounts", description: "Enjoy easy and convenient access to your funds with our range of checking account options. Benefit from features such as online and mobile banking, debit cards, and free ATM access." },
    { id: 2, category: "individual", icon: SavingIcon, title: "Savings Accounts", description: "Build your savings with our competitive interest rates and flexible savings account options. Whether you're saving for a specific goal or want to grow your wealth over time, we have the right account for you." },
    { id: 3, category: "individual", icon: LoansIcon, title: "Loans and Mortgages", description: "Realize your dreams with our flexible loan and mortgage options. From personal loans to home mortgages, our experienced loan officers are here to guide you through the application process and help you secure the funds you need." },
    { id: 4, category: "businesses", icon: CheckBusinessIcon, title: "Checking Accounts - Businesses", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex harum exercitationem sapiente suscipit ipsum repellat eligendi, accusamus vitae voluptatem! Praesentium illo autem dolor perferendis ab. Provident dolore blanditiis atque" },
    { id: 5, category: "businesses", icon: SaveBusinessIcon, title: "Savings Accounts - Businesses", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex harum exercitationem sapiente suscipit ipsum repellat eligendi, accusamus vitae voluptatem! Praesentium illo autem dolor perferendis ab. Provident dolore blanditiis atque" },
    { id: 6, category: "businesses", icon: LoansBusinessIcon, title: "Loans and Mortgages - Businesses", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex harum exercitationem sapiente suscipit ipsum repellat eligendi, accusamus vitae voluptatem! Praesentium illo autem dolor perferendis ab. Provident dolore blanditiis atque" },
];
// --- Interfaces ---
export interface Feature {
  id: number;
  title: string;
  description: string;
  category: "Online Banking" | "Financial Tools" | "Customer Support";
}

export type Category = "Online Banking" | "Financial Tools" | "Customer Support";

// --- Data ---
export const defaultFeatures: Feature[] = [
  { id: 1, title: "24/7 Account Access", description: "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.", category: "Online Banking" },
  { id: 2, title: "Mobile Banking App", description: "Stay connected to your finances on the go with our user-friendly mobile banking app. Easily manage your accounts, deposit checks, and make payments from your smartphone or tablet.", category: "Online Banking" },
  { id: 3, title: "Secure Transactions", description: "Rest assured knowing that your transactions are protected by industry-leading security measures. We employ encryption and multi-factor authentication to safeguard your financial information.", category: "Online Banking" },
  { id: 4, title: "Bill Pay and Transfers", description: "Save time and avoid late fees with our convenient bill pay service. Set up recurring payments or make one-time transfers between your accounts with just a few clicks.", category: "Online Banking" },
  { id: 5, title: "Financial Tool One", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", category: "Financial Tools" },
  { id: 6, title: "Financial Tool Two", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", category: "Financial Tools" },
  { id: 7, title: "Financial Tool Three", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", category: "Financial Tools" },
  { id: 8, title: "Financial Tool Four", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", category: "Financial Tools" },
  { id: 9, title: "Support Feature One", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", category: "Customer Support" },
  { id: 10, title: "Support Feature Two", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", category: "Customer Support" },
  { id: 11, title: "Support Feature Three", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", category: "Customer Support" },
  { id: 12, title: "Support Feature Four", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", category: "Customer Support" }
];
// src/types/CardTypes.ts
export interface CardProps {
  icon: string;
  tittle: string;
}
// src/types/ForIndividualsTypes.ts

export interface ForIndividualsProps {
  revers?: boolean;
  tittle: string;
  description: string;
  data: CardProps [];
  datas: CardProps [];
}
export interface TittleProps {
  tittle: string;
  description: string;
  className?: string; // علامة ? تعني أن هذه الخاصية اختيارية
}
export interface UseCaseData {
  productData: CardProps[];
  product: CardProps[];
  businessData: CardProps[];
  productbusiness: CardProps[];
}

// بيانات الكروت (ForIndividuals)
export const productData: CardProps[] = [
  { icon: managingFinanceIcon, tittle: "Managing Personal Finances" },
  { icon: savingFutureIcon, tittle: "Saving for the Future" },
  { icon: homeOwnershipIcon, tittle: "Homeownership" },
  { icon: educationFundingIcon, tittle: "Education Funding" },
];

export const businessData: CardProps[] = [
  { icon: startupsIcon, tittle: "Startups and Entrepreneurs" },
  { icon: cashFlowIcon, tittle: "Cash Flow Management" },
  { icon: businessExpansionIcon, tittle: "Business Expansion" },
  { icon: paymentSolutionsIcon, tittle: "Payment Solutions" },
];

export const product: CardProps[] = [
  { icon: retirementIcon, tittle: "Secure Retirement Planning" },
  { icon: debtConsolidationIcon, tittle: "Manageable Debt Consolidation" },
  { icon: financialBurdensIcon, tittle: "Reducing financial burdens" },
];

export const productbusiness: CardProps[] = [
  { icon: cashFlowBizIcon, tittle: "Cash Flow Management" },
  { icon: driveExpansionIcon, tittle: "Drive Business Expansion" },
  { icon: payrollProcessingIcon, tittle: "Streamline payroll processing" },
];
// src/types/FAQTypes.ts
export interface FAQItem {
id:number;
  question: string;
  answer: string;
}
export const js_data_faqs: FAQItem[] = [
   { id: 1,
      question: "How do I open an account with YourBank?",
      answer: "Opening an account with YourBank is easy. Simply visit our website and click on the \"Open an Account\" button. Follow the prompts, provide the required information, and complete the application process. If you have any questions or need assistance, our customer support team is available to help."
    },
    { id: 2,
      question: "What documents do I need to provide to apply for a loan?",
      answer: "The documents required for a loan application may vary depending on the type of loan you are applying for. Generally, you will need to provide identification documents (such as a passport or driver's license), proof of income (such as pay stubs or tax returns), and information about the collateral (if applicable). Our loan officers will guide you through the specific requirements during the application process."
    },
    { id: 3,
      question: "How can I access my accounts online?",
      answer: "Accessing your accounts online is simple and secure. Visit our website and click on the \"Login\" button. Enter your username and password to access your accounts. If you haven't registered for online banking, click on the \"Enroll Now\" button and follow the registration process. If you need assistance, our customer support team is available to guide you."
    },
    { id: 4,
      question: "Are my transactions and personal information secure?",
      answer: "At YourBank, we prioritize the security of your transactions and personal information. We employ industry-leading encryption and multi-factor authentication to ensure that your data is protected. Additionally, we regularly update our security measures to stay ahead of emerging threats. You can bank with confidence knowing that we have robust security systems in place."
    },
    { id: 5,
      question: "What is the difference between a bank merger and a bank acquisition?",
      answer: "While the terms are often interchangeable, mergers and acquisitions aren't the same. In short, a merger is when two existing companies combine into a singular, new entity. An acquisition is when one company absorbs another, but no new organization is created."
    },
    { id: 6,
      question: "What types of accounts does YourBank offer?",
      answer: "YourBank offers a variety of account options to meet different financial needs, including savings accounts, checking accounts, business accounts, and fixed deposit accounts. Each account comes with its own features and benefits. You can explore all available options on our website or speak with one of our representatives for personalized guidance."
    },
    { id: 7,
      question: "Can I transfer money internationally through YourBank?",
      answer: "Yes, YourBank provides secure and convenient international money transfer services. You can send funds to many countries worldwide using our online banking platform or by visiting a branch. Transfer fees, exchange rates, and processing times may vary depending on the destination."
    },
    { id: 8,
      question: "How do I reset my online banking password?",
      answer: "If you have forgotten your online banking password, click on the \"Forgot Password\" link on the login page. Follow the verification steps to confirm your identity, then create a new password. For security reasons, we recommend choosing a strong and unique password."
    },
    { id: 9,
      question: "Does YourBank offer customer support outside business hours?",
      answer: "Yes, YourBank offers customer support through multiple channels, including phone and online assistance. While branch hours may vary, our support team is available to help with urgent issues and general inquiries. You can find detailed contact information on our website."
    },
    { id: 10,
      question: "Are there any fees associated with maintaining an account?",
      answer: "Account maintenance fees may apply depending on the type of account you choose. Some accounts offer fee waivers when certain conditions are met, such as maintaining a minimum balance or setting up direct deposits. Full fee details are available in our terms and conditions."
    }]
    export interface SliderProps {
  children: ReactNode;
  totalItems: number;
}
// src/types/TestimonialTypes.ts
export interface TestimonialItem {
  id: number;
  category: "individual" | "businesses";
  clientOpinen: string;
  clientName: string;
}

export interface TestimonialCardProps {
  image: string;
  clientOpinen: string;
  clientName: string;
}

export interface SectionTitleProps {
  ftitle: string;
  title: string;
  subTitle: string;
  fbutton: string;
  sbutton: string;
  activeTab: 'individual' | 'businesses';
  setActiveTab: (tab: 'individual' | 'businesses') => void;
}
export const cardData: TestimonialItem[] = [
    {
        id: 1,
        category: "individual",
        clientOpinen: "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
        clientName: "Sara T",
    },
    {
        id: 2,
        category: "individual",
        clientOpinen: "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
        clientName: "John D",
    },
    {
        id: 3,
        category: "individual",
        clientOpinen: "I love the convenience of YourBank's mobile banking app. It allows me to stay on top of my finances and make transactions on the go The app is user-friendly and secure, giving me peace of mind.",
        clientName: "Emily G",
    },
    {
        id: 4,
        category: "individual",
        clientOpinen: "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
        clientName: "John D",
    },
    {
        id: 5,
        category: "individual",
        clientOpinen: "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
        clientName: "Sara T",
    },
    {
        id: 7,
        category: "individual",
        clientOpinen: "I love the convenience of YourBank's mobile banking app. It allows me to stay on top of my finances and make transactions on the go The app is user-friendly and secure, giving me peace of mind.",
        clientName: "Emily G",
    },
    {
        id: 8,
        category: "businesses",
        clientOpinen: "I love the convenience of YourBank's mobile banking app. It allows me to stay on top of my finances and make transactions on the go The app is user-friendly and secure, giving me peace of mind.",
        clientName: "Emily G",
    },
    {
        id: 9,
        category: "businesses",
        clientOpinen: "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
        clientName: "Sara T",
    },
    {
        id: 10,
        category: "businesses",
        clientOpinen: "I recently started my own business, and YourBank has been instrumental in helping me set up my business accounts and secure the financing I needed. Their expert guidance and tailored solutions have been invaluable.",
        clientName: "John D",
    },
    {
        id: 11,
        category: "businesses",
        clientOpinen: "I love the convenience of YourBank's mobile banking app. It allows me to stay on top of my finances and make transactions on the go The app is user-friendly and secure, giving me peace of mind.",
        clientName: "Emily G",
    },
    {
        id: 12,
        category: "businesses",
        clientOpinen: "YourBank has been my trusted financial partner for years. Their personalized service and innovative digital banking solutions have made managing my finances a breeze.",
        clientName: "Tala T",
    },
    {
        id: 13,
        category: "businesses",
        clientOpinen: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex harum exercitationem sapiente suscipit ipsum repellat eligendi, accusamus vitae voluptatem! Praesentium illo autem dolor perferendis ab. Provident dolore blanditiis atque",
        clientName: "Aya T",
    },
]
// src/types/FinancialCTATypes.ts

export interface FinancialCTAProps {
  title: string;
  description: string;
  buttonText: string;
  image: string;
}
export const financialCTAData: FinancialCTAProps = {
  title: "Start your financial journey with <span>YourBank today!</span>",
  description:
    "Lorem ipsum dolor sit amet consectetur. Blandit odio semper risus pellentesque elit. Pellentesque eget ut imperdiet nulla penatibus. Nascetur viverra arcu sed amet cursus purus.",
  buttonText: "Open Account",
  image: TextureLeft,
};