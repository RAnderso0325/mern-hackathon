import React, {Component} from 'react';
import Search from './Search.js';
import Results from './Results.js';
import MapContainer from './MapContainer.js';
import geocoder from 'geocoder';
import axios from 'axios';
import moment from 'moment';

class Planner extends Component {
	constructor(props){
		super(props);
		this.state = {
			locationA: '',
			locationB: '',
			sunsetTime: '',
			lat: '',
			lng: ''
		}
	}

	updateLocation = (event) => {
		//Will update location upon change of the text fields
		this.setState({ 
			[event.target.name]: event.target.value
		});
	}

	fetchSunset = (event) => {
		let latitude;
		let longitude;
        let base = this;
        let origin = this.state.locationA

		event.preventDefault();
		console.log("Fetch the sunset time traveling from " + this.state.locationA + " to " + this.state.locationB);

		geocoder.geocode(this.state.locationB, function(err,data){
			latitude = data.results[0].geometry.location.lat;
			longitude = data.results[0].geometry.location.lng;
			console.log(latitude, longitude);

			let sunsetApi = 'https://api.sunrise-sunset.org/json?lat='+latitude+'&lng='+longitude+'&date=today'
            let distanceAPI = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+origin+'&destinations='+latitude+','+longitude+'&key=AIzaSyBwHcq2d-eThqq9uo-tVnCr_lDdBk8cCLc';
			axios.get(`${sunsetApi}`)
				.then(({data}) => {
					console.log(data);
					base.setState({
						lat: latitude,
						lng: longitude,
						sunsetTime: data.results.sunset
					})
					console.log(base.state);
                })
            axios.get(`${distanceAPI}`)
                .then(({data})=>{
                    console.log('axios distance', data)
                })

		})
	}

    render(){
        return(
        <div className='planner'>
			<Search data={this.state} updateLocation={this.updateLocation} fetchSunset={this.fetchSunset} />
			<Results data={this.state} />
        	<MapContainer />
        </div>
        );
    }
}

export default Planner;


{/* Variables to pass as props: Sunset Time (from sunset API?) */}
{/* Arrival Time (from google)? */}