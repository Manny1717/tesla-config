const topBar = document.querySelector('#top-bar');

const exteriorColorSection = document.querySelector('#exterior-buttons');
const interiorColorSection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');
const wheelButtonsSection = document.querySelector('#wheel-buttons');
const performanceBtn = document.querySelector('#performance-btn');
const selfDrivingBtn = document.querySelector('#selfDriving-btn');
const accessoryCheckboxes = document.querySelectorAll('.accessory-form-checkbox');


const downPaymentElement = document.querySelector('#down-payment');
const monthlyPaymentElement = document.querySelector('#monthly-payment');
const totalPriceElement = document.querySelector('#total-price');

//Image Mapping
    //Exterior
const exteriorImages = {
    'Stealth Grey' : './images/model-y-stealth-grey.jpg',
    'Pearl White' : './images/model-y-pearl-white.jpg',
    'Deep Blue' : './images/model-y-deep-blue-metallic.jpg',
    'Solid Black' : './images/model-y-solid-black.jpg',
    'Ultra Red' : './images/model-y-ultra-red.jpg',
    'QuickSilver' : './images/model-y-quicksilver.jpg',
}
    //Interior
const interiorImages = {
    Dark: './images/model-y-interior-dark.jpg',
    Light: './images/model-y-interior-light.jpg',

}

//
let selectedColor = 'Stealth Grey';

//Add-Ons set to false
const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false,
}

//Original price w/o add-ons
const basePrice = 52490;
let currentPrice = basePrice;


const pricing = {
    'Performance Wheels': 2500,
    'Performance Package': 5000,
    'Full Self-Driving': 8500,
    'Accessories': {
        'Center Console Trays': 35,
        'Sunshade': 105,
        'All-Weather Interior Liners': 225,
    }
}

//Update total price in the UI
const updateTotalPrice = () => {
    //Reset the current price to base price
    currentPrice = basePrice;

    //if user selects 'Performance Wheels' option
    if(selectedOptions['Performance Wheels']) {
        currentPrice += pricing['Performance Wheels'];
    }
    //if user selects 'Performance Upgrade' option
    if(selectedOptions['Performance Package']) {
        currentPrice += pricing['Performance Package'];
    }
    //if user selects 'Full Self-Driving' option
    if(selectedOptions['Full Self-Driving']) {
        currentPrice += pricing['Full Self-Driving'];
    }
    // Accessory Checkbox Selection
    accessoryCheckboxes.forEach((checkbox) => {
        //Extract the accessory label
        const accessoryLabel = checkbox
            .closest('label')
            .querySelector('span')
            .textContent.trim()

        const accessoryPrice = pricing['Accessories'][accessoryLabel];

        //Add to current price if accessory is selected
        if(checkbox.checked) {
            currentPrice += accessoryPrice;
        }
    })

    //update the total price in the UI
    totalPriceElement.textContent = `$${currentPrice.toLocaleString( )}`;

    //This will give the down payment.
        //Down below is the current price with the 10%
    updatePaymentBreakdown()
}

// Update payment breakdown based on the current price
const updatePaymentBreakdown = () => {
    //calculate down payment
    const downPayment = currentPrice * 0.1;
    downPaymentElement.textContent = `$${downPayment.toLocaleString()}`;


    // Calculate loan details (60-month loan & 3% interest rate)
    const loanTermMonths = 60;
    const interestRate = 0.03;

    const loanAmount = currentPrice - downPayment;
    //Monthly Payment Formula
    const monthlyInterestRate = interestRate / 12;

    const monthlyPayment = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
        (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)

    monthlyPaymentElement.textContent = `$${monthlyPayment
        .toFixed(2)
        .toLocaleString()}`;
}

// Handle Top Bar on Scroll
const handleScroll = () => {
    //variable atTop is when the page is at very top.
    //Therefore, 'visible-bar' will appear when that is the case
    //If the page is not at the top, then 'hidden-bar' will appear
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop)
    topBar.classList.toggle('hidden-bar', !atTop);
}

//Update Exterior Image based on color and wheels
const updateExteriorImage = () => {
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : '';
    const colorKey = selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';
    exteriorImage.src = exteriorImages[colorKey].replace('.jpg', `${performanceSuffix}.jpg`);
}

//Handle Color Selection
const handleColorButtonClick = (event) => {
    let button;

if (event.target.tagName === 'IMG') {
    button = event.target.closest('button');
} else if (event.target.tagName === 'BUTTON') {
    button = event.target
}

//remove the selected button and add the selected to the new button clicked
if(button) {
    const buttons = event.currentTarget.querySelectorAll('button');
    buttons.forEach((btn) => btn.classList.remove('btn-selected'));
    button.classList.add('btn-selected');

    //Change exterior image
    if (event.currentTarget === exteriorColorSection) {
        selectedColor = button.querySelector('img').alt;
        updateExteriorImage()
    }

    //Change interior image
    if (event.currentTarget === interiorColorSection) {
        const color = button.querySelector('img').alt;
        interiorImage.src = interiorImages[color];
        }
    }
}

//Wheel Selection
const handleWheelButtonClick = (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttons = document.querySelectorAll('#wheel-buttons button');
        buttons.forEach((btn) => {

            //Step 1: When a button is clicked, remove the bg-pink & text-white
                //add the bg-white & text-black
            btn.classList.remove('bg-pink-800', 'text-white');
            btn.classList.add('bg-white', 'text-black');
        });

        // Step 2: Button being clicked, remove bg-white & text-black
            //add bg-pink & text-white
        event.target.classList.remove('bg-white', 'text-black');
        event.target.classList.add('bg-pink-800', 'text-white');

        //Changing the wheel type from standard => performance when user clicks on the performance button
        selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance');

        updateExteriorImage();
        updateTotalPrice();
    }
}

//Performance Package Selection
const handlePerformanceButtonClick = () => {
    //Update selected options
    selectedOptions['Performance Package'] = performanceBtn.classList.toggle('bg-pink-800');

    updateTotalPrice();
}

//Full Self-Driving Selection
const handleSelfDrivingButtonClick = () => {
    //Update selected options
    selectedOptions['Full Self-Driving'] = selfDrivingBtn.classList.toggle('bg-pink-800')

    updateTotalPrice()
}


// Handle Accessory Checkbox Listeners
accessoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => updateTotalPrice());
})

//Initial Update Total Price
updateTotalPrice()

//Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);
wheelButtonsSection.addEventListener('click', handleWheelButtonClick);
performanceBtn.addEventListener('click', handlePerformanceButtonClick);
selfDrivingBtn.addEventListener('click', handleSelfDrivingButtonClick);


