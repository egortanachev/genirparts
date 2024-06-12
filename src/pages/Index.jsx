import React from 'react';
import Main from './../components/IndexPage/Main/Main';
import Advantages from './../components/IndexPage/Advantages/Advantages';
import About from './../components/IndexPage/About/About';
import Hits from './../components/IndexPage/Hits/Hits';
import Form from './../components/IndexPage/Form/Form';

const Index = () => {
    return (
        <>
            <Main />
            <Advantages />
            <About />
            <Hits />
            <Form />
        </>
    );
};

export default Index;