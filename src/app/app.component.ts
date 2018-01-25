import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public disabled = false;
	public form: FormGroup;
	public message: string = '';

	constructor(fb: FormBuilder) {
		this.form = fb.group({
			'min': [1, Validators.min(1)],
			'max': [100, Validators.min(1)],
			'timeout': [100, Validators.min(1)],
		});
	}


	public startCalculation() {
		this.disabled = true;
		let stop = false;
		let min = this.form.get('min').value;
		let max = this.form.get('max').value;
		let timeout = this.form.get('timeout').value;
		let prime = 0;
		let randomNumberOriginal = Math.floor(Math.random() * max) + min;
		let randomNumber = randomNumberOriginal;
		let timeTaken = 0.00;
		let isPrime = false;

		if (randomNumber % 2 === 0) {
			randomNumber++;
		}

		let startTime = performance.now();

		for (let i = randomNumber; !stop; i += 2) {
			isPrime = this.isPrime(i);
			timeTaken = performance.now() - startTime;

			if (isPrime) {
				stop = true;
				this.message = `Random number: ${randomNumberOriginal}, next highest prime ${i} was found after ${timeTaken}ms`;
			}

			if (timeTaken >= timeout || i + 2 > max) {
				stop = true;

				if (timeTaken >= timeout) {
					this.message = `No prime number was found after ${timeout}ms`;
				}
				else {
					this.message = `No prime number was found up to ${max} for randon number ${randomNumberOriginal}`;
				}
			}
		}

		this.disabled = false;
	}

	public isPrime(num: number): boolean {
		if (isNaN(num) || !isFinite(num) || num % 1 || num < 2) {
			return false;
		}
		if (num === this.leastFactor(num)) {
			return true;
		}
		return false;
	}

	public leastFactor(num): number {
		if (num === 0) return 0;
		if (num * num < 2) return 1;
		if (num % 2 === 0) return 2;
		if (num % 3 === 0) return 3;
		if (num % 5 === 0) return 5;

		for (let i = 7, m = Math.sqrt(num); i <= m; i += 30) {
			if (num % i === 0)			return i;
			if (num % (i + 4) === 0)	return i+4;
			if (num % (i + 6) === 0)	return i+6;
			if (num % (i + 10) === 0)	return i+10;
			if (num % (i + 12) === 0)	return i+12;
			if (num % (i + 16) === 0)	return i+16;
			if (num % (i + 22) === 0)	return i+22;
			if (num % (i + 24) === 0)	return i+24;
		}
		return num;
	}
}
