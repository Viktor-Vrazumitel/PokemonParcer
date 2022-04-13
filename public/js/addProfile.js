const $poColProf = document.querySelector('.poColProf');
$poColProf.addEventListener('click', async (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.innerText === 'delete') {
    const parent = e.target.closest('[data-id]');
    const { id } = parent.dataset;
    const response = await fetch(`/profile/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      parent.remove();
    } else {
      alert('Ошибка удаления!!!!')
    }
  }
});
