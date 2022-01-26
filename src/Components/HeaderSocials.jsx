import React from 'react'
import arrow from '../assets/arrow.svg'

export default class HeaderSocials extends React.Component {
	render(){
		return (
			<div className="container pb-4">
				<div className="socials row">
					<div className="col-12 col-lg-4 order-lg-1 text-center mb-4">
						<span><a href={`tel:${this.props.base.number.url}`}>{this.props.base.number.text()}</a></span>
					</div>
					<div className="col-11 col-lg-4 order-lg-0">
						<nav>
							<ul className="d-flex">
								{this.props.base.socials.map(item=>{
									return <li key={item.fields.unique_name}>
										<a href={item.fields.url}>
											<i className={item.fields.customization.cls}></i>
										</a>
									</li>
								})}
							</ul>
						</nav>
					</div>
					
					<div className="col-1 col-lg-4 order-lg-2 text-end">
						<a href="#about" id="toabout"><img src={arrow}/></a>
					</div>
				</div>
			</div>
		)
	}
}