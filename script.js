const form = document.getElementById('contact-form');
const statusText = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  statusText.textContent = '';
  statusText.className = 'status-message';

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      statusText.textContent = 'Mensagem enviada com sucesso!';
      statusText.classList.add('success');
      form.reset();
    } else {
      const data = await response.json();
      if (Object.hasOwn(data, 'errors')) {
        statusText.textContent = data.errors.map(error => error["message"]).join(", ");
      } else {
        statusText.textContent = 'Ocorreu um erro ao enviar. Tente novamente.';
      }
      statusText.classList.add('error');
    }
  } catch (error) {
    statusText.textContent = 'Erro de conexão. Verifique sua rede.';
    statusText.classList.add('error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar Mensagem';
  }
});
