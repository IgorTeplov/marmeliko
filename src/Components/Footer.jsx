import React from 'react'

import logo from '../assets/logo.svg'

import message from '../assets/message.svg'
import calling from '../assets/calling.svg'
import chat from '../assets/chat.svg'

import {Link} from "react-router-dom"

export default class Footer extends React.Component {
	default(){
		if(this.props.params.page == undefined){
			return 'default'
		}
	}

	socials(){
		let max_counter = 3
		let counter = 0
		return this.props.base.socials.map(item=>{
			if(counter < max_counter){
				counter++
				return <li key={item.fields.unique_name}>
					<a href={item.fields.url}>
						<i className={item.fields.customization.cls}></i>
					</a>
				</li>
			}
		})
	}

	privacy(){
		if(this.props.base.menu_poly != null){
			if(this.props.base.menu_poly.fields.type == "URL"){
				let text = this.props.base.getText(this.props.base.menu_poly.fields)
				return <Link to={`/${this.props.base.menu_poly.fields.url}`}>{text}</Link>
			}
		}
	}

	menu(menu){
		if(menu != undefined){
			return menu.map(item=>{
				if(item!=undefined&&item.fields!=undefined){
					let text = this.props.base.getText(item.fields)
					let type = item.fields.type
					let link = null
					if(type == "URL"){
						link = `/${item.fields.url}`
					}else if(type == "INNER_URL"){
						link = item.fields.custom_url
					}
					if(link != null){
						return <li key={item.fields.id}><Link to={link}>{text}</Link></li>
					}
				}
			})
		}
	}

	render(){
		return (
			<React.Fragment>
				{this.props.params.page == undefined?
					<section className="contact-wrapper">
						<div className="container">
							<div className="row py-5 text-center">
								<div className="col-12">
									<h3 className="my-5 py-5">{this.props.page.content('lets_connect')}</h3>
								</div>
								<div className="mb-5 pb-5 row">
									<div className="col-12 col-md-4 my-2">
										<img src={calling}/>
										<span className="my-3">{this.props.page.content('calling')}</span>
										<a href={`tel:${this.props.base.number.url}`}>{this.props.base.number.text()}</a>
									</div>
									<div className="col-12 col-md-4 my-2">
										<img src={message}/>
										<span className="my-3">{this.props.page.content('writing')}</span>
										<a href={`mail:${this.props.base.email.url}`}>{this.props.base.email.text()}</a>
									</div>
									<div className="col-12 col-md-4 my-2">
										<img src={chat}/>
										<span className="my-3">{this.props.page.content('linked_in')}</span>
										<a href={this.props.base.linkedin.url}>{this.props.base.getText(this.props.base.linkedin)}</a>
									</div>
								</div>
								
							</div>
						</div>
					</section>
				:null}
				
				<footer className={this.default()}>
					<div className="footer-wraper">
						<div className="footer-mask">
							<div className="container py-3">
								<div className="row">
									<div className="col-12 col-lg-2 p-4 d-flex justify-content-center">
										<Link className="align-self-center" to="/"><img className="logo" src={logo}/></Link>
									</div>
									<div className="col-12 col-lg-3 py-3">
										<nav className="d-flex justify-content-between px-3 px-lg-1">
											<ul>
												{this.menu(this.props.base.menu)}
											</ul>
											<ul>
												{this.menu(this.props.base.sub_menu)}
											</ul>
										</nav>
										<div className="px-3 px-lg-1">
											{this.privacy()}
										</div>
									</div>
									<div className="col-12 col-lg-4 py-3"></div>
									<div className="col-12 col-lg-3 text-center">
										<div className="d-flex justify-content-center h-100">
											<div className="align-self-center">
												<span><a href={`tel:${this.props.base.number.url}`}>{this.props.base.number.text()}</a></span>
												<ul className="d-flex justify-content-evenly mt-2">
													{this.socials()}
												</ul>
											</div>
										</div>
									</div>
									<div className="col-12 text-center py-2">
										<span> <a href="https://weem.pro">Powered by WeeM</a> © 2022</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</React.Fragment>
		)
	}
}