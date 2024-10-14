import API from '../services/api.js';
import InvestmentCard from './InvestmentCard.js';

function create() {
  const form = `<form>
    <input
      type="hidden"
      id="id"
      name="id"
    />
    <div class="mb-3">
      <label for="name" class="form-label">Nome</label>
      <input
        type="name"
        class="form-control"
        id="name"
        name="name"
        placeholder="Ex: Tesouro Selic"
        required
      />
    </div>
    <div class="mb-3">
      <label for="value" class="form-label">Valor</label>
      <input
        type="number"
        class="form-control"
        id="value"
        name="value"
        step="0.01"
        placeholder="100"
      />
    </div>
    <div class="mb-3">
      <input
        type="submit"
        class="form-control btn btn-secondary"
        id="submit"
        data-bs-dismiss="offcanvas"
        required
      />
    </div>
  </form>`;

  const drawer = `<div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">
        Cadastro de Investimento
      </h5>

      <button
        type="button"
        id="offcanvas-close"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      ${form}
    </div>
  </div>`;

  document.querySelector('body > .container').insertAdjacentHTML('afterend', drawer);

  const newInvestmentBtn = `<div>
    <button
      class="btn btn-secondary create-investment"
      style="position: fixed; bottom: 24px; right: 24px"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasRight"
      aria-controls="offcanvasRight"
    >
      +
    </button>
  </div>`;

  document.querySelector('body > .container').insertAdjacentHTML('afterend', newInvestmentBtn);


  document.querySelector('.create-investment').onclick = () => loadHandleSubmit('create');
}

function setValues({ id, name, value }) {
  const form = document.querySelector('form');

  value = value / 100;

  form.id.value = id;

  form.name.value = name;

  form.value.value = value;
}

function getValues() {
  const form = document.querySelector('form');

  const investment = Object.fromEntries(new FormData(form));

  const value = Number(investment.value) * 100;

  return { ...investment, value };
}

function reset() {
  const form = document.querySelector('form');

  form.reset();
}

function loadHandleSubmit(type, investment) {
  const form = document.querySelector('form');

  if (type === 'create') {
    setValues(investment);
  } else if (type === 'update') {
    reset();
  }

  form.onsubmit = async (event) => {
    event.preventDefault();

    const investment = getValues();

    if (type === 'create') {
      const createdInvestment = await API.create('/investments', investment);

      InvestmentCard.create(createdInvestment);
    } else if (type === 'update') {
      const updatedInvestment = await API.update(
        `/investments/${investment.id}`,
        investment
      );

      InvestmentCard.setValues(updatedInvestment);
    }

    reset();
  };
}

export default { create, getValues, setValues, loadHandleSubmit };
