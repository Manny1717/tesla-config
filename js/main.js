const topBar = document.querySelector('#top-bar');
const exteriorColorSection = document.querySelector('#exterior-buttons');
const interiorColorSection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');
const wheelButtonsSection = document.querySelector('#wheel-buttons');

let selectedColor = 'Stealth Grey';
const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false,
}

//Image Mapping
const exteriorImages = {
    'Stealth Grey' : './images/model-y-stealth-grey.jpg',
    'Pearl White' : './images/model-y-pearl-white.jpg',
    'Deep Blue' : './images/model-y-deep-blue-metallic.jpg',
    'Solid Black' : './images/model-y-solid-black.jpg',
    'Ultra Red' : './images/model-y-ultra-red.jpg',
    'QuickSilver' : './images/model-y-quicksilver.jpg',
}

const interiorImages = {
    Dark: './images/model-y-interior-dark.jpg',
    Light: './images/model-y-interior-light.jpg',

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

//Update Exterior Image based on color and wheels
const updateExteriorImage = () => {
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : '';
    const colorKey = selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';
    exteriorImage.src = exteriorImages[colorKey].replace('.jpg', `${performanceSuffix}.jpg`);
}

//Wheel Selection
    //when the wheel selection button is clicked, then remove
const handleWheelButtonClick = (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttons = document.querySelectorAll('#wheel-buttons button');
        buttons.forEach((btn) => btn.classList.remove('bg-gray-700', 'text-white'))

        //however, add selected styles to clicked button
        event.target.classList.add('bg-gray-700', 'text-white');

        //Changing the wheel type from standard => performance when user clicks on the performance button
        selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance');
        updateExteriorImage();
    }
}

//Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));
exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);
wheelButtonsSection.addEventListener('click', handleWheelButtonClick);

