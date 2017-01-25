import React from 'react'
import ClickOutComponent from 'react-onclickout'

class Autocomplete extends ClickOutComponent {
    constructor(props) {
        super(props);
    }

    onClickOut() {
        return this.props.onBlur();
    }

    render() {
        var {
            getData,
            input,
            onBlur
        } = this.props;

        var planId = this.props.planData.planId;
        var shouldShowSuggestions = this.props.autocomplete.shouldShow;

        var options = this.props.options.map(function(option) {
            return (
                <li key={option.value} >
                    <a href="#"
                       data-label={option.label}
                       onClick={function(event) {
                           event.preventDefault();
                           let newValue = event.target.getAttribute('data-label');
                           getData(newValue, planId);

                           input.onChange(newValue);
                           onBlur();
                       }}>{option.label}</a>
                </li>
            );
        });


        var showClass = shouldShowSuggestions && options.length > 0 ? ' active' : '';


        return (
            <div>
                <input type="text"
                       {...this.props.input}
                       className="form-control"
                       onChange={event => {
                           let value = event.target.value;
                           getData(value, planId);

                           return this.props.input.onChange(event);
                       }}
                       onFocus={this.props.onFocus}
                />
                <ul className={'autocomplete' + showClass }>
                    { options }
                </ul>

            </div>
        )
    }
}

export default Autocomplete