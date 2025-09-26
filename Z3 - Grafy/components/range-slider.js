class RangeSlider extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open'});

        this.min = this.getAttribute('minimal') ? this.getAttribute('minimal') : 0;
        this.max = this.getAttribute('maximal') ? this.getAttribute('maximal') : 10;
        this.rangeWidth = this.max - this.min; // does not work for negative values

        this.inputTypeRange = document.createElement('input');
        this.inputTypeRange.type = 'range';
        this.inputTypeRange.className = 'custom-range';
        this.inputTypeRange.id = 'custom-range';
        this.inputTypeRange.min = this.min;
        this.inputTypeRange.max = this.max;

        this.label = document.createElement('label');
        this.label.className = 'custom-label';
        this.label.id = 'custom-label';
        this.label.htmlFor = 'custom-range';

        this.sliderContainer = document.createElement('div');
        this.sliderContainer.className = 'slider-container';
        this.sliderContainer.appendChild(this.label);
        this.sliderContainer.appendChild(this.inputTypeRange);

        this.inputTypeNumber = document.createElement('input');
        this.inputTypeNumber.type = 'number';
        this.inputTypeNumber.className = 'custom-number';
        this.inputTypeNumber.setAttribute('min', this.min);
        this.inputTypeNumber.setAttribute('max', this.max);

        this.container = document.createElement('div');
        this.container.className = 'container';

        this.container.appendChild(this.sliderContainer);
        this.container.appendChild(this.inputTypeNumber);

        const style = document.createElement('style');
        style.innerHTML = `
                .container {
                    display: flex;
                    flex-direction: column;
                    width: 352px;
                }
                .slider-container {
                    position: relative;
                }
                .custom-label {
                    display: block;
                    position: relative;
                    text-align: center;
                    width: 50px;
                    height: 35px;
                    top: 49px;
                    pointer-events: none;
                }
                input[type=number] {
                    background: #F2F2F2;
                    border: 1px solid #C4C4C4;
                    border-radius: 2px;
                }
                input[type=range] {
                    height: 35px;
                    -webkit-appearance: none;
                    margin: 10px 0;
                    width: 100%;
                }
                input[type=range]:focus {
                    outline: none;
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 10px;
                    cursor: pointer;
                    box-shadow: 0 0 0 #000000;
                    background: #FFFFFF;
                    border-radius: 3px;
                    border: 1px solid #C2C2C2;
                }
                input[type=range]::-webkit-slider-thumb {
                    box-shadow: 0 0 0 #000000;
                    border: 1px solid #C4C4C4;
                    height: 28px;
                    width: 50px;
                    border-radius: 4px;
                    background: #F2F2F2;
                    cursor: pointer;
                    -webkit-appearance: none;
                    margin-top: -10px;
                }
                input[type=range]:focus::-webkit-slider-runnable-track {
                    background: #FFFFFF;
                }
                input[type=range]::-moz-range-track {
                    width: 100%;
                    height: 10px;
                    cursor: pointer;
                    box-shadow: 0 0 0 #000000;
                    background: #FFFFFF;
                    border-radius: 3px;
                    border: 1px solid #C2C2C2;
                }
                input[type=range]::-moz-range-thumb {
                    box-shadow: 0 0 0 #000000;
                    border: 1px solid #C4C4C4;
                    height: 28px;
                    width: 50px;
                    border-radius: 4px;
                    background: #F2F2F2;
                    cursor: pointer;
                }
                input[type=range]::-ms-track {
                    width: 100%;
                    height: 10px;
                    cursor: pointer;
                    background: transparent;
                    border-color: transparent;
                    color: transparent;
                }
                input[type=range]::-ms-fill-lower {
                    background: #FFFFFF;
                    border: 1px solid #C2C2C2;
                    border-radius: 6px;
                    box-shadow: 0 0 0 #000000;
                }
                input[type=range]::-ms-fill-upper {
                    background: #FFFFFF;
                    border: 1px solid #C2C2C2;
                    border-radius: 6px;
                    box-shadow: 0 0 0 #000000;
                }
                input[type=range]::-ms-thumb {
                    margin-top: 1px;
                    box-shadow: 0 0 0 #000000;
                    border: 1px solid #C4C4C4;
                    height: 28px;
                    width: 50px;
                    border-radius: 4px;
                    background: #F2F2F2;
                    cursor: pointer;
                }
                input[type=range]:focus::-ms-fill-lower {
                    background: #FFFFFF;
                }
                input[type=range]:focus::-ms-fill-upper {
                    background: #FFFFFF;
                }
                `;

        this.shadowRoot.appendChild(this.container);
        this.shadowRoot.appendChild(style);

        this.inputTypeRange.addEventListener('input', () => {
            this.updateSlider(Math.round(this.inputTypeRange.valueAsNumber).toString());
        }  );

        this.inputTypeNumber.addEventListener('change',() => {
            const value = Math.round(this.inputTypeNumber.valueAsNumber);
            if (this.max < value)
                this.updateSlider(this.max);
            else if (this.min > value)
                this.updateSlider(this.min);
            else
                this.updateSlider(value);

        }  );

        this.updateSlider(+(this.min) + 1);
    }


    updateSlider(value) {
        this.inputTypeNumber.value = value;
        this.inputTypeRange.value = value;
        this.label.textContent = value;
        this.label.style.marginLeft = ((+value - this.min) * 300/this.rangeWidth + 1) + 'px';
    }

}

customElements.define("range-slider", RangeSlider);