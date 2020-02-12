import React from 'react';
import { navigate } from 'gatsby-link';


function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}

class NewsletterSnippet extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isValidated: false }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...this.state,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch(error => alert(error))
    }


    render() {
        return (
            <section>
                <div className="notification">
                   <h3>Join me on an episode of The Front End</h3>
                    <form
                        className="is-full-width"
                        name="podcast-request"
                        method="post"
                        action="/the-front-end-podcast/thanks/"
                        data-netlify="true"
                        data-netlify-honeypot="bot-field"
                        onSubmit={this.handleSubmit}
                    >
                        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                        <input type="hidden" name="form-name" value="newsletter" />
                        <div hidden>
                            <label>
                                Don’t fill this out:{' '}
                                <input name="bot-field" onChange={this.handleChange} />
                            </label>
                        </div>

                        <div className="field">
                            <label className="label" htmlFor={'txtName'}>
                                    Your Name
                            </label>
                            <div className="control is-expanded">
                                <input
                                    id="txtName"
                                    name="name"
                                    className="input"
                                    type="text"
                                    placeholder="Your name"
                                    onChange={this.handleChange}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor={'txtEmail'}>
                                Your email address
                            </label>
                            <div className="control is-expanded">
                                <input
                                    id="txtEmail"
                                    name="email"
                                    className="input"
                                    type="email"
                                    placeholder="Your email address"
                                    onChange={this.handleChange}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor={'txtIntroduction'}>
                                Introduction
                            </label>
                            <div className="control is-expanded">    
                                <textarea
                                    id="txtIntroduction"
                                    name="introduction"
                                    className="textarea"
                                    placeholder="Tell me a little about yourself"
                                    onChange={this.handleChange}
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-primary"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
};

export default NewsletterSnippet;

