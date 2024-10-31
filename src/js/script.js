import {
    appliedPromocodeButtonText,
    countriesCodes, incorrectNumberFormat,
    notEmptyPromocodeMessage,
    requiredFieldMessage,
    ticketTypes
} from "./values";
import {Timer} from "./timer";

document.addEventListener('DOMContentLoaded', () => {
    const countriesParentElement = document.querySelector('.country-list')
    const promocodeButton = document.querySelector('#promocode-button')
    const promocodeInput = document.querySelector('#promocode');
    const requiredFields = document.querySelectorAll('.required');
    const passengerForm = document.querySelector('.passenger-form')
    const ticketTypeDropdownButton = document.querySelector('.ticket-type')
    const dropdownList = document.querySelector('.dropdown-list')
    const currenCountry = document.querySelector('.current-country');
    const countriesList = document.querySelector('.countries');
    const countryCodeInput = document.querySelector("#countrycode");
    const ticketTypeLabel = document.querySelector(".ticket-type__label");
    const dropdownTicketTypeListStroke = document.querySelector('.dropdown-ticket-type-stroke')
    const countryStroke = document.querySelector('.country-stroke')
    const passengers = document.querySelectorAll('.result-booking__passenger')
    const phoneInput = document.querySelector('#phone')
    renderPhoneCodes(countriesCodes);
    renderTicketTypes(ticketTypes)
    Timer();

    promocodeButton.addEventListener('click', () => {
        const wrapper = promocodeInput.parentElement.parentElement
        wrapper.classList.remove('warning')
        if (promocodeInput.value.trim() === '') {
            wrapper.classList.add('warning')
            wrapper.querySelector('.input-field__warning-message').textContent = notEmptyPromocodeMessage
            return;
        }
        promocodeButton.textContent = appliedPromocodeButtonText
        promocodeButton.disabled = true
    })

    passengers.forEach(el => {
        el.addEventListener('click', () => {
            el.classList.toggle('open')
        })
    })

    passengerForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const isFormValid = validateForm()
        if (!isFormValid) return;
        const formData = new FormData(passengerForm);
        const {label} = dropdownList.querySelector('.active').dataset
        const fullName = `${formData.get('firstname')} ${formData.get('lastname')}`
        document.querySelector('.filled-passenger__name').textContent = fullName
        document.querySelector('.filled-passenger__type').textContent = label
        document.querySelector('.passenger').classList.add('hidden')
        document.querySelector('.filled-passenger').classList.remove('hidden')
        document.querySelector('.passenger-info__name').textContent = fullName
        document.querySelector('.passenger-info__type-label').textContent = label


    })

    ticketTypeDropdownButton.addEventListener('click', () => {
        dropdownList.classList.toggle('open')
        dropdownTicketTypeListStroke.classList.toggle('open')
    })
    dropdownList.addEventListener('click', selectTicketTypeHandler)

    currenCountry.addEventListener('click', () => {
        countriesList.classList.toggle('open')
        countryStroke.classList.toggle('open')
    })


    countryCodeInput.addEventListener('input', (e) => {
        renderPhoneCodes(countriesCodes.filter(el => el.code.startsWith(e.target.value)))
    })

    countriesParentElement.addEventListener('click', selectCountryHandler)

    function renderPhoneCodes(countryArray) {
        const countriesHTML = countryArray.map(el => `
            <li class="country-list__item">
               <img src="${el.flag}" class="flag" alt="">
               <span>${el.code}</span>
            </li>
        `).join('')
        countriesParentElement.innerHTML = countriesHTML;
    }

    function validateForm() {
        let valid = true;
        const numbersregex = /^[0-9\s]*$/;
        requiredFields.forEach(el => {
            const value = el.querySelector('input')?.value;
            el.classList.remove('error')
            if (value?.trim() === '') {
                showError(el, requiredFieldMessage);
                valid = false;
            }
        })
        if (!numbersregex.test(phoneInput.value)) {
            const phoneInputWrapper = phoneInput.closest('.input-field')
            showError(phoneInputWrapper, incorrectNumberFormat)
            valid = false
        }

        if (!dropdownList.querySelector('.active')) {
            const dropdownWrapper = dropdownList.closest('.input-field')
            showError(dropdownWrapper, requiredFieldMessage)
            valid = false
        }
        return valid;

    }

    function renderTicketTypes(ticketTypes) {
        const ticketTypesHTML = ticketTypes.map(el => `
             <li class="dropdown-list-item" data-percents="${el.discount}" data-label="${el.label}">
                  <div class="dropdown-list-item__checkbox"></div>
                  <span class="dropdown-list-item__label">${el.label}</span>
                  <span class="dropdown-list-item__percents" >${el.discount > 0 ? `(-${el.discount}%)` : ''}</span>
             </li>
        `).join('')
        dropdownList.innerHTML = ticketTypesHTML
    }

    function selectCountryHandler(e) {
        const targetListItem = e.target.closest('.country-list__item')
        if (targetListItem) {
            countriesList.classList.remove('open')
            countryStroke.classList.remove('open')
            const countryCode = targetListItem.querySelector('span').textContent
            const flagImage = targetListItem.querySelector('.flag').getAttribute('src')
            currenCountry.querySelector('.flag').setAttribute('src', flagImage)
            currenCountry.querySelector('.country-code').textContent = countryCode;
        }
    }

    function selectTicketTypeHandler(e) {
        const targetListElement = e.target.closest('.dropdown-list-item')

        if (targetListElement) {
            [...dropdownList.children].forEach(item => {
                item.classList.remove('active')
            })

            targetListElement.classList.add('active');
            dropdownList.classList.remove('open');
            dropdownTicketTypeListStroke.classList.remove('open')
            const type = targetListElement.querySelector('.dropdown-list-item__label').textContent
            ticketTypeLabel.textContent = type
        }
    }

    function showError(element, message) {
        element.classList.add('error')
        element.querySelector('.input-field__error-message').textContent = message
    }
})








