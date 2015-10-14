var LoadBenefits = React.createClass({
	//propTypes: {
	//	benefits: React.PropTypes.object,
	//},\
	render: function() {
		if (this.props.benefits.id !== undefined &&
			this.props.benefits.length > 0) {
			console.log('in if');
			return (
				<div>
					<section>
						{this.props.benefits.forEach(function (benefit) {
							return (
								<div className="benefit">
									<input type="button" className="benefitbutton" onclick="startInterview({benefit.name})"
										   value={benefit.name}/>
								</div>,
								<div id={benefit.id}></div>
							);
							})
						}
						<div id="divMessages"></div>
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