import React, { useEffect, useState } from 'react';
import MainCarousel from '../../components/HomeCarousel/MainCarousel';
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel';
import {womens_jacket} from '../../../Data/womens_jacket';
import axios from 'axios';

const HomePage = () => {

    const api = 'http://localhost:9001/api/v1/products/filters';
    const [menJeans, setMenJeans] = useState([]);
    const [menShirt, setMenShirt] = useState([]);
    const [menJacket, setMenJacket] = useState([]);
    const [womenJacket, setWomenJacket] = useState([]);
    const [womenDress, setWomenDress] = useState([]);
    const [womenTop, setWomenTop] = useState([]);

    const loadProducts = () => {
        axios.get(api, {
            params: {
                topLevelCategoryName: "men",
                secondLevelCategoryName: "clothing",
                thirdLevelCategoryName: "jeans"
            }
        }).then(response => {setMenJeans(response.data)});

        axios.get(api, {
            params: {
                topLevelCategoryName: "women",
                secondLevelCategoryName: "clothing",
                thirdLevelCategoryName: "jacket"
            }
        }).then(response => {setWomenJacket(response.data)});

        axios.get(api, {
            params: {
                topLevelCategoryName: "women",
                secondLevelCategoryName: "clothing",
                thirdLevelCategoryName: "top"
            }
        }).then(response => {setWomenTop(response.data)});

        axios.get(api, {
            params: {
                topLevelCategoryName: "men",
                secondLevelCategoryName: "clothing",
                thirdLevelCategoryName: "shirt"
            }
        }).then(response => {setMenShirt(response.data)});

    }

    useEffect(() => {
        loadProducts();
      }, [])

    return (
        <div>
            <MainCarousel/>

            <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
                <HomeSectionCarousel data={womenTop} sectionName={"Women's Tops"}/>
                <HomeSectionCarousel data={womenJacket} sectionName={"Women's Jackets"}/>
                <HomeSectionCarousel data={menShirt} sectionName={"Men's Shirt"}/>
                <HomeSectionCarousel data={menJeans} sectionName={"Men's Jeans"}/>
            </div>
        </div>
    );
}
 
export default HomePage;