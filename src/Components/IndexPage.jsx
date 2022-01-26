import React from 'react'

import html from './utils'

export default class IndexPage extends React.Component {
	setPhoto(){
		if(this.props.page.content('photo') != ''){
			return this.props.page.content('photo')
		}
		return "https://via.placeholder.com/2560x800/7e91b8/7e91b8"
	}

	render(){
		return <section>
			<div className="container">
				<div className="row">
					<div className="col-12 my-5 py-5">
						<div className="m-3" id="about"></div>
						<h1 className="dot-orange text-center my-5 pt-5">{this.props.page.content('title')}</h1>
						<div className="columnar">
							{html(this.props.page.content('main_content'))}
						</div>
					</div>
					<div className="col-12 text-center my-5 py-5">
						<span className="turnout">
							<blockquote>{this.props.page.content('blockquote')}</blockquote>
						</span>
					</div>
					<div className="col-12 my-5 py-5">
						<form className="p-4">
							<div className="bordered-window">
								<div className="rectangle-border"></div>
								<div className="content px-1 py-4">
									<div className="container">
										<div className="row">
											<div className="col-12 col-lg-6 order-lg-1 d-flex flex-column justify-content-center text-center p-5">
												<img src={this.setPhoto()} className="mx-auto" />
												<span className="mt-4">{this.props.page.content('name')}</span>
											</div>
											<div className="col-12 col-lg-6 order-lg-0">
												<h3 className="dot-orange mb-4">{this.props.base.field('form_title')}</h3>
												<p>{this.props.base.field('form_sub_title')}</p>
												<div className="container p-0 mb-4">
													<div className="row">
														<div className="col-12 col-md-10  col-xl-8 col-xxl-7">
															<input type="text" className="my-4 mb-2 w-100" placeholder={this.props.base.field('name')}/>
															<input type="text" className="my-4 mt-2 w-100" placeholder="+38 (___) ___-__-__"/>
															<button className="yellow-button alt w-100">{this.props.base.field('sign_up')}</button>
														</div>
													</div>
												</div>
												<input id="iagree" type="checkbox"/>
												<label htmlFor="iagree">{this.props.base.field('iagree')}</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	}
}