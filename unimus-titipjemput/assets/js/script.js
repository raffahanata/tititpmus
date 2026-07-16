// TitipMus — shared front-end behaviour (UI prototype, belum terhubung backend)

document.addEventListener('DOMContentLoaded', function () {

  // ---- Sidebar toggle (mobile) ----
  var toggleBtns = document.querySelectorAll('.sidebar-toggle');
  var sidebar = document.querySelector('.sidebar');
  var backdrop = document.querySelector('.sidebar-backdrop');

  function closeSidebar () {
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('show');
  }
  function openSidebar () {
    if (sidebar) sidebar.classList.add('open');
    if (backdrop) backdrop.classList.add('show');
  }
  toggleBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (sidebar && sidebar.classList.contains('open')) { closeSidebar(); } else { openSidebar(); }
    });
  });
  if (backdrop) backdrop.addEventListener('click', closeSidebar);

  // ---- Confirm delete (dipakai di semua tombol .js-confirm-delete) ----
  document.querySelectorAll('.js-confirm-delete').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var label = el.getAttribute('data-label') || 'data ini';
      if (!window.confirm('Yakin ingin menghapus ' + label + '? Tindakan ini tidak dapat dibatalkan.')) {
        e.preventDefault();
      }
    });
  });

  // ---- Simple client-side search filter for tables (data-search-table) ----
  document.querySelectorAll('[data-search-input]').forEach(function (input) {
    var targetSelector = input.getAttribute('data-search-input');
    var table = document.querySelector(targetSelector);
    if (!table) return;
    input.addEventListener('keyup', function () {
      var q = input.value.toLowerCase();
      table.querySelectorAll('tbody tr').forEach(function (row) {
        row.style.display = row.innerText.toLowerCase().indexOf(q) > -1 ? '' : 'none';
      });
    });
  });

  // ---- Toggle password visibility ----
  document.querySelectorAll('.js-toggle-password').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.querySelector(btn.getAttribute('data-target'));
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.classList.toggle('bi-eye');
      btn.classList.toggle('bi-eye-slash');
    });
  });

});
