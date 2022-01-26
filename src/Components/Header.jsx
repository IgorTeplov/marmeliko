import React from 'react'

import logo from '../assets/logo.svg'
import {Link} from "react-router-dom"

export default class Header extends React.Component {
	default(){
		if(this.props.params.page != undefined && this.props.params.id == undefined){
			return 'default'
		}
	}

	render(){
		return (
			<header className={this.default()}>
				<div className="naw-wrapper">
					<div className="fixed-wrapper fixed-top">
						<div className="container">
							<div className="row">
								<div className="col-12 px-4">
									<div className="d-flex justify-content-between">
										<nav className="navbar navbar-expand-lg navbar-light">
											<Link to='/' className="navbar-brand">
												<img className="logo" src={logo} />
											</Link>
											<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
												<span className="navbar-toggler-icon"></span>
											</button>
											<div className="collapse navbar-collapse" id="navbarSupportedContent">
												<ul className="navbar-nav d-flex justify-content-around w-100">
													{this.props.base.menu.map(item=>{
														if(item!=undefined&&item.fields!=undefined){
															let text = this.props.base.getText(item.fields)
															let type = item.fields.type
															let link = null
															if(type == "URL"){
																link = `/${item.fields.url}`
															}else if(type == "INNER_URL"){
																link = item.fields.custom_url
															}
															else if(type == "ANCHOR"){
																link = `#${item.fields.custom_url}`
															}else{
																return <li key={item.fields.id} className="nav-item dropdown">
																	<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
																	{text}
																	</a>
																	<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
																		{
																			item.fields.menu_list.map(subitem=>{
																				if(subitem!=undefined&&subitem.fields!=undefined){
																					let stext = this.props.base.getText(subitem.fields)
																					let stype = subitem.fields.type
																					let slink = null
																					if(stype == "URL"){
																						slink = `/${subitem.fields.url}`
																					}else if(stype == "INNER_URL"){
																						slink = subitem.fields.custom_url
																					}
																					else if(stype == "ANCHOR"){
																						slink = `#${subitem.fields.custom_url}`
																					}
																					return <li key={subitem.fields.id}>
																						<Link
																							className='dropdown-item'
																							to={slink}
																						>
																							{stext}
																						</Link>
																					</li>
																				}
																			})
																		}
																	</ul>
																</li>
															}
															return <li key={item.fields.id} className="nav-item">
																<Link
																	className='nav-link'
																	to={link}
																>
																	{text}
																</Link>
															</li>
														}
													})}
												</ul>
											</div>
										</nav>

										<div className="d-flex naw-wrapper lang">
											<a className="nav-link dropdown-toggle" href="#" id="navbarDropdownLang" role="button" data-bs-toggle="dropdown" aria-expanded="false">
												{this.props.app.curentLang}
											</a>
											<ul className="dropdown-menu" aria-labelledby="navbarDropdownLang">
												{this.props.app.translate.languages.map(lang=>{
													if(lang != this.props.app.curentLang){
														return <li key={lang}><a className="dropdown-item" href="#" onClick={(e)=>{
															e.preventDefault()
															this.props.app.setLang(lang)
														}}>{lang}</a></li>
													}
												})}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.props.children}
			</header>
		)
	}
}