import React from 'react'

export default class Loader extends React.Component {
	componentDidUpdate(){
		if(!this.props.app.init||!this.props.base.init||!this.props.page.init){
			document.getElementById('loader').classList.remove('load')
			document.getElementById('loader').classList.remove('end')
		}
		if(this.props.app.init&&this.props.base.init&&this.props.page.init){
			document.getElementById('loader').classList.add('load')
			setTimeout(()=>{
				document.getElementById('loader').classList.add('end')
			}, 1100)
		}
		
	}
	render(){
		if(!this.props.app.init||!this.props.base.init||!this.props.page.init){
			return (
				<div className="loader" id="loader">
					<div className="d-flex justify-content-center">
						<div className="lds-dual-ring align-self-center"></div>
					</div>
				</div>
			)
		}
		return (
			<React.Fragment>
				<div className="loader" id="loader" ref={this.loader}>
					<div className="d-flex justify-content-center">
						<div className="lds-dual-ring align-self-center"></div>
					</div>
				</div>
				{this.props.children}
			</React.Fragment>
		)
	}
}