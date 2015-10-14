var linksessionid = '';
var employerguid = '';
var ssn = '';
var apiurl = '';
var benefits = [{}];

var LoadTestPage = React.createClass({
	getInitialState: function() {
		return {    
			linksessionid: '',
			employerguid: '',
			ssn: '',
			apiurl: '',
			benefits: [{}]
		};
	},

	loadDataFromServer: function() {
		var filename = location.pathname.replace("html","txt");
		var i = filename.lastIndexOf("/");
		filename =  'testdata' + filename.slice(i);
		$.ajax({
			url: filename,
			dataType: 'json',
			success: function(data) {
				this.setState({linksessionid: data.linksessionid});
				this.setState({employerguid: data.employerguid});
				this.setState({ssn: data.ssn});
				this.setState({apiurl: data.apiurl});
				this.setState({benefits: data.benefits});
				//console.log ("LoadTestPage loadDataFromServer");
				//console.log(data.benefits);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(url, status, err.toString());
			}.bind(this)
		});
	},

	componentDidMount: function() {
		this.loadDataFromServer();
	},
	handleChange: function(event) {
		if (event.target.id === "linksessionid")
			this.setState({linksessionid: event.target.value});
		if (event.target.id === "employerguid")
			this.setState({employerguid: event.target.value});
		if (event.target.id === "ssn")
			this.setState({ssn: event.target.value});
		if (event.target.id === "apiurl")
			this.setState({apiurl: event.target.value});
	},
	render: function() {
		//console.log ("LoadTestPage render");
		//console.log(this.state.benefits);
		return (
			<div>
				<section className="InputSection">
					<div className="testInputBox">
						<span>Connect with a Unum Link Session ID or the Employer GUID and Employee SSN</span><br />
						<label htmlFor="linksessionid">Session ID: </label>
						<input id="linksessionid" name="linksessionid" type="text" className="guidInput" value={this.state.linksessionid} onChange={this.handleChange}/>
						<br /> or <br />
						<label htmlFor="employerguid">Employer GUID: </label>
						<input id="employerguid" name="employerguid" type="text" className="guidInput" value={this.state.employerguid} onChange={this.handleChange}/>
						<label htmlFor="ssn">SSN: </label>
						<input id="ssn" name="ssn" type="text" value={this.state.ssn} onChange={this.handleChange}/>
						<br />
						<label htmlFor="apiUrl">API URL</label>
						<input id="apiurl" type="text" className="urlInput" value={this.state.apiurl} onChange={this.handleChange}/>
					</div>
				</section>
				<LoadBenefits benefits={this.state.benefits}></LoadBenefits>
			</div>
	  );
	}
});

var InputSection = React.createClass({
	render: function(){
		return (
			<div>

			</div>
		);
	}
});

var LoadBenefits = React.createClass({
	//propTypes: {
	//	benefits: React.PropTypes.object,
	//},\
	clickBenefit: function(benefit){
		console.log('starting inverview for ' + benefit.name);
		startInterview(benefit.name);
	},
	render: function() {
		//console.log("LoadBenefits render");
		//console.log(this.props.benefits);
		if (this.props.benefits !== undefined &&
			this.props.benefits.length > 0) {
			var benefitButton = function (benefit) {
				return (
					<div key={"div-" + benefit.id}>
						<div className="benefit" key={"button-" + benefit.id}>
							<button type="button" key={benefit.id} onClick={this.clickBenefit.bind(this, benefit)} className="benefitbutton">{benefit.name}</button>
						</div>
						<div key={"container-" + benefit.id} id={benefit.id + "Container"}></div>
					</div>
				);
			};
			return (
				<div>
					<section>
						<div key="benefits">
							{this.props.benefits.map(benefitButton, this)}
						</div>
						<div id="divMessages" key="messages"></div>
					</section>
				</div>
			);
		}
		else {
			return (
				<div>
					<section>
						<div id="divMessages"></div>
					</section>
				</div>
			);
		}
	}
})
	
var BenefitButton = React.createClass({
	clickBenefit: function(e){
		alert("clickBenefit");
		console.log(e);
	},
	render: function() {
		console.log(benefit.id);
		return (
			<div className="benefit">
				<button type="button" key={this.props.id} onClick={this.clickBenefit} className="benefitbutton">{this.props.name}</button>
			</div>
		);
	}
})

React.render(<LoadTestPage />,document.getElementById('TestPage'));
