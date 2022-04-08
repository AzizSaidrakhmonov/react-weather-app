import React, { useState, PureComponent, useEffect} from 'react';
import './weatherStyle.scss';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const MainWeather = () => {

    
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({});

    const api = {
        url: 'https://api.openweathermap.org/data/2.5/',
        key: 'ab394df929a41095e49afb3752018648',
    }

    const getInput = (e) => {
        setInput(e.target.value);
    }

    const getWeatherData = async (e) => {
        if(e.key === 'Enter'){
            e.preventDefault();

            // if(e.key != weather.city && weather.city.name){
                
            // }
        // debugger
            try {
                const res = await fetch(`${api.url}forecast?q=${input}&units=metrics&APPID=${api.key}`).catch(error => {})
                   
                        if(res.status == 200){
                            setWeather(await res.json())
                        } else {
                            alert(`${res.status} Error occured in location search‼`)
                        }
                        // debugger

            } catch(error) {
                console.error(error)
                // debugger
                } finally {
                    console.log(weather);
                }

            setInput('');
            
        }

    }


    const getDataforGraph = [
        {
            day: weather.list && weather.list[1].dt_txt,
            Temperature: Math.round(weather.list && weather.list[1].main.temp-272.15)
        },

        {
            day: weather.list && weather.list[9].dt_txt,
            Temperature: Math.round(weather.list && weather.list[9].main.temp-272.15)
        },

        {
            day: weather.list && weather.list[17].dt_txt,
            Temperature: Math.round(weather.list && weather.list[17].main.temp-272.15)
        },

        {
            day: weather.list && weather.list[25].dt_txt,
            Temperature: Math.round(weather.list && weather.list[25].main.temp-272.15)
        }
    ]
      

    return (
        
        <div>
            <div className='weather-container'>
                <div className='current-weather__data'>

                    <form className='location'>
                        <label>Your city</label>
                        <input 
                            className='search' 
                            type='text' 
                            placeholder='Search...' 
                            onChange={getInput}
                            value={input}
                            onKeyPress={getWeatherData}
                        />
                    
                    </form>

                    <div className='current-location'>📍Location: {weather.city && weather.city.name}<sup>{weather.city && weather.city.country}</sup></div>

                    <div className='current-date'>Date/Time: {(weather.list && weather.list[1].dt_txt)}</div>

                    <div className='current-temp'>
                        <img className='temp-icon' src={`https://openweathermap.org/img/wn/${weather.list && weather.list[1].weather[0].icon}@2x.png`} alt=''/>
                        <div className='temp'>{`${Math.round(weather.list && weather.list[1].main.temp-272.15)} °C`}</div>
                    </div>

                    <div className='description'>{weather.list && weather.list[1].weather[0].description}</div>

                    <div className='wrapper'>
                        <span>
                            <div className='humidity'>Humidity</div>
                            <div className='humidity-percentage'>{`${weather.list && weather.list[1].main.humidity}%`}</div>
                        </span>
                        <span>
                            <div className='wind'>Wind Speed</div>
                            <div className='wind-speed'>{`${weather.list && weather.list[1].wind.speed} km/j`}</div>
                        </span>
                    </div> 
                </div>
                <div className='expected-weather__data'>
                    <ResponsiveContainer width="100%" height='100%'>
                        <AreaChart
                            width={500}
                            height={300}
                            data={getDataforGraph}
                            margin={{
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 5,
                            }}
                        >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                            <Area type="monotone" dataKey="Temperature" stroke="#8884d8" fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>

                        <div className='expected-weather__card-wrapper'>
                                    <div className='expected-weather__card first-card'>
                                        <div className='expected-weather__card-date'>
                                            {weather.list && weather.list[1].dt_txt}
                                        </div>
                                        <div className='expected-weather__card-img'>
                                            <img src={`https://openweathermap.org/img/wn/${weather.list && weather.list[1].weather[0].icon}@2x.png`} alt=''/>
                                        </div>
                                        <div className='expected-humidity'>
                                            Humidity
                                        </div>
                                        <div className='expected-humidity__percentage'>
                                            {`${weather.list && weather.list[1].main.humidity}%`}
                                        </div>
                                    </div>

                                    <div className='expected-weather__card'>
                                        <div className='expected-weather__card-date'>
                                            {weather.list && weather.list[9].dt_txt}    
                                        </div>
                                        <div className='expected-weather__card-img'>
                                            <img src={`https://openweathermap.org/img/wn/${weather.list && weather.list[9].weather[0].icon}@2x.png`} alt=''/>
                                        </div>
                                        <div className='expected-humidity'>
                                            Humidity
                                        </div>
                                        <div className='expected-humidity__percentage'>
                                            {`${weather.list && weather.list[9].main.humidity}%`}
                                        </div>
                                    </div>
                              
                                    <div className='expected-weather__card'>
                                        <div className='expected-weather__card-date'>
                                            {weather.list && weather.list[17].dt_txt}
                                        </div>
                                        <div className='expected-weather__card-img'>
                                            <img src={`https://openweathermap.org/img/wn/${weather.list && weather.list[17].weather[0].icon}@2x.png`} alt=''/>
                                        </div>
                                        <div className='expected-humidity'>
                                            Humidity
                                        </div>
                                        <div className='expected-humidity__percentage'>
                                            {`${weather.list && weather.list[17].main.humidity}%`}
                                        </div>
                                    </div>

                                    <div className='expected-weather__card'>
                                        <div className='expected-weather__card-date'>
                                            {weather.list && weather.list[25].dt_txt}
                                        </div>
                                        <div className='expected-weather__card-img'>
                                            <img src={`https://openweathermap.org/img/wn/${weather.list && weather.list[25].weather[0].icon}@2x.png`} alt=''/>
                                        </div>
                                        <div className='expected-humidity'>
                                            Humidity
                                        </div>
                                        <div className='expected-humidity__percentage'>
                                            {`${weather.list && weather.list[25].main.humidity}%`}
                                        </div>
                                    </div>
                                
                        </div>
                    </div>  
            </div>
        </div>
    );
};



export default MainWeather;