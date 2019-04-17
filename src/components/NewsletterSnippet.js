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
            <section className="section">
                <div className="notification has-text-centered">
                    <h3 className="title is-size-4">Receive awesome news in the mail</h3>
                    <p>If you'd like to be notified of the latest updates and articles, pop your email address in the box below and get ready for update goodness.
                        I only send emails out once a month and promise to never spam you.</p>
                    <form
                        className="is-full-width"
                        name="contact"
                        method="post"
                        action="/contact/thanks/"
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

                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <label className="is-sr-only" htmlFor={'txtEmail'}>
                                    Your email address
                                </label>
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
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-primary"
                                >
                                    Subscribe
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

