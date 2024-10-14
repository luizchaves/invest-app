import API from '../services/api.js';
import InvestmentCard from './InvestmentCard.js';

const investments = await API.read('/investments');

function create() {
  const grid = '<div id="investments-grid" class="row row-cols-1 row-cols-md-3 g-4"></div>';

  document.querySelector('body > .container').insertAdjacentHTML('beforeend', grid);

  investments.forEach((investment) => InvestmentCard.create(investment));
}

export default { create };
