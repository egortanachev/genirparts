import React from 'react';
// Components
import PageTitle from '../../Other/PageTitle';

// Image
import img from './img/img.jpg'

// Style
import './About.css'

const Advantages = () => {
    return (
        <section className="section__about" id="section__about">
            <div className="container">
                <PageTitle
                    titleClass="about__title"
                    title="О компании"
                />
                <div className="about__content">
                    <div>
                        <p className='font-size-18'><span className='firstWord'>Genir</span><span className='secondWord'>Parts</span> – производитель запчастей и комплектующих для грузового коммерческого транспорта. Производство осуществляется в Китае, под тщательным контролем российских специалистов.</p>
                        <p className='font-size-18'>Благодаря многоуровневому контролю качества на всех этапах производства и использованию лучшего сырья, нам удалось совместить европейское качество деталей и цены самых доступных аналогов.</p>
                        <p className='font-size-18'>Наши специалисты модифицировали некоторые элементы энергоаккумуляторов и тормозных камер, что позволило устранить производственные «промахи» оригинальных запчастей, значительно упростить и усилить конструкцию. Тем самым, мы максимально адаптировали нашу продукцию под особенности эксплуатации в России.</p>
                    </div>
                    <img src={img} alt="Производство" />
                </div>
            </div>
        </section>
    );
};

export default Advantages;