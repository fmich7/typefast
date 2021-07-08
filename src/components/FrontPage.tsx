import React, {useState, useEffect} from 'react';
import axios from 'axios';
import banner from '../images/fingers_placement.webp';
//https://preview.redd.it/0fraswgtys651.png?width=1920&format=png&auto=webp&s=4b14f247e564150a430c63e4e4621b80c25b3dda

type getWebsiteStatisticsFromApiResponse = {
    registered_users: number,
    texts: number,
    chars_sum: number,
};

export async function getWebsiteStatisticsFromApi(): Promise<getWebsiteStatisticsFromApiResponse> {
    const response = await axios.get('http://127.0.0.1:5000/get_website_statistics');

    return Promise.resolve(response.data);
}

export default function FrontPage() {

    const [chars, setChars] = useState(0);
    const [users, setUsers] = useState(0);
    const [texts, setTexts] = useState(0);

    useEffect(() => {
        getWebsiteStatisticsFromApi().then((response) => {
            setChars(response['chars_sum']);
            setUsers(response['registered_users']);
            setTexts(response['texts']);
        }).catch((err) => {
            alert("could not get random text from api: " + err);
        });
    }, []);

    return (
        <div>
            <div id="front-banner">
                <div className="container bg-transparent my-0 h-100">
                    <div className="row h-100">
                        <div className="col-sm my-auto">
                            <div className="text-white">
                                <h2>See how fast you can type</h2>
                                <p>Test yourself on how fast and how accurately you are able to type.</p>
                                <a type="button" href="/sign_up" className="btn btn-dark banner-btn" style={{marginRight: 15}}>Sign Up</a>
                                <a type="button" href="/test" className="btn btn-outline-light banner-btn">Try it</a>
                            </div>
                        </div>
                        <div className="col-sm my-auto">
                            <img src={banner} alt="banner" width={720} height={200} className="img-fluid banner-img" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <h2 className="mt-5">Compare your results with others</h2>
                <p>Everything in one place for free!</p>
                <div className="row site-statistics my-5">
                    <div className="col-sm">
                        <h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            </svg>&nbsp;
                            Dashboard
                        </h4>
                        <p>Check your statistics and manage your account</p>
                    </div>
                    <div className="col-sm">
                        <h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                            </svg>&nbsp;
                            Everything is free
                        </h4>
                        <p>No need to pay for useless stuff</p>
                    </div>
                    <div className="col-sm">
                        <h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-binoculars" viewBox="0 0 16 16">
                                <path d="M3 2.5A1.5 1.5 0 0 1 4.5 1h1A1.5 1.5 0 0 1 7 2.5V5h2V2.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5v2.382a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V14.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 14.5v-3a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5v3A1.5 1.5 0 0 1 5.5 16h-3A1.5 1.5 0 0 1 1 14.5V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V2.5zM4.5 2a.5.5 0 0 0-.5.5V3h2v-.5a.5.5 0 0 0-.5-.5h-1zM6 4H4v.882a1.5 1.5 0 0 1-.83 1.342l-.894.447A.5.5 0 0 0 2 7.118V13h4v-1.293l-.854-.853A.5.5 0 0 1 5 10.5v-1A1.5 1.5 0 0 1 6.5 8h3A1.5 1.5 0 0 1 11 9.5v1a.5.5 0 0 1-.146.354l-.854.853V13h4V7.118a.5.5 0 0 0-.276-.447l-.895-.447A1.5 1.5 0 0 1 12 4.882V4h-2v1.5a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V4zm4-1h2v-.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V3zm4 11h-4v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14zm-8 0H2v.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V14z" />
                            </svg>&nbsp;
                            Easy to navigate
                        </h4>
                        <p>Simple to find what you need</p>
                    </div>
                    <div className="col-sm">
                        <h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-clipboard-data" viewBox="0 0 16 16">
                                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                            </svg>&nbsp;
                            Statistics
                        </h4>
                        <p>
                            Registered users: {users}<br />Texts in database: {texts}<br />Total chars: {chars}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
