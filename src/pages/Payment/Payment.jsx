import React from 'react';
// Components
import PageTitle from '../../components/Other/PageTitle';

// Style
import './Payment.css'

const Payment = () => {
    return (
        <section className='section__payment' id='section__payment'>
            <div className='container'>
                <PageTitle
                    titleClass="payment__title"
                    title="Оплата"
                />
                <p className='font-size-18'>Мы принимаем оплату как от физических, так и от юридических лиц. Физические лица могут оплатить товар при получении в любом из магазинов, либо курьеру при доставке, а также воспользоваться банковской картой.</p>
                <p className='font-size-18'>Для организаций</p>
                <ul>
                    <li className='font-size-18'>Безналичный платеж, включает в себя НДС (для юридических лиц – плательщиков НДС)</li>
                    <li className='font-size-18'>Безналичный платеж без НДС (для юридических лиц, находящихся на ЕНВД и УСНО)</li>
                </ul>
                <p className='font-size-18'>Для оплаты по безналичному расчету, Вы можете прислать нам реквизиты на электронную почту buh@tehintkom.ru В комплекте с товаром Вы получите полный комплект бухгалтерских документов. Для получения товара от юридического лица, необходимо иметь доверенность.</p>
                <p className='font-size-18'>Для физических лиц</p>
                <p className='font-size-18'>ВНИМАНИЕ! Не совершайте оплату товара без подтверждения заказа менеджером</p>
                <p className='font-size-18'>Оплата наличными в кассу</p>
                <p className='font-size-18'>предоставляется квитанция об оплате и товарный чек</p>
                <ul>
                    <li className='font-size-18'>Оплата курьеру</li>
                </ul>
                <p className='font-size-18'>есть возможность оплатить курьеру банковской картой, сообщите о такой необходимости заранее, чтобы курьер взял с собой аппарат эквайринга</p>
                <ul>
                    <li className='font-size-18'>Оплата по карте</li>
                </ul>
                <p className='font-size-18'>через банковский терминал</p>
                <ul>
                    <li className='font-size-18'>Оплата по квитанции</li>
                </ul>
                <p className='font-size-18'>в кассе любого банка на территории РФ</p>
            </div>
        </section>
    );
};

export default Payment;