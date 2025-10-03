console.log("loaded");

let gallery = document.getElementById("gallery");
let filter = document.getElementById("filter");
let spotlight = document.getElementById('spotlight');
let indicators = document.getElementById('indicators');

filter.addEventListener('input', (event) => {
    let string = event.target.value.toLowerCase();
    let photos = Array.from(gallery.children);

    photos.forEach(photo => {
        if (!photo.firstChild.alt.toLowerCase().includes(string)) {
            // fotku skry
            // aplikujem triedu
            photo.style.display = "none";// pridam inline style

        } else {
            photo.style = ""; // vymaz inline styl
        }
    })
})

function getImages() {
    return fetch('./data/images.json').then(response => {
        if (response.ok) {
            return response.json();
        }
        return null;
    }).then(result => {
        if (result != null) {
            let count = 0;

            let indicatorList = document.createElement('ol');
            indicatorList.classList.add('carousel-indicators');
            indicators.appendChild(indicatorList);

            result.images.forEach(img => {
                let thumbnail = document.createElement('img');
                thumbnail.src = img.url;
                thumbnail.alt = img.description;
                thumbnail.setAttribute('class', 'thumbnail rounded');
                thumbnail.setAttribute('data-target', '#indicators');
                thumbnail.setAttribute('data-slide-to', count);

                let column = document.createElement('div');
                column.setAttribute('class', 'col-12 col-sm-6 col-md-4 col-lg-3');

                column.appendChild(thumbnail);
                gallery.appendChild(column);


                let indicator = document.createElement('li');
                indicator.setAttribute('data-target', '#indicators');
                indicator.setAttribute('data-slide-to', count);

                indicatorList.appendChild(indicator);


                let fullImage = document.createElement('img');
                console.log(img.url);
                fullImage.src = img.url;
                fullImage.alt = img.description;
                fullImage.setAttribute('class', 'd-block w-100');
                fullImage.setAttribute('data-title', img.description);

                let carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');

                carouselItem.appendChild(fullImage);
                spotlight.appendChild(carouselItem);


                let imageDescription = document.createElement('div');
                imageDescription.textContent = img.description;
                imageDescription.classList.add('description');

                carouselItem.appendChild(imageDescription);

                if (count === 0) {
                    indicator.classList.add('active');
                    carouselItem.classList.add('active');
                }
                count++;
            })
        } else {
            console.error("response is empty");
        }
    })
}

getImages();

let slideShowInterval;

document.getElementById('slideshowButton').addEventListener('click', function() {
    const button = this;
    if (button.textContent === 'Začni slideshow') {
        slideShowInterval = setInterval(function() {
            // Trigger click event on the next button
            document.querySelector('.carousel-control-next').click();
        }, 2000); // every 2 seconds
        button.textContent = 'Zastav slideshow';
    } else {
        clearInterval(slideShowInterval);
        button.textContent = 'Začni slideshow';
    }
});