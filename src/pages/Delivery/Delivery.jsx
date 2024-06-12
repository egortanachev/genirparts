import React from 'react';
// Components
import PageTitle from '../../components/Other/PageTitle';

// Style
import './Delivery.css'

const Delivery = () => {
    return (
        <section className='section__delivery' id='section__delivery'>
            <div className='container'>
                <PageTitle
                    titleClass="delivery__title"
                    title="Доставка"
                />
                <p className='font-size-18'>Условия <span className='font-weight-500'>доставки</span> запчастей транспортом</p>
                <p className='font-size-18'>В нашем распоряжении 4 микроавтобуса для обеспечения <span className='font-weight-500'>бесплатной доставки запасных частей</span> до дверей клиента по Санкт-Петербургу, в пределах 30 км от КАД, либо до ворот транспортной компании на Ваш выбор.</p>
                <p className='font-size-18'><span className='font-weight-600'>Режим работы:</span></p>
                <p className='font-size-18'>Служба доставки работает с 10.00 до 18.00 с понедельника по пятницу.</p>
                <p className='font-size-18'>Доставка осуществляется с 11.00-18.00 ПН-ПТ в пределах 30 км. от КАД.</p>
                <p className='font-size-18'><span className='font-weight-600'>Срок доставки</span> по Санкт-Петербургу — на следующий день при наличии товара на складе с момента подтверждения заказа. При наличии свободного транспорта, Ваш заказ будет доставлен Вам в день его подтверждения.</p>
                <ul>
                    <li className='font-size-18'><span className='font-weight-500'>бесплатная доставка</span> по Санкт-Петербургу до дверей клиента, либо до транспортной компании, осуществляется при ЛЮБОЙ сумме заказа(ов).</li>
                    <li className='font-size-18'><span className='font-weight-500'>срочная доставка</span> по Санкт-Петербургу до дверей клиента, либо до транспортной компании, осуществляется платно в день совершения (оплаты) заказа (при условии, что заказ (или оплата) произведены до 12.00 текущего дня). Стоимость срочной доставки составляет 500руб. независимо от суммы заказа.</li>
                    <li className='font-size-18'><span className='font-weight-500'>Доставка крупногабаритных товаров (запалеченный груз, оси для прицепов, редуктора и др.)</span> по Санкт-Петербургу до дверей клиента, либо до транспортной компании, осуществляется бесплатно, в общем порядке.</li>
                </ul>
                <p className='font-size-18'>В случае доставки нашим транспортом, покупатели могут оплатить заказ как наличным, так и безналичным способом.</p>
                <p className='font-size-18'>ВНИМАНИЕ: водитель не производит выгрузку и занос товара в здание. Позаботьтесь о наличии свободного подъезда к воротам Вашего склада, готовность погрузо-разгрузочной техники, либо грузчиков.</p>
                <p className='font-size-18'>При получении товара, предъявите доверенность, либо печать организации, заполните все необходимые поля в сопроводительных документах и передайте заполненный экземпляр водителю.</p>
            </div>
        </section>
    );
};

export default Delivery;