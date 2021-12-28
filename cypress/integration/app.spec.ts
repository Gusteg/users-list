import * as mockedUsers from '../fixtures/mockedUsers.json';

describe('App Test', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('should fetch users', () => {
		cy.intercept(
			{
				method: 'GET',
				url: '**/users',
			},
			[]
		).as('getUsers');

		cy.wait('@getUsers');
	});

	it('should handle api server internal error', () => {
		cy.intercept('GET', '**/users', {
			statusCode: 504,
		}).as('getUsers');

		cy.get('[data-testid="alert-container"]');
	});

	it('should handle api service unavailable', () => {
		cy.intercept('GET', '**/users', {
			statusCode: 503,
		}).as('getUsers');

		cy.get('[data-testid="alert-container"]');
	});

	it('should display users', () => {
		cy.intercept('GET', '**/users', { fixture: 'mockedUsers.json' }).as(
			'getUsers'
		);
		cy.wait('@getUsers');

		const listContainer = cy.get('[data-testid="list-container"]');

		listContainer.children().each(($el, index) => {
			cy.wrap($el).should(
				'contain.text',
				`${index + 1}. ${mockedUsers[index].name} @${
					mockedUsers[index].username
				}`
			);
		});
	});

	it('should search filter users', () => {
		const input = cy.get('[data-testid="search-input"]');

		input.type(mockedUsers[0].name);

		const listContainer = cy.get('[data-testid="list-container"]');

		listContainer.children().each(($el, index) => {
			cy.wrap($el).should(
				'contain.text',
				`${index + 1}. ${mockedUsers[0].name} @${
					mockedUsers[index].username
				}`
			);
		});
	});

	it('should search handle no users', () => {
		cy.get('[data-testid="search-input"]').type('@');
		cy.get('[data-testid="search-no-users"]');
	});
});
