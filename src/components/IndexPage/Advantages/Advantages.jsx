import React from 'react';
// Components
import AdvantageItem from './AdvantagesItem';
import PageTitle from '../../Other/PageTitle';

// Icons
import icon1 from './img/icon1.svg'
import icon2 from './img/icon2.svg'
import icon3 from './img/icon3.svg'
import icon4 from './img/icon4.svg'

// Style
import './Advantages.css'

const Advantages = () => {
    return (
        <section className="section__advantages" id="section__advantages">
            <div className="container">
                <PageTitle
                    titleClass="advantages__title"
                    title="Наши преимущества"
                />
                <div className="advantages__group">
                    <AdvantageItem
                        title="Высокое качество"
                        description="Наши запчасти сочетают евро-пейские стандарты с низкими ценами на продукцию"
                        icon={icon1}
                    />
                    <AdvantageItem
                        title="Контроль стандартов"
                        description="Компания осуществляет много-уровневый контроль качества на каждом этапе производства"
                        icon={icon2}
                    />
                    <AdvantageItem
                        title="Инновации производства"
                        description="Особая модификация элементов позволяет устранить недостатки оригинальных деталей"
                        icon={icon3}
                    />
                    <AdvantageItem
                        title="Высокое качество"
                        description="Наши запчасти сочетают евро-пейские стандарты с низкими ценами на продукцию"
                        icon={icon4}
                    />
                </div>
            </div>
        </section>
    );
};

export default Advantages;