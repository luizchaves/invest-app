function create() {
  const modal = `<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modalLabel"></h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p></p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fechar
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>`;

  document.querySelector('body > .container').insertAdjacentHTML('afterend', modal);
}

function load(title, message, confirmCallback) {
  document.querySelector('.modal .modal-title').innerText = title;

  document.querySelector('.modal .modal-body p').innerText = message;

  document.querySelector('.modal .btn-primary').onclick = confirmCallback;
}

export default { create, load };
