import API from '../services/api.js';
import InvestmentForm from './InvestmentForm.js';
import Modal from './Modal.js';
import { formatCurrency } from '../lib/format.js';

function create(investment) {
  const card = `<div class="col" id="investment-${investment.id}">
    <div class="card">
      <div class="card-header">
        <span class="investment-name">
          ${investment.name}
        </span>
        <span
          class="float-end"
        >
          <span
            class="icon-trash"
            data-bs-toggle="modal"
            data-bs-target="#modal"
          >
            <span
              class="iconify"
              data-icon="solar:trash-bin-minimalistic-broken"
            >
            </span>
          </span>
          <span
            class="icon-pencil"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <span
              class="iconify"
              data-icon="tabler:pencil"
            >
            </span>
          </span>
        </span>
      </div>
      <div class="card-body">
        <div>
          <span class="fw-bold">Valor:</span>
          <span class="investment-value">
            ${formatCurrency(investment.value / 100)}
          </span>
        </div>
      </div>
    </div>
  </div>`;

  document.querySelector('#investments-grid').insertAdjacentHTML('beforeend', card);

  document.querySelector(`#investment-${investment.id} .icon-pencil`).onclick = () =>
    InvestmentForm.loadHandleSubmit('update', investment);

  document.querySelector(`#investment-${investment.id} .icon-trash`).onclick = () =>
    Modal.load('Remover Investimento', `Deseja remover o investimento ${investment.name}?`, () => {
      API.remove(`/investments/${investment.id}`);

      remove(investment.id);
    });
}

function setValues({ id, name, value }) {
  value = formatCurrency(value / 100);

  document.querySelector(`#investment-${id} .investment-name`).innerText = name;

  document.querySelector(`#investment-${id} .investment-value`).innerText =
    value;
}

function remove(id) {
  document.querySelector(`#investment-${id}`).remove();
}

export default { create, setValues, remove };
